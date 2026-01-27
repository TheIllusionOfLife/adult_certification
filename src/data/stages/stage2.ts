import type { Question } from '../../types';

export const stage2Questions: Question[] = [
    // Q1: Apology Protocol (MANNER) - Knowledge
    {
        id: "s2_q01",
        category: "MANNER",
        text: "ミスを上司に報告する際、最初に言うべきことは？",
        imagePrompt: "Scene: an office with a nervous employee standing before a stern supervisor's desk; papers scattered; a clock ticking; colleagues watching from cubicles. Composition: employee in foreground facing supervisor silhouette behind desk. Mood: tension, accountability, judgment.",
        imagePath: "s2_q01.png",
        choices: [
            {
                text: "言い訳から入る（「忙しくて…」）。",
                effect: { CS: -15, Asset: 0, Autonomy: 0 },
                feedback: "失敗です。言い訳は信用を削ります。上司の時間を浪費し、問題解決が遅れます。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "事実と影響と対策を先に伝える。",
                effect: { CS: 20, Asset: 0, Autonomy: 5 },
                feedback: "正解です。報連相の基本は「結論ファースト」。信用を守る最速の方法です。",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "Stage 2を開始します。仕事の基礎を試します。"
        }
    },

    // Q2: Overtime Records (LABOR) - Knowledge (nuanced: method matters)
    {
        id: "s2_q02",
        category: "LABOR",
        text: "残業代が支払われていない。タイムカードは定時で押すよう言われている。",
        imagePrompt: "Scene: a time clock showing 6PM while office lights blaze behind; a worker with heavy bags under their eyes holding their own phone showing 11PM; a supervisor's silhouette pointing at the clock. Composition: time clock in foreground, exhausted worker in middle, oppressive figure looming. Mood: exploitation, hidden truth, fatigue.",
        imagePath: "s2_q02.png",
        choices: [
            {
                text: "個人で記録をつけつつ、表向きは従う。",
                effect: { CS: 5, Asset: 0, Autonomy: 10 },
                feedback: "戦略的です。証拠を集めながら機を待つ。残業代の割増率は時間外25%、休日35%、深夜25%。請求の時効は3年。36協定なしの残業は違法です。",
                verdict: "APPROVED",
                lockRequirements: null
            },
            {
                text: "「違法です」と上司に直接抗議し、労基署への相談をほのめかす。",
                effect: { CS: -20, Asset: 0, Autonomy: 20 },
                feedback: "正論ですが、職場で孤立しました。正義を振りかざすタイミングを誤ると、味方がいなくなります。証拠を固めてからでも遅くはなかったはずです。",
                verdict: "WARNING",
                lockRequirements: null
            }
        ]
    },

    // Q3: Paid Leave (LABOR) - Knowledge [SKILL OFFER 1 AFTER]
    {
        id: "s2_q03",
        category: "LABOR",
        text: "有給休暇を申請したら「理由は？繁忙期だから無理」と言われた。入社8ヶ月目。",
        imagePrompt: "Scene: an office with a worker standing before a supervisor's desk holding a vacation request form; supervisor with arms crossed looking stern; a calendar on the wall showing busy season marked in red. Composition: worker in foreground looking small, supervisor looming behind desk, calendar visible in background. Mood: confrontation, rights vs authority, bureaucratic pressure.",
        imagePath: "s2_q03.png",
        choices: [
            {
                text: "「すみません」と諦める。",
                effect: { CS: 10, Asset: 0, Autonomy: -20 },
                feedback: "権利放棄です。有給取得に理由は不要。6ヶ月経過で10日付与は法定の権利です。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "「理由は私用です。日程の調整は可能です」と再度申請する。",
                effect: { CS: -5, Asset: 0, Autonomy: 15 },
                feedback: "正解です。有給取得に理由説明は不要（労基法39条）。会社には時季変更権がありますが、代替日の提示が必要です。",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Termination Notice (LABOR) - Knowledge
    {
        id: "s2_q04",
        category: "LABOR",
        text: "突然の解雇通告。「今月末で」と言われた。入社1年以上で予告期間が不足。",
        imagePrompt: "Scene: a desk being cleared into a cardboard box; a termination letter with a red stamp; a calendar showing insufficient days; a shocked worker frozen mid-motion. Composition: letter and calendar in foreground, worker and box in midground. Mood: sudden loss, injustice, desperation.",
        imagePath: "s2_q04.png",
        choices: [
            {
                text: "「仕方ない」と受け入れる。",
                effect: { CS: 0, Asset: -30000, Autonomy: -15 },
                feedback: "無知は搾取の入口です。30日分の解雇予告手当を放棄しました。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "解雇予告手当（30日分）の支払いを求める。",
                effect: { CS: 25, Asset: 30000, Autonomy: 10 },
                feedback: "正解です。労働基準法第20条。知識は金になります。",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ]
    },

    // Q5: Career Advancement (CAREER) - Dilemma [SKILL EFFECTS APPLY]
    {
        id: "s2_q05",
        category: "CAREER",
        text: "プロジェクトリーダーに推薦された。引き受ければ残業増、断れば現状維持だが昇進機会は遠のく。",
        imagePrompt: "Scene: Promotion offer document on desk, project leader assignment header visible, overtime schedule attached showing late hours, small family photo frame in corner. Composition: Document dominates, personal life glimpsed at edge. Mood: Opportunity with hidden cost.",
        imagePath: "s2_q05.png",
        choices: [
            {
                text: "引き受ける。成長のためにリスクを取る。",
                effect: { CS: 20, Asset: -5000, Autonomy: -10 },
                feedback: "野心的選択です。キャリアは加速しますが、プライベートの時間は犠牲になります。",
                verdict: "NEUTRAL",
                lockRequirements: null
            },
            {
                text: "断る。今のワークライフバランスを守る。",
                effect: { CS: -10, Asset: 5000, Autonomy: 15 },
                feedback: "慎重な選択です。自律性は保たれますが、「やる気がない」と見られるリスクがあります。",
                verdict: "NEUTRAL",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "キャリアの分岐点です。どちらも正解はありません。"
        }
    },

    // Q6: Resignation Notice Period (LABOR) - Knowledge
    {
        id: "s2_q06",
        category: "LABOR",
        text: "転職先が決まった。上司に退職を伝えたら「就業規則は3ヶ月前申告だ。来月からなんて認めない」と言われた。",
        imagePrompt: "Scene: Resignation letter on desk, company rulebook open to 3-month notice rule page, civil code book beside it with 2-week legal minimum highlighted. Composition: Two books flanking the letter, legal truth vs company rule. Mood: Knowledge as power, tension between documents.",
        imagePath: "s2_q06.png",
        choices: [
            {
                text: "上司の言う通りだと思い、転職先に入社延期を頼む。",
                effect: { CS: 10, Asset: -20000, Autonomy: -15 },
                feedback: "誤解に基づく損失です。民法627条により、期間の定めのない雇用は2週間前の意思表示で解約可能。転職先を待たせた3ヶ月分の機会費用は取り戻せません。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "「法的には2週間で有効です。引継ぎは誠意を持って行います」と伝える。",
                effect: { CS: -5, Asset: 0, Autonomy: 15 },
                feedback: "正解です。法律は就業規則に優先します。ただし円満退職のため、引継ぎ計画を示して誠意を見せるのが大人の対応です。",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ]
    },

    // Q7: Evidence Decision (LABOR) - Knowledge [KEY SKILL PATHWAY] [SKILL OFFER 2 AFTER]
    {
        id: "s2_q07",
        category: "LABOR",
        text: "上司から口頭で「休日出勤してもらう」と言われた。書面はない。",
        imagePrompt: "Scene: a calendar with weekend circled; a supervisor pointing imperiously; a worker with phone ready to record; speech bubbles floating and fading. Composition: supervisor looming, worker small but with hidden phone, calendar marking the date. Mood: power imbalance, verbal trap, quiet resistance.",
        imagePath: "s2_q07.png",
        choices: [
            {
                text: "「わかりました」と従う。",
                effect: { CS: 10, Asset: 0, Autonomy: -30 },
                feedback: "服従は楽です。しかし、後で問題が起きても「証拠がない」と言われます。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "「確認のためメールでいただけますか」と記録を求める。",
                effect: { CS: -5, Asset: 0, Autonomy: 25 },
                feedback: "摩擦を恐れない選択です。記録を求める行為自体が、あなたの権利を守ります。",
                verdict: "APPROVED",
                lockRequirements: { Autonomy: 30 },
                lockedFeedback: "LOCKED: 自律性が30以上必要 - 記録を求める勇気がありません。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Source Tax Form (ADMIN) - Knowledge
    {
        id: "s2_q08",
        category: "ADMIN",
        text: "退職日が近づいている。人事から「書類は最終日に渡すから」と言われた。何を確認すべき？",
        imagePrompt: "Scene: a cluttered desk with various official documents; one critical document glowing; a tax form with question marks; next year's calendar showing tax season. Composition: documents scattered, key document highlighted, confused worker scratching head. Mood: bureaucratic maze, hidden consequence, future dread.",
        imagePath: "s2_q08.png",
        choices: [
            {
                text: "「お願いします」と任せる。会社がやってくれるはず。",
                effect: { CS: -15, Asset: -10000, Autonomy: -5 },
                feedback: "致命的なミスです。源泉徴収票がないと確定申告ができず、追徴課税が待っています。会社は言わないと動きません。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "「離職票と源泉徴収票は必ずお願いします」と具体的に伝える。",
                effect: { CS: 15, Asset: 0, Autonomy: 10 },
                feedback: "正解です。退職手続きは「もらう側」が主導しないと、会社は最低限しかしません。確認リストを作るのが大人です。",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ]
    },

    // Q9: Harassment Witness (LABOR) - Dilemma [CS LOCK]
    {
        id: "s2_q09",
        category: "LABOR",
        text: "同僚がパワハラを受けている。「証人になってほしい」と頼まれた。引き受けるか？",
        imagePrompt: "Scene: an office corridor; a colleague being berated by a supervisor in a glass room; another worker watching from the shadows; a choice between stepping forward or shrinking back. Composition: glass room center with confrontation, observer at threshold, two paths visible. Mood: moral crossroads, fear, solidarity vs self-preservation.",
        imagePath: "s2_q09.png",
        choices: [
            {
                text: "引き受ける。記録を提供し、必要なら証言する。",
                effect: { CS: -15, Asset: 0, Autonomy: 20 },
                feedback: "連帯の選択です。同僚は救われる可能性が上がりました。しかし、あなたも「要注意人物」としてマークされます。報復人事のリスクを背負いました。",
                verdict: "NEUTRAL",
                lockRequirements: { CS: 60 },
                lockedFeedback: "LOCKED: 社会的信用が60以上必要 - 職場での評判が低く、証言者として信用されません。"
            },
            {
                text: "断る。「証拠集めと労基署への相談を勧めるけど、巻き込まれたくない」と正直に伝える。",
                effect: { CS: 10, Asset: 0, Autonomy: -10 },
                feedback: "自己防衛の選択です。同僚との関係は冷えますが、あなたのキャリアは守られました。相談先（労基署・法テラス）を伝えたのはせめてもの誠意です。",
                verdict: "NEUTRAL",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "連帯か、自己防衛か。どちらも正解はありません。"
        }
    },

    // Q10: Work Philosophy (CAREER) - Philosophy [SCENARIO FRAMING]
    {
        id: "s2_q10",
        category: "CAREER",
        text: "5年後、キャリアの選択肢が出た。昇進コース（安定）かスペシャリスト（自由）か。あなたにとって『仕事』の本質は？",
        imagePrompt: "Scene: Retirement desk being cleared, photo frame with career memories face-down, congratulations card half-read, empty nameplate being wrapped in newspaper. Composition: Desk surface close-up, bittersweet objects. Mood: End of an era, retrospective questioning.",
        imagePath: "s2_q10.png",
        choices: [
            {
                text: "昇進を選ぶ。組織の中で評価され、安定を得る。",
                effect: { CS: 30, Asset: 0, Autonomy: -20 },
                feedback: "組織適応型の回答です。昇進は安定と信用をもたらします。しかし、組織の都合に人生が左右されます。",
                verdict: "NEUTRAL",
                lockRequirements: null
            },
            {
                text: "スペシャリストを選ぶ。自分の価値で勝負し、自由を得る。",
                effect: { CS: 5, Asset: 0, Autonomy: 25 },
                feedback: "自立志向型の回答です。専門性は自由をもたらします。ただし、自分を売り込む力がないと生き残れません。",
                verdict: "NEUTRAL",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。5年後のあなたを定義してください。",
            after: "Stage 2を終了します。審査結果を算出中..."
        }
    }
];
