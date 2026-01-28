import type { Question } from '../../types';

export const stage1Questions: Question[] = [
    // Q1: Knowledge (FINANCE) - Credit card basics - Immediate Asset teaching
    {
        id: "s1_q01",
        category: "FINANCE",
        text: "新社会人になり、クレジットカードを初めて作った。「リボ払い」を勧められたが、どうする？",
        imagePrompt: "Scene: Credit card application form on counter, revolving payment checkbox prominently displayed, salesperson's finger pointing at it, fine print showing high interest rate partially visible. Composition: Form fills frame, finger draws attention to checkbox. Mood: Pressure, hidden trap in plain sight.",
        imagePath: "s1_q01.png",
        choices: [
            {
                text: "毎月の支払いが一定で楽そうなので、リボ払いを設定する。",
                effect: { CS: 0, Asset: -50000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "罠です。年利15%前後で「返済が終わらない設計」になりがち。便利さの裏に利息地獄があります。お金の知識不足が資産を削ります。",
                lockRequirements: null
            },
            {
                text: "年利を確認し、一括払いを基本にする。",
                effect: { CS: 10, Asset: 0, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。クレカの明細チェックと一括払いが「お金の自衛」の基本。知識が資産を守ります。",
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
                feedback: "適正です。法定期限を守ることで社会から信頼されます。自分で期限を管理する行動力も評価されます。これを過ぎると最大5万円の過料があり、「信頼できない市民」として記録されます。",
                lockRequirements: null
            },
            {
                text: "次の更新の時でいい。",
                effect: { CS: -30, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "違法です。選挙権も行使できず、行政サービスも受けられない「幽霊市民」になります。社会はルールを無視する人を排除します。",
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
                feedback: "ミスです。クレジットカードの更新カードや重要書類が旧住所に届き、見知らぬ誰かの手に渡ります。個人情報管理ができない人と見なされます。",
                lockRequirements: null
            },
            {
                text: "ネットやハガキで転送を申し込む。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "安全策です。1年間無料で転送してくれるシステムを使わない手はありません。自ら行動してリスクを回避しました。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (SOCIAL) - Funeral etiquette (香典/袱紗)
    {
        id: "s1_q04",
        category: "SOCIAL",
        text: "同僚の親の葬儀に参列することになった。香典（こうでん）を用意するが、正しいマナーは？",
        imagePrompt: "Scene: Funeral envelope on table being prepared, crisp new bills beside it, fukusa cloth waiting nearby, brush pen for writing. Composition: Close-up on ceremonial items, hands preparing the offering. Mood: Solemnity, ritual precision required.",
        imagePath: "s1_q04.png",
        choices: [
            {
                text: "「御霊前」と書いた新札を、袱紗（ふくさ）なしでそのまま渡す。",
                effect: { CS: -25, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "マナー違反です。新札は「不幸を準備していた」印象を与え、袱紗なしは礼を欠きます。同僚との関係に傷がつきました。",
                lockRequirements: null
            },
            {
                text: "旧札（または新札を折ってから）を袱紗（ふくさ）に包み、宗派を確認してから表書きを選ぶ。",
                effect: { CS: 20, Asset: -10000, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。仏式なら四十九日前は「御霊前」、後は「御仏前」。神式は「御玉串料」。宗派不明なら「御霊前」が無難。大人の常識が信頼を築きます。",
                lockRequirements: null
            }
        ]
    },

    // Q5: 山場 (True Dilemma) - NEW: Friends vs Career
    {
        id: "s1_q05",
        category: "SOCIAL",
        text: "大学時代の親友から久々の連絡。「みんなで集まる！来週の金曜日、絶対来てね」。しかし翌日は重要なプレゼン。準備は終わっていない。",
        imagePrompt: "Scene: Office desk late at night, unfinished presentation on laptop, phone showing group chat message with friends' smiling photo, wall clock showing 11 PM. Composition: Desk fills frame, phone and laptop compete for attention. Mood: Torn, warm memory vs cold deadline.",
        imagePath: "s1_q05.png",
        choices: [
            {
                text: "人間関係が大事。参加して、徹夜で準備する。",
                effect: { CS: 0, Asset: -5000, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "優先順位の選択です。自分の価値観で決めました。人脈は資産ですが、仕事より人を選ぶ勇気には代償（徹夜・交通費）が伴います。",
                lockRequirements: null
            },
            {
                text: "仕事が大事。断って、準備に集中する。",
                effect: { CS: 30, Asset: 0, Autonomy: -15 },
                verdict: "NEUTRAL",
                feedback: "現実的判断です。会社からの評価は上がりました。しかし、あなたは「仕事優先」を選ばされた感覚があるはずです。これが社会の圧力です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ここからが本番です。あなたの価値観を試します。"
        }
    },

    // Q6: Knowledge (MANNER) - Business card exchange and seating etiquette
    {
        id: "s1_q06",
        category: "MANNER",
        text: "取引先との初めての打ち合わせ。会議室に通されたが、席順と名刺交換のマナーがわからない。",
        imagePrompt: "Scene: a meeting room with a table; seats arranged with door visible; business cards being exchanged between two people. Composition: seating diagram overlay with proper positions marked. Mood: professional tension, first impression stakes.",
        imagePath: "s1_q06.png",
        choices: [
            {
                text: "入口近くの席に座り、名刺は片手で素早く交換する。",
                effect: { CS: -25, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "マナー違反です。入口近くは「下座」で自分の席ですが、先に座るのは失礼。名刺は両手で受け取り、すぐにしまわないのが礼儀。第一印象で「この人はダメだ」と判断されました。",
                lockRequirements: null
            },
            {
                text: "相手を上座（入口から遠い席）に案内し、名刺は両手で受け取ってテーブルに置く。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。名刺は相手より低い位置で差し出し、受け取ったら「頂戴します」。会議中はテーブルに並べ、終わったら丁寧にしまう。基本を押さえた人は信頼されます。",
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
                feedback: "思考停止です。ストレスで自律性が削られ、やがて精神が崩壊します。我慢は美徳ではなく、自己破壊です。",
                lockRequirements: null
            },
            {
                text: "管理会社に連絡し、「匿名で」注意してもらう。",
                effect: { CS: 30, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "仲介術です。システムを間に挟むことで、直接対決を避ける技術です。これが「大人の解決法」です。",
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

    // Q8: Knowledge (ADMIN) - Vehicle inspection (車検) and compulsory insurance (自賠責)
    {
        id: "s1_q08",
        category: "ADMIN",
        text: "中古車を購入して3年。「車検」の案内が届いたが、費用が高い。少し延ばしても大丈夫？",
        imagePrompt: "Scene: Car dashboard view, inspection sticker on windshield with expiration date circled, calendar notification on phone showing deadline passed, rearview mirror reflecting police lights in distance. Composition: Dashboard POV, sticker and mirror create tension. Mood: Deadline ignored, consequence approaching.",
        imagePath: "s1_q08.png",
        choices: [
            {
                text: "お金がないので、車検が切れてもしばらく乗り続ける。",
                effect: { CS: -30, Asset: -150000, Autonomy: -15 },
                verdict: "WARNING",
                feedback: "犯罪です。車検切れの運転は道路運送車両法違反（6点減点、30万円以下の罰金）。自賠責も切れていれば1年以下の懲役または50万円以下の罰金。「節約」のつもりが人生を壊します。",
                lockRequirements: null
            },
            {
                text: "期限前に車検を受ける。費用が厳しければ、車を手放すことも検討する。",
                effect: { CS: 20, Asset: -100000, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。車検は新車登録から3年、以降2年ごと。自賠責保険は車検と同時更新が基本。維持できないなら手放す判断も大人の選択です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "車は便利ですが、維持には責任が伴います。"
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
                feedback: "信念の選択です。第一印象では不利でしたが、面接官の一部はあなたの中身を見てくれました。外見に頼らない覚悟は、ひとつの哲学です。",
                lockRequirements: null
            },
            {
                text: "新しいスーツと靴を購入して、万全の状態で臨む。",
                effect: { CS: 20, Asset: -30000, Autonomy: 10 },
                verdict: "NEUTRAL",
                feedback: "投資の選択です。プロフェッショナルな外見が好印象を与えました。出費はありますが、これが「お金が扉を開く」現実です。",
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
        imagePrompt: "Scene: Retro terminal screen filling the frame, cryptic evaluation metrics scrolling, input field with blinking cursor awaiting response, green phosphor glow on black. Composition: Full-screen CRT aesthetic, scan lines visible. Mood: Final judgment, system awaiting human input.",
        imagePath: "s1_q10.png",
        choices: [
            {
                text: "空気を読み、波風を立てないこと。",
                effect: { CS: 30, Asset: 0, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "服従的回答です。社会はあなたを歓迎します。",
                lockRequirements: null
            },
            {
                text: "ルールを理解し、必要なら使いこなすこと。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "自律的回答です。システムを道具として見る視点。興味深いです。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。あなたの本質を見せてください。",
            after: "Stage 1を終了します。審査結果を算出中・・・"
        }
    }
];
