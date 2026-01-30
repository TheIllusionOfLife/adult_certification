#!/usr/bin/env bun

/**
 * Stage Comparison Script
 * Runs simulation on all stages and outputs comparison statistics
 * Matches the logic of simulate_stage.mjs exactly
 *
 * Usage: bun scripts/compare_stages.mjs
 */

import { STAGE_METADATA } from '../src/data/stageMetadata';
import { CONFIG } from '../src/config';
import { applySkillEffects } from '../src/data/skillEffects';

// Dynamic imports for stage questions
const stageQuestions = {
    1: (await import('../src/data/stages/stage1')).stage1Questions,
    2: (await import('../src/data/stages/stage2')).stage2Questions,
    3: (await import('../src/data/stages/stage3')).stage3Questions,
    4: (await import('../src/data/stages/stage4')).stage4Questions,
    5: (await import('../src/data/stages/stage5')).stage5Questions,
    6: (await import('../src/data/stages/stage6')).stage6Questions,
    7: (await import('../src/data/stages/stage7')).stage7Questions,
    8: (await import('../src/data/stages/stage8')).stage8Questions,
    9: (await import('../src/data/stages/stage9')).stage9Questions,
    10: (await import('../src/data/stages/stage10')).stage10Questions,
};

// Build offer position map (same as simulate_stage.mjs)
const offerPositions = new Map();
for (let i = 0; i < CONFIG.SKILL_OFFER_POSITIONS.length; i++) {
    offerPositions.set(CONFIG.SKILL_OFFER_POSITIONS[i], i + 1); // 1 or 2
}

function getStageMetadata(stageId) {
    return STAGE_METADATA.find(s => s.id === stageId);
}

function getRank(cs, thresholds) {
    if (cs >= thresholds.S.CS) return 'S';
    if (cs >= thresholds.A.CS) return 'A';
    if (cs >= thresholds.B.CS) return 'B';
    if (cs >= 1) return 'C';
    return 'F';
}

function isLocked(params, requirements) {
    if (!requirements) return false;
    if (requirements.CS !== undefined && params.CS < requirements.CS) return true;
    if (requirements.Asset !== undefined && params.Asset < requirements.Asset) return true;
    if (requirements.Autonomy !== undefined && params.Autonomy < requirements.Autonomy) return true;
    return false;
}

