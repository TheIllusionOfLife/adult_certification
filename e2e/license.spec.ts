import { test, expect, Page } from '@playwright/test';

interface ProgressData {
    stageRanks: Record<number, 'S' | 'A' | 'B' | 'C'>;
    keySkills: string[];
}

interface RecordData {
    [key: string]: { rank: string; score: number; date: string };
}

/**
 * Helper to set up localStorage before page load.
 * Sets both global progress (for license calculation) and records (for stage unlock).
 */
async function setupProgress(page: Page, { stageRanks, keySkills }: ProgressData): Promise<void> {
    // Build records object from stageRanks to unlock stages
    const records: RecordData = {};
    for (const [stageId, rank] of Object.entries(stageRanks)) {
        records[`Stage${stageId}`] = {
            rank,
            score: 50,
            date: new Date().toLocaleDateString(),
        };
    }

    // Build completedStages array
    const completedStages = Object.keys(stageRanks).map(Number);

    await page.addInitScript(
        (data: { stageRanks: Record<number, string>; keySkills: string[]; completedStages: number[]; records: RecordData }) => {
            // Set global progress for license calculation
            localStorage.setItem(
                'ac_global_progress',
                JSON.stringify({
                    stageRanks: data.stageRanks,
                    keySkillsCollected: data.keySkills,
                    completedStages: data.completedStages,
                })
            );

            // Set records for stage unlock
            localStorage.setItem('ac_records', JSON.stringify(data.records));
        },
        { stageRanks, keySkills, completedStages, records }
    );
}

/**
 * Complete Stage 10 by clicking through all questions.
 * @param page - Playwright page
 * @param collectAWAKENING - If true, choose options that unlock and select AWAKENING skill
 */
async function completeStage10(page: Page, collectAWAKENING = false): Promise<void> {
    // Wait for stage selection screen to be ready
    await page.waitForSelector('#start-screen', { state: 'visible' });
    await page.waitForSelector('#difficulty-list .diff-btn', { state: 'visible' });

    // Find and click Stage 10 button (it should be the last one if all stages are unlocked)
    const stageBtns = page.locator('#difficulty-list .diff-btn');
    const count = await stageBtns.count();

    // Click Stage 10 (last button)
    await stageBtns.nth(count - 1).click();

    // Wait for start screen to hide and question to appear
    await page.waitForSelector('#start-screen', { state: 'hidden', timeout: 5000 });

    // Wait for question text to change from initial state
    await page.waitForFunction(
        () => {
            const qText = document.querySelector('#question-text');
            return qText && qText.textContent !== 'Loading simulation...';
        },
        { timeout: 5000 }
    );

    // Answer all 10 questions
    for (let q = 1; q <= 10; q++) {
        // Wait for choices to be visible
        await page.waitForSelector('#choices-grid button.choice-btn', { state: 'visible', timeout: 5000 });

        // Strategy for AWAKENING:
        // - Starts at Autonomy=100
        // - Q1: Choose B (Autonomy +10, becomes 110)
        // - Q2: Choose B (Autonomy +10, becomes 120)
        // - Q3: Choose B (Autonomy +10, becomes 130)
        // - Q4: Choose B (Autonomy +10, becomes 140)
        // - Q5: Choose B (Autonomy +20, becomes 160)
        // - Q6: Choose B (Autonomy +10, becomes 170)
        // - Q7: Choose A (requires Autonomy >= 150, unlocks AWAKENING pathway)
        // After Q7, skill offer 2 appears with AWAKENING option

        // Get available choice buttons
        const buttons = page.locator('#choices-grid button.choice-btn:not(.choice-locked)');
        const buttonCount = await buttons.count();

        // Always pick second choice (APPROVED answer) if available
        // This avoids game-over scenarios from WARNING choices
        // The second choice typically boosts Autonomy which is needed for Q7's AWAKENING choice
        if (buttonCount >= 2) {
            await buttons.nth(1).click();
        } else {
            // Fallback to first available choice if only one exists
            await buttons.first().click();
        }

        // Wait for feedback overlay
        await page.waitForSelector('#overlay', { state: 'visible' });

        // Wait a moment for the overlay content to be set up
        await page.waitForTimeout(200);

        // Check if skill selection box appeared (after Q3 and Q7)
        const skillBoxDisplay = await page.locator('#skill-select-box').evaluate((el) => getComputedStyle(el).display);
        const skillBoxVisible = skillBoxDisplay === 'flex';

        if (skillBoxVisible) {
            // If collecting AWAKENING, try to pick the key skill at Q7's offer
            const keySkillBtn = page.locator('#skill-select-box button.key-skill-btn:not(.skill-locked)');
            const keySkillCount = await keySkillBtn.count();

            if (collectAWAKENING && keySkillCount > 0) {
                await keySkillBtn.first().click();
            } else {
                // Pick first available normal skill
                await page.locator('#skill-select-box button.skill-btn:not(.skill-locked)').first().click();
            }
        } else {
            // Click next button to continue
            await page.locator('#btn-next').click();
        }

        // Brief wait for transition
        await page.waitForTimeout(100);
    }

    // Wait for final certification screen
    await page.waitForSelector('.final-certification', { state: 'visible', timeout: 10000 });
}

