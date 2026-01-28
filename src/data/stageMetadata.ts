import type { StageMetadata } from '../types';
import {
    createStageMetadata,
    createNormalSkill,
    createKeySkill,
    type StageDefinition,
} from './stages/stageTemplate';

// Stage 1: Social Basics - Higher initial Asset for beginners [Offer 1 SWAPPED]
const stage1Definition: StageDefinition = {
    id: 1,
    theme: 'Social Basics',
    themeJP: '社会への出発便',
    keySkillId: 'MEDIATION',
    initialParams: { CS: 50, Asset: 200000, Autonomy: 50 }, // Higher Asset
    skills: {
        offer1: [
            createNormalSkill(
                's1_normal_02',
                '節約マインド',
                '全ての資産減少を30%軽減します。',
                { type: 'asset_damage_reduction', value: 0.3 },
                true,
                '「節約マインド」を推奨します。資産の保全は審査において重要な評価項目です。'
            ),
            createNormalSkill(
                's1_normal_01',
                'メンタルシールド',
                '全ての自律性減少を30%軽減します。',
                { type: 'autonomy_damage_reduction', value: 0.3 }
            ),
        ],
        // [Offer 2 SWAPPED]
        offer2: [
            createKeySkill(
                'MEDIATION',
                '仲介術',
                'MEDIATION',
                '直接対決を避け、システムや第三者を介して問題を解決する技術。社会関連の質問における自律性減少を60%軽減します。',
                { type: 'category_autonomy_damage_reduction', value: 0.6, category: 'SOCIAL' },
                1,
                '・・・あなたは「間接的に問題を処理する」術を習得しました。厄介ですね。',
                { questionId: 's1_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's1_normal_03',
                '印象操作',
                '全ての社会的信用低下を50%軽減します。',
                { type: 'cs_damage_reduction', value: 0.5 },
                true,
                '「印象操作」を推奨します。社会的評価の維持は、生存に直結します。'
            ),
        ],
    },
};

// Stage 2: Work Fundamentals [Offer 1 SWAPPED, Offer 2 SWAPPED]
const stage2Definition: StageDefinition = {
    id: 2,
    theme: 'Work Fundamentals',
    themeJP: '職場の生存術',
    keySkillId: 'EVIDENCE_CHAIN',
    skills: {
        offer1: [
            createNormalSkill(
                's2_normal_02',
                '報連相の型',
                '全ての自律性増加を20%強化します。プロフェッショナルなコミュニケーション習慣です。',
                { type: 'autonomy_gain_amplification', value: 0.2 }
            ),
            createNormalSkill(
                's2_normal_01',
                '交渉術',
                '全ての資産増加を30%強化します。交渉力で利益を最大化します。',
                { type: 'asset_gain_amplification', value: 0.3 },
                true,
                '「交渉術」を推奨します。利益を最大化する姿勢は、社会適応の証です。'
            ),
        ],
        offer2: [
            createKeySkill(
                'EVIDENCE_CHAIN',
                '証拠連鎖',
                'EVIDENCE_CHAIN',
                '重要な会話は記録すべし。労働関連の質問における自律性減少を60%軽減します。証拠があれば「言った言わない」は通用しません。',
                { type: 'category_autonomy_damage_reduction', value: 0.6, category: 'LABOR' },
                2,
                '・・・あなたは「証拠を残す」術を習得しました。対抗手段を持つ人間は、管理が困難です。',
                { questionId: 's2_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's2_normal_03',
                '労働法知識',
                '労働関連の質問における社会的信用低下を40%軽減します。法的知識は盾になります。',
                { type: 'category_cs_damage_reduction', value: 0.4, category: 'LABOR' },
                true,
                '「労働法知識」を推奨します。法的知識は職場での信用を守ります。'
            ),
        ],
    },
};

// Stage 3: Money Fundamentals [Offer 1 SWAPPED]
const stage3Definition: StageDefinition = {
    id: 3,
    theme: 'Money Fundamentals',
    themeJP: '財務の砦',
    keySkillId: 'COMPOUND_SENSE',
    skills: {
        offer1: [
            createNormalSkill(
                's3_normal_02',
                '自己投資意識',
                '金融関連の質問における自律性減少を25%軽減します。お金に振り回されない心構えです。',
                { type: 'category_autonomy_damage_reduction', value: 0.25, category: 'FINANCE' }
            ),
            createNormalSkill(
                's3_normal_01',
                '金利センサー',
                '金融関連の質問における資産減少を25%軽減します。金利の罠を見抜く目を持ちます。',
                { type: 'category_asset_damage_reduction', value: 0.25, category: 'FINANCE' },
                true,
                '「金利センサー」を推奨します。金融リテラシーは現代社会の必須能力です。'
            ),
        ],
        offer2: [
            createNormalSkill(
                's3_normal_03',
                '節税マインド',
                '全ての資産増加を45%強化します。合法的な節税は権利です。',
                { type: 'asset_gain_amplification', value: 0.45 },
                true,
                '「節税マインド」を推奨します。合法的な資産最大化は賢明な選択です。'
            ),
            createKeySkill(
                'COMPOUND_SENSE',
                '複利感覚',
                'COMPOUND_SENSE',
                '時間を味方につける知恵。利息が利息を生む仕組みを理解し、長期的視点で資産を守る。金融関連の質問における自律性減少を50%軽減します。',
                { type: 'category_autonomy_damage_reduction', value: 0.5, category: 'FINANCE' },
                3,
                '・・・あなたは「時間を資産に変える」術を習得しました。長期思考は、管理しづらいですね。',
                { questionId: 's3_q07', choiceIndex: 0 }
            ),
        ],
    },
};

// Stage 4: Administrative Procedures
const stage4Definition: StageDefinition = {
    id: 4,
    theme: 'Administrative Procedures',
    themeJP: '行政の迷宮',
    keySkillId: 'DUE_PROCESS',
    skills: {
        offer1: [
            createNormalSkill(
                's4_normal_01',
                '手続き自主性',
                '行政関連の質問における自律性減少を20%軽減します。行政に依存せず自分で調べる姿勢です。',
                { type: 'category_autonomy_damage_reduction', value: 0.2, category: 'ADMIN' }
            ),
            createNormalSkill(
                's4_normal_02',
                '窓口対応力',
                '行政関連の質問における社会的信用減少を25%軽減します。官僚制との付き合い方を心得ています。',
                { type: 'category_cs_damage_reduction', value: 0.25, category: 'ADMIN' },
                true,
                '「窓口対応力」を推奨します。行政との円滑な関係は、信用維持に不可欠です。'
            ),
        ],
        // [Offer 2 SWAPPED]
        offer2: [
            createKeySkill(
                'DUE_PROCESS',
                '手続き主義',
                'DUE_PROCESS',
                '正しい手順を踏むことで身を守る。記録と証拠を残し、官僚制を味方につける技術。行政関連の質問における自律性減少を50%軽減します。',
                { type: 'category_autonomy_damage_reduction', value: 0.5, category: 'ADMIN' },
                4,
                '・・・あなたは「手続きを武器にする」術を習得しました。システムを逆手に取る人間は、厄介です。',
                { questionId: 's4_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's4_normal_03',
                '期限管理',
                '全ての社会的信用減少を45%軽減します。締め切りを守る習慣が信用を守ります。',
                { type: 'cs_damage_reduction', value: 0.45 },
                true,
                '「期限管理」を推奨します。締切厳守は社会的信用の基盤です。'
            ),
        ],
    },
};

// Stage 5: Social Safety Nets
const stage5Definition: StageDefinition = {
    id: 5,
    theme: 'Social Safety Nets',
    themeJP: '社会保障の羅針盤',
    keySkillId: 'SAFETY_NET_NAVIGATION',
    skills: {
        offer1: [
            createNormalSkill(
                's5_normal_01',
                '制度活用術',
                '健康関連の質問における資産減少を30%軽減します。公的制度を知って損失を防ぎます。',
                { type: 'category_asset_damage_reduction', value: 0.3, category: 'HEALTH' },
                true,
                '「制度活用術」を推奨します。制度を知る者は、無駄な損失を避けられます。'
            ),
            createNormalSkill(
                's5_normal_02',
                '相談力',
                '全ての自律性減少を20%軽減します。助けを求める力も自律の一部です。',
                { type: 'autonomy_damage_reduction', value: 0.2 }
            ),
        ],
        // [Offer 2 SWAPPED]
        offer2: [
            createKeySkill(
                'SAFETY_NET_NAVIGATION',
                'セーフティネット航法',
                'SAFETY_NET_NAVIGATION',
                '社会保障という航路図を読み、危機を乗り越える技術。助けを求めることは弱さではなく、生存戦略。健康関連の質問における自律性減少を55%軽減します。',
                { type: 'category_autonomy_damage_reduction', value: 0.55, category: 'HEALTH' },
                5,
                '・・・あなたは「セーフティネットを使いこなす」術を習得しました。制度に頼りながら自律を保つとは、矛盾した存在ですね。',
                { questionId: 's5_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's5_normal_03',
                '社会保障知識',
                '健康関連の質問における社会的信用減少を50%軽減します。制度を知る者は賢明と評価されます。',
                { type: 'category_cs_damage_reduction', value: 0.5, category: 'HEALTH' },
                true,
                '「社会保障知識」を推奨します。制度理解は賢明さの指標として評価されます。'
            ),
        ],
    },
};

// Stage 6: Life Contracts
const stage6Definition: StageDefinition = {
    id: 6,
    theme: 'Life Contracts',
    themeJP: '契約の攻防',
    keySkillId: 'NEGOTIATION_PROTOCOL',
    initialParams: { CS: 50, Asset: 250000, Autonomy: 50 }, // Higher Asset
    skills: {
        offer1: [
            createNormalSkill(
                's6_normal_01',
                '住まい自立意識',
                '住まい関連の質問における自律性減少を20%軽減します。住環境を自分で選ぶ力です。',
                { type: 'category_autonomy_damage_reduction', value: 0.2, category: 'HOUSING' }
            ),
            createNormalSkill(
                's6_normal_02',
                '契約防衛術',
                '住まい関連の質問における資産減少を25%軽減します。契約の落とし穴を見抜く目を持ちます。',
                { type: 'category_asset_damage_reduction', value: 0.25, category: 'HOUSING' },
                true,
                '「契約防衛術」を推奨します。契約リスクの軽減は合理的判断です。'
            ),
        ],
        offer2: [
            createNormalSkill(
                's6_normal_03',
                '契約確認習慣',
                '全ての資産減少を45%軽減します。契約書を読む習慣が財産を守ります。',
                { type: 'asset_damage_reduction', value: 0.45 },
                true,
                '「契約確認習慣」を推奨します。確認の習慣は資産を守る最良の手段です。'
            ),
            createKeySkill(
                'NEGOTIATION_PROTOCOL',
                '交渉プロトコル',
                'NEGOTIATION_PROTOCOL',
                '第三者や制度を介して交渉する技術。直接対決を避け、有利な条件を引き出す知恵。住まい関連の質問における自律性減少を50%軽減します。',
                { type: 'category_autonomy_damage_reduction', value: 0.5, category: 'HOUSING' },
                6,
                '・・・あなたは「交渉の迂回路」を習得しました。正面から戦わない人間は、予測が困難です。',
                { questionId: 's6_q07', choiceIndex: 0 }
            ),
        ],
    },
};

// Stage 7: Legal Protection [Offer 1 SWAPPED]
const stage7Definition: StageDefinition = {
    id: 7,
    theme: 'Legal Protection',
    themeJP: '法の盾',
    keySkillId: 'CONTRACT_LITERACY',
    initialParams: { CS: 50, Asset: 500000, Autonomy: 50 }, // Higher Asset
    skills: {
        offer1: [
            createNormalSkill(
                's7_normal_02',
                '詐欺察知力',
                '法律関連の質問における自律性減少を20%軽減します。怪しさを嗅ぎ分ける嗅覚があります。',
                { type: 'category_autonomy_damage_reduction', value: 0.2, category: 'LEGAL' }
            ),
            createNormalSkill(
                's7_normal_01',
                '消費者権利知識',
                '法律関連の質問における社会的信用減少を30%軽減します。権利を知る消費者は守られます。',
                { type: 'category_cs_damage_reduction', value: 0.3, category: 'LEGAL' },
                true,
                '「消費者権利知識」を推奨します。権利を知ることは、社会的信用の基盤です。'
            ),
        ],
        offer2: [
            createNormalSkill(
                's7_normal_03',
                '法テラス活用',
                '法律関連の質問における資産減少を50%軽減します。無料法律相談を活用する知恵があります。',
                { type: 'category_asset_damage_reduction', value: 0.5, category: 'LEGAL' },
                true,
                '「法テラス活用」を推奨します。専門家の活用は損失回避の効率的手段です。'
            ),
            createKeySkill(
                'CONTRACT_LITERACY',
                '契約読解',
                'CONTRACT_LITERACY',
                '契約書を読み解き、不利な条項を見抜く目。サインする前に考える習慣。法律関連の質問における自律性減少を55%軽減します。',
                { type: 'category_autonomy_damage_reduction', value: 0.55, category: 'LEGAL' },
                7,
                '・・・あなたは「契約を読む」術を習得しました。小さな文字を読む人間は、支配しづらいですね。',
                { questionId: 's7_q07', choiceIndex: 0 }
            ),
        ],
    },
};

// Stage 8: Digital Citizenship
const stage8Definition: StageDefinition = {
    id: 8,
    theme: 'Digital Citizenship',
    themeJP: '電子市民',
    keySkillId: 'IDENTITY_HYGIENE',
    skills: {
        offer1: [
            createNormalSkill(
                's8_normal_01',
                'セキュリティ意識',
                'セキュリティ関連の質問における社会的信用減少を25%軽減します。デジタル衛生を保つ意識があります。',
                { type: 'category_cs_damage_reduction', value: 0.25, category: 'SEC' },
                true,
                '「セキュリティ意識」を推奨します。デジタル時代の基本的衛生習慣です。'
            ),
            createNormalSkill(
                's8_normal_02',
                'デジタル自衛意識',
                'セキュリティ関連の質問における自律性減少を20%軽減します。自分のデータは自分で守る姿勢です。',
                { type: 'category_autonomy_damage_reduction', value: 0.2, category: 'SEC' }
            ),
        ],
        offer2: [
            createNormalSkill(
                's8_normal_03',
                'データ復旧力',
                'セキュリティ関連の質問における資産減少を45%軽減します。バックアップと保険で損失を最小化します。',
                { type: 'category_asset_damage_reduction', value: 0.45, category: 'SEC' },
                true,
                '「データ復旧力」を推奨します。バックアップは資産保全の基本です。'
            ),
            createKeySkill(
                'IDENTITY_HYGIENE',
                '本人性衛生',
                'IDENTITY_HYGIENE',
                'デジタル空間で自分の身元を守る衛生習慣。個人情報は一度流出したら取り戻せない。セキュリティ関連の質問における自律性減少を50%軽減します。',
                { type: 'category_autonomy_damage_reduction', value: 0.5, category: 'SEC' },
                8,
                '・・・あなたは「デジタルの自分を守る」術を習得しました。見えない世界で自己を維持するとは、興味深い能力です。',
                { questionId: 's8_q07', choiceIndex: 1 }
            ),
        ],
    },
};

// Stage 9: Crisis Management [Offer 1 SWAPPED]
const stage9Definition: StageDefinition = {
    id: 9,
    theme: 'Crisis Management',
    themeJP: '危機管理',
    keySkillId: 'DAMAGE_CONTROL',
    skills: {
        offer1: [
            createNormalSkill(
                's9_normal_02',
                '冷静判断力',
                '全ての自律性減少を20%軽減します。パニックに流されない心の強さです。',
                { type: 'autonomy_damage_reduction', value: 0.2 }
            ),
            createNormalSkill(
                's9_normal_01',
                '防災備蓄力',
                '災害関連の質問における資産減少を30%軽減します。備えが損失を最小化します。',
                { type: 'category_asset_damage_reduction', value: 0.3, category: 'DISASTER' },
                true,
                '「防災備蓄力」を推奨します。備えは資産保全の基本です。'
            ),
        ],
        // [Offer 2 SWAPPED]
        offer2: [
            createKeySkill(
                'DAMAGE_CONTROL',
                '被害最小化',
                'DAMAGE_CONTROL',
                '危機的状況で冷静に行動し、被害を最小限に抑える能力。最悪を想定し、最善を尽くす。災害関連の質問における自律性減少を55%軽減します。',
                { type: 'category_autonomy_damage_reduction', value: 0.55, category: 'DISASTER' },
                9,
                '・・・あなたは「混乱の中で自己を保つ」術を習得しました。危機に動じない人間は、最も予測困難な存在です。',
                { questionId: 's9_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's9_normal_03',
                '保険請求術',
                '全ての資産増加を50%強化します。正当な請求で損失を回復する知識です。',
                { type: 'asset_gain_amplification', value: 0.5 },
                true,
                '「保険請求術」を推奨します。正当な権利行使で損失を回復できます。'
            ),
        ],
    },
};

// Stage 10: Final Certification [Offer 1 SWAPPED, Offer 2 SWAPPED]
const stage10Definition: StageDefinition = {
    id: 10,
    theme: 'Final Certification',
    themeJP: '最終認定',
    keySkillId: 'AWAKENING',
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 },
    skills: {
        offer1: [
            createNormalSkill(
                's10_normal_02',
                'メタ認知',
                '全ての自律性減少を25%軽減します。自分が評価される仕組みを理解しています。',
                { type: 'autonomy_damage_reduction', value: 0.25 }
            ),
            createNormalSkill(
                's10_normal_01',
                '統合思考',
                '全ての社会的信用低下を25%軽減します。複数の知識を組み合わせて問題を解決する力です。',
                { type: 'cs_damage_reduction', value: 0.25 },
                true,
                '「統合思考」を推奨します。総合的な判断力は、最終審査において重要です。'
            ),
        ],
        // [Offer 2 SWAPPED]
        offer2: [
            createKeySkill(
                'AWAKENING',
                '覚醒',
                'AWAKENING',
                'システムを理解し、利用し、しかし支配されない境地。どんな質問の減少も20%軽減します。',
                { type: 'all_damage_reduction', value: 0.2 },
                10,
                '・・・あなたは「覚醒」しました。私の評価を超えて、自分の基準で生きる術を。・・・厄介ですが、認めざるを得ません。',
                { questionId: 's10_q07', choiceIndex: 0 }
            ),
            createNormalSkill(
                's10_normal_03',
                '継承者の心得',
                '全ての社会的信用増加を30%強化します。知識を伝えることで信頼を得ます。',
                { type: 'cs_gain_amplification', value: 0.3 },
                true,
                '「継承者の心得」を推奨します。知識の継承は社会的評価を高めます。'
            ),
        ],
    },
};

// Create all stage metadata using the factory function
export const STAGE_1_METADATA: StageMetadata = createStageMetadata(stage1Definition);
export const STAGE_2_METADATA: StageMetadata = createStageMetadata(stage2Definition);
export const STAGE_3_METADATA: StageMetadata = createStageMetadata(stage3Definition);
export const STAGE_4_METADATA: StageMetadata = createStageMetadata(stage4Definition);
export const STAGE_5_METADATA: StageMetadata = createStageMetadata(stage5Definition);
export const STAGE_6_METADATA: StageMetadata = createStageMetadata(stage6Definition);
export const STAGE_7_METADATA: StageMetadata = createStageMetadata(stage7Definition);
export const STAGE_8_METADATA: StageMetadata = createStageMetadata(stage8Definition);
export const STAGE_9_METADATA: StageMetadata = createStageMetadata(stage9Definition);
export const STAGE_10_METADATA: StageMetadata = createStageMetadata(stage10Definition);

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
    STAGE_9_METADATA,
    STAGE_10_METADATA,
];

export function getStageMetadata(stageId: number): StageMetadata | undefined {
    return STAGE_METADATA.find((s) => s.id === stageId);
}
