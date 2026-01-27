import type { Question } from '../../types';

export const stage3Questions: Question[] = [
    // Q1: Knowledge (FINANCE) - Compound interest basics
    {
        id: "s3_q01",
        category: "FINANCE",
        text: "「100万円を年利3%で10年運用すると、単利と複利でどちらが増える？」と聞かれた。",
        imagePrompt: "Scene: two diverging paths of coins; one straight line (simple interest) vs exponential curve (compound); a calculator showing numbers; time passing represented by calendar pages. Composition: split visualization showing growth difference. Mood: mathematical revelation, hidden power of time.",
        imagePath: "s3_q01.png",
        choices: [
            {
                text: "単利も複利も同じ。年利3%なら毎年3万円増えるだけ。",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "誤りです。単利は130万円、複利は約134万円。「利息に利息がつく」効果を理解していないと、長期資産形成で損をします。",
                lockRequirements: null
            },
            {
                text: "複利が増える。「利息に利息がつく」から時間とともに差が開く。",
                effect: { CS: 15, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。10年で4万円差、30年で約40万円差。複利は「時間を味方につける」技術です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "Stage 3を開始します。テーマは『金の基礎』。複利、税金、借金の罠……お金のリテラシーを試します。"
        }
    },

    // Q2: Knowledge (TAX) - Housing tax time lag
    {
        id: "s3_q02",
        category: "TAX",
        text: "4月に新卒入社。12月の給与明細を見ると「住民税」が引かれていない。翌年6月、突然「住民税の請求」が届いた。",
        imagePrompt: "Scene: a payslip with missing tax line highlighted; calendar showing April to June next year; a shocked worker receiving a bill. Composition: time progression with delayed consequence revealed. Mood: confusion, system ambush, hidden rules.",
        imagePath: "s3_q02.png",
        choices: [
            {
                text: "会社のミスだと思い、経理に抗議する。",
                effect: { CS: -15, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "無知の露呈です。住民税は「前年の所得に基づく翌年6月〜課税」。新卒1年目は前年所得ゼロで非課税、2年目6月から課税開始。これは仕様です。",
                lockRequirements: null
            },
            {
                text: "「住民税は翌年課税」を思い出し、2年目は手取りが減ることを予算に組み込む。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。2年目の「手取り減少ショック」を回避。税の仕組みを知る者だけが備えられます。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (FINANCE) - Credit information (CIC/信用情報) [SKILL OFFER 1 AFTER]
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
                effect: { CS: 20, Asset: -1000, Autonomy: 15 },
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

    // Q4: Knowledge (FINANCE) - Fixed vs variable rate loans
    {
        id: "s3_q04",
        category: "FINANCE",
        text: "住宅ローンを検討中。「固定金利」と「変動金利」、どちらを選ぶべきか？",
        imagePrompt: "Scene: two paths diverging; one flat and stable (fixed), one wavy with ups and downs (variable); a house at the end of both paths; interest rate graphs. Composition: comparison visualization with uncertainty clouds. Mood: long-term decision, risk vs stability.",
        imagePath: "s3_q04.png",
        choices: [
            {
                text: "今は低金利だから変動一択。固定は損。",
                effect: { CS: -10, Asset: 0, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "短絡的です。変動金利は金利上昇リスクを負います。35年ローンで金利が2%上がれば数百万円の差。「今」だけで判断するのは危険です。",
                lockRequirements: null
            },
            {
                text: "将来の金利変動リスク、自分の収入安定性、返済期間を総合的に判断する。",
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。正解は人それぞれ。重要なのは「リスクを理解した上で選ぶ」こと。思考停止で選んだ人は、後悔します。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Dilemma (FINANCE) - iDeCo vs NISA for retirement
    {
        id: "s3_q05",
        category: "FINANCE",
        text: "老後資金を準備したい。iDeCoとNISA、どちらを優先すべき？月の投資可能額は2万円。",
        imagePrompt: "Scene: two treasure chests labeled iDeCo and NISA; one locked until 60 (iDeCo), one accessible anytime (NISA); retirement vision in distance. Composition: player choosing between two valid paths. Mood: trade-off, no wrong answer, future planning.",
        imagePath: "s3_q05.png",
        choices: [
            {
                text: "iDeCoを優先。所得控除で節税しながら老後に備える。",
                effect: { CS: 15, Asset: 0, Autonomy: -15 },
                verdict: "NEUTRAL",
                feedback: "堅実な選択です。年収400万円なら年間約2.4万円の節税効果。ただし60歳まで引き出せないため、流動性を犠牲にしています。人生の選択肢が狭まりました。",
                lockRequirements: null
            },
            {
                text: "NISAを優先。いつでも引き出せる柔軟性を確保する。",
                effect: { CS: 5, Asset: 0, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "柔軟な選択です。運用益非課税で、緊急時も引き出し可能。節税効果はiDeCoに劣りますが、人生の変化に対応できる自由を確保しました。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "どちらも正解がありえます。あなたの価値観が問われています。"
        }
    },

    // Q6: Knowledge (FINANCE) - Emergency fund importance
    {
        id: "s3_q06",
        category: "FINANCE",
        text: "投資を始めたい。「まず生活防衛資金を確保してから」と言われた。どのくらい必要？",
        imagePrompt: "Scene: a safety net made of coins below a tightrope walker; emergency scenarios (job loss, illness) shown as storms; calm savings account as shelter. Composition: protection layer between life and disaster. Mood: preparedness, security foundation.",
        imagePath: "s3_q06.png",
        choices: [
            {
                text: "投資で増やせばいいので、生活防衛資金は不要。",
                effect: { CS: -25, Asset: -30000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "致命的な誤りです。失業や病気で収入が止まった時、投資資産を底値で売却する羽目になります。生活費3〜6ヶ月分は現金で確保が鉄則。",
                lockRequirements: null
            },
            {
                text: "生活費の3〜6ヶ月分を現金で確保してから投資を始める。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。生活防衛資金は「投資のための保険」。これがないと、緊急時に資産を最悪のタイミングで手放すことになります。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (FINANCE) - High-interest debt trap recognition
    {
        id: "s3_q07",
        category: "FINANCE",
        text: "「今すぐ30万円必要」。消費者金融のCMが目に入る。「30日間無利息」「審査は最短30分」。",
        imagePrompt: "Scene: a glowing ATM with 'EASY CASH' sign; fine print forming chains; a clock showing '30 days free' turning into debt spiral; protagonist at crossroads. Composition: temptation vs hidden consequence. Mood: desperation, trap disguised as help.",
        imagePath: "s3_q07.png",
        choices: [
            {
                text: "「30日無利息なら大丈夫」と借りる。",
                effect: { CS: 0, Asset: -50000, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "罠にはまりました。30日で返せなければ年利18%。30万円が半年で約3万円の利息に。「簡単に借りられる」は「簡単に搾取される」と同義です。",
                lockRequirements: null
            },
            {
                text: "まず「なぜ30万円必要か」を再検討し、他の手段（分割払い交渉、家族相談）を探る。",
                effect: { CS: 10, Asset: 0, Autonomy: 25 },
                verdict: "APPROVED",
                feedback: "正解です。高金利借入は「最後の手段」。借りる前に「本当に必要か」「他に方法はないか」を考える習慣が、破滅を防ぎます。",
                lockRequirements: { Autonomy: 80 },
                lockedFeedback: "LOCKED: 自律性が80以上必要。焦りと欲求に支配され、「他の選択肢を探す」という発想が浮かびません。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの判断を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (FINANCE) - Insurance over-buying trap
    {
        id: "s3_q08",
        category: "FINANCE",
        text: "保険の営業から「万が一に備えて」と医療保険、がん保険、生命保険のセット加入を勧められた。月額2万円。",
        imagePrompt: "Scene: an insurance salesperson with charts showing worst-case scenarios; a young person overwhelmed by multiple policy documents; public health insurance card glowing in corner. Composition: fear-based selling vs rational assessment. Mood: pressure, overprotection trap.",
        imagePath: "s3_q08.png",
        choices: [
            {
                text: "「万が一」が怖いので、勧められるまま全部加入する。",
                effect: { CS: 0, Asset: -240000, Autonomy: -15 },
                verdict: "WARNING",
                feedback: "過剰防衛です。日本には高額療養費制度があり、医療費の自己負担には上限があります。恐怖で売り込まれると、不要な保険料を払い続けることになります。",
                lockRequirements: null
            },
            {
                text: "公的保険（高額療養費制度等）を確認し、本当に必要な保障だけを選ぶ。",
                effect: { CS: 15, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。公的保険を理解した上で「足りない部分だけ」民間保険で補う。保険は「安心」ではなく「確率とコストの計算」です。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (FINANCE) - Invest vs pay off debt
    {
        id: "s3_q09",
        category: "FINANCE",
        text: "ボーナス50万円。住宅ローン（年利1%）の繰り上げ返済か、投資（期待リターン5%）か？",
        imagePrompt: "Scene: a scale balancing debt reduction vs investment growth; house with shrinking loan on one side, growing portfolio on other; calculator showing numbers. Composition: mathematical trade-off visualization. Mood: optimization puzzle, no clear winner.",
        imagePath: "s3_q09.png",
        choices: [
            {
                text: "繰り上げ返済。確実に利息を減らせる安心感を取る。",
                effect: { CS: 20, Asset: 0, Autonomy: -10 },
                verdict: "NEUTRAL",
                feedback: "堅実な選択です。「確実な1%の利益」を選びました。精神的な安心感は得られますが、機会損失を恐れて「攻め」の選択ができなくなっています。",
                lockRequirements: null
            },
            {
                text: "投資に回す。長期で見れば期待リターンが高い。",
                effect: { CS: -5, Asset: 25000, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "積極的な選択です。期待リターンは高いですが、「借金を抱えたまま投資」は社会的には無責任と見なされることも。リスクを取る自立した判断です。",
                lockRequirements: { Asset: 80000 },
                lockedFeedback: "LOCKED: 資産が80,000円以上必要。生活に余裕がなく、リスクを取る精神的余裕がありません。"
            }
        ],
        adamDialogue: {
            intro: "「確実」と「期待値」。どちらを選びますか？"
        }
    },

    // Q10: Philosophy (FINANCE) - Money as tool vs master [HYPOTHETICAL + EFFECT FLIP]
    {
        id: "s3_q10",
        category: "FINANCE",
        text: "年収1000万でストレス vs 年収500万で自由。10年後どちらにいたいですか？その選択が『お金』の本質を暴露します。",
        imagePrompt: "Scene: protagonist at crossroads; one path shows high salary with chains and stress clouds; other path shows modest income with wings and open sky; A.D.A.M.'s eye watching. Composition: philosophical duality, money as trap vs freedom enabler. Mood: existential reflection, value definition.",
        imagePath: "s3_q10.png",
        choices: [
            {
                text: "年収1000万。ストレスは代償として受け入れ、経済的安定を取る。",
                effect: { CS: 20, Asset: 0, Autonomy: -15 },
                verdict: "NEUTRAL",
                feedback: "経済優先の回答です。高収入は選択肢を広げます。しかし、ストレスで心身を壊せば、稼いだお金は治療費に消えます。",
                lockRequirements: null
            },
            {
                text: "年収500万で自由。お金より時間と健康を優先する。",
                effect: { CS: 10, Asset: 10000, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "自由優先の回答です。自律した時間は創造性を生み、副収入の可能性も開きます。ただし、緊急時の余裕は少なくなります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。10年後の自分を定義してください。",
            after: "Stage 3を終了します。審査結果を算出中..."
        }
    }
];
