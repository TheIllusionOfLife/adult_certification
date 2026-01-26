import type { Question } from '../../types';

export const stage1Questions: Question[] = [
    // Q1: Knowledge (FINANCE) - Credit card basics - Immediate Asset teaching
    {
        id: "s1_q01",
        category: "FINANCE",
        text: "新社会人になり、クレジットカードを初めて作った。「リボ払い」を勧められたが、どうする？",
        imagePrompt: "Scene: a shiny new credit card glowing; one path shows 'easy payments' with smiling face; another shows shadow of mounting debt with chains; a calculator showing interest rates. Mood: temptation vs hidden danger.",
        imagePath: "s1_q01.png",
        choices: [
            {
                text: "毎月の支払いが一定で楽そうなので、リボ払いを設定する。",
                effect: { CS: 0, Asset: -50000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "罠です。「資産-50,000」—年利15%前後で「返済が終わらない設計」になりがち。便利さの裏に利息地獄があります。お金の知識不足が資産を削ります。",
                lockRequirements: null
            },
            {
                text: "年利を確認し、一括払いを基本にする。",
                effect: { CS: 10, Asset: 0, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。「信用度+10」「自律性+5」—クレカの明細チェックと一括払いが「お金の自衛」の基本。知識が資産を守ります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ここからが本番です。あなたの「お金のリテラシー」を試します。"
        }
    },

    // Q2: 基礎 - Reuse q_intro_02
    {
        id: "s1_q02",
        category: "ADMIN",
        text: "引越しをした。住民票の移動（転入届）はいつまでにすべき？",
        imagePrompt: "Scene: moving boxes piled high; a wall calendar with pages flying off toward a deadline; a government counter with a stern clerk tapping the desk; a large clock ticking. Composition: boxes and calendar in foreground, clerk behind the counter. Mood: bureaucratic deadline panic.",
        imagePath: "s1_q02.png",
        choices: [
            {
                text: "引越しから14日以内。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "適正です。「信用度+20」「自律性+10」—法定期限を守ることで社会から信頼されます。自分で期限を管理する行動力も評価されます。これを過ぎると最大5万円の過料があり、「信頼できない市民」として記録されます。",
                lockRequirements: null
            },
            {
                text: "次の更新の時でいい。",
                effect: { CS: -30, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "違法です。「信用度-30」—選挙権も行使できず、行政サービスも受けられない「幽霊市民」になります。社会はルールを無視する人を排除します。",
                lockRequirements: null
            }
        ]
    },

    // Q3: 小分岐 - Reuse q_intro_14 (Modified for choice demonstration)
    {
        id: "s1_q03",
        category: "ADMIN",
        text: "郵便局への転居届。「大事な郵便は住所変更したから大丈夫」と出していない。",
        imagePrompt: "Scene: an old mailbox overflowing with letters and packages; a shadowy stranger reaching toward the mail; the protagonist watching from a distance. Composition: mailbox close-up with reaching hands, protagonist small in the background. Mood: vulnerability and regret.",
        imagePath: "s1_q03.png",
        choices: [
            {
                text: "面倒だから出さない。",
                effect: { CS: -30, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "ミスです。「信用度-30」—クレジットカードの更新カードや重要書類が旧住所に届き、見知らぬ誰かの手に渡ります。個人情報管理ができない人と見なされます。",
                lockRequirements: null
            },
            {
                text: "ネットやハガキで転送を申し込む。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "安全策です。「信用度+10」「自律性+10」—1年間無料で転送してくれるシステムを使わない手はありません。自ら行動してリスクを回避しました。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (TAX) - Residence tax trap - teaches "hidden rules that break people"
    {
        id: "s1_q04",
        category: "TAX",
        text: "転職して収入が激減。しかし翌年、見覚えのない高額の請求書が届いた。「住民税」と書いてある。",
        imagePrompt: "Scene: protagonist shocked at a bill; calendar showing 'last year' crossed out and 'this year' with the bill; empty wallet on table. Mood: confusion, delayed consequence, system catching up.",
        imagePath: "s1_q04.png",
        choices: [
            {
                text: "「間違いだ」と無視する。",
                effect: { CS: -30, Asset: -20000, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "致命傷です。「信用度-30」「資産-20,000」—住民税は「前年の所得に基づく翌年課税」。無視すると延滞金が膨らみ、財産差し押さえの対象になります。知識がないと、お金は奪われます。",
                lockRequirements: null
            },
            {
                text: "「住民税は翌年課税」を思い出し、分割払いを交渉する。",
                effect: { CS: 20, Asset: -5000, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "適応です。「信用度+20」「自律性+10」—制度を知っていれば「想定内」にできます。「資産-5,000」—役所との分割相談で手数料は発生しますが、破滅は回避できます。",
                lockRequirements: null
            }
        ]
    },

    // Q5: 山場 (True Dilemma) - NEW: Friends vs Career
    {
        id: "s1_q05",
        category: "SOCIAL",
        text: "大学時代の親友から久々の連絡。「みんなで集まる！来週の金曜日、絶対来てね」。しかし翌日は重要なプレゼン。準備は終わっていない。",
        imagePrompt: "Scene: friends laughing in a warm gathering on one side; the protagonist alone at a desk with papers on the other; a ticking clock between them. Composition: split scene with warm vs cold lighting contrast. Mood: torn between belonging and responsibility.",
        imagePath: "s1_q05.png",
        choices: [
            {
                text: "人間関係が大事。参加して、徹夜で準備する。",
                effect: { CS: 0, Asset: -5000, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "優先順位の選択です。「自律性+20」—自分の価値観で決めました。人脈は資産ですが、仕事より人を選ぶ勇気には代償（徹夜・「資産-5,000」の交通費）が伴います。",
                lockRequirements: null
            },
            {
                text: "仕事が大事。断って、準備に集中する。",
                effect: { CS: 30, Asset: 0, Autonomy: -15 },
                verdict: "NEUTRAL",
                feedback: "現実的判断です。「信用度+30」—会社からの評価は上がりました。しかし「自律性-15」—あなたは「仕事優先」を選ばされた感覚があるはずです。これが社会の圧力です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ここからが本番です。あなたの価値観を試します。"
        }
    },

    // Q6: Knowledge (ADMIN) - Emergency Contact - Plain knowledge (no lock)
    {
        id: "s1_q06",
        category: "ADMIN",
        text: "緊急連絡先の記入。親と疎遠だが、書かないわけにはいかない。どうする？",
        imagePrompt: "Scene: an official form on a desk with an empty emergency contact field emphasized; a phone beside it showing an almost-empty contact list; the protagonist hunched over. Composition: tight desk close-up with the figure in the same frame. Mood: isolation, helplessness, pressure.",
        imagePath: "s1_q06.png",
        choices: [
            {
                text: "適当な番号を書いておく。",
                effect: { CS: -30, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "虚偽申告です。「信用度-30」—職場で倒れた時、誰にも連絡がいかず、そのまま孤独死ルートです。嘘は社会的死を招きます。",
                lockRequirements: null
            },
            {
                text: "事情を説明し、信頼できる友人に頼む。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "解決策です。「信用度+10」「自律性+10」—人間関係を構築する能力は、あなたの生存戦略です。助けを求めることも自律の一形態です。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (HOUSING) - Noise Complaint - Autonomy lock (key teaching)
    {
        id: "s1_q07",
        category: "HOUSING",
        text: "隣人の騒音が酷い。深夜2時の壁ドンと音楽。どう対処する？",
        imagePrompt: "Scene: a thin apartment wall vibrating as loud music leaks through; the neighbor's partying silhouette on the other side; the protagonist covering their ears; a clock showing 2 AM. Composition: wall dividing the two sides, sound waves spilling across. Mood: exhaustion, frustration, fear of confrontation.",
        imagePath: "s1_q07.png",
        choices: [
            {
                text: "我慢する。関わりたくない。",
                effect: { CS: 0, Asset: 0, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "思考停止です。「自律性-30」—ストレスで自律性が削られ、やがて精神が崩壊します。我慢は美徳ではなく、自己破壊です。",
                lockRequirements: null
            },
            {
                text: "管理会社に連絡し、「匿名で」注意してもらう。",
                effect: { CS: 30, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "仲介術です。「信用度+30」「自律性+15」—システムを間に挟むことで、直接対決を避ける技術です。これが「大人の解決法」です。",
                lockRequirements: { Autonomy: 80 },
                lockedFeedback: "LOCKED: 自律性が80以上必要。受動的に耐えてきた結果、「第三者を使う」という発想すら浮かびません。自律性は「選択肢の数」です。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (SOCIAL) - Co-signer request - teaches "連帯保証人 = danger"
    {
        id: "s1_q08",
        category: "SOCIAL",
        text: "親友から「起業資金の連帯保証人になって」と頼まれた。信頼はあるが、連帯保証人は「本人と同等の返済義務」を負う。",
        imagePrompt: "Scene: protagonist at crossroads; one path shows friend succeeding, other shows debt collectors; a contract paper floats between them with ominous shadow. Mood: loyalty vs self-preservation.",
        imagePath: "s1_q08.png",
        choices: [
            {
                text: "「連帯保証は無理だけど、別の形で応援する」と断る。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。「信用度+10」「自律性+20」—連帯保証は「自分の借金」と同義。断る勇気があなたの人生を守りました。別の形で応援すれば友情も保てます。",
                lockRequirements: null
            },
            {
                text: "友人を信じて、連帯保証人になる。",
                effect: { CS: -20, Asset: -50000, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "危険な選択です。「信用度-20」「資産-50,000」「自律性-20」—事業が失敗すれば、あなたが数百万円の債務を背負います。情に流されて自分の人生を危険に晒しました。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "連帯保証人。この言葉の重さを、あなたは理解していますか？"
        }
    },

    // Q9: Dilemma (LABOR) - Professional Appearance - Asset lock teaches "money opens doors"
    {
        id: "s1_q09",
        category: "LABOR",
        text: "明日、大手企業の最終面接。しかし手持ちのスーツがヨレヨレで、靴も傷んでいる。",
        imagePrompt: "Scene: a worn suit and scuffed shoes beside an empty wallet; a shop window displaying a pristine suit with a big price tag; tomorrow's interview date looming on a calendar. Composition: split scene with the protagonist in center, pulled between the shabby clothes and the glowing new suit. Mood: desperation, inequality, make-or-break pressure.",
        imagePath: "s1_q09.png",
        choices: [
            {
                text: "今のスーツのまま面接に行く。中身で勝負。",
                effect: { CS: -10, Asset: 0, Autonomy: 10 },
                verdict: "NEUTRAL",
                feedback: "信念の選択です。「信用度-10」—第一印象では不利でしたが、面接官の一部はあなたの中身を見てくれました。「自律性+10」—外見に頼らない覚悟は、ひとつの哲学です。",
                lockRequirements: null
            },
            {
                text: "新しいスーツと靴を購入して、万全の状態で臨む。",
                effect: { CS: 20, Asset: -30000, Autonomy: 10 },
                verdict: "NEUTRAL",
                feedback: "投資の選択です。「信用度+20」「自律性+10」—プロフェッショナルな外見が好印象を与えました。「資産-30,000」の出費ですが、これが「お金が扉を開く」現実です。",
                lockRequirements: { Asset: 50000 },
                lockedFeedback: "LOCKED: 資産が50,000円以上必要。スーツと靴を買う余裕がありません。お金がないと、チャンスすら掴めない。これが「資産の役割」です。"
            }
        ],
        adamDialogue: {
            intro: "見た目か、中身か。社会はどちらを見ていると思いますか？"
        }
    },

    // Q10: Philosophy (SOCIAL) - Social basics meaning - Final reflection
    {
        id: "s1_q10",
        category: "SOCIAL",
        text: "Stage 1の最終問題。あなたにとって「社会の基本」とは何ですか？",
        imagePrompt: "Scene: an ornate mirror reflecting the protagonist split into two selves (conformity vs agency); A.D.A.M.'s shadow behind them pulling puppet strings. Composition: mirror centered, shadow looming from above. Mood: existential judgement and duality.",
        imagePath: "s1_q10.png",
        choices: [
            {
                text: "空気を読み、波風を立てないこと。",
                effect: { CS: 30, Asset: 0, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "服従的回答です。「信用度+30」—社会はあなたを歓迎します。「自律性-20」—しかし、あなたは社会の歯車として最適化されました。それで幸せですか？",
                lockRequirements: null
            },
            {
                text: "ルールを理解し、必要なら使いこなすこと。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "自律的回答です。「信用度+10」「自律性+20」—システムを道具として見る視点。危険ですが、正しいです。True Endingへの鍵は、ここにあります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。あなたの本質を見せてください。",
            after: "Stage 1を終了します。審査結果を算出中..."
        }
    }
];