test.describe('License System', () => {
    test('PAPER license - worst rank C', async ({ page }) => {
        // Setup: All stages 1-9 with C rank, no key skills
        await setupProgress(page, {
            stageRanks: {
                1: 'C',
                2: 'C',
                3: 'C',
                4: 'C',
                5: 'C',
                6: 'C',
                7: 'C',
                8: 'C',
                9: 'C',
            },
            keySkills: [],
        });

        await page.goto('/');
        await completeStage10(page, false);

        // Verify PAPER license
        await expect(page.locator('.final-certification')).toContainText('ペーパー大人免許');
    });

    test('BRONZE license - worst rank B', async ({ page }) => {
        // Setup: Mixed ranks with worst = B
        await setupProgress(page, {
            stageRanks: {
                1: 'S',
                2: 'S',
                3: 'A',
                4: 'A',
                5: 'B',
                6: 'S',
                7: 'A',
                8: 'S',
                9: 'A',
            },
            keySkills: [],
        });

        await page.goto('/');
        await completeStage10(page, false);

        // Verify BRONZE license
        await expect(page.locator('.final-certification')).toContainText('グリーン大人免許');
    });

    test('SILVER license - worst rank A', async ({ page }) => {
        // Setup: Mixed ranks with worst = A
        await setupProgress(page, {
            stageRanks: {
                1: 'S',
                2: 'S',
                3: 'A',
                4: 'S',
                5: 'S',
                6: 'S',
                7: 'A',
                8: 'S',
                9: 'S',
            },
            keySkills: [],
        });

        await page.goto('/');
        await completeStage10(page, false);

        // Verify SILVER license
        await expect(page.locator('.final-certification')).toContainText('ブルー大人免許');
    });

    test('GOLD license - all S ranks', async ({ page }) => {
        // Setup: All S ranks
        await setupProgress(page, {
            stageRanks: {
                1: 'S',
                2: 'S',
                3: 'S',
                4: 'S',
                5: 'S',
                6: 'S',
                7: 'S',
                8: 'S',
                9: 'S',
            },
            keySkills: [],
        });

        await page.goto('/');
        await completeStage10(page, false);

        // Verify GOLD license
        await expect(page.locator('.final-certification')).toContainText('ゴールド大人免許');
    });

    test('TRUE license - all 10 key skills', async ({ page }) => {
        // Setup: 9 key skills already collected, need to get AWAKENING in Stage 10
        await setupProgress(page, {
            stageRanks: {
                1: 'C',
                2: 'C',
                3: 'C',
                4: 'C',
                5: 'C',
                6: 'C',
                7: 'C',
                8: 'C',
                9: 'C',
            },
            keySkills: [
                'MEDIATION',
                'EVIDENCE_CHAIN',
                'COMPOUND_SENSE',
                'DUE_PROCESS',
                'SAFETY_NET_NAVIGATION',
                'NEGOTIATION_PROTOCOL',
                'CONTRACT_LITERACY',
                'IDENTITY_HYGIENE',
                'DAMAGE_CONTROL',
            ],
        });

        await page.goto('/');
        // Must collect AWAKENING to get TRUE ending
        await completeStage10(page, true);

        // Verify TRUE license
        await expect(page.locator('.final-certification')).toContainText('真・大人免許');
        await expect(page.locator('.final-certification')).toContainText('10/10');
    });

    test('TRUE takes priority over GOLD', async ({ page }) => {
        // Setup: All S ranks AND all key skills - TRUE should take priority
        await setupProgress(page, {
            stageRanks: {
                1: 'S',
                2: 'S',
                3: 'S',
                4: 'S',
                5: 'S',
                6: 'S',
                7: 'S',
                8: 'S',
                9: 'S',
            },
            keySkills: [
                'MEDIATION',
                'EVIDENCE_CHAIN',
                'COMPOUND_SENSE',
                'DUE_PROCESS',
                'SAFETY_NET_NAVIGATION',
                'NEGOTIATION_PROTOCOL',
                'CONTRACT_LITERACY',
                'IDENTITY_HYGIENE',
                'DAMAGE_CONTROL',
            ],
        });

        await page.goto('/');
        await completeStage10(page, true);

        // TRUE takes priority even with all S ranks
        await expect(page.locator('.final-certification')).toContainText('真・大人免許');
    });
});
