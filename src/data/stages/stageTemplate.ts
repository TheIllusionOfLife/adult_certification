import type { StageMetadata, Skill } from '../../types';
import { CONFIG } from '../../config';

/**
 * Default rank thresholds used by all stages.
 * Based on CONFIG.RANK_THRESHOLDS for CS values.
 */
export const DEFAULT_RANK_THRESHOLDS = {
    S: { CS: CONFIG.RANK_THRESHOLDS.S },
    A: { CS: CONFIG.RANK_THRESHOLDS.A },
    B: { CS: CONFIG.RANK_THRESHOLDS.B },
    // C = clear (CS >= 1), no explicit threshold needed
} as const;

/**
 * Default initial parameters used when stage doesn't specify custom values.
 */
export const DEFAULT_INITIAL_PARAMS = {
    CS: CONFIG.DEFAULT_INITIAL_PARAMS.CS,
    Asset: CONFIG.DEFAULT_INITIAL_PARAMS.Asset,
    Autonomy: CONFIG.DEFAULT_INITIAL_PARAMS.Autonomy,
} as const;

/**
 * Input definition for creating stage metadata.
 * Skills and basic info are required; rankThresholds and initialParams are optional.
 */
export interface StageDefinition {
    id: number;
    theme: string;
    themeJP: string;
    keySkillId: string;
    initialParams?: {
        CS: number;
        Asset: number;
        Autonomy: number;
    };
    rankThresholds?: {
        S: { CS: number };
        A: { CS: number };
        B: { CS: number };
    };
    skills: {
        offer1: [Skill, Skill];
        offer2: [Skill, Skill];
    };
}

/**
 * Factory function to create StageMetadata from a StageDefinition.
 * Applies default rankThresholds and initialParams if not specified.
 */
export function createStageMetadata(definition: StageDefinition): StageMetadata {
    return {
        id: definition.id,
        theme: definition.theme,
        themeJP: definition.themeJP,
        keySkillId: definition.keySkillId,
        initialParams: definition.initialParams ?? { ...DEFAULT_INITIAL_PARAMS },
        rankThresholds: definition.rankThresholds ?? { ...DEFAULT_RANK_THRESHOLDS },
        skills: definition.skills,
    };
}

/**
 * Helper to create a normal skill with standard properties.
 */
export function createNormalSkill(
    id: string,
    name: string,
    desc: string,
    effect: Skill['effect'],
    isRecommended: boolean = false,
    recommendComment?: string
): Skill {
    const skill: Skill = {
        id,
        name,
        desc,
        effect,
        category: 'normal',
    };
    if (isRecommended) {
        skill.isRecommended = true;
        if (recommendComment) {
            skill.recommendComment = recommendComment;
        }
    }
    return skill;
}

/**
 * Helper to create a key skill with required collectible properties.
 */
export function createKeySkill(
    id: string,
    name: string,
    nameEN: string,
    desc: string,
    effect: Skill['effect'],
    acquiredStage: number,
    adamComment: string,
    keySkillRequirement: { questionId: string; choiceIndex: number }
): Skill {
    return {
        id,
        name,
        nameEN,
        desc,
        effect,
        category: 'key',
        isCollectible: true,
        acquiredStage,
        adamComment,
        keySkillRequirement,
    };
}
