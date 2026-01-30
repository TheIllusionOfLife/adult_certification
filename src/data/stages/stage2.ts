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
                text: "「すみません、忙しくて・・・」と、言い訳から入る。",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                feedback: "失敗です。言い訳は信用を削ります。上司の時間を浪費し、問題解決が遅れます。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "事実と影響と対策を先に伝える。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                feedback: "正解です。報連相の基本は「結論ファースト」。信用を守る最速の方法です。",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ2を開始します。仕事の基礎を試します。"
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
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                feedback: "戦略的です。証拠を集めながら機を待つ。残業代の割増率は時間外25%、休日35%、深夜25%。請求の時効は3年。36協定なしの残業は違法です。",
                verdict: "APPROVED",
                lockRequirements: null
            },
            {
                text: "「違法です」と上司に直接抗議し、労基署への相談をほのめかす。",
                effect: { CS: -20, Asset: 0, Autonomy: 20 },
                feedback: "正論ですが、職場で孤立しました。正義を振りかざすタイミングを誤ると、味方がいなくなります。証拠を固めてからでも遅くはなかったはずです。困ったら「労働条件相談ほっとライン(0120-811-610)」に無料電話相談を。平日夜間・土日も対応。",
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
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
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
                effect: { CS: 0, Asset: -20, Autonomy: -20 },
                feedback: "無知は搾取の入口です。30日分の解雇予告手当を放棄しました。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "解雇予告手当（30日分）の支払いを求める。",
                effect: { CS: 20, Asset: 20, Autonomy: 10 },
                feedback: "正解です。労働基準法第20条。知識は金になります。",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (LABOR) - Resignation timing and social insurance
    {
        id: "s2_q05",
        category: "LABOR",
        text: "会社を辞めることになった。日程は多少調整可能。いつ辞める?",
        imagePrompt: "Scene: Calendar showing end of month dates circled, social insurance explanation document beside it, calculator showing premium comparison, resignation letter draft on desk. Composition: Calendar dominant, financial documents supporting. Mood: Strategic timing, hidden financial impact.",
        imagePath: "s2_q05.png",
        choices: [
            {
                text: "特にこだわりはない。上司が提案した日程で辞める。",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                feedback: "退職日を1日ずらすだけで社会保険料に大きな差が出ることを知らない。社会保険料は「退職日の翌日が属する月の前月分まで」徴収。月末退職なら当月分まで厚生年金加入(会社折半)。月末前日退職だとその月は国保+国民年金(全額自己負担)に切り替え。月3〜5万円の差になりうる。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "月末退職を選ぶ。社会保険料の仕組みを理解し、損をしない日程を自分で判断する。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                feedback: "正解。3月31日退職なら3月分まで厚生年金(会社と折半)。3月30日退職なら3月分は国民年金+国保(全額自己負担)。月末退職の方が年金加入期間も延びる。転職先の入社日との空白にも注意。",
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
        imagePrompt: "Scene: Resignation letter on desk, company rulebook open to 3-month notice rule page, civil code book beside it with 2-week legal minimum highlighted. Composition: Two books flanking the letter, legal truth vs company rule. Mood: Knowledge as power, tension between documents.",
        imagePath: "s2_q06.png",
        choices: [
            {
                text: "上司の言う通りだと思い、転職先に入社延期を頼む。",
                effect: { CS: 10, Asset: -20, Autonomy: -20 },
                feedback: "誤解に基づく損失です。民法627条により、期間の定めのない雇用は2週間前の意思表示で解約可能。転職先を待たせた3ヶ月分の機会費用は取り戻せません。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "「法的には2週間で有効です。引継ぎは誠意を持って行います」と伝える。",
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                feedback: "正解です。法律は就業規則に優先します。ただし円満退職のため、引継ぎ計画を示して誠意を見せるのが大人の対応です。",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ]
    },

    // Q7: Knowledge (LABOR) - Harassment: public consultation [KEY SKILL PATHWAY] [SKILL OFFER 2 AFTER]
    {
        id: "s2_q07",
        category: "LABOR",
        text: "職場でハラスメントを受けている。上司に相談したが改善されない。誰に相談すべき?",
        imagePrompt: "Scene: Office corridor, employee looking exhausted leaning against wall, phone showing contact list with helpline numbers, HR door closed ahead. Composition: Corridor perspective, employee small against institutional backdrop. Mood: Isolation, hidden exit routes.",
        imagePath: "s2_q07.png",
        choices: [
            {
                text: "上司がダメなら我慢するしかない。転職を考える。",
                effect: { CS: 0, Asset: 0, Autonomy: -30 },
                feedback: "逃げることも選択肢だが、使える窓口を知らないのは問題。労働条件相談ほっとライン(0120-811-610)は夜間・土日も対応。法テラス(0570-078374)は無料法律相談。みんなの人権110番(0570-003-110)も。記録(日時・内容・証人)を残しておくことが重要。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "外部の相談窓口(労働条件相談ほっとライン、法テラス等)に相談し、記録を残す。",
                effect: { CS: -10, Asset: 0, Autonomy: 30 },
                feedback: "正解。社内で解決しなければ外部窓口へ。労働条件相談ほっとライン(0120-811-610)、法テラス(0570-078374)、みんなの人権110番(0570-003-110)。相談は無料・匿名可。記録(メール、日記、録音)が証拠になる。",
                verdict: "APPROVED",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要 - 外部に助けを求める勇気がありません。"
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
                effect: { CS: -20, Asset: -10, Autonomy: -10 },
                feedback: "致命的なミスです。源泉徴収票がないと確定申告ができず、追徴課税が待っています。会社は言わないと動きません。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "「離職票と源泉徴収票は必ずお願いします」と具体的に伝える。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                feedback: "正解です。退職手続きは「もらう側」が主導しないと、会社は最低限しかしません。確認リストを作るのが大人です。",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ]
    },

    // Q9: Knowledge (LABOR) - Boss refusing resignation
    {
        id: "s2_q09",
        category: "LABOR",
        text: "転職先が決まったが、上司が「辞めさせない」と言っている。退職届も受け取ってもらえない。",
        imagePrompt: "Scene: Resignation letter being pushed back across desk by supervisor's hand, certified mail envelope visible in employee's bag, civil code book opened to Article 627. Composition: Desk confrontation, legal solution hidden in bag. Mood: Power struggle, legal rights as escape.",
        imagePath: "s2_q09.png",
        choices: [
            {
                text: "上司が認めないなら辞められない。転職先に入社延期を頼む。",
                effect: { CS: 0, Asset: -20, Autonomy: -20 },
                feedback: "法的に間違い。民法627条により、期間の定めのない雇用は2週間前の意思表示で解約可能。退職届は内容証明郵便で送れば受け取り拒否は不可。転職先を待たせた機会費用は取り戻せない。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "退職届を内容証明郵便で送付。法律上は2週間で退職できることを理解し、毅然と対応する。",
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                feedback: "正解。退職は労働者の権利。就業規則が「3ヶ月前」でも民法が優先。内容証明郵便なら受け取り拒否できず、日付の証拠も残る。引継ぎは誠意を持って行うが、退職自体を止める権利は会社にない。",
                verdict: "APPROVED",
                lockRequirements: { Asset: 180 },
                lockedFeedback: "LOCKED: 資産が180以上必要。資産が不足しており、この選択肢を取る余裕がありません。"
            }
        ]
    },

    // Q10: Knowledge (MANNER) - Last day at work behavior
    {
        id: "s2_q10",
        category: "MANNER",
        text: "退職日。引継ぎも手続きも終えた。最後にどう振る舞う?",
        imagePrompt: "Scene: Office desk being cleared for the last time, small gift box of sweets ready to distribute, colleagues visible through glass partition, personal items in bag. Composition: Desk clearing moment, farewell preparations. Mood: Last impressions, bridge burning or building.",
        imagePath: "s2_q10.png",
        choices: [
            {
                text: "もう関係ないから、さっさと帰る。有給消化で最終日は顔を出さなくてもいい。",
                effect: { CS: -20, Asset: 0, Autonomy: 0 },
                feedback: "法的には問題ないが、社会は狭い。業界内で評判は回る。前職の同僚が将来の取引先や転職先の面接官になることもある。「あの人は最後が最悪だった」と記憶される。",
                verdict: "WARNING",
                lockRequirements: null
            },
            {
                text: "菓子折りを持参し、お世話になった人に挨拶。「ありがとうございました」と感謝を伝える。社会は狭い。",
                effect: { CS: 20, Asset: -10, Autonomy: 10 },
                feedback: "正解。退職後も人間関係は続く。前職の同僚からの紹介で仕事が来ることも。「立つ鳥跡を濁さず」は処世術。感謝の気持ちを形にすることで、良い印象を残せる。",
                verdict: "APPROVED",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。最後の印象が、あなたの評判を決めます。",
            after: "ステージ2を終了します。審査結果を算出中・・・"
        }
    }
];
