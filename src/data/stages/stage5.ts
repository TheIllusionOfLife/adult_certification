import type { Question } from '../../types';

export const stage5Questions: Question[] = [
    // Q1: Knowledge (HEALTH) - High-cost medical expense system (高額療養費)
    {
        id: "s5_q01",
        category: "HEALTH",
        text: "入院手術で医療費が100万円かかると言われた。貯金は50万円しかない。どうする？",
        textEN: "You're told hospitalization and surgery will cost 1 million yen. You only have 500,000 yen in savings. What do you do?",
        imagePrompt: "Scene: a hospital bill showing 1 million yen; a worried patient; a glowing public insurance card with 'high-cost medical expense system' hint. Composition: despair transforming to hope through knowledge. Mood: crisis, hidden safety net.",
        imagePath: "s5_q01.png",
        choices: [
            {
                text: "貯金を全て使い、足りない分は借金するしかない。",
                textEN: "Use all savings and borrow to cover the rest.",
                effect: { CS: -30, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "無知による損失です。高額療養費制度により、一般所得者の自己負担上限は月約8〜9万円。100万円払う必要はありません。制度を知らないと、不要な借金を背負います。",
                feedbackEN: "A loss caused by ignorance. Under the High-Cost Medical Expense Benefit system (高額療養費制度), the monthly out-of-pocket cap for average earners is about 80,000-90,000 yen. You don't need to pay 1 million yen. Not knowing this system means taking on unnecessary debt.",
                lockRequirements: null
            },
            {
                text: "高額療養費制度を使い、自己負担を上限額に抑える。事前に限度額適用認定証を取得。",
                textEN: "Use the High-Cost Medical Expense Benefit system (高額療養費制度) to cap out-of-pocket costs. Obtain a Limit Application Certificate (限度額適用認定証) in advance.",
                effect: { CS: 15, Asset: 30, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。公的制度を知っているだけで数十万円の差。限度額適用認定証があれば、窓口での支払いも上限額で済みます。",
                feedbackEN: "Correct. Simply knowing this public program saves you hundreds of thousands of yen. With a Limit Application Certificate, even the hospital window payment stays within the cap.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ5を開始します。テーマは「社会保障の羅針盤」。病気、失業、出産・・・公的制度を知らないと詰みます。",
            introEN: "Starting Stage 5. Theme: 'Social Safety Net Compass.' Illness, unemployment, childbirth... Not knowing public programs means game over."
        }
    },

    // Q2: Knowledge (HEALTH) - Injury/illness benefit (傷病手当金)
    {
        id: "s5_q02",
        category: "HEALTH",
        text: "病気で3ヶ月休職することになった。会社員で健康保険に加入中。収入はどうなる？",
        textEN: "You need to take 3 months off work due to illness. You're a company employee enrolled in health insurance. What happens to your income?",
        imagePrompt: "Scene: a person in hospital bed looking worried about bills; paycheck being cut; health insurance card glowing with hidden benefit. Composition: income loss fear vs safety net discovery. Mood: vulnerability, system support.",
        imagePath: "s5_q02.png",
        choices: [
            {
                text: "休職したら給料ゼロ。貯金を切り崩すしかない。",
                textEN: "No work means zero pay. Just burn through savings.",
                effect: { CS: -20, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "制度の見落としです。健康保険の傷病手当金は、給与の約2/3を最長1年6ヶ月支給。申請しないと受け取れませんが、知っていれば収入を確保できます。",
                feedbackEN: "An overlooked benefit. Health insurance's Injury and Sickness Allowance (傷病手当金) pays about 2/3 of your salary for up to 18 months. You must apply to receive it, but knowing means securing income.",
                lockRequirements: null
            },
            {
                text: "傷病手当金を申請する。給与の約2/3が最長1年6ヶ月支給される。",
                textEN: "Apply for Injury and Sickness Allowance (傷病手当金). About 2/3 of your salary is paid for up to 18 months.",
                effect: { CS: 15, Asset: 40, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。会社員の特権である健康保険の傷病手当金。申請主義なので、自分から動かないと受け取れません。退職後も継続受給可能(退職日に労務不能+1年以上の被保険者期間が条件)。",
                feedbackEN: "Correct. The Injury and Sickness Allowance is an employee health insurance benefit. It operates on an application basis — you must act to receive it. You can continue receiving it even after resignation (if incapable of work on your last day + 1 year of continuous enrollment).",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (LABOR) - Education and training benefits (simpler cost, before skills) [SKILL OFFER 1 AFTER] [SWAPPED A↔B]
    {
        id: "s5_q03",
        category: "LABOR",
        text: "スキルアップのため資格学校に通いたいが、費用が50万円かかる。会社員で雇用保険に加入中。",
        textEN: "You want to attend a vocational school to upskill, but it costs 500,000 yen. You're a company employee enrolled in employment insurance.",
        imagePrompt: "Scene: a professional school brochure with price tag; employment insurance card glowing; subsidy calculation showing 70% coverage. Composition: expensive education with hidden support. Mood: career investment, government support discovery.",
        imagePath: "s5_q03.png",
        choices: [
            {
                text: "教育訓練給付金の対象講座か確認し、給付金を申請して受講する。",
                textEN: "Check if it qualifies for the Education and Training Benefit (教育訓練給付金) and apply for the subsidy.",
                effect: { CS: 20, Asset: -15, Autonomy: 10 },
                verdict: "NEUTRAL",
                feedback: "考えに値する選択です。雇用保険加入1年以上（初回）で利用可能。一般は20%、特定一般は40%、専門実践は最大70%給付。ハローワークで事前に相談すれば、対象講座と手続きがわかります。",
                feedbackEN: "A choice worth considering. Available after 1+ year of employment insurance enrollment (first time). General courses get 20%, specified general 40%, and professional practice up to 70% coverage. Pre-consultation at Hello Work clarifies eligible courses and procedures.",
                lockRequirements: null
            },
            {
                text: "まずは独学や無料の教材で学び、必要なら有料講座を検討する。",
                textEN: "Start with self-study and free materials, then consider paid courses if needed.",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "NEUTRAL",
                feedback: "独学も立派な選択。無料のオンライン教材やコミュニティも充実しています。ただし、教育訓練給付金(最大70%給付)という制度の存在は知っておくべき。使うかどうかは状況次第だが、無知で機会を逃すのはもったいない。",
                feedbackEN: "Self-study is a valid choice. Free online resources and communities are plentiful. However, you should at least know about the Education and Training Benefit (up to 70% coverage). Whether to use it depends on circumstances, but missing opportunities due to ignorance is a waste.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。",
            afterEN: "Processing complete. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (HEALTH) - Maternity/paternity leave benefits (simpler, 1 skill) [SWAPPED A↔B]
    {
        id: "s5_q04",
        category: "HEALTH",
        text: "育児休業を取りたいが、「給料が出ないなら取れない」と思っている。",
        textEN: "You want to take parental leave, but think 'If there's no salary, I can't afford it.'",
        imagePrompt: "Scene: new parent with baby looking at finances; employment insurance document showing 67% wage replacement. Composition: misconception vs reality. Mood: worry transforming to possibility.",
        imagePath: "s5_q04.png",
        choices: [
            {
                text: "育児休業給付金（67%→50%）を確認し、生活設計に組み込んで育休を取得する。",
                textEN: "Check the Childcare Leave Benefit (育児休業給付金: 67% then 50%) and incorporate it into your financial plan to take parental leave.",
                effect: { CS: 15, Asset: 30, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。社会保険料も免除されるため、実質的な手取り差は縮まります。制度を理解すれば、育児と仕事の両立が可能になります。",
                feedbackEN: "Correct. Social insurance premiums are also waived during leave, so the actual take-home difference narrows. Understanding the system makes balancing childcare and work possible.",
                lockRequirements: null
            },
            {
                text: "給料が出ないなら育休は取れない。すぐ復帰するしかない。",
                textEN: "If there's no pay, I can't take leave. I'll have to go back to work immediately.",
                effect: { CS: 10, Asset: 0, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "制度の誤解です。育児休業給付金は、最初の6ヶ月は給与の67%、以降50%が雇用保険から支給されます。「無収入」ではありません。",
                feedbackEN: "A misunderstanding of the system. The Childcare Leave Benefit pays 67% of salary for the first 6 months, then 50%, funded by employment insurance. It's not 'zero income.'",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (HEALTH) - Proper response to infectious disease
    {
        id: "s5_q05",
        category: "HEALTH",
        text: "インフルエンザと診断された。明日は重要な会議。どうする?",
        textEN: "You've been diagnosed with influenza. There's an important meeting tomorrow. What do you do?",
        imagePrompt: "Scene: Thermometer showing fever, phone showing calendar with important meeting marked, flu medication on nightstand, mask hanging on door handle. Composition: Sick room with work pressure visible through phone. Mood: Duty vs responsibility to others.",
        imagePath: "s5_q05.png",
        choices: [
            {
                text: "同僚にインフルエンザのことは黙って出社する。マスクをすれば大丈夫。",
                textEN: "Go to work without telling colleagues about the flu. A mask should be enough.",
                effect: { CS: -30, Asset: 0, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "最悪の選択。職場全体に感染が広がり、プロジェクト全体が停止するリスク。感染症を隠して出社するのは「頑張り」ではなく「迷惑」。報告と休養が社会人の義務。",
                feedbackEN: "The worst choice. You risk spreading the infection across the entire workplace, shutting down the project. Hiding an infectious disease to show up is not 'dedication' — it's irresponsible. Reporting and resting is a professional obligation.",
                lockRequirements: null
            },
            {
                text: "テレワークか欠席を提案し、回復に専念する。上司に状況を説明して会議の代理を依頼する。",
                textEN: "Propose remote work or absence and focus on recovery. Explain the situation to your supervisor and arrange a substitute for the meeting.",
                effect: { CS: 15, Asset: 0, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解。インフルエンザは発症後5日かつ解熱後2日の出席停止が目安(学校保健安全法準拠、企業も多くが準用)。テレワークで体調が許す範囲の対応は合理的。同僚への感染防止が社会人としての責任。",
                feedbackEN: "Correct. The guideline for influenza is 5 days after onset and 2 days after fever breaks (per the School Health and Safety Act, adopted by many companies). Remote work within your capacity is reasonable. Preventing spread to colleagues is a professional responsibility.",
                lockRequirements: null
            }
        ]
    },

    // Q6: Knowledge (LABOR) - Unemployment insurance (medium damage, 1 skill helps) [SWAPPED A↔B]
    {
        id: "s5_q06",
        category: "LABOR",
        text: "会社を辞めた。ハローワークで「失業保険」の手続きを聞かれた。自己都合退職だと不利？",
        textEN: "You quit your job. At Hello Work, you're asked about unemployment insurance (失業保険) procedures. Is voluntary resignation disadvantageous?",
        imagePrompt: "Scene: Unemployment office waiting room ticket in hand, number display showing current serving, application forms on clipboard, other job seekers visible as silhouettes. Composition: Ticket number close-up, waiting room atmosphere. Mood: Bureaucratic limbo, transition state.",
        imagePath: "s5_q06.png",
        choices: [
            {
                text: "申請する。自己都合でも給付制限期間後に受給できる。待機中は就職活動を進める。",
                textEN: "Apply. Even with voluntary resignation, benefits are available after the restriction period. Use the waiting period for job hunting.",
                effect: { CS: 15, Asset: 30, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。自己都合退職の給付制限は原則2ヶ月(5年以内に2回まで、3回目以降は3ヶ月)。制限期間は転職準備に充て、制限明けから受給。早期再就職なら「再就職手当」(残日数の60〜70%)も。制度を理解して計画的に動くことが大切です。",
                feedbackEN: "Correct. The benefit restriction for voluntary resignation is generally 2 months (for the first 2 times within 5 years; 3 months from the 3rd time). Use the restriction period for job prep, then start receiving benefits. For early re-employment, the 'Re-employment Allowance' (60-70% of remaining benefit days) is also available. Understanding the system and planning ahead matters.",
                lockRequirements: null
            },
            {
                text: "自己都合だと失業保険はもらえないと思い、申請しない。",
                textEN: "Assume voluntary resignation disqualifies you from unemployment insurance and don't apply.",
                effect: { CS: -20, Asset: 0, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "大損です。自己都合退職でも一定期間後に受給可能。申請しないのは権利の放棄です。",
                feedbackEN: "A major loss. Even with voluntary resignation, you can receive benefits after a waiting period. Not applying means surrendering your rights.",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (HEALTH) - Accessing mental health support
    {
        id: "s5_q07",
        category: "HEALTH",
        text: "最近、眠れない日が続き、仕事に集中できない。「自分は弱いだけ」と思っているが・・・",
        textEN: "You haven't been able to sleep lately and can't focus at work. You think 'I'm just weak,' but...",
        imagePrompt: "Scene: Dark bedroom at 3 AM, phone screen illuminating the space showing mental health clinic search results, untouched sleeping pills on nightstand, rumpled sheets. Composition: Phone glow is only light source, isolation palpable. Mood: Exhaustion, small step toward help.",
        imagePath: "s5_q07.png",
        choices: [
            {
                text: "気合で乗り切る。病院に行くほどではない。",
                textEN: "Push through with willpower. It's not serious enough for a doctor.",
                effect: { CS: 0, Asset: 0, Autonomy: -40 },
                verdict: "WARNING",
                feedback: "危険な思考です。メンタルヘルスの問題を放置すると、悪化して長期休職に追い込まれます。「まだ大丈夫」は「もう限界」のサインかもしれません。",
                feedbackEN: "Dangerous thinking. Ignoring mental health problems leads to worsening conditions and long-term leave. 'I'm still fine' may actually mean 'I've already reached my limit.'",
                lockRequirements: null
            },
            {
                text: "心療内科を予約する。早期受診が重症化を防ぐ。",
                textEN: "Book an appointment at a psychosomatic medicine clinic. Early treatment prevents escalation.",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。メンタルヘルスケアは「弱さ」ではなく「自己管理能力」。自立支援医療制度を使えば、医療費負担も軽減できます。",
                feedbackEN: "Correct. Mental healthcare is not 'weakness' — it's self-management. Using the Self-Support Medical Care system (自立支援医療制度) can also reduce medical costs.",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。「助けを求める」という発想自体が浮かばない状態です。",
                lockedFeedbackEN: "LOCKED: Autonomy of 150 or higher required. The very idea of 'asking for help' doesn't cross your mind."
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

    // Q8: Knowledge (HEALTH) - Childbirth lump sum payment (biggest damage, 2 skills help)
    {
        id: "s5_q08",
        category: "HEALTH",
        text: "妊娠が発覚。出産費用は約50万円と聞いた。どう準備すべき？",
        textEN: "You've learned you're expecting. Childbirth costs about 500,000 yen. How should you prepare?",
        imagePrompt: "Scene: expecting couple looking at hospital bills; a health insurance document showing '500,000 yen benefit' glowing. Composition: financial worry transforming to relief. Mood: life milestone, public support.",
        imagePath: "s5_q08.png",
        choices: [
            {
                text: "50万円を貯めるか、借りるしかない。",
                textEN: "Save up 500,000 yen or borrow it.",
                effect: { CS: -10, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "制度の見落としです。出産育児一時金（50万円）が健康保険から支給されます。直接支払制度を使えば、窓口負担はほぼゼロにできます。知らなかったために50万円を自己負担しました。",
                feedbackEN: "An overlooked benefit. The Lump-Sum Childbirth and Childcare Allowance (出産育児一時金: 500,000 yen) is paid from health insurance. Using the direct payment system, your out-of-pocket cost at the hospital is nearly zero. Not knowing cost you 500,000 yen.",
                lockRequirements: null
            },
            {
                text: "出産育児一時金（50万円）の直接支払制度を使い、自己負担を最小化する。",
                textEN: "Use the Lump-Sum Childbirth and Childcare Allowance (出産育児一時金: 500,000 yen) with the direct payment system to minimize out-of-pocket costs.",
                effect: { CS: 15, Asset: 50, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。出産は「病気ではない」ため保険適用外ですが、一時金で実質カバーされます。制度を知れば、出産のハードルは下がります。",
                feedbackEN: "Correct. Childbirth is 'not an illness' so it's not covered by insurance, but the lump-sum allowance effectively covers it. Knowing the system lowers the barrier to starting a family.",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (HEALTH) - Apply for welfare vs pride
    {
        id: "s5_q09",
        category: "HEALTH",
        text: "失業が長引き、貯金も底をついた。生活保護の申請を勧められたが、「恥ずかしい」と感じる。",
        textEN: "Unemployment drags on and your savings are gone. Someone recommends applying for public assistance (生活保護), but you feel ashamed.",
        imagePrompt: "Scene: Open refrigerator showing nearly empty shelves, stack of unpaid utility bills on counter, welfare application form partially visible, last few coins in open wallet. Composition: Empty fridge dominates, desperation visible in details. Mood: Rock bottom, pride vs survival.",
        imagePath: "s5_q09.png",
        choices: [
            {
                text: "生活保護は最後の手段。親戚に頭を下げて借金する。",
                textEN: "Welfare is a last resort. Swallow your pride and borrow from relatives.",
                effect: { CS: -20, Asset: 20, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "プライドを守る選択です。しかし、借金は返済義務が発生し、親戚関係も複雑になります。「援助」ではなく「負債」を選びました。",
                feedbackEN: "A choice that protects your pride. However, borrowing creates repayment obligations and complicates family relationships. You chose 'debt' instead of 'assistance.'",
                lockRequirements: null
            },
            {
                text: "生活保護を申請する。困窮時の公的支援は権利であり、恥ではない。",
                textEN: "Apply for public assistance (生活保護). Public support during hardship is a right, not a shame.",
                effect: { CS: 0, Asset: 30, Autonomy: 0 },
                verdict: "NEUTRAL",
                feedback: "合理的な選択です。生活保護は「税金で生きる」のではなく「再起するための一時的支援」。制度を使って立て直すことは、自立への第一歩です。",
                feedbackEN: "A rational choice. Public assistance isn't 'living off taxes' — it's 'temporary support for getting back on your feet.' Using the system to rebuild is the first step toward self-reliance.",
                lockRequirements: { Autonomy: 180 },
                lockedFeedback: "LOCKED: 自律性が180以上必要。「恥ずかしい」という感情に支配され、権利を行使する自律性がありません。",
                lockedFeedbackEN: "LOCKED: Autonomy of 180 or higher required. You're controlled by the feeling of 'shame' and lack the autonomy to exercise your rights."
            }
        ],
        adamDialogue: {
            intro: "プライドと生存、どちらを選びますか？",
            introEN: "Which do you choose: pride or survival?"
        }
    },

    // Q10: Philosophy (HEALTH) - 退職後の健康保険選択
    {
        id: "s5_q10",
        category: "HEALTH",
        text: "退職して無職になった。健康保険の選択肢は「任意継続（2年限定、保険料は退職時の約2倍）」か「国民健康保険（前年所得ベース、減免制度あり）」。どちらを選ぶべきか？",
        textEN: "You've resigned and are now unemployed. Your health insurance options are: 'Voluntary Continuation (任意継続: 2-year limit, premiums roughly double)' or 'National Health Insurance (国民健康保険: based on prior-year income, with reduction programs).' Which should you choose?",
        imagePrompt: "Scene: Kitchen table with two insurance documents side by side, calculator showing different premium amounts, calendar marking 20-day deadline, coffee cup half empty. Composition: Documents dominate, numbers visible on both. Mood: Critical decision window, money at stake.",
        imagePath: "s5_q10.png",
        choices: [
            {
                text: "任意継続を選ぶ。退職前と同じ保険証が使え、扶養家族がいれば追加保険料なしでカバーできる。",
                textEN: "Choose Voluntary Continuation. You keep the same insurance card, and dependents are covered at no extra premium.",
                effect: { CS: 10, Asset: -30, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "継続性を重視した回答です。任意継続は最大2年間、会社負担分も自己負担になるため保険料は約2倍。扶養家族ありなら任意継続有利(追加保険料なし)。退職後20日以内に手続き必須。",
                feedbackEN: "A continuity-focused answer. Voluntary Continuation lasts up to 2 years, with premiums roughly doubling since you now pay the employer's share too. With dependents, it's advantageous (no additional premium). Must be applied for within 20 days of leaving.",
                lockRequirements: null
            },
            {
                text: "国民健康保険を選ぶ。失業中なら減免申請で保険料が下がる可能性がある。",
                textEN: "Choose National Health Insurance. If unemployed, premium reduction programs may lower costs.",
                effect: { CS: 10, Asset: -20, Autonomy: 10 },
                verdict: "NEUTRAL",
                feedback: "状況に応じた回答です。単身+前年収入低なら国保減免有利。国保には「扶養」がなく家族分の保険料が発生するが、失業減免を使えば大幅に安くなることも。退職後20日以内に任意継続の手続き期限あり。両方を試算して比較すれば、年間数十万円の差が出ます。",
                feedbackEN: "A situational answer. If single with low prior income, NHI with reductions is favorable. NHI has no 'dependent' concept so family members incur separate premiums, but unemployment reductions can make it much cheaper. The Voluntary Continuation deadline is 20 days after leaving. Comparing both calculations can mean a difference of hundreds of thousands of yen per year.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。知っているだけで数十万円の差がつく領域があります。",
            introEN: "Final question. There are areas where simply 'knowing' makes a difference of hundreds of thousands of yen.",
            after: "ステージ5を終了します。審査結果を算出中・・・",
            afterEN: "Stage 5 complete. Calculating assessment results..."
        }
    }
];
