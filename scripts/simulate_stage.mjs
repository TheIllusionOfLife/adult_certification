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

function evalTSModule(filePath) {
  const abs = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(abs)) {
    die(`File not found: ${filePath}`);
  }

  const source = fs.readFileSync(abs, "utf8");
  const out = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
    },
    fileName: abs,
  });

  const sandbox = {
    module: { exports: {} },
    exports: {},
    require, // not expected for stage/data modules, but safe for future use
    __dirname: path.dirname(abs),
    __filename: abs,
    console,
    process,
  };
  sandbox.exports = sandbox.module.exports;

  vm.createContext(sandbox);
  vm.runInContext(out.outputText, sandbox, { filename: abs });
  return sandbox.module.exports;
}

function pct(n, d) {
  if (!d) return "0.0%";
  return `${((n * 100) / d).toFixed(1)}%`;
}

function formatPathSteps(steps) {
  return steps.join(" ");
}

function minOf3(a, b, c) {
  return Math.min(a, b, c);
}

function simulateStage({
  questions,
  stageMetadata,
  config,
  applySkillEffects,
  stageId,
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
    lockStats: new Map(), // key `${qid}:${choiceIndex}` -> { reached, locked, req }
    deadEnds: 0, // reached a question where all choices were locked (should be 0)
    skillActivations: new Map(), // skillId -> { activations: number, totalImpact: { CS, Asset, Autonomy } }
  };

  const clears = [];

  function recordLockStats(state, q) {
    q.choices.forEach((c, i) => {
      if (!c.lockRequirements) return;
      const key = `${q.id}:${i}`;
      const entry =
        stats.lockStats.get(key) ?? {
          reached: 0,
          locked: 0,
          req: c.lockRequirements,
        };
      entry.reached += 1;
      if (isLocked(state, c)) entry.locked += 1;
      stats.lockStats.set(key, entry);
    });
  }

  function recordGameOver(idxQ1Based, stateAfter) {
    stats.totalTerminalPaths++;
    stats.gameOvers++;
    stats.gameOverByQ[idxQ1Based] = (stats.gameOverByQ[idxQ1Based] ?? 0) + 1;
    if (stateAfter.CS <= 0) stats.gameOverByParam.CS++;
    else if (stateAfter.Asset <= 0) stats.gameOverByParam.Asset++;
    else stats.gameOverByParam.Autonomy++;
  }

  function recordClear(stateFinal, steps, selectedSkillIds) {
    stats.totalTerminalPaths++;
    stats.clears++;
    const rank = rankForCS(stateFinal.CS);
    stats.clearsByRank[rank] = (stats.clearsByRank[rank] ?? 0) + 1;
    clears.push({
      ...stateFinal,
      rank,
      steps: [...steps],
      path: formatPathSteps(steps),
      selectedSkillIds: [...selectedSkillIds],
      selectedSkills: [...selectedSkillIds].join(" + "),
    });
  }

  function dfs({
    qIndex,
    state,
    activeSkills,
    offerPicked1,
    offerPicked2,
    selectedSkillIds,
    steps,
  }) {
    if (qIndex >= questions.length) {
      recordClear(state, steps, selectedSkillIds);
      return;
    }

    const q = questions[qIndex];
    recordLockStats(state, q);

    const availableChoiceIndices = [];
    for (let ci = 0; ci < q.choices.length; ci++) {
      if (!isLocked(state, q.choices[ci])) availableChoiceIndices.push(ci);
    }

    if (availableChoiceIndices.length === 0) {
      // Should never happen if design rule "never both locked" holds.
      stats.deadEnds++;
      stats.totalTerminalPaths++;
      stats.gameOvers++;
      stats.gameOverByQ[qIndex + 1] = (stats.gameOverByQ[qIndex + 1] ?? 0) + 1;
      return;
    }

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
          totalImpact: { CS: 0, Asset: 0, Autonomy: 0 }
        };

        // Count as opportunity whenever skill is active
        entry.opportunities++;

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
        }

        stats.skillActivations.set(skillId, entry);
      });

      const next = {
        CS: state.CS + modified.CS,
        Asset: state.Asset + modified.Asset,
        Autonomy: state.Autonomy + modified.Autonomy,
      };

      const nextSteps = [...steps, `Q${qIndex + 1}${String.fromCharCode(65 + ci)}`];

      if (next.CS <= 0 || next.Asset <= 0 || next.Autonomy <= 0) {
        recordGameOver(qIndex + 1, next);
        continue;
      }

      const offerNumber = offerPositions.get(qIndex);
      if (offerNumber === 1 && !offerPicked1) {
        for (const s of stageMetadata.skills.offer1) {
          dfs({
            qIndex: qIndex + 1,
            state: next,
            activeSkills: [...activeSkills, s],
            offerPicked1: true,
            offerPicked2,
            selectedSkillIds: [...selectedSkillIds, s.id],
            steps: [...nextSteps, `SK1:${s.id}`],
          });
        }
        continue;
      }

      if (offerNumber === 2 && offerPicked1 && !offerPicked2) {
        for (const s of stageMetadata.skills.offer2) {
          dfs({
            qIndex: qIndex + 1,
            state: next,
            activeSkills: [...activeSkills, s],
            offerPicked1,
            offerPicked2: true,
            selectedSkillIds: [...selectedSkillIds, s.id],
            steps: [...nextSteps, `SK2:${s.id}`],
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
  });

  // Player intent modes = pick representative clears using objective functions.
  // Note: Asset is scaled by 1/1000 in composite objectives to keep magnitudes comparable.
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
      (c) => minOf3(c.CS, Math.floor(c.Asset / 1000), c.Autonomy)
    ),
    autonomy_forward_but_S: pickBest(
      (c) => c.rank === "S",
      (c) => c.Autonomy
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
    });
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
    },
    rankDistribution: stats.clearsByRank,
    gameOverByParam: stats.gameOverByParam,
    gameOverByQ: stats.gameOverByQ,
    locks: lockSummary,
    skillActivations: skillActivationSummary,
    deadEnds: stats.deadEnds,
    intents,
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
  console.log("");

  console.log("Rank distribution (among clears)");
  for (const r of ["S", "A", "B", "C", "F"]) {
    const n = report.rankDistribution[r] ?? 0;
    if (n) console.log(`- ${r}: ${n} (${pct(n, totals.clears)})`);
  }
  console.log("");

  console.log("Game over by param");
  console.log(
    `- CS: ${report.gameOverByParam.CS}, Asset: ${report.gameOverByParam.Asset}, Autonomy: ${report.gameOverByParam.Autonomy}`
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

  console.log("Lock availability (unlocked / reached)");
  if (report.locks.length === 0) {
    console.log("- (no locks)");
  } else {
    for (const l of report.locks) {
      console.log(
        `- ${l.key}: ${l.unlocked}/${l.reached} (${pct(l.unlocked, l.reached)}) req=${JSON.stringify(
          l.req
        )}`
      );
    }
  }
  console.log("");

  if (report.deadEnds > 0) {
    console.log(`WARNING: deadEnds (all choices locked) = ${report.deadEnds}`);
    console.log("");
  }

  console.log("Skill activations (when skill modified effect)");
  if (!report.skillActivations || report.skillActivations.length === 0) {
    console.log("- (no skill activations tracked)");
  } else {
    for (const s of report.skillActivations) {
      const impactParts = [];
      if (s.totalImpact.CS !== 0) impactParts.push(`CS: ${s.totalImpact.CS >= 0 ? '+' : ''}${s.totalImpact.CS}`);
      if (s.totalImpact.Asset !== 0) impactParts.push(`Asset: ${s.totalImpact.Asset >= 0 ? '+' : ''}${s.totalImpact.Asset.toLocaleString()}`);
      if (s.totalImpact.Autonomy !== 0) impactParts.push(`Autonomy: ${s.totalImpact.Autonomy >= 0 ? '+' : ''}${s.totalImpact.Autonomy}`);
      const impactStr = impactParts.length > 0 ? impactParts.join(', ') : 'no impact';
      console.log(
        `- ${s.skillId}: ${s.activations}/${s.opportunities} activations (${pct(s.activations, s.opportunities)}) | impact: ${impactStr}`
      );
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
  ];
  for (const key of intentOrder) {
    const c = report.intents[key];
    if (!c) {
      console.log(`- ${key}: (no clear path)`);
      continue;
    }
    console.log(
      `- ${key}: rank=${c.rank}, CS=${c.CS}, Asset=${c.Asset.toLocaleString()}, Autonomy=${c.Autonomy}, skills=[${c.selectedSkills}]`
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

  const report = simulateStage({
    questions,
    stageMetadata,
    config,
    applySkillEffects,
    stageId: args.stageId,
  });

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printReport(report);
  }
}

main();
