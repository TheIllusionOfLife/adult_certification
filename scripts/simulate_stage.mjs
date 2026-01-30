#!/usr/bin/env node
/**
 * Stage simulator for adult_certification.
 *
 * Goals:
 * - Exhaustively enumerate all valid decision paths for a stage:
 *   - question choices (respecting lockRequirements)
 *   - skill picks at configured offer positions
 * - Report rank distribution, game-over stats, lock availability, and representative "player intent" paths.
 *
 * Usage examples:
 *   node scripts/simulate_stage.mjs --stage 1
 *   node scripts/simulate_stage.mjs --stage 1 --json
 *   node scripts/simulate_stage.mjs --stageFile src/data/stages/stage1.ts --export stage1Questions --stageId 1
 */

import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);

function die(message) {
  console.error(message);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {
    stage: 1,
    stageId: 1,
    stageFile: null,
    exportName: null,
    metaFile: null,
    json: false,
  };

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--stage") {
      const v = argv[++i];
      if (!v) die("Missing value for --stage");
      args.stage = Number(v);
      if (!Number.isFinite(args.stage)) die(`Invalid --stage: ${v}`);
      args.stageId = args.stage;
    } else if (a === "--stageId") {
      const v = argv[++i];
      if (!v) die("Missing value for --stageId");
      args.stageId = Number(v);
      if (!Number.isFinite(args.stageId)) die(`Invalid --stageId: ${v}`);
    } else if (a === "--stageFile") {
      args.stageFile = argv[++i] ?? null;
      if (!args.stageFile) die("Missing value for --stageFile");
    } else if (a === "--export") {
      args.exportName = argv[++i] ?? null;
      if (!args.exportName) die("Missing value for --export");
    } else if (a === "--meta") {
      args.metaFile = argv[++i] ?? null;
      if (!args.metaFile) die("Missing value for --meta");
    } else if (a === "--json") {
      args.json = true;
    } else if (a === "--help" || a === "-h") {
      console.log(
        [
          "simulate_stage.mjs",
          "",
          "Options:",
          "  --stage N        Stage number (default: 1). Also sets --stageId unless overridden.",
          "  --stageId N      Stage id to fetch metadata (default: stage).",
          "  --stageFile PATH TS stage file path (default: src/data/stages/stage{N}.ts).",
          "  --export NAME    Export name for questions array (default: stage{N}Questions).",
          "  --meta PATH      Optional JSON metadata to enrich analysis (question types/tags/must-cover).",
          "  --json           Output machine-readable JSON.",
        ].join("\n")
      );
      process.exit(0);
    } else {
      die(`Unknown arg: ${a} (try --help)`);
    }
  }

  if (!args.stageFile) args.stageFile = `src/data/stages/stage${args.stage}.ts`;
  if (!args.exportName) args.exportName = `stage${args.stage}Questions`;

  return args;
}

// Cache for transpiled TS modules
const tsModuleCache = new Map();

// Shared compiler options for all TS transpilation
const tsCompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.CommonJS,
  strict: true,
  esModuleInterop: true,
  skipLibCheck: true,
};

// Transpile a TS file and return the output text
function transpileTS(absPath) {
  if (tsModuleCache.has(absPath)) {
    return tsModuleCache.get(absPath);
  }

  const source = fs.readFileSync(absPath, "utf8");
  const out = ts.transpileModule(source, {
    compilerOptions: tsCompilerOptions,
    fileName: absPath,
  });

  tsModuleCache.set(absPath, out.outputText);
  return out.outputText;
}

// Create a TS-aware require function for the sandbox
function createTSRequire(baseDir) {
  const moduleCache = new Map();

  return function customRequire(request) {
    // Handle relative paths
    let absPath;
    if (request.startsWith(".")) {
      absPath = path.resolve(baseDir, request);
    } else {
      // Non-relative: delegate to native require (node_modules, builtins)
      return require(request);
    }

    // Add .ts extension if not present and file doesn't exist
    if (!fs.existsSync(absPath)) {
      for (const ext of [".ts", ".mts", ".cts", "/index.ts"]) {
        const withExt = absPath + ext;
        if (fs.existsSync(withExt)) {
          absPath = withExt;
          break;
        }
      }
    }

    // If still not found or not a TS file, try native require
    if (!fs.existsSync(absPath) || !absPath.match(/\.(ts|mts|cts)$/)) {
      return require(request);
    }

    // Check module cache
    if (moduleCache.has(absPath)) {
      return moduleCache.get(absPath);
    }

    // Transpile and execute
    const outputText = transpileTS(absPath);
    const moduleDir = path.dirname(absPath);

    const childModule = { exports: {} };
    const childSandbox = {
      module: childModule,
      exports: childModule.exports,
      require: createTSRequire(moduleDir),
      __dirname: moduleDir,
      __filename: absPath,
      console,
      process,
    };
    childSandbox.exports = childSandbox.module.exports;

    vm.createContext(childSandbox);
    vm.runInContext(outputText, childSandbox, { filename: absPath });

    // Cache and return
    moduleCache.set(absPath, childSandbox.module.exports);
    return childSandbox.module.exports;
  };
}

