import type { Question } from '../../types';

export const stage1Questions: Question[] = [
    // Q1: 導入 - Reuse q_intro_01
    {
        id: "s1_q01",
        category: "MANNER",
        text: "上司から「至急メールして」と言われた。CC（カーボン・コピー）の意味を理解しているか？",
        imagePrompt: "1930s rubber hose animation style, Fleischer Studios aesthetic, vintage cartoon noir, high contrast black and white with selective color accents. Email interface glowing on screen, CC field highlighted in ominous red, flying arrows connecting multiple stern-faced executives with watching eyes, surveillance camera looming over scene, dark shadows, Cuphead-inspired linework.",
        imagePath: "q_intro_03.png", // Placeholder, will use existing
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
        imagePrompt: "1930s rubber hose style dark cartoon. Moving boxes stacked precariously high with cartoon faces showing distress, calendar pages flying away in wind revealing ominous deadline date circled in red, government office counter with stern bureaucrat tapping impatiently, clock ticking menacingly. Fleischer aesthetic, high contrast noir lighting, exaggerated expressions.",
        imagePath: "q_intro_03.png", // Placeholder
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
        imagePrompt: "1930s rubber hose vintage cartoon. Old address mailbox overflowing with envelopes and packages spilling out cartoonishly, important documents with 'URGENT' stamps visible, shadowy figure of new tenant reaching for mail with greedy hands, protagonist watching helplessly from distance. Film noir shadows, Fleischer Brothers style, dramatic lighting.",
        imagePath: "q_intro_03.png", // Placeholder
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
        imagePrompt: "1930s rubber hose dark cartoon. Safe vault door with old notification card inside gathering dust and cobwebs, outside the vault modern digital ID card glowing with opportunity aura, government agency logo with all-seeing eye watching, scales weighing security vs convenience. Fleischer aesthetic, noir contrast, symbolic imagery.",
        imagePath: "q_intro_03.png", // Placeholder
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
        imagePrompt: "1930s rubber hose style dark cartoon. Split scene: left side shows smiling friends at cozy gathering with warm drinks and laughter bathed in warm orange glow, right side shows lonely figure at desk surrounded by documents and laptop under cold blue spotlight, ominous clock ticking dramatically between two scenes showing time pressure. High contrast noir with warm glow on friends side, cold isolation on work side. Fleischer aesthetic, exaggerated expressions showing both paths as equally valid but conflicting, ink splatter effects.",
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
        imagePrompt: "Dark vintage cartoon 1930s style. Empty official form on desk with glowing red 'emergency contact' field pulsing ominously with animated heartbeat effect, smartphone lying beside showing contact list fading to shadows and question marks, solitary figure hunched over desk with face in hands showing isolation and despair, heavy ink shadows surrounding entire scene creating claustrophobic feeling, dramatic spotlight from above creating strong noir contrast on form. Fleischer Brothers aesthetic, melancholic mood, film noir lighting, rubber hose character design showing emotional weight.",
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
        imagePrompt: "Rubber hose cartoon 1930s Fleischer style. Thin apartment wall vibrating with wavy distortion lines and animated musical notes bouncing chaotically across frame, wall clock showing 2 AM with menacing grin and shifty animated eyes moving side to side, neighbor's exaggerated silhouette visible through semi-transparent wall partying with drink raised high celebrating, protagonist in foreground covering ears with hands in cartoonish distress with sweat drops and anger symbols flying. High contrast noir lighting creating dramatic shadows, exaggerated rubberhose expressions showing extreme frustration, ink splatter effects around noise sources, Cuphead-esque bold linework, sound wave visualizations rippling through scene.",
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
                feedback: "社会較正です。システムを間に挟むことで、直接対決を避ける技術です。",
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

    // Q8: 因果② (Skill Effects Apply) - NEW: Job Interview
    {
        id: "s1_q08",
        category: "LABOR",
        text: "面接で「当社の欠点を教えてください」と聞かれた。正直に答えるべきか？",
        imagePrompt: "Dark vintage animation 1930s rubber hose. Interview room with oversized intimidating desk dominating frame and looming over small applicant, interviewer with exaggerated carnival barker smile and calculating eyes (Betty Boop villain aesthetic) tapping fingers together menacingly, nervous applicant on comically tiny chair with visible cartoon sweat drops falling like rain, contract papers floating ominously in background with visible small print and legal text, spotlight effect. Exaggerated forced perspective making desk loom menacingly over scene, high contrast noir with golden opportunity aura radiating around interviewer creating ironic halo, Fleischer Studios meets corporate dystopia atmosphere, bold ink outlines, power dynamic visualization.",
        imagePath: "s1_q08.png",
        choices: [
            {
                text: "「御社に欠点はありません！」と答える。",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                feedback: "見え透いた嘘です。面接官は「思考力のない人材」と判断しました。",
                lockRequirements: null
            },
            {
                text: "「ウェブサイトの情報が古いと感じました」と建設的な指摘をする。",
                effect: { CS: 40, Asset: 50000, Autonomy: 10 },
                feedback: "社会較正です。批判を建設的に伝える技術。内定通知が届きました。",
                lockRequirements: { Autonomy: 30 },
                lockedFeedback: "LOCKED: Autonomy >= 30 必要 - 建設的批判をする自信がありません。"
            }
        ]
    },

    // Q9: 鏡合わせ - Reuse q_intro_08
    {
        id: "s1_q09",
        category: "MANNER",
        text: "ビジネスメールの宛名。「〇〇株式会社 〇〇部長様」と書いた。",
        imagePrompt: "1930s rubber hose vintage cartoon. Email send screen glowing ominously, angry boss character with steam coming from ears and exaggerated frown reading message, etiquette instructor character pointing accusatory finger with wagging motion at mistake, red correction marks circling the error, embarrassment radiating as wavy lines. High contrast noir, Fleischer style exaggerated reactions, comic tension.",
        imagePath: "q_intro_03.png", // Placeholder
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
        imagePrompt: "Dark rubber hose climax 1930s. Large ornate mirror with decorative baroque frame reflecting protagonist's face split vertically down center (left half conforming with forced corporate smile and dead eyes, right half autonomous with fire in eyes and determined expression showing true self), behind protagonist A.D.A.M.'s shadow growing large and ominous as puppet master with visible glowing control strings descending toward player from above. Dramatic spotlight from above creating strong noir shadows and highlighting the choice, ink splatter decorative frame elements, Fleischer Brothers meets existential philosophical choice, high contrast symbolism showing duality, theatrical staging, climactic moment visualization.",
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
