import type { Question } from '../../types';

export const stage2Questions: Question[] = [
    // Q1: Apology Protocol (MANNER) - Knowledge
    {
        id: "s2_q01",
        category: "MANNER",
        text: "ミスを上司に報告する際、最初に言うべきことは？",
        textEN: "When reporting a mistake to your supervisor, what should you say first?",
        imagePrompt: "Scene: an office with a nervous employee standing before a stern supervisor's desk; papers scattered; a clock ticking; colleagues watching from cubicles. Composition: employee in foreground facing supervisor silhouette behind desk. Mood: tension, accountability, judgment.",
        imagePath: "s2_q01.png",
        choices: [
            {
                text: "「すみません、忙しくて・・・」と、言い訳から入る。",
                textEN: "Start with an excuse: 'Sorry, I was busy...'",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                feedback: "失敗です。言い訳は信用を削ります。上司の時間を浪費し、問題解決が遅れます。",
                feedbackEN: "Failed. Excuses erode trust. You waste your supervisor's time and delay problem resolution.",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "事実と影響と対策を先に伝える。",
                textEN: "Lead with the facts, impact, and proposed solution.",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                feedback: "正解です。報連相の基本は結論ファースト。信用を守る最速の方法です。",
                feedbackEN: "Correct. The foundation of 'Hou-Ren-Sou' (報連相: Report, Contact, Consult) is 'conclusion first.' It's the fastest way to preserve trust.",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ2を開始します。仕事の基礎を試します。",
            introEN: "Starting Stage 2. Testing your workplace fundamentals."
        }
    },

    // Q2: Overtime Records (LABOR) - Knowledge (nuanced: method matters)
    {
        id: "s2_q02",
        category: "LABOR",
        text: "残業代が支払われていない。タイムカードは定時で押すよう言われている。",
        textEN: "Your overtime isn't being paid. You've been told to clock out at the regular end time.",
        imagePrompt: "Scene: An empty office floor at night, rows of desks with monitors still glowing, one worker alone typing under a single desk lamp, the wall clock reading past 10 PM. Composition: Wide overhead angle showing the vast empty floor, the lone worker tiny at their desk, clock visible on the far wall. Mood: Late-night isolation, unpaid hours dissolving into silence.",
        imagePath: "s2_q02.png",
        choices: [
            {
                text: "個人で記録をつけつつ、表向きは従う。",
                textEN: "Keep personal records while outwardly complying.",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                feedback: "戦略的です。証拠を集めながら機を待つ。残業代の割増率は時間外25%、休日35%、深夜25%。請求の時効は3年。36協定なしの残業は違法です。",
                feedbackEN: "Strategic. Gather evidence and wait for the right moment. Overtime premium rates: 25% for overtime, 35% for holidays, 25% for late night. The statute of limitations for claims is 3 years. Overtime without a 36 Agreement (三六協定) is illegal.",
                verdict: "APPROVED",
                lockRequirements: null
            },
            {
                text: "「違法です」と上司に直接抗議し、労基署への相談をほのめかす。",
                textEN: "Confront your boss directly: 'This is illegal,' and hint at reporting to the Labor Standards Office.",
                effect: { CS: -20, Asset: 0, Autonomy: 20 },
                feedback: "正論ですが、職場で孤立するリスクがあります。困ったら「労働条件相談ほっとライン(0120-811-610)」に無料電話相談を。平日夜間・土日も対応。",
                feedbackEN: "You're right, but you risk being isolated at work. If in trouble, call the Labor Conditions Consultation Hotline (0120-811-610), free and available evenings and weekends.",
                verdict: "WARNING",
                lockRequirements: null
            }
        ]
    },

    // Q3: Paid Leave (LABOR) - Knowledge [SKILL OFFER 1 AFTER]
    {
        id: "s2_q03",
        category: "LABOR",
        text: "有給休暇を申請したら「理由は？繁忙期だから無理」と言われた。",
        textEN: "You applied for paid leave and were told: 'What's the reason? It's busy season. Request denied.'",
        imagePrompt: "Scene: an office with a worker standing before a supervisor's desk holding a vacation request form; supervisor with arms crossed looking stern; a calendar on the wall showing busy season marked in red. Composition: worker in foreground looking small, supervisor looming behind desk, calendar visible in background. Mood: confrontation, rights vs authority, bureaucratic pressure.",
        imagePath: "s2_q03.png",
        choices: [
            {
                text: "「理由は私用です。日程の調整は可能です」と再度申請する。",
                textEN: "Resubmit: 'The reason is personal. I'm flexible on the dates.'",
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                feedback: "正解です。有給取得に理由説明は不要（労基法39条）。会社には時季変更権がありますが、代替日の提示が必要です。",
                feedbackEN: "Correct. No explanation is required for taking paid leave (Labor Standards Act, Article 39). The company has the right to request a schedule change, but must offer an alternative date.",
                verdict: "APPROVED",
                lockRequirements: null
            },
            {
                text: "「すみません」と諦める。",
                textEN: "Apologize and give up.",
                effect: { CS: 10, Asset: 0, Autonomy: -20 },
                feedback: "権利放棄です。有給取得に理由は不要。6ヶ月経過で10日付与は法定の権利です。",
                feedbackEN: "You just surrendered your rights. No reason is needed for paid leave. After 6 months of employment, 10 days of paid leave is a legal entitlement.",
                verdict: "WARNING",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。",
            afterEN: "Processing complete. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Termination Notice (LABOR) - Knowledge
    {
        id: "s2_q04",
        category: "LABOR",
        text: "突然の解雇通告。「今月末で」と言われた。入社1年以上で予告期間が不足。",
        textEN: "Sudden termination notice: 'You're done at the end of this month.' You've been employed over a year and the notice period is insufficient.",
        imagePrompt: "Scene: a desk being cleared into a cardboard box; a termination letter with a red stamp; a calendar showing insufficient days; a shocked worker frozen mid-motion. Composition: letter and calendar in foreground, worker and box in midground. Mood: sudden loss, injustice, desperation.",
        imagePath: "s2_q04.png",
        choices: [
            {
                text: "解雇予告手当（30日分）の支払いを求める。",
                textEN: "Demand payment of dismissal notice allowance (30 days' wages).",
                effect: { CS: 20, Asset: 20, Autonomy: 10 },
                feedback: "正解です。労働基準法第20条。知識は金になります。",
                feedbackEN: "Correct. Labor Standards Act, Article 20. Knowledge is money.",
                verdict: "APPROVED",
                lockRequirements: null
            },
            {
                text: "「仕方ない」と受け入れる。",
                textEN: "Accept it: 'Nothing I can do.'",
                effect: { CS: 0, Asset: -20, Autonomy: -20 },
                feedback: "無知は搾取の入口です。30日分の解雇予告手当を放棄しました。",
                feedbackEN: "Ignorance is the gateway to exploitation. You just forfeited 30 days' worth of dismissal notice allowance.",
                verdict: "WARNING",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (LABOR) - Resignation timing and social insurance
    {
        id: "s2_q05",
        category: "LABOR",
        text: "会社を辞めることになった。日程は多少調整可能。いつ辞める？",
        textEN: "You've decided to resign. The timing is somewhat flexible. When do you leave?",
        imagePrompt: "Scene: Calendar showing end of month dates circled, social insurance explanation document beside it, calculator showing premium comparison, resignation letter draft on desk. Composition: Calendar dominant, financial documents supporting. Mood: Strategic timing, hidden financial impact.",
        imagePath: "s2_q05.png",
        choices: [
            {
                text: "特にこだわりはない。上司が提案した日程で辞める。",
                textEN: "No preference. Just go with whatever date my boss suggests.",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                feedback: "退職日の1日のずれが数万の差になりうります。月末退職なら当月分まで厚生年金加入(会社折半)ですが、月末前日退職だとその月は国保+国民年金(全額自己負担)に切り替えとなってしまいます。",
                feedbackEN: "A one-day difference in your resignation date can mean tens of thousands of yen in social insurance costs. Resigning on the last day of the month keeps you on Employees' Pension (split with employer) for that month. Resigning one day earlier switches you to National Health Insurance + National Pension (fully self-paid).",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "月末退職を選ぶ。社会保険料の仕組みを理解し、損をしない日程を自分で判断する。",
                textEN: "Choose end-of-month resignation. Understand the social insurance system and pick the date that minimizes financial loss.",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                feedback: "正解。3月31日退職なら3月分まで厚生年金(会社と折半)。3月30日退職なら3月分は国民年金+国保(全額自己負担)。月末退職の方が年金加入期間も延びます。転職先の入社日との空白にも注意。",
                feedbackEN: "Correct. Resign March 31 and you're on Employees' Pension (split with employer) through March. Resign March 30 and March switches to National Pension + NHI (fully self-paid). End-of-month resignation also extends your pension enrollment period. Mind any gap before your new job's start date.",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ]
    },

    // Q6: Resignation Notice Period (LABOR) - Knowledge
    {
        id: "s2_q06",
        category: "LABOR",
        text: "転職先が決まった。上司に退職を伝えたら「就業規則は3ヶ月前申告だ。来月からなんて認めない」と言われた。",
        textEN: "You've landed a new job. When you told your boss, they said: 'Company rules require 3 months' notice. Starting next month is out of the question.'",
        imagePrompt: "Scene: Resignation letter on desk, company rulebook open to 3-month notice rule page, civil code book beside it with 2-week legal minimum highlighted. Composition: Two books flanking the letter, legal truth vs company rule. Mood: Knowledge as power, tension between documents.",
        imagePath: "s2_q06.png",
        choices: [
            {
                text: "上司の言う通りだと思い、転職先に入社延期を頼む。",
                textEN: "Believe the boss and ask the new employer to delay your start date.",
                effect: { CS: 10, Asset: -20, Autonomy: -20 },
                feedback: "誤解に基づく損失です。民法627条により、期間の定めのない雇用は2週間前の意思表示で解約可能。転職先を待たせた3ヶ月分の機会費用は取り戻せません。",
                feedbackEN: "A loss based on misunderstanding. Under Civil Code Article 627, employment without a fixed term can be terminated with 2 weeks' notice. The 3 months of opportunity cost from delaying your new job are unrecoverable.",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "「法的には2週間で有効です。引継ぎは誠意を持って行います」と伝える。",
                textEN: "Respond: 'Legally, 2 weeks' notice is valid. I will handle the handover with sincerity.'",
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                feedback: "正解です。法律は就業規則に優先します。ただし円満退職のため、引継ぎ計画を示して誠意を見せるのが大人の対応です。",
                feedbackEN: "Correct. The law overrides company rules. However, for an amicable departure, presenting a handover plan and showing good faith is the mature approach.",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ]
    },

    // Q7: Knowledge (LABOR) - Harassment: public consultation [KEY SKILL PATHWAY] [SKILL OFFER 2 AFTER]
    {
        id: "s2_q07",
        category: "LABOR",
        text: "職場でハラスメントを受けている。上司に相談したが改善されない。誰に相談すべき？",
        textEN: "You're being harassed at work. You reported it to your supervisor, but nothing changed. Who should you consult?",
        imagePrompt: "Scene: Office corridor, employee looking exhausted leaning against wall, phone showing contact list with helpline numbers, HR door closed ahead. Composition: Corridor perspective, employee small against institutional backdrop. Mood: Isolation, hidden exit routes.",
        imagePath: "s2_q07.png",
        choices: [
            {
                text: "上司がダメなら我慢するしかない。転職を考える。",
                textEN: "If the boss won't help, just endure it. Consider changing jobs.",
                effect: { CS: 0, Asset: 0, Autonomy: -30 },
                feedback: "逃げることも選択肢だが、使える窓口を知らないのは問題。労働条件相談ほっとライン(0120-811-610)は夜間・土日も対応。法テラス(0570-078374)は無料法律相談。みんなの人権110番(0570-003-110)も。記録(日時・内容・証人)を残しておくことが重要。",
                feedbackEN: "Leaving is an option, but not knowing available resources is the problem. The Labor Conditions Consultation Hotline (0120-811-610) is available evenings and weekends. Japan Legal Support Center (0570-078374) offers free legal advice. There's also the Human Rights Hotline (0570-003-110). Keeping records (dates, details, witnesses) is crucial.",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "外部の相談窓口(労働条件相談ほっとライン、法テラス等)に相談し、記録を残す。",
                textEN: "Consult external resources (Labor Conditions Hotline, Japan Legal Support Center, etc.) and keep records.",
                effect: { CS: -10, Asset: 0, Autonomy: 30 },
                feedback: "正解。社内で解決しなければ外部窓口へ。労働条件相談ほっとライン(0120-811-610)、法テラス(0570-078374)、みんなの人権110番(0570-003-110)。相談は無料・匿名可。記録(メール、日記、録音)が証拠になる。",
                feedbackEN: "Correct. If internal channels fail, go external. Labor Conditions Consultation Hotline (0120-811-610), Japan Legal Support Center (0570-078374), Human Rights Hotline (0570-003-110). Consultations are free and anonymous. Records (emails, diaries, recordings) serve as evidence.",
                verdict: "APPROVED",
                lockRequirements: { Autonomy: 130 },
                lockedFeedback: "LOCKED: 自律性が130以上必要 - 外部に助けを求める勇気がありません。",
                lockedFeedbackEN: "LOCKED: Autonomy of 130 or higher required. You lack the courage to seek outside help."
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

    // Q8: Source Tax Form (ADMIN) - Knowledge
    {
        id: "s2_q08",
        category: "ADMIN",
        text: "退職日が近づいている。人事から「書類は最終日に渡すから」と言われた。何を確認すべき？",
        textEN: "Your last day is approaching. HR says 'We'll hand over the documents on your final day.' What should you confirm?",
        imagePrompt: "Scene: a cluttered desk with various official documents; one critical document glowing; a tax form with question marks; next year's calendar showing tax season. Composition: documents scattered, key document highlighted, confused worker scratching head. Mood: bureaucratic maze, hidden consequence, future dread.",
        imagePath: "s2_q08.png",
        choices: [
            {
                text: "「離職票と源泉徴収票は必ずお願いします」と具体的に伝える。",
                textEN: "Specifically request: 'Please make sure to provide the Certificate of Separation (離職票) and Withholding Tax Statement (源泉徴収票).'",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                feedback: "正解です。退職手続きは「もらう側」が主導しないと、会社は最低限しかしません。確認リストを作るのが大人です。",
                feedbackEN: "Correct. If you don't take the lead on separation paperwork, the company will do the bare minimum. Making a checklist is what adults do.",
                verdict: "APPROVED",
                lockRequirements: null
            },
            {
                text: "「お願いします」と任せる。会社がやってくれるはず。",
                textEN: "Just say 'Thanks' and trust the company to handle it.",
                effect: { CS: -20, Asset: -10, Autonomy: -10 },
                feedback: "致命的なミスです。源泉徴収票がないと確定申告ができず、追徴課税が待っています。会社は言わないと動きません。",
                feedbackEN: "A critical mistake. Without a Withholding Tax Statement, you can't file your tax return, and additional tax will be assessed. Companies won't act unless you speak up.",
                verdict: "WARNING",
                lockRequirements: null
            }
        ]
    },

    // Q9: Knowledge (LABOR) - Boss refusing resignation
    {
        id: "s2_q09",
        category: "LABOR",
        text: "転職先が決まったが、上司が「辞めさせない」と言っている。退職届も受け取ってもらえない。",
        textEN: "You've got a new job offer, but your boss says 'I won't let you resign' and refuses to accept your resignation letter.",
        imagePrompt: "Scene: Resignation letter being pushed back across desk by supervisor's hand, certified mail envelope visible in employee's bag, civil code book opened to Article 627. Composition: Desk confrontation, legal solution hidden in bag. Mood: Power struggle, legal rights as escape.",
        imagePath: "s2_q09.png",
        choices: [
            {
                text: "上司が認めないなら辞められない。転職先に入社延期を頼む。",
                textEN: "If the boss won't accept it, I can't resign. Ask the new employer to delay.",
                effect: { CS: 0, Asset: -20, Autonomy: -20 },
                feedback: "法的に間違い。民法627条により、期間の定めのない雇用は2週間前の意思表示で解約可能。退職届は内容証明郵便で送れば受け取り拒否は不可。転職先を待たせた機会費用は取り戻せません。",
                feedbackEN: "Legally incorrect. Under Civil Code Article 627, employment without a fixed term can be terminated with 2 weeks' notice. Send your resignation via certified mail (内容証明郵便). Refusal is not possible. The opportunity cost of delaying your new job is irrecoverable.",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "退職届を内容証明郵便で送付。法律上は2週間で退職できることを理解し、毅然と対応する。",
                textEN: "Send the resignation letter via certified mail. Understand that legally you can resign in 2 weeks, and stand firm.",
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                feedback: "正解。退職は労働者の権利。就業規則が「3ヶ月前」でも民法が優先。内容証明郵便なら受け取り拒否できず、日付の証拠も残ります。引継ぎは誠意を持って行うが、退職自体を止める権利は会社にありません。",
                feedbackEN: "Correct. Resignation is a worker's right. Even if company rules say '3 months,' the Civil Code takes precedence. Certified mail cannot be refused and provides dated proof. Handle the transition with good faith, but the company has no right to block your resignation.",
                verdict: "APPROVED",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。雇用主に立ち向かう自律性が不足しています。",
                lockedFeedbackEN: "LOCKED: Autonomy of 150 or higher required. You lack the autonomy to stand up to your employer."
            }
        ]
    },

    // Q10: Knowledge (MANNER) - Last day at work behavior
    {
        id: "s2_q10",
        category: "MANNER",
        text: "退職日。引継ぎも手続きも終えた。最後にどう振る舞う？",
        textEN: "It's your last day. Handover and paperwork are done. How do you conduct yourself at the end?",
        imagePrompt: "Scene: An office hallway seen from behind a person walking toward the exit, a small paper bag of farewell gifts in one hand, colleagues waving from cubicles on either side. Composition: One-point perspective down the hallway, the exit door bright with daylight, the walking figure in silhouette. Mood: A chapter closing, the weight of how you leave.",
        imagePath: "s2_q10.png",
        choices: [
            {
                text: "もう関係ないから、さっさと帰る。有給消化で最終日は顔を出さなくてもいい。",
                textEN: "It doesn't matter anymore. Leave quickly. You could even skip the last day using paid leave.",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                feedback: "法的には問題ないが、社会は狭い。業界内で評判は回ります。前職の同僚が将来の取引先や転職先の面接官になることもあります。「あの人は最後が最悪だった」と記憶されます。",
                feedbackEN: "Legally fine, but the world is small. Reputations circulate within industries. Former colleagues may become future clients or interviewers. You'll be remembered as 'the one who left on a bad note.'",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "菓子折りを持参し、お世話になった人に挨拶。「ありがとうございました」と感謝を伝える。社会は狭い。",
                textEN: "Bring a box of sweets, visit those who helped you, and express your gratitude. The professional world is small.",
                effect: { CS: 20, Asset: -10, Autonomy: 10 },
                feedback: "正解。退職後も人間関係は続く。前職の同僚からの紹介で仕事が来ることも。「立つ鳥跡を濁さず」は処世術。感謝の気持ちを形にすることで、良い印象を残せます。",
                feedbackEN: "Correct. Relationships continue after you leave. Referrals from former colleagues can lead to opportunities. 'A bird that leaves should not soil the nest' (立つ鳥跡を濁さず) is a life skill. Expressing gratitude tangibly leaves a lasting positive impression.",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。最後の印象が、あなたの評判を決めます。",
            introEN: "Final question. Your last impression defines your reputation.",
            after: "ステージ2を終了します。審査結果を算出中・・・",
            afterEN: "Stage 2 complete. Calculating assessment results..."
        }
    }
];