function evalTSModule(filePath) {
  const abs = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(abs)) {
    die(`File not found: ${filePath}`);
  }

  const outputText = transpileTS(abs);
  const moduleDir = path.dirname(abs);

  const sandbox = {
    module: { exports: {} },
    exports: {},
    require: createTSRequire(moduleDir),
    __dirname: moduleDir,
    __filename: abs,
    console,
    process,
  };
  sandbox.exports = sandbox.module.exports;

  vm.createContext(sandbox);
  vm.runInContext(outputText, sandbox, { filename: abs });
  return sandbox.module.exports;
}

function pct(n, d) {
  if (!d) return "0.0%";
  return `${((n * 100) / d).toFixed(1)}%`;
}

function pct2(n, d) {
  if (!d) return "0.00%";
  return `${((n * 100) / d).toFixed(2)}%`;
}

function formatPathSteps(steps) {
  return steps.join(" ");
}

function minOf3(a, b, c) {
  return Math.min(a, b, c);
}

function minParam(state) {
  return Math.min(state.CS, state.Asset, state.Autonomy);
}

function percentile(sortedValues, p) {
  if (!sortedValues.length) return null;
  if (p <= 0) return sortedValues[0];
  if (p >= 100) return sortedValues[sortedValues.length - 1];
  const idx = (p / 100) * (sortedValues.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sortedValues[lo];
  const w = idx - lo;
  return sortedValues[lo] * (1 - w) + sortedValues[hi] * w;
}

function computePercentiles(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return {
    p5: percentile(sorted, 5),
    p25: percentile(sorted, 25),
    p50: percentile(sorted, 50),
    p75: percentile(sorted, 75),
    p95: percentile(sorted, 95),
    min: sorted.length ? sorted[0] : null,
    max: sorted.length ? sorted[sorted.length - 1] : null,
  };
}

function safeReadJSON(filePath) {
  const abs = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(abs)) die(`Meta file not found: ${filePath}`);
  try {
    return JSON.parse(fs.readFileSync(abs, "utf8"));
  } catch (e) {
    die(`Failed to parse meta JSON: ${filePath} (${e?.message ?? e})`);
  }
}

