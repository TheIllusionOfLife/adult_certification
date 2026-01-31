import type { Question } from '../../types';

export const stage3Questions: Question[] = [
    // Q1: Knowledge (FINANCE) - Compound interest basics + NISA intro [SWAPPED A↔B]
    {
        id: "s3_q01",
        category: "FINANCE",
        text: "先輩から「若いうちからNISAで積立投資しろ。複利の力が味方になる」と言われた。複利とは?",
        textEN: "A senior colleague told you: 'Start investing through NISA while you're young. Compound interest will work in your favor.' What is compound interest?",
        imagePrompt: "Scene: Calculator on desk showing computation, notebook with hand-drawn graph showing diverging lines (straight vs curved upward), 10-year timeline written with arrows. Composition: Calculator and notebook fill frame, mathematical revelation. Mood: Hidden power of numbers revealed.",
        imagePath: "s3_q01.png",
        choices: [
            {
                text: "複利が増える。「利息に利息がつく」から時間とともに差が開く。",
                textEN: "Compound interest grows because 'interest earns interest,' so the gap widens over time.",
                effect: { CS: 10, Asset: 20, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。10年で4万円差、30年で約40万円差。複利は「時間を味方につける」技術です。NISAなら年間360万円(生涯1800万円)まで運用益が非課税。若いうちから始めるほど複利の恩恵は大きくなります。",
                feedbackEN: "Correct. A 40,000 yen difference in 10 years, about 400,000 yen in 30. Compound interest is the technique of 'making time your ally.' With NISA, investment gains up to 3.6 million yen/year (lifetime cap: 18 million yen) are tax-free. The earlier you start, the greater the benefit.",
                lockRequirements: null
            },
            {
                text: "単利も複利も同じ。年利3%なら毎年3万円増えるだけ。",
                textEN: "Simple and compound interest are the same. At 3% annual interest, you just earn 30,000 yen each year.",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "誤りです。単利は130万円、複利は約134万円。「利息に利息がつく」効果を理解していないと、長期資産形成で損をします。NISAは年間360万円(生涯1800万円)まで運用益非課税。複利+非課税の力を知らないのは大きな機会損失です。",
                feedbackEN: "Incorrect. Simple interest yields 1.3 million yen; compound interest yields about 1.34 million. Without understanding 'interest on interest,' you lose out in long-term wealth building. NISA provides tax-free investment gains up to 3.6 million yen/year (lifetime: 18 million). Not knowing the power of compound interest + tax exemption is a major missed opportunity.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ3を開始します。テーマは「金の基礎」。複利、税金、借金の罠・・・お金のリテラシーを試します。",
            introEN: "Starting Stage 3. Theme: 'Money Fundamentals.' Compound interest, taxes, debt traps... Testing your financial literacy."
        }
    },

    // Q2: Knowledge (TAX) - Housing tax time lag [SWAPPED A↔B]
    {
        id: "s3_q02",
        category: "TAX",
        text: "4月に新卒入社。12月の給与明細を見ると「住民税」が引かれていない。翌年6月、突然「住民税の請求」が届いた。",
        textEN: "You started your first job in April. Your December payslip shows no resident tax (住民税) deducted. Then in June the following year, you suddenly receive a resident tax bill.",
        imagePrompt: "Scene: a payslip with missing tax line highlighted; calendar showing April to June next year; a shocked worker receiving a bill. Composition: time progression with delayed consequence revealed. Mood: confusion, system ambush, hidden rules.",
        imagePath: "s3_q02.png",
        choices: [
            {
                text: "「住民税は翌年課税」を思い出し、2年目は手取りが減ることを予算に組み込む。",
                textEN: "Remember that 'resident tax is billed the following year' and budget for the reduced take-home pay in your second year.",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。1年目は住民税ゼロで手取りが多く感じるが、2年目6月から天引き開始。手取り減少ショックに備え、1年目のうちに差額分を貯蓄しておくべき。税の仕組みを知る者だけが備えられます。",
                feedbackEN: "Correct. In year one, with no resident tax, take-home pay feels high. But payroll deductions start in June of year two. Prepare for the pay cut by saving the difference during your first year. Only those who understand the tax system can plan ahead.",
                lockRequirements: null
            },
            {
                text: "会社のミスだと思い、経理に抗議する。",
                textEN: "Assume it's a company error and complain to accounting.",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "無知の露呈です。住民税は「前年の所得に基づく翌年6月〜課税」。新卒1年目は前年所得ゼロで非課税、2年目6月から課税開始。これは仕様です。",
                feedbackEN: "This exposes your ignorance. Resident tax is 'based on the previous year's income, billed from June of the following year.' In your first year, prior income is zero so no tax is charged. Billing starts in June of year two. This is by design.",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (FINANCE) - Credit information (CIC/信用情報) [SKILL OFFER 1 AFTER] [SWAPPED A↔B]
    {
        id: "s3_q03",
        category: "FINANCE",
        text: "クレジットカードの審査に落ちた。理由を知りたいが、自分の「信用情報」はどこで確認できる？",
        textEN: "Your credit card application was rejected. You want to know why. Where can you check your credit information (信用情報)?",
        imagePrompt: "Scene: a rejected credit card application; CIC/JICC logos glowing; a person's credit history visualized as a report card. Composition: credit score concept with accessible information path. Mood: rejection turning to empowerment through knowledge.",
        imagePath: "s3_q03.png",
        choices: [
            {
                text: "信用情報は企業秘密だから、本人でも見られないはず。",
                textEN: "Credit information is a trade secret. Even the individual can't see it.",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "誤りです。CIC、JICC、全国銀行協会に開示請求すれば、自分の信用情報を確認できます。延滞や債務整理の記録は5〜10年残り、審査に影響します。知らないと対策できません。",
                feedbackEN: "Wrong. You can request disclosure from CIC, JICC, or the Japanese Bankers Association to check your own credit information. Records of late payments or debt restructuring remain for 5-10 years and affect future screenings. You can't fix what you don't know.",
                lockRequirements: null
            },
            {
                text: "CICなどの信用情報機関に開示請求し、自分の信用履歴を確認する。",
                textEN: "Request disclosure from a credit information agency like CIC and check your credit history.",
                effect: { CS: 20, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。開示手数料は約1,000円。過去の延滞や強制解約が記録されていれば原因が判明します。情報を知ることが、信用回復の第一歩です。",
                feedbackEN: "Correct. The disclosure fee is about 1,000 yen. If past late payments or forced cancellations are on record, the cause becomes clear. Knowing is the first step to rebuilding credit.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。",
            afterEN: "Processing complete. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (FINANCE) - Housing loan rate selection (judgment)
    {
        id: "s3_q04",
        category: "FINANCE",
        text: "住宅ローン。金利は変動金利と固定金利どちらにする?",
        textEN: "Taking out a mortgage. Should you choose a variable or fixed interest rate?",
        imagePrompt: "Scene: Real estate office consultation room, bank pamphlets spread across glass table, loan officer's hands gesturing at rate comparison chart on tablet screen. Composition: Glass table reflection, tablet glow, professional setting. Mood: Guidance sought, numbers on display.",
        imagePath: "s3_q04.png",
        choices: [
            {
                text: "知り合いがおすすめしたほうにする。",
                textEN: "Go with whatever an acquaintance recommended.",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "他人任せの判断。変動金利は低金利だが将来の上昇リスクあり、固定金利は安定だが割高。収入の安定性、返済期間、金利上昇時の余力を自分で評価すべき。人生最大の借金を他人の一言で決めるのは危険。",
                feedbackEN: "Delegating the decision to someone else. Variable rates are lower but carry risk of increase; fixed rates are stable but more expensive. You should evaluate your income stability, loan term, and capacity for rate increases yourself. Deciding your biggest lifetime debt on someone else's word is dangerous.",
                lockRequirements: null
            },
            {
                text: "自分で調べて、メリットとデメリットを比較して、自分たちの状況を踏まえて判断する。",
                textEN: "Research it yourself, compare pros and cons, and decide based on your own situation.",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。変動金利(0.4〜0.7%)は低金利だが上昇リスク、固定金利(2%前後)は安定だが割高。3000万円35年で金利1%の差は約600万円。収入・家族構成・リスク許容度で正解は変わる。団信(団体信用生命保険)の条件も要チェック。",
                feedbackEN: "Correct. Variable rate (0.4-0.7%) is low but carries risk; fixed rate (around 2%) is stable but costly. A 1% difference on a 30-million-yen, 35-year loan equals about 6 million yen. The right answer depends on your income, family situation, and risk tolerance. Also check the terms of group credit life insurance (団信).",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (FINANCE) - iDeCo/NISA vs savings only
    {
        id: "s3_q05",
        category: "FINANCE",
        text: "老後資金を準備したい。iDeCoとNISA、どちらを優先すべき？月の投資可能額は2万円。",
        textEN: "You want to prepare for retirement. Should you prioritize iDeCo or NISA? Your monthly investable amount is 20,000 yen.",
        imagePrompt: "Scene: Financial seminar room after hours, whiteboard with retirement calculations still visible, two different brochures left on attendee chair, notebook with personal notes. Composition: Empty seminar room, learning remnants. Mood: Education absorbed, decision pending.",
        imagePath: "s3_q05.png",
        choices: [
            {
                text: "NISAかiDeCoを活用する。非課税制度を使って資産形成を始める。",
                textEN: "Use NISA or iDeCo. Start building assets through tax-exempt programs.",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。NISAは年間360万円まで運用益非課税、いつでも引き出し可能。iDeCoは所得控除で節税効果あり(年収400万なら年約2.4万円節税)、ただし60歳まで引き出せない。両制度の特性を理解して使い分けるのが賢明。",
                feedbackEN: "Correct. NISA provides tax-free gains on up to 3.6 million yen/year and allows withdrawals anytime. iDeCo offers income tax deduction benefits (about 24,000 yen/year saved at 4 million yen income), but funds are locked until age 60. Understanding both programs and using them strategically is wise.",
                lockRequirements: null
            },
            {
                text: "投資は怖いので、貯金だけにする。",
                textEN: "Investing is scary, so I'll just save in the bank.",
                effect: { CS: -10, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "インフレで貯金は実質目減りする。年2%のインフレなら100万円は10年後に実質約82万円の価値に。非課税制度(NISA・iDeCo)を使わない機会損失は大きい。投資しないリスクも理解すべき。",
                feedbackEN: "Inflation erodes savings. At 2% annual inflation, 1 million yen is worth only about 820,000 yen in 10 years. The opportunity cost of not using tax-exempt programs (NISA/iDeCo) is enormous. Understand that not investing is also a risk.",
                lockRequirements: null
            }
        ]
    },

    // Q6: Knowledge (FINANCE) - Insurance over-buying trap [SWAPPED A↔B]
    {
        id: "s3_q06",
        category: "FINANCE",
        text: "保険の営業から「万が一に備えて」と医療保険、がん保険、生命保険のセット加入を勧められた。月額2万円。",
        textEN: "An insurance salesperson urges you to sign up for medical, cancer, and life insurance as a bundle 'just in case.' Monthly premium: 20,000 yen.",
        imagePrompt: "Scene: an insurance salesperson with charts showing worst-case scenarios; a young person overwhelmed by multiple policy documents; public health insurance card glowing in corner. Composition: fear-based selling vs rational assessment. Mood: pressure, overprotection trap.",
        imagePath: "s3_q06.png",
        choices: [
            {
                text: "公的保険（高額療養費制度等）を確認し、本当に必要な保障だけを選ぶ。",
                textEN: "Review public insurance (High-Cost Medical Expense Benefit, etc.) and choose only the coverage you truly need.",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。公的保険を理解した上で「足りない部分だけ」民間保険で補う。保険は「安心」ではなく「確率とコストの計算」です。",
                feedbackEN: "Correct. Understand public insurance first, then fill only the gaps with private insurance. Insurance isn't 'peace of mind.' It's a calculation of probability and cost.",
                lockRequirements: null
            },
            {
                text: "「万が一」が怖いので、勧められるまま全部加入する。",
                textEN: "Fear of 'what if' wins. Sign up for everything as recommended.",
                effect: { CS: 0, Asset: -40, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "過剰防衛です。日本には高額療養費制度があり、医療費の自己負担には上限があります。恐怖で売り込まれると、不要な保険料を払い続けることになります。",
                feedbackEN: "Over-insurance. Japan's High-Cost Medical Expense Benefit system caps out-of-pocket medical costs. Buying out of fear means paying unnecessary premiums indefinitely.",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (FINANCE) - High-interest debt trap recognition [SWAPPED A↔B]
    {
        id: "s3_q07",
        category: "FINANCE",
        text: "「今すぐ30万円必要」。消費者金融のCMが目に入る。「30日間無利息」「審査は最短30分」。",
        textEN: "You urgently need 300,000 yen. A consumer finance ad catches your eye: '30 days interest-free!' 'Approval in as fast as 30 minutes!'",
        imagePrompt: "Scene: a glowing ATM with 'EASY CASH' sign; fine print forming chains; a clock showing '30 days free' turning into debt spiral; protagonist at crossroads. Composition: temptation vs hidden consequence. Mood: desperation, trap disguised as help.",
        imagePath: "s3_q07.png",
        choices: [
            {
                text: "まず「なぜ30万円必要か」を再検討し、他の手段（分割払い交渉、家族相談）を探る。",
                textEN: "First reconsider 'why do I need 300,000 yen?' and explore alternatives (negotiate installments, consult family).",
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。高金利借入は「最後の手段」。借りる前に「本当に必要か」「他に方法はないか」を考える習慣が、破滅を防ぎます。",
                feedbackEN: "Correct. High-interest borrowing is a 'last resort.' The habit of asking 'Is this truly necessary?' and 'Are there other options?' before borrowing prevents financial ruin.",
                lockRequirements: { Autonomy: 130 },
                lockedFeedback: "LOCKED: 自律性が130以上必要。焦りと欲求に支配され、「他の選択肢を探す」という発想が浮かびません。",
                lockedFeedbackEN: "LOCKED: Autonomy of 130 or higher required. Consumed by urgency and impulse, the idea of 'exploring other options' doesn't even occur to you."
            },
            {
                text: "「30日無利息なら大丈夫」と借りる。",
                textEN: "Borrow it. '30 days interest-free should be fine.'",
                effect: { CS: 0, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "罠にはまりました。30日で返せなければ年利18%。30万円が半年で約3万円の利息に。「簡単に借りられる」は「簡単に搾取される」と同義です。",
                feedbackEN: "You fell into the trap. If you can't repay in 30 days, the annual rate is 18%. 300,000 yen generates about 30,000 yen in interest over six months. 'Easy to borrow' means 'easy to be exploited.'",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの判断を記録します。",
            introEN: "A critical turning point. Recording your judgment.",
            after: "データを記録しました。スキル選択に進みます。",
            afterEN: "Data recorded. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (FINANCE) - Student loan repayment relief (奨学金返済) [SWAPPED A↔B]
    {
        id: "s3_q08",
        category: "FINANCE",
        text: "就職したが給料が低く、奨学金の返済が厳しい。毎月の返済額は約15,000円。どう対応すべき？",
        textEN: "You're employed but your salary is low, making student loan repayment tough. Monthly payment is about 15,000 yen. What should you do?",
        imagePrompt: "Scene: Cramped apartment room, pay stub pinned to corkboard alongside student loan notice, laptop showing JASSO relief application page, instant noodles on desk. Composition: Lived-in small space, financial squeeze visible in details. Mood: Tight budget lifestyle, help available online.",
        imagePath: "s3_q08.png",
        choices: [
            {
                text: "JASSOに連絡し、「減額返還」か「返還期限猶予」を申請する。",
                textEN: "Contact JASSO and apply for 'Reduced Repayment' (減額返還) or 'Repayment Deferment' (返還期限猶予).",
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。年収300万円以下なら「減額返還」で月額を1/2〜1/3に、「返還期限猶予」で最長10年間返済を止められます。制度を知らないだけで人生が詰む人がいます。困ったら、まず相談です。",
                feedbackEN: "Correct. If your annual income is under 3 million yen, 'Reduced Repayment' can cut monthly payments to 1/2 or 1/3, and 'Repayment Deferment' can pause payments for up to 10 years. Some people's lives derail simply because they didn't know these programs existed. When in trouble, consult first.",
                lockRequirements: null
            },
            {
                text: "払えないものは払えない。しばらく無視して様子を見る。",
                textEN: "Can't pay what I can't pay. Ignore it for a while and see what happens.",
                effect: { CS: -20, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "最悪の選択です。延滞3ヶ月で個人信用情報機関に登録（ブラックリスト）。9ヶ月で一括請求。さらに給与差押えの可能性も。無視は問題を数十倍に膨らませます。",
                feedbackEN: "The worst choice. After 3 months of non-payment, you're registered with credit agencies (blacklisted). At 9 months, a lump-sum demand is issued. Wage garnishment is also possible. Ignoring the problem magnifies it tenfold.",
                lockRequirements: null
            }
        ]
    },

    // Q9: Knowledge (FINANCE) - One-room apartment investment solicitation
    {
        id: "s3_q09",
        category: "FINANCE",
        text: "聞いたことのある不動産会社からワンルームマンション投資の案内のチラシが届いた。",
        textEN: "A flyer arrives from a well-known real estate company promoting one-room apartment investment.",
        imagePrompt: "Scene: Real estate investment flyer on kitchen table showing luxury apartment rendering with glossy returns chart, fine print barely visible, smartphone showing negative reviews of similar schemes. Composition: Glossy flyer vs reality check on phone. Mood: Tempting surface, hidden risk.",
        imagePath: "s3_q09.png",
        choices: [
            {
                text: "不労所得は大事だから、不動産会社のおすすめにそって投資をはじめる。",
                textEN: "Passive income is important, so follow the real estate company's recommendation and start investing.",
                effect: { CS: -20, Asset: -50, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "危険。ワンルームマンション投資は空室リスク、修繕費、管理費、固定資産税を考慮すると利回りが大幅に下がる。「サブリース契約で安心」も解約トラブル多発。不動産会社は売った時点で利益確定、リスクは買主が負う。",
                feedbackEN: "Dangerous. When you factor in vacancy risk, repair costs, management fees, and property tax, the return on one-room apartment investment drops significantly. 'Sublease contract for security' also has frequent cancellation disputes. The real estate company locks in profit at the point of sale. You bear the risk.",
                lockRequirements: null
            },
            {
                text: "自分でしっかり調べて理解してから対応する。利回り計算、空室リスク、管理費、修繕積立金など、見えないコストを把握してから判断。",
                textEN: "Do thorough research before acting. Understand yield calculations, vacancy risk, management fees, repair reserves, and other hidden costs before deciding.",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。表面利回りと実質利回りの差、サブリース契約の解約リスク、築年数による資産価値の下落。投資判断は自分の責任。営業マンは売る側。「不労所得」の甘い言葉の裏にあるリスクを理解してから動く。",
                feedbackEN: "Correct. The gap between gross and net yield, sublease cancellation risk, and asset depreciation with building age. Investment decisions are your responsibility. The salesperson is on the selling side. Understand the risks behind the sweet promise of 'passive income' before making a move.",
                lockRequirements: { Asset: 140 },
                lockedFeedback: "LOCKED: 資産が140以上必要。投資判断には十分な資産基盤が必要です。",
                lockedFeedbackEN: "LOCKED: Asset of 140 or higher required. Sound investment decisions require a solid financial foundation."
            }
        ]
    },

    // Q10: Knowledge (FINANCE) - Social insurance income walls
    {
        id: "s3_q10",
        category: "FINANCE",
        text: "配偶者がパートで年収を増やしたいと言っている。「103万円を超えると損する」と聞いたが本当?",
        textEN: "Your spouse wants to increase their part-time income. You've heard 'earning over 1.03 million yen means you lose money.' Is that true?",
        imagePrompt: "Scene: Kitchen table with salary calculation notes, tax threshold chart drawn by hand, two pay stubs side by side, calculator showing different scenarios. Composition: Handwritten calculations dominate, practical household finance. Mood: Family budget strategy, hidden thresholds.",
        imagePath: "s3_q10.png",
        choices: [
            {
                text: "103万円以下に抑えるのが一番得。",
                textEN: "Keeping it under 1.03 million yen is the smartest move.",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "壁の種類を混同。従来103万円は所得税発生ラインでしたが、税制改正により段階的に引き上げが進んでいます（2025年時点で123万円、さらに178万円への引き上げが与野党間で合意済み）。106万円は社会保険加入ライン、130万円は扶養から外れるライン。世帯全体の収入で判断すべきです。",
                feedbackEN: "You're confusing different thresholds. The 1.03 million yen income tax threshold has been gradually raised through tax reform (1.23 million as of 2025, with cross-party agreement to raise it to 1.78 million). The 1.06 million yen wall triggers social insurance enrollment; the 1.3 million yen wall removes dependent status. Decisions should be based on total household income.",
                lockRequirements: null
            },
            {
                text: "103万/106万/130万の壁の違いを理解し、世帯全体の収入で判断する。",
                textEN: "Understand the differences between the 1.03M / 1.06M / 1.3M yen thresholds and decide based on total household income.",
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。壁の影響は家族構成・勤務先規模で異なる。所得税の非課税ライン（税制改正で段階的に引き上げ中）、106万円の壁(従業員51人以上の企業で社会保険加入)、130万円の壁(社会保険の扶養外れ)。150万・201万円は配偶者特別控除の段階的減少。最新の税制改正を確認し、世帯全体で試算する習慣が重要。",
                feedbackEN: "Correct. The impact of each threshold varies by family structure and employer size. The income tax exemption line (being raised incrementally through tax reform), the 1.06M wall (social insurance enrollment at companies with 51+ employees), and the 1.3M wall (loss of dependent status). The 1.5M and 2.01M thresholds mark gradual reduction of the spousal special deduction. Always check the latest tax reforms and calculate as a household.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。「知っているか」で家計が大きく変わる領域です。",
            introEN: "Final question. This is an area where 'whether you know' dramatically changes your household finances.",
            after: "ステージ3を終了します。審査結果を算出中・・・",
            afterEN: "Stage 3 complete. Calculating assessment results..."
        }
    }
];
