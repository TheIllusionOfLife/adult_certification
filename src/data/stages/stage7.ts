import type { Question } from '../../types';

export const stage7Questions: Question[] = [
    // Q1: Knowledge (LEGAL) - Cooling-off inapplicable to online shopping
    {
        id: "s7_q01",
        category: "LEGAL",
        text: "ネット通販で買った服がイメージと違った。クーリングオフで返品できる？",
        textEN: "The clothes you bought online don't match your expectations. Can you return them using the cooling-off period?",
        imagePrompt: "Scene: Online shopping package opened on table, clothing item not matching phone screen photo, return policy page showing fine print, disappointed expression. Composition: Expectation vs reality, legal fine print. Mood: Consumer surprise, rights misunderstood.",
        imagePath: "s7_q01.png",
        choices: [
            {
                text: "8日以内ならクーリングオフできるはず。",
                textEN: "I should be able to use the cooling-off period within 8 days.",
                effect: { CS: -20, Asset: -20, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "最も多い誤解。通信販売にはクーリングオフ制度は適用されません。返品は各ショップの「返品特約」に依存します。特約がなければ商品到着後8日以内に返品可能(送料は購入者負担)。購入前に返品ポリシーを確認すべきです。",
                feedbackEN: "The most common misconception. The cooling-off system does not apply to mail-order sales. Returns depend on each shop's 'return policy.' Without a policy, you can return items within 8 days of delivery (shipping at your expense). Always check the return policy before buying.",
                lockRequirements: null
            },
            {
                text: "通信販売にはクーリングオフは適用されない。返品は「返品特約」を確認する。",
                textEN: "The cooling-off period doesn't apply to mail-order sales. Check the 'return policy' for returns.",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。クーリングオフは訪問販売(8日)、電話勧誘販売(8日)、連鎖販売取引(20日)等が対象です。ネット通販は「自分の意思で購入した」ため対象外。返品特約を事前に確認するのが唯一の防御策です。",
                feedbackEN: "Correct. Cooling-off applies to door-to-door sales (8 days), telemarketing sales (8 days), MLM transactions (20 days), etc. Online shopping is excluded because 'you purchased of your own will.' Checking the return policy in advance is your only defense.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ7を開始します。テーマは「法の盾」。契約、詐欺、消費者保護・・・法律は武器にも盾にもなります。",
            introEN: "Starting Stage 7. The theme is 'Shield of Law.' Contracts, fraud, consumer protection... the law can be both weapon and shield."
        }
    },

    // Q2: Knowledge (LEGAL) - Consumer consultation centers (smaller effect, before skills) [SWAPPED A↔B]
    {
        id: "s7_q02",
        category: "LEGAL",
        text: "ネット通販で届いた商品が破損。販売店に連絡しても「返品不可」の一点張り。",
        textEN: "A product you ordered online arrived damaged. The seller insists 'no returns allowed.'",
        imagePrompt: "Scene: Broken product on desk with visible damage, phone showing customer service chat with dismissive refusal response, sticky note with consumer hotline number circled. Composition: Damaged goods and dismissive response, solution hint at edge. Mood: Stonewalled, but exit exists.",
        imagePath: "s7_q02.png",
        choices: [
            {
                text: "消費者センター（188）に相談する。第三者の介入で状況が変わることも多い。",
                textEN: "Consult the Consumer Affairs Center (188). Third-party intervention often changes the situation.",
                effect: { CS: 10, Asset: 0, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。消費者センターは無料で相談でき、あっせん（仲裁）もしてくれます。「相談先を知っている」ことが、不当な扱いへの最大の武器です。",
                feedbackEN: "Correct. The Consumer Affairs Center offers free consultations and can mediate. Knowing where to seek help is your greatest weapon against unfair treatment.",
                lockRequirements: null
            },
            {
                text: "「返品不可」と言われたら仕方ない。諦める。",
                textEN: "If they say 'no returns,' there's nothing to do. Give up.",
                effect: { CS: -20, Asset: -20, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "泣き寝入りです。初期不良品の交換・返金は消費者の権利。消費者ホットライン（188）に相談し、適切な対応手段を探りましょう。",
                feedbackEN: "Giving in. Exchanging or refunding defective products is a consumer right. Calling the Consumer Hotline (188) will help you find the means to demand proper handling.",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (LEGAL) - Cooling-off period rules (medium effect, 1 skill helps) [SKILL OFFER 1 AFTER] [SWAPPED A↔B]
    {
        id: "s7_q03",
        category: "LEGAL",
        text: "訪問販売で高額な浄水器（30万円）を契約してしまった。翌日、冷静になって後悔。解約できる？",
        textEN: "You signed a contract for an expensive water purifier (300,000 yen) from a door-to-door salesperson. The next day, you regret it. Can you cancel?",
        imagePrompt: "Scene: a water purifier contract on table; salesperson leaving; calendar showing 8-day window; protagonist with buyer's remorse. Composition: impulse purchase with escape route. Mood: regret with hope.",
        imagePath: "s7_q03.png",
        choices: [
            {
                text: "契約書にサインしたから、もう解約できない。",
                textEN: "I already signed the contract, so I can't cancel anymore.",
                effect: { CS: -20, Asset: -50, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "権利の放棄です。訪問販売にはクーリングオフ制度があり、契約書面受領日から8日以内なら無条件解約可能。知らないと30万円を失います。",
                feedbackEN: "Surrendering your rights. Door-to-door sales are covered by the cooling-off system: unconditional cancellation is possible within 8 days of receiving the written contract. Not knowing costs you 300,000 yen.",
                lockRequirements: null
            },
            {
                text: "クーリングオフを使う。書面で通知すれば8日以内は無条件解約できる。",
                textEN: "Use the cooling-off period. Written notice within 8 days allows unconditional cancellation.",
                effect: { CS: 10, Asset: 10, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。クーリングオフは消費者の強力な武器。書面（内容証明郵便が確実）で通知すれば、理由不要で解約できます。",
                feedbackEN: "Correct. Cooling-off is a powerful consumer weapon. Notify in writing (certified mail is most reliable) and you can cancel without giving a reason.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。",
            afterEN: "Processing complete. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (LEGAL) - Traffic accident settlement (medium effect, 1 skill helps) [SWAPPED A↔B]
    {
        id: "s7_q04",
        category: "LEGAL",
        text: "自転車で走行中、車と接触事故。相手の保険会社から「示談金30万円で解決しましょう」と電話が来た。",
        textEN: "While cycling, you were in a collision with a car. The other party's insurance company calls offering 'let's settle for 300,000 yen.'",
        imagePrompt: "Scene: a bicycle accident scene; insurance adjuster on phone offering quick settlement; hidden costs of injuries not yet apparent. Composition: immediate offer vs long-term consequences. Mood: pressure vs patience.",
        imagePath: "s7_q04.png",
        choices: [
            {
                text: "まず病院で検査を受け、症状が固定するまで示談しない。必要なら弁護士に相談。",
                textEN: "First get examined at a hospital and don't settle until symptoms stabilize. Consult a lawyer if needed.",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。交通事故の示談は「症状固定後」が原則。弁護士特約があれば費用負担なく相談可能。焦って示談すると、本来受け取れる額の半分以下になることも。",
                feedbackEN: "Correct. The principle for traffic accident settlements is 'after symptoms have stabilized.' If you have a lawyer's special clause on your insurance, consultations cost nothing. Rushing to settle can mean receiving less than half of what you're entitled to.",
                lockRequirements: null
            },
            {
                text: "30万円もらえるなら十分。示談書にサインする。",
                textEN: "300,000 yen sounds sufficient. Sign the settlement agreement.",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "早まった判断です。示談後に後遺症が出ても追加請求は困難。保険会社の初回提示は「低め」が基本。まず病院で精密検査を受け、弁護士に相談すべきでした。",
                feedbackEN: "A hasty decision. Seeking additional compensation after settling is extremely difficult, even if aftereffects appear. Insurance companies' initial offers are typically low. You should have gotten a thorough medical exam and consulted a lawyer first.",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (LEGAL) - Freelance unpaid work
    {
        id: "s7_q05",
        category: "LEGAL",
        text: "フリーランスで仕事を受け、契約書を交わし、納品も完了した。しかし報酬が支払われない。催促しても「もう少し待って」の一点張り。",
        textEN: "You took a freelance job, signed a contract, and delivered the work. But payment hasn't come. Despite reminders, the client keeps saying 'wait a little longer.'",
        imagePrompt: "Scene: Invoice marked 'overdue' on desk, email chain showing polite then firm payment reminders, freelance hotline number written on sticky note, certified mail envelope ready. Composition: Escalating documentation, solution paths visible. Mood: Frustration meeting legal options.",
        imagePath: "s7_q05.png",
        choices: [
            {
                text: "何度も催促するしかない。弁護士は高いから諦めるかも。",
                textEN: "All I can do is keep sending reminders. Lawyers are expensive, so I might give up.",
                effect: { CS: -10, Asset: -40, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "泣き寝入りに近い。フリーランス用の公的な相談窓口を利用しましょう。",
                feedbackEN: "Close to giving in. There are public consultation services for freelancers.",
                lockRequirements: null
            },
            {
                text: "「フリーランス・トラブル110番」(0120-532-110)に相談。必要なら内容証明郵便で支払いを請求し、少額訴訟も検討。",
                textEN: "Consult the 'Freelance Trouble Hotline' (0120-532-110). If necessary, demand payment via certified mail and consider small claims court.",
                effect: { CS: 10, Asset: 0, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解。フリーランス・トラブル110番は厚労省委託の無料相談窓口。弁護士による助言も。2024年11月施行のフリーランス保護法で、発注者の報酬支払い遅延は法違反に。契約書・納品記録・メールのやり取りが証拠。少額訴訟(60万円以下)は弁護士不要、1回の審理で判決。",
                feedbackEN: "Correct. The Freelance Trouble Hotline is a free consultation service commissioned by the Ministry of Health, Labour and Welfare, with lawyer advice available. Under the Freelance Protection Act (effective November 2024), late payment by clients is now illegal. Contracts, delivery records, and email threads serve as evidence. Small claims court (up to 600,000 yen) requires no lawyer and delivers a verdict in a single hearing.",
                lockRequirements: null
            }
        ]
    },

    // Q6: Knowledge (LEGAL) - SNS investment scam (modern version)
    {
        id: "s7_q06",
        category: "LEGAL",
        text: "SNSで「AI自動売買で月利10%」という広告を見た。紹介者に連絡すると「初期費用30万円、紹介ボーナスもある」と言われた。",
        textEN: "You see an ad on social media: 'AI auto-trading, 10% monthly returns.' The recruiter says 'initial cost is 300,000 yen, plus referral bonuses.'",
        imagePrompt: "Scene: Phone showing flashy SNS ad with AI trading promises, luxury lifestyle images, DM conversation with recruiter, pyramid structure diagram barely visible in background. Composition: Glossy ad vs hidden structure. Mood: Modern temptation, digital trap.",
        imagePath: "s7_q06.png",
        choices: [
            {
                text: "「月利10%は年利120%。ありえない数字」と判断し、断る。紹介ボーナスはポンジスキーム(自転車操業)の特徴。",
                textEN: "Judge that '10% monthly = 120% annual returns is impossible' and decline. Referral bonuses are a hallmark of Ponzi schemes.",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。月利10%は年利120%で、世界最高の投資家でも不可能な数字。紹介ボーナスはMLM(連鎖販売)の特徴。ポンジスキームは新規参加者の資金で既存参加者に配当する自転車操業。資金が尽きれば破綻し、後から参加した人が最も損をします。",
                feedbackEN: "Correct. 10% monthly means 120% annually, impossible even for the world's best investors. 'Referral bonuses' are a hallmark of MLM (multi-level marketing). Ponzi schemes pay existing members with new members' money. When funds run out, it collapses, and latecomers lose the most.",
                lockRequirements: null
            },
            {
                text: "AIなら可能かもしれない。30万円なら試してみる価値がある。",
                textEN: "Maybe AI makes it possible. 300,000 yen might be worth trying.",
                effect: { CS: -30, Asset: -50, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "投資詐欺の典型。ポンジスキーム(自転車操業)+MLM(連鎖販売)の組み合わせ。初期は配当が出ることもありますが、それは新規参加者の資金です。やがて破綻し、お金も人間関係も失います。",
                feedbackEN: "A textbook investment scam. Ponzi scheme + MLM combination. Early payouts may happen, but they come from new members' money. It will eventually collapse, and you'll lose your money and your relationships.",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (LEGAL) - Reading before signing [SWAPPED A↔B]
    {
        id: "s7_q07",
        category: "LEGAL",
        text: "携帯電話の契約更新。店員が「ここにサインを」と急かすが、契約書は小さい文字でびっしり。",
        textEN: "Renewing your phone contract. The clerk rushes you with 'please sign here,' but the contract is packed with tiny text.",
        imagePrompt: "Scene: a phone contract with dense small print; impatient salesperson tapping watch; magnifying glass revealing hidden terms. Composition: pressure vs diligence. Mood: social pressure vs self-protection.",
        imagePath: "s7_q07.png",
        choices: [
            {
                text: "「確認させてください」と時間をもらい、重要条項を読んでからサインする。",
                textEN: "Ask for time to review, read the key terms, then sign.",
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。契約は「読んで理解してサイン」が原則。読まずにサインしても法的には有効です。「読む権利」を行使する勇気が、あなたを守ります。",
                feedbackEN: "Correct. The principle is 'read, understand, then sign.' A signature without reading is still legally binding. Having the courage to exercise your 'right to read' protects you.",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。「店員を待たせたくない」という社会的圧力に屈してしまいます。",
                lockedFeedbackEN: "LOCKED: Autonomy of 150 or higher required. You succumb to the social pressure of 'not wanting to keep the clerk waiting.'"
            },
            {
                text: "店員を待たせるのは悪いので、読まずにサインする。",
                textEN: "It would be rude to keep the clerk waiting, so sign without reading.",
                effect: { CS: 0, Asset: -20, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "思考停止です。2年縛り、自動更新、高額オプション・・・読まずにサインした契約のすべてがあなたを縛ります。「時間がない」は言い訳です。",
                feedbackEN: "Thoughtless compliance. Two-year lock-in, auto-renewal, expensive add-ons... every term you signed without reading now binds you. 'No time' is just an excuse.",
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

    // Q8: Knowledge (LEGAL) - Joint liability (連帯保証人) danger (biggest effect, 2 skills help) [SWAPPED A↔B]
    {
        id: "s7_q08",
        category: "LEGAL",
        text: "知人から「事業資金の連帯保証人になってほしい。形だけだから」と頼まれた。",
        textEN: "An acquaintance asks you to be a joint guarantor for their business loan. 'It's just a formality,' they say.",
        imagePrompt: "Scene: a guarantee contract with small print magnified showing full liability; friend reassuring; shadow of debt collectors. Composition: casual request with severe consequences. Mood: trust vs legal reality.",
        imagePath: "s7_q08.png",
        choices: [
            {
                text: "「連帯保証は無理」と断る。どんなに親しくても、赤の他人の借金リスクは負えない。",
                textEN: "Decline: 'I can't be a joint guarantor.' No matter how close, you can't take on a stranger's debt risk.",
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。連帯保証を断ることは冷たいことではなく、自己防衛です。2020年の民法改正で保護は強化されましたが、リスクの本質は変わりません。",
                feedbackEN: "Correct. Refusing to be a joint guarantor isn't cold; it's self-defense. While the 2020 Civil Code revision strengthened protections, the fundamental risk remains unchanged.",
                lockRequirements: null
            },
            {
                text: "「形だけ」と言うならと、連帯保証人になる。",
                textEN: "Since they say 'it's just a formality,' agree to become a joint guarantor.",
                effect: { CS: -20, Asset: -50, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "致命的なミスです。連帯保証は「借主と同等の返済義務」。知人が払えなければ、全額請求があなたに来ます。「形だけ」は法的に存在しません。",
                feedbackEN: "A fatal mistake. Joint guarantorship means 'repayment obligation equal to the borrower.' If your acquaintance can't pay, the full amount is demanded from you. 'Just a formality' has no legal meaning.",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (LEGAL) - Friend's wrongdoing: loyalty vs integrity [SWAPPED A↔B]
    {
        id: "s7_q09",
        category: "LEGAL",
        text: "親友が「会社の備品を私用で持ち帰っている」と打ち明けてきた。金額は大きくないが、厳密には横領。友人は「みんなやっている」と笑っている。",
        textEN: "Your best friend confesses to taking office supplies home for personal use. The amounts are small, but technically it's embezzlement. Your friend laughs, saying 'everyone does it.'",
        imagePrompt: "Scene: Cafe table view, friend's bag across the table partially unzipped showing office supplies (staplers, pens, sticky notes) inside, two coffee cups, casual atmosphere. Composition: Bag contents accidentally visible, friend's presence implied. Mood: Uncomfortable discovery, loyalty tested.",
        imagePath: "s7_q09.png",
        choices: [
            {
                text: "「やめた方がいい」と伝える。たとえ嫌われても、間違いは指摘すべき。",
                textEN: "Tell them 'you should stop.' Even if it costs the friendship, wrongdoing should be pointed out.",
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。業務上横領は刑法253条、10年以下の懲役。友人は気分を害するかもしれませんが、本当の友人なら忠告を受け入れるはずです。",
                feedbackEN: "Correct. Occupational embezzlement carries up to 10 years' imprisonment under Article 253 of the Penal Code. Your friend may be offended, but a true friend would accept the warning.",
                lockRequirements: { Autonomy: 180 },
                lockedFeedback: "LOCKED: 自律性が180以上必要。周囲に流されず、間違いを指摘する勇気がありません。",
                lockedFeedbackEN: "LOCKED: Autonomy of 180 or higher required. You lack the courage to call out wrongdoing without being swayed by those around you."
            },
            {
                text: "「まあ、その程度なら」と流す。友人関係を壊したくない。",
                textEN: "Brush it off: 'Well, if it's just that much...' You don't want to ruin the friendship.",
                effect: { CS: 10, Asset: 0, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "関係維持を優先しましたが、業務上横領は刑法253条で10年以下の懲役です。あなたも共犯意識を持つことになります。",
                feedbackEN: "You prioritized the relationship, but occupational embezzlement carries up to 10 years' imprisonment under the Penal Code. You'll carry a sense of complicity.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "友情と誠実さ、どちらを選びますか？",
            introEN: "Friendship or integrity. Which do you choose?"
        }
    },

    // Q10: Knowledge (LEGAL) - 2020 Civil Code reform: guarantee limit amount
    {
        id: "s7_q10",
        category: "LEGAL",
        text: "知人の賃貸契約で連帯保証人を頼まれた。契約書に「極度額」という欄がある。何のこと?",
        textEN: "You're asked to be a joint guarantor for an acquaintance's rental contract. The contract has a field called 'maximum liability amount' (極度額). What does it mean?",
        imagePrompt: "Scene: Guarantee contract close-up showing 'maximum amount' field with large number, magnifying glass over fine print, pen hesitating above signature line. Composition: Contract detail dominant, pen as decision point. Mood: Fine print revelation, risk quantified.",
        imagePath: "s7_q10.png",
        choices: [
            {
                text: "よくわからないが、知人のためだからサインする。",
                textEN: "I don't really understand, but I'll sign for my acquaintance's sake.",
                effect: { CS: -20, Asset: -50, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "危険。極度額は「保証人が負う上限額」。極度額が「300万円」なら、家賃滞納・原状回復・損害賠償の合計がその額まで請求されます。",
                feedbackEN: "Dangerous. The maximum liability amount is the 'upper limit of the guarantor's obligation.' If it says '3 million yen,' you can be billed up to that amount for unpaid rent, restoration costs, and damages combined.",
                lockRequirements: null
            },
            {
                text: "極度額(保証上限)の意味を理解し、自分が負えるリスクか慎重に判断する。",
                textEN: "Understand the meaning of the maximum liability amount and carefully assess whether you can bear the risk.",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。2020年民法改正で、極度額が書面にないと保証契約は無効。目安は家賃の6〜24ヶ月分程度ですが、連帯保証人は債務者と同じ責任を負います。",
                feedbackEN: "Correct. Under the 2020 Civil Code revision, guarantee contracts without a written maximum amount are void. Typical amounts are 6-24 months' rent, and joint guarantors bear the same responsibility as the debtor.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。「形だけ」の保証は法的に存在しません。",
            introEN: "Final question. A 'just a formality' guarantee does not exist legally.",
            after: "ステージ7を終了します。審査結果を算出中・・・",
            afterEN: "Stage 7 complete. Calculating assessment results..."
        }
    }
];
