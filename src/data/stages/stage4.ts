import type { Question } from '../../types';

export const stage4Questions: Question[] = [
    // Q1: Knowledge (ADMIN) - Moving procedures (14-day rule)
    {
        id: "s4_q01",
        category: "ADMIN",
        text: "引越し後の手続き。住民票、マイナンバーカード、運転免許証、銀行・・・全部やる必要がある？",
        textEN: "Post-move procedures. Residence record, My Number Card, driver's license, bank... Do you really need to update all of them?",
        imagePrompt: "Scene: a maze of government buildings with different counters; a checklist floating with many items; confused citizen holding moving boxes. Composition: bureaucratic labyrinth with multiple paths. Mood: overwhelm, procedural complexity.",
        imagePath: "s4_q01.png",
        choices: [
            {
                text: "チェックリストを作り、住民票→マイナンバー→免許→銀行の順で一気に処理する。",
                textEN: "Make a checklist and process them in order: residence record, My Number Card, driver's license, then bank — all at once.",
                effect: { CS: 20, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。住民票を先に移すと、他の手続きがスムーズに進みます。行政手続きには「正しい順序」があります。",
                feedbackEN: "Correct. Transferring your residence record first makes all other procedures smoother. Administrative tasks have a 'correct order.'",
                lockRequirements: null
            },
            {
                text: "面倒なので住民票だけ移して、他は後回し。",
                textEN: "Too much hassle — just transfer the residence record and deal with the rest later.",
                effect: { CS: -20, Asset: -10, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "手続き漏れです。運転免許証の住所変更を怠ると身分証明として使えなくなり、銀行手続きが滞ります。後回しにするほど問題が複雑化します。",
                feedbackEN: "Incomplete processing. Failing to update your driver's license address means it can't serve as ID, which stalls bank procedures. The longer you postpone, the more complicated things get.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ4を開始します。テーマは「行政の迷宮」。書類、期限、窓口・・・官僚制の攻略法を試します。",
            introEN: "Starting Stage 4. Theme: 'The Bureaucratic Labyrinth.' Documents, deadlines, counters... Testing your ability to navigate the system."
        }
    },

    // Q2: Knowledge (ADMIN) - Marriage registration requirements (simpler effect, before skills)
    {
        id: "s4_q02",
        category: "ADMIN",
        text: "婚姻届を提出しようとしたら、「証人2名の署名が必要」と言われた。親に頼むべき？",
        textEN: "When submitting your marriage registration (婚姻届), you're told '2 witness signatures are required.' Should you ask your parents?",
        imagePrompt: "Scene: Marriage registration form close-up, witness signature sections empty, phone contact list scrolled to various names, pen waiting. Composition: Form dominates, phone shows options without judgment. Mood: Milestone paperwork, flexible requirements.",
        imagePath: "s4_q02.png",
        choices: [
            {
                text: "証人は親でなければならないと思い、疎遠な親に連絡して頼む。",
                textEN: "Assume witnesses must be parents and reach out to estranged parents to ask.",
                effect: { CS: 0, Asset: 0, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "誤解です。証人は成年（18歳以上）であれば誰でもOK。親である必要はありません。「常識」と思い込んでいることが、実は法的根拠のない慣習であることは多いです。",
                feedbackEN: "A misunderstanding. Any adult (18 or older) can serve as a witness. They don't have to be parents. Many things assumed to be 'common sense' are actually customs with no legal basis.",
                lockRequirements: null
            },
            {
                text: "友人や同僚に頼む。成人であれば誰でも証人になれる。",
                textEN: "Ask friends or colleagues. Any adult can serve as a witness.",
                effect: { CS: 15, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。法律は「成年の証人2名」としか定めていません。制度を正しく理解すれば、選択肢が広がります。",
                feedbackEN: "Correct. The law only requires 'two adult witnesses.' Understanding the system correctly expands your options.",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (TAX) - Furusato tax donation (bigger effect, after skill offer 1) [SKILL OFFER 1 AFTER]
    {
        id: "s4_q03",
        category: "TAX",
        text: "「ふるさと納税」を勧められた。「実質2,000円で返礼品がもらえる」と聞いたが、注意点は？",
        textEN: "Someone recommended Furusato Nouzei (ふるさと納税, hometown tax donations). You heard 'you get gifts for effectively just 2,000 yen.' What are the caveats?",
        imagePrompt: "Scene: Living room couch evening browsing, tablet showing regional specialty products grid, gift box from previous donation sitting opened nearby, calculator app on phone. Composition: Casual home shopping moment, past reward visible. Mood: Savvy consumer, benefit within reach.",
        imagePath: "s4_q03.png",
        choices: [
            {
                text: "自分の控除上限額を確認し、5自治体以内でワンストップ特例を活用する。",
                textEN: "Check your deduction cap and use the One-Stop Exception for up to 5 municipalities.",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。控除上限額は年収・家族構成で異なります。上限内なら実質2,000円で返礼品（寄附額の30%相当）を受け取れます。制度を理解して使うのが大人です。",
                feedbackEN: "Correct. The deduction cap varies by income and family structure. Within the cap, you effectively pay just 2,000 yen for return gifts (worth about 30% of the donation). Understanding and using the system is what adults do.",
                lockRequirements: null
            },
            {
                text: "お得なら上限なく寄附する。たくさん寄附すればたくさん返礼品がもらえる。",
                textEN: "If it's a good deal, donate without limit. More donations mean more gifts.",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "大損です。控除上限額を超えた分は「ただの寄附」。年収500万円なら上限は約6万円。さらにワンストップ特例は5自治体まで、申請書は翌年1月10日必着。知らないと損をします。",
                feedbackEN: "A major loss. Anything over your deduction cap is just a straight donation. At 5 million yen income, the cap is about 60,000 yen. The One-Stop Exception covers only 5 municipalities, with applications due by January 10 of the following year. Not knowing costs you money.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。",
            afterEN: "Processing complete. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (ADMIN) - Passport/driver's license renewal
    {
        id: "s4_q04",
        category: "ADMIN",
        text: "パスポートの有効期限が3ヶ月後。海外旅行の予定が半年後にある。",
        textEN: "Your passport expires in 3 months. You have an international trip planned in 6 months.",
        imagePrompt: "Scene: a passport with expiration date highlighted; a plane ticket showing travel date; warning signs about entry requirements. Composition: timeline showing deadline crunch. Mood: deadline awareness, hidden requirements.",
        imagePath: "s4_q04.png",
        choices: [
            {
                text: "有効期限まで3ヶ月あるから、旅行直前に更新すれば間に合う。",
                textEN: "There are still 3 months left, so renewing right before the trip should be fine.",
                effect: { CS: -20, Asset: -20, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "致命的なミスです。多くの国は「入国時に残存有効期限6ヶ月以上」を要求します。ギリギリでは入国拒否される可能性があります。旅行がキャンセルに。",
                feedbackEN: "A critical mistake. Many countries require 'at least 6 months remaining validity at entry.' Cutting it close risks being denied entry. Your trip gets cancelled.",
                lockRequirements: null
            },
            {
                text: "すぐに更新する。渡航先の残存有効期限要件を確認し、余裕を持って準備。",
                textEN: "Renew immediately. Check the destination's remaining validity requirements and prepare with time to spare.",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。行政手続きは「期限ギリギリ」が最も危険。余裕を持った準備が、トラブルを未然に防ぎます。",
                feedbackEN: "Correct. With administrative procedures, 'last minute' is the most dangerous approach. Preparing with a buffer prevents problems before they happen.",
                lockRequirements: null
            }
        ]
    },

    // Q5: Dilemma (ADMIN) - 戸籍謄本の取得方法
    {
        id: "s4_q05",
        category: "ADMIN",
        text: "相続手続きで本籍地の戸籍謄本が必要になった。しかし本籍地は実家のある遠方の自治体。平日は仕事で役所に行けない。",
        textEN: "You need a certified copy of the family register (戸籍謄本) from your registered domicile for inheritance procedures. But it's in a distant municipality, and you can't visit the office on weekdays.",
        imagePrompt: "Scene: Kitchen table with family registry request form partially filled, map showing distant hometown marked, calendar with work days blocked, envelope and stamps ready. Composition: Documents spread on table, distance visualized. Mood: Administrative puzzle, multiple paths.",
        imagePath: "s4_q05.png",
        choices: [
            {
                text: "郵送請求する。時間はかかるが、平日に休まなくて済む。",
                textEN: "Request by mail. It takes time, but you won't need a weekday off.",
                effect: { CS: 10, Asset: 0, Autonomy: -10 },
                verdict: "NEUTRAL",
                feedback: "堅実な選択です。郵送請求は往復1〜2週間かかりますが、定額小為替の準備と返信用封筒を同封すれば確実。時間を犠牲にして手間を減らしました。",
                feedbackEN: "A solid choice. Mail requests take 1-2 weeks round-trip, but are reliable if you include a postal money order and return envelope. You traded time for convenience.",
                lockRequirements: null
            },
            {
                text: "コンビニ交付を試す。マイナンバーカードがあれば、一部の戸籍は全国のコンビニで取得可能。",
                textEN: "Try convenience store issuance. With a My Number Card, some family register documents can be obtained at any convenience store nationwide.",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "NEUTRAL",
                feedback: "効率的な選択です。ただし本籍地の自治体がコンビニ交付に対応しているか確認が必要。",
                feedbackEN: "An efficient choice. However, you need to verify that your registered domicile's municipality supports convenience store issuance.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "時間か、知識か。行政手続きには「近道」が存在します。",
            introEN: "Time or knowledge? Shortcuts exist in the bureaucratic system."
        }
    },

    // Q6: Knowledge (ADMIN) - Tax filing preparation timing
    {
        id: "s4_q06",
        category: "ADMIN",
        text: "初めての確定申告。「3月15日が期限」と知っているが、いつから準備を始めるべき？",
        textEN: "Your first tax return (確定申告). You know the deadline is March 15, but when should you start preparing?",
        imagePrompt: "Scene: Calendar showing March with 15th deadline looming, stack of unsorted receipts, tax software login screen timing out, coffee gone cold. Composition: Calendar dominates wall, chaos on desk below. Mood: Procrastination catching up, deadline pressure.",
        imagePath: "s4_q06.png",
        choices: [
            {
                text: "期限に間に合えばいい。2月後半から始める。",
                textEN: "As long as I make the deadline. Start in late February.",
                effect: { CS: -20, Asset: -10, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "危険です。書類不足や計算ミスに気づいても修正する時間がありません。税務署も混雑し、相談もできず、延滞税や加算税のリスクも。「間に合えばいい」は甘い考えです。",
                feedbackEN: "Dangerous. If you discover missing documents or calculation errors, there's no time to fix them. Tax offices are also packed, consultations unavailable, and you risk late-filing penalties. 'Just making the deadline' is naive thinking.",
                lockRequirements: null
            },
            {
                text: "年明けすぐに書類を揃え、1月中に下書きを完成させる。",
                textEN: "Gather documents right after New Year and finish the draft by end of January.",
                effect: { CS: 15, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。源泉徴収票は1月末までに届きます。早めに準備すれば、不明点を税務署に相談する余裕もあり、控除の漏れも防げます。",
                feedbackEN: "Correct. Withholding tax statements arrive by end of January. Early preparation gives you time to consult the tax office on unclear points and catch missed deductions.",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (ADMIN) - Document submission evidence
    {
        id: "s4_q07",
        category: "ADMIN",
        text: "確定申告の書類を税務署に持参して提出した。控えに受付印をもらわなかった。",
        textEN: "You submitted your tax return documents in person at the tax office but didn't get a receipt stamp on your copy.",
        imagePrompt: "Scene: Tax office counter, documents being handed over, receipt stamp sitting unused on counter, future loan application showing 'proof required' highlighted. Composition: Counter exchange moment, stamp as missed opportunity. Mood: Procedural vulnerability, evidence importance.",
        imagePath: "s4_q07.png",
        choices: [
            {
                text: "提出したから大丈夫。受付印なんて必要ない。",
                textEN: "I submitted it, so it's fine. No need for a receipt stamp.",
                effect: { CS: 0, Asset: 0, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "書類紛失時に提出の証拠がない。住宅ローン審査や各種申請で「申告書の控え(受付印付き)」を求められることがある。電子申告(e-Tax)なら受信通知が証拠になる。",
                feedbackEN: "If documents are lost, you have no proof of submission. Mortgage screenings and various applications may require 'a copy of the return with a receipt stamp.' With e-Tax, the acknowledgment notification serves as proof.",
                lockRequirements: null
            },
            {
                text: "控えに受付印を押してもらい、提出の証拠を確保する。",
                textEN: "Get a receipt stamp on your copy to secure proof of submission.",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。行政手続きは「証拠を残す」が鉄則。郵送なら特定記録や簡易書留、電子申告なら受信通知。「出した」と「出した証拠がある」は全く違う。",
                feedbackEN: "Correct. The golden rule of administrative procedures is 'keep proof.' For mail: use tracked or registered delivery. For e-Tax: the acknowledgment notification. 'I submitted it' and 'I have proof I submitted it' are entirely different things.",
                lockRequirements: { Autonomy: 130 },
                lockedFeedback: "LOCKED: 自律性が130以上必要。面倒くさがって「まあいいか」と流しました。",
                lockedFeedbackEN: "LOCKED: Autonomy of 130 or higher required. You thought 'whatever, it's fine' out of laziness and let it slide."
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

    // Q8: Knowledge (ADMIN) - Inheritance procedures basics
    {
        id: "s4_q08",
        category: "ADMIN",
        text: "親が亡くなった。葬儀の後、「相続放棄は3ヶ月以内」と聞いた。何もしなくても大丈夫？",
        textEN: "Your parent has passed away. After the funeral, you heard 'renunciation of inheritance must be done within 3 months.' Is it okay to do nothing?",
        imagePrompt: "Scene: a family at funeral transitioning to legal documents; countdown timer showing 3 months; hidden debts revealed as shadows. Composition: emotional moment meeting legal deadline. Mood: grief mixed with procedural urgency.",
        imagePath: "s4_q08.png",
        choices: [
            {
                text: "遺産があるから相続放棄は関係ない。何もしなくていい。",
                textEN: "There's an inheritance, so renunciation doesn't apply. No action needed.",
                effect: { CS: -30, Asset: -30, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "致命的な誤りです。プラスの遺産だけでなく「隠れた借金」も相続されます。3ヶ月以内に調査しないと、知らない借金を背負う可能性があります。",
                feedbackEN: "A critical error. You inherit not just assets but also 'hidden debts.' If you don't investigate within 3 months, you could end up shouldering debts you never knew about.",
                lockRequirements: null
            },
            {
                text: "まず負債の有無を調査し、必要なら相続放棄を検討する。期限は3ヶ月。",
                textEN: "First investigate whether there are any debts, and consider renunciation if needed. The deadline is 3 months.",
                effect: { CS: 10, Asset: 30, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。相続は資産だけでなく負債も含みます。調査してから判断することで、隠れた借金を回避できます。",
                feedbackEN: "Correct. Inheritance includes both assets and liabilities. Investigating before deciding lets you avoid hidden debts.",
                lockRequirements: null
            }
        ]
    },

    // Q9: Knowledge (ADMIN) - Tax error: immediate correction vs wait and see
    {
        id: "s4_q09",
        category: "ADMIN",
        text: "確定申告後、計算ミスで税金を少なく申告していたことに気づいた。差額は約5万円。すぐに修正申告すべきか？",
        textEN: "After filing your tax return, you realize a calculation error caused you to underreport your taxes by about 50,000 yen. Should you file an amended return immediately?",
        imagePrompt: "Scene: a tax return with error discovered; correction form glowing; tax office counter. Composition: mistake discovery with proper correction path. Mood: error found, responsible action.",
        imagePath: "s4_q09.png",
        choices: [
            {
                text: "すぐに修正申告する。リスクを最小化し、誠実さを示す。",
                textEN: "File an amended return immediately. Minimize risk and demonstrate integrity.",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。自主的修正申告なら過少申告加算税5%に軽減(税務調査後は10〜15%)。「見つからない可能性」を捨て、確実に解決する判断です。延滞税も日割りで加算されるため、早いほど負担は軽い。",
                feedbackEN: "Correct. A voluntary amended return reduces the underreporting penalty to 5% (vs 10-15% after an audit). Choosing certainty over 'maybe they won't notice' is the right call. Late payment tax accrues daily, so sooner means lighter burden.",
                lockRequirements: { Asset: 130 },
                lockedFeedback: "LOCKED: 資産が130以上必要。修正申告には今すぐ支払える経済的な余裕が必要です。",
                lockedFeedbackEN: "LOCKED: Asset of 130 or higher required. Filing an amended return requires the financial means to pay immediately."
            },
            {
                text: "様子を見る。税務調査が来なければ問題ない可能性もある。",
                textEN: "Wait and see. If no audit comes, it might not be an issue.",
                effect: { CS: -10, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "リスクの高い選択。発覚すれば過少申告加算税10〜15%+延滞税。自主的修正なら5%で済んだものが、税務調査後は大幅に負担増。数年間「いつか来るかも」という不安を抱えることになります。",
                feedbackEN: "A high-risk choice. If caught, the underreporting penalty is 10-15% plus late payment tax. What would have been 5% with a voluntary correction becomes much more after an audit. You'll also carry the anxiety of 'will they find out?' for years.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "誠実さとリスク、どちらを優先しますか？",
            introEN: "Which do you prioritize: integrity or risk?"
        }
    },

    // Q10: Knowledge (ADMIN) - Retroactive refund filing (5 years)
    {
        id: "s4_q10",
        category: "ADMIN",
        text: "3年前に高額な歯科治療(インプラント40万円)をしたが、医療費控除の確定申告をしなかった。今から申告できる?",
        textEN: "Three years ago, you had expensive dental work (implant: 400,000 yen) but didn't file for the medical expense deduction. Can you still file?",
        imagePrompt: "Scene: Old dental receipt discovered in drawer, calendar showing years passed, tax refund calculation on notepad, surprised expression reflected in phone screen. Composition: Receipt discovery moment, time passed but opportunity remains. Mood: Pleasant surprise, money to reclaim.",
        imagePath: "s4_q10.png",
        choices: [
            {
                text: "還付申告は5年間遡れる。今からでも確定申告して還付を受ける。",
                textEN: "Refund filings can go back 5 years. File now and claim the refund.",
                effect: { CS: 10, Asset: 30, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。インプラント40万円なら控除額30万円(40万-10万)。税率20%なら約6万円の還付。レーシック、不妊治療、通院交通費(バス・電車)も対象。対象外は美容整形、予防接種、病気が見つからなかった健康診断。",
                feedbackEN: "Correct. A 400,000 yen implant gives a 300,000 yen deduction (400K minus 100K threshold). At a 20% tax rate, that's about a 60,000 yen refund. LASIK, fertility treatment, and commuting costs (bus/train) also qualify. Excluded: cosmetic surgery, vaccinations, and health checkups with no diagnosis.",
                lockRequirements: null
            },
            {
                text: "確定申告の期限(3月15日)は過ぎているから無理。",
                textEN: "The filing deadline (March 15) has passed, so it's too late.",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "還付申告と確定申告は別。還付申告は翌年1月1日から5年後の12月31日まで可能。3年前の治療でもまだ間に合う。",
                feedbackEN: "Refund filing and regular tax filing are different. Refund filings are accepted from January 1 of the following year through December 31 five years later. Treatment from 3 years ago is still eligible.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。「知っているか」で数万円の差がつく領域です。",
            introEN: "Final question. This is an area where 'whether you know' makes a difference of tens of thousands of yen.",
            after: "ステージ4を終了します。審査結果を算出中・・・",
            afterEN: "Stage 4 complete. Calculating assessment results..."
        }
    }
];