function simulateStage({
  questions,
  stageMetadata,
  config,
  applySkillEffects,
  stageId,
  meta,
}) {
  if (!Array.isArray(questions) || questions.length === 0) {
    die("Stage questions are empty or invalid.");
  }
  if (!stageMetadata) {
    die(
      `Stage metadata not found for stageId=${stageId}. Add it to src/data/stageMetadata.ts before simulating.`
    );
  }

  const initial = { ...stageMetadata.initialParams };
  const offerPositions = new Map();
  // CONFIG.SKILL_OFFER_POSITIONS holds question indices (0-based) where offer happens AFTER answering that question.
  for (let i = 0; i < config.SKILL_OFFER_POSITIONS.length; i++) {
    offerPositions.set(config.SKILL_OFFER_POSITIONS[i], i + 1); // 1 or 2
  }

  // Optional meta format:
  // {
  //   "questions": {
  //     "s2_q05": { "type": "dilemma", "tags": ["career", "overtime"] }
  //   },
  //   "mustCover": ["overtime", "paid_leave"]
  // }
  const metaQuestions = meta?.questions && typeof meta.questions === "object" ? meta.questions : {};
  const mustCover = Array.isArray(meta?.mustCover) ? meta.mustCover : null;

  const questionTypeById = new Map();
  for (const q of questions) {
    const mt = metaQuestions[q.id]?.type;
    if (mt === "knowledge" || mt === "dilemma" || mt === "philosophy") {
      questionTypeById.set(q.id, mt);
    }
  }

  function isLocked(state, choice) {
    const req = choice.lockRequirements;
    if (!req) return false;
    if (req.CS !== undefined && state.CS < req.CS) return true;
    if (req.Asset !== undefined && state.Asset < req.Asset) return true;
    if (req.Autonomy !== undefined && state.Autonomy < req.Autonomy) return true;
    return false;
  }

  function rankForCS(cs) {
    const t = stageMetadata.rankThresholds;
    if (cs >= t.S.CS) return "S";
    if (cs >= t.A.CS) return "A";
    if (cs >= t.B.CS) return "B";
    // C = "clear" (CS >= 1), not defined in metadata
    if (cs >= 1) return "C";
    return "F";
  }

  const stats = {
    totalTerminalPaths: 0, // clears + game overs
    clears: 0,
    gameOvers: 0,
    gameOverByParam: { CS: 0, Asset: 0, Autonomy: 0 },
    gameOverByQ: {}, // 1-based Q number
    clearsByRank: { S: 0, A: 0, B: 0, C: 0, F: 0 },
    lockStats: new Map(), // key `${qid}:${choiceIndex}` -> { reached, locked, weightedReached, weightedUnlocked, req }
    deadEnds: 0, // reached a question where all choices were locked (should be 0)
    skillActivations: new Map(), // skillId -> { activations: number, totalImpact: { CS, Asset, Autonomy } }
    lethalChoices: new Map(), // key `${qid}:${choiceIndex}` -> { total, byParam: {CS, Asset, Autonomy} }
    keySkillAvailability: new Map(), // key skillId -> { reached, unlocked, locked, req }
    coverage: mustCover ? { mustCover, tagsByQuestion: new Map() } : null,
    // Weighted (probability-based) metrics
    weightedClears: 0,
    weightedGameOvers: 0,
    weightedRanks: { S: 0, A: 0, B: 0, C: 0, F: 0 },
    weightedGameOverByParam: { CS: 0, Asset: 0, Autonomy: 0 },
  };

  const clears = [];

  function recordLockStats(state, q, probability) {
    q.choices.forEach((c, i) => {
      if (!c.lockRequirements) return;
      const key = `${q.id}:${i}`;
      const entry =
        stats.lockStats.get(key) ?? {
          reached: 0,
          locked: 0,
          weightedReached: 0,
          weightedUnlocked: 0,
          req: c.lockRequirements,
        };
      entry.reached += 1;
      entry.weightedReached += probability;
      if (isLocked(state, c)) {
        entry.locked += 1;
      } else {
        entry.weightedUnlocked += probability;
      }
      stats.lockStats.set(key, entry);
    });
  }

  function recordGameOver(idxQ1Based, stateAfter, q, choiceIndex, probability) {
    stats.totalTerminalPaths++;
    stats.gameOvers++;
    stats.weightedGameOvers += probability;
    stats.gameOverByQ[idxQ1Based] = (stats.gameOverByQ[idxQ1Based] ?? 0) + 1;
    let killer = "Autonomy";
    if (stateAfter.CS <= 0) killer = "CS";
    else if (stateAfter.Asset <= 0) killer = "Asset";
    stats.gameOverByParam[killer]++;
    stats.weightedGameOverByParam[killer] += probability;

    if (q && Number.isFinite(choiceIndex)) {
      const key = `${q.id}:${choiceIndex}`;
      const entry =
        stats.lethalChoices.get(key) ?? {
          total: 0,
          byParam: { CS: 0, Asset: 0, Autonomy: 0 },
        };
      entry.total++;
      entry.byParam[killer]++;
      stats.lethalChoices.set(key, entry);
    }
  }

  function recordClear(stateFinal, steps, selectedSkillIds, forcedSteps, probability) {
    stats.totalTerminalPaths++;
    stats.clears++;
    stats.weightedClears += probability;
    const rank = rankForCS(stateFinal.CS);
    stats.clearsByRank[rank] = (stats.clearsByRank[rank] ?? 0) + 1;
    stats.weightedRanks[rank] = (stats.weightedRanks[rank] ?? 0) + probability;
    clears.push({
      ...stateFinal,
      rank,
      steps: [...steps],
      path: formatPathSteps(steps),
      selectedSkillIds: [...selectedSkillIds],
      selectedSkills: [...selectedSkillIds].join(" + "),
      forcedSteps: [...forcedSteps], // question indices (0-based) where only one choice was available
    });
  }

  function recordCoverage(q) {
    if (!stats.coverage) return;
    const tags = Array.isArray(metaQuestions[q.id]?.tags) ? metaQuestions[q.id].tags : [];
    stats.coverage.tagsByQuestion.set(q.id, tags);
  }

  function recordKeySkillAvailability(skill, choiceHistory) {
    if (skill.category !== "key") return;
    const req = skill.keySkillRequirement;
    const entry =
      stats.keySkillAvailability.get(skill.id) ?? {
        reached: 0,
        unlocked: 0,
        locked: 0,
        req: req ?? null,
      };

    entry.reached++;
    let available = true;
    if (req) {
      const selected = choiceHistory[req.questionId];
      available = selected === req.choiceIndex;
    }
    if (available) entry.unlocked++;
    else entry.locked++;
    stats.keySkillAvailability.set(skill.id, entry);
    return available;
  }


  function loadoutKey(selectedSkillIds) {
    // Offer 1 then Offer 2. Keep stable string even if key skill is unavailable in some runs.
    const s1 = selectedSkillIds[0] ?? "(none)";
    const s2 = selectedSkillIds[1] ?? "(none)";
    return `${s1} + ${s2}`;
  }

  const loadoutStats = new Map(); // key -> { terminalPaths, clears, gameOvers, rankDist, gameOverByParam, clearValues }

  function getLoadoutEntry(selectedSkillIds) {
    const key = loadoutKey(selectedSkillIds);
    const entry =
      loadoutStats.get(key) ?? {
        terminalPaths: 0,
        clears: 0,
        gameOvers: 0,
        rankDist: { S: 0, A: 0, B: 0, C: 0, F: 0 },
        gameOverByParam: { CS: 0, Asset: 0, Autonomy: 0 },
        clearsFinal: { CS: [], Asset: [], Autonomy: [], minParam: [] },
      };
    loadoutStats.set(key, entry);
    return entry;
  }

  function dfs({
    qIndex,
    state,
    activeSkills,
    offerPicked1,
    offerPicked2,
    selectedSkillIds,
    steps,
    choiceHistory,
    forcedSteps,
    probability,
  }) {
    if (qIndex >= questions.length) {
      recordClear(state, steps, selectedSkillIds, forcedSteps, probability);
      const le = getLoadoutEntry(selectedSkillIds);
      le.terminalPaths++;
      le.clears++;
      le.rankDist[rankForCS(state.CS)]++;
      le.clearsFinal.CS.push(state.CS);
      le.clearsFinal.Asset.push(state.Asset);
      le.clearsFinal.Autonomy.push(state.Autonomy);
      le.clearsFinal.minParam.push(minParam(state));
      return;
    }

    const q = questions[qIndex];
    recordLockStats(state, q, probability);
    recordCoverage(q);

    const availableChoiceIndices = [];
    for (let ci = 0; ci < q.choices.length; ci++) {
      if (!isLocked(state, q.choices[ci])) availableChoiceIndices.push(ci);
    }

    if (availableChoiceIndices.length === 0) {
      // Should never happen if design rule "never both locked" holds.
      stats.deadEnds++;
      stats.totalTerminalPaths++;
      stats.gameOvers++;
      stats.weightedGameOvers += probability;
      stats.gameOverByQ[qIndex + 1] = (stats.gameOverByQ[qIndex + 1] ?? 0) + 1;

      const le = getLoadoutEntry(selectedSkillIds);
      le.terminalPaths++;
      le.gameOvers++;
      return;
    }

    // Track if this question is forced (only one choice available)
    const isForced = availableChoiceIndices.length === 1;
    const nextForcedSteps = isForced ? [...forcedSteps, qIndex] : forcedSteps;

    // Calculate probability for each choice (equal probability among available choices)
    const choiceProb = probability / availableChoiceIndices.length;

    for (const ci of availableChoiceIndices) {
      const choice = q.choices[ci];
      const original = choice.effect;
      const modified = applySkillEffects(original, q, activeSkills);

      // Track skill activations (measure each skill's ISOLATED impact)
      activeSkills.forEach(skill => {
        const skillId = skill.id;
        const entry = stats.skillActivations.get(skillId) ?? {
          activations: 0,
          opportunities: 0,
          totalImpact: { CS: 0, Asset: 0, Autonomy: 0 },
          perQuestion: new Map(), // qid -> { activations, opportunities, totalImpact }
        };

        // Count as opportunity whenever skill is active
        entry.opportunities++;
        const qEntry = entry.perQuestion.get(q.id) ?? {
          activations: 0,
          opportunities: 0,
          totalImpact: { CS: 0, Asset: 0, Autonomy: 0 },
        };
        qEntry.opportunities++;

        // Apply ONLY this skill to measure its isolated impact
        const isolatedModified = applySkillEffects(original, q, [skill]);
        const csDiff = isolatedModified.CS - original.CS;
        const assetDiff = isolatedModified.Asset - original.Asset;
        const autoDiff = isolatedModified.Autonomy - original.Autonomy;

        if (csDiff !== 0 || assetDiff !== 0 || autoDiff !== 0) {
          entry.activations++;
          entry.totalImpact.CS += csDiff;
          entry.totalImpact.Asset += assetDiff;
          entry.totalImpact.Autonomy += autoDiff;

          qEntry.activations++;
          qEntry.totalImpact.CS += csDiff;
          qEntry.totalImpact.Asset += assetDiff;
          qEntry.totalImpact.Autonomy += autoDiff;
        }

        entry.perQuestion.set(q.id, qEntry);
        stats.skillActivations.set(skillId, entry);
      });

      const next = {
        CS: state.CS + modified.CS,
        Asset: state.Asset + modified.Asset,
        Autonomy: state.Autonomy + modified.Autonomy,
      };

      const nextSteps = [...steps, `Q${qIndex + 1}${String.fromCharCode(65 + ci)}`];
      const nextChoiceHistory = { ...choiceHistory, [q.id]: ci };

      if (next.CS <= 0 || next.Asset <= 0 || next.Autonomy <= 0) {
        recordGameOver(qIndex + 1, next, q, ci, choiceProb);
        const le = getLoadoutEntry(selectedSkillIds);
        le.terminalPaths++;
        le.gameOvers++;
        let killer = "Autonomy";
        if (next.CS <= 0) killer = "CS";
        else if (next.Asset <= 0) killer = "Asset";
        le.gameOverByParam[killer]++;
        continue;
      }

      const offerNumber = offerPositions.get(qIndex);
      if (offerNumber === 1 && !offerPicked1) {
        const skillProb = choiceProb / stageMetadata.skills.offer1.length;
        for (const s of stageMetadata.skills.offer1) {
          dfs({
            qIndex: qIndex + 1,
            state: next,
            activeSkills: [...activeSkills, s],
            offerPicked1: true,
            offerPicked2,
            selectedSkillIds: [...selectedSkillIds, s.id],
            steps: [...nextSteps, `SK1:${s.id}`],
            choiceHistory: nextChoiceHistory,
            forcedSteps: nextForcedSteps,
            probability: skillProb,
          });
        }
        continue;
      }

      if (offerNumber === 2 && offerPicked1 && !offerPicked2) {
        // Evaluate availability once per reached offer screen (not per enumerated pick).
        // Normal skills are always pickable; key skills require earning via choiceHistory.
        const pickable = [];
        for (const s of stageMetadata.skills.offer2) {
          if (s.category !== "key") {
            pickable.push(s);
            continue;
          }
          const available = recordKeySkillAvailability(s, nextChoiceHistory);
          if (available) pickable.push(s);
        }

        const skillProb2 = pickable.length > 0 ? choiceProb / pickable.length : choiceProb;
        for (const s of pickable) {
          dfs({
            qIndex: qIndex + 1,
            state: next,
            activeSkills: [...activeSkills, s],
            offerPicked1,
            offerPicked2: true,
            selectedSkillIds: [...selectedSkillIds, s.id],
            steps: [...nextSteps, `SK2:${s.id}`],
            choiceHistory: nextChoiceHistory,
            forcedSteps: nextForcedSteps,
            probability: skillProb2,
          });
        }
        continue;
      }

      dfs({
        qIndex: qIndex + 1,
        state: next,
        activeSkills,
        offerPicked1,
        offerPicked2,
        selectedSkillIds,
        steps: nextSteps,
        choiceHistory: nextChoiceHistory,
        forcedSteps: nextForcedSteps,
        probability: choiceProb,
      });
    }
  }

  dfs({
    qIndex: 0,
    state: initial,
    activeSkills: [],
    offerPicked1: false,
    offerPicked2: false,
    selectedSkillIds: [],
    steps: [],
    choiceHistory: {},
    forcedSteps: [],
    probability: 1.0,
  });

  // Player intent modes = pick representative clears using objective functions.
  // Note: Asset is now abstract (same scale as CS/Autonomy), no scaling needed.
  function pickBest(filterFn, scoreFn) {
    let best = null;
    for (const c of clears) {
      if (filterFn && !filterFn(c)) continue;
      const score = scoreFn(c);
      if (!best || score > best.score) best = { score, clear: c };
    }
    return best?.clear ?? null;
  }

  const keySkillId = stageMetadata.keySkillId;

  // Helper to check if player prefers a specific choice (A or B) when not forced
  // Forced steps (where only one choice was available) are ignored
  function isPrefersChoice(c, preferredLetter) {
    const questionSteps = c.steps.filter((s) => s.startsWith("Q"));
    const forcedSet = new Set(c.forcedSteps ?? []);

    for (let i = 0; i < questionSteps.length; i++) {
      const step = questionSteps[i];
      const qIndex = i; // 0-based question index

      // Skip forced steps - player had no choice
      if (forcedSet.has(qIndex)) continue;

      // For non-forced steps, check if preferred choice was made
      if (!step.endsWith(preferredLetter)) return false;
    }
    return true;
  }

  const intents = {
    maximize_CS: pickBest(null, (c) => c.CS),
    maximize_Autonomy: pickBest(null, (c) => c.Autonomy),
    maximize_Asset: pickBest(null, (c) => c.Asset),
    minimize_CS_clear: pickBest(null, (c) => -c.CS),
    minimize_Autonomy_clear: pickBest(null, (c) => -c.Autonomy),
    keySkill_maximize_CS: pickBest(
      (c) => c.selectedSkillIds.includes(keySkillId),
      (c) => c.CS
    ),
    keySkill_maximize_Autonomy: pickBest(
      (c) => c.selectedSkillIds.includes(keySkillId),
      (c) => c.Autonomy
    ),
    balanced_survivor: pickBest(
      null,
      (c) => minOf3(c.CS, c.Asset, c.Autonomy)
    ),
    autonomy_forward_but_S: pickBest(
      (c) => c.rank === "S",
      (c) => c.Autonomy
    ),
    prefer_A_choice: pickBest(
      (c) => isPrefersChoice(c, "A"),
      (c) => c.CS
    ),
    prefer_B_choice: pickBest(
      (c) => isPrefersChoice(c, "B"),
      (c) => c.CS
    ),
  };

  // Summaries
  const lockSummary = [];
  for (const [key, v] of [...stats.lockStats.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    const unlocked = v.reached - v.locked;
    lockSummary.push({
      key,
      unlocked,
      reached: v.reached,
      unlockedPct: unlocked / v.reached,
      weightedReached: v.weightedReached,
      weightedUnlocked: v.weightedUnlocked,
      weightedUnlockedPct: v.weightedReached > 0 ? v.weightedUnlocked / v.weightedReached : 0,
      req: v.req,
    });
  }

  // Build skill activation summary
  const skillActivationSummary = [];
  for (const [skillId, v] of [...stats.skillActivations.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    skillActivationSummary.push({
      skillId,
      activations: v.activations,
      opportunities: v.opportunities,
      activationRate: v.opportunities > 0 ? v.activations / v.opportunities : 0,
      totalImpact: v.totalImpact,
      perQuestion: v.perQuestion
        ? [...v.perQuestion.entries()]
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([qid, qv]) => ({ qid, ...qv }))
        : [],
    });
  }

  const lethalChoiceSummary = [...stats.lethalChoices.entries()]
    .map(([key, v]) => ({ key, ...v }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  const keySkillAvailabilitySummary = [...stats.keySkillAvailability.entries()]
    .map(([skillId, v]) => ({
      skillId,
      reached: v.reached,
      unlocked: v.unlocked,
      locked: v.locked,
      unlockedPct: v.reached ? v.unlocked / v.reached : 0,
      req: v.req,
    }))
    .sort((a, b) => a.skillId.localeCompare(b.skillId));

  const clearCS = clears.map((c) => c.CS);
  const clearAsset = clears.map((c) => c.Asset);
  const clearAutonomy = clears.map((c) => c.Autonomy);
  const clearMin = clears.map((c) => minParam(c));

  const clearDistributions = {
    CS: computePercentiles(clearCS),
    Asset: computePercentiles(clearAsset),
    Autonomy: computePercentiles(clearAutonomy),
    minParam: computePercentiles(clearMin),
    nearDeath: {
      minParamLe5: clearMin.filter((v) => v <= 5).length,
      minParamLe10: clearMin.filter((v) => v <= 10).length,
      minParamLe20: clearMin.filter((v) => v <= 20).length,
      autonomyLe5: clearAutonomy.filter((v) => v <= 5).length,
      autonomyLe10: clearAutonomy.filter((v) => v <= 10).length,
    },
  };

  const loadouts = [...loadoutStats.entries()]
    .map(([key, v]) => ({
      loadout: key,
      terminalPaths: v.terminalPaths,
      clears: v.clears,
      gameOvers: v.gameOvers,
      clearRate: v.terminalPaths ? v.clears / v.terminalPaths : 0,
      rankDistribution: v.rankDist,
      gameOverByParam: v.gameOverByParam,
      clearsFinal: {
        CS: computePercentiles(v.clearsFinal.CS),
        Asset: computePercentiles(v.clearsFinal.Asset),
        Autonomy: computePercentiles(v.clearsFinal.Autonomy),
        minParam: computePercentiles(v.clearsFinal.minParam),
      },
    }))
    .sort((a, b) => b.clearRate - a.clearRate);


  let coverageSummary = null;
  if (stats.coverage) {
    const questionTags = {};
    for (const [qid, tags] of stats.coverage.tagsByQuestion.entries()) {
      questionTags[qid] = tags;
    }
    const tagCounts = {};
    for (const tags of stats.coverage.tagsByQuestion.values()) {
      for (const t of tags) tagCounts[t] = (tagCounts[t] ?? 0) + 1;
    }
    const missingMustCover = mustCover.filter((t) => !tagCounts[t]);
    coverageSummary = { mustCover, tagCounts, missingMustCover, questionTags };
  }

  return {
    stageId,
    questionCount: questions.length,
    initialParams: initial,
    totals: {
      terminalPaths: stats.totalTerminalPaths,
      clears: stats.clears,
      gameOvers: stats.gameOvers,
      clearRate: stats.clears / stats.totalTerminalPaths,
      weightedClears: stats.weightedClears,
      weightedGameOvers: stats.weightedGameOvers,
      weightedClearRate: stats.weightedClears,
    },
    rankDistribution: stats.clearsByRank,
    weightedRankDistribution: stats.weightedRanks,
    gameOverByParam: stats.gameOverByParam,
    weightedGameOverByParam: stats.weightedGameOverByParam,
    gameOverByQ: stats.gameOverByQ,
    locks: lockSummary,
    keySkillAvailability: keySkillAvailabilitySummary,
    topLethalChoices: lethalChoiceSummary,
    skillActivations: skillActivationSummary,
    deadEnds: stats.deadEnds,
    intents,
    clearDistributions,
    loadouts,
    coverage: coverageSummary,
  };
}

function printReport(report) {
  const { totals } = report;
  console.log(`Stage ${report.stageId} simulation`);
  console.log(
    `- totalPaths: ${totals.terminalPaths}, clears: ${totals.clears} (${pct(
      totals.clears,
      totals.terminalPaths
    )}), gameOvers: ${totals.gameOvers} (${pct(totals.gameOvers, totals.terminalPaths)})`
  );
  console.log(
    `- weighted (random play): clear ${(totals.weightedClears * 100).toFixed(1)}%, game over ${(totals.weightedGameOvers * 100).toFixed(1)}%`
  );
  console.log("");

  console.log("Rank distribution (among clears)");
  for (const r of ["S", "A", "B", "C", "F"]) {
    const n = report.rankDistribution[r] ?? 0;
    if (n) console.log(`- ${r}: ${n} (${pct(n, totals.clears)})`);
  }
  console.log("");

  console.log("Weighted rank distribution (random play, among clears)");
  if (totals.weightedClears > 0) {
    for (const r of ["S", "A", "B", "C", "F"]) {
      const w = report.weightedRankDistribution[r] ?? 0;
      if (w > 0) console.log(`- ${r}: ${(w / totals.weightedClears * 100).toFixed(1)}%`);
    }
  } else {
    console.log("- (no clears)");
  }
  console.log("");

  console.log("Game over by param");
  console.log(
    `- CS: ${report.gameOverByParam.CS}, Asset: ${report.gameOverByParam.Asset}, Autonomy: ${report.gameOverByParam.Autonomy}`
  );
  console.log(
    `- weighted: CS ${(report.weightedGameOverByParam.CS * 100).toFixed(1)}%, Asset ${(report.weightedGameOverByParam.Asset * 100).toFixed(1)}%, Autonomy ${(report.weightedGameOverByParam.Autonomy * 100).toFixed(1)}%`
  );
  console.log("");

  console.log("Game over by Q (after answering)");
  const qKeys = Object.keys(report.gameOverByQ)
    .map((k) => Number(k))
    .sort((a, b) => a - b);
  if (qKeys.length === 0) {
    console.log("- (none)");
  } else {
    for (const qn of qKeys) {
      const n = report.gameOverByQ[qn];
      console.log(`- after Q${qn}: ${n} (${pct(n, totals.terminalPaths)})`);
    }
  }
  console.log("");

  if (report.topLethalChoices && report.topLethalChoices.length > 0) {
    console.log("Top lethal choices (immediate game over)");
    for (const lc of report.topLethalChoices) {
      const parts = [];
      if (lc.byParam.CS) parts.push(`CS:${lc.byParam.CS}`);
      if (lc.byParam.Asset) parts.push(`Asset:${lc.byParam.Asset}`);
      if (lc.byParam.Autonomy) parts.push(`Autonomy:${lc.byParam.Autonomy}`);
      console.log(
        `- ${lc.key}: ${lc.total} (${pct(lc.total, totals.terminalPaths)}) killers=[${parts.join(
          ", "
        )}]`
      );
    }
    console.log("");
  }

  console.log("Lock availability (unlocked / reached)");
  if (report.locks.length === 0) {
    console.log("- (no locks)");
  } else {
    for (const l of report.locks) {
      console.log(
        `- ${l.key}: ${l.unlocked}/${l.reached} (${pct(l.unlocked, l.reached)}) weighted: ${(l.weightedUnlockedPct * 100).toFixed(1)}% req=${JSON.stringify(
          l.req
        )}`
      );
    }
  }
  console.log("");

  if (report.keySkillAvailability && report.keySkillAvailability.length > 0) {
    console.log("Key skill availability (unlocked / reached at Offer 2)");
    for (const ks of report.keySkillAvailability) {
      console.log(
        `- ${ks.skillId}: ${ks.unlocked}/${ks.reached} (${pct(ks.unlocked, ks.reached)}) req=${JSON.stringify(
          ks.req
        )}`
      );
    }
    console.log("");
  }

  if (report.deadEnds > 0) {
    console.log(`WARNING: deadEnds (all choices locked) = ${report.deadEnds}`);
    console.log("");
  }


  if (report.coverage) {
    console.log("Coverage (meta)");
    const missing = report.coverage.missingMustCover ?? [];
    if (missing.length) {
      console.log(`- missingMustCover: ${missing.join(", ")}`);
    } else {
      console.log("- missingMustCover: (none)");
    }
    console.log("");
  }

  if (report.clearDistributions) {
    console.log("Clear distributions (percentiles)");
    const cd = report.clearDistributions;
    function fmt(v) {
      if (v === null || v === undefined) return "-";
      // prefer integer-like output for this simulator
      return Number.isFinite(v) ? `${Math.round(v)}` : `${v}`;
    }
    function line(name, obj) {
      console.log(
        `- ${name}: p5=${fmt(obj.p5)} p25=${fmt(obj.p25)} p50=${fmt(obj.p50)} p75=${fmt(obj.p75)} p95=${fmt(obj.p95)} min=${fmt(obj.min)} max=${fmt(obj.max)}`
      );
    }
    line("CS", cd.CS);
    line("Asset", cd.Asset);
    line("Autonomy", cd.Autonomy);
    line("minParam", cd.minParam);
    console.log(
      `- nearDeath: min<=5 ${cd.nearDeath.minParamLe5} (${pct2(cd.nearDeath.minParamLe5, totals.clears)}), min<=10 ${cd.nearDeath.minParamLe10} (${pct2(cd.nearDeath.minParamLe10, totals.clears)}), min<=20 ${cd.nearDeath.minParamLe20} (${pct2(cd.nearDeath.minParamLe20, totals.clears)}), autonomy<=5 ${cd.nearDeath.autonomyLe5} (${pct2(cd.nearDeath.autonomyLe5, totals.clears)}), autonomy<=10 ${cd.nearDeath.autonomyLe10} (${pct2(cd.nearDeath.autonomyLe10, totals.clears)})`
    );
    console.log("");
  }

  if (report.loadouts && report.loadouts.length > 0) {
    console.log("Loadouts");
    for (const l of report.loadouts) {
      console.log(
        `- ${l.loadout}: clears ${l.clears}/${l.terminalPaths} (${pct(l.clears, l.terminalPaths)}), gameOvers ${l.gameOvers} | ranks S:${l.rankDistribution.S} A:${l.rankDistribution.A} B:${l.rankDistribution.B} C:${l.rankDistribution.C}`
      );
    }
    console.log("");
  }

  console.log("Skill activations (when skill modified effect)");
  if (!report.skillActivations || report.skillActivations.length === 0) {
    console.log("- (no skill activations tracked)");
  } else {
    for (const s of report.skillActivations) {
      const impactParts = [];
      if (s.totalImpact.CS !== 0) impactParts.push(`CS: ${s.totalImpact.CS >= 0 ? '+' : ''}${s.totalImpact.CS}`);
      if (s.totalImpact.Asset !== 0) impactParts.push(`Asset: ${s.totalImpact.Asset >= 0 ? '+' : ''}${s.totalImpact.Asset}`);
      if (s.totalImpact.Autonomy !== 0) impactParts.push(`Autonomy: ${s.totalImpact.Autonomy >= 0 ? '+' : ''}${s.totalImpact.Autonomy}`);
      const impactStr = impactParts.length > 0 ? impactParts.join(', ') : 'no impact';
      console.log(
        `- ${s.skillId}: ${s.activations}/${s.opportunities} activations (${pct(s.activations, s.opportunities)}) | impact: ${impactStr}`
      );
      if (s.perQuestion && s.perQuestion.length > 0) {
        const hot = s.perQuestion
          .filter((qv) => (qv.activations ?? 0) > 0)
          .sort((a, b) => (b.activations ?? 0) - (a.activations ?? 0))
          .slice(0, 5);
        if (hot.length > 0) {
          console.log(
            `  topQuestions: ${hot
              .map(
                (qv) =>
                  `${qv.qid} ${qv.activations}/${qv.opportunities} (${pct(qv.activations, qv.opportunities)})`
              )
              .join(", ")}`
          );
        }
      }
    }
  }
  console.log("");

  console.log("Player intent modes (representative clears)");
  const intentOrder = [
    "maximize_CS",
    "maximize_Autonomy",
    "maximize_Asset",
    "balanced_survivor",
    "autonomy_forward_but_S",
    "keySkill_maximize_CS",
    "keySkill_maximize_Autonomy",
    "minimize_CS_clear",
    "minimize_Autonomy_clear",
    "prefer_A_choice",
    "prefer_B_choice",
  ];
  for (const key of intentOrder) {
    const c = report.intents[key];
    if (!c) {
      console.log(`- ${key}: (no clear path)`);
      continue;
    }
    console.log(
      `- ${key}: rank=${c.rank}, CS=${c.CS}, Asset=${c.Asset}, Autonomy=${c.Autonomy}, skills=[${c.selectedSkills}]`
    );
    console.log(`  path: ${c.path}`);
  }
}

function main() {
  const args = parseArgs(process.argv);

  const configMod = evalTSModule("src/config.ts");
  const config = configMod.CONFIG;
  if (!config || !Array.isArray(config.SKILL_OFFER_POSITIONS)) {
    die("Failed to load CONFIG from src/config.ts");
  }

  const skillEffectsMod = evalTSModule("src/data/skillEffects.ts");
  const applySkillEffects = skillEffectsMod.applySkillEffects;
  if (typeof applySkillEffects !== "function") {
    die("Failed to load applySkillEffects from src/data/skillEffects.ts");
  }

  const stageMetaMod = evalTSModule("src/data/stageMetadata.ts");
  const getStageMetadata = stageMetaMod.getStageMetadata;
  if (typeof getStageMetadata !== "function") {
    die("Failed to load getStageMetadata from src/data/stageMetadata.ts");
  }

  const stageMod = evalTSModule(args.stageFile);
  const questions = stageMod[args.exportName];
  if (!questions) {
    die(
      `Export not found: ${args.exportName} in ${args.stageFile}. Use --export to specify the correct export name.`
    );
  }

  const stageMetadata = getStageMetadata(args.stageId);

  const meta = args.metaFile ? safeReadJSON(args.metaFile) : null;

  const report = simulateStage({
    questions,
    stageMetadata,
    config,
    applySkillEffects,
    stageId: args.stageId,
    meta,
  });

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printReport(report);
  }
}

main();
