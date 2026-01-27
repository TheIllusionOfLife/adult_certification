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
                desc: "全ての社会的信用低下を50%軽減します。",
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
                desc: "LABOR系質問での社会的信用低下を40%軽減します。法的知識は盾になります。",
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

export const STAGE_3_METADATA: StageMetadata = {
    id: 3,
    theme: "Money Fundamentals",
    themeJP: "金の基礎",
    keySkillId: "COMPOUND_SENSE",
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 },
    rankThresholds: {
        S: { CS: 80 },
        A: { CS: 50 },
        B: { CS: 20 }
    },
    skills: {
        offer1: [
            {
                id: "s3_normal_01",
                name: "金利センサー",
                desc: "FINANCE系質問での資産減少を25%軽減します。金利の罠を見抜く目を持ちます。",
                effect: { type: "category_asset_damage_reduction", value: 0.25, category: "FINANCE" },
                category: "normal",
                isRecommended: true
            },
            {
                id: "s3_normal_02",
                name: "自己投資意識",
                desc: "FINANCE系質問での自律性減少を25%軽減します。お金に振り回されない心構えです。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.25, category: "FINANCE" },
                category: "normal"
            }
        ],
        offer2: [
            {
                id: "s3_normal_03",
                name: "節税マインド",
                desc: "全ての資産増加を45%強化します。合法的な節税は権利です。",
                effect: { type: "asset_gain_amplification", value: 0.45 },
                category: "normal",
                isRecommended: true
            },
            {
                id: "COMPOUND_SENSE",
                name: "複利感覚",
                nameEN: "COMPOUND_SENSE",
                desc: "時間を味方につける知恵。利息が利息を生む仕組みを理解し、長期的視点で資産を守る。FINANCE系質問での自律性減少を50%軽減します。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.5, category: "FINANCE" },
                category: "key",
                isCollectible: true,
                acquiredStage: 3,
                adamComment: "……あなたは『時間を資産に変える』術を習得しました。長期思考は、管理しづらいですね。",
                keySkillRequirement: {
                    questionId: "s3_q07",
                    choiceIndex: 1
                }
            }
        ]
    }
};

export const STAGE_4_METADATA: StageMetadata = {
    id: 4,
    theme: "Administrative Procedures",
    themeJP: "行政の迷宮",
    keySkillId: "DUE_PROCESS",
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 },
    rankThresholds: {
        S: { CS: 80 },
        A: { CS: 50 },
        B: { CS: 20 }
    },
    skills: {
        offer1: [
            {
                id: "s4_normal_01",
                name: "手続き自主性",
                desc: "ADMIN系質問での自律性減少を20%軽減します。行政に依存せず自分で調べる姿勢です。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.2, category: "ADMIN" },
                category: "normal"
            },
            {
                id: "s4_normal_02",
                name: "窓口対応力",
                desc: "ADMIN系質問での社会的信用減少を25%軽減します。官僚制との付き合い方を心得ています。",
                effect: { type: "category_cs_damage_reduction", value: 0.25, category: "ADMIN" },
                category: "normal",
                isRecommended: true
            }
        ],
        offer2: [
            {
                id: "s4_normal_03",
                name: "期限管理",
                desc: "全ての社会的信用減少を45%軽減します。締め切りを守る習慣が信用を守ります。",
                effect: { type: "cs_damage_reduction", value: 0.45 },
                category: "normal",
                isRecommended: true
            },
            {
                id: "DUE_PROCESS",
                name: "手続き主義",
                nameEN: "DUE_PROCESS",
                desc: "正しい手順を踏むことで身を守る。記録と証拠を残し、官僚制を味方につける技術。ADMIN系質問での自律性減少を50%軽減します。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.5, category: "ADMIN" },
                category: "key",
                isCollectible: true,
                acquiredStage: 4,
                adamComment: "……あなたは『手続きを武器にする』術を習得しました。システムを逆手に取る人間は、厄介です。",
                keySkillRequirement: {
                    questionId: "s4_q07",
                    choiceIndex: 1
                }
            }
        ]
    }
};

