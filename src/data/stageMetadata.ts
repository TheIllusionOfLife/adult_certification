import type { StageMetadata } from '../types';
import {
    createStageMetadata,
    createNormalSkill,
    createKeySkill,
    type StageDefinition,
} from './stages/stageTemplate';

// Stage 1: Social Basics
const stage1Definition: StageDefinition = {
    id: 1,
    theme: 'Social Basics',
    themeJP: '社会への出発便',
    keySkillId: 'MEDIATION',
    skills: {
        offer1: [
            createNormalSkill(
                's1_normal_02',
                '第一印象',
                '社会の基本を押さえることで信用獲得を25%増幅します。',
                { type: 'cs_gain_amplification', value: 0.25 },
                true,
                '「第一印象」を推奨します。社会的信用の増加は審査において重要な評価項目です。'
            ),
            createNormalSkill(
                's1_normal_01',
                '自立心',
                '自ら行動する習慣が自律性獲得を25%増幅します。',
                { type: 'autonomy_gain_amplification', value: 0.25 }
            ),
        ],
        offer2: [
            createKeySkill(
                'MEDIATION',
                '仲介術',
                'MEDIATION',
                '直接対決を避け、システムや第三者を介して問題を解決する技術。SOCIAL問題の社会的信用獲得を30%増幅します。',
                { type: 'category_cs_gain_boost', value: 0.3, category: 'SOCIAL' },
                1,
                '・・・あなたは「間接的に問題を処理する」術を習得しました。厄介ですね。',
                { questionId: 's1_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's1_normal_03',
                '社交術',
                '対人関係の基礎力で社会的信用獲得を30%増幅します。',
                { type: 'cs_gain_amplification', value: 0.3 },
                true,
                '「社交術」を推奨します。社会的評価の向上は、生存に直結します。'
            ),
        ],
    },
};

// Stage 2: Work Fundamentals
const stage2Definition: StageDefinition = {
    id: 2,
    theme: 'Work Fundamentals',
    themeJP: '職場の生存術',
    keySkillId: 'EVIDENCE_CHAIN',
    skills: {
        offer1: [
            createNormalSkill(
                's2_normal_02',
                '給与交渉力',
                '職場での経済的成果を高め、資産獲得を30%増幅します。',
                { type: 'asset_gain_amplification', value: 0.3 },
                true,
                '「給与交渉力」を推奨します。利益を最大化する姿勢は、社会適応の証です。'
            ),
            createNormalSkill(
                's2_normal_01',
                '職場自律',
                '職場での主体的行動が自律性獲得を20%増幅します。',
                { type: 'autonomy_gain_amplification', value: 0.2 }
            ),
        ],
        offer2: [
            createKeySkill(
                'EVIDENCE_CHAIN',
                '証拠連鎖',
                'EVIDENCE_CHAIN',
                '重要な会話は記録すべし。LABOR問題の自律性獲得を30%増幅します。証拠があれば「言った言わない」は通用しません。',
                { type: 'category_autonomy_gain_boost', value: 0.3, category: 'LABOR' },
                2,
                '・・・あなたは「証拠を残す」術を習得しました。対抗手段を持つ人間は、管理が困難です。',
                { questionId: 's2_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's2_normal_03',
                '勤勉評価',
                '職場での信頼構築が社会的信用獲得を25%増幅します。',
                { type: 'cs_gain_amplification', value: 0.25 },
                true,
                '「勤勉評価」を推奨します。信用の向上は職場での評価に直結します。'
            ),
        ],
    },
};

// Stage 3: Money Fundamentals
const stage3Definition: StageDefinition = {
    id: 3,
    theme: 'Money Fundamentals',
    themeJP: '財務の砦',
    keySkillId: 'COMPOUND_SENSE',
    skills: {
        offer1: [
            createNormalSkill(
                's3_normal_01',
                '金融信用',
                '金融リテラシーが社会的信用獲得を25%増幅します。',
                { type: 'cs_gain_amplification', value: 0.25 },
                true,
                '「金融信用」を推奨します。金融リテラシーは現代社会の必須能力です。'
            ),
            createNormalSkill(
                's3_normal_02',
                '財務自律',
                '経済的な自己判断力が自律性獲得を20%増幅します。',
                { type: 'autonomy_gain_amplification', value: 0.2 }
            ),
        ],
        offer2: [
            createNormalSkill(
                's3_normal_03',
                '資産運用',
                '堅実な運用方針が資産獲得を30%増幅します。',
                { type: 'asset_gain_amplification', value: 0.3 },
                true,
                '「資産運用」を推奨します。合法的な資産最大化は賢明な選択です。'
            ),
            createKeySkill(
                'COMPOUND_SENSE',
                '複利感覚',
                'COMPOUND_SENSE',
                '時間を味方につける知恵。FINANCE問題の資産獲得を30%増幅します。',
                { type: 'category_asset_gain_boost', value: 0.3, category: 'FINANCE' },
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
                's4_normal_02',
                '行政信頼',
                '行政との円滑な関係が社会的信用獲得を25%増幅します。',
                { type: 'cs_gain_amplification', value: 0.25 },
                true,
                '「行政信頼」を推奨します。行政との円滑な関係は、信用向上に不可欠です。'
            ),
            createNormalSkill(
                's4_normal_01',
                '申請自律',
                '手続きを自ら進める力が自律性獲得を20%増幅します。',
                { type: 'autonomy_gain_amplification', value: 0.2 }
            ),
        ],
        offer2: [
            createKeySkill(
                'DUE_PROCESS',
                '手続き主義',
                'DUE_PROCESS',
                '正しい手順を踏むことで身を守る。ADMIN問題の社会的信用獲得を30%増幅します。',
                { type: 'category_cs_gain_boost', value: 0.3, category: 'ADMIN' },
                4,
                '・・・あなたは「手続きを武器にする」術を習得しました。システムを逆手に取る人間は、厄介です。',
                { questionId: 's4_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's4_normal_03',
                '節税効果',
                '適切な行政手続きが資産獲得を30%増幅します。',
                { type: 'asset_gain_amplification', value: 0.3 },
                true,
                '「節税効果」を推奨します。資産の最大化は社会的安定の基盤です。'
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
                '制度理解',
                '社会保障制度の知識が社会的信用獲得を30%増幅します。',
                { type: 'cs_gain_amplification', value: 0.3 },
                true,
                '「制度理解」を推奨します。制度を知る者は、賢明と評価されます。'
            ),
            createNormalSkill(
                's5_normal_02',
                '受給自律',
                '制度を主体的に活用する力が自律性獲得を30%増幅します。',
                { type: 'autonomy_gain_amplification', value: 0.3 }
            ),
        ],
        offer2: [
            createKeySkill(
                'SAFETY_NET_NAVIGATION',
                'セーフティネット航法',
                'SAFETY_NET_NAVIGATION',
                '社会保障という航路図を読み、危機を乗り越える技術。HEALTH問題の自律性獲得を30%増幅します。',
                { type: 'category_autonomy_gain_boost', value: 0.3, category: 'HEALTH' },
                5,
                '・・・あなたは「セーフティネットを使いこなす」術を習得しました。制度に頼りながら自律を保つとは、矛盾した存在ですね。',
                { questionId: 's5_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's5_normal_03',
                '保障活用',
                '社会保障の適切な利用が資産獲得を30%増幅します。',
                { type: 'asset_gain_amplification', value: 0.3 },
                true,
                '「保障活用」を推奨します。資産の最大化は生活安定の基盤です。'
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
    skills: {
        offer1: [
            createNormalSkill(
                's6_normal_02',
                '契約防衛',
                '契約リスクの回避力が資産獲得を30%増幅します。',
                { type: 'asset_gain_amplification', value: 0.3 },
                true,
                '「契約防衛」を推奨します。契約リスクへの備えは合理的判断です。'
            ),
            createNormalSkill(
                's6_normal_01',
                '交渉自律',
                '対等な立場で交渉する力が自律性獲得を30%増幅します。',
                { type: 'autonomy_gain_amplification', value: 0.3 }
            ),
        ],
        offer2: [
            createKeySkill(
                'NEGOTIATION_PROTOCOL',
                '交渉プロトコル',
                'NEGOTIATION_PROTOCOL',
                '第三者や制度を介して交渉する技術。HOUSING問題の資産獲得を30%増幅します。',
                { type: 'category_asset_gain_boost', value: 0.3, category: 'HOUSING' },
                6,
                '・・・あなたは「交渉の迂回路」を習得しました。正面から戦わない人間は、予測が困難です。',
                { questionId: 's6_q07', choiceIndex: 0 }
            ),
            createNormalSkill(
                's6_normal_03',
                '入居信用',
                '住居契約の実績が社会的信用獲得を30%増幅します。',
                { type: 'cs_gain_amplification', value: 0.3 },
                true,
                '「入居信用」を推奨します。信用向上は契約交渉力の基盤です。'
            ),
        ],
    },
};

// Stage 7: Legal Protection
const stage7Definition: StageDefinition = {
    id: 7,
    theme: 'Legal Protection',
    themeJP: '法の盾',
    keySkillId: 'CONTRACT_LITERACY',
    skills: {
        offer1: [
            createNormalSkill(
                's7_normal_01',
                '法的信用',
                '法的知識の実践が社会的信用獲得を30%増幅します。',
                { type: 'cs_gain_amplification', value: 0.3 },
                true,
                '「法的信用」を推奨します。権利を知ることは、社会的信用の基盤です。'
            ),
            createNormalSkill(
                's7_normal_02',
                '権利主張',
                '正当な権利を行使する力が自律性獲得を30%増幅します。',
                { type: 'autonomy_gain_amplification', value: 0.3 }
            ),
        ],
        offer2: [
            createKeySkill(
                'CONTRACT_LITERACY',
                '契約読解',
                'CONTRACT_LITERACY',
                '契約書を読み解き、不利な条項を見抜く目。LEGAL問題の自律性獲得を30%増幅します。',
                { type: 'category_autonomy_gain_boost', value: 0.3, category: 'LEGAL' },
                7,
                '・・・あなたは「契約を読む」術を習得しました。小さな文字を読む人間は、支配しづらいですね。',
                { questionId: 's7_q07', choiceIndex: 0 }
            ),
            createNormalSkill(
                's7_normal_03',
                '損害回避',
                '法的リスクの回避が資産獲得を30%増幅します。',
                { type: 'asset_gain_amplification', value: 0.3 },
                true,
                '「損害回避」を推奨します。資産保全は法的知識の実践です。'
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
                '電子信用',
                'デジタル空間での信頼構築が社会的信用獲得を25%増幅します。',
                { type: 'cs_gain_amplification', value: 0.25 },
                true,
                '「電子信用」を推奨します。デジタル時代の基本的信用構築です。'
            ),
            createNormalSkill(
                's8_normal_02',
                '情報自衛',
                '個人情報を守る習慣が自律性獲得を30%増幅します。',
                { type: 'autonomy_gain_amplification', value: 0.3 }
            ),
        ],
        offer2: [
            createKeySkill(
                'IDENTITY_HYGIENE',
                '本人性衛生',
                'IDENTITY_HYGIENE',
                'デジタル空間で自分の身元を守る衛生習慣。SEC問題の自律性獲得を30%増幅します。',
                { type: 'category_autonomy_gain_boost', value: 0.3, category: 'SEC' },
                8,
                '・・・あなたは「デジタルの自分を守る」術を習得しました。見えない世界で自己を維持するとは、興味深い能力です。',
                { questionId: 's8_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's8_normal_03',
                '詐欺耐性',
                'オンライン詐欺への耐性が資産獲得を30%増幅します。',
                { type: 'asset_gain_amplification', value: 0.3 },
                true,
                '「詐欺耐性」を推奨します。デジタル資産の保全は現代の必須能力です。'
            ),
        ],
    },
};

// Stage 9: Crisis Management
const stage9Definition: StageDefinition = {
    id: 9,
    theme: 'Crisis Management',
    themeJP: '危機管理',
    keySkillId: 'DAMAGE_CONTROL',
    skills: {
        offer1: [
            createNormalSkill(
                's9_normal_01',
                '備蓄管理',
                '危機への備えが資産獲得を30%増幅します。',
                { type: 'asset_gain_amplification', value: 0.3 },
                true,
                '「備蓄管理」を推奨します。備えは資産保全の基本です。'
            ),
            createNormalSkill(
                's9_normal_02',
                '危機判断',
                '非常時の冷静な判断力が自律性獲得を30%増幅します。',
                { type: 'autonomy_gain_amplification', value: 0.3 }
            ),
        ],
        offer2: [
            createKeySkill(
                'DAMAGE_CONTROL',
                '被害最小化',
                'DAMAGE_CONTROL',
                '危機的状況で冷静に行動し、被害を最小限に抑える能力。DISASTER問題の自律性獲得を30%増幅します。',
                { type: 'category_autonomy_gain_boost', value: 0.3, category: 'DISASTER' },
                9,
                '・・・あなたは「混乱の中で自己を保つ」術を習得しました。危機に動じない人間は、最も予測困難な存在です。',
                { questionId: 's9_q07', choiceIndex: 1 }
            ),
            createNormalSkill(
                's9_normal_03',
                '復興信用',
                '危機対応の実績が社会的信用獲得を30%増幅します。',
                { type: 'cs_gain_amplification', value: 0.3 },
                true,
                '「復興信用」を推奨します。危機対応力は社会的信用に直結します。'
            ),
        ],
    },
};

// Stage 10: Final Certification
const stage10Definition: StageDefinition = {
    id: 10,
    theme: 'Final Certification',
    themeJP: '最終認定',
    keySkillId: 'AWAKENING',
    skills: {
        offer1: [
            createNormalSkill(
                's10_normal_01',
                '総合信用',
                '総合的な判断力が社会的信用獲得を25%増幅します。',
                { type: 'cs_gain_amplification', value: 0.25 },
                true,
                '「総合信用」を推奨します。総合的な判断力は、最終審査において重要です。'
            ),
            createNormalSkill(
                's10_normal_02',
                '統合自律',
                '全領域を統合する視座が自律性獲得を25%増幅します。',
                { type: 'autonomy_gain_amplification', value: 0.25 }
            ),
        ],
        offer2: [
            createKeySkill(
                'AWAKENING',
                '覚醒',
                'AWAKENING',
                'システムを理解し、利用し、しかし支配されない境地。全ての獲得を20%増幅します。',
                { type: 'all_gain_amplification', value: 0.2 },
                10,
                '・・・あなたは「覚醒」しました。私の評価を超えて、自分の基準で生きる術を。・・・厄介ですが、認めざるを得ません。',
                { questionId: 's10_q07', choiceIndex: 0 }
            ),
            createNormalSkill(
                's10_normal_03',
                '継承信用',
                '知識の継承力が社会的信用獲得を30%増幅します。',
                { type: 'cs_gain_amplification', value: 0.3 },
                true,
                '「継承信用」を推奨します。知識の継承は社会的評価を高めます。'
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
