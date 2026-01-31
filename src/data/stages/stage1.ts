import type { Question } from '../../types';

export const stage1Questions: Question[] = [
    // Q1: Knowledge (FINANCE) - Credit card basics - Immediate Asset teaching
    {
        id: "s1_q01",
        category: "FINANCE",
        text: "新社会人になり、クレジットカードを初めて作った。リボ払いを勧められたが、どうする？",
        textEN: "You just started your first job and got your first credit card. The salesperson recommends revolving payments (リボ払い). What do you do?",
        imagePrompt: "Scene: Credit card application form on counter, revolving payment checkbox prominently displayed, salesperson's finger pointing at it, fine print showing high interest rate partially visible. Composition: Form fills frame, finger draws attention to checkbox. Mood: Pressure, hidden trap in plain sight.",
        imagePath: "s1_q01.png",
        choices: [
            {
                text: "毎月の支払いが一定で楽そうなので、リボ払いを設定する。",
                textEN: "Set up revolving payments since fixed monthly payments seem easier.",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "年利15%前後で「返済が終わらない設計」になりがち。便利さの裏に利息地獄があります。お金の知識不足が資産を削ります。",
                feedbackEN: "At roughly 15% annual interest, revolving payments are designed to never end. Behind the convenience lies an interest trap. Lack of financial literacy erodes your assets.",
                lockRequirements: null
            },
            {
                text: "年利を確認し、なんとなくでリボ払いや分割払いを利用しない。",
                textEN: "Check the annual interest rate. Don't casually use revolving or installment payments.",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "クレジッドカードの明細チェックがお金の自衛の基本。知識が資産を守ります。",
                feedbackEN: "Reviewing your credit card statements is the foundation of financial self-defense. Knowledge protects your assets.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ここからが本番です。あなたの「お金のリテラシー」を試します。",
            introEN: "This is where it gets real. I'm testing your financial literacy."
        }
    },

    // Q2: 基礎 - Reuse q_intro_02
    {
        id: "s1_q02",
        category: "ADMIN",
        text: "引越しをした。住民票の移動（転入届）はいつまでにすべき？",
        textEN: "You've moved to a new address. By when must you submit your Moving-in Notification (転入届) to transfer your residence record?",
        imagePrompt: "Scene: moving boxes piled high; a wall calendar with pages flying off toward a deadline; a government counter with a stern clerk tapping the desk; a large clock ticking. Composition: boxes and calendar in foreground, clerk behind the counter. Mood: bureaucratic deadline panic.",
        imagePath: "s1_q02.png",
        choices: [
            {
                text: "引越しから14日以内。",
                textEN: "Within 14 days of moving.",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "適正です。法定期限を守ることで社会から信頼されます。自分で期限を管理する行動力も評価されます。これを過ぎると最大5万円の過料があり、「信頼できない市民」として記録されます。",
                feedbackEN: "Correct. Meeting legal deadlines earns social trust and demonstrates self-management. Missing this deadline can result in a fine of up to 50,000 yen and marks you as an unreliable citizen.",
                lockRequirements: null
            },
            {
                text: "次の更新の時でいい。",
                textEN: "I'll do it at the next renewal.",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "違法です。選挙権も行使できず、行政サービスも受けられない「幽霊市民」になります。社会はルールを無視する人を排除します。",
                feedbackEN: "This is illegal. You become a 'ghost citizen' who can't vote or access public services. Society excludes those who ignore the rules.",
                lockRequirements: null
            }
        ]
    },

    // Q3: 小分岐 - Reuse q_intro_14 (Modified for choice demonstration) [SWAPPED A↔B]
    {
        id: "s1_q03",
        category: "ADMIN",
        text: "郵便局への転居届。「大事な郵便は住所変更したから大丈夫」と出していない。",
        textEN: "You haven't submitted a mail forwarding request (転居届) to the post office, thinking 'I've already updated my address for important mail, so it's fine.'",
        imagePrompt: "Scene: an old mailbox overflowing with letters and packages; a shadowy stranger reaching toward the mail; the protagonist watching from a distance. Composition: mailbox close-up with reaching hands, protagonist small in the background. Mood: vulnerability and regret.",
        imagePath: "s1_q03.png",
        choices: [
            {
                text: "ネットやハガキで転送を申し込む。",
                textEN: "Submit a forwarding request online or by postcard.",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "安全策です。1年間無料で転送してくれるシステムを使わない手はありません。自ら行動してリスクを回避しました。なお、マイナポータルを使えば転出届のオンライン提出も可能。届出を怠ると最大5万円の過料が科されます。",
                feedbackEN: "A safe choice. There's no reason not to use the free one-year forwarding service. You proactively mitigated risk. Note: You can also submit a Moving-out Notification online via My Number Portal. Failure to notify can result in a fine of up to 50,000 yen.",
                lockRequirements: null
            },
            {
                text: "面倒だから出さない。",
                textEN: "Too much hassle. Skip it.",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "ミスです。クレジットカードの更新カードや重要書類が旧住所に届き、見知らぬ誰かの手に渡ります。マイナポータルでの転出届オンライン提出も活用を。届出を怠ると最大5万円の過料が科されます。",
                feedbackEN: "A mistake. Your replacement credit card and important documents will arrive at your old address, potentially ending up in a stranger's hands. Use My Number Portal for online notifications. Failure to notify can result in a fine of up to 50,000 yen.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。",
            afterEN: "Processing complete. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (SOCIAL) - Funeral etiquette (broader scope)
    {
        id: "s1_q04",
        category: "SOCIAL",
        text: "同僚の親の葬儀に参列することになった。注意することは?",
        textEN: "You're attending a colleague's parent's funeral. What should you be careful about?",
        imagePrompt: "Scene: Funeral envelope on table being prepared, crisp new bills beside it, fukusa cloth waiting nearby, brush pen for writing. Composition: Close-up on ceremonial items, hands preparing the offering. Mood: Solemnity, ritual precision required.",
        imagePath: "s1_q04.png",
        choices: [
            {
                text: "通勤時のスーツなどで行く。お金は現地までの往復交通費さえあればとりあえず大丈夫。",
                textEN: "Go in your regular work suit. Just make sure you have round-trip transportation costs covered.",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "服装は光沢のない黒の喪服が原則。香典(こうでん)を旧札で用意。20代の同僚の親なら3,000〜5,000円、袱紗(ふくさ)に包んで持参、宗派不明なら「御霊前」が無難。受付での作法、焼香(しょうこう)の回数、忌み言葉(重ね重ね、たびたび)なども把握すべき。",
                feedbackEN: "Matte-black mourning attire is the rule. You must also prepare condolence money (香典) using old bills. For a colleague's parent in your 20s, 3,000-5,000 yen is appropriate, wrapped in a fukusa cloth. Use 'Goreizen (御霊前)' if the denomination is unknown. You should also know reception etiquette, incense-offering (焼香) procedures, and taboo words (repetitive phrases like 'kasanegasane').",
                lockRequirements: null
            },
            {
                text: "服装は黒のフォーマル、派手なアクセサリーNG、香典(こうでん)を旧札で用意し、袱紗(ふくさ)で包む、表書きは宗派を確認、焼香(しょうこう)の作法など、事前にマナーを調べて準備する。",
                textEN: "Wear black formal attire (no flashy accessories), prepare condolence money (香典) with old bills wrapped in a fukusa cloth, check the denomination for the inscription, and research etiquette like incense-offering (焼香) procedures beforehand.",
                effect: { CS: 20, Asset: -10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。香典は20代の同僚の親なら3,000〜5,000円。新札は折ってから入れます。表書きは四十九日前は「御霊前」(浄土真宗は「御仏前」)。数珠は貸し借りNG。わからなければ前の人に合わせます。",
                feedbackEN: "Correct. Condolence money for a colleague's parent in your 20s is 3,000-5,000 yen. New bills should be folded before inserting. The inscription before the 49th day is 'Goreizen (御霊前)' (or 'Gobutsuzen (御仏前)' for Jodo Shinshu). Never lend or borrow prayer beads. When in doubt, follow the person ahead of you.",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (SOCIAL) - Proper keigo usage
    {
        id: "s1_q05",
        category: "SOCIAL",
        text: "入社して間もない。上司にメールを送る際、正しい敬語は?",
        textEN: "You just joined the company. What is the proper honorific language (敬語) to use when emailing your supervisor?",
        imagePrompt: "Scene: Office computer screen showing email draft to supervisor, cursor blinking at greeting line, Japanese business etiquette book open beside keyboard. Composition: Screen fills frame, draft email with formal tone. Mood: Professional communication, first impression at work.",
        imagePath: "s1_q05.png",
        choices: [
            {
                text: "「了解しました」「ご苦労様です」など、日常的に使われている表現を使う。",
                textEN: "Use common expressions like 'Ryokai shimashita' and 'Go-kurou-sama desu.'",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "「ご苦労様」は目上から目下へのねぎらい表現で、上司にはNG。「了解しました」もカジュアルすぎます。「お疲れ様です」「承知いたしました」「かしこまりました」などを使います。おっしゃられる等の二重敬語にも注意。",
                feedbackEN: "'Go-kurou-sama' is a phrase used by superiors to subordinates. Never use it with your boss. 'Ryokai shimashita' is too casual. Use 'Otsukaresama desu,' 'Shouchi itashimashita,' or 'Kashikomarimashita' with superiors. Also watch out for double honorifics (e.g., 'ossharareru').",
                lockRequirements: null
            },
            {
                text: "「お疲れ様です」「承知いたしました」など、相手の立場に応じた正しい敬語を調べて使う。",
                textEN: "Research and use proper honorifics suited to the recipient's position, such as 'Otsukaresama desu' and 'Shouchi itashimashita.'",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。尊敬語(相手の動作: おっしゃる、ご覧になる)と謙譲語(自分の動作: 申す、拝見する)の使い分けが基本。「お読みになられる」は二重敬語でNG。",
                feedbackEN: "Correct. The key is distinguishing respectful language (sonkeigo, for others' actions: 'ossharu,' 'goran ni naru') from humble language (kenjougo, for your own actions: 'mousu,' 'haiken suru'). 'O-yomi ni narareru' is a double honorific and incorrect.",
                lockRequirements: null
            }
        ]
    },

    // Q6: Knowledge (MANNER) - Business card exchange and seating etiquette
    {
        id: "s1_q06",
        category: "MANNER",
        text: "取引先との初めての打ち合わせ。会議室に通されたが、席順と名刺交換のマナーがわからない。",
        textEN: "Your first meeting with a client. You've been shown to the meeting room, but you're unsure about seating order and business card exchange etiquette.",
        imagePrompt: "Scene: Meeting room viewed from the doorway, long table with chairs on both sides, business card holder open on the near edge, two people mid-bow exchanging cards. Composition: Doorway frames the room, table recedes into depth, card exchange in the foreground. Mood: Quiet formality, the weight of a first impression.",
        imagePath: "s1_q06.png",
        choices: [
            {
                text: "相手を上座（入口から遠い席）に案内し、名刺は両手で受け取ってテーブルに置く。",
                textEN: "Guide the client to the seat of honor (kamiza, farthest from the door) and receive their business card with both hands, placing it on the table.",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。名刺は相手より低い位置で差し出し、受け取ったら「頂戴します」。会議中はテーブルに並べ、終わったら丁寧にしまう。基本を押さえた人は信頼されます。",
                feedbackEN: "Correct. Present your card lower than theirs and say 'Choudai shimasu' when receiving. Place cards on the table during the meeting and store them carefully afterward. People who know the basics earn trust.",
                lockRequirements: null
            },
            {
                text: "入口近くの席に座り、名刺は片手で素早く交換する。",
                textEN: "Sit near the entrance and quickly exchange business cards with one hand.",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "マナー違反です。入口近くの下座が自分の席ですが、先に座るのは失礼。名刺は両手で受け取り、すぐにしまわないのが礼儀。第一印象で「この人はダメだ」と判断されました。",
                feedbackEN: "A breach of etiquette. While the seat near the door (shimoza) is yours, sitting down first is rude. Cards must be received with both hands and not immediately put away. Your first impression just said 'this person doesn't know the basics.'",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (HOUSING) - Noise Complaint - Autonomy lock (key teaching)
    {
        id: "s1_q07",
        category: "HOUSING",
        text: "隣人の騒音が酷い。深夜2時の壁ドンと音楽。どう対処する？",
        textEN: "Your neighbor's noise is unbearable: wall-banging and loud music at 2 AM. How do you deal with it?",
        imagePrompt: "Scene: a thin apartment wall vibrating as loud music leaks through; the neighbor's partying silhouette on the other side; the protagonist covering their ears; a clock showing 2 AM. Composition: wall dividing the two sides, sound waves spilling across. Mood: exhaustion, frustration, fear of confrontation.",
        imagePath: "s1_q07.png",
        choices: [
            {
                text: "我慢する。関わりたくない。",
                textEN: "Just endure it. I don't want to get involved.",
                effect: { CS: 0, Asset: 0, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "思考停止です。ストレスで自律性が削られ、やがて精神が崩壊します。我慢は美徳ではなく、自己破壊です。",
                feedbackEN: "Mental shutdown. Stress erodes your autonomy, and eventually your mental health collapses. Endurance is not a virtue. It's self-destruction.",
                lockRequirements: null
            },
            {
                text: "管理会社に連絡し、注意してもらう。",
                textEN: "Contact the property management company and have them address it.",
                effect: { CS: 30, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "仲介術です。システムを間に挟むことで、直接対決を避ける技術です。これが大人の解決法です。",
                feedbackEN: "The art of mediation. Using the system as an intermediary avoids direct confrontation. This is how adults solve problems.",
                lockRequirements: { Autonomy: 130 },
                lockedFeedback: "LOCKED: 自律性が130以上必要。受動的に耐えてきた結果、第三者に助けを求めるという発想すら浮かびません。自律性は「選択肢の数」です。",
                lockedFeedbackEN: "LOCKED: Autonomy of 130 or higher required. After passively enduring for so long, the idea of asking a third party for help doesn't even occur to you. Autonomy equals the number of options you can see."
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            introEN: "A critical turning point. Recording your response.",
            after: "データを記録しました。スキル選択に進みます。",
            afterEN: "Data recorded. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (ADMIN) - Vehicle inspection (車検) and compulsory insurance (自賠責) [SWAPPED A↔B]
    {
        id: "s1_q08",
        category: "ADMIN",
        text: "中古車を購入して3年。車検の案内が届いたが、費用が高い。少し延ばしても大丈夫？",
        textEN: "You bought a used car 3 years ago. The vehicle inspection (車検) notice arrived, but the cost is high. Is it okay to delay it a bit?",
        imagePrompt: "Scene: Car dashboard view, inspection sticker on windshield with expiration date circled, calendar notification on phone showing deadline passed, rearview mirror reflecting police lights in distance. Composition: Dashboard POV, sticker and mirror create tension. Mood: Deadline ignored, consequence approaching.",
        imagePath: "s1_q08.png",
        choices: [
            {
                text: "期限前に車検を受ける。費用が厳しければ、車を手放すことも検討する。",
                textEN: "Get the inspection before the deadline. If the cost is too much, consider selling the car.",
                effect: { CS: 20, Asset: -10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。車検は新車登録から3年、以降2年ごと。自賠責保険は車検と同時更新が基本。維持できないなら手放す判断も大人の選択です。",
                feedbackEN: "Correct. Vehicle inspections are due 3 years after new registration, then every 2 years. Compulsory auto liability insurance (自賠責) is renewed with the inspection. Deciding to let go of a car you can't maintain is also a mature choice.",
                lockRequirements: null
            },
            {
                text: "お金がないので、車検が切れてもしばらく乗り続ける。",
                textEN: "I can't afford it, so I'll keep driving even after the inspection expires.",
                effect: { CS: -30, Asset: -20, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "犯罪です。車検切れの運転は道路運送車両法違反(6点減点、30万円以下の罰金）。自賠責も切れていれば1年以下の懲役または50万円以下の罰金。「節約」のつもりが人生を壊します。",
                feedbackEN: "This is a crime. Driving without a valid inspection violates the Road Transport Vehicle Act (6 demerit points, fine up to 300,000 yen). If your compulsory insurance also lapses: up to 1 year imprisonment or 500,000 yen fine. 'Saving money' this way destroys your life.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "車は便利ですが、維持には責任が伴います。",
            introEN: "Cars are convenient, but ownership comes with responsibility."
        }
    },

    // Q9: Knowledge (SOCIAL) - Wedding etiquette [Asset lock]
    {
        id: "s1_q09",
        category: "SOCIAL",
        text: "同僚の結婚式に招待された。初めてなので不安。服装やご祝儀のマナーは?",
        textEN: "You've been invited to a colleague's wedding for the first time. What's the proper etiquette for attire and gift money (ご祝儀)?",
        imagePrompt: "Scene: Wedding invitation card on table beside wallet and formal outfit options, gift money envelope with mizuhiki visible, mirror reflecting outfit choices. Composition: Invitation centered, preparation items surrounding. Mood: First-time ceremony anxiety, etiquette unknown.",
        imagePath: "s1_q09.png",
        choices: [
            {
                text: "お祝いの気持ちが大事。服装は手持ちの白いワンピースで、ご祝儀は財布から直接2万円を渡す。",
                textEN: "What matters is the feeling. Wear a white dress you own and hand over 20,000 yen directly from your wallet.",
                effect: { CS: -30, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "複数のマナー違反。白は花嫁の色でNG。ご祝儀は奇数が基本(友人なら3万円)、新札を用意し袱紗から出して渡す。水引(みずひき)は結び切り(一度きりの意味)。バッグから直接出すのもNG。",
                feedbackEN: "Multiple etiquette violations. White is the bride's color, strictly off-limits. Gift money should be an odd number (30,000 yen for a friend), using new bills presented from a fukusa cloth. The mizuhiki knot must be a 'musubi-kiri' (tied once, meaning 'once in a lifetime'). Pulling money directly from your bag is also a faux pas.",
                lockRequirements: null
            },
            {
                text: "ご祝儀は新札で3万円(奇数)、袱紗に包む。服装は白以外のフォーマル、ファー・動物柄もNG。水引は結び切り。",
                textEN: "Prepare 30,000 yen (odd number) in new bills, wrapped in a fukusa cloth. Wear formal attire that isn't white, no fur or animal prints. Use a musubi-kiri mizuhiki envelope.",
                effect: { CS: 20, Asset: -10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。ご祝儀は友人・同僚で3万円、兄弟姉妹で5〜10万円が相場。2万円(ペア)と8万円(末広がり)は例外的にOK。4と9は避ける。受付では袱紗の上に乗せて両手で差し出す。",
                feedbackEN: "Correct. Standard gift money is 30,000 yen for friends/colleagues, 50,000-100,000 yen for siblings. 20,000 (a 'pair') and 80,000 ('ever-expanding') are acceptable exceptions. Avoid 4 and 9. Present the envelope on the fukusa with both hands at reception.",
                lockRequirements: { Asset: 80 },
                lockedFeedback: "LOCKED: 資産が80以上必要。ご祝儀を包む余裕がなく、参列を辞退せざるを得ません。",
                lockedFeedbackEN: "LOCKED: Asset of 80 or higher required. You can't afford the gift money and have no choice but to decline the invitation."
            }
        ]
    },

    // Q10: Knowledge (ADMIN) - How to fly for the first time
    {
        id: "s1_q10",
        category: "ADMIN",
        text: "初めて一人で飛行機に乗る。空港には何時間前に着けばいい? 荷物の注意点は?",
        textEN: "You're flying alone for the first time. How early should you arrive at the airport? Any luggage tips?",
        imagePrompt: "Scene: Airport departure terminal, flight information board showing departure times, traveler checking luggage contents against restriction list on phone, security checkpoint visible ahead. Composition: Terminal wide view, traveler small but focused. Mood: First flight nerves, preparation matters.",
        imagePath: "s1_q10.png",
        choices: [
            {
                text: "国内線1時間前、国際線2〜3時間前に到着。バッテリーは機内持込、液体物は制限を確認。",
                textEN: "Arrive 1 hour early for domestic, 2-3 hours for international. Batteries are carry-on only; check liquid restrictions.",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。モバイルバッテリーは預け入れ禁止(発火リスク)。国際線では液体物100ml以下の容器、ジッパー付き透明袋(1L以下)に入れる。",
                feedbackEN: "Correct. Portable batteries cannot be checked (fire risk). For international flights, liquids must be in containers of 100ml or less, placed in a resealable transparent bag (1L max).",
                lockRequirements: null
            },
            {
                text: "余裕を持って15分前行動。モバイルバッテリーとペットボトルはスーツケースに入れて預ける。",
                textEN: "Play it safe and arrive 15 minutes early. Put portable batteries and water bottles in the checked suitcase.",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "搭乗できません。国内線は1時間前、国際線は2〜3時間前が目安。保安検査は出発20分前まで。モバイルバッテリー(160Wh以下)は機内持込のみで預け荷物NGなど、要確認。",
                feedbackEN: "You won't make your flight. Aim for 1 hour before domestic, 2-3 hours before international flights. Security closes 20 minutes before departure. Portable batteries (under 160Wh) are carry-on only, never checked. Always verify restrictions before packing.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。あなたの本質を見せてください。",
            introEN: "Final question. Show me who you really are.",
            after: "ステージ1を終了します。審査結果を算出中・・・",
            afterEN: "Stage 1 complete. Calculating assessment results..."
        }
    }
];