export const STAGE_5_METADATA: StageMetadata = {
    id: 5,
    theme: "Social Safety Nets",
    themeJP: "社会保障の羅針盤",
    keySkillId: "SAFETY_NET_NAVIGATION",
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 },
    rankThresholds: {
        S: { CS: 80 },
        A: { CS: 50 },
        B: { CS: 20 }
    },
    skills: {
        offer1: [
            {
                id: "s5_normal_01",
                name: "制度活用術",
                desc: "HEALTH系質問での資産減少を30%軽減します。公的制度を知って損失を防ぎます。",
                effect: { type: "category_asset_damage_reduction", value: 0.3, category: "HEALTH" },
                category: "normal",
                isRecommended: true
            },
            {
                id: "s5_normal_02",
                name: "相談力",
                desc: "全ての自律性減少を20%軽減します。助けを求める力も自律の一部です。",
                effect: { type: "autonomy_damage_reduction", value: 0.2 },
                category: "normal"
            }
        ],
        offer2: [
            {
                id: "s5_normal_03",
                name: "社会保障知識",
                desc: "HEALTH系質問での社会的信用減少を50%軽減します。制度を知る者は賢明と評価されます。",
                effect: { type: "category_cs_damage_reduction", value: 0.5, category: "HEALTH" },
                category: "normal",
                isRecommended: true
            },
            {
                id: "SAFETY_NET_NAVIGATION",
                name: "セーフティネット航法",
                nameEN: "SAFETY_NET_NAVIGATION",
                desc: "社会保障という航路図を読み、危機を乗り越える技術。助けを求めることは弱さではなく、生存戦略。HEALTH系質問での自律性減少を55%軽減します。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.55, category: "HEALTH" },
                category: "key",
                isCollectible: true,
                acquiredStage: 5,
                adamComment: "……あなたは『セーフティネットを使いこなす』術を習得しました。制度に頼りながら自律を保つとは、矛盾した存在ですね。",
                keySkillRequirement: {
                    questionId: "s5_q07",
                    choiceIndex: 1
                }
            }
        ]
    }
};

export const STAGE_6_METADATA: StageMetadata = {
    id: 6,
    theme: "Life Contracts",
    themeJP: "契約の攻防",
    keySkillId: "NEGOTIATION_PROTOCOL",
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 },
    rankThresholds: {
        S: { CS: 80 },
        A: { CS: 50 },
        B: { CS: 20 }
    },
    skills: {
        offer1: [
            {
                id: "s6_normal_01",
                name: "住まい自立意識",
                desc: "HOUSING系質問での自律性減少を20%軽減します。住環境を自分で選ぶ力です。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.2, category: "HOUSING" },
                category: "normal"
            },
            {
                id: "s6_normal_02",
                name: "交渉準備力",
                desc: "HOUSING系質問での社会的信用増加を25%強化します。準備された交渉は信頼を勝ち取ります。",
                effect: { type: "category_cs_gain_amplification", value: 0.25, category: "HOUSING" },
                category: "normal",
                isRecommended: true
            }
        ],
        offer2: [
            {
                id: "s6_normal_03",
                name: "契約確認習慣",
                desc: "全ての資産減少を45%軽減します。契約書を読む習慣が財産を守ります。",
                effect: { type: "asset_damage_reduction", value: 0.45 },
                category: "normal",
                isRecommended: true
            },
            {
                id: "NEGOTIATION_PROTOCOL",
                name: "交渉プロトコル",
                nameEN: "NEGOTIATION_PROTOCOL",
                desc: "第三者や制度を介して交渉する技術。直接対決を避け、有利な条件を引き出す知恵。HOUSING系質問での自律性減少を50%軽減します。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.5, category: "HOUSING" },
                category: "key",
                isCollectible: true,
                acquiredStage: 6,
                adamComment: "……あなたは『交渉の迂回路』を習得しました。正面から戦わない人間は、予測が困難です。",
                keySkillRequirement: {
                    questionId: "s6_q07",
                    choiceIndex: 1
                }
            }
        ]
    }
};

export const STAGE_7_METADATA: StageMetadata = {
    id: 7,
    theme: "Legal Protection",
    themeJP: "法の盾",
    keySkillId: "CONTRACT_LITERACY",
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 },
    rankThresholds: {
        S: { CS: 80 },
        A: { CS: 50 },
        B: { CS: 20 }
    },
    skills: {
        offer1: [
            {
                id: "s7_normal_01",
                name: "消費者権利知識",
                desc: "LEGAL系質問での社会的信用減少を30%軽減します。権利を知る消費者は守られます。",
                effect: { type: "category_cs_damage_reduction", value: 0.3, category: "LEGAL" },
                category: "normal",
                isRecommended: true
            },
            {
                id: "s7_normal_02",
                name: "詐欺察知力",
                desc: "LEGAL系質問での自律性減少を20%軽減します。怪しさを嗅ぎ分ける嗅覚があります。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.2, category: "LEGAL" },
                category: "normal"
            }
        ],
        offer2: [
            {
                id: "s7_normal_03",
                name: "法テラス活用",
                desc: "LEGAL系質問での資産減少を50%軽減します。無料法律相談を活用する知恵があります。",
                effect: { type: "category_asset_damage_reduction", value: 0.5, category: "LEGAL" },
                category: "normal",
                isRecommended: true
            },
            {
                id: "CONTRACT_LITERACY",
                name: "契約読解",
                nameEN: "CONTRACT_LITERACY",
                desc: "契約書を読み解き、不利な条項を見抜く目。サインする前に考える習慣。LEGAL系質問での自律性減少を55%軽減します。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.55, category: "LEGAL" },
                category: "key",
                isCollectible: true,
                acquiredStage: 7,
                adamComment: "……あなたは『契約を読む』術を習得しました。小さな文字を読む人間は、支配しづらいですね。",
                keySkillRequirement: {
                    questionId: "s7_q07",
                    choiceIndex: 1
                }
            }
        ]
    }
};

