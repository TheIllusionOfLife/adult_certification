import { describe, it, expect } from 'vitest';
import { applySkillEffects, getSkillActivations } from '../../src/data/skillEffects';
import type { Skill, Question } from '../../src/types';

// Mock question for testing
const mockQuestion: Question = {
    id: 'test_q01',
    category: 'TEST',
    text: 'Test question',
    imagePrompt: 'Test prompt',
    choices: [],
};

describe('Skill Effects', () => {
    describe('all_damage_reduction (AWAKENING effect)', () => {
        const awakeningSkill: Skill = {
            id: 'AWAKENING',
            name: '覚醒',
            desc: 'Test awakening skill',
            effect: { type: 'all_damage_reduction', value: 0.2 },
            category: 'key',
        };

        it('should reduce all negative stats by 20%', () => {
            const baseEffect = { CS: -100, Asset: -10000, Autonomy: -50 };
            const result = applySkillEffects(baseEffect, mockQuestion, [awakeningSkill]);

            // -100 * (1 - 0.2) = -80, ceil(-80) = -80
            expect(result.CS).toBe(-80);
            // -10000 * (1 - 0.2) = -8000, ceil(-8000) = -8000
            expect(result.Asset).toBe(-8000);
            // -50 * (1 - 0.2) = -40, ceil(-40) = -40
            expect(result.Autonomy).toBe(-40);
        });

        it('should not affect positive stats', () => {
            const baseEffect = { CS: +50, Asset: +10000, Autonomy: +25 };
            const result = applySkillEffects(baseEffect, mockQuestion, [awakeningSkill]);

            expect(result.CS).toBe(50);
            expect(result.Asset).toBe(10000);
            expect(result.Autonomy).toBe(25);
        });

        it('should handle mixed positive and negative stats', () => {
            const baseEffect = { CS: -100, Asset: +5000, Autonomy: -30 };
            const result = applySkillEffects(baseEffect, mockQuestion, [awakeningSkill]);

            expect(result.CS).toBe(-80); // Reduced
            expect(result.Asset).toBe(5000); // Unchanged (positive)
            expect(result.Autonomy).toBe(-24); // Reduced: ceil(-30 * 0.8) = -24
        });

        it('should handle zero stats', () => {
            const baseEffect = { CS: 0, Asset: 0, Autonomy: 0 };
            const result = applySkillEffects(baseEffect, mockQuestion, [awakeningSkill]);

            expect(result.CS).toBe(0);
            expect(result.Asset).toBe(0);
            expect(result.Autonomy).toBe(0);
        });

        it('should round toward zero (ceil for negative numbers)', () => {
            // -15 * 0.8 = -12, ceil(-12) = -12
            const baseEffect1 = { CS: -15, Asset: 0, Autonomy: 0 };
            const result1 = applySkillEffects(baseEffect1, mockQuestion, [awakeningSkill]);
            expect(result1.CS).toBe(-12);

            // -17 * 0.8 = -13.6, ceil(-13.6) = -13
            const baseEffect2 = { CS: -17, Asset: 0, Autonomy: 0 };
            const result2 = applySkillEffects(baseEffect2, mockQuestion, [awakeningSkill]);
            expect(result2.CS).toBe(-13);
        });

        it('should only activate when at least one stat is negative', () => {
            const positiveEffect = { CS: 50, Asset: 10000, Autonomy: 25 };
            const activations = getSkillActivations(positiveEffect, positiveEffect, mockQuestion, [awakeningSkill]);

            // No activations when all stats are positive
            expect(activations).toHaveLength(0);
        });

        it('should activate and report changes when negative stats present', () => {
            const originalEffect = { CS: -100, Asset: -10000, Autonomy: -50 };
            const modifiedEffect = applySkillEffects(originalEffect, mockQuestion, [awakeningSkill]);
            const activations = getSkillActivations(originalEffect, modifiedEffect, mockQuestion, [awakeningSkill]);

            // Should have activation
            expect(activations.length).toBeGreaterThan(0);
            expect(activations[0].skillName).toBe('覚醒');
            expect(activations[0].description).toBe('全ダメージ軽減');
        });
    });

    describe('autonomy_damage_reduction', () => {
        const autonomySkill: Skill = {
            id: 'test_autonomy',
            name: 'メンタルシールド',
            desc: 'Test skill',
            effect: { type: 'autonomy_damage_reduction', value: 0.3 },
            category: 'normal',
        };

        it('should reduce only autonomy damage by 30%', () => {
            const baseEffect = { CS: -50, Asset: -10000, Autonomy: -100 };
            const result = applySkillEffects(baseEffect, mockQuestion, [autonomySkill]);

            expect(result.CS).toBe(-50); // Unchanged
            expect(result.Asset).toBe(-10000); // Unchanged
            expect(result.Autonomy).toBe(-70); // -100 * 0.7 = -70
        });
    });

    describe('cs_damage_reduction', () => {
        const csSkill: Skill = {
            id: 'test_cs',
            name: '印象操作',
            desc: 'Test skill',
            effect: { type: 'cs_damage_reduction', value: 0.5 },
            category: 'normal',
        };

        it('should reduce only CS damage by 50%', () => {
            const baseEffect = { CS: -100, Asset: -10000, Autonomy: -50 };
            const result = applySkillEffects(baseEffect, mockQuestion, [csSkill]);

            expect(result.CS).toBe(-50); // -100 * 0.5 = -50
            expect(result.Asset).toBe(-10000); // Unchanged
            expect(result.Autonomy).toBe(-50); // Unchanged
        });
    });

    describe('multiple skills stacking', () => {
        const csSkill: Skill = {
            id: 'cs_skill',
            name: 'CS Skill',
            desc: 'Test',
            effect: { type: 'cs_damage_reduction', value: 0.5 },
            category: 'normal',
        };

        const awakeningSkill: Skill = {
            id: 'AWAKENING',
            name: '覚醒',
            desc: 'Test awakening skill',
            effect: { type: 'all_damage_reduction', value: 0.2 },
            category: 'key',
        };

        it('should stack damage reduction effects', () => {
            const baseEffect = { CS: -100, Asset: -10000, Autonomy: -50 };
            const result = applySkillEffects(baseEffect, mockQuestion, [csSkill, awakeningSkill]);

            // CS: First reduced by 50% (-100 → -50), then by 20% (-50 → -40)
            expect(result.CS).toBe(-40);

            // Asset: Only reduced by awakening's 20%
            expect(result.Asset).toBe(-8000);

            // Autonomy: Only reduced by awakening's 20%
            expect(result.Autonomy).toBe(-40);
        });
    });

    describe('category-specific effects', () => {
        const laborSkill: Skill = {
            id: 'labor_skill',
            name: 'Labor Skill',
            desc: 'Test',
            effect: { type: 'category_autonomy_damage_reduction', value: 0.6, category: 'LABOR' },
            category: 'key',
        };

        it('should only activate for matching category', () => {
            const laborQuestion: Question = {
                ...mockQuestion,
                category: 'LABOR',
            };

            const baseEffect = { CS: 0, Asset: 0, Autonomy: -100 };
            const result = applySkillEffects(baseEffect, laborQuestion, [laborSkill]);

            expect(result.Autonomy).toBe(-40); // Reduced by 60%
        });

        it('should not activate for non-matching category', () => {
            const otherQuestion: Question = {
                ...mockQuestion,
                category: 'SOCIAL',
            };

            const baseEffect = { CS: 0, Asset: 0, Autonomy: -100 };
            const result = applySkillEffects(baseEffect, otherQuestion, [laborSkill]);

            expect(result.Autonomy).toBe(-100); // Not reduced
        });
    });
});
