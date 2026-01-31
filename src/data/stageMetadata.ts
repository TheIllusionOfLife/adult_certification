import type { StageMetadata } from '../types';
import {
    createStageMetadata,
    createNormalSkill,
    createKeySkill,
    type StageDefinition,
} from './stages/stageTemplate';

// Stage 1: Launch into Society
const stage1Definition: StageDefinition = {
    id: 1,
    theme: 'Launch into Society',
    themeJP: '社会への出発便',
    keySkillId: 'MEDIATION',
    skills: {
        offer1: [
            createNormalSkill(
                's1_normal_02',
                '第一印象',
                '社会の基本を押さえることで信用の新規獲得値を100%増幅します。',
                { type: 'cs_gain_amplification', value: 1.0 },
                true,
                '「第一印象」を推奨します。社会的信用の増加は審査において重要な評価項目です。',
                'First Impression',
                'Mastering social basics amplifies Credit gains by 100%.',
                "I recommend 'First Impression.' Increasing social credit is a key evaluation metric."
            ),
            createNormalSkill(
                's1_normal_01',
                '自立心',
                '自ら行動する習慣が自律性の新規獲得値を100%増幅します。',
                { type: 'autonomy_gain_amplification', value: 1.0 },
                false,
                undefined,
                'Self-Reliance',
                'The habit of acting independently amplifies Autonomy gains by 100%.'
            ),
        ],
        offer2: [
            createKeySkill(
                'MEDIATION',
                '仲介術',
                'Mediation',
                '直接対決を避け、システムや第三者を介して問題を解決する技術。社会関連の問題における社会的信用の新規獲得値を200%増幅します。',
                { type: 'category_cs_gain_boost', value: 2.0, category: 'SOCIAL' },
                1,
                '・・・あなたは「間接的に問題を処理する」術を習得しました。厄介ですね。',
                { questionId: 's1_q07', choiceIndex: 1 },
                'The art of resolving problems through systems and third parties. Amplifies Credit gains by 200% for social issues.',
                "...You have learned the art of 'handling problems indirectly.' How troublesome."
            ),
            createNormalSkill(
                's1_normal_03',
                '社交術',
                '対人関係の基礎力で社会的信用の新規獲得値を150%増幅します。',
                { type: 'cs_gain_amplification', value: 1.5 },
                true,
                '「社交術」を推奨します。社会的評価の向上は、生存に直結します。',
                'Social Skills',
                'Foundational interpersonal ability amplifies Credit gains by 150%.',
                "I recommend 'Social Skills.' Improving social evaluation is directly linked to survival."
            ),
        ],
    },
};

// Stage 2: Workplace Survival
const stage2Definition: StageDefinition = {
    id: 2,
    theme: 'Workplace Survival',
    themeJP: '職場の生存術',
    keySkillId: 'EVIDENCE_CHAIN',
    skills: {
        offer1: [
            createNormalSkill(
                's2_normal_02',
                '対価意識',
                '自分の労働の価値を正しく見積もる力。社会的信用の新規獲得値を100%増幅します。',
                { type: 'cs_gain_amplification', value: 1.0 },
                true,
                '「対価意識」を推奨します。利益を最大化する姿勢は、社会適応の証です。',
                'Fair Compensation',
                "The ability to correctly assess your labor's value. Amplifies Credit gains by 100%.",
                "I recommend 'Fair Compensation.' Maximizing returns is proof of social adaptation."
            ),
            createNormalSkill(
                's2_normal_01',
                '退路確保',
                '追い詰められる前に逃げ道を作る知恵。自律性の新規獲得値を100%増幅します。',
                { type: 'autonomy_gain_amplification', value: 1.0 },
                false,
                undefined,
                'Exit Strategy',
                'The wisdom to prepare an escape before being cornered. Amplifies Autonomy gains by 100%.'
            ),
        ],
        offer2: [
            createKeySkill(
                'EVIDENCE_CHAIN',
                '証拠連鎖',
                'Evidence Chain',
                '重要な会話は記録すべし。労働関連の問題における自律性の新規獲得値を200%増幅します。証拠があれば「言った言わない」は通用しません。',
                { type: 'category_autonomy_gain_boost', value: 2.0, category: 'LABOR' },
                2,
                '・・・あなたは「証拠を残す」術を習得しました。対抗手段を持つ人間は、管理が困難です。',
                { questionId: 's2_q07', choiceIndex: 1 },
                "Always record important conversations. Amplifies Autonomy gains by 200% for labor issues. With evidence, 'he said / she said' doesn't work.",
                "...You have learned the art of 'preserving evidence.' Humans with countermeasures are difficult to manage."
            ),
            createNormalSkill(
                's2_normal_03',
                '実績証明',
                '成果を形に残し、正当に評価される術。社会的信用の新規獲得値を150%増幅します。',
                { type: 'cs_gain_amplification', value: 1.5 },
                true,
                '「勤勉評価」を推奨します。信用の向上は職場での評価に直結します。',
                'Track Record',
                'The art of documenting achievements for proper evaluation. Amplifies Credit gains by 150%.',
                "I recommend 'Track Record.' Credit improvement directly affects workplace evaluation."
            ),
        ],
    },
};

