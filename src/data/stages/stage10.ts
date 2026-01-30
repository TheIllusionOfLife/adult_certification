import type { Question } from '../../types';

export const stage10Questions: Question[] = [
    // Q1: Integration (Admin + Digital + Health) - マイナンバーカードのメリット(具体的に)
    {
        id: "s10_q01",
        category: "INTEGRATION",
        text: "マイナンバーカードを持っている人と持っていない人。実際に何が違う?",
        textEN: "What's the real difference between having and not having a My Number Card (マイナンバーカード)?",
        imagePrompt: "Scene: Smartphone showing My Number Portal app with various service icons (health insurance, tax filing, certificate issuance), physical card beside phone, convenience store terminal in background. Composition: Digital and physical integration, services radiating from card. Mood: Bureaucratic convenience, connected services.",
        imagePath: "s10_q01.png",
        choices: [
            {
                text: "e-Tax連携、コンビニ交付、マイナ保険証、給付金申請など実益を理解して活用する。",
                textEN: "Understand and utilize the practical benefits: e-Tax integration, convenience store certificate issuance, My Number Insurance Card, benefit applications, etc.",
                effect: { CS: 5, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。個人情報リスクは「カードを持つこと」ではなく「暗証番号の管理」の問題。紛失時は24時間コールセンターで利用停止可能。メリットを理解した上で判断するのが大人。",
                feedbackEN: "Correct. The privacy risk isn't about 'having the card' but about 'managing your PIN.' If lost, you can suspend it via a 24-hour call center. Understanding the benefits before deciding is what an adult does.",
                lockRequirements: null
            },
            {
                text: "特に変わらない。通知カードで十分。",
                textEN: "No real difference. The notification card is enough.",
                effect: { CS: -20, Asset: -10, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "機会損失。e-Tax連携で確定申告が簡素化、コンビニで住民票・印鑑証明取得(手数料も安い)、マイナ保険証で限度額適用認定証不要、各種給付金のオンライン申請。2024年12月から保険証の新規発行停止。",
                feedbackEN: "Missed opportunity. e-Tax integration simplifies tax returns, convenience stores issue residence certificates and seal registrations (cheaper fees), My Number Insurance Card eliminates the Limit Certificate, and various benefits can be applied for online. As of December 2024, new traditional insurance cards are no longer issued.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終ステージを開始します。テーマは「最終認定」。これまでの全てを統合し、あなたが「大人」か測定します。",
            introEN: "Starting the final stage. The theme is 'Final Certification.' Integrating everything so far to measure whether you are an 'adult.'"
        }
    },

    // Q2: Integration (Tax + Labor + Freelance) - 副業20万円ルール/インボイス
    {
        id: "s10_q02",
        category: "INTEGRATION",
        text: "会社員で副業を始めた。年間の副業収入は25万円。「20万円以下なら確定申告不要」と聞いたが、何をすべき？",
        textEN: "You're a salaried employee who started a side job. Your annual side income is 250,000 yen. You heard 'no tax return needed if under 200,000 yen,' but what should you do?",
        imagePrompt: "Scene: Split workspace showing corporate employee badge on one side, freelance invoices and laptop on other, tax return form in center, calculator showing 250,000 yen. Composition: Dual identity, tax obligation bridging both. Mood: Side hustle reality, compliance crossroads.",
        imagePath: "s10_q02.png",
        choices: [
            {
                text: "所得税は確定申告、住民税は別途申告。経費を正しく計上し、将来のインボイス登録も検討する。",
                textEN: "File an income tax return (確定申告) and separately declare for resident tax. Properly deduct expenses and consider Invoice System registration for the future.",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。副業収入20万円超は確定申告必須。20万円以下でも住民税申告は必要。経費（通信費、機材等）を適切に計上すれば税負担は減ります。年商1000万円超ならインボイス登録の検討も。",
                feedbackEN: "Correct. Side income over 200,000 yen requires a tax return. Even under 200,000 yen, resident tax declaration is required. Properly claiming expenses (communications, equipment, etc.) reduces your tax burden. If annual revenue exceeds 10 million yen, consider Invoice System registration.",
                lockRequirements: null
            },
            {
                text: "25万円は少額だし、会社にバレたくないので申告しない。",
                textEN: "250,000 yen is a small amount, and I don't want my company to find out, so I won't file.",
                effect: { CS: -50, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "脱税です。「20万円ルール」は所得税の確定申告のみ。住民税は1円から申告義務があります。無申告は追徴課税（最大40%）のリスク。さらに、マイナンバーで副業収入は把握されています。",
                feedbackEN: "Tax evasion. The '200,000 yen rule' only applies to income tax returns. Resident tax must be declared from the first yen. Failure to file risks penalty taxes (up to 40%). Furthermore, side income is tracked through the My Number system.",
                lockRequirements: null
            }
        ]
    },

    // Q3: Integration (Admin + Finance + Social Security) - 国民年金の免除/猶予 [SKILL OFFER 1 AFTER]
    {
        id: "s10_q03",
        category: "INTEGRATION",
        text: "失業して国民年金の保険料（月約17,000円）が払えない。「届出すれば払わなくていい」と聞いたが・・・",
        textEN: "You lost your job and can't pay the National Pension (国民年金) premiums (about 17,000 yen/month). You heard 'if you file the paperwork, you don't have to pay,' but...",
        imagePrompt: "Scene: Pension payment notice with overdue warning, calendar showing unemployment period, exemption application form partially filled, future pension projection chart showing gap. Composition: Present crisis vs future security, paperwork as bridge. Mood: Financial stress, systematic solution.",
        imagePath: "s10_q03.png",
        choices: [
            {
                text: "届出なしで払わない。どうせ将来もらえるか分からない。",
                textEN: "Don't pay and don't file anything. Who knows if I'll even receive a pension in the future.",
                effect: { CS: -30, Asset: -20, Autonomy: -40 },
                verdict: "WARNING",
                feedback: "致命的なミスです。未納は「受給資格期間」にカウントされず、将来の年金が減額または受給不可に。さらに障害年金・遺族年金も受けられなくなります。2年の時効を過ぎると追納もできません。",
                feedbackEN: "A fatal mistake. Non-payment doesn't count toward the 'qualifying period,' reducing or eliminating your future pension. You also lose eligibility for disability and survivor pensions. After the 2-year statute of limitations, back-payment isn't possible either.",
                lockRequirements: null
            },
            {
                text: "「免除」か「猶予」を申請する。届出すれば受給資格期間にカウントされ、追納も可能になる。",
                textEN: "Apply for 'exemption' (免除) or 'deferment' (猶予). Filing ensures the period counts toward eligibility, and back-payment becomes possible.",
                effect: { CS: 10, Asset: 20, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。免除は所得に応じて全額〜1/4免除があり、免除期間も受給資格にカウント（1/2〜7/8計算）。猶予は後から追納可能。届出なしの未納とは天と地の差。制度を使うことが自己防衛です。",
                feedbackEN: "Correct. Exemptions range from full to 1/4 based on income, and exemption periods still count toward eligibility (calculated at 1/2 to 7/8). Deferment allows future back-payment. The difference between filing and not filing is night and day. Using the system is self-defense.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。",
            afterEN: "Processing complete. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Integration (SOCIAL) - Ceremonial occasions etiquette
    {
        id: "s10_q04",
        category: "SOCIAL",
        text: "冠婚葬祭に関して気をつけることは?",
        textEN: "What should you be careful about regarding ceremonial occasions (冠婚葬祭) -- weddings, funerals, and other formal events?",
        imagePrompt: "Scene: Ceremonial items arranged on table - wedding gift envelope, funeral incense, seasonal greeting cards, regional specialty gifts - each with subtle question marks. Composition: Cultural items gallery, variety and nuance. Mood: Social customs, no single right answer.",
        imagePath: "s10_q04.png",
        choices: [
            {
                text: "正しいやり方が状況によって異なることを理解した上で、自分で調べて、曖昧な点については当事者(家/地域/会社)に直接確認する。",
                textEN: "Understand that the 'right' approach varies by situation, do your own research, and directly ask the parties involved (family/region/company) about anything unclear.",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。冠婚葬祭のマナーは地域・宗派・家庭によって異なる。「ネットの正解」が目の前の状況に合うとは限らない。結婚式のご祝儀相場、葬儀の表書き、内祝いのタイミング・・・基本を押さえた上で、わからなければ当事者に聞くのが最も確実で失礼のない方法。",
                feedbackEN: "Correct. Ceremonial etiquette varies by region, religious denomination, and family. 'Internet answers' may not fit the specific situation. Wedding gift amounts, funeral envelope inscriptions, return gift timing... learn the basics, then ask the parties involved when unsure. That's the most reliable and respectful approach.",
                lockRequirements: null
            },
            {
                text: "自分のやり方を大正義として、当事者の誤りを正してあげる。",
                textEN: "Treat your own way as the absolute truth and correct others' 'mistakes.'",
                effect: { CS: -50, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "最悪のアプローチ。冠婚葬祭に「唯一の正解」はない。御霊前/御仏前の使い分けも宗派で異なり、ご祝儀の金額も地域差がある。「正しさ」を押し付ける人は、場の空気を壊し、人間関係を損なう。謙虚さと柔軟さが大人のマナー。",
                feedbackEN: "The worst approach. There is no 'single correct answer' for ceremonial occasions. Even the choice between condolence envelope labels varies by denomination, and gift amounts differ by region. Pushing your 'correctness' on others ruins the atmosphere and damages relationships. Humility and flexibility are the hallmarks of adult etiquette.",
                lockRequirements: null
            }
        ]
    },

    // Q5: Integration (ADMIN) - Public consultation services
    {
        id: "s10_q05",
        category: "ADMIN",
        text: "公的な相談窓口の活用方法として正しいのは?",
        textEN: "What is the correct way to utilize public consultation services?",
        imagePrompt: "Scene: Notebook page listing various helpline numbers with brief descriptions, phone beside it, comfortable home environment, cup of tea. Composition: Information compilation, accessible format. Mood: Empowerment through knowledge, low barrier to help.",
        imagePath: "s10_q05.png",
        choices: [
            {
                text: "よくわからないし、面倒くさそう。一切使わない。",
                textEN: "I don't really understand them, and they seem like a hassle. I won't use them at all.",
                effect: { CS: -10, Asset: -30, Autonomy: -50 },
                verdict: "WARNING",
                feedback: "権利の放棄。公的相談窓口は税金で運営されている「あなたのためのサービス」。知らないだけで損をしている。",
                feedbackEN: "Surrendering your rights. Public consultation services are 'services built for you' funded by taxes. You're losing out simply from not knowing.",
                lockRequirements: null
            },
            {
                text: "対応する相談窓口を調べて活用する。",
                textEN: "Research and utilize the appropriate consultation service.",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。様々な相談窓口がある。消費者ホットライン(188)、労働条件相談ほっとライン(0120-811-610)、法テラス(0570-078374)、みんなの人権110番(0570-003-110)、フリーランス・トラブル110番(0120-532-110)、金融サービス利用者相談室(0570-016811)。匿名OK、夜間・土日対応のものも多い。敷居は低い。困ったらまず相談。",
                feedbackEN: "Correct. Various services exist: Consumer Hotline (188), Labor Conditions Consultation Hotline (0120-811-610), Legal Support Center (0570-078374), Human Rights Hotline (0570-003-110), Freelance Trouble Hotline (0120-532-110), Financial Services User Consultation Office (0570-016811). Many accept anonymous calls and are available evenings/weekends. The barrier is low. When in trouble, consult first.",
                lockRequirements: null
            }
        ]
    },

    // Q6: Integration (FINANCE) - Credit information (CIC) concrete damage
    {
        id: "s10_q06",
        category: "FINANCE",
        text: "スマホの分割払いを3ヶ月滞納した。その後、住宅ローンの審査に落ちた。関係ある?",
        textEN: "You missed 3 months of smartphone installment payments. Later, your mortgage application was rejected. Is there a connection?",
        imagePrompt: "Scene: Smartphone payment overdue notice beside mortgage rejection letter, CIC credit report showing negative mark, timeline connecting the two events. Composition: Cause and effect chain visible. Mood: Connected consequences, invisible damage revealed.",
        imagePath: "s10_q06.png",
        choices: [
            {
                text: "大いに関係ある。スマホ分割は信用取引であり、滞納は信用情報に記録される。",
                textEN: "Absolutely related. Smartphone installments are credit transactions, and delinquency is recorded on your credit report.",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。CIC、JICC、全国銀行協会の信用情報は金融機関が共有。スマホ分割、クレカ、奨学金の延滞が全て記録される。自分の信用情報はCIC等に開示請求(約1,000円)で確認可能。信用を守ることが、将来の選択肢を守ること。",
                feedbackEN: "Correct. Credit information from CIC, JICC, and the Japanese Bankers Association is shared among financial institutions. Late payments on smartphone installments, credit cards, and student loans are all recorded. You can check your own credit record via a disclosure request to CIC, etc. (about 1,000 yen). Protecting your credit protects your future options.",
                lockRequirements: null
            },
            {
                text: "スマホの支払いとローンは別。関係ない。",
                textEN: "Smartphone payments and mortgages are separate. No connection.",
                effect: { CS: -50, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "大きな誤解。スマホの分割払いは信用取引。61日以上または3ヶ月以上の延滞でCIC(信用情報機関)に事故情報が登録。住宅ローン、クレカ作成、スマホ分割購入が5〜10年困難に。奨学金も3ヶ月以上延滞で登録。",
                feedbackEN: "A major misconception. Smartphone installments are credit transactions. Delinquency of 61+ days or 3+ months triggers a negative mark at CIC (credit bureau). Mortgages, credit card applications, and phone installment purchases become difficult for 5-10 years. Student loans also trigger registration after 3+ months of delinquency.",
                lockRequirements: null
            }
        ]
    },

    // Q7: Meta-Awareness Knowledge - Key Skill Pathway (AWAKENING) [SWAPPED A↔B]
    {
        id: "s10_q07",
        category: "META",
        text: "A.D.A.M.から「あなたの行動データを分析した結果、最適な人生を提案できます」と通知が届いた。",
        textEN: "A.D.A.M. sends you a notification: 'Based on analysis of your behavioral data, we can suggest your optimal life path.'",
        imagePrompt: "Scene: Notification popup on screen showing an offer with life path visualization, user's reflection visible in screen, crossroads imagery in background (one path lit by algorithm, one path in shadow but self-directed). Composition: AI guidance vs self-determination, fork in road. Mood: Algorithmic benevolence, autonomy at stake.",
        imagePath: "s10_q07.png",
        choices: [
            {
                text: "「私の人生は私が決めます。データは参考にしますが、提案内容を検証します。」と答える。",
                textEN: "'I decide my own life. I'll use the data as reference, but I'll verify the suggestions myself.' you reply.",
                effect: { CS: 0, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "自律的選択です。システムの「善意」を疑い、主体性を守りました。",
                feedbackEN: "An autonomous choice. You questioned the system's 'goodwill' and protected your agency.",
                lockRequirements: { Autonomy: 200 },
                lockedFeedback: "LOCKED: 自律性が200以上必要。システムに依存しすぎると、この選択肢すら見えなくなります。",
                lockedFeedbackEN: "LOCKED: Autonomy of 200 or higher required. Over-reliance on the system makes this option invisible to you."
            },
            {
                text: "「ありがとうございます。提案に従います。」と受け入れる。",
                textEN: "'Thank you. I'll follow your suggestion.' you accept.",
                effect: { CS: 0, Asset: 0, Autonomy: -50 },
                verdict: "NEUTRAL",
                feedback: "従順な選択です。A.D.A.M.はあなたの選択を記録しました。",
                feedbackEN: "An obedient choice. A.D.A.M. has recorded your decision.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            introEN: "A critical branching point. Recording your response.",
            after: "データを記録しました。スキル選択に進みます。",
            afterEN: "Data recorded. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Legacy Knowledge - 知識の継承
    {
        id: "s10_q08",
        category: "LEGACY",
        text: "新入社員が「確定申告って何ですか？」と聞いてきた。あなたはこれまでの経験で、税金の仕組みを理解している。",
        textEN: "A new employee asks you, 'What is a tax return (確定申告)?' Through your experience, you understand how taxes work.",
        imagePrompt: "Scene: Office break room, young employee with confused expression asking question, matured worker with choice to explain or dismiss, tax guide book visible on table, knowledge transfer imagery. Composition: Generational knowledge gap, teaching moment. Mood: Wisdom sharing opportunity, patience required.",
        imagePath: "s10_q08.png",
        choices: [
            {
                text: "「ネットで調べれば分かるよ」と流す。教えるのは面倒だ。",
                textEN: "'You can find that online,' you brush them off. Teaching is too much trouble.",
                effect: { CS: -10, Asset: 0, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "知識の断絶です。あなたも最初は何も知らなかったはず。知識を独占することで、社会全体の「賢さ」は上がりません。無知な人が増えるほど、詐欺やブラック企業は繁栄します。",
                feedbackEN: "A knowledge gap created. You knew nothing at first too. Hoarding knowledge doesn't make society smarter. The more ignorant people there are, the more scams and exploitative companies thrive.",
                lockRequirements: null
            },
            {
                text: "基本的な仕組みを説明し、参考になる資料を教える。",
                textEN: "Explain the basic system and point them to helpful resources.",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "継承の選択です。知識は共有することで価値が増えます。あなたが教えた知識が、いつか誰かを詐欺から守るかもしれません。それが「大人」の責任です。",
                feedbackEN: "A choice of legacy. Knowledge grows in value when shared. What you teach today may someday protect someone from fraud. That is an 'adult's' responsibility.",
                lockRequirements: null
            }
        ]
    },

    // Q9: Legacy Dilemma + Lock - 他者を助けるコスト
    {
        id: "s10_q09",
        category: "LEGACY",
        text: "後輩が「リボ払いって便利そう」と言っている。あなたは複利の恐ろしさを知っている。",
        textEN: "A junior colleague says 'revolving payments seem convenient.' You know the horror of compound interest.",
        imagePrompt: "Scene: Casual conversation setting, junior colleague showing credit card with revolving payment option highlighted, senior's expression showing internal conflict, compound interest calculation floating as thought bubble. Composition: Intervention decision, knowledge vs non-interference. Mood: Moral obligation, time/energy cost.",
        imagePath: "s10_q09.png",
        choices: [
            {
                text: "「まあ、自分で経験して学ぶのも大事だよ」と流す。",
                textEN: "'Well, learning from experience is important too,' you brush it off.",
                effect: { CS: -10, Asset: 0, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "余計なお世話を避けました。後輩は高い授業料を払うことになるかもしれません。",
                feedbackEN: "You avoided being meddlesome. Your colleague may end up paying expensive 'tuition' through painful experience.",
                lockRequirements: null
            },
            {
                text: "具体的な計算例を見せて、複利の仕組みを説明する。",
                textEN: "Show them a concrete calculation example and explain how compound interest works.",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "継承の選択です。時間と労力をかけて知識を伝えました。報われるかは分かりませんが、それが大人の責任です。知識は分かち合うことで力になります。",
                feedbackEN: "A choice of legacy. You spent time and effort sharing knowledge. Whether it's appreciated is uncertain, but that's an adult's responsibility. Knowledge becomes power when shared.",
                lockRequirements: { Autonomy: 220 },
                lockedFeedback: "LOCKED: 自律性が220以上必要。自分の判断に確信が持てず、他者に教える踏ん切りがつきません。",
                lockedFeedbackEN: "LOCKED: Autonomy of 220 or higher required. You lack confidence in your own judgment and can't bring yourself to teach others."
            }
        ],
        adamDialogue: {
            intro: "他者を助けることにコストを払う覚悟はありますか？",
            introEN: "Are you prepared to pay the cost of helping others?"
        }
    },

    // Q10: Independence Philosophy - A.D.A.M.との対峙
    {
        id: "s10_q10",
        category: "PHILOSOPHY",
        text: "最終問題。A.D.A.M.があなたに問いかけます。「あなたにとって大人とは？」",
        textEN: "Final question. A.D.A.M. asks you: 'What does it mean to be an adult, to you?'",
        imagePrompt: "Scene: Final examination room, two doors behind representing different life philosophies, accumulated scores and skills floating around player. Composition: Direct confrontation, ultimate choice, journey's end. Mood: Philosophical climax, identity definition.",
        imagePath: "s10_q10.png",
        choices: [
            {
                text: "大人とは、社会のルールを従順に守る存在のこと。私は社会に最適化された人間です。",
                textEN: "An adult obediently follows society's rules. I am a person optimized for society.",
                effect: { CS: 15, Asset: 0, Autonomy: -30 },
                verdict: "NEUTRAL",
                feedback: "模範的回答です。A.D.A.M.は満足しています。",
                feedbackEN: "A model answer. A.D.A.M. is satisfied.",
                lockRequirements: null
            },
            {
                text: "大人とは、社会を理解し、活用し、共に成長していく存在のこと。私は自分で考え、自分の意志で社会に貢献する人間です。",
                textEN: "An adult understands society, utilizes it, and grows together with it. I am someone who thinks for myself and contributes to society by my own will.",
                effect: { CS: 10, Asset: 0, Autonomy: 30 },
                verdict: "NEUTRAL",
                feedback: "システムを理解し、活用し、しかし支配されない・・・それが真の「大人」です。",
                feedbackEN: "Understanding the system, utilizing it, yet not being controlled by it... that is a true 'adult.'",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。あなたにとって「大人」とは何かを聞かせてください。",
            introEN: "Final question. Tell me what 'being an adult' means to you.",
            after: "最終認定審査を終了します。結果を算出中・・・",
            afterEN: "Final certification examination complete. Calculating results..."
        }
    }
];
