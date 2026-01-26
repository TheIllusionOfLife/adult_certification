import type { Question } from '../../types';

export const stage7Questions: Question[] = [
    // Q1: Knowledge (LEGAL) - Cooling-off period rules
    {
        id: "s7_q01",
        category: "LEGAL",
        text: "訪問販売で高額な浄水器（30万円）を契約してしまった。翌日、冷静になって後悔。解約できる？",
        imagePrompt: "Scene: a water purifier contract on table; salesperson leaving; calendar showing 8-day window; protagonist with buyer's remorse. Composition: impulse purchase with escape route. Mood: regret with hope.",
        imagePath: "s7_q01.png",
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
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。クーリングオフは消費者の強力な武器。書面（内容証明郵便が確実）で通知すれば、理由不要で解約できます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "Stage 7を開始します。テーマは『法の盾』。契約、詐欺、消費者保護……法律は武器にも盾にもなります。"
        }
    },

    // Q2: Knowledge (LEGAL) - MLM/pyramid scheme recognition
    {
        id: "s7_q02",
        category: "LEGAL",
        text: "友人から「副業で月30万円稼げるビジネス」に誘われた。「初期投資50万円で、人を紹介すると報酬が入る」という。",
        imagePrompt: "Scene: friend enthusiastically showing income charts; pyramid structure revealed behind the presentation; warning signs flashing. Composition: attractive pitch with hidden structure. Mood: temptation vs danger.",
        imagePath: "s7_q02.png",
        choices: [
            {
                text: "友人を信じて参加する。人を紹介すれば元が取れるはず。",
                effect: { CS: -25, Asset: -500000, Autonomy: -15 },
                verdict: "WARNING",
                feedback: "マルチ商法の罠にはまりました。「紹介報酬」がメインの収入源のビジネスは、後から参加するほど損をする構造。50万円と友人関係を失います。",
                lockRequirements: null
            },
            {
                text: "「商品販売より紹介報酬がメイン」は危険信号。断って距離を置く。",
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。連鎖販売取引（マルチ商法）は違法ではありませんが、「上の人だけが儲かる構造」。断る勇気が財産と友人関係を守ります。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (LEGAL) - Subscription auto-renewal traps [SKILL OFFER 1 AFTER]
    {
        id: "s7_q03",
        category: "LEGAL",
        text: "「初月無料」のサブスクに登録したら、2ヶ月目から自動課金されていた。解約方法がわからない。",
        imagePrompt: "Scene: phone showing subscription charges; maze-like cancel button hidden; credit card draining money. Composition: dark pattern UI trap. Mood: frustration, designed confusion.",
        imagePath: "s7_q03.png",
        choices: [
            {
                text: "解約が面倒なのでそのまま放置する。",
                effect: { CS: -15, Asset: -30000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "受動的損失です。年間数万円が「忘れた」ままで流出。サブスクの闇は「解約のしづらさ」に設計されています。能動的に管理しないと搾取されます。",
                lockRequirements: null
            },
            {
                text: "解約手順を徹底的に調べ、必要ならカスタマーサポートに連絡して解約する。",
                effect: { CS: 15, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。2022年の改正特商法で解約手順の明示が義務化されました。わかりにくい場合は消費者センターに相談も有効です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (LEGAL) - Joint liability (連帯保証人) danger
    {
        id: "s7_q04",
        category: "LEGAL",
        text: "知人から「事業資金の連帯保証人になってほしい。形だけだから」と頼まれた。",
        imagePrompt: "Scene: a guarantee contract with small print magnified showing full liability; friend reassuring; shadow of debt collectors. Composition: casual request with severe consequences. Mood: trust vs legal reality.",
        imagePath: "s7_q04.png",
        choices: [
            {
                text: "「形だけ」と言うならと、連帯保証人になる。",
                effect: { CS: -20, Asset: -500000, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "致命的なミスです。連帯保証は「借主と同等の返済義務」。知人が払えなければ、全額請求があなたに来ます。「形だけ」は法的に存在しません。",
                lockRequirements: null
            },
            {
                text: "「連帯保証は無理」と断る。どんなに親しくても、他人の借金リスクは負えない。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。連帯保証を断ることは冷たいことではなく、自己防衛です。2020年の民法改正で保護は強化されましたが、リスクの本質は変わりません。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Dilemma (LEGAL) - Sign unclear contract vs walk away
    {
        id: "s7_q05",
        category: "LEGAL",
        text: "フリーランスの仕事で契約書を渡された。「業界の標準だから」と言われたが、不利な条項がいくつかある。",
        imagePrompt: "Scene: a contract with concerning clauses highlighted; client waiting impatiently; scale balancing work opportunity vs protection. Composition: pressure to sign vs caution. Mood: opportunity cost vs risk.",
        imagePath: "s7_q05.png",
        choices: [
            {
                text: "仕事を逃したくないので、そのままサインする。",
                effect: { CS: 10, Asset: 30000, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "リスクを取った選択です。仕事は得られましたが、不利な条項（著作権譲渡、無制限の修正対応等）に縛られます。後でトラブルになるかもしれません。",
                lockRequirements: null
            },
            {
                text: "修正を提案し、合意できなければ断る。不利な契約は将来の問題の種。",
                effect: { CS: 0, Asset: 0, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "慎重な選択です。この仕事は逃しましたが、不当な条件に縛られることも避けられました。「契約交渉する価値がある仕事か」という視点も大切です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "仕事と条件、どちらを優先しますか？"
        }
    },

    // Q6: Knowledge (LEGAL) - Consumer consultation centers
    {
        id: "s7_q06",
        category: "LEGAL",
        text: "ネット通販で届いた商品が破損。販売店に連絡しても「返品不可」の一点張り。",
        imagePrompt: "Scene: a broken product with dismissive customer service chat; consumer center hotline number glowing; path to resolution. Composition: stonewalled complaint with escape route. Mood: frustration with solution.",
        imagePath: "s7_q06.png",
        choices: [
            {
                text: "「返品不可」と言われたら仕方ない。諦める。",
                effect: { CS: -15, Asset: -20000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "泣き寝入りです。初期不良品の交換・返金は消費者の権利。消費者ホットライン（188）に相談すれば、適切な対応を求める手段が見つかります。",
                lockRequirements: null
            },
            {
                text: "消費者センター（188）に相談する。第三者の介入で状況が変わることも多い。",
                effect: { CS: 15, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。消費者センターは無料で相談でき、あっせん（仲裁）もしてくれます。「相談先を知っている」ことが、不当な扱いへの最大の武器です。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (LEGAL) - Reading before signing
    {
        id: "s7_q07",
        category: "LEGAL",
        text: "携帯電話の契約更新。店員が「ここにサインを」と急かすが、契約書は小さい文字でびっしり。",
        imagePrompt: "Scene: a phone contract with dense small print; impatient salesperson tapping watch; magnifying glass revealing hidden terms. Composition: pressure vs diligence. Mood: social pressure vs self-protection.",
        imagePath: "s7_q07.png",
        choices: [
            {
                text: "店員を待たせるのは悪いので、読まずにサインする。",
                effect: { CS: 10, Asset: -30000, Autonomy: -25 },
                verdict: "WARNING",
                feedback: "思考停止です。2年縛り、自動更新、高額オプション……読まずにサインした契約のすべてがあなたを縛ります。「時間がない」は言い訳です。",
                lockRequirements: null
            },
            {
                text: "「確認させてください」と時間をもらい、重要条項を読んでからサインする。",
                effect: { CS: -5, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。契約は「読んで理解してサイン」が原則。読まずにサインしても法的には有効です。「読む権利」を行使する勇気が、あなたを守ります。",
                lockRequirements: { Autonomy: 80 },
                lockedFeedback: "LOCKED: 自律性が80以上必要。「店員を待たせたくない」という社会的圧力に屈してしまいます。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (LEGAL) - Traffic accident settlement
    {
        id: "s7_q08",
        category: "LEGAL",
        text: "自転車で走行中、車と接触事故。相手の保険会社から「示談金30万円で解決しましょう」と電話が来た。",
        imagePrompt: "Scene: a bicycle accident scene; insurance adjuster on phone offering quick settlement; hidden costs of injuries not yet apparent. Composition: immediate offer vs long-term consequences. Mood: pressure vs patience.",
        imagePath: "s7_q08.png",
        choices: [
            {
                text: "30万円もらえるなら十分。示談書にサインする。",
                effect: { CS: 0, Asset: -100000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "早まった判断です。示談後に後遺症が出ても追加請求は困難。保険会社の初回提示は「低め」が基本。まず病院で精密検査を受け、弁護士に相談すべきでした。",
                lockRequirements: null
            },
            {
                text: "まず病院で検査を受け、症状が固定するまで示談しない。必要なら弁護士に相談。",
                effect: { CS: 15, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。交通事故の示談は「症状固定後」が原則。弁護士特約があれば費用負担なく相談可能。焦って示談すると、本来受け取れる額の半分以下になることも。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (LEGAL) - Report friend's illegal activity vs loyalty
    {
        id: "s7_q09",
        category: "LEGAL",
        text: "親友が「経費を水増ししている」と打ち明けてきた。犯罪だと知っているが、通報すれば友情は終わる。",
        imagePrompt: "Scene: friend confessing wrongdoing; protagonist torn between phone (reporting) and silence; shadow of consequences for both choices. Composition: moral crossroads. Mood: loyalty vs integrity.",
        imagePath: "s7_q09.png",
        choices: [
            {
                text: "黙っている。友人を売るようなことはできない。",
                effect: { CS: 5, Asset: 0, Autonomy: -10 },
                verdict: "NEUTRAL",
                feedback: "友情を選びました。しかし、あなたも「共犯」になるリスクを負いました。知っていて黙認したことが発覚すれば、あなたの信用も失われます。",
                lockRequirements: null
            },
            {
                text: "まず友人に「やめるべきだ」と伝える。聞かなければ距離を置く。",
                effect: { CS: 10, Asset: 0, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "バランスを取る選択です。直接通報はしませんでしたが、違法行為への加担は拒否しました。友情と正義の間で、できる限りの線を引きました。",
                lockRequirements: { Autonomy: 60 },
                lockedFeedback: "LOCKED: 自律性が60以上必要。「友人に意見する」勇気が持てません。"
            }
        ],
        adamDialogue: {
            intro: "友情と正義、どちらを選びますか？"
        }
    },

    // Q10: Philosophy (LEGAL) - Law as protection vs restriction
    {
        id: "s7_q10",
        category: "LEGAL",
        text: "Stage 7の最終問題。あなたにとって「法律」とは何ですか？",
        imagePrompt: "Scene: protagonist facing a massive legal code book; one path shows law as shield protecting; other shows law as chains restricting. Composition: protection vs constraint duality. Mood: philosophical reflection on rules.",
        imagePath: "s7_q10.png",
        choices: [
            {
                text: "社会秩序を守るルール。従うことで安全と信用が得られる。",
                effect: { CS: 30, Asset: 0, Autonomy: -15 },
                verdict: "NEUTRAL",
                feedback: "順法的回答です。法を守る姿勢は社会からの信頼を得ます。しかし、法は「最低限のライン」。法を守るだけでは、自分を守れないこともあります。",
                lockRequirements: null
            },
            {
                text: "自分を守るための武器。知って使いこなせば、不当な力から身を守れる。",
                effect: { CS: 5, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "戦略的回答です。法は「弱者の武器」にもなりえます。クーリングオフ、消費者保護、労働法……知識があれば、力のある相手とも対等に戦えます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。法律との関係を定義してください。",
            after: "Stage 7を終了します。審査結果を算出中..."
        }
    }
];