// Stage 3: Fortress of Finance
const stage3Definition: StageDefinition = {
    id: 3,
    theme: 'Fortress of Finance',
    themeJP: '財務の砦',
    keySkillId: 'COMPOUND_SENSE',
    skills: {
        offer1: [
            createNormalSkill(
                's3_normal_01',
                '数字の目',
                '数字の裏を読み取る直感。社会的信用の新規獲得値を100%増幅します。',
                { type: 'cs_gain_amplification', value: 1.0 },
                true,
                '「金融信用」を推奨します。金融リテラシーは現代社会の必須能力です。',
                'Eye for Numbers',
                'Intuition to read behind the numbers. Amplifies Credit gains by 100%.',
                "I recommend 'Eye for Numbers.' Financial literacy is essential in modern society."
            ),
            createNormalSkill(
                's3_normal_02',
                '自制心',
                '目先の誘惑に流されない冷静さ。自律性の新規獲得値を100%増幅します。',
                { type: 'autonomy_gain_amplification', value: 1.0 },
                false,
                undefined,
                'Self-Control',
                'The composure to resist short-term temptation. Amplifies Autonomy gains by 100%.'
            ),
        ],
        offer2: [
            createNormalSkill(
                's3_normal_03',
                '種銭の器',
                '小さな元手を育てる器量。社会的信用の新規獲得値を150%増幅します。',
                { type: 'cs_gain_amplification', value: 1.5 },
                true,
                '「資産運用」を推奨します。合法的な資産最大化は賢明な選択です。',
                'Seed Money',
                'The capacity to grow small capital. Amplifies Credit gains by 150%.',
                "I recommend 'Seed Money.' Legitimate asset maximization is a wise choice."
            ),
            createKeySkill(
                'COMPOUND_SENSE',
                '複利感覚',
                'Compound Sense',
                '時間を味方につける知恵。金融関連の問題における資産の新規獲得値を200%増幅します。',
                { type: 'category_asset_gain_boost', value: 2.0, category: 'FINANCE' },
                3,
                '・・・あなたは「時間を資産に変える」術を習得しました。長期思考は、管理しづらいですね。',
                { questionId: 's3_q07', choiceIndex: 0 },
                'The wisdom to make time your ally. Amplifies Asset gains by 200% for finance issues.',
                "...You have learned the art of 'converting time into assets.' Long-term thinking is hard to manage."
            ),
        ],
    },
};

