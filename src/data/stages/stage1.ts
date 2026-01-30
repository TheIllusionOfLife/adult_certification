import type { Question } from '../../types';

export const stage1Questions: Question[] = [
    // Q1: Knowledge (FINANCE) - Credit card basics - Immediate Asset teaching
    {
        id: "s1_q01",
        category: "FINANCE",
        text: "新社会人になり、クレジットカードを初めて作った。リボ払いを勧められたが、どうする？",
        imagePrompt: "Scene: Credit card application form on counter, revolving payment checkbox prominently displayed, salesperson's finger pointing at it, fine print showing high interest rate partially visible. Composition: Form fills frame, finger draws attention to checkbox. Mood: Pressure, hidden trap in plain sight.",
        imagePath: "s1_q01.png",
        choices: [
            {
                text: "毎月の支払いが一定で楽そうなので、リボ払いを設定する。",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "年利15%前後で「返済が終わらない設計」になりがち。便利さの裏に利息地獄があります。お金の知識不足が資産を削ります。",
                lockRequirements: null
            },
            {
                text: "年利を確認し、一括払いを基本にする。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "クレカの明細チェックと一括払いが「お金の自衛」の基本。知識が資産を守ります。",
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
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "違法です。選挙権も行使できず、行政サービスも受けられない「幽霊市民」になります。社会はルールを無視する人を排除します。",
                lockRequirements: null
            }
        ]
    },

    // Q3: 小分岐 - Reuse q_intro_14 (Modified for choice demonstration) [SWAPPED A↔B]
    {
        id: "s1_q03",
        category: "ADMIN",
        text: "郵便局への転居届。「大事な郵便は住所変更したから大丈夫」と出していない。",
        imagePrompt: "Scene: an old mailbox overflowing with letters and packages; a shadowy stranger reaching toward the mail; the protagonist watching from a distance. Composition: mailbox close-up with reaching hands, protagonist small in the background. Mood: vulnerability and regret.",
        imagePath: "s1_q03.png",
        choices: [
            {
                text: "ネットやハガキで転送を申し込む。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "安全策です。1年間無料で転送してくれるシステムを使わない手はありません。自ら行動してリスクを回避しました。なお、マイナポータルを使えば転出届のオンライン提出も可能。届出を怠ると最大5万円の過料が科されます。",
                lockRequirements: null
            },
            {
                text: "面倒だから出さない。",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "ミスです。クレジットカードの更新カードや重要書類が旧住所に届き、見知らぬ誰かの手に渡ります。個人情報管理ができない人と見なされます。マイナポータルでの転出届オンライン提出も活用を。届出を怠ると最大5万円の過料が科されます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (SOCIAL) - Funeral etiquette (broader scope)
    {
        id: "s1_q04",
        category: "SOCIAL",
        text: "同僚の親の葬儀に参列することになった。注意することは?",
        imagePrompt: "Scene: Funeral envelope on table being prepared, crisp new bills beside it, fukusa cloth waiting nearby, brush pen for writing. Composition: Close-up on ceremonial items, hands preparing the offering. Mood: Solemnity, ritual precision required.",
        imagePath: "s1_q04.png",
        choices: [
            {
                text: "スーツなどフォーマルな格好で行く。お金は現地までの往復交通費に注意する。",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "服装は正しいが不十分。香典(20代の同僚の親なら3,000〜5,000円)を旧札で用意、袱紗に包んで持参、宗派不明なら「御霊前」が無難。受付での作法、焼香の回数(浄土真宗1回、真言宗3回)、忌み言葉(重ね重ね、たびたび)なども把握すべき。",
                lockRequirements: null
            },
            {
                text: "服装(黒のフォーマル、派手なアクセサリーNG)、香典(旧札、袱紗で包む、表書きは宗派を確認)、焼香の作法など、事前にマナーを調べて準備する。",
                effect: { CS: 20, Asset: -10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。香典は20代の同僚の親なら3,000〜5,000円。新札は折ってから入れる。表書きは四十九日前は「御霊前」(浄土真宗は「御仏前」)。数珠は貸し借りNG。わからなければ前の人に合わせる。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (SOCIAL) - Wedding etiquette
    {
        id: "s1_q05",
        category: "SOCIAL",
        text: "同僚の結婚式に招待された。初めてなので不安。服装やご祝儀のマナーは?",
        imagePrompt: "Scene: Wedding invitation card on table beside wallet and formal outfit options, gift money envelope with mizuhiki visible, mirror reflecting outfit choices. Composition: Invitation centered, preparation items surrounding. Mood: First-time ceremony anxiety, etiquette unknown.",
        imagePath: "s1_q05.png",
        choices: [
            {
                text: "お祝いの気持ちが大事。服装は手持ちの白いワンピースで、ご祝儀は財布から直接2万円を渡す。",
                effect: { CS: -30, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "複数のマナー違反。白は花嫁の色でNG。ご祝儀は奇数が基本(友人なら3万円)、新札を用意し袱紗から出して渡す。水引は結び切り(一度きりの意味)。バッグから直接出すのもNG。",
                lockRequirements: null
            },
            {
                text: "ご祝儀は新札で3万円(奇数)、袱紗に包む。服装は白以外のフォーマル、ファー・動物柄もNG。水引は結び切り。",
                effect: { CS: 20, Asset: -10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。ご祝儀は友人・同僚で3万円、兄弟姉妹で5〜10万円が相場。2万円(ペア)と8万円(末広がり)は例外的にOK。4と9は避ける。受付では袱紗の上に乗せて両手で差し出す。",
                lockRequirements: null
            }
        ]
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
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "マナー違反です。入口近くの下座が自分の席ですが、先に座るのは失礼。名刺は両手で受け取り、すぐにしまわないのが礼儀。第一印象で「この人はダメだ」と判断されました。",
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
                text: "管理会社に連絡し、注意してもらう。",
                effect: { CS: 30, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "仲介術です。システムを間に挟むことで、直接対決を避ける技術です。これが大人の解決法です。",
                lockRequirements: { Autonomy: 130 },
                lockedFeedback: "LOCKED: 自律性が130以上必要。受動的に耐えてきた結果、第三者に助けを求めるという発想すら浮かびません。自律性は「選択肢の数」です。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (ADMIN) - Vehicle inspection (車検) and compulsory insurance (自賠責) [SWAPPED A↔B]
    {
        id: "s1_q08",
        category: "ADMIN",
        text: "中古車を購入して3年。車検の案内が届いたが、費用が高い。少し延ばしても大丈夫？",
        imagePrompt: "Scene: Car dashboard view, inspection sticker on windshield with expiration date circled, calendar notification on phone showing deadline passed, rearview mirror reflecting police lights in distance. Composition: Dashboard POV, sticker and mirror create tension. Mood: Deadline ignored, consequence approaching.",
        imagePath: "s1_q08.png",
        choices: [
            {
                text: "期限前に車検を受ける。費用が厳しければ、車を手放すことも検討する。",
                effect: { CS: 20, Asset: -30, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。車検は新車登録から3年、以降2年ごと。自賠責保険は車検と同時更新が基本。維持できないなら手放す判断も大人の選択です。",
                lockRequirements: null
            },
            {
                text: "お金がないので、車検が切れてもしばらく乗り続ける。",
                effect: { CS: -30, Asset: -40, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "犯罪です。車検切れの運転は道路運送車両法違反（6点減点、30万円以下の罰金）。自賠責も切れていれば1年以下の懲役または50万円以下の罰金。「節約」のつもりが人生を壊します。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "車は便利ですが、維持には責任が伴います。"
        }
    },

    // Q9: Knowledge (SOCIAL) - Proper keigo usage
    {
        id: "s1_q09",
        category: "SOCIAL",
        text: "入社して間もない。上司にメールを送る際、正しい敬語は?",
        imagePrompt: "Scene: Office computer screen showing email draft to supervisor, cursor blinking at greeting line, Japanese business etiquette book open beside keyboard. Composition: Screen fills frame, draft email with formal tone. Mood: Professional communication, first impression at work.",
        imagePath: "s1_q09.png",
        choices: [
            {
                text: "「了解しました」「ご苦労様です」など、日常的に使われている表現を使う。",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "「ご苦労様」は目上→目下のねぎらい表現で上司にはNG。「了解しました」もカジュアルすぎる。上司には「お疲れ様です」「承知いたしました」「かしこまりました」を使う。二重敬語(「おっしゃられる」等)にも注意。",
                lockRequirements: null
            },
            {
                text: "「お疲れ様です」「承知いたしました」など、相手の立場に応じた正しい敬語を調べて使う。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。尊敬語(相手の動作: おっしゃる、ご覧になる)と謙譲語(自分の動作: 申す、拝見する)の使い分けが基本。「お読みになられる」は二重敬語でNG。ただし「お召し上がりになる」は許容。",
                lockRequirements: null
            }
        ]
    },

    // Q10: Knowledge (ADMIN) - How to fly for the first time
    {
        id: "s1_q10",
        category: "ADMIN",
        text: "初めて飛行機に乗る。空港には何時間前に着けばいい? 荷物の注意点は?",
        imagePrompt: "Scene: Airport departure terminal, flight information board showing departure times, traveler checking luggage contents against restriction list on phone, security checkpoint visible ahead. Composition: Terminal wide view, traveler small but focused. Mood: First flight nerves, preparation matters.",
        imagePath: "s1_q10.png",
        choices: [
            {
                text: "出発30分前に着けば十分。モバイルバッテリーとペットボトルの飲み物はスーツケースに入れて預ける。",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "時間不足。国内線は1時間前、国際線は2〜3時間前が目安。保安検査は出発20分前まで。モバイルバッテリー(160Wh以下)は機内持込のみで預け荷物NG。国際線の液体は100ml以下の容器+1L以下の透明袋。ライターは機内持込1個のみ。",
                lockRequirements: null
            },
            {
                text: "国内線1時間前、国際線2〜3時間前に到着。バッテリーは機内持込、液体物は制限を確認。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。刃物は預け荷物のみ。ライターは機内持込1個のみ。モバイルバッテリーは預け入れ禁止(発火リスク)。国際線では液体物100ml以下の容器、ジッパー付き透明袋(1L以下)に入れる。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。あなたの本質を見せてください。",
            after: "ステージ1を終了します。審査結果を算出中・・・"
        }
    }
];
