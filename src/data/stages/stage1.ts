import type { Question } from '../../types';

export const stage1Questions: Question[] = [
    // Q1: 導入 - Reuse q_intro_01
    {
        id: "s1_q01",
        category: "MANNER",
        text: "上司から「至急メールして」と言われた。CC（カーボン・コピー）の意味を理解しているか？",
        imagePrompt: "Scene: an office PC with glowing screen and highlighted field (no readable text needed); coworkers peering nervously from cubicle walls; a CCTV camera with blinking red light overhead. Composition: monitor in foreground, watchers lurking in midground. Mood: surveillance and pressure.",
        imagePath: "s1_q01.png",
        choices: [
            {
                text: "メインの宛先ではないが、情報を共有したい人を入れる。",
                effect: { CS: 10, Asset: 0, Autonomy: -5 },
                feedback: "正解です。組織では「知らなかった」を防ぐための証拠作りとして機能します。",
                lockRequirements: null
            },
            {
                text: "秘密にしておきたい人を入れる（Co-Conspirator）。",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                feedback: "それはBCCです。誤送信で情報漏洩を起こし、あなたのクビが飛びます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ここからが本番です。あなたの基礎知識を試します。"
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
                effect: { CS: 20, Asset: 0, Autonomy: -10 },
                feedback: "適正です。これを過ぎると最大5万円の過料が発生する場合があります。",
                lockRequirements: null
            },
            {
                text: "次の更新の時でいい。",
                effect: { CS: -30, Asset: 0, Autonomy: 0 },
                feedback: "違法です。選挙権も行使できず、行政サービスも受けられない「幽霊市民」になります。",
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
                feedback: "ミスです。クレジットカードの更新カードや重要書類が旧住所に届き、見知らぬ誰かの手に渡ります。",
                lockRequirements: null
            },
            {
                text: "ネットやハガキで転送を申し込む。",
                effect: { CS: 10, Asset: 0, Autonomy: -5 },
                feedback: "安全策です。1年間無料で転送してくれるシステムを使わない手はありません。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: 収束 - Reuse q_intro_07 (Same Q, varied reactions)
    {
        id: "s1_q04",
        category: "ADMIN",
        text: "マイナンバーカード。「持ち歩くと危険だから」と通知カードのままにしている。",
        imagePrompt: "Scene: protagonist standing hesitantly between a dusty cobwebbed safe (old card visible inside) and a glowing modern ID card floating with golden aura; a large bureaucratic eye watches from above. Composition: protagonist in center looking torn, safe on left in shadow, glowing card on right. Mood: paranoia vs opportunity, being watched.",
        imagePath: "s1_q04.png",
        choices: [
            {
                text: "作らない方が安全だ。",
                effect: { CS: -10, Asset: 0, Autonomy: 0 },
                feedback: "保守的ですが、身分証としての機能やコンビニ交付の利便性を捨てています。",
                lockRequirements: null
            },
            {
                text: "交付申請して取得する。",
                effect: { CS: 20, Asset: 20000, Autonomy: -5 },
                feedback: "適応です。ポイントも貰え、行政手続きがスムーズになります。管理さえできれば。",
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
                feedback: "優先順位の選択です。人脈は資産です。ただし、体力的代償を払います。",
                lockRequirements: null
            },
            {
                text: "仕事が大事。断って、準備に集中する。",
                effect: { CS: 30, Asset: 0, Autonomy: -15 },
                feedback: "現実的判断です。プレゼンは成功しました。しかし、友人との距離は広がりました。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ここからが本番です。あなたの価値観を試します。"
        }
    },

    // Q6: 因果① (Lock Demonstration) - NEW: Emergency Contact
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
                feedback: "虚偽申告です。職場で倒れた時、誰にも連絡がいかず、そのまま孤独死ルートです。",
                lockRequirements: null
            },
            {
                text: "事情を説明し、信頼できる友人に頼む。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                feedback: "解決策です。人間関係を構築する能力は、あなたの生存戦略です。",
                lockRequirements: { Autonomy: 30 },
                lockedFeedback: "LOCKED: Autonomy >= 30 必要 - 自律性が低く、他者に頼む決断ができません。"
            }
        ]
    },

    // Q7: 鍵スキル (Key Skill Pathway) - NEW: Noise Complaint
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
                feedback: "思考停止です。ストレスで自律性が削られ、やがて精神が崩壊します。",
                lockRequirements: null
            },
            {
                text: "管理会社に連絡し、「匿名で」注意してもらう。",
                effect: { CS: 30, Asset: 0, Autonomy: 15 },
                feedback: "仲介術です。システムを間に挟むことで、直接対決を避ける技術です。",
                lockRequirements: { Autonomy: 20 },
                lockedFeedback: "LOCKED: Autonomy >= 20 必要 - システムを使う発想が浮かびません。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: 因果② (Asset Lock Demo) - NEW: Professional Appearance
    {
        id: "s1_q08",
        category: "LABOR",
        text: "明日、大手企業の最終面接。しかし手持ちのスーツがヨレヨレで、靴も傷んでいる。",
        imagePrompt: "Scene: a worn suit and scuffed shoes beside an empty wallet; a shop window displaying a pristine suit with a big price tag; tomorrow's interview date looming on a calendar. Composition: split scene with the protagonist in center, pulled between the shabby clothes and the glowing new suit. Mood: desperation, inequality, make-or-break pressure.",
        imagePath: "s1_q08.png",
        choices: [
            {
                text: "今のスーツのまま面接に行く。中身で勝負。",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                feedback: "理想論です。面接官は第一印象で「自己管理できない人材」と判断しました。",
                lockRequirements: null
            },
            {
                text: "新しいスーツと靴を購入して、万全の状態で臨む。",
                effect: { CS: 40, Asset: -30000, Autonomy: 10 },
                feedback: "正しい投資です。プロフェッショナルな外見が評価され、内定を獲得しました。",
                lockRequirements: { Asset: 100000 },
                lockedFeedback: "LOCKED: Asset >= 100,000円 必要 - スーツと靴を買う余裕がありません。"
            }
        ]
    },

    // Q9: 鏡合わせ - Reuse q_intro_08
    {
        id: "s1_q09",
        category: "MANNER",
        text: "ビジネスメールの宛名。「〇〇株式会社 〇〇部長様」と書いた。",
        imagePrompt: "Scene: a business email draft on screen with the salutation area marked as wrong; a stern superior reacting; an etiquette guide figure pointing at the mistake. Composition: screen in foreground, reactions around it. Mood: embarrassment and social pressure.",
        imagePath: "s1_q09.png",
        choices: [
            {
                text: "丁寧に書けたので送信する。",
                effect: { CS: -10, Asset: 0, Autonomy: 0 },
                feedback: "重複敬語です。「部長」は役職名なので敬称を含みます。「〇〇部長」か「〇〇様」です。",
                lockRequirements: null
            },
            {
                text: "「〇〇株式会社 〇〇様」または「〇〇部長」に直す。",
                effect: { CS: 10, Asset: 0, Autonomy: 0 },
                feedback: "正解です。細かいことですが、教養は細部に宿ります。",
                lockRequirements: null
            }
        ]
    },

    // Q10: Final (Rank + Foreshadowing) - NEW: Social Philosophy
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
                feedback: "服従的回答です。あなたは社会の歯車として最適化されています。",
                lockRequirements: null
            },
            {
                text: "ルールを理解し、必要なら使いこなすこと。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                feedback: "自律的回答です。システムを道具として見る視点。危険ですが、正しいです。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。あなたの本質を見せてください。",
            after: "Stage 1を終了します。審査結果を算出中..."
        }
    }
];
