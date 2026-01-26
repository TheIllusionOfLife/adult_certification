import type { StageMetadata } from '../types';

export const STAGE_1_METADATA: StageMetadata = {
    id: 1,
    theme: "Social Basics",
    themeJP: "社会の基本",
    keySkillId: "MEDIATION",
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
                desc: "全ての自律性減少を30%軽減します。",
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
                id: "MEDIATION",
                name: "仲介術",
                nameEN: "MEDIATION",
                desc: "直接対決を避け、システムや第三者を介して問題を解決する技術。SOCIAL系質問での自律性減少を60%軽減します。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.6, category: "SOCIAL" },
                category: "key",
                isCollectible: true,
                acquiredStage: 1,
                adamComment: "……あなたは『間接的に問題を処理する』術を習得しました。厄介ですね。",
                keySkillRequirement: {
                    questionId: "s1_q07",
                    choiceIndex: 1 // Choice B: 管理会社に連絡し、「匿名で」注意してもらう
                }
                // Protects Autonomy in SOCIAL questions - for players who prioritize True Ending
            }
        ]
    }
};

export const STAGE_2_METADATA: StageMetadata = {
    id: 2,
    theme: "Work Fundamentals",
    themeJP: "仕事の基礎",
    keySkillId: "EVIDENCE_CHAIN",
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
                id: "s2_normal_01",
                name: "交渉術",
                desc: "全ての資産増加を30%強化します。交渉力で利益を最大化します。",
                effect: { type: "asset_gain_amplification", value: 0.3 },
                category: "normal",
                isRecommended: true
                // A.D.A.M. recommends: practical survival resource amplification
            },
            {
                id: "s2_normal_02",
                name: "報連相の型",
                desc: "全ての自律性増加を20%強化します。プロフェッショナルなコミュニケーション習慣です。",
                effect: { type: "autonomy_gain_amplification", value: 0.2 },
                category: "normal"
                // Protects Autonomy growth - for True Ending path
            }
        ],
        offer2: [
            {
                id: "s2_normal_03",
                name: "労働法知識",
                desc: "LABOR系質問での信用度低下を40%軽減します。法的知識は盾になります。",
                effect: { type: "category_cs_damage_reduction", value: 0.4, category: "LABOR" },
                category: "normal",
                isRecommended: true
                // A.D.A.M. recommends: protects CS on LABOR questions
            },
            {
                id: "EVIDENCE_CHAIN",
                name: "証拠連鎖",
                nameEN: "EVIDENCE_CHAIN",
                desc: "重要な会話は記録すべし。LABOR系質問での自律性減少を60%軽減します。証拠があれば「言った言わない」は通用しません。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.6, category: "LABOR" },
                category: "key",
                isCollectible: true,
                acquiredStage: 2,
                adamComment: "……あなたは『証拠を残す』術を習得しました。対抗手段を持つ人間は、管理が困難です。",
                keySkillRequirement: {
                    questionId: "s2_q07",
                    choiceIndex: 1 // Choice B: 「確認のためメールでいただけますか」と記録を求める
                }
                // Key skill - protects Autonomy in LABOR questions for True Ending path
            }
        ]
    }
};

// Export all stage metadata for easy access
export const STAGE_METADATA: StageMetadata[] = [
    STAGE_1_METADATA,
    STAGE_2_METADATA
    // Stages 3-10 will be added here
];

export function getStageMetadata(stageId: number): StageMetadata | undefined {
    return STAGE_METADATA.find(s => s.id === stageId);
}