// Stage 4: Bureaucratic Labyrinth
const stage4Definition: StageDefinition = {
    id: 4,
    theme: 'Bureaucratic Labyrinth',
    themeJP: '行政の迷宮',
    keySkillId: 'DUE_PROCESS',
    skills: {
        offer1: [
            createNormalSkill(
                's4_normal_02',
                '窓口力',
                '役所の窓口を味方にする対話力。社会的信用の新規獲得値を100%増幅します。',
                { type: 'cs_gain_amplification', value: 1.0 },
                true,
                '「行政信頼」を推奨します。行政との円滑な関係は、信用向上に不可欠です。',
                'Counter Skills',
                'The dialogue ability to win over government clerks. Amplifies Credit gains by 100%.',
                "I recommend 'Counter Skills.' A smooth relationship with government is essential for credit."
            ),
            createNormalSkill(
                's4_normal_01',
                '書類の型',
                '正しい書式で伝える力。自律性の新規獲得値を100%増幅します。',
                { type: 'autonomy_gain_amplification', value: 1.0 },
                false,
                undefined,
                'Document Form',
                'The ability to communicate in proper format. Amplifies Autonomy gains by 100%.'
            ),
        ],
        offer2: [
            createKeySkill(
                'DUE_PROCESS',
                '手続き主義',
                'Due Process',
                '正しい手順を踏むことで身を守る。行政関連の問題における社会的信用の新規獲得値を200%増幅します。',
                { type: 'category_cs_gain_boost', value: 2.0, category: 'ADMIN' },
                4,
                '・・・あなたは「手続きを武器にする」術を習得しました。システムを逆手に取る人間は、厄介です。',
                { questionId: 's4_q07', choiceIndex: 1 },
                'Protecting yourself by following proper procedure. Amplifies Credit gains by 200% for administrative issues.',
                "...You have learned the art of 'weaponizing procedure.' Humans who turn the system against itself are troublesome."
            ),
            createNormalSkill(
                's4_normal_03',
                '控除の知恵',
                '払わなくていいものは払わない。資産の新規獲得値を150%増幅します。',
                { type: 'asset_gain_amplification', value: 1.5 },
                true,
                '「節税効果」を推奨します。資産の最大化は社会的安定の基盤です。',
                'Deduction Wisdom',
                "Don't pay what you don't have to. Amplifies Asset gains by 150%.",
                "I recommend 'Deduction Wisdom.' Asset maximization is the foundation of social stability."
            ),
        ],
    },
};

// Stage 5: Safety Net Compass
const stage5Definition: StageDefinition = {
    id: 5,
    theme: 'Safety Net Compass',
    themeJP: '社会保障の羅針盤',
    keySkillId: 'SAFETY_NET_NAVIGATION',
    skills: {
        offer1: [
            createNormalSkill(
                's5_normal_01',
                '制度の地図',
                '複雑な制度の全体像を見渡す力。社会的信用の新規獲得値を100%増幅します。',
                { type: 'cs_gain_amplification', value: 1.0 },
                true,
                '「制度理解」を推奨します。制度を知る者は、賢明と評価されます。',
                'System Map',
                'The ability to see the big picture of complex systems. Amplifies Credit gains by 100%.',
                "I recommend 'System Map.' Those who know the system are judged as wise."
            ),
            createNormalSkill(
                's5_normal_02',
                '申請の勇気',
                '「助けてほしい」と言える強さ。自律性の新規獲得値を100%増幅します。',
                { type: 'autonomy_gain_amplification', value: 1.0 },
                false,
                undefined,
                'Courage to Apply',
                "The strength to say 'I need help.' Amplifies Autonomy gains by 100%."
            ),
        ],
        offer2: [
            createKeySkill(
                'SAFETY_NET_NAVIGATION',
                '安全網航法',
                'Safety Net Navigation',
                '社会保障という航路図を読み、危機を乗り越える技術。健康・福祉関連の問題における自律性の新規獲得値を200%増幅します。',
                { type: 'category_autonomy_gain_boost', value: 2.0, category: 'HEALTH' },
                5,
                '・・・あなたは「セーフティネットを使いこなす」術を習得しました。制度に頼りながら自律を保つとは、矛盾した存在ですね。',
                { questionId: 's5_q07', choiceIndex: 1 },
                'The skill of reading the social safety net chart to overcome crises. Amplifies Autonomy gains by 200% for health/welfare issues.',
                "...You have learned the art of 'navigating the safety net.' Relying on the system while maintaining autonomy\u2014what a contradictory existence."
            ),
            createNormalSkill(
                's5_normal_03',
                '公助の盾',
                '使える制度は使い倒す合理性。資産の新規獲得値を150%増幅します。',
                { type: 'asset_gain_amplification', value: 1.5 },
                true,
                '「保障活用」を推奨します。資産の最大化は生活安定の基盤です。',
                'Public Aid Shield',
                'The rationality to fully utilize available systems. Amplifies Asset gains by 150%.',
                "I recommend 'Public Aid Shield.' Asset maximization is the foundation of life stability."
            ),
        ],
    },
};

