import { describe, it, expect } from 'vitest';
import { STAGE_METADATA, getStageMetadata } from '../../src/data/stageMetadata';
import { CONFIG } from '../../src/config';

describe('Stage Metadata Validation', () => {
    describe('STAGE_METADATA array', () => {
        it('contains 9 stages', () => {
            expect(STAGE_METADATA).toHaveLength(9);
        });

        it('has sequential stage IDs from 1 to 9', () => {
            const ids = STAGE_METADATA.map((s) => s.id);
            expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('all stages have unique IDs', () => {
            const ids = STAGE_METADATA.map((s) => s.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(ids.length);
        });
    });

    describe('getStageMetadata function', () => {
        it('returns correct stage for valid ID', () => {
            const stage1 = getStageMetadata(1);
            expect(stage1).toBeDefined();
            expect(stage1?.id).toBe(1);
            expect(stage1?.themeJP).toBe('社会の基本');
        });

        it('returns undefined for invalid ID', () => {
            expect(getStageMetadata(0)).toBeUndefined();
            expect(getStageMetadata(10)).toBeUndefined();
            expect(getStageMetadata(-1)).toBeUndefined();
        });
    });

    describe('rankThresholds consistency', () => {
        it('all stages use CONFIG.RANK_THRESHOLDS values', () => {
            STAGE_METADATA.forEach((stage) => {
                expect(stage.rankThresholds.S.CS).toBe(CONFIG.RANK_THRESHOLDS.S);
                expect(stage.rankThresholds.A.CS).toBe(CONFIG.RANK_THRESHOLDS.A);
                expect(stage.rankThresholds.B.CS).toBe(CONFIG.RANK_THRESHOLDS.B);
            });
        });
    });

    describe('initialParams validation', () => {
        it('all stages have valid initial CS (positive)', () => {
            STAGE_METADATA.forEach((stage) => {
                expect(stage.initialParams.CS).toBeGreaterThan(0);
            });
        });

        it('all stages have valid initial Asset (positive)', () => {
            STAGE_METADATA.forEach((stage) => {
                expect(stage.initialParams.Asset).toBeGreaterThan(0);
            });
        });

        it('all stages have valid initial Autonomy (positive)', () => {
            STAGE_METADATA.forEach((stage) => {
                expect(stage.initialParams.Autonomy).toBeGreaterThan(0);
            });
        });

        it('Stage 1 has higher initial Asset (beginner-friendly)', () => {
            const stage1 = getStageMetadata(1);
            const stage2 = getStageMetadata(2);
            expect(stage1?.initialParams.Asset).toBeGreaterThan(stage2?.initialParams.Asset ?? 0);
        });
    });

    describe('skills structure validation', () => {
        it('all stages have exactly 2 skills in offer1', () => {
            STAGE_METADATA.forEach((stage) => {
                expect(stage.skills.offer1).toHaveLength(2);
            });
        });

        it('all stages have exactly 2 skills in offer2', () => {
            STAGE_METADATA.forEach((stage) => {
                expect(stage.skills.offer2).toHaveLength(2);
            });
        });

        it('all skill IDs are unique within a stage', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                const ids = allSkills.map((s) => s.id);
                const uniqueIds = new Set(ids);
                expect(uniqueIds.size).toBe(ids.length);
            });
        });

        it('all skill IDs are unique across all stages', () => {
            const allSkillIds: string[] = [];
            STAGE_METADATA.forEach((stage) => {
                const skills = [...stage.skills.offer1, ...stage.skills.offer2];
                skills.forEach((s) => allSkillIds.push(s.id));
            });
            const uniqueIds = new Set(allSkillIds);
            expect(uniqueIds.size).toBe(allSkillIds.length);
        });
    });

    describe('keySkill validation', () => {
        it('each stage has exactly one key skill', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                const keySkills = allSkills.filter((s) => s.category === 'key');
                expect(keySkills).toHaveLength(1);
            });
        });

        it('keySkillId matches the actual key skill ID', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                const keySkill = allSkills.find((s) => s.category === 'key');
                expect(keySkill?.id).toBe(stage.keySkillId);
            });
        });

        it('all key skills have keySkillRequirement', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                const keySkill = allSkills.find((s) => s.category === 'key');
                expect(keySkill?.keySkillRequirement).toBeDefined();
                expect(keySkill?.keySkillRequirement?.questionId).toBeDefined();
                expect(keySkill?.keySkillRequirement?.choiceIndex).toBeDefined();
            });
        });

        it('all key skills reference valid question IDs (sX_q07 pattern)', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                const keySkill = allSkills.find((s) => s.category === 'key');
                const questionId = keySkill?.keySkillRequirement?.questionId;

                // Key skills should reference Q7 of their stage
                const expectedPattern = new RegExp(`^s${stage.id}_q07$`);
                expect(questionId).toMatch(expectedPattern);
            });
        });

        it('all key skills are collectible', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                const keySkill = allSkills.find((s) => s.category === 'key');
                expect(keySkill?.isCollectible).toBe(true);
            });
        });

        it('all key skills have correct acquiredStage', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                const keySkill = allSkills.find((s) => s.category === 'key');
                expect(keySkill?.acquiredStage).toBe(stage.id);
            });
        });
    });

    describe('normal skills validation', () => {
        it('each stage has exactly 3 normal skills', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                const normalSkills = allSkills.filter((s) => s.category === 'normal');
                expect(normalSkills).toHaveLength(3);
            });
        });

        it('at least one skill in each offer is recommended', () => {
            STAGE_METADATA.forEach((stage) => {
                const offer1Recommended = stage.skills.offer1.some((s) => s.isRecommended);
                const offer2Recommended = stage.skills.offer2.some((s) => s.isRecommended);
                expect(offer1Recommended || offer2Recommended).toBe(true);
            });
        });
    });

    describe('skill effect validation', () => {
        it('all skills have valid effect type', () => {
            const validTypes = [
                'autonomy_damage_reduction',
                'asset_damage_reduction',
                'cs_damage_reduction',
                'category_autonomy_damage_reduction',
                'category_asset_damage_reduction',
                'category_cs_damage_reduction',
                'autonomy_gain_amplification',
                'asset_gain_amplification',
                'cs_gain_amplification',
                'flat_autonomy_bonus',
                'flat_asset_bonus',
                'flat_cs_bonus',
                'category_autonomy_gain_boost',
                'category_asset_gain_boost',
                'category_cs_gain_boost',
                'admin_cost_reduction',
                'autonomy_small_damage_reduction',
            ];

            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                allSkills.forEach((skill) => {
                    expect(validTypes).toContain(skill.effect.type);
                });
            });
        });

        it('all damage reduction skills have value between 0 and 1', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                allSkills.forEach((skill) => {
                    if (skill.effect.type.includes('damage_reduction')) {
                        expect(skill.effect.value).toBeGreaterThan(0);
                        expect(skill.effect.value).toBeLessThanOrEqual(1);
                    }
                });
            });
        });

        it('all gain amplification skills have positive value', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                allSkills.forEach((skill) => {
                    if (skill.effect.type.includes('gain')) {
                        expect(skill.effect.value).toBeGreaterThan(0);
                    }
                });
            });
        });

        it('category-specific skills have category defined', () => {
            STAGE_METADATA.forEach((stage) => {
                const allSkills = [...stage.skills.offer1, ...stage.skills.offer2];
                allSkills.forEach((skill) => {
                    if (skill.effect.type.startsWith('category_')) {
                        expect(skill.effect.category).toBeDefined();
                        expect(skill.effect.category).not.toBe('');
                    }
                });
            });
        });
    });

    describe('theme validation', () => {
        it('all stages have both English and Japanese themes', () => {
            STAGE_METADATA.forEach((stage) => {
                expect(stage.theme).toBeDefined();
                expect(stage.theme.length).toBeGreaterThan(0);
                expect(stage.themeJP).toBeDefined();
                expect(stage.themeJP.length).toBeGreaterThan(0);
            });
        });

        it('all themes are unique', () => {
            const englishThemes = STAGE_METADATA.map((s) => s.theme);
            const japaneseThemes = STAGE_METADATA.map((s) => s.themeJP);

            expect(new Set(englishThemes).size).toBe(englishThemes.length);
            expect(new Set(japaneseThemes).size).toBe(japaneseThemes.length);
        });
    });
});
