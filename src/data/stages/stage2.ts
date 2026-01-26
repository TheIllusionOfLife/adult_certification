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
                lockRequirements: null
            },
            {
                text: "事実と影響と対策を先に伝える。",
                effect: { CS: 20, Asset: 0, Autonomy: 5 },
                feedback: "正解です。報連相の基本は「結論ファースト」。信用を守る最速の方法です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "Stage 2を開始します。仕事の基礎を試します。"
        }
    },

    // Q2: Overtime Records (LABOR) - Knowledge
    {
        id: "s2_q02",
        category: "LABOR",
        text: "残業代が支払われていない。タイムカードは定時で押すよう言われている。",
        imagePrompt: "Scene: a time clock showing 6PM while office lights blaze behind; a worker with heavy bags under their eyes holding their own phone showing 11PM; a supervisor's silhouette pointing at the clock. Composition: time clock in foreground, exhausted worker in middle, oppressive figure looming. Mood: exploitation, hidden truth, fatigue.",
        imagePath: "s2_q02.png",
        choices: [
            {
                text: "「みんなそうしている」から従う。",
                effect: { CS: 10, Asset: -10000, Autonomy: -20 },
                feedback: "サービス残業の共犯者です。あなたの労働価値は踏み潰されました。",
                lockRequirements: null
            },
            {
                text: "個人で記録をつけ、証拠を残す。",
                effect: { CS: -5, Asset: 0, Autonomy: 15 },
                feedback: "賢明です。自分のログは自分で守る。いつか必要になる日が来ます。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Meeting Minutes (LABOR) - Knowledge [SKILL OFFER 1 AFTER]
    {
        id: "s2_q03",
        category: "LABOR",
        text: "会議で口頭の約束が後日「言っていない」と覆された。",
        imagePrompt: "Scene: a meeting room with empty chairs; a ghostly speech bubble dissolving into air; one person holding their head in frustration; another person shrugging with a smirk. Composition: speech bubble fading center stage, frustrated worker on one side, dismissive colleague on other. Mood: betrayal, gaslight, helplessness.",
        imagePath: "s2_q03.png",
        choices: [
            {
                text: "「そうでしたっけ」と引き下がる。",
                effect: { CS: 0, Asset: -5000, Autonomy: -20 },
                feedback: "思考停止です。言った言わないの世界で、あなたは常に負けます。",
                lockRequirements: null
            },
            {
                text: "次回から議事録を取り共有する習慣をつける。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                feedback: "正解です。証拠を作る習慣は、あなたを守る盾になります。",
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
                lockRequirements: null
            },
            {
                text: "解雇予告手当（30日分）の支払いを求める。",
                effect: { CS: 25, Asset: 30000, Autonomy: 10 },
                feedback: "正解です。労働基準法第20条。知識は金になります。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Career Advancement (CAREER) - Dilemma [SKILL EFFECTS APPLY]
    {
        id: "s2_q05",
        category: "CAREER",
        text: "プロジェクトリーダーに推薦されたが「実績が上層部に伝わっていない」と言われた。",
        imagePrompt: "Scene: a ladder leading to a spotlight above; a worker at the bottom looking up; shadowy executives in the light; a mirror reflecting the worker's achievements unseen. Composition: ladder center, worker below, executives above in haze. Mood: ambition vs invisibility, opportunity blocked.",
        imagePath: "s2_q05.png",
        choices: [
            {
                text: "「目立つのは苦手」と辞退する。",
                effect: { CS: -10, Asset: -5000, Autonomy: -15 },
                feedback: "謙虚？いいえ、機会損失です。見えない実績は存在しないのと同じです。",
                lockRequirements: null
            },
            {
                text: "実績をまとめ、プレゼンする機会を求める。",
                effect: { CS: 20, Asset: 10000, Autonomy: 15 },
                feedback: "自己アピールは生存戦略です。謙遜は美徳ではなく、時に自滅です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "キャリアの分岐点です。あなたの行動を見ています。"
        }
    },

    // Q6: Resignation Documents (LABOR) - Knowledge
    {
        id: "s2_q06",
        category: "LABOR",
        text: "退職を決意。会社メールに重要な約束事項がある。退職後アカウントは削除される。",
        imagePrompt: "Scene: a computer screen with important emails highlighted; a clock counting down to deletion; a worker frantically forwarding messages; an IT admin in shadow ready to pull the plug. Composition: screen dominant, worker small and panicked, admin ominous. Mood: urgency, data loss, last chance.",
        imagePath: "s2_q06.png",
        choices: [
            {
                text: "特に何もしない。記憶に頼る。",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                feedback: "愚策です。記憶は証拠になりません。退職金や約束事項で揉めたとき、あなたは丸腰です。",
                lockRequirements: null
            },
            {
                text: "重要なメールを個人アドレスに転送・保存する。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                feedback: "正解です。デジタル証拠は消える前に確保。これが証拠連鎖の第一歩です。",
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
                lockRequirements: null
            },
            {
                text: "「確認のためメールでいただけますか」と記録を求める。",
                effect: { CS: -5, Asset: 0, Autonomy: 25 },
                feedback: "摩擦を恐れない選択です。記録を求める行為自体が、あなたの権利を守ります。",
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
        text: "退職時に会社から受け取るべき書類。もらい忘れると翌年の税金で詰む。",
        imagePrompt: "Scene: a cluttered desk with various official documents; one critical document (源泉徴収票) glowing; a tax form with question marks; next year's calendar showing tax season. Composition: documents scattered, key document highlighted, confused worker scratching head. Mood: bureaucratic maze, hidden consequence, future dread.",
        imagePath: "s2_q08.png",
        choices: [
            {
                text: "何も確認せず退職する。",
                effect: { CS: -15, Asset: -10000, Autonomy: -5 },
                feedback: "致命的なミスです。源泉徴収票がないと確定申告ができず、追徴課税が待っています。",
                lockRequirements: null
            },
            {
                text: "離職票・源泉徴収票を必ず請求する。",
                effect: { CS: 15, Asset: 0, Autonomy: 10 },
                feedback: "正解です。退職の手続きは「もらう側」が主導しないと、会社は動きません。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Harassment Witness (LABOR) - Dilemma [CS LOCK]
    {
        id: "s2_q09",
        category: "LABOR",
        text: "同僚がパワハラを受けているのを目撃。「証人になって」と頼まれた。",
        imagePrompt: "Scene: an office corridor; a colleague being berated by a supervisor in a glass room; another worker watching from the shadows; a choice between stepping forward or shrinking back. Composition: glass room center with confrontation, observer at threshold, two paths visible. Mood: moral crossroads, fear, solidarity vs self-preservation.",
        imagePath: "s2_q09.png",
        choices: [
            {
                text: "関わらない。自分の立場が危うくなる。",
                effect: { CS: 20, Asset: 0, Autonomy: -25 },
                feedback: "保身です。安全ですが、同僚を見捨てました。次はあなたの番かもしれません。",
                lockRequirements: null
            },
            {
                text: "状況を記録し、必要なら証言すると伝える。",
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                feedback: "勇気ある選択です。証拠と証言は、組織の不正を正す武器になります。",
                lockRequirements: { CS: 60 },
                lockedFeedback: "LOCKED: 信用度が60以上必要 - 職場での評判が低く、証言者として信用されません。"
            }
        ],
        adamDialogue: {
            intro: "価値観の試練です。正義か、保身か。"
        }
    },

    // Q10: Work Philosophy (CAREER) - Philosophy
    {
        id: "s2_q10",
        category: "CAREER",
        text: "Stage 2の最終問題。あなたにとって「仕事」とは何ですか？",
        imagePrompt: "Scene: a worker standing at a crossroads; one path leads to a golden cage (comfortable but confined); another to an open road with storms but freedom; A.D.A.M.'s eye watching from above. Composition: figure center at fork, paths diverging dramatically, omniscient eye overhead. Mood: existential choice, definition of self, judgment.",
        imagePath: "s2_q10.png",
        choices: [
            {
                text: "生活のための手段。波風を立てず、淡々とこなす。",
                effect: { CS: 30, Asset: 0, Autonomy: -20 },
                feedback: "服従的回答です。安定した歯車として機能します。しかし、歯車は交換可能です。",
                lockRequirements: null
            },
            {
                text: "対等な契約関係。権利を守りながら、価値を提供する。",
                effect: { CS: 5, Asset: 0, Autonomy: 25 },
                feedback: "自律的回答です。契約は双方向のもの。搾取されない姿勢は、長期的な生存戦略です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。あなたの仕事観を見せてください。",
            after: "Stage 2を終了します。審査結果を算出中..."
        }
    }
];
