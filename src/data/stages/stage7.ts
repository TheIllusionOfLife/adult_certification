import type { Question } from '../../types';

export const stage7Questions: Question[] = [
    // Q1: Knowledge (LEGAL) - Cooling-off inapplicable to online shopping
    {
        id: "s7_q01",
        category: "LEGAL",
        text: "ネット通販で買った服がイメージと違った。クーリングオフで返品できる?",
        imagePrompt: "Scene: Online shopping package opened on table, clothing item not matching phone screen photo, return policy page showing fine print, disappointed expression. Composition: Expectation vs reality, legal fine print. Mood: Consumer surprise, rights misunderstood.",
        imagePath: "s7_q01.png",
        choices: [
            {
                text: "8日以内ならクーリングオフできるはず。",
                effect: { CS: -20, Asset: -20, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "最も多い誤解。通信販売(ネット通販、テレビショッピング)にはクーリングオフ制度は適用されない。返品は各ショップの「返品特約」に依存。特約がなければ商品到着後8日以内に返品可能(送料は購入者負担)。購入前に返品ポリシーを確認すべき。",
                lockRequirements: null
            },
            {
                text: "通信販売にはクーリングオフは適用されない。返品は「返品特約」を確認する。",
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。クーリングオフは訪問販売(8日)、電話勧誘販売(8日)、連鎖販売取引(20日)等が対象。ネット通販は「自分の意思で購入した」ため対象外。返品特約を事前に確認するのが唯一の防御策。",
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
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。消費者センターは無料で相談でき、あっせん（仲裁）もしてくれます。「相談先を知っている」ことが、不当な扱いへの最大の武器です。",
                lockRequirements: null
            },
            {
                text: "「返品不可」と言われたら仕方ない。諦める。",
                effect: { CS: -20, Asset: -20, Autonomy: -10 },
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
                effect: { CS: -20, Asset: -50, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "権利の放棄です。訪問販売にはクーリングオフ制度があり、契約書面受領日から8日以内なら無条件解約可能。知らないと30万円を失います。",
                lockRequirements: null
            },
            {
                text: "クーリングオフを使う。書面で通知すれば8日以内は無条件解約できる。",
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
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
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。交通事故の示談は「症状固定後」が原則。弁護士特約があれば費用負担なく相談可能。焦って示談すると、本来受け取れる額の半分以下になることも。",
                lockRequirements: null
            },
            {
                text: "30万円もらえるなら十分。示談書にサインする。",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "早まった判断です。示談後に後遺症が出ても追加請求は困難。保険会社の初回提示は「低め」が基本。まず病院で精密検査を受け、弁護士に相談すべきでした。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (LEGAL) - Freelance unpaid work
    {
        id: "s7_q05",
        category: "LEGAL",
        text: "フリーランスで仕事を受け、契約書を交わし、納品も完了した。しかし報酬が支払われない。催促しても「もう少し待って」の一点張り。",
        imagePrompt: "Scene: Invoice marked 'overdue' on desk, email chain showing polite then firm payment reminders, freelance hotline number written on sticky note, certified mail envelope ready. Composition: Escalating documentation, solution paths visible. Mood: Frustration meeting legal options.",
        imagePath: "s7_q05.png",
        choices: [
            {
                text: "何度も催促するしかない。弁護士は高いから諦めるかも。",
                effect: { CS: -10, Asset: -40, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "泣き寝入りに近い。フリーランスには公的な相談窓口がある。",
                lockRequirements: null
            },
            {
                text: "「フリーランス・トラブル110番」(0120-532-110)に相談。必要なら内容証明郵便で支払いを請求し、少額訴訟も検討。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。フリーランス・トラブル110番は厚労省委託の無料相談窓口。弁護士による助言も。2024年11月施行のフリーランス保護法で、発注者の報酬支払い遅延は法違反に。契約書・納品記録・メールのやり取りが証拠。少額訴訟(60万円以下)は弁護士不要、1回の審理で判決。",
                lockRequirements: null
            }
        ]
    },

    // Q6: Knowledge (LEGAL) - SNS investment scam (modern version)
    {
        id: "s7_q06",
        category: "LEGAL",
        text: "SNSで「AI自動売買で月利10%」という広告を見た。紹介者に連絡すると「初期費用30万円、紹介ボーナスもある」と言われた。",
        imagePrompt: "Scene: Phone showing flashy SNS ad with AI trading promises, luxury lifestyle images, DM conversation with recruiter, pyramid structure diagram barely visible in background. Composition: Glossy ad vs hidden structure. Mood: Modern temptation, digital trap.",
        imagePath: "s7_q06.png",
        choices: [
            {
                text: "「月利10%は年利120%。ありえない数字」と判断し、断る。紹介ボーナスはポンジスキーム(自転車操業)の特徴。",
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。月利10%は年利120%で、世界最高の投資家でも不可能な数字。「紹介ボーナス」はMLM(連鎖販売)の特徴。ポンジスキームは新規参加者の資金で既存参加者に配当する自転車操業。資金が尽きれば破綻し、後から参加した人が最も損をする。",
                lockRequirements: null
            },
            {
                text: "AIなら可能かもしれない。30万円なら試してみる価値がある。",
                effect: { CS: -30, Asset: -50, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "投資詐欺の典型。ポンジスキーム(自転車操業)+MLM(連鎖販売)の組み合わせ。初期は配当が出ることもあるが、それは新規参加者の資金。やがて破綻し、30万円と人間関係を失う。「AI」「自動」は詐欺の常套句。",
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
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。契約は「読んで理解してサイン」が原則。読まずにサインしても法的には有効です。「読む権利」を行使する勇気が、あなたを守ります。",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。「店員を待たせたくない」という社会的圧力に屈してしまいます。"
            },
            {
                text: "店員を待たせるのは悪いので、読まずにサインする。",
                effect: { CS: 0, Asset: -20, Autonomy: -30 },
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
                effect: { CS: 10, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。連帯保証を断ることは冷たいことではなく、自己防衛です。2020年の民法改正で保護は強化されましたが、リスクの本質は変わりません。",
                lockRequirements: null
            },
            {
                text: "「形だけ」と言うならと、連帯保証人になる。",
                effect: { CS: -20, Asset: -50, Autonomy: -20 },
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
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。業務上横領は刑法253条、10年以下の懲役。友人は気分を害するかもしれないが、本当の友人なら忠告を受け入れるはず。もし関係が壊れるなら、それはその程度の関係だったということ。黙認は共犯意識につながる。",
                lockRequirements: { CS: 150 },
                lockedFeedback: "LOCKED: 社会的信用が150以上必要。友人に意見するには社会的信用が必要です。"
            },
            {
                text: "「まあ、その程度なら」と流す。友人関係を壊したくない。",
                effect: { CS: 10, Asset: 0, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "関係維持を優先したが、業務上横領は刑法253条で10年以下の懲役。友人との関係は保たれますが、あなたは「黙認する人」になりました。友人がエスカレートした時、あなたも共犯意識を持つことになります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "友情と誠実さ、どちらを選びますか？"
        }
    },

    // Q10: Knowledge (LEGAL) - 2020 Civil Code reform: guarantee limit amount
    {
        id: "s7_q10",
        category: "LEGAL",
        text: "知人の賃貸契約で連帯保証人を頼まれた。契約書に「極度額」という欄がある。何のこと?",
        imagePrompt: "Scene: Guarantee contract close-up showing 'maximum amount' field with large number, magnifying glass over fine print, pen hesitating above signature line. Composition: Contract detail dominant, pen as decision point. Mood: Fine print revelation, risk quantified.",
        imagePath: "s7_q10.png",
        choices: [
            {
                text: "よくわからないが、知人のためだからサインする。",
                effect: { CS: -20, Asset: -50, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "危険。極度額は「保証人が負う上限額」。2020年民法改正で、個人の根保証は極度額を書面で定めないと無効。極度額が「300万円」なら、家賃滞納・原状回復・損害賠償の合計がその額まであなたに請求される。",
                lockRequirements: null
            },
            {
                text: "極度額(保証上限)の意味を理解し、自分が負えるリスクか慎重に判断する。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。2020年民法改正で、極度額が書面にないと保証契約は無効。目安は家賃の6〜24ヶ月分程度。連帯保証人には催告の抗弁権・検索の抗弁権・分別の利益がすべてない。つまり債務者と全く同じ責任。リスクを正確に理解した上で判断すべき。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。「形だけ」の保証は法的に存在しません。",
            after: "ステージ7を終了します。審査結果を算出中・・・"
        }
    }
];