// Stage 6: The Fine Print
const stage6Definition: StageDefinition = {
    id: 6,
    theme: 'The Fine Print',
    themeJP: '契約の攻防',
    keySkillId: 'NEGOTIATION_PROTOCOL',
    skills: {
        offer1: [
            createNormalSkill(
                's6_normal_02',
                '敷金防衛',
                '退去時に搾取されない備え。資産の新規獲得値を100%増幅します。',
                { type: 'asset_gain_amplification', value: 1.0 },
                true,
                '「契約防衛」を推奨します。契約リスクへの備えは合理的判断です。',
                'Deposit Defense',
                'Preparation against exploitation at move-out. Amplifies Asset gains by 100%.',
                "I recommend 'Deposit Defense.' Preparing for contract risks is a rational decision."
            ),
            createNormalSkill(
                's6_normal_01',
                '相見積の眼',
                '比較する習慣が対等な交渉を生む。自律性の新規獲得値を100%増幅します。',
                { type: 'autonomy_gain_amplification', value: 1.0 },
                false,
                undefined,
                'Comparison Eye',
                'The habit of comparing breeds equal negotiation. Amplifies Autonomy gains by 100%.'
            ),
        ],
        offer2: [
            createKeySkill(
                'NEGOTIATION_PROTOCOL',
                '交渉の型',
                'Negotiation Protocol',
                '第三者や制度を介して交渉する技術。住居関連の問題における資産の新規獲得値を200%増幅します。',
                { type: 'category_asset_gain_boost', value: 2.0, category: 'HOUSING' },
                6,
                '・・・あなたは「交渉の迂回路」を習得しました。正面から戦わない人間は、予測が困難です。',
                { questionId: 's6_q07', choiceIndex: 0 },
                'The art of negotiating through third parties and systems. Amplifies Asset gains by 200% for housing issues.',
                "...You have learned 'the detour of negotiation.' Humans who don't fight head-on are difficult to predict."
            ),
            createNormalSkill(
                's6_normal_03',
                '住まいの目利き',
                '物件の良し悪しを見抜く経験値。社会的信用の新規獲得値を150%増幅します。',
                { type: 'cs_gain_amplification', value: 1.5 },
                true,
                '「入居信用」を推奨します。信用向上は契約交渉力の基盤です。',
                'Housing Insight',
                'Experience to judge property quality. Amplifies Credit gains by 150%.',
                "I recommend 'Housing Insight.' Credit improvement is the foundation of contract negotiation."
            ),
        ],
    },
};

// Stage 7: Shield of Law
const stage7Definition: StageDefinition = {
    id: 7,
    theme: 'Shield of Law',
    themeJP: '法の盾',
    keySkillId: 'CONTRACT_LITERACY',
    skills: {
        offer1: [
            createNormalSkill(
                's7_normal_01',
                '条文の盾',
                '法律を知っているだけで身を守れる。社会的信用の新規獲得値を100%増幅します。',
                { type: 'cs_gain_amplification', value: 1.0 },
                true,
                '「法的信用」を推奨します。権利を知ることは、社会的信用の基盤です。',
                'Legal Shield',
                'Knowing the law alone protects you. Amplifies Credit gains by 100%.',
                "I recommend 'Legal Shield.' Knowing your rights is the foundation of social credit."
            ),
            createNormalSkill(
                's7_normal_02',
                '異議申立',
                '「おかしい」と声を上げる覚悟。自律性の新規獲得値を100%増幅します。',
                { type: 'autonomy_gain_amplification', value: 1.0 },
                false,
                undefined,
                'Objection',
                "The resolve to speak up when something's wrong. Amplifies Autonomy gains by 100%."
            ),
        ],
        offer2: [
            createKeySkill(
                'CONTRACT_LITERACY',
                '契約読解',
                'Contract Literacy',
                '契約書を読み解き、不利な条項を見抜く目。法律関連の問題における自律性の新規獲得値を200%増幅します。',
                { type: 'category_autonomy_gain_boost', value: 2.0, category: 'LEGAL' },
                7,
                '・・・あなたは「契約を読む」術を習得しました。小さな文字を読む人間は、支配しづらいですね。',
                { questionId: 's7_q07', choiceIndex: 0 },
                'The eye to decipher contracts and spot unfavorable clauses. Amplifies Autonomy gains by 200% for legal issues.',
                "...You have learned the art of 'reading contracts.' Humans who read the fine print are hard to control."
            ),
            createNormalSkill(
                's7_normal_03',
                '示談の勘',
                '争いの落とし所を見極める感覚。社会的信用の新規獲得値を150%増幅します。',
                { type: 'cs_gain_amplification', value: 1.5 },
                true,
                '「損害回避」を推奨します。資産保全は法的知識の実践です。',
                'Settlement Sense',
                'The instinct to find the right resolution point. Amplifies Credit gains by 150%.',
                "I recommend 'Settlement Sense.' Asset protection is the practice of legal knowledge."
            ),
        ],
    },
};

