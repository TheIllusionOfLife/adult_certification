import { describe, it, expect } from 'vitest';
import { applySkillEffects, getSkillActivations } from '../../src/data/skillEffects';
import type { Skill, Question } from '../../src/types';

// Test fixtures
const createTestQuestion = (category: string = 'FINANCE'): Question => ({
    id: 'test_q01',
    category,
    text: 'Test question',
    imagePrompt: 'Test image',
    choices: [],
});

describe('applySkillEffects', () => {
    describe('damage reduction effects', () => {
        it('autonomy_damage_reduction reduces autonomy damage by percentage', () => {
            const baseEffect = { CS: 0, Asset: 0, Autonomy: -20 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Reduces autonomy damage by 30%',
                    effect: { type: 'autonomy_damage_reduction', value: 0.3 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            // -20 * (1 - 0.3) = -20 * 0.7 = -14, ceil(-14) = -14
            expect(result.Autonomy).toBe(-14);
            expect(result.CS).toBe(0);
            expect(result.Asset).toBe(0);
        });

        it('autonomy_damage_reduction does not affect positive autonomy', () => {
            const baseEffect = { CS: 0, Asset: 0, Autonomy: 20 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'autonomy_damage_reduction', value: 0.3 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            expect(result.Autonomy).toBe(20);
        });

        it('cs_damage_reduction reduces CS damage by percentage', () => {
            const baseEffect = { CS: -30, Asset: 0, Autonomy: 0 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'cs_damage_reduction', value: 0.5 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            // -30 * (1 - 0.5) = -30 * 0.5 = -15
            expect(result.CS).toBe(-15);
        });

        it('asset_damage_reduction reduces asset damage by percentage', () => {
            const baseEffect = { CS: 0, Asset: -10000, Autonomy: 0 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'asset_damage_reduction', value: 0.3 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            // -10000 * 0.7 = -7000
            expect(result.Asset).toBe(-7000);
        });

        it('autonomy_small_damage_reduction only affects damage within threshold', () => {
            const question = createTestQuestion();
            const skill: Skill = {
                id: 'test',
                name: 'Test Skill',
                desc: 'Test',
                effect: { type: 'autonomy_small_damage_reduction', value: 0.5, threshold: -20 },
            };

            // Small damage (-15) should be reduced
            const smallDamage = { CS: 0, Asset: 0, Autonomy: -15 };
            const smallResult = applySkillEffects(smallDamage, question, [skill]);
            // -15 * (1 - 0.5) = -15 * 0.5 = -7.5, ceil(-7.5) = -7
            expect(smallResult.Autonomy).toBe(-7);

            // Large damage (-25) should NOT be reduced (exceeds threshold)
            const largeDamage = { CS: 0, Asset: 0, Autonomy: -25 };
            const largeResult = applySkillEffects(largeDamage, question, [skill]);
            expect(largeResult.Autonomy).toBe(-25);
        });
    });

    describe('category-specific damage reduction', () => {
        it('category_cs_damage_reduction only applies to matching category', () => {
            const skill: Skill = {
                id: 'test',
                name: 'Test Skill',
                desc: 'Test',
                effect: { type: 'category_cs_damage_reduction', value: 0.4, category: 'LABOR' },
            };
            const baseEffect = { CS: -20, Asset: 0, Autonomy: 0 };

            // LABOR question - should apply
            const laborQuestion = createTestQuestion('LABOR');
            const laborResult = applySkillEffects(baseEffect, laborQuestion, [skill]);
            expect(laborResult.CS).toBe(-12); // ceil(-20 * 0.6) = -12

            // FINANCE question - should NOT apply
            const financeQuestion = createTestQuestion('FINANCE');
            const financeResult = applySkillEffects(baseEffect, financeQuestion, [skill]);
            expect(financeResult.CS).toBe(-20);
        });

        it('category_autonomy_damage_reduction only applies to matching category', () => {
            const skill: Skill = {
                id: 'test',
                name: 'Test Skill',
                desc: 'Test',
                effect: { type: 'category_autonomy_damage_reduction', value: 0.6, category: 'SOCIAL' },
            };
            const baseEffect = { CS: 0, Asset: 0, Autonomy: -10 };

            // SOCIAL question - should apply
            const socialQuestion = createTestQuestion('SOCIAL');
            const socialResult = applySkillEffects(baseEffect, socialQuestion, [skill]);
            expect(socialResult.Autonomy).toBe(-4); // ceil(-10 * 0.4) = -4

            // ADMIN question - should NOT apply
            const adminQuestion = createTestQuestion('ADMIN');
            const adminResult = applySkillEffects(baseEffect, adminQuestion, [skill]);
            expect(adminResult.Autonomy).toBe(-10);
        });

        it('category_asset_damage_reduction only applies to matching category', () => {
            const skill: Skill = {
                id: 'test',
                name: 'Test Skill',
                desc: 'Test',
                effect: { type: 'category_asset_damage_reduction', value: 0.25, category: 'FINANCE' },
            };
            const baseEffect = { CS: 0, Asset: -10000, Autonomy: 0 };

            // FINANCE question - should apply
            const financeQuestion = createTestQuestion('FINANCE');
            const financeResult = applySkillEffects(baseEffect, financeQuestion, [skill]);
            expect(financeResult.Asset).toBe(-7500); // ceil(-10000 * 0.75) = -7500

            // ADMIN question - should NOT apply
            const adminQuestion = createTestQuestion('ADMIN');
            const adminResult = applySkillEffects(baseEffect, adminQuestion, [skill]);
            expect(adminResult.Asset).toBe(-10000);
        });

        it('admin_cost_reduction reduces asset cost for ADMIN category', () => {
            const skill: Skill = {
                id: 'test',
                name: 'Test Skill',
                desc: 'Test',
                effect: { type: 'admin_cost_reduction', value: 3000 },
            };
            const baseEffect = { CS: 0, Asset: -5000, Autonomy: 0 };

            // ADMIN question - should apply
            const adminQuestion = createTestQuestion('ADMIN');
            const adminResult = applySkillEffects(baseEffect, adminQuestion, [skill]);
            expect(adminResult.Asset).toBe(-2000); // min(0, -5000 + 3000) = -2000

            // FINANCE question - should NOT apply
            const financeQuestion = createTestQuestion('FINANCE');
            const financeResult = applySkillEffects(baseEffect, financeQuestion, [skill]);
            expect(financeResult.Asset).toBe(-5000);
        });

        it('admin_cost_reduction caps at 0 (no gain from reduction)', () => {
            const skill: Skill = {
                id: 'test',
                name: 'Test Skill',
                desc: 'Test',
                effect: { type: 'admin_cost_reduction', value: 10000 },
            };
            const baseEffect = { CS: 0, Asset: -5000, Autonomy: 0 };
            const adminQuestion = createTestQuestion('ADMIN');

            const result = applySkillEffects(baseEffect, adminQuestion, [skill]);
            expect(result.Asset).toBe(0); // min(0, -5000 + 10000) = 0
        });
    });

    describe('gain amplification effects', () => {
        it('cs_gain_amplification increases CS gains by percentage', () => {
            const baseEffect = { CS: 20, Asset: 0, Autonomy: 0 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'cs_gain_amplification', value: 0.5 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            // floor(20 * 1.5) = 30
            expect(result.CS).toBe(30);
        });

        it('cs_gain_amplification does not affect negative CS', () => {
            const baseEffect = { CS: -10, Asset: 0, Autonomy: 0 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'cs_gain_amplification', value: 0.5 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            expect(result.CS).toBe(-10);
        });

        it('asset_gain_amplification increases Asset gains by percentage', () => {
            const baseEffect = { CS: 0, Asset: 10000, Autonomy: 0 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'asset_gain_amplification', value: 0.3 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            // floor(10000 * 1.3) = 13000
            expect(result.Asset).toBe(13000);
        });

        it('autonomy_gain_amplification increases Autonomy gains by percentage', () => {
            const baseEffect = { CS: 0, Asset: 0, Autonomy: 10 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'autonomy_gain_amplification', value: 0.2 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            // floor(10 * 1.2) = 12
            expect(result.Autonomy).toBe(12);
        });
    });

    describe('flat bonus effects', () => {
        it('flat_cs_bonus adds fixed CS bonus', () => {
            const baseEffect = { CS: 5, Asset: 0, Autonomy: 0 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'flat_cs_bonus', value: 3 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            expect(result.CS).toBe(8);
        });

        it('flat_asset_bonus adds fixed Asset bonus', () => {
            const baseEffect = { CS: 0, Asset: 5000, Autonomy: 0 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'flat_asset_bonus', value: 1000 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            expect(result.Asset).toBe(6000);
        });

        it('flat_autonomy_bonus adds fixed Autonomy bonus', () => {
            const baseEffect = { CS: 0, Asset: 0, Autonomy: 5 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'flat_autonomy_bonus', value: 2 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            expect(result.Autonomy).toBe(7);
        });

        it('flat bonus can offset negative effects', () => {
            const baseEffect = { CS: -10, Asset: 0, Autonomy: 0 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'test',
                    name: 'Test Skill',
                    desc: 'Test',
                    effect: { type: 'flat_cs_bonus', value: 5 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            expect(result.CS).toBe(-5);
        });
    });

    describe('category-specific gain boosts', () => {
        it('category_cs_gain_boost only applies to matching category', () => {
            const skill: Skill = {
                id: 'test',
                name: 'Test Skill',
                desc: 'Test',
                effect: { type: 'category_cs_gain_boost', value: 0.3, category: 'ADMIN' },
            };
            const baseEffect = { CS: 10, Asset: 0, Autonomy: 0 };

            // ADMIN question - should apply
            const adminQuestion = createTestQuestion('ADMIN');
            const adminResult = applySkillEffects(baseEffect, adminQuestion, [skill]);
            expect(adminResult.CS).toBe(13); // floor(10 * 1.3) = 13

            // FINANCE question - should NOT apply
            const financeQuestion = createTestQuestion('FINANCE');
            const financeResult = applySkillEffects(baseEffect, financeQuestion, [skill]);
            expect(financeResult.CS).toBe(10);
        });

        it('category_asset_gain_boost only applies to matching category', () => {
            const skill: Skill = {
                id: 'test',
                name: 'Test Skill',
                desc: 'Test',
                effect: { type: 'category_asset_gain_boost', value: 0.5, category: 'FINANCE' },
            };
            const baseEffect = { CS: 0, Asset: 10000, Autonomy: 0 };

            // FINANCE question - should apply
            const financeQuestion = createTestQuestion('FINANCE');
            const financeResult = applySkillEffects(baseEffect, financeQuestion, [skill]);
            expect(financeResult.Asset).toBe(15000);

            // SOCIAL question - should NOT apply
            const socialQuestion = createTestQuestion('SOCIAL');
            const socialResult = applySkillEffects(baseEffect, socialQuestion, [skill]);
            expect(socialResult.Asset).toBe(10000);
        });

        it('category_autonomy_gain_boost only applies to matching category', () => {
            const skill: Skill = {
                id: 'test',
                name: 'Test Skill',
                desc: 'Test',
                effect: { type: 'category_autonomy_gain_boost', value: 0.4, category: 'HEALTH' },
            };
            const baseEffect = { CS: 0, Asset: 0, Autonomy: 10 };

            // HEALTH question - should apply
            const healthQuestion = createTestQuestion('HEALTH');
            const healthResult = applySkillEffects(baseEffect, healthQuestion, [skill]);
            expect(healthResult.Autonomy).toBe(14); // floor(10 * 1.4) = 14

            // LABOR question - should NOT apply
            const laborQuestion = createTestQuestion('LABOR');
            const laborResult = applySkillEffects(baseEffect, laborQuestion, [skill]);
            expect(laborResult.Autonomy).toBe(10);
        });
    });

    describe('multiple skills', () => {
        it('applies multiple skills in order', () => {
            const baseEffect = { CS: 0, Asset: 0, Autonomy: -20 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'skill1',
                    name: 'Skill 1',
                    desc: 'Test',
                    effect: { type: 'autonomy_damage_reduction', value: 0.3 },
                },
                {
                    id: 'skill2',
                    name: 'Skill 2',
                    desc: 'Test',
                    effect: { type: 'flat_autonomy_bonus', value: 5 },
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            // First: -20 * 0.7 = -14, then: -14 + 5 = -9
            expect(result.Autonomy).toBe(-9);
        });

        it('applies main effect and additional effects for multi-effect skills', () => {
            const baseEffect = { CS: -10, Asset: 0, Autonomy: -10 };
            const question = createTestQuestion();
            const skills: Skill[] = [
                {
                    id: 'multi',
                    name: 'Multi Skill',
                    desc: 'Test',
                    effect: { type: 'cs_damage_reduction', value: 0.5 },
                    effects: [{ type: 'autonomy_damage_reduction', value: 0.3 }],
                },
            ];

            const result = applySkillEffects(baseEffect, question, skills);

            expect(result.CS).toBe(-5); // -10 * 0.5
            expect(result.Autonomy).toBe(-7); // ceil(-10 * 0.7)
        });
    });

    describe('no skills', () => {
        it('returns base effect unchanged when no skills', () => {
            const baseEffect = { CS: 10, Asset: -5000, Autonomy: -5 };
            const question = createTestQuestion();

            const result = applySkillEffects(baseEffect, question, []);

            expect(result).toEqual(baseEffect);
        });
    });
});

describe('getSkillActivations', () => {
    it('returns activation for damage reduction skill', () => {
        const originalEffect = { CS: 0, Asset: 0, Autonomy: -20 };
        const modifiedEffect = { CS: 0, Asset: 0, Autonomy: -14 };
        const question = createTestQuestion();
        const skills: Skill[] = [
            {
                id: 'test',
                name: 'メンタルシールド',
                desc: 'Test',
                effect: { type: 'autonomy_damage_reduction', value: 0.3 },
            },
        ];

        const activations = getSkillActivations(originalEffect, modifiedEffect, question, skills);

        expect(activations).toHaveLength(1);
        expect(activations[0].skillName).toBe('メンタルシールド');
        expect(activations[0].originalValue).toBe(-20);
        expect(activations[0].modifiedValue).toBe(-14);
    });

    it('returns empty array when skill did not activate', () => {
        const originalEffect = { CS: 10, Asset: 0, Autonomy: 0 };
        const modifiedEffect = { CS: 10, Asset: 0, Autonomy: 0 };
        const question = createTestQuestion();
        const skills: Skill[] = [
            {
                id: 'test',
                name: 'Test Skill',
                desc: 'Test',
                effect: { type: 'autonomy_damage_reduction', value: 0.3 },
            },
        ];

        const activations = getSkillActivations(originalEffect, modifiedEffect, question, skills);

        expect(activations).toHaveLength(0);
    });

    it('always returns activation for flat bonus skills', () => {
        const originalEffect = { CS: 5, Asset: 0, Autonomy: 0 };
        const modifiedEffect = { CS: 8, Asset: 0, Autonomy: 0 };
        const question = createTestQuestion();
        const skills: Skill[] = [
            {
                id: 'test',
                name: 'Flat Bonus',
                desc: 'Test',
                effect: { type: 'flat_cs_bonus', value: 3 },
            },
        ];

        const activations = getSkillActivations(originalEffect, modifiedEffect, question, skills);

        expect(activations).toHaveLength(1);
        expect(activations[0].description).toBe('社会的信用固定ボーナス');
    });

    it('returns activation for category-specific skill only on matching category', () => {
        const originalEffect = { CS: -20, Asset: 0, Autonomy: 0 };
        const modifiedEffect = { CS: -12, Asset: 0, Autonomy: 0 };
        const laborQuestion = createTestQuestion('LABOR');
        const skills: Skill[] = [
            {
                id: 'test',
                name: 'Labor Shield',
                desc: 'Test',
                effect: { type: 'category_cs_damage_reduction', value: 0.4, category: 'LABOR' },
            },
        ];

        const activations = getSkillActivations(originalEffect, modifiedEffect, laborQuestion, skills);

        expect(activations).toHaveLength(1);

        // Different category - no activation
        const financeQuestion = createTestQuestion('FINANCE');
        const noActivations = getSkillActivations(originalEffect, originalEffect, financeQuestion, skills);
        expect(noActivations).toHaveLength(0);
    });
});
