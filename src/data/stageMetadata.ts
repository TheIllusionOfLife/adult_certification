import type { StageMetadata } from '../types';

export const STAGE_1_METADATA: StageMetadata = {
    id: 1,
    theme: "Social Basics",
    themeJP: "社会の基本",
    keySkillId: "SOCIAL_CALIBRATION",
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 },
    rankThresholds: {
        S: { CS: 80 },
        A: { CS: 60 },
        B: { CS: 40 },
        C: { CS: 20 }
    },
    skills: {
        offer1: [
            {
                id: "s1_normal_01",
                name: "コミュニケーション緩衝材",
                desc: "対人トラブルでの自律性ダメージを常に50%軽減します。",
                effect: { type: "autonomy_damage_reduction", value: 0.5 },
                category: "normal"
            },
            {
                id: "s1_normal_02",
                name: "お役所ショートカット",
                desc: "行政手続き関連の資産減少を10,000円軽減します。",
                effect: { type: "admin_cost_reduction", value: 10000 },
                category: "normal"
            }
        ],
        offer2: [
            {
                id: "s1_normal_03",
                name: "デジタル衛生",
                desc: "セキュリティ関連の信用度低下を30%軽減します。",
                effect: { type: "category_cs_damage_reduction", category: "SECURITY", value: 0.3 },
                category: "normal"
            },
            {
                id: "SOCIAL_CALIBRATION",
                name: "社会較正",
                nameEN: "SOCIAL_CALIBRATION",
                desc: "場のルール、距離感、最低限の作法を読み、不要な摩擦を避ける能力。自律性への小ダメージ（-20以下）を30%軽減します。",
                effect: { type: "autonomy_small_damage_reduction", threshold: -20, value: 0.3 },
                category: "key",
                persistent: true,
                acquiredStage: 1,
                adamComment: "……あなたは『システムを理解しながら、自我を保つ』術を習得しました。厄介ですね。"
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