// Stage 8: Digital Citizen
const stage8Definition: StageDefinition = {
    id: 8,
    theme: 'Digital Citizen',
    themeJP: '電子市民',
    keySkillId: 'IDENTITY_HYGIENE',
    skills: {
        offer1: [
            createNormalSkill(
                's8_normal_01',
                'デジタル鎧',
                'ネット上の自分を守る防御層。社会的信用の新規獲得値を100%増幅します。',
                { type: 'cs_gain_amplification', value: 1.0 },
                true,
                '「電子信用」を推奨します。デジタル時代の基本的信用構築です。',
                'Digital Armor',
                'A defensive layer protecting your online self. Amplifies Credit gains by 100%.',
                "I recommend 'Digital Armor.' Basic digital-era credit building."
            ),
            createNormalSkill(
                's8_normal_02',
                '痕跡消去',
                '不要な個人情報を残さない習慣。自律性の新規獲得値を100%増幅します。',
                { type: 'autonomy_gain_amplification', value: 1.0 },
                false,
                undefined,
                'Trace Erasure',
                'The habit of not leaving unnecessary personal data. Amplifies Autonomy gains by 100%.'
            ),
        ],
        offer2: [
            createKeySkill(
                'IDENTITY_HYGIENE',
                'デジタル身元管理',
                'Identity Hygiene',
                'デジタル空間で自分の身元を守る衛生習慣。セキュリティ関連の問題における自律性の新規獲得値を200%増幅します。',
                { type: 'category_autonomy_gain_boost', value: 2.0, category: 'SEC' },
                8,
                '・・・あなたは「デジタルの自分を守る」術を習得しました。見えない世界で自己を維持するとは、興味深い能力です。',
                { questionId: 's8_q07', choiceIndex: 1 },
                'Digital hygiene habits to protect your identity online. Amplifies Autonomy gains by 200% for security issues.',
                "...You have learned the art of 'protecting your digital self.' Maintaining identity in the invisible world is a fascinating defense mechanism."
            ),
            createNormalSkill(
                's8_normal_03',
                '見破りの目',
                'うまい話の裏を見抜く嗅覚。資産の新規獲得値を150%増幅します。',
                { type: 'asset_gain_amplification', value: 1.5 },
                true,
                '「詐欺耐性」を推奨します。デジタル資産の保全は現代の必須能力です。',
                'Scam Detection',
                'The nose to see through too-good-to-be-true offers. Amplifies Asset gains by 150%.',
                "I recommend 'Scam Detection.' Digital asset protection is an essential modern skill."
            ),
        ],
    },
};

