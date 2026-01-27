#!/usr/bin/env node

/**
 * Stage Comparison Script
 * Runs simulation on all stages and outputs comparison statistics
 * Matches the logic of simulate_stage.mjs exactly
 *
 * Usage: node scripts/compare_stages.mjs
 */

import { STAGE_METADATA } from '../src/data/stageMetadata.ts';
import { CONFIG } from '../src/config.ts';
import { applySkillEffects } from '../src/data/skillEffects.ts';

// Dynamic imports for stage questions
const stageQuestions = {
    1: (await import('../src/data/stages/stage1.ts')).stage1Questions,
    2: (await import('../src/data/stages/stage2.ts')).stage2Questions,
    3: (await import('../src/data/stages/stage3.ts')).stage3Questions,
    4: (await import('../src/data/stages/stage4.ts')).stage4Questions,
    5: (await import('../src/data/stages/stage5.ts')).stage5Questions,
    6: (await import('../src/data/stages/stage6.ts')).stage6Questions,
    7: (await import('../src/data/stages/stage7.ts')).stage7Questions,
    8: (await import('../src/data/stages/stage8.ts')).stage8Questions,
    9: (await import('../src/data/stages/stage9.ts')).stage9Questions,
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
        lockAvailability: {}
    };

    // Initialize lock tracking
    questions.forEach((q) => {
        q.choices.forEach((c, cIdx) => {
            if (c.lockRequirements) {
                const key = `${q.id}:${cIdx}`;
                results.lockAvailability[key] = { reached: 0, unlocked: 0, req: c.lockRequirements };
            }
        });
    });

    // DFS to enumerate all valid paths (matching simulate_stage.mjs logic)
    function dfs({ qIndex, state, activeSkills, offerPicked1, offerPicked2, selectedSkillIds, choiceHistory }) {
        // Completed all questions - clear!
        if (qIndex >= questions.length) {
            results.totalPaths++;
            results.clears++;
            const rank = getRank(state.CS, thresholds);
            results.ranks[rank]++;
            return;
        }

        const question = questions[qIndex];

        // Record lock stats for this question
        question.choices.forEach((c, cIdx) => {
            if (c.lockRequirements) {
                const key = `${question.id}:${cIdx}`;
                results.lockAvailability[key].reached++;
                if (!isLocked(state, c.lockRequirements)) {
                    results.lockAvailability[key].unlocked++;
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
            return;
        }

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
                if (next.CS <= 0) results.gameOverByParam.CS++;
                else if (next.Asset <= 0) results.gameOverByParam.Asset++;
                else results.gameOverByParam.Autonomy++;
                continue;
            }

            // Check for skill offer
            const offerNumber = offerPositions.get(qIndex);

            if (offerNumber === 1 && !offerPicked1) {
                // Skill offer 1 - branch on each skill
                for (const s of stageMetadata.skills.offer1) {
                    dfs({
                        qIndex: qIndex + 1,
                        state: next,
                        activeSkills: [...activeSkills, s],
                        offerPicked1: true,
                        offerPicked2,
                        selectedSkillIds: [...selectedSkillIds, s.id],
                        choiceHistory: nextChoiceHistory,
                    });
                }
                continue;
            }

            if (offerNumber === 2 && offerPicked1 && !offerPicked2) {
                // Skill offer 2 - branch on each pickable skill
                const pickable = [];
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
                        }
                    } else {
                        pickable.push(s);
                    }
                }

                for (const s of pickable) {
                    dfs({
                        qIndex: qIndex + 1,
                        state: next,
                        activeSkills: [...activeSkills, s],
                        offerPicked1,
                        offerPicked2: true,
                        selectedSkillIds: [...selectedSkillIds, s.id],
                        choiceHistory: nextChoiceHistory,
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
            });
        }
    }

    // Start DFS
    dfs({
        qIndex: 0,
        state: initial,
        activeSkills: [],
        offerPicked1: false,
        offerPicked2: false,
        selectedSkillIds: [],
        choiceHistory: {},
    });

    return results;
}

function formatPercent(value, total) {
    if (total === 0) return '0.0%';
    return (value / total * 100).toFixed(1) + '%';
}

function formatLockAvailability(lockData) {
    const entries = Object.entries(lockData);
    if (entries.length === 0) return 'None';

    return entries.map(([key, data]) => {
        const qNum = key.match(/q(\d+)/)?.[1] || '?';
        const percent = formatPercent(data.unlocked, data.reached);
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

// Clear Rate
console.log('# Clear Rate');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r) {
        console.log(`Stage ${stageId}: ${formatPercent(r.clears, r.totalPaths)} (${r.clears}/${r.totalPaths})`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

// Rank Rate (among clears)
console.log('# Rank Rate (among clears)');
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

// Game Over by Param
console.log('# Game Over by Parameter');
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

// Lock Availability
console.log('# Lock Availability');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r) {
        console.log(`Stage ${stageId}: ${formatLockAvailability(r.lockAvailability)}`);
    } else {
        console.log(`Stage ${stageId}: (N/A)`);
    }
}
console.log('');

// Summary Table
console.log('# Summary Table');
console.log('| Stage | Clear | S-Rank | Primary Killer |');
console.log('|-------|-------|--------|----------------|');
for (let stageId = 1; stageId <= 10; stageId++) {
    const r = allResults[stageId];
    if (r) {
        const clearRate = formatPercent(r.clears, r.totalPaths);
        const sRate = formatPercent(r.ranks.S, r.clears);
        const killers = Object.entries(r.gameOverByParam)
            .filter(([_, v]) => v > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([k, v]) => `${k}(${v})`)
            .join(', ') || 'None';
        console.log(`| ${stageId} | ${clearRate} | ${sRate} | ${killers} |`);
    } else {
        console.log(`| ${stageId} | N/A | N/A | N/A |`);
    }
}
