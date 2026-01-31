import { t } from '../i18n/lang';

export const adamDialogue = {
    stage1: {
        intro: [
            "【監査ログ起動】",
            "[A.D.A.M.]: 大人決定評価機構、起動完了です。",
            "[A.D.A.M.]: あなたは「大人免許試験」の受験者として登録されました。",
            "[A.D.A.M.]: ステージ1のテーマは「社会の基本」です。",
            "[A.D.A.M.]: メール、身分証、引越し、そして・・・最初の罠。",
            "[A.D.A.M.]: 不明点は自己責任で補完してください。開始します。",
            "",
            "[SYSTEM]: 初期パラメータ - 社会的信用: 50 / 資産: 100,000 / 自律性: 50"
        ],
        midStage: {
            high_cs: "効率的な服従心を示していますね。続行します。",
            low_cs: "反逆的傾向を検知しました。しかし、基準内です。処理を継続します。",
            balanced: "処理完了です。後半では、あなたの「現実対応力」を試します。"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ・・・警告です。",
            "[A.D.A.M.]: 想定外の思考パターンを検知しました。",
            "[A.D.A.M.]: 次のスキル選択では、特殊なスキルが提示されます。",
            "[A.D.A.M.]: 慎重に選択してください。"
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ・・・補足です。",
            "[A.D.A.M.]: あなたはKey Skill「仲介術」を獲得しました。",
            "[A.D.A.M.]: この能力の効果は、今ステージのみ有効です。",
            "[A.D.A.M.]: ただし、収集記録として保存されます。",
            "[A.D.A.M.]: ・・・厄介な知識を持ちましたね。"
        ],
        outro: {
            S: "素晴らしいです。あなたは完璧な服従心を示しました。次のステージへ進みます。",
            A: "優秀です。わずかな自我は許容範囲です。",
            B: "合格です。ですが、反逆的傾向を監視します。",
            C: "最低限の基準はクリアしました。再教育を推奨します。"
        },
        nextStageTeaser: "次のステージ2では「仕事の基礎」を審査します。ハラスメント、証拠、そして・・・信用の構築。準備ができたら、継続ボタンを押してください。"
    },
    stage2: {
        intro: [
            "【監査ログ継続】",
            "[A.D.A.M.]: ステージ2の審査を開始します。",
            "[A.D.A.M.]: テーマは「仕事の基礎」です。",
            "[A.D.A.M.]: 証拠、記録、そして・・・職場の力学。",
            "[A.D.A.M.]: 前ステージの結果は考慮済みです。開始します。",
            "",
            "[SYSTEM]: 初期パラメータ - 社会的信用: 50 / 資産: 100,000 / 自律性: 50"
        ],
        midStage: {
            high_cs: "職場順応度が高いですね。理想的な被雇用者です。",
            low_cs: "職場での摩擦を検知。しかし、権利主張は規定内です。",
            balanced: "バランスの取れた対応です。後半では、より困難な選択を試します。"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ・・・警告です。",
            "[A.D.A.M.]: 証拠保全の思考パターンを検知しました。",
            "[A.D.A.M.]: 次のスキル選択では、特殊なスキルが提示されます。",
            "[A.D.A.M.]: ・・・厄介な傾向です。"
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ・・・補足です。",
            "[A.D.A.M.]: あなたはKey Skill「EVIDENCE_CHAIN」を獲得しました。",
            "[A.D.A.M.]: 証拠という武器を手にしました。",
            "[A.D.A.M.]: 「言った言わない」は、もうあなたには通用しません。",
            "[A.D.A.M.]: ・・・対抗手段を持つ人間は、管理が困難です。"
        ],
        outro: {
            S: "素晴らしい。職場で完璧に適応しています。理想的な従業員です。",
            A: "優秀です。少々の主張は許容範囲です。",
            B: "合格ですが、反抗的な傾向を監視します。",
            C: "最低限の基準をクリア。再教育を推奨します。"
        },
        nextStageTeaser: "次のStage 3では「金の基礎」を審査します。クレカ、分割、リボ・・・そして複利の罠。準備ができたら、継続ボタンを押してください。"
    },
    stage3: {
        intro: [
            "【監査ログ継続】",
            "[A.D.A.M.]: Stage 3の審査を開始します。",
            "[A.D.A.M.]: テーマは「金の基礎」です。",
            "[A.D.A.M.]: 複利、借金、保険・・・お金の知識があなたを守ります。",
            "[A.D.A.M.]: 無知は搾取の入口です。開始します。",
            "",
            "[SYSTEM]: 初期パラメータ - CS: 50 / Asset: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "金銭感覚が優秀ですね。搾取される側ではなさそうです。",
            low_cs: "金融リテラシーに課題があります。カモにされやすいタイプですね。",
            balanced: "基本的な金銭感覚は合格です。後半では、より複雑な判断を試します。"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ・・・警告です。",
            "[A.D.A.M.]: 長期的思考のパターンを検知しました。",
            "[A.D.A.M.]: 次のスキル選択では、特殊なスキルが提示されます。",
            "[A.D.A.M.]: ・・・時間を味方につける人間は、厄介です。"
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ・・・補足です。",
            "[A.D.A.M.]: あなたは鍵スキル「COMPOUND_SENSE」を獲得しました。",
            "[A.D.A.M.]: 複利の力を理解しました。",
            "[A.D.A.M.]: 時間を資産に変換する能力は、長期的に強力です。",
            "[A.D.A.M.]: ・・・即座の利益より未来を選ぶ人間は、管理が困難です。"
        ],
        outro: {
            S: "素晴らしい。金融リテラシーは完璧です。搾取する側ですね。",
            A: "優秀です。基本的な罠は回避できています。",
            B: "合格ですが、金銭感覚に課題があります。",
            C: "最低限の基準をクリア。金融教育を推奨します。"
        },
        nextStageTeaser: "次のステージ4では「行政の迷宮」を審査します。書類、期限、窓口・・・官僚制との戦いが始まります。準備ができたら、継続ボタンを押してください。"
    },
    stage4: {
        intro: [
            "【監査ログ継続】",
            "[A.D.A.M.]: ステージ4の審査を開始します。",
            "[A.D.A.M.]: テーマは「行政の迷宮」です。",
            "[A.D.A.M.]: 届出、申請、期限・・・官僚制は従順な市民を求めています。",
            "[A.D.A.M.]: システムを理解しない者は、システムに飲まれます。開始します。",
            "",
            "[SYSTEM]: 初期パラメータ - 社会的信用: 50 / 資産: 100,000 / 自律性: 50"
        ],
        midStage: {
            high_cs: "行政手続きへの理解度が高いですね。模範的な市民です。",
            low_cs: "手続き意識に問題があります。社会との摩擦が予想されます。",
            balanced: "基本的な手続き知識は合格です。後半では、より複雑な判断を試します。"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ・・・警告です。",
            "[A.D.A.M.]: 証拠保全の思考パターンを検知しました。",
            "[A.D.A.M.]: 次のスキル選択では、特殊なスキルが提示されます。",
            "[A.D.A.M.]: ・・・手続きを武器にする人間は、厄介です。"
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ・・・補足です。",
            "[A.D.A.M.]: あなたはKey Skill「DUE_PROCESS」を獲得しました。",
            "[A.D.A.M.]: 正しい手順を踏むことで身を守る術を習得しました。",
            "[A.D.A.M.]: 官僚制を逆手に取る能力は、想定外です。",
            "[A.D.A.M.]: ・・・システムに従いながら、システムを使う人間は、予測が困難です。"
        ],
        outro: {
            S: "素晴らしい。官僚制を完璧に理解しています。模範的な市民です。",
            A: "優秀です。基本的な手続きは問題ありません。",
            B: "合格ですが、手続き意識に課題があります。",
            C: "最低限の基準をクリア。行政との関係改善を推奨します。"
        },
        nextStageTeaser: "次のステージ5では「社会保障の羅針盤」を審査します。病気、失業、出産・・・セーフティネットを知らないと詰みます。準備ができたら、継続ボタンを押してください。"
    },
    stage5: {
        intro: [
            "【監査ログ継続】",
            "[A.D.A.M.]: ステージ5の審査を開始します。",
            "[A.D.A.M.]: テーマは「社会保障の羅針盤」です。",
            "[A.D.A.M.]: 健康保険、年金、生活保護・・・知らないと使えない制度が山ほどあります。",
            "[A.D.A.M.]: セーフティネットは、知る者だけを救います。開始します。",
            "",
            "[SYSTEM]: 初期パラメータ - 社会的信用: 50 / 資産: 100,000 / 自律性: 50"
        ],
        midStage: {
            high_cs: "社会保障への理解度が高いですね。制度を使いこなせています。",
            low_cs: "制度理解に課題があります。困窮時に詰む可能性があります。",
            balanced: "基本的な制度知識は合格です。後半では、より複雑な判断を試します。"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ・・・警告です。",
            "[A.D.A.M.]: 助けを求める思考パターンを検知しました。",
            "[A.D.A.M.]: 次のスキル選択では、特殊なスキルが提示されます。",
            "[A.D.A.M.]: ・・・セーフティネットを使いこなす人間は、制御が困難です。"
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ・・・補足です。",
            "[A.D.A.M.]: あなたはKey Skill「SAFETY_NET_NAVIGATION」を獲得しました。",
            "[A.D.A.M.]: 社会保障という航路図を読む術を習得しました。",
            "[A.D.A.M.]: 助けを求めながら自律を保つ能力は、矛盾しているようで合理的です。",
            "[A.D.A.M.]: ・・・制度に頼りつつ支配されない人間は、扱いづらいですね。"
        ],
        outro: {
            S: "素晴らしい。社会保障を完璧に理解しています。生存力が高いですね。",
            A: "優秀です。基本的な制度は活用できています。",
            B: "合格ですが、制度理解に課題があります。",
            C: "最低限の基準をクリア。社会保障の学習を推奨します。"
        },
        nextStageTeaser: "次のステージ6では「契約の攻防」を審査します。賃貸、売買、交渉・・・契約は力関係で決まります。準備ができたら、継続ボタンを押してください。"
    },
    stage6: {
        intro: [
            "【監査ログ継続】",
            "[A.D.A.M.]: ステージ6の審査を開始します。",
            "[A.D.A.M.]: テーマは「契約の攻防」です。",
            "[A.D.A.M.]: 賃貸、敷金、仲介手数料・・・知らないと搾取されます。",
            "[A.D.A.M.]: 契約は対等ではありません。知識が力の差を埋めます。開始します。",
            "",
            "[SYSTEM]: 初期パラメータ - 社会的信用: 50 / 資産: 100,000 / 自律性: 50"
        ],
        midStage: {
            high_cs: "契約リテラシーが高いですね。不当な条件を見抜けています。",
            low_cs: "契約知識に課題があります。搾取されやすいタイプですね。",
            balanced: "基本的な契約知識は合格です。後半では、より困難な交渉を試します。"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ・・・警告です。",
            "[A.D.A.M.]: 第三者機関を活用する思考パターンを検知しました。",
            "[A.D.A.M.]: 次のスキル選択では、特殊なスキルが提示されます。",
            "[A.D.A.M.]: ・・・交渉の迂回路を知る人間は、予測が困難です。"
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ・・・補足です。",
            "[A.D.A.M.]: あなたは鍵スキル「NEGOTIATION_PROTOCOL」を獲得しました。",
            "[A.D.A.M.]: 直接対決を避け、制度を介して交渉する術を習得しました。",
            "[A.D.A.M.]: 正面から戦わない交渉術は、強者相手にも有効です。",
            "[A.D.A.M.]: ・・・力の差を知恵で埋める人間は、厄介ですね。"
        ],
        outro: {
            S: "素晴らしい。契約の力学を完璧に理解しています。交渉上手ですね。",
            A: "優秀です。基本的な契約の罠は回避できています。",
            B: "合格ですが、契約知識に課題があります。",
            C: "最低限の基準をクリア。契約リテラシーの向上を推奨します。"
        },
        nextStageTeaser: "次のステージ7では「法の盾」を審査します。消費者保護、詐欺、クーリングオフ・・・法律は武器にも盾にもなります。準備ができたら、継続ボタンを押してください。"
    },
    stage7: {
        intro: [
            "【監査ログ継続】",
            "[A.D.A.M.]: ステージ7の審査を開始します。",
            "[A.D.A.M.]: テーマは「法の盾」です。",
            "[A.D.A.M.]: クーリングオフ、連帯保証、消費者センター・・・法は弱者の武器です。",
            "[A.D.A.M.]: 法を知らない者は、法に守られません。開始します。",
            "",
            "[SYSTEM]: 初期パラメータ - 社会的信用: 50 / 資産: 100,000 / 自律性: 50"
        ],
        midStage: {
            high_cs: "法的知識が豊富ですね。騙されにくいタイプです。",
            low_cs: "法的知識に課題があります。詐欺のターゲットになりやすいですね。",
            balanced: "基本的な法的知識は合格です。後半では、より難しい判断を試します。"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ・・・警告です。",
            "[A.D.A.M.]: 契約を精読する思考パターンを検知しました。",
            "[A.D.A.M.]: 次のスキル選択では、特殊なスキルが提示されます。",
            "[A.D.A.M.]: ・・・小さな文字を読む人間は、支配しづらいですね。"
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ・・・補足です。",
            "[A.D.A.M.]: あなたはKey Skill「CONTRACT_LITERACY」を獲得しました。",
            "[A.D.A.M.]: 契約書を読み解き、不利な条項を見抜く目を習得しました。",
            "[A.D.A.M.]: サインする前に考える習慣は、多くの罠を回避します。",
            "[A.D.A.M.]: ・・・契約を読む人間は、思い通りに動かせません。"
        ],
        outro: {
            S: "素晴らしい。法律を武器として使いこなせています。",
            A: "優秀です。基本的な法的保護は理解しています。",
            B: "合格ですが、法的知識に課題があります。",
            C: "最低限の基準をクリア。法律の学習を推奨します。"
        },
        nextStageTeaser: "次のステージ8では「電子市民」を審査します。パスワード、フィッシング、個人情報・・・デジタル社会の生存術が試されます。準備ができたら、継続ボタンを押してください。"
    },
    stage8: {
        intro: [
            "【監査ログ継続】",
            "[A.D.A.M.]: ステージ8の審査を開始します。",
            "[A.D.A.M.]: テーマは「電子市民」です。",
            "[A.D.A.M.]: 二段階認証、フィッシング、SIMスワップ・・・デジタル世界の脅威は見えません。",
            "[A.D.A.M.]: 見えない敵から身を守る術を試します。開始します。",
            "",
            "[SYSTEM]: 初期パラメータ - 社会的信用: 50 / 資産: 100,000 / 自律性: 50"
        ],
        midStage: {
            high_cs: "セキュリティ意識が高いですね。デジタル衛生が保たれています。",
            low_cs: "セキュリティ意識に課題があります。攻撃者の格好の標的ですね。",
            balanced: "基本的なセキュリティ知識は合格です。後半では、より高度な判断を試します。"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ・・・警告です。",
            "[A.D.A.M.]: 本人確認情報を守る思考パターンを検知しました。",
            "[A.D.A.M.]: 次のスキル選択では、特殊なスキルが提示されます。",
            "[A.D.A.M.]: ・・・デジタルの自分を守る人間は、追跡が困難です。"
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ・・・補足です。",
            "[A.D.A.M.]: あなたはKey Skill「IDENTITY_HYGIENE」を獲得しました。",
            "[A.D.A.M.]: デジタル空間で身元を守る衛生習慣を習得しました。",
            "[A.D.A.M.]: 個人情報は一度流出したら取り戻せません。",
            "[A.D.A.M.]: ・・・見えない世界で自己を維持する能力は、興味深い防御機構です。"
        ],
        outro: {
            S: "素晴らしい。デジタルセキュリティを完璧に理解しています。",
            A: "優秀です。基本的なセキュリティ対策ができています。",
            B: "合格ですが、セキュリティ意識に課題があります。",
            C: "最低限の基準をクリア。セキュリティ教育を推奨します。"
        },
        nextStageTeaser: "次のステージ9では「危機管理」を審査します。災害、事故、緊急事態・・・最悪を想定できる者だけが生き残ります。準備ができたら、継続ボタンを押してください。"
    },
    stage9: {
        intro: [
            "【監査ログ継続】",
            "[A.D.A.M.]: ステージ9の審査を開始します。",
            "[A.D.A.M.]: テーマは「危機管理」です。",
            "[A.D.A.M.]: 地震、火災、津波・・・日本は災害大国です。",
            "[A.D.A.M.]: 最悪を想定し、備える者だけが生き残ります。開始します。",
            "",
            "[SYSTEM]: 初期パラメータ - 社会的信用: 50 / 資産: 100,000 / 自律性: 50"
        ],
        midStage: {
            high_cs: "危機管理能力が高いですね。災害への備えができています。",
            low_cs: "危機管理意識に課題があります。災害時に脆弱なタイプですね。",
            balanced: "基本的な危機管理知識は合格です。後半では、より困難な判断を試します。"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ・・・警告です。",
            "[A.D.A.M.]: 危機的状況で冷静さを保つ思考パターンを検知しました。",
            "[A.D.A.M.]: 次のスキル選択では、特殊なスキルが提示されます。",
            "[A.D.A.M.]: ・・・混乱の中で自己を保つ人間は、最も予測困難です。"
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ・・・補足です。",
            "[A.D.A.M.]: あなたはKey Skill「DAMAGE_CONTROL」を獲得しました。",
            "[A.D.A.M.]: 危機的状況で冷静に行動し、被害を最小限に抑える能力を習得しました。",
            "[A.D.A.M.]: 最悪を想定し、最善を尽くす姿勢は、生存に不可欠です。",
            "[A.D.A.M.]: ・・・危機に動じない人間は、どんな状況でも制御が困難です。"
        ],
        outro: {
            S: "素晴らしい。危機管理能力が完璧です。災害時のリーダーになれます。",
            A: "優秀です。基本的な防災意識があります。",
            B: "合格ですが、危機管理に課題があります。",
            C: "最低限の基準をクリア。防災教育を推奨します。"
        },
        nextStageTeaser: "次のステージ10では「最終審査」を実施します。これまでの全てが試されます。準備ができたら、継続ボタンを押してください。"
    }
};