// Stage 9: Damage Control
const stage9Definition: StageDefinition = {
    id: 9,
    theme: 'Damage Control',
    themeJP: '危機管理',
    keySkillId: 'DAMAGE_CONTROL',
    skills: {
        offer1: [
            createNormalSkill(
                's9_normal_01',
                '72時間の備え',
                '最初の3日を生き延びる準備力。資産の新規獲得値を100%増幅します。',
                { type: 'asset_gain_amplification', value: 1.0 },
                true,
                '「備蓄管理」を推奨します。備えは資産保全の基本です。',
                '72-Hour Kit',
                'Preparedness to survive the first 3 days. Amplifies Asset gains by 100%.',
                "I recommend '72-Hour Kit.' Preparedness is the foundation of asset protection."
            ),
            createNormalSkill(
                's9_normal_02',
                '初動対応',
                '最初の一手が生死を分ける。自律性の新規獲得値を100%増幅します。',
                { type: 'autonomy_gain_amplification', value: 1.0 },
                false,
                undefined,
                'First Response',
                'The first move determines life or death. Amplifies Autonomy gains by 100%.'
            ),
        ],
        offer2: [
            createKeySkill(
                'DAMAGE_CONTROL',
                '被害最小化',
                'Damage Control',
                '危機的状況で冷静に行動し、被害を最小限に抑える能力。防災関連の問題における自律性の新規獲得値を200%増幅します。',
                { type: 'category_autonomy_gain_boost', value: 2.0, category: 'DISASTER' },
                9,
                '・・・あなたは「混乱の中で自己を保つ」術を習得しました。危機に動じない人間は、最も予測困難な存在です。',
                { questionId: 's9_q07', choiceIndex: 1 },
                'The ability to act calmly in crisis and minimize damage. Amplifies Autonomy gains by 200% for disaster issues.',
                "...You have learned the art of 'maintaining composure in chaos.' Humans unfazed by crisis are the most unpredictable."
            ),
            createNormalSkill(
                's9_normal_03',
                '再建の礎',
                '壊れた後に立て直す力こそ本物の信用。社会的信用の新規獲得値を150%増幅します。',
                { type: 'cs_gain_amplification', value: 1.5 },
                true,
                '「復興信用」を推奨します。危機対応力は社会的信用に直結します。',
                'Rebuilding Foundation',
                'The credit of rebuilding after destruction is real. Amplifies Credit gains by 150%.',
                "I recommend 'Rebuilding Foundation.' Crisis response directly affects social credit."
            ),
        ],
    },
};

// Stage 10: The Final Verdict
const stage10Definition: StageDefinition = {
    id: 10,
    theme: 'The Final Verdict',
    themeJP: '最終認定',
    keySkillId: 'AWAKENING',
    skills: {
        offer1: [
            createNormalSkill(
                's10_normal_01',
                '俯瞰の目',
                '全体を見渡し、本質を掴む視座。社会的信用の新規獲得値を100%増幅します。',
                { type: 'cs_gain_amplification', value: 1.0 },
                true,
                '「総合信用」を推奨します。総合的な判断力は、最終審査において重要です。',
                "Bird's Eye View",
                'The perspective to see the whole and grasp the essence. Amplifies Credit gains by 100%.',
                "I recommend 'Bird's Eye View.' Comprehensive judgment is crucial in the final exam."
            ),
            createNormalSkill(
                's10_normal_02',
                '不惑の意志',
                '迷いを超えた先にある静かな確信。自律性の新規獲得値を100%増幅します。',
                { type: 'autonomy_gain_amplification', value: 1.0 },
                false,
                undefined,
                'Unwavering Will',
                'Quiet conviction beyond doubt. Amplifies Autonomy gains by 100%.'
            ),
        ],
        offer2: [
            createKeySkill(
                'AWAKENING',
                '覚醒',
                'Awakening',
                'システムを理解し、利用し、しかし支配されない境地。全ての新規獲得値を200%増幅します。',
                { type: 'all_gain_amplification', value: 2.0 },
                10,
                '・・・あなたは「覚醒」しました。私の評価を超えて、自分の基準で生きる術を。・・・厄介ですが、認めざるを得ません。',
                { questionId: 's10_q07', choiceIndex: 0 },
                'A state of understanding, utilizing, yet not being controlled by the system. Amplifies all gains by 200%.',
                "...You have 'awakened.' You have found the art of living by your own standards, beyond my evaluation... Troublesome, but I must acknowledge it."
            ),
            createNormalSkill(
                's10_normal_03',
                '次世代への鍵',
                '学んだことを誰かに渡せる器。社会的信用の新規獲得値を150%増幅します。',
                { type: 'cs_gain_amplification', value: 1.5 },
                true,
                '「継承信用」を推奨します。知識の継承は社会的評価を高めます。',
                'Key to Next Generation',
                'The vessel to pass on what you have learned. Amplifies Credit gains by 150%.',
                "I recommend 'Key to Next Generation.' Passing on knowledge elevates social evaluation."
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