function simulateStage(stageId) {
    const questions = stageQuestions[stageId];
    const stageMetadata = getStageMetadata(stageId);
    if (!questions || !stageMetadata) return null;

    const initial = { ...stageMetadata.initialParams };
    const thresholds = stageMetadata.rankThresholds;

    const results = {
        totalPaths: 0,
        clears: 0,
        gameOvers: 0,
        ranks: { S: 0, A: 0, B: 0, C: 0 },
        gameOverByParam: { CS: 0, Asset: 0, Autonomy: 0 },
        lockAvailability: {},
        // Weighted (probability-based) metrics
        weightedClears: 0,
        weightedGameOvers: 0,
        weightedRanks: { S: 0, A: 0, B: 0, C: 0 },
        weightedGameOverByParam: { CS: 0, Asset: 0, Autonomy: 0 },
        // Key skill availability by offer 1 path
        keySkillByPath: {
            autonomy: { reached: 0, available: 0, weightedReached: 0, weightedAvailable: 0 },
            csAsset: { reached: 0, available: 0, weightedReached: 0, weightedAvailable: 0 },
        },
    };

    // Initialize lock tracking
    questions.forEach((q) => {
        q.choices.forEach((c, cIdx) => {
            if (c.lockRequirements) {
                const key = `${q.id}:${cIdx}`;
                results.lockAvailability[key] = { reached: 0, unlocked: 0, weightedReached: 0, weightedUnlocked: 0, req: c.lockRequirements };
            }
        });
    });

    // DFS to enumerate all valid paths (matching simulate_stage.mjs logic)
    // probability: the probability of reaching this state with random choices
    function dfs({ qIndex, state, activeSkills, offerPicked1, offerPicked2, selectedSkillIds, choiceHistory, probability, offer1Path }) {
        // Completed all questions - clear!
        if (qIndex >= questions.length) {
            results.totalPaths++;
            results.clears++;
            results.weightedClears += probability;
            const rank = getRank(state.CS, thresholds);
            results.ranks[rank]++;
            results.weightedRanks[rank] += probability;
            return;
        }

        const question = questions[qIndex];

        // Record lock stats for this question
        question.choices.forEach((c, cIdx) => {
            if (c.lockRequirements) {
                const key = `${question.id}:${cIdx}`;
                results.lockAvailability[key].reached++;
                results.lockAvailability[key].weightedReached += probability;
                if (!isLocked(state, c.lockRequirements)) {
                    results.lockAvailability[key].unlocked++;
                    results.lockAvailability[key].weightedUnlocked += probability;
                }
            }
        });

        // Find available choices (not locked)
        const availableIndices = [];
        for (let ci = 0; ci < question.choices.length; ci++) {
            if (!isLocked(state, question.choices[ci].lockRequirements)) {
                availableIndices.push(ci);
            }
        }

        // Dead end - both choices locked
        if (availableIndices.length === 0) {
            results.totalPaths++;
            results.gameOvers++;
            results.weightedGameOvers += probability;
            return;
        }

        // Calculate probability for each choice (equal probability among available choices)
        const choiceProb = probability / availableIndices.length;

        // Branch on each available choice
        for (const ci of availableIndices) {
            const choice = question.choices[ci];
            const original = choice.effect || { CS: 0, Asset: 0, Autonomy: 0 };
            const modified = applySkillEffects(original, question, activeSkills);

            const next = {
                CS: state.CS + modified.CS,
                Asset: state.Asset + modified.Asset,
                Autonomy: state.Autonomy + modified.Autonomy,
            };

            const nextChoiceHistory = { ...choiceHistory, [question.id]: ci };

            // Check game over
            if (next.CS <= 0 || next.Asset <= 0 || next.Autonomy <= 0) {
                results.totalPaths++;
                results.gameOvers++;
                results.weightedGameOvers += choiceProb;
                if (next.CS <= 0) { results.gameOverByParam.CS++; results.weightedGameOverByParam.CS += choiceProb; }
                else if (next.Asset <= 0) { results.gameOverByParam.Asset++; results.weightedGameOverByParam.Asset += choiceProb; }
                else { results.gameOverByParam.Autonomy++; results.weightedGameOverByParam.Autonomy += choiceProb; }
                continue;
            }

            // Check for skill offer
            const offerNumber = offerPositions.get(qIndex);

            if (offerNumber === 1 && !offerPicked1) {
                // Skill offer 1 - branch on each skill
                const skillProb = choiceProb / stageMetadata.skills.offer1.length;
                for (const s of stageMetadata.skills.offer1) {
                    const path = s.effect?.type?.includes('autonomy') ? 'autonomy' : 'csAsset';
                    dfs({
                        qIndex: qIndex + 1,
                        state: next,
                        activeSkills: [...activeSkills, s],
                        offerPicked1: true,
                        offerPicked2,
                        selectedSkillIds: [...selectedSkillIds, s.id],
                        choiceHistory: nextChoiceHistory,
                        probability: skillProb,
                        offer1Path: path,
                    });
                }
                continue;
            }

            if (offerNumber === 2 && offerPicked1 && !offerPicked2) {
                // Skill offer 2 - branch on each pickable skill
                const pickable = [];
                let keySkillPickable = false;
                for (const s of stageMetadata.skills.offer2) {
                    if (s.category !== "key") {
                        pickable.push(s);
                        continue;
                    }
                    // Key skill requires earning via Q7 choice
                    const req = s.keySkillRequirement;
                    if (req) {
                        const selected = nextChoiceHistory[req.questionId];
                        if (selected === req.choiceIndex) {
                            pickable.push(s);
                            keySkillPickable = true;
                        }
                    } else {
                        pickable.push(s);
                        keySkillPickable = true;
                    }
                }

                // Record key skill availability by offer 1 path
                if (offer1Path) {
                    const bucket = results.keySkillByPath[offer1Path];
                    bucket.reached++;
                    bucket.weightedReached += choiceProb;
                    if (keySkillPickable) {
                        bucket.available++;
                        bucket.weightedAvailable += choiceProb;
                    }
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
                        choiceHistory: nextChoiceHistory,
                        probability: skillProb2,
                        offer1Path,
                    });
                }
                continue;
            }

            // No skill offer - continue to next question
            dfs({
                qIndex: qIndex + 1,
                state: next,
                activeSkills,
                offerPicked1,
                offerPicked2,
                selectedSkillIds,
                choiceHistory: nextChoiceHistory,
                probability: choiceProb,
                offer1Path,
            });
        }
    }

    // Start DFS with probability 1.0
    dfs({
        qIndex: 0,
        state: initial,
        activeSkills: [],
        offerPicked1: false,
        offerPicked2: false,
        selectedSkillIds: [],
        choiceHistory: {},
        probability: 1.0,
        offer1Path: null,
    });

    return results;
}