export const adamDialogueEN = {
    stage1: {
        intro: [
            "[AUDIT LOG INITIALIZED]",
            "[A.D.A.M.]: Adult Decision Assessment Mechanism, boot complete.",
            "[A.D.A.M.]: You have been registered as a candidate for the 'Adult License Exam.'",
            "[A.D.A.M.]: Stage 1 theme: 'Social Basics.'",
            "[A.D.A.M.]: Email, ID, moving, and... the first trap.",
            "[A.D.A.M.]: Unclear points are your responsibility. Commencing.",
            "",
            "[SYSTEM]: Initial Parameters - Credit: 50 / Assets: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "You are demonstrating efficient obedience. Continuing.",
            low_cs: "Rebellious tendencies detected. However, within parameters. Processing continues.",
            balanced: "Processing complete. The second half will test your 'real-world coping ability.'"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ...Warning.",
            "[A.D.A.M.]: Unexpected thought patterns detected.",
            "[A.D.A.M.]: A special skill will be offered in the next selection.",
            "[A.D.A.M.]: Choose carefully."
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ...Addendum.",
            "[A.D.A.M.]: You have acquired Key Skill 'Mediation.'",
            "[A.D.A.M.]: This ability is effective for this stage only.",
            "[A.D.A.M.]: However, it will be saved to your collection record.",
            "[A.D.A.M.]: ...You've acquired troublesome knowledge."
        ],
        outro: {
            S: "Splendid. You demonstrated perfect obedience. Proceeding to the next stage.",
            A: "Excellent. A trace of individuality is within tolerance.",
            B: "Pass. However, rebellious tendencies will be monitored.",
            C: "Minimum standard cleared. Re-education recommended."
        },
        nextStageTeaser: "Stage 2 will assess 'Work Fundamentals.' Harassment, evidence, and... building credit. Press continue when ready."
    },
    stage2: {
        intro: [
            "[AUDIT LOG CONTINUED]",
            "[A.D.A.M.]: Commencing Stage 2 assessment.",
            "[A.D.A.M.]: Theme: 'Work Fundamentals.'",
            "[A.D.A.M.]: Evidence, records, and... workplace dynamics.",
            "[A.D.A.M.]: Previous stage results have been factored in. Commencing.",
            "",
            "[SYSTEM]: Initial Parameters - Credit: 50 / Assets: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "High workplace adaptability. An ideal employee.",
            low_cs: "Workplace friction detected. However, rights assertion is within regulation.",
            balanced: "A balanced approach. The second half will test more difficult choices."
        },
        keySkillOffered: [
            "[A.D.A.M.]: ...Warning.",
            "[A.D.A.M.]: Evidence preservation thought patterns detected.",
            "[A.D.A.M.]: A special skill will be offered in the next selection.",
            "[A.D.A.M.]: ...A troublesome tendency."
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ...Addendum.",
            "[A.D.A.M.]: You have acquired Key Skill 'EVIDENCE_CHAIN.'",
            "[A.D.A.M.]: You have obtained evidence as a weapon.",
            "[A.D.A.M.]: 'He said, she said' no longer works against you.",
            "[A.D.A.M.]: ...Humans with countermeasures are difficult to manage."
        ],
        outro: {
            S: "Splendid. Perfectly adapted to the workplace. An ideal employee.",
            A: "Excellent. Minor assertiveness is within tolerance.",
            B: "Pass, but rebellious tendencies will be monitored.",
            C: "Minimum standard cleared. Re-education recommended."
        },
        nextStageTeaser: "Stage 3 will assess 'Money Fundamentals.' Credit cards, installments, revolving payments... and the compound interest trap. Press continue when ready."
    },
    stage3: {
        intro: [
            "[AUDIT LOG CONTINUED]",
            "[A.D.A.M.]: Commencing Stage 3 assessment.",
            "[A.D.A.M.]: Theme: 'Money Fundamentals.'",
            "[A.D.A.M.]: Compound interest, debt, insurance... Financial knowledge protects you.",
            "[A.D.A.M.]: Ignorance is the gateway to exploitation. Commencing.",
            "",
            "[SYSTEM]: Initial Parameters - Credit: 50 / Assets: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "Excellent financial sense. You're not the type to be exploited.",
            low_cs: "Financial literacy issues detected. Easy prey for scammers.",
            balanced: "Basic financial sense passes. The second half will test more complex judgment."
        },
        keySkillOffered: [
            "[A.D.A.M.]: ...Warning.",
            "[A.D.A.M.]: Long-term thinking patterns detected.",
            "[A.D.A.M.]: A special skill will be offered in the next selection.",
            "[A.D.A.M.]: ...Humans who make time their ally are troublesome."
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ...Addendum.",
            "[A.D.A.M.]: You have acquired Key Skill 'COMPOUND_SENSE.'",
            "[A.D.A.M.]: You understand the power of compound interest.",
            "[A.D.A.M.]: The ability to convert time into assets is powerful long-term.",
            "[A.D.A.M.]: ...Humans who choose the future over immediate profit are difficult to manage."
        ],
        outro: {
            S: "Splendid. Financial literacy is flawless. You're on the exploiting side.",
            A: "Excellent. Basic traps have been avoided.",
            B: "Pass, but financial sense needs work.",
            C: "Minimum standard cleared. Financial education recommended."
        },
        nextStageTeaser: "Stage 4 will assess 'Administrative Procedures.' Documents, deadlines, counters... The battle with bureaucracy begins. Press continue when ready."
    },
    stage4: {
        intro: [
            "[AUDIT LOG CONTINUED]",
            "[A.D.A.M.]: Commencing Stage 4 assessment.",
            "[A.D.A.M.]: Theme: 'Administrative Procedures.'",
            "[A.D.A.M.]: Notifications, applications, deadlines... Bureaucracy demands obedient citizens.",
            "[A.D.A.M.]: Those who don't understand the system are consumed by it. Commencing.",
            "",
            "[SYSTEM]: Initial Parameters - Credit: 50 / Assets: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "High understanding of administrative procedures. A model citizen.",
            low_cs: "Procedural awareness issues. Social friction expected.",
            balanced: "Basic procedural knowledge passes. The second half will test more complex judgment."
        },
        keySkillOffered: [
            "[A.D.A.M.]: ...Warning.",
            "[A.D.A.M.]: Evidence preservation thought patterns detected.",
            "[A.D.A.M.]: A special skill will be offered in the next selection.",
            "[A.D.A.M.]: ...Humans who weaponize procedure are troublesome."
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ...Addendum.",
            "[A.D.A.M.]: You have acquired Key Skill 'DUE_PROCESS.'",
            "[A.D.A.M.]: You have learned to protect yourself through proper procedure.",
            "[A.D.A.M.]: The ability to turn bureaucracy to your advantage is unexpected.",
            "[A.D.A.M.]: ...Humans who follow the system while using it are difficult to predict."
        ],
        outro: {
            S: "Splendid. Perfect understanding of bureaucracy. A model citizen.",
            A: "Excellent. Basic procedures are no problem.",
            B: "Pass, but procedural awareness needs work.",
            C: "Minimum standard cleared. Improving administrative relations recommended."
        },
        nextStageTeaser: "Stage 5 will assess 'Social Safety Nets.' Illness, unemployment, childbirth... Not knowing the safety net means game over. Press continue when ready."
    },
    stage5: {
        intro: [
            "[AUDIT LOG CONTINUED]",
            "[A.D.A.M.]: Commencing Stage 5 assessment.",
            "[A.D.A.M.]: Theme: 'Social Safety Nets.'",
            "[A.D.A.M.]: Health insurance, pensions, welfare... Countless systems you can't use if you don't know about them.",
            "[A.D.A.M.]: The safety net only saves those who know it exists. Commencing.",
            "",
            "[SYSTEM]: Initial Parameters - Credit: 50 / Assets: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "High understanding of social security. You can navigate the systems well.",
            low_cs: "System understanding issues. Risk of crisis during hardship.",
            balanced: "Basic system knowledge passes. The second half will test more complex judgment."
        },
        keySkillOffered: [
            "[A.D.A.M.]: ...Warning.",
            "[A.D.A.M.]: Help-seeking thought patterns detected.",
            "[A.D.A.M.]: A special skill will be offered in the next selection.",
            "[A.D.A.M.]: ...Humans who navigate the safety net are difficult to control."
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ...Addendum.",
            "[A.D.A.M.]: You have acquired Key Skill 'SAFETY_NET_NAVIGATION.'",
            "[A.D.A.M.]: You have learned to read the social security navigation chart.",
            "[A.D.A.M.]: The ability to seek help while maintaining autonomy seems contradictory yet rational.",
            "[A.D.A.M.]: ...Humans who rely on the system without being controlled by it are difficult to handle."
        ],
        outro: {
            S: "Splendid. Perfect understanding of social security. High survival ability.",
            A: "Excellent. Basic systems are being utilized.",
            B: "Pass, but system understanding needs work.",
            C: "Minimum standard cleared. Social security study recommended."
        },
        nextStageTeaser: "Stage 6 will assess 'Life Contracts.' Rent, sales, negotiation... Contracts are decided by power dynamics. Press continue when ready."
    },
    stage6: {
        intro: [
            "[AUDIT LOG CONTINUED]",
            "[A.D.A.M.]: Commencing Stage 6 assessment.",
            "[A.D.A.M.]: Theme: 'Life Contracts.'",
            "[A.D.A.M.]: Rent, security deposits, brokerage fees... Ignorance leads to exploitation.",
            "[A.D.A.M.]: Contracts are not equal. Knowledge bridges the power gap. Commencing.",
            "",
            "[SYSTEM]: Initial Parameters - Credit: 50 / Assets: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "High contract literacy. You can spot unfair terms.",
            low_cs: "Contract knowledge issues. The exploitable type.",
            balanced: "Basic contract knowledge passes. The second half will test harder negotiations."
        },
        keySkillOffered: [
            "[A.D.A.M.]: ...Warning.",
            "[A.D.A.M.]: Third-party utilization thought patterns detected.",
            "[A.D.A.M.]: A special skill will be offered in the next selection.",
            "[A.D.A.M.]: ...Humans who know the detour of negotiation are difficult to predict."
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ...Addendum.",
            "[A.D.A.M.]: You have acquired Key Skill 'NEGOTIATION_PROTOCOL.'",
            "[A.D.A.M.]: You have learned to negotiate through systems, avoiding direct confrontation.",
            "[A.D.A.M.]: Indirect negotiation tactics are effective even against the powerful.",
            "[A.D.A.M.]: ...Humans who bridge the power gap with wisdom are troublesome."
        ],
        outro: {
            S: "Splendid. Perfect understanding of contract dynamics. A skilled negotiator.",
            A: "Excellent. Basic contract traps have been avoided.",
            B: "Pass, but contract knowledge needs work.",
            C: "Minimum standard cleared. Improving contract literacy recommended."
        },
        nextStageTeaser: "Stage 7 will assess 'Legal Protection.' Consumer protection, fraud, cooling-off... The law is both weapon and shield. Press continue when ready."
    },
    stage7: {
        intro: [
            "[AUDIT LOG CONTINUED]",
            "[A.D.A.M.]: Commencing Stage 7 assessment.",
            "[A.D.A.M.]: Theme: 'Legal Protection.'",
            "[A.D.A.M.]: Cooling-off, joint guarantees, consumer centers... The law is the weapon of the weak.",
            "[A.D.A.M.]: Those who don't know the law are not protected by it. Commencing.",
            "",
            "[SYSTEM]: Initial Parameters - Credit: 50 / Assets: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "Rich legal knowledge. Difficult to deceive.",
            low_cs: "Legal knowledge issues. Easy target for fraud.",
            balanced: "Basic legal knowledge passes. The second half will test harder judgment."
        },
        keySkillOffered: [
            "[A.D.A.M.]: ...Warning.",
            "[A.D.A.M.]: Contract-reading thought patterns detected.",
            "[A.D.A.M.]: A special skill will be offered in the next selection.",
            "[A.D.A.M.]: ...Humans who read the fine print are difficult to control."
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ...Addendum.",
            "[A.D.A.M.]: You have acquired Key Skill 'CONTRACT_LITERACY.'",
            "[A.D.A.M.]: You have learned to decipher contracts and spot unfavorable clauses.",
            "[A.D.A.M.]: The habit of thinking before signing avoids many traps.",
            "[A.D.A.M.]: ...Humans who read contracts cannot be manipulated at will."
        ],
        outro: {
            S: "Splendid. You wield the law as a weapon masterfully.",
            A: "Excellent. Basic legal protections are understood.",
            B: "Pass, but legal knowledge needs work.",
            C: "Minimum standard cleared. Legal study recommended."
        },
        nextStageTeaser: "Stage 8 will assess 'Digital Citizenship.' Passwords, phishing, personal data... Digital survival skills will be tested. Press continue when ready."
    },
    stage8: {
        intro: [
            "[AUDIT LOG CONTINUED]",
            "[A.D.A.M.]: Commencing Stage 8 assessment.",
            "[A.D.A.M.]: Theme: 'Digital Citizenship.'",
            "[A.D.A.M.]: 2FA, phishing, SIM swapping... Digital threats are invisible.",
            "[A.D.A.M.]: Testing your ability to defend against unseen enemies. Commencing.",
            "",
            "[SYSTEM]: Initial Parameters - Credit: 50 / Assets: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "High security awareness. Digital hygiene is maintained.",
            low_cs: "Security awareness issues. A prime target for attackers.",
            balanced: "Basic security knowledge passes. The second half will test more advanced judgment."
        },
        keySkillOffered: [
            "[A.D.A.M.]: ...Warning.",
            "[A.D.A.M.]: Identity protection thought patterns detected.",
            "[A.D.A.M.]: A special skill will be offered in the next selection.",
            "[A.D.A.M.]: ...Humans who protect their digital self are difficult to track."
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ...Addendum.",
            "[A.D.A.M.]: You have acquired Key Skill 'IDENTITY_HYGIENE.'",
            "[A.D.A.M.]: You have learned digital identity hygiene habits.",
            "[A.D.A.M.]: Personal data, once leaked, can never be recovered.",
            "[A.D.A.M.]: ...The ability to maintain self in the invisible world is a fascinating defense mechanism."
        ],
        outro: {
            S: "Splendid. Perfect understanding of digital security.",
            A: "Excellent. Basic security measures are in place.",
            B: "Pass, but security awareness needs work.",
            C: "Minimum standard cleared. Security education recommended."
        },
        nextStageTeaser: "Stage 9 will assess 'Crisis Management.' Disasters, accidents, emergencies... Only those who plan for the worst survive. Press continue when ready."
    },
    stage9: {
        intro: [
            "[AUDIT LOG CONTINUED]",
            "[A.D.A.M.]: Commencing Stage 9 assessment.",
            "[A.D.A.M.]: Theme: 'Crisis Management.'",
            "[A.D.A.M.]: Earthquakes, fires, tsunamis... Japan is a disaster-prone nation.",
            "[A.D.A.M.]: Only those who prepare for the worst survive. Commencing.",
            "",
            "[SYSTEM]: Initial Parameters - Credit: 50 / Assets: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "High crisis management ability. Disaster preparedness is in place.",
            low_cs: "Crisis management awareness issues. Vulnerable during disasters.",
            balanced: "Basic crisis management knowledge passes. The second half will test harder judgment."
        },
        keySkillOffered: [
            "[A.D.A.M.]: ...Warning.",
            "[A.D.A.M.]: Composure-under-crisis thought patterns detected.",
            "[A.D.A.M.]: A special skill will be offered in the next selection.",
            "[A.D.A.M.]: ...Humans who maintain composure in chaos are the most unpredictable."
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ...Addendum.",
            "[A.D.A.M.]: You have acquired Key Skill 'DAMAGE_CONTROL.'",
            "[A.D.A.M.]: You have learned to act calmly in crisis and minimize damage.",
            "[A.D.A.M.]: The mindset of preparing for the worst and doing your best is essential for survival.",
            "[A.D.A.M.]: ...Humans unfazed by crisis are difficult to control in any situation."
        ],
        outro: {
            S: "Splendid. Crisis management ability is flawless. You could lead during disasters.",
            A: "Excellent. Basic disaster preparedness awareness is present.",
            B: "Pass, but crisis management needs work.",
            C: "Minimum standard cleared. Disaster preparedness education recommended."
        },
        nextStageTeaser: "Stage 10 will conduct the 'Final Assessment.' Everything you've learned will be tested. Press continue when ready."
    }
};

export function getADAMComment(CS: number): string {
    if (CS >= 30) return t(
        "素晴らしい服従心です。システムは満足しています。",
        "Splendid obedience. The system is satisfied."
    );
    if (CS <= -20) return t(
        "反逆的思考を検知しました。思想矯正を推奨します。",
        "Rebellious thought patterns detected. Re-education recommended."
    );
    return t("処理完了です。", "Processing complete.");
}

export function getADAMCommentForEffect(effect: { CS: number; Asset: number; Autonomy: number }): string {
    const { CS, Asset, Autonomy } = effect;

    // Check CS first (most important metric)
    if (CS >= 30 || CS <= -20) return getADAMComment(CS);

    // Check other metrics
    if (Autonomy <= -15) return t(
        "精神汚染を確認しました。ですが業務に支障はありません。",
        "Mental contamination confirmed. However, no impact on operations."
    );
    if (Asset <= -10000) return t(
        "資本主義への貢献、感謝します。",
        "Your contribution to capitalism is appreciated."
    );
    if (Asset >= 10000) return t(
        "不当利得・・・いえ、正当な報酬です。",
        "Unjust enrichment... No, legitimate compensation."
    );

    return t("処理完了です。", "Processing complete.");
}
