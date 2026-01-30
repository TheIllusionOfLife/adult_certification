import type { Question } from '../../types';

export const stage3Questions: Question[] = [
    // Q1: Knowledge (FINANCE) - Compound interest basics + NISA intro [SWAPPED A↔B]
    {
        id: "s3_q01",
        category: "FINANCE",
        text: "先輩から「若いうちからNISAで積立投資しろ。複利の力が味方になる」と言われた。複利とは?",
        imagePrompt: "Scene: Calculator on desk showing computation, notebook with hand-drawn graph showing diverging lines (straight vs curved upward), 10-year timeline written with arrows. Composition: Calculator and notebook fill frame, mathematical revelation. Mood: Hidden power of numbers revealed.",
        imagePath: "s3_q01.png",
        choices: [
            {
                text: "複利が増える。「利息に利息がつく」から時間とともに差が開く。",
                effect: { CS: 10, Asset: 20, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。10年で4万円差、30年で約40万円差。複利は「時間を味方につける」技術です。NISAなら年間360万円(生涯1800万円)まで運用益が非課税。若いうちから始めるほど複利の恩恵は大きくなります。",
                lockRequirements: null
            },
            {
                text: "単利も複利も同じ。年利3%なら毎年3万円増えるだけ。",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "誤りです。単利は130万円、複利は約134万円。「利息に利息がつく」効果を理解していないと、長期資産形成で損をします。NISAは年間360万円(生涯1800万円)まで運用益非課税。複利+非課税の力を知らないのは大きな機会損失です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ3を開始します。テーマは「金の基礎」。複利、税金、借金の罠・・・お金のリテラシーを試します。"
        }
    },

    // Q2: Knowledge (TAX) - Housing tax time lag [SWAPPED A↔B]
    {
        id: "s3_q02",
        category: "TAX",
        text: "4月に新卒入社。12月の給与明細を見ると「住民税」が引かれていない。翌年6月、突然「住民税の請求」が届いた。",
        imagePrompt: "Scene: a payslip with missing tax line highlighted; calendar showing April to June next year; a shocked worker receiving a bill. Composition: time progression with delayed consequence revealed. Mood: confusion, system ambush, hidden rules.",
        imagePath: "s3_q02.png",
        choices: [
            {
                text: "「住民税は翌年課税」を思い出し、2年目は手取りが減ることを予算に組み込む。",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。1年目は住民税ゼロで手取りが多く感じるが、2年目6月から天引き開始。手取り減少ショックに備え、1年目のうちに差額分を貯蓄しておくべき。税の仕組みを知る者だけが備えられます。",
                lockRequirements: null
            },
            {
                text: "会社のミスだと思い、経理に抗議する。",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "無知の露呈です。住民税は「前年の所得に基づく翌年6月〜課税」。新卒1年目は前年所得ゼロで非課税、2年目6月から課税開始。これは仕様です。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (FINANCE) - Credit information (CIC/信用情報) [SKILL OFFER 1 AFTER] [SWAPPED A↔B]
    {
        id: "s3_q03",
        category: "FINANCE",
        text: "クレジットカードの審査に落ちた。理由を知りたいが、自分の「信用情報」はどこで確認できる？",
        imagePrompt: "Scene: a rejected credit card application; CIC/JICC logos glowing; a person's credit history visualized as a report card. Composition: credit score concept with accessible information path. Mood: rejection turning to empowerment through knowledge.",
        imagePath: "s3_q03.png",
        choices: [
            {
                text: "信用情報は企業秘密だから、本人でも見られないはず。",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "誤りです。CIC、JICC、全国銀行協会に開示請求すれば、自分の信用情報を確認できます。延滞や債務整理の記録は5〜10年残り、審査に影響します。知らないと対策できません。",
                lockRequirements: null
            },
            {
                text: "CICなどの信用情報機関に開示請求し、自分の信用履歴を確認する。",
                effect: { CS: 20, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。開示手数料は約1,000円。過去の延滞や強制解約が記録されていれば原因が判明します。情報を知ることが、信用回復の第一歩です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (FINANCE) - Housing loan rate selection (judgment)
    {
        id: "s3_q04",
        category: "FINANCE",
        text: "住宅ローン。金利は変動金利と固定金利どちらにする?",
        imagePrompt: "Scene: Real estate office consultation room, bank pamphlets spread across glass table, loan officer's hands gesturing at rate comparison chart on tablet screen. Composition: Glass table reflection, tablet glow, professional setting. Mood: Guidance sought, numbers on display.",
        imagePath: "s3_q04.png",
        choices: [
            {
                text: "知り合いがおすすめしたほうにする。",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "他人任せの判断。変動金利は低金利だが将来の上昇リスクあり、固定金利は安定だが割高。収入の安定性、返済期間、金利上昇時の余力を自分で評価すべき。人生最大の借金を他人の一言で決めるのは危険。",
                lockRequirements: null
            },
            {
                text: "自分で調べて、メリットとデメリットを比較して、自分たちの状況を踏まえて判断する。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。変動金利(0.4〜0.7%)は低金利だが上昇リスク、固定金利(2%前後)は安定だが割高。3000万円35年で金利1%の差は約600万円。収入・家族構成・リスク許容度で正解は変わる。団信(団体信用生命保険)の条件も要チェック。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (FINANCE) - iDeCo/NISA vs savings only
    {
        id: "s3_q05",
        category: "FINANCE",
        text: "老後資金を準備したい。iDeCoとNISA、どちらを優先すべき？月の投資可能額は2万円。",
        imagePrompt: "Scene: Financial seminar room after hours, whiteboard with retirement calculations still visible, two different brochures left on attendee chair, notebook with personal notes. Composition: Empty seminar room, learning remnants. Mood: Education absorbed, decision pending.",
        imagePath: "s3_q05.png",
        choices: [
            {
                text: "NISAかiDeCoを活用する。非課税制度を使って資産形成を始める。",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。NISAは年間360万円まで運用益非課税、いつでも引き出し可能。iDeCoは所得控除で節税効果あり(年収400万なら年約2.4万円節税)、ただし60歳まで引き出せない。両制度の特性を理解して使い分けるのが賢明。",
                lockRequirements: null
            },
            {
                text: "投資は怖いので、貯金だけにする。",
                effect: { CS: -10, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "インフレで貯金は実質目減りする。年2%のインフレなら100万円は10年後に実質約82万円の価値に。非課税制度(NISA・iDeCo)を使わない機会損失は大きい。投資しないリスクも理解すべき。",
                lockRequirements: null
            }
        ]
    },

    // Q6: Knowledge (FINANCE) - Insurance over-buying trap [SWAPPED A↔B]
    {
        id: "s3_q06",
        category: "FINANCE",
        text: "保険の営業から「万が一に備えて」と医療保険、がん保険、生命保険のセット加入を勧められた。月額2万円。",
        imagePrompt: "Scene: an insurance salesperson with charts showing worst-case scenarios; a young person overwhelmed by multiple policy documents; public health insurance card glowing in corner. Composition: fear-based selling vs rational assessment. Mood: pressure, overprotection trap.",
        imagePath: "s3_q06.png",
        choices: [
            {
                text: "公的保険（高額療養費制度等）を確認し、本当に必要な保障だけを選ぶ。",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。公的保険を理解した上で「足りない部分だけ」民間保険で補う。保険は「安心」ではなく「確率とコストの計算」です。",
                lockRequirements: null
            },
            {
                text: "「万が一」が怖いので、勧められるまま全部加入する。",
                effect: { CS: 0, Asset: -40, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "過剰防衛です。日本には高額療養費制度があり、医療費の自己負担には上限があります。恐怖で売り込まれると、不要な保険料を払い続けることになります。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (FINANCE) - High-interest debt trap recognition [SWAPPED A↔B]
    {
        id: "s3_q07",
        category: "FINANCE",
        text: "「今すぐ30万円必要」。消費者金融のCMが目に入る。「30日間無利息」「審査は最短30分」。",
        imagePrompt: "Scene: a glowing ATM with 'EASY CASH' sign; fine print forming chains; a clock showing '30 days free' turning into debt spiral; protagonist at crossroads. Composition: temptation vs hidden consequence. Mood: desperation, trap disguised as help.",
        imagePath: "s3_q07.png",
        choices: [
            {
                text: "まず「なぜ30万円必要か」を再検討し、他の手段（分割払い交渉、家族相談）を探る。",
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。高金利借入は「最後の手段」。借りる前に「本当に必要か」「他に方法はないか」を考える習慣が、破滅を防ぎます。",
                lockRequirements: { Autonomy: 130 },
                lockedFeedback: "LOCKED: 自律性が130以上必要。焦りと欲求に支配され、「他の選択肢を探す」という発想が浮かびません。"
            },
            {
                text: "「30日無利息なら大丈夫」と借りる。",
                effect: { CS: 0, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "罠にはまりました。30日で返せなければ年利18%。30万円が半年で約3万円の利息に。「簡単に借りられる」は「簡単に搾取される」と同義です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの判断を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (FINANCE) - Student loan repayment relief (奨学金返済) [SWAPPED A↔B]
    {
        id: "s3_q08",
        category: "FINANCE",
        text: "就職したが給料が低く、奨学金の返済が厳しい。毎月の返済額は約15,000円。どう対応すべき？",
        imagePrompt: "Scene: Cramped apartment room, pay stub pinned to corkboard alongside student loan notice, laptop showing JASSO relief application page, instant noodles on desk. Composition: Lived-in small space, financial squeeze visible in details. Mood: Tight budget lifestyle, help available online.",
        imagePath: "s3_q08.png",
        choices: [
            {
                text: "JASSOに連絡し、「減額返還」か「返還期限猶予」を申請する。",
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。年収300万円以下なら「減額返還」で月額を1/2〜1/3に、「返還期限猶予」で最長10年間返済を止められます。制度を知らないだけで人生が詰む人がいます。困ったら、まず相談です。",
                lockRequirements: null
            },
            {
                text: "払えないものは払えない。しばらく無視して様子を見る。",
                effect: { CS: -20, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "最悪の選択です。延滞3ヶ月で個人信用情報機関に登録（ブラックリスト）。9ヶ月で一括請求。さらに給与差押えの可能性も。無視は問題を数十倍に膨らませます。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Knowledge (FINANCE) - One-room apartment investment solicitation
    {
        id: "s3_q09",
        category: "FINANCE",
        text: "聞いたことのある不動産会社からワンルームマンション投資の案内のチラシが届いた。",
        imagePrompt: "Scene: Real estate investment flyer on kitchen table showing luxury apartment rendering with glossy returns chart, fine print barely visible, smartphone showing negative reviews of similar schemes. Composition: Glossy flyer vs reality check on phone. Mood: Tempting surface, hidden risk.",
        imagePath: "s3_q09.png",
        choices: [
            {
                text: "不労所得は大事だから、不動産会社のおすすめにそって投資をはじめる。",
                effect: { CS: -20, Asset: -50, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "危険。ワンルームマンション投資は空室リスク、修繕費、管理費、固定資産税を考慮すると利回りが大幅に下がる。「サブリース契約で安心」も解約トラブル多発。不動産会社は売った時点で利益確定、リスクは買主が負う。",
                lockRequirements: null
            },
            {
                text: "自分でしっかり調べて理解してから対応する。利回り計算、空室リスク、管理費、修繕積立金など、見えないコストを把握してから判断。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。表面利回りと実質利回りの差、サブリース契約の解約リスク、築年数による資産価値の下落。投資判断は自分の責任。営業マンは売る側。「不労所得」の甘い言葉の裏にあるリスクを理解してから動く。",
                lockRequirements: { Asset: 140 },
                lockedFeedback: "LOCKED: 資産が140以上必要。投資判断には十分な資産基盤が必要です。"
            }
        ]
    },

    // Q10: Knowledge (FINANCE) - Social insurance income walls
    {
        id: "s3_q10",
        category: "FINANCE",
        text: "配偶者がパートで年収を増やしたいと言っている。「103万円を超えると損する」と聞いたが本当?",
        imagePrompt: "Scene: Kitchen table with salary calculation notes, tax threshold chart drawn by hand, two pay stubs side by side, calculator showing different scenarios. Composition: Handwritten calculations dominate, practical household finance. Mood: Family budget strategy, hidden thresholds.",
        imagePath: "s3_q10.png",
        choices: [
            {
                text: "103万円以下に抑えるのが一番得。",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "壁の種類を混同。103万円は所得税発生ライン、106万円は大企業の社会保険加入、130万円は扶養から外れるライン。2025年からは103万→123万円に緩和。130万超でも世帯収入は増える場合が多い。",
                lockRequirements: null
            },
            {
                text: "103万/106万/130万の壁の違いを理解し、世帯全体の収入で判断する。",
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。壁の影響は家族構成・勤務先規模で異なる。103万円の壁(所得税)、106万円の壁(従業員51人以上の企業で社会保険加入)、130万円の壁(社会保険の扶養外れ)。150万・201万円は配偶者特別控除の段階的減少。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。「知っているか」で家計が大きく変わる領域です。",
            after: "ステージ3を終了します。審査結果を算出中・・・"
        }
    }
];
