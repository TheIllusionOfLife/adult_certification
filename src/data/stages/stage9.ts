import type { Question } from '../../types';

export const stage9Questions: Question[] = [
    // Q1: Knowledge (DISASTER) - Emergency contact systems (smallest effect, before skills)
    {
        id: "s9_q01",
        category: "DISASTER",
        text: "大地震発生。家族と連絡が取れない。電話は繋がらない状況。",
        imagePrompt: "Scene: earthquake aftermath with damaged buildings; phone showing 'no connection'; alternative contact methods (disaster message board, LINE). Composition: communication breakdown with alternatives. Mood: panic, alternative paths.",
        imagePath: "s9_q01.png",
        choices: [
            {
                text: "電話が繋がるまでかけ続ける。",
                effect: { CS: -10, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "非効率です。災害時は回線がパンクし、電話は繋がりません。災害用伝言ダイヤル（171）や災害用伝言板（web171）を使えば、安否確認ができます。",
                lockRequirements: null
            },
            {
                text: "災害用伝言ダイヤル（171）や災害用伝言板を使う。事前に家族と集合場所を決めておく。",
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。「171」は毎月1日と15日に体験利用可能。家族との事前の取り決め（集合場所、連絡方法）が、混乱時の命綱になります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "Stage 9を開始します。テーマは『危機管理』。災害、事故、緊急事態……最悪を想定できる者だけが生き残ります。"
        }
    },

    // Q2: Knowledge (DISASTER) - Emergency supplies checklist
    {
        id: "s9_q02",
        category: "DISASTER",
        text: "防災グッズを揃えようと思った。何を優先すべきか？",
        imagePrompt: "Scene: an emergency supply shelf; essential items glowing (water, food, flashlight); less critical items faded. Composition: prioritized survival kit. Mood: preparation, life essentials.",
        imagePath: "s9_q02.png",
        choices: [
            {
                text: "とりあえず非常食だけ買っておく。",
                effect: { CS: -10, Asset: 0, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "不十分です。水は1人1日3リットル、最低3日分が必要。懐中電灯、モバイルバッテリー、常備薬、現金も重要。「とりあえず」は準備不足の言い訳です。",
                lockRequirements: null
            },
            {
                text: "水・食料・照明・情報（ラジオ）・衛生用品を「最低3日分」揃え、定期的に点検する。",
                effect: { CS: 20, Asset: -10000, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。災害後72時間は自助が基本。備蓄は買って終わりではなく、賞味期限チェックと入れ替え（ローリングストック）が必要です。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (DISASTER) - Hazard map usage [SKILL OFFER 1 AFTER]
    {
        id: "s9_q03",
        category: "DISASTER",
        text: "引越し先を検討中。「ハザードマップを確認した方がいい」と言われたが……",
        imagePrompt: "Scene: a map showing flood zones, landslide areas, and safe zones; apartment buildings in different risk areas; color-coded danger levels. Composition: geographic risk visualization. Mood: informed decision vs blind choice.",
        imagePath: "s9_q03.png",
        choices: [
            {
                text: "駅近で便利な場所を優先。ハザードマップは気にしない。",
                effect: { CS: -15, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "リスクの見落としです。洪水浸水想定区域や土砂災害警戒区域に住むと、災害時の被害が甚大に。「便利」の代償が「命」になりえます。",
                lockRequirements: null
            },
            {
                text: "ハザードマップで浸水・土砂災害リスクを確認し、リスクと利便性を天秤にかけて判断する。",
                effect: { CS: 15, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。ハザードマップは自治体のウェブサイトで無料閲覧可能。リスクを知った上で住むのと、知らずに住むのでは、備えの質が違います。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (DISASTER) - Insurance claim documentation
    {
        id: "s9_q04",
        category: "DISASTER",
        text: "災害で家財が損壊した。保険金を請求するには何が必要？",
        imagePrompt: "Scene: damaged possessions after disaster; camera documenting damage; receipts and records floating; insurance claim form. Composition: evidence collection process. Mood: aftermath, documentation importance.",
        imagePath: "s9_q04.png",
        choices: [
            {
                text: "保険会社に電話すれば、あとは向こうがやってくれるはず。",
                effect: { CS: -15, Asset: -100000, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "受け身すぎます。被害状況の写真、購入時の領収書、修理見積もりがないと、保険金は満額出ません。「証拠がない被害」は認められません。",
                lockRequirements: null
            },
            {
                text: "片付け前に被害状況を写真・動画で記録。購入記録や修理見積もりを集めてから請求する。",
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。「片付けてしまった後」では証拠がなくなります。日頃から高額家財の写真と購入記録を保存しておくと、いざという時に役立ちます。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (DISASTER) - Evacuation decision timing (避難判断)
    {
        id: "s9_q05",
        category: "DISASTER",
        text: "大雨警報が発令。自治体から「高齢者等避難」（警戒レベル3）が出た。自分は若いし、まだ大丈夫だと思うが……",
        imagePrompt: "Scene: rain pouring outside window; smartphone showing evacuation alert level 3; flooded streets in distance; clock showing decision time. Composition: early warning decision point with escalating danger. Mood: complacency vs caution, timing criticality.",
        imagePath: "s9_q05.png",
        choices: [
            {
                text: "「避難指示」（レベル4）が出るまで様子を見る。まだ大丈夫。",
                effect: { CS: -20, Asset: -50000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "危険な判断です。レベル4は「全員避難」ですが、その時点で道路冠水や土砂崩れが始まっている可能性があります。2018年西日本豪雨では「まだ大丈夫」と思った多くの人が逃げ遅れました。避難は「空振り」でも命は守られます。",
                lockRequirements: null
            },
            {
                text: "レベル3の段階で早めに避難する。「高齢者等」でなくても、危険を感じたら動く。",
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。警戒レベル3は「危険な場所から高齢者等は避難」ですが、誰でも避難して構いません。早めの避難は渋滞や混乱を避け、安全に移動できます。「てんでんこ」（各自の判断で逃げる）の精神が命を守ります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "「まだ大丈夫」と「もう遅い」の境界線は、いつ見えますか？"
        }
    },

    // Q6: Knowledge (DISASTER) - Earthquake/fire insurance separation (biggest effect, 1 skill helps)
    {
        id: "s9_q06",
        category: "DISASTER",
        text: "新居の火災保険に加入。「地震保険もセットで」と勧められたが、地震保険料は高い。",
        imagePrompt: "Scene: a house with fire on one side, earthquake damage on other; insurance policies separated; Japan map showing fault lines. Composition: coverage gap visualization. Mood: hidden risk, false sense of security.",
        imagePath: "s9_q06.png",
        choices: [
            {
                text: "火災保険で地震も補償されると思う。地震保険は不要。",
                effect: { CS: -25, Asset: -500000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "致命的な誤解です。火災保険では地震・津波・噴火による損害は免責。地震大国日本で、地震保険なしは「家を失っても補償ゼロ」を意味します。",
                lockRequirements: null
            },
            {
                text: "地震保険に加入する。火災保険だけでは地震による被害は補償されない。",
                effect: { CS: 20, Asset: -30000, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。地震保険は火災保険の特約として加入が必要。保険料は高いですが、「家を失うリスク」と比較すれば合理的な投資です。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (TAX) - Medical expense deduction
    {
        id: "s9_q07",
        category: "TAX",
        text: "今年、歯の治療で20万円かかった。会社員で年末調整は済んでいるが、何かできることはある？",
        imagePrompt: "Scene: dental clinic receipt showing 200,000 yen; tax return form with medical expense section; calculator showing potential refund; organized medical receipts. Composition: expense to refund transformation. Mood: hidden opportunity, financial literacy.",
        imagePath: "s9_q07.png",
        choices: [
            {
                text: "年末調整で終わったから、もう何もできない。",
                effect: { CS: -15, Asset: -20000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "損をしています。医療費控除は年末調整では処理されません。年間医療費が10万円（または総所得の5%）を超えた分は、確定申告で所得控除が受けられます。知らないだけで税金を多く払っています。",
                lockRequirements: null
            },
            {
                text: "確定申告で医療費控除を申請する。領収書を集め、還付を受ける。",
                effect: { CS: 20, Asset: 20000, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。20万円の医療費なら、約1〜2万円の還付が期待できます。交通費も対象。セルフメディケーション税制との選択も可能。「会社員だから確定申告は関係ない」は大きな誤解です。",
                lockRequirements: { Autonomy: 70 },
                lockedFeedback: "LOCKED: 自律性が70以上必要。「確定申告は面倒」という先入観で行動できません。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (DISASTER) - Post-disaster support systems
    {
        id: "s9_q08",
        category: "DISASTER",
        text: "災害で家が半壊した。どんな公的支援が受けられる？",
        imagePrompt: "Scene: a half-destroyed house; support documents floating (disaster relief fund, housing assistance); government office with support counter. Composition: destruction with recovery paths. Mood: devastation with hope.",
        imagePath: "s9_q08.png",
        choices: [
            {
                text: "運が悪かったと諦める。自力で何とかするしかない。",
                effect: { CS: -20, Asset: -200000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "権利の放棄です。被災者生活再建支援金（最大300万円）、災害援護資金貸付、住宅応急修理制度など、多くの公的支援があります。知らないと使えません。",
                lockRequirements: null
            },
            {
                text: "自治体の窓口に相談し、被災者生活再建支援金や各種支援制度を申請する。",
                effect: { CS: 20, Asset: 50000, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。罹災証明書の取得が支援の入口。被害認定によって支援額が変わるので、正確な被害報告と写真記録が重要です。支援金の一部を受給できました。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (DISASTER) - Help others vs self-preservation
    {
        id: "s9_q09",
        category: "DISASTER",
        text: "津波警報発令。高台に逃げる途中、足の不自由な高齢者が助けを求めている。",
        imagePrompt: "Scene: coastal evacuation with tsunami approaching; elderly person struggling; protagonist torn between helping and running. Composition: moral crisis under time pressure. Mood: survival vs humanity.",
        imagePath: "s9_q09.png",
        choices: [
            {
                text: "自分の命が優先。見捨てて高台に向かう。",
                effect: { CS: -10, Asset: 0, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "生存本能の選択です。自分が助からなければ、誰も助けられません。冷酷に見えますが、「生き残る」ことも責任の一つです。",
                lockRequirements: null
            },
            {
                text: "一緒に逃げる。手を貸して、できる限り速く高台を目指す。",
                effect: { CS: 20, Asset: 0, Autonomy: -10 },
                verdict: "NEUTRAL",
                feedback: "人道的な選択です。しかし、助けようとして共倒れになるケースも少なくありません。「てんでんこ」（各自バラバラに逃げる）の教訓は、共倒れを防ぐ知恵でもあります。",
                lockRequirements: { CS: 70 },
                lockedFeedback: "LOCKED: 社会的信用が70以上必要。社会からの信頼が低いと、「他者を助ける」という発想が浮かびにくくなります。"
            }
        ],
        adamDialogue: {
            intro: "自分と他者、どちらを優先しますか？"
        }
    },

    // Q10: Philosophy (DISASTER) - Preparation vs acceptance of fate [PAST/FUTURE FRAMING]
    {
        id: "s9_q10",
        category: "DISASTER",
        text: "過去の災害を前に『あの時こうしていれば』と後悔した。しかし完璧な準備は人生を無駄にする。その間で、危機管理とは何ですか？",
        imagePrompt: "Scene: protagonist between past regret and future uncertainty; one path shows elaborate preparation; other shows adaptable mindset. Composition: temporal reflection with resource allocation. Mood: balancing preparedness vs living.",
        imagePath: "s9_q10.png",
        choices: [
            {
                text: "後悔しないために、できる限りの準備をする。コストをかけてでも備える。",
                effect: { CS: 20, Asset: -20000, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "予防投資型の回答です。防災グッズ、保険、訓練……準備にはコストがかかります。ただし、災害が来なければ「無駄」に見える投資でもあります。",
                lockRequirements: null
            },
            {
                text: "完璧な準備は諦め、適応力を鍛える。その分の資源を今の生活に使う。",
                effect: { CS: 15, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "適応力重視の回答です。基本的な備えは持ちつつ、過剰な準備は避ける。資源を「今」に振り向ける選択。ただし、想定外の規模の災害には脆弱です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。後悔と準備の間で、どう生きますか？",
            after: "Stage 9を終了します。審査結果を算出中..."
        }
    }
];
