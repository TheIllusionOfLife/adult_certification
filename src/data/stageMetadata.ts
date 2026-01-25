import type { StageMetadata } from '../types';

export const STAGE_1_METADATA: StageMetadata = {
    id: 1,
    theme: "Social Basics",
    themeJP: "社会の基本",
    keySkillId: "SOCIAL_CALIBRATION",
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 },
    rankThresholds: {
        S: { CS: 80 },
        A: { CS: 50 },
        B: { CS: 20 }
        // C = clear (CS >= 1)
    },
    skills: {
        offer1: [
            {
                id: "s1_normal_01",
                name: "メンタルシールド",
                desc: "全ての自律性ダメージを30%軽減します。",
                effect: { type: "autonomy_damage_reduction", value: 0.3 },
                category: "normal"
                // Protects Autonomy - the hidden critical resource for True Ending
            },
            {
                id: "s1_normal_02",
                name: "節約マインド",
                desc: "全ての資産減少を30%軽減します。",
                effect: { type: "asset_damage_reduction", value: 0.3 },
                category: "normal",
                isRecommended: true
                // A.D.A.M. recommends: protects Asset (practical survival resource)
            }
        ],
        offer2: [
            {
                id: "s1_normal_03",
                name: "印象操作",
                desc: "全ての信用度低下を50%軽減します。",
                effect: { type: "cs_damage_reduction", value: 0.5 },
                category: "normal",
                isRecommended: true
                // A.D.A.M. recommends: protects CS (objective ranking resource)
            },
            {
                id: "SOCIAL_CALIBRATION",
                name: "社会較正",
                nameEN: "SOCIAL_CALIBRATION",
                desc: "場のルール、距離感、最低限の作法を読み、不要な摩擦を避ける能力。全ての自律性ダメージを50%軽減します。",
                effect: { type: "autonomy_damage_reduction", value: 0.5 },
                category: "key",
                isCollectible: true,
                acquiredStage: 1,
                adamComment: "……あなたは『システムを理解しながら、自我を保つ』術を習得しました。厄介ですね。",
                keySkillRequirement: {
                    questionId: "s1_q07",
                    choiceIndex: 1 // Choice B: 管理会社に連絡し、「匿名で」注意してもらう
                }
                // Protects Autonomy strongly - for players who prioritize True Ending
            }
        ]
    }
};

// Export all stage metadata for easy access
export const STAGE_METADATA: StageMetadata[] = [
    STAGE_1_METADATA
    // Stages 2-10 will be added here
];

export function getStageMetadata(stageId: number): StageMetadata | undefined {
    return STAGE_METADATA.find(s => s.id === stageId);
}
