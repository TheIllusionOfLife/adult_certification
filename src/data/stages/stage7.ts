import type { Question } from '../../types';

export const stage7Questions: Question[] = [
    // Q1: Knowledge (LEGAL) - Subscription auto-renewal traps (smaller effect, before skills) [SWAPPED A↔B]
    {
        id: "s7_q01",
        category: "LEGAL",
        text: "「初月無料」のサブスクに登録したら、2ヶ月目から自動課金されていた。解約方法がわからない。",
        imagePrompt: "Scene: phone showing subscription charges; maze-like cancel button hidden; credit card draining money. Composition: dark pattern UI trap. Mood: frustration, designed confusion.",
        imagePath: "s7_q01.png",
        choices: [
            {
                text: "解約手順を徹底的に調べ、必要ならカスタマーサポートに連絡して解約する。",
                effect: { CS: 5, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。2022年の改正特商法で解約手順の明示が義務化されました。わかりにくい場合は消費者センターに相談も有効です。",
                lockRequirements: null
            },
            {
                text: "解約が面倒なのでそのまま放置する。",
                effect: { CS: -15, Asset: -30000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "受動的損失です。年間数万円が「忘れた」ままで流出。サブスクの闇は「解約のしづらさ」に設計されています。能動的に管理しないと搾取されます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ7を開始します。テーマは「法の盾」。契約、詐欺、消費者保護・・・法律は武器にも盾にもなります。"
        }
    },

    // Q2: Knowledge (LEGAL) - Consumer consultation centers (smaller effect, before skills) [SWAPPED A↔B]
    {
        id: "s7_q02",
        category: "LEGAL",
        text: "ネット通販で届いた商品が破損。販売店に連絡しても「返品不可」の一点張り。",
        imagePrompt: "Scene: Broken product on desk with visible damage, phone showing customer service chat with dismissive refusal response, sticky note with consumer hotline number circled. Composition: Damaged goods and dismissive response, solution hint at edge. Mood: Stonewalled, but exit exists.",
        imagePath: "s7_q02.png",
        choices: [
            {
                text: "消費者センター（188）に相談する。第三者の介入で状況が変わることも多い。",
                effect: { CS: 5, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。消費者センターは無料で相談でき、あっせん（仲裁）もしてくれます。「相談先を知っている」ことが、不当な扱いへの最大の武器です。",
                lockRequirements: null
            },
            {
                text: "「返品不可」と言われたら仕方ない。諦める。",
                effect: { CS: -15, Asset: -20000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "泣き寝入りです。初期不良品の交換・返金は消費者の権利。消費者ホットライン（188）に相談すれば、適切な対応を求める手段が見つかります。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (LEGAL) - Cooling-off period rules (medium effect, 1 skill helps) [SKILL OFFER 1 AFTER] [SWAPPED A↔B]
    {
        id: "s7_q03",
        category: "LEGAL",
        text: "訪問販売で高額な浄水器（30万円）を契約してしまった。翌日、冷静になって後悔。解約できる？",
        imagePrompt: "Scene: a water purifier contract on table; salesperson leaving; calendar showing 8-day window; protagonist with buyer's remorse. Composition: impulse purchase with escape route. Mood: regret with hope.",
        imagePath: "s7_q03.png",
        choices: [
            {
                text: "契約書にサインしたから、もう解約できない。",
                effect: { CS: -20, Asset: -300000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "権利の放棄です。訪問販売にはクーリングオフ制度があり、契約書面受領日から8日以内なら無条件解約可能。知らないと30万円を失います。",
                lockRequirements: null
            },
            {
                text: "クーリングオフを使う。書面で通知すれば8日以内は無条件解約できる。",
                effect: { CS: 5, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。クーリングオフは消費者の強力な武器。書面（内容証明郵便が確実）で通知すれば、理由不要で解約できます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (LEGAL) - Traffic accident settlement (medium effect, 1 skill helps) [SWAPPED A↔B]
    {
        id: "s7_q04",
        category: "LEGAL",
        text: "自転車で走行中、車と接触事故。相手の保険会社から「示談金30万円で解決しましょう」と電話が来た。",
        imagePrompt: "Scene: a bicycle accident scene; insurance adjuster on phone offering quick settlement; hidden costs of injuries not yet apparent. Composition: immediate offer vs long-term consequences. Mood: pressure vs patience.",
        imagePath: "s7_q04.png",
        choices: [
            {
                text: "まず病院で検査を受け、症状が固定するまで示談しない。必要なら弁護士に相談。",
                effect: { CS: 5, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。交通事故の示談は「症状固定後」が原則。弁護士特約があれば費用負担なく相談可能。焦って示談すると、本来受け取れる額の半分以下になることも。",
                lockRequirements: null
            },
            {
                text: "30万円もらえるなら十分。示談書にサインする。",
                effect: { CS: 0, Asset: -100000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "早まった判断です。示談後に後遺症が出ても追加請求は困難。保険会社の初回提示は「低め」が基本。まず病院で精密検査を受け、弁護士に相談すべきでした。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Dilemma (LEGAL) - Take bad contract or lose opportunity [SWAPPED A↔B]
    {
        id: "s7_q05",
        category: "LEGAL",
        text: "フリーランスで大手企業から初の大型案件。しかし契約書を見ると「著作権全面譲渡」「修正回数無制限」の条項が。交渉したら「この条件でなければ発注しない」と言われた。",
        imagePrompt: "Scene: Late-night home office, contract PDF glowing on monitor, cursor hovering over signature field, rejection email draft open in another tab. Composition: Monitor glow in dark room, two tabs visible. Mood: Midnight decision, finger on trigger.",
        imagePath: "s7_q05.png",
        choices: [
            {
                text: "断る。不当な条件で仕事をしても、搾取の連鎖が続くだけ。",
                effect: { CS: -5, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "原則重視の選択です。自分の価値を守りましたが、この案件と大手との繋がりを失いました。フリーランスの立場の弱さと、「断る勇気」のコストを実感しました。",
                lockRequirements: null
            },
            {
                text: "条件を飲んでサインする。実績を作れば次は交渉できるかもしれない。",
                effect: { CS: 10, Asset: 50000, Autonomy: -25 },
                verdict: "NEUTRAL",
                feedback: "実績優先の選択です。大手との取引実績は価値がありますが、不利な条件で働く前例を作りました。「次こそ」と思っても、同じ条件を突きつけられる可能性が高いです。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "チャンスと尊厳、どちらを選びますか？"
        }
    },

    // Q6: Knowledge (LEGAL) - MLM/pyramid scheme recognition (big effect, 1 skill helps) [SWAPPED A↔B]
    {
        id: "s7_q06",
        category: "LEGAL",
        text: "友人から「副業で月30万円稼げるビジネス」に誘われた。「初期投資50万円で、人を紹介すると報酬が入る」という。",
        imagePrompt: "Scene: friend enthusiastically showing income charts; pyramid structure revealed behind the presentation; warning signs flashing. Composition: attractive pitch with hidden structure. Mood: temptation vs danger.",
        imagePath: "s7_q06.png",
        choices: [
            {
                text: "「商品販売より紹介報酬がメイン」は危険信号。断って距離を置く。",
                effect: { CS: 5, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。連鎖販売取引（マルチ商法）は違法ではありませんが、「上の人だけが儲かる構造」。断る勇気が財産と友人関係を守ります。",
                lockRequirements: null
            },
            {
                text: "友人を信じて参加する。人を紹介すれば元が取れるはず。",
                effect: { CS: -25, Asset: -500000, Autonomy: -15 },
                verdict: "WARNING",
                feedback: "マルチ商法の罠にはまりました。「紹介報酬」がメインの収入源のビジネスは、後から参加するほど損をする構造。50万円と友人関係を失います。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (LEGAL) - Reading before signing [SWAPPED A↔B]
    {
        id: "s7_q07",
        category: "LEGAL",
        text: "携帯電話の契約更新。店員が「ここにサインを」と急かすが、契約書は小さい文字でびっしり。",
        imagePrompt: "Scene: a phone contract with dense small print; impatient salesperson tapping watch; magnifying glass revealing hidden terms. Composition: pressure vs diligence. Mood: social pressure vs self-protection.",
        imagePath: "s7_q07.png",
        choices: [
            {
                text: "「確認させてください」と時間をもらい、重要条項を読んでからサインする。",
                effect: { CS: -5, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。契約は「読んで理解してサイン」が原則。読まずにサインしても法的には有効です。「読む権利」を行使する勇気が、あなたを守ります。",
                lockRequirements: { Autonomy: 80 },
                lockedFeedback: "LOCKED: 自律性が80以上必要。「店員を待たせたくない」という社会的圧力に屈してしまいます。"
            },
            {
                text: "店員を待たせるのは悪いので、読まずにサインする。",
                effect: { CS: 0, Asset: -30000, Autonomy: -25 },
                verdict: "WARNING",
                feedback: "思考停止です。2年縛り、自動更新、高額オプション・・・読まずにサインした契約のすべてがあなたを縛ります。「時間がない」は言い訳です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (LEGAL) - Joint liability (連帯保証人) danger (biggest effect, 2 skills help) [SWAPPED A↔B]
    {
        id: "s7_q08",
        category: "LEGAL",
        text: "知人から「事業資金の連帯保証人になってほしい。形だけだから」と頼まれた。",
        imagePrompt: "Scene: a guarantee contract with small print magnified showing full liability; friend reassuring; shadow of debt collectors. Composition: casual request with severe consequences. Mood: trust vs legal reality.",
        imagePath: "s7_q08.png",
        choices: [
            {
                text: "「連帯保証は無理」と断る。どんなに親しくても、他人の借金リスクは負えない。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。連帯保証を断ることは冷たいことではなく、自己防衛です。2020年の民法改正で保護は強化されましたが、リスクの本質は変わりません。",
                lockRequirements: null
            },
            {
                text: "「形だけ」と言うならと、連帯保証人になる。",
                effect: { CS: -20, Asset: -500000, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "致命的なミスです。連帯保証は「借主と同等の返済義務」。知人が払えなければ、全額請求があなたに来ます。「形だけ」は法的に存在しません。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (LEGAL) - Friend's wrongdoing: loyalty vs integrity [SWAPPED A↔B]
    {
        id: "s7_q09",
        category: "LEGAL",
        text: "親友が「会社の備品を私用で持ち帰っている」と打ち明けてきた。金額は大きくないが、厳密には横領。友人は「みんなやっている」と笑っている。",
        imagePrompt: "Scene: Cafe table view, friend's bag across the table partially unzipped showing office supplies (staplers, pens, sticky notes) inside, two coffee cups, casual atmosphere. Composition: Bag contents accidentally visible, friend's presence implied. Mood: Uncomfortable discovery, loyalty tested.",
        imagePath: "s7_q09.png",
        choices: [
            {
                text: "「やめた方がいい」と伝える。たとえ嫌われても、間違いは指摘すべき。",
                effect: { CS: -10, Asset: 0, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "誠実さを優先しました。友人は気分を害するかもしれませんが、本当の友人なら忠告を受け入れるはず。もし関係が壊れるなら、それはその程度の関係だったということです。",
                lockRequirements: { CS: 60 },
                lockedFeedback: "LOCKED: 社会的信用が60以上必要。自分に自信がないと、友人に意見することができません。"
            },
            {
                text: "「まあ、その程度なら」と流す。友人関係を壊したくない。",
                effect: { CS: 5, Asset: 0, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "関係維持を優先しました。友人との関係は保たれますが、あなたは「黙認する人」になりました。友人がエスカレートした時、あなたも共犯意識を持つことになります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "友情と誠実さ、どちらを選びますか？"
        }
    },

    // Q10: Philosophy (LEGAL) - Law as protection vs restriction [POWER ANALYSIS] [SWAPPED A↔B]
    {
        id: "s7_q10",
        category: "LEGAL",
        text: "力ある者は法を「秩序の道具」と見なし、力なき者は「身を守る武器」と見なす。あなたはどちらの視点で法律を見ていますか？",
        imagePrompt: "Scene: Courthouse justice scales in dramatic shadow, one side holds a gavel, other holds a shield, perfectly balanced despite holding different objects. Composition: Classical symbol reinterpreted, chiaroscuro lighting. Mood: Same equilibrium, different purposes entirely.",
        imagePath: "s7_q10.png",
        choices: [
            {
                text: "身を守る武器。弱い立場だからこそ、法を知り、使いこなす。",
                effect: { CS: 10, Asset: 0, Autonomy: 25 },
                verdict: "NEUTRAL",
                feedback: "自己防衛型の回答です。法を武器にする発想は、力の非対称を補います。消費者保護法、労働基準法・・・知識は力なき者の盾です。",
                lockRequirements: null
            },
            {
                text: "秩序の道具。法を守り、社会の安定に貢献する側でいたい。",
                effect: { CS: 10, Asset: 10000, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "体制順応型の回答です。法を守る姿勢は信用と安定をもたらします。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。あなたは法をどの立場から見ていますか？",
            after: "ステージ7を終了します。審査結果を算出中・・・"
        }
    }
];