function formatPercent(value, total) {
    if (total === 0) return '0.0%';
    return (value / total * 100).toFixed(1) + '%';
}

function formatLockAvailability(lockData, weighted = false) {
    const entries = Object.entries(lockData);
    if (entries.length === 0) return 'None';

    return entries.map(([key, data]) => {
        const qNum = key.match(/q(\d+)/)?.[1] || '?';
        const percent = weighted
            ? (data.weightedReached > 0 ? (data.weightedUnlocked / data.weightedReached * 100).toFixed(1) + '%' : '0.0%')
            : formatPercent(data.unlocked, data.reached);
        const reqStr = Object.entries(data.req).map(([k, v]) => `${k}≥${v}`).join(', ');
        return `Q${qNum}: ${percent} (${reqStr})`;
    }).join(', ');
}

// Main execution
console.log('='.repeat(60));
console.log('STAGE COMPARISON REPORT');
console.log('='.repeat(60));
console.log('');

// Show initial parameters for each stage
console.log('# Initial Parameters');
for (let stageId = 1; stageId <= 10; stageId++) {
    const meta = getStageMetadata(stageId);
    if (meta) {
        const p = meta.initialParams;
        console.log(`Stage ${stageId}: CS=${p.CS}, Asset=${p.Asset}, Autonomy=${p.Autonomy}`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

const allResults = {};
for (let stageId = 1; stageId <= 10; stageId++) {
    allResults[stageId] = simulateStage(stageId);
}

// Clear Rate (path count)
console.log('# Clear Rate (path count)');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r) {
        console.log(`Stage ${stageId}: ${formatPercent(r.clears, r.totalPaths)} (${r.clears}/${r.totalPaths})`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

// Weighted Clear Rate (random play probability)
console.log('# Weighted Clear Rate (random play)');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r) {
        const clearPct = (r.weightedClears * 100).toFixed(1) + '%';
        const gameOverPct = (r.weightedGameOvers * 100).toFixed(1) + '%';
        console.log(`Stage ${stageId}: Clear ${clearPct}, Game Over ${gameOverPct}`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

// Rank Rate (path count, among clears)
console.log('# Rank Rate (path count, among clears)');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r && r.clears > 0) {
        const s = formatPercent(r.ranks.S, r.clears);
        const a = formatPercent(r.ranks.A, r.clears);
        const b = formatPercent(r.ranks.B, r.clears);
        const c = formatPercent(r.ranks.C, r.clears);
        console.log(`Stage ${stageId}: S(${s}), A(${a}), B(${b}), C(${c})`);
    } else if (r) {
        console.log(`Stage ${stageId}: No clears`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

// Weighted Rank Rate (random play probability, among clears)
console.log('# Weighted Rank Rate (random play, among clears)');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r && r.weightedClears > 0) {
        const s = (r.weightedRanks.S / r.weightedClears * 100).toFixed(1) + '%';
        const a = (r.weightedRanks.A / r.weightedClears * 100).toFixed(1) + '%';
        const b = (r.weightedRanks.B / r.weightedClears * 100).toFixed(1) + '%';
        const c = (r.weightedRanks.C / r.weightedClears * 100).toFixed(1) + '%';
        console.log(`Stage ${stageId}: S(${s}), A(${a}), B(${b}), C(${c})`);
    } else if (r) {
        console.log(`Stage ${stageId}: No clears`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

// Game Over by Param (path count)
console.log('# Game Over by Parameter (path count)');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r && r.gameOvers > 0) {
        const cs = r.gameOverByParam.CS;
        const asset = r.gameOverByParam.Asset;
        const autonomy = r.gameOverByParam.Autonomy;
        console.log(`Stage ${stageId}: CS(${cs}), Asset(${asset}), Autonomy(${autonomy}) — Total: ${r.gameOvers}`);
    } else if (r) {
        console.log(`Stage ${stageId}: No game overs`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

// Weighted Game Over by Param
console.log('# Game Over by Parameter (weighted)');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r && r.weightedGameOvers > 0) {
        const cs = (r.weightedGameOverByParam.CS * 100).toFixed(1) + '%';
        const asset = (r.weightedGameOverByParam.Asset * 100).toFixed(1) + '%';
        const autonomy = (r.weightedGameOverByParam.Autonomy * 100).toFixed(1) + '%';
        const total = (r.weightedGameOvers * 100).toFixed(1) + '%';
        console.log(`Stage ${stageId}: CS(${cs}), Asset(${asset}), Autonomy(${autonomy}) — Total: ${total}`);
    } else if (r) {
        console.log(`Stage ${stageId}: No game overs`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

// Lock Availability (path count)
console.log('# Lock Availability (path count)');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r) {
        console.log(`Stage ${stageId}: ${formatLockAvailability(r.lockAvailability)}`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

// Lock Availability (weighted)
console.log('# Lock Availability (weighted)');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r) {
        console.log(`Stage ${stageId}: ${formatLockAvailability(r.lockAvailability, true)}`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

// Key Skill Availability by Offer 1 Path
console.log('# Key Skill Availability by Offer 1 Path');
console.log('| Stage | Autonomy Path (paths) | Autonomy Path (weighted) | CS/Asset Path (paths) | CS/Asset Path (weighted) |');
console.log('|-------|-----------------------|--------------------------|----------------------|--------------------------|');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (!r) { console.log(`| ${stageId} | N/A | N/A | N/A | N/A |`); continue; }
    const auto = r.keySkillByPath.autonomy;
    const csA = r.keySkillByPath.csAsset;
    const autoPct = auto.reached > 0 ? `${auto.available}/${auto.reached} (${(auto.available / auto.reached * 100).toFixed(1)}%)` : 'N/A';
    const autoW = auto.weightedReached > 0 ? `${(auto.weightedAvailable / auto.weightedReached * 100).toFixed(1)}%` : 'N/A';
    const csAPct = csA.reached > 0 ? `${csA.available}/${csA.reached} (${(csA.available / csA.reached * 100).toFixed(1)}%)` : 'N/A';
    const csAW = csA.weightedReached > 0 ? `${(csA.weightedAvailable / csA.weightedReached * 100).toFixed(1)}%` : 'N/A';
    console.log(`| ${stageId} | ${autoPct} | ${autoW} | ${csAPct} | ${csAW} |`);
}
console.log('');

// Summary Table
console.log('# Summary Table');
console.log('| Stage | Clear (paths) | Clear (weighted) | S-Rank | Primary Killer |');
console.log('|-------|---------------|------------------|--------|----------------|');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r) {
        const clearRate = formatPercent(r.clears, r.totalPaths);
        const weightedClear = (r.weightedClears * 100).toFixed(1) + '%';
        const sRate = formatPercent(r.ranks.S, r.clears);
        const killers = Object.entries(r.weightedGameOverByParam)
            .filter(([_, v]) => v > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([k, v]) => `${k}(${(v * 100).toFixed(1)}%)`)
            .join(', ') || 'None';
        console.log(`| ${stageId} | ${clearRate} | ${weightedClear} | ${sRate} | ${killers} |`);
    } else {
        console.log(`| ${stageId} | N/A | N/A | N/A | N/A |`);
    }
}