export const STAGE_8_METADATA: StageMetadata = {
    id: 8,
    theme: "Digital Citizenship",
    themeJP: "電子市民",
    keySkillId: "IDENTITY_HYGIENE",
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 },
    rankThresholds: {
        S: { CS: 80 },
        A: { CS: 50 },
        B: { CS: 20 }
    },
    skills: {
        offer1: [
            {
                id: "s8_normal_01",
                name: "セキュリティ意識",
                desc: "SEC系質問での社会的信用減少を25%軽減します。デジタル衛生を保つ意識があります。",
                effect: { type: "category_cs_damage_reduction", value: 0.25, category: "SEC" },
                category: "normal",
                isRecommended: true
            },
            {
                id: "s8_normal_02",
                name: "デジタル自衛意識",
                desc: "SEC系質問での自律性減少を20%軽減します。自分のデータは自分で守る姿勢です。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.2, category: "SEC" },
                category: "normal"
            }
        ],
        offer2: [
            {
                id: "s8_normal_03",
                name: "データ復旧力",
                desc: "SEC系質問での資産減少を45%軽減します。バックアップと保険で損失を最小化します。",
                effect: { type: "category_asset_damage_reduction", value: 0.45, category: "SEC" },
                category: "normal",
                isRecommended: true
            },
            {
                id: "IDENTITY_HYGIENE",
                name: "本人性衛生",
                nameEN: "IDENTITY_HYGIENE",
                desc: "デジタル空間で自分の身元を守る衛生習慣。個人情報は一度流出したら取り戻せない。SEC系質問での自律性減少を50%軽減します。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.5, category: "SEC" },
                category: "key",
                isCollectible: true,
                acquiredStage: 8,
                adamComment: "……あなたは『デジタルの自分を守る』術を習得しました。見えない世界で自己を維持するとは、興味深い能力です。",
                keySkillRequirement: {
                    questionId: "s8_q07",
                    choiceIndex: 1
                }
            }
        ]
    }
};

export const STAGE_9_METADATA: StageMetadata = {
    id: 9,
    theme: "Crisis Management",
    themeJP: "危機管理",
    keySkillId: "DAMAGE_CONTROL",
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 },
    rankThresholds: {
        S: { CS: 80 },
        A: { CS: 50 },
        B: { CS: 20 }
    },
    skills: {
        offer1: [
            {
                id: "s9_normal_01",
                name: "防災備蓄力",
                desc: "DISASTER系質問での資産減少を30%軽減します。備えが損失を最小化します。",
                effect: { type: "category_asset_damage_reduction", value: 0.3, category: "DISASTER" },
                category: "normal",
                isRecommended: true
            },
            {
                id: "s9_normal_02",
                name: "冷静判断力",
                desc: "全ての自律性減少を20%軽減します。パニックに流されない心の強さです。",
                effect: { type: "autonomy_damage_reduction", value: 0.2 },
                category: "normal"
            }
        ],
        offer2: [
            {
                id: "s9_normal_03",
                name: "保険請求術",
                desc: "全ての資産増加を50%強化します。正当な請求で損失を回復する知識です。",
                effect: { type: "asset_gain_amplification", value: 0.5 },
                category: "normal",
                isRecommended: true
            },
            {
                id: "DAMAGE_CONTROL",
                name: "被害最小化",
                nameEN: "DAMAGE_CONTROL",
                desc: "危機的状況で冷静に行動し、被害を最小限に抑える能力。最悪を想定し、最善を尽くす。DISASTER系質問での自律性減少を55%軽減します。",
                effect: { type: "category_autonomy_damage_reduction", value: 0.55, category: "DISASTER" },
                category: "key",
                isCollectible: true,
                acquiredStage: 9,
                adamComment: "……あなたは『混乱の中で自己を保つ』術を習得しました。危機に動じない人間は、最も予測困難な存在です。",
                keySkillRequirement: {
                    questionId: "s9_q07",
                    choiceIndex: 1
                }
            }
        ]
    }
};

// Export all stage metadata for easy access
export const STAGE_METADATA: StageMetadata[] = [
    STAGE_1_METADATA,
    STAGE_2_METADATA,
    STAGE_3_METADATA,
    STAGE_4_METADATA,
    STAGE_5_METADATA,
    STAGE_6_METADATA,
    STAGE_7_METADATA,
    STAGE_8_METADATA,
    STAGE_9_METADATA
    // Stage 10 will be added here
];

export function getStageMetadata(stageId: number): StageMetadata | undefined {
    return STAGE_METADATA.find(s => s.id === stageId);
}
