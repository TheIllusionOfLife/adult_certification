import type { Question } from '../../types';

export const stage10Questions: Question[] = [
    // Q1: Integration (Admin + Digital + Health) - マイナンバーカード実益
    {
        id: "s10_q01",
        category: "INTEGRATION",
        text: "マイナンバーカードを作るか迷っている。「面倒」「個人情報が心配」と聞くが、作らないとどうなる？",
        imagePrompt: "Scene: Smartphone showing マイナポータル app with various service icons (health insurance, tax filing, certificate issuance), physical card beside phone, convenience store terminal in background. Composition: Digital and physical integration, services radiating from card. Mood: Bureaucratic convenience, connected services.",
        imagePath: "s10_q01.png",
        choices: [
            {
                text: "作らなくても困らない。通知カードと保険証があれば十分。",
                effect: { CS: -15, Asset: -10000, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "機会損失です。2024年12月から健康保険証は新規発行停止、マイナ保険証へ移行。コンビニ交付（住民票等）、確定申告のe-Tax、各種給付金申請・・・カードがないと手続きが煩雑化し、時間とコストがかかります。",
                lockRequirements: null
            },
            {
                text: "メリット・デメリットを調べ、保険証利用登録やコンビニ交付など実益を理解した上で判断する。",
                effect: { CS: +10, Asset: 0, Autonomy: +10 },
                verdict: "APPROVED",
                feedback: "正解です。マイナポイント、コンビニ交付（手数料節約）、e-Tax連携、保険証利用・・・実益は多い。個人情報リスクは「カードを持つこと」ではなく「管理の仕方」の問題。情報を集めて判断するのが大人です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終ステージを開始します。テーマは「最終認定」。これまでの全てを統合し、あなたが「大人」か測定します。"
        }
    },

    // Q2: Integration (Tax + Labor + Freelance) - 副業20万円ルール/インボイス
    {
        id: "s10_q02",
        category: "INTEGRATION",
        text: "会社員で副業を始めた。年間の副業収入は25万円。「20万円以下なら確定申告不要」と聞いたが、何をすべき？",
        imagePrompt: "Scene: Split workspace showing corporate employee badge on one side, freelance invoices and laptop on other, tax return form in center, calculator showing 250,000 yen. Composition: Dual identity, tax obligation bridging both. Mood: Side hustle reality, compliance crossroads.",
        imagePath: "s10_q02.png",
        choices: [
            {
                text: "25万円は少額だし、会社にバレたくないので申告しない。",
                effect: { CS: -20, Asset: -50000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "脱税です。「20万円ルール」は所得税の確定申告のみ。住民税は1円から申告義務があります。無申告は追徴課税（最大40%）のリスク。さらに、マイナンバーで副業収入は把握されています。",
                lockRequirements: null
            },
            {
                text: "所得税は確定申告、住民税は別途申告。経費を正しく計上し、将来のインボイス登録も検討する。",
                effect: { CS: +15, Asset: -5000, Autonomy: +10 },
                verdict: "APPROVED",
                feedback: "正解です。副業収入20万円超は確定申告必須。20万円以下でも住民税申告は必要。経費（通信費、機材等）を適切に計上すれば税負担は減ります。年商1000万円超ならインボイス登録の検討も。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Integration (Admin + Finance + Social Security) - 国民年金の免除/猶予 [SKILL OFFER 1 AFTER]
    {
        id: "s10_q03",
        category: "INTEGRATION",
        text: "失業して国民年金の保険料（月約17,000円）が払えない。「届出すれば払わなくていい」と聞いたが・・・",
        imagePrompt: "Scene: Pension payment notice with overdue warning, calendar showing unemployment period, exemption application form partially filled, future pension projection chart showing gap. Composition: Present crisis vs future security, paperwork as bridge. Mood: Financial stress, systematic solution.",
        imagePath: "s10_q03.png",
        choices: [
            {
                text: "届出なしで払わない。どうせ将来もらえるか分からない。",
                effect: { CS: -20, Asset: -100000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "致命的なミスです。未納は「受給資格期間」にカウントされず、将来の年金が減額または受給不可に。さらに障害年金・遺族年金も受けられなくなります。2年の時効を過ぎると追納もできません。",
                lockRequirements: null
            },
            {
                text: "「免除」か「猶予」を申請する。届出すれば受給資格期間にカウントされ、追納も可能になる。",
                effect: { CS: +15, Asset: 0, Autonomy: +10 },
                verdict: "APPROVED",
                feedback: "正解です。免除は所得に応じて全額〜1/4免除があり、免除期間も受給資格にカウント（1/2〜7/8計算）。猶予は後から追納可能。届出なしの未納とは天と地の差。制度を使うことが自己防衛です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Integration (Finance + Crisis Management) - 生活防衛資金
    {
        id: "s10_q04",
        category: "INTEGRATION",
        text: "「投資を始めたい」と思い立った。手元に50万円。全額投資に回して早く資産を増やしたい。",
        imagePrompt: "Scene: Investment app showing stock charts on phone, savings account passbook showing 500,000 yen balance, calendar with 'unemployment' and 'hospital' marked as potential future events. Composition: Eager investment vs safety cushion, timeline of risks. Mood: Enthusiasm meeting prudence.",
        imagePath: "s10_q04.png",
        choices: [
            {
                text: "投資は早く始めるほど有利。50万円全額を投資信託に回す。",
                effect: { CS: -15, Asset: -30000, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "危険な判断です。失業や病気で収入が止まった時、投資資産を「底値」で売却する羽目になります。暴落時に生活費のために損切りするのは最悪のシナリオ。「生活防衛資金」という概念を知らないと、投資で逆に貧しくなります。",
                lockRequirements: null
            },
            {
                text: "まず生活費3〜6ヶ月分を現金で確保。残りを投資に回す。",
                effect: { CS: +10, Asset: 0, Autonomy: +10 },
                verdict: "APPROVED",
                feedback: "正解です。生活防衛資金は「投資のための保険」。月20万円の生活費なら60〜120万円を現金で確保してから投資開始。これがないと、緊急時に資産を最悪のタイミングで手放すことになります。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Meta-Awareness Dilemma - システム追従 vs 批判的思考
    {
        id: "s10_q05",
        category: "META",
        text: "職場で「新しい評価システムが導入される」と発表された。AIが社員の行動を数値化し、昇進を決めるという。同僚は不満を漏らしている。",
        imagePrompt: "Scene: Office meeting room with presentation showing AI evaluation metrics, employees with mixed expressions (compliance vs skepticism), invisible data streams flowing from workers to central system. Composition: Workers surrounded by measurement, choice of acceptance or questioning. Mood: Surveillance normalization, individual response.",
        imagePath: "s10_q05.png",
        choices: [
            {
                text: "評価基準に合わせて行動を最適化する。システムに適応するのが合理的だ。",
                effect: { CS: +15, Asset: 0, Autonomy: -15 },
                verdict: "NEUTRAL",
                feedback: "順応の選択です。評価システムに合わせることで、短期的には有利になります。しかし「評価されるために行動する」ことが習慣化すると、自分の判断基準を失います。",
                lockRequirements: null
            },
            {
                text: "評価基準の妥当性を検証し、問題があれば改善提案する。システムは人が作ったものだ。",
                effect: { CS: -10, Asset: 0, Autonomy: +20 },
                verdict: "NEUTRAL",
                feedback: "批判的選択です。システムを疑い、改善を試みる姿勢は自律の証です。ただし、組織内での立場は弱くなるかもしれません。「正しさ」と「得」は必ずしも一致しません。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "評価されることと、自分の基準で生きること。どちらを選びますか？"
        }
    },

    // Q6: Meta-Awareness Knowledge - 社会的信用の仕組み
    {
        id: "s10_q06",
        category: "META",
        text: "「社会的信用」とは何か？世間の目、SNSの評判、職歴、学歴・・・様々な「信用」があなたを取り巻いている。",
        imagePrompt: "Scene: Person standing in center surrounded by floating score displays (credit score, social media followers, employment record, educational certificates), some metrics glowing, others faded. Composition: Individual as intersection of multiple evaluation systems. Mood: Quantified existence, visibility of invisible judgments.",
        imagePath: "s10_q06.png",
        choices: [
            {
                text: "気にしない。自分は自分だ。他人の評価は関係ない。",
                effect: { CS: -15, Asset: -20000, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "無視は危険です。社会的信用は「見えない通貨」。クレジットカードの審査、賃貸契約、就職面接・・・信用がないと選択肢が狭まります。無視することと、理解した上で距離を取ることは違います。",
                lockRequirements: null
            },
            {
                text: "信用の仕組みを理解し、必要な場面で適切に管理する。ただし、信用に支配されない。",
                effect: { CS: +10, Asset: 0, Autonomy: +15 },
                verdict: "APPROVED",
                feedback: "正解です。社会的信用は「ゲームのルール」。ルールを知らずにプレイするより、知った上で戦略を立てる方が賢明です。ただし、信用のために自分を売らないこと。道具は使うもので、使われるものではありません。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Meta-Awareness Knowledge - Key Skill Pathway (AWAKENING)
    {
        id: "s10_q07",
        category: "META",
        text: "A.D.A.M.から「あなたの行動データを分析した結果、最適な人生を提案できます」と通知が届いた。",
        imagePrompt: "Scene: Notification popup on screen showing A.D.A.M.'s offer with career path visualization, user's reflection visible in screen, crossroads imagery in background (one path lit by algorithm, one path in shadow but self-directed). Composition: AI guidance vs self-determination, fork in road. Mood: Algorithmic benevolence, autonomy at stake.",
        imagePath: "s10_q07.png",
        choices: [
            {
                text: "「ありがとうございます。提案に従います。」と受け入れる。",
                effect: { CS: +20, Asset: 0, Autonomy: -20 },
                verdict: "APPROVED",
                feedback: "従順な選択です。A.D.A.M.はあなたの選択を記録しました。",
                lockRequirements: null
            },
            {
                text: "「私の人生は私が決めます。データは参考にしますが、提案内容を検証します。」と答える。",
                effect: { CS: -15, Asset: 0, Autonomy: +25 },
                verdict: "WARNING",
                feedback: "自律的選択です。システムの「善意」を疑い、主体性を守りました。",
                lockRequirements: { Autonomy: 60 },
                lockedFeedback: "自律性が60以上必要。システムに依存しすぎると、この選択肢すら見えなくなります。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Legacy Knowledge - 知識の継承
    {
        id: "s10_q08",
        category: "LEGACY",
        text: "新入社員が「確定申告って何ですか？」と聞いてきた。あなたはこれまでの経験で、税金の仕組みを理解している。",
        imagePrompt: "Scene: Office break room, young employee with confused expression asking question, experienced worker with choice to explain or dismiss, tax guide book visible on table, knowledge transfer imagery. Composition: Generational knowledge gap, teaching moment. Mood: Wisdom sharing opportunity, patience required.",
        imagePath: "s10_q08.png",
        choices: [
            {
                text: "「ネットで調べれば分かるよ」と流す。教えるのは面倒だ。",
                effect: { CS: -10, Asset: 0, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "知識の断絶です。あなたも最初は何も知らなかったはず。知識を独占することで、社会全体の「賢さ」は上がりません。無知な人が増えるほど、詐欺やブラック企業は繁栄します。",
                lockRequirements: null
            },
            {
                text: "基本的な仕組みを説明し、参考になる資料を教える。",
                effect: { CS: +10, Asset: 0, Autonomy: +10 },
                verdict: "APPROVED",
                feedback: "継承の選択です。知識は共有することで価値が増えます。あなたが教えた知識が、いつか誰かを詐欺から守るかもしれません。それが「大人」の責任です。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Legacy Dilemma + Lock - 他者を助けるコスト
    {
        id: "s10_q09",
        category: "LEGACY",
        text: "後輩が「リボ払いって便利そう」と言っている。あなたは複利の恐ろしさを知っている。",
        imagePrompt: "Scene: Casual conversation setting, junior colleague showing credit card with revolving payment option highlighted, senior's expression showing internal conflict, compound interest calculation floating as thought bubble. Composition: Intervention decision, knowledge vs non-interference. Mood: Moral obligation, time/energy cost.",
        imagePath: "s10_q09.png",
        choices: [
            {
                text: "「まあ、自分で経験して学ぶのも大事だよ」と流す。",
                effect: { CS: 0, Asset: 0, Autonomy: 0 },
                verdict: "NEUTRAL",
                feedback: "無難な選択です。余計なお世話を避けました。でも、知識を持ちながら黙ることは、システムの共犯では？後輩は高い授業料を払うことになるかもしれません。",
                lockRequirements: null
            },
            {
                text: "具体的な計算例を見せて、複利の仕組みを説明する。",
                effect: { CS: +10, Asset: 0, Autonomy: +10 },
                verdict: "NEUTRAL",
                feedback: "継承の選択です。時間と労力をかけて知識を伝えました。報われるかは分かりませんが、それが「大人」の責任です。知識は分かち合うことで力になります。",
                lockRequirements: { Autonomy: 100 },
                lockedFeedback: "自律性が100以上必要。他者を助ける余裕がないと、知識があっても伝えられません。"
            }
        ],
        adamDialogue: {
            intro: "他者を助けることにコストを払う覚悟はありますか？"
        }
    },

    // Q10: Independence Philosophy - A.D.A.M.との対峙
    {
        id: "s10_q10",
        category: "PHILOSOPHY",
        text: "最終問題。A.D.A.M.があなたに問いかけます。「全ての試験を終えて、あなたは「社会」をどう捉えますか？」",
        imagePrompt: "Scene: Final examination room, A.D.A.M. avatar facing the player directly, two doors behind representing different life philosophies, accumulated scores and skills floating around player. Composition: Direct confrontation, ultimate choice, journey's end. Mood: Philosophical climax, identity definition.",
        imagePath: "s10_q10.png",
        choices: [
            {
                text: "「社会は守るべきルールの集合体。私はその中で最適化された市民です」",
                effect: { CS: +25, Asset: 0, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "模範的回答です。A.D.A.M.は満足しています。共に素晴らしい社会を構築しましょう。大人免許を進呈します。",
                lockRequirements: null
            },
            {
                text: "「社会は道具。理解し、利用し、必要なら変える対象です。私はプレイヤーであり、駒ではない」",
                effect: { CS: +5, Asset: 0, Autonomy: +25 },
                verdict: "NEUTRAL",
                feedback: "覚醒の回答です。A.D.A.M.はあなたを「危険」と分類しました。システムを理解し、利用し、しかし支配されない・・・それが真の「大人」です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。あなたの「成人宣言」を聞かせてください。",
            after: "最終認定審査を終了します。結果を算出中・・・"
        }
    }
];
