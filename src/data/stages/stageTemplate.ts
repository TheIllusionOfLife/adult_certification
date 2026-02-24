import type { StageMetadata, Skill } from '../../types';
import { CONFIG } from '../../config';

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
 * Applies default rankThresholds and initialParams from CONFIG if not specified.
 */
export function createStageMetadata(definition: StageDefinition): StageMetadata {
    return {
        id: definition.id,
        theme: definition.theme,
        themeJP: definition.themeJP,
        keySkillId: definition.keySkillId,
        initialParams: definition.initialParams ?? { ...CONFIG.DEFAULT_INITIAL_PARAMS },
        rankThresholds: definition.rankThresholds ?? {
            S: { CS: CONFIG.RANK_THRESHOLDS.S },
            A: { CS: CONFIG.RANK_THRESHOLDS.A },
            B: { CS: CONFIG.RANK_THRESHOLDS.B },
            // C = clear (CS >= 1), no explicit threshold needed
        },
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
    recommendComment?: string,
    nameEN?: string,
    descEN?: string,
    recommendCommentEN?: string
): Skill {
    const skill: Skill = {
        id,
        name,
        nameEN,
        desc,
        descEN,
        effect,
        category: 'normal',
    };
    if (isRecommended) {
        skill.isRecommended = true;
        if (recommendComment) {
            skill.recommendComment = recommendComment;
        }
        if (recommendCommentEN) {
            skill.recommendCommentEN = recommendCommentEN;
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
    keySkillRequirement: { questionId: string; choiceIndex: number },
    descEN?: string,
    adamCommentEN?: string
): Skill {
    return {
        id,
        name,
        nameEN,
        desc,
        descEN,
        effect,
        category: 'key',
        isCollectible: true,
        acquiredStage,
        adamComment,
        adamCommentEN,
        keySkillRequirement,
    };
}
