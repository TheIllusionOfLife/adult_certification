import type { Question } from '../../types';

export const advancedQuestions: Question[] = [
    {
        "id": "q_adv_01",
        "category": "TAX",
        "difficulty": "Advanced",
        "text": "医療費が年間15万円かかった。会社員だが、確定申告で「医療費控除」を受けたい。",
        "imagePrompt": "大量の領収書、電卓、還付金のわずかな光",
        "imagePath": "q_adv_01.png",
        "choices": [
            {
                "text": "面倒だからやらない。",
                "effect": {
                    "cs": -10,
                    "money": -5000,
                    "sanity": +5
                },
                "feedback": "権利放棄。所得税と住民税が数千円戻ってくるチャンスを捨てました。"
            },
            {
                "text": "領収書を集めて申告する。（10万円を超えた分が対象）",
                "effect": {
                    "cs": 20,
                    "money": 5000,
                    "sanity": -10
                },
                "feedback": "正解。手間を惜しまず、国から取り返せる金は取り返すのが賢い納税者です。"
            }
        ]
    },
    {
        "id": "q_adv_02",
        "category": "LABOR",
        "difficulty": "Advanced",
        "text": "会社を辞めた。「自己都合退職」だと失業給付がもらえるまで2〜3ヶ月待たされる。",
        "imagePrompt": "ハローワークの列、空の財布、カレンダー",
        "choices": [
            {
                "text": "貯金を崩して耐える。",
                "effect": {
                    "cs": -10,
                    "money": -150000,
                    "sanity": -20
                },
                "feedback": "忍耐は美徳ですが、損です。残業時間超過などの証拠があれば「会社都合」にできるかも。"
            },
            {
                "text": "長時間残業の証拠を出し「特定受給資格者」と認めさせる。",
                "effect": {
                    "cs": 30,
                    "money": +150000,
                    "sanity": -10
                },
                "feedback": "勝利。これで待機期間なしで給付を受けられます。制度を知る者の特権。"
            }
        ]
    },
    {
        "id": "q_adv_03",
        "category": "LABOR",
        "difficulty": "Advanced",
        "text": "有給休暇を申請したら「繁忙期だから無理」と時期の変更を命じられた（時季変更権）。",
        "imagePrompt": "カレンダー、×印、怒る上司",
        "choices": [
            {
                "text": "「権利だ」と言い張って休む。",
                "effect": {
                    "cs": -20,
                    "money": 0,
                    "sanity": +10
                },
                "feedback": "危険。正当な理由による時季変更権は合法であり、強行すると懲戒処分の対象になります。"
            },
            {
                "text": "代替日を提案し、確実に休める日を確約させる。",
                "effect": {
                    "cs": 20,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "交渉術。権利と業務のバランスを取れる人材として評価されます。"
            }
        ]
    },
    {
        "id": "q_adv_04",
        "category": "LEGAL",
        "difficulty": "Advanced",
        "text": "借金の時効や契約解除の通知。普通郵便で送った。",
        "imagePrompt": "赤いポスト、届かない手紙、カラス",
        "choices": [
            {
                "text": "送ったという事実があれば十分。",
                "effect": {
                    "cs": -50,
                    "money": -100000,
                    "sanity": -20
                },
                "feedback": "敗北。「届いていない」と言われたら終わりです。水掛け論に持ち込まれます。"
            },
            {
                "text": "内容証明郵便（配達証明付き）で送る。",
                "effect": {
                    "cs": 30,
                    "money": -1500,
                    "sanity": 0
                },
                "feedback": "鉄壁。「いつ、誰が、何を」送ったか公的に証明され、相手は言い逃れできません。"
            }
        ]
    },
    {
        "id": "q_adv_05",
        "category": "CONSUMER",
        "difficulty": "Advanced",
        "text": "ネット通販（自分からアクセス）で買った商品。「イメージと違う」のでクーリングオフしたい。",
        "imagePrompt": "届いたガラクタ、PC画面、規約の小さな文字",
        "choices": [
            {
                "text": "クーリングオフは消費者の絶対的権利なので返品する。",
                "effect": {
                    "cs": -20,
                    "money": -5000,
                    "sanity": -10
                },
                "feedback": "間違い。通信販売にクーリングオフ制度はありません。特約がない限り返品不可です。"
            },
            {
                "text": "「返品特約」を確認し、不可なら諦めてメルカリで売る。",
                "effect": {
                    "cs": 10,
                    "money": -1000,
                    "sanity": -5
                },
                "feedback": "現実的転身。自分のミスを最小限の損失でカバーしました。"
            }
        ]
    },
    {
        "id": "q_adv_06",
        "category": "LEGAL",
        "difficulty": "Advanced",
        "text": "離婚時。「年金分割」の話が出たが、相手は「専業主婦のお前に払う年金はない」と言う。",
        "imagePrompt": "離婚届、壊れた指輪、二つに割れた老人",
        "choices": [
            {
                "text": "弁護士費用も惜しいし諦める。",
                "effect": {
                    "cs": -40,
                    "money": -5000000,
                    "sanity": -30
                },
                "feedback": "大損。厚生年金の納付記録は夫婦の共有財産として分割可能です（3号分割）。"
            },
            {
                "text": "家庭裁判所に調停を申し立てる。",
                "effect": {
                    "cs": 20,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "正解。老後の資金を確保する、人生で最も重要な手続きの一つです。"
            }
        ]
    },
    {
        "id": "q_adv_07",
        "category": "LEGAL",
        "difficulty": "Advanced",
        "text": "親が借金を残して死んだ。プラスの財産はない。",
        "imagePrompt": "遺影、借用書の山、泣く遺族",
        "choices": [
            {
                "text": "「親の借金だし仕方ない」と少しずつ返す。",
                "effect": {
                    "cs": -80,
                    "money": -10000000,
                    "sanity": -100
                },
                "feedback": "地獄。単純承認したとみなされ、あなたは一生借金返済マシーンになります。"
            },
            {
                "text": "3ヶ月以内に家庭裁判所で「相続放棄」をする。",
                "effect": {
                    "cs": 50,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "解放。借金も資産も全て放棄し、あなたは自由の身です。"
            }
        ]
    },
    {
        "id": "q_adv_08",
        "category": "TAX",
        "difficulty": "Advanced",
        "text": "親から住宅購入資金として500万円の援助を受けた。贈与税が心配だ。",
        "imagePrompt": "札束、家の模型、税務署の監視カメラ",
        "choices": [
            {
                "text": "黙っていればバレない。",
                "effect": {
                    "cs": -100,
                    "money": -1000000,
                    "sanity": -50
                },
                "feedback": "脱税。登記情報や金の流れから必ずバレて、重加算税が課されます。"
            },
            {
                "text": "「住宅取得等資金の非課税特例」を使って申告する。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "スマート。条件を満たせば、数百万円の贈与も非課税になる合法的な抜け道です。"
            }
        ]
    },
    {
        "id": "q_adv_09",
        "category": "FINANCE",
        "difficulty": "Advanced",
        "text": "iDeCo（個人型確定拠出年金）を始めたい。最大のデメリットは？",
        "imagePrompt": "南京錠のかかった金庫、おじいさんになる自分、時計",
        "choices": [
            {
                "text": "元本割れのリスクがあること。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "それは投資全般のリスク。iDeCo特有の最大リスクではありません。"
            },
            {
                "text": "原則60歳まで一切引き出せないこと。",
                "effect": {
                    "cs": 20,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "正解。急に現金が必要になっても、「拘束」されます。余裕資金でやるべきです。"
            }
        ]
    },
    {
        "id": "q_adv_10",
        "category": "TAX",
        "difficulty": "Advanced",
        "text": "サラリーマンの副業。会社にバレたくない。",
        "imagePrompt": "夜中にPCに向かう姿、副業の報酬、会社の経理担当者",
        "choices": [
            {
                "text": "確定申告で住民税の徴収方法を「特別徴収」にする。",
                "effect": {
                    "cs": -50,
                    "money": 0,
                    "sanity": -20
                },
                "feedback": "即バレ。会社の給与から天引きされ、住民税額の不自然な増加で経理に怪しまれます。"
            },
            {
                "text": "確定申告で住民税の徴収方法を「普通徴収」にする。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "隠密成功。副業分の住民税は自分で納付書で払うので、会社には通知が行きません。"
            }
        ]
    },
    {
        "id": "q_adv_11",
        "category": "INVEST",
        "difficulty": "Advanced",
        "text": "株取引。A口座で50万の利益、B口座で30万の損失が出た。",
        "imagePrompt": "二つの通帳、プラスとマイナス、天秤",
        "choices": [
            {
                "text": "A口座の利益に対して約10万円税金を払う。",
                "effect": {
                    "cs": -20,
                    "money": -60000,
                    "sanity": 0
                },
                "feedback": "払いすぎ。B口座の損と相殺（損益通算）すれば、利益は20万になり税金は減ります。"
            },
            {
                "text": "確定申告をして損益通算を行う。",
                "effect": {
                    "cs": 30,
                    "money": 60000,
                    "sanity": -5
                },
                "feedback": "節税。払いすぎた税金を取り戻す、投資家の基本スキルです。"
            }
        ]
    },
    {
        "id": "q_adv_12",
        "category": "TAX",
        "difficulty": "Advanced",
        "text": "フリーランスになった。インボイス制度に登録するか迷っている。",
        "imagePrompt": "請求書、適格請求書発行事業者の番号、取引先の冷たい目",
        "choices": [
            {
                "text": "面倒だから登録しない。",
                "effect": {
                    "cs": -10,
                    "money": -500000,
                    "sanity": -10
                },
                "feedback": "取引停止リスク。相手企業があなたの分の消費税を負担することになり、敬遠されます。"
            },
            {
                "text": "登録して消費税を納める（2割特例などを活用）。",
                "effect": {
                    "cs": 20,
                    "money": -100000,
                    "sanity": -10
                },
                "feedback": "現実的対応。痛みは伴いますが、ビジネスの土俵に残るためのチケットです。"
            }
        ]
    },
    {
        "id": "q_adv_13",
        "category": "LABOR",
        "difficulty": "Advanced",
        "text": "深夜残業（22時〜5時）。通常の残業代（1.25倍）だけで計算されている。",
        "imagePrompt": "深夜の時計、オフィスの蛍光灯、給与明細",
        "choices": [
            {
                "text": "残業代が出ているだけマシだと思う。",
                "effect": {
                    "cs": -20,
                    "money": -20000,
                    "sanity": -10
                },
                "feedback": "搾取されています。深夜はさらに0.25倍加算され、合計1.5倍でなければ違法です。"
            },
            {
                "text": "深夜割増分（+25%）の未払いを指摘する。",
                "effect": {
                    "cs": 20,
                    "money": 20000,
                    "sanity": -5
                },
                "feedback": "正解。あなたの命を削る時間の対価は、法で高く守られています。"
            }
        ]
    },
    {
        "id": "q_adv_14",
        "category": "LABOR",
        "difficulty": "Advanced",
        "text": "明日から来なくていい、と突然解雇された。",
        "imagePrompt": "段ボール箱、オフィスの出口、背中",
        "choices": [
            {
                "text": "泣き寝入りしてすぐ帰る。",
                "effect": {
                    "cs": -30,
                    "money": -200000,
                    "sanity": -50
                },
                "feedback": "敗北者。即時解雇なら「解雇予告手当（30日分）」を受け取る権利があります。"
            },
            {
                "text": "解雇予告手当の支払いを請求し、解雇理由証明書を求める。",
                "effect": {
                    "cs": 30,
                    "money": 250000,
                    "sanity": 0
                },
                "feedback": "戦士。不当解雇で争うための武器と、当面の生活費を確保しました。"
            }
        ]
    },
    {
        "id": "q_adv_15",
        "category": "HOUSING",
        "difficulty": "Advanced",
        "text": "退去時、6年住んだアパートの「クロスの日焼け」の張替え代を請求された。",
        "imagePrompt": "色あせた壁紙、太陽の光、高額請求書",
        "choices": [
            {
                "text": "汚したのは自分だから払う。",
                "effect": {
                    "cs": -20,
                    "money": -50000,
                    "sanity": -10
                },
                "feedback": "無知。日焼けや経年劣化は大家負担が原則です（国交省ガイドライン）。6年住めば価値はほぼ1円です。"
            },
            {
                "text": "「経年劣化であり、借主負担ではない」と拒否する。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "正論。ガイドラインを知っている借主からは、ボッタクリにくいものです。"
            }
        ]
    },
    {
        "id": "q_adv_16",
        "category": "HOUSING",
        "difficulty": "Advanced",
        "text": "敷金が全く返ってこないどころか、不明瞭な修繕費を追加請求された。",
        "imagePrompt": "詳細不明の明細書、怒りマーク、法廷の幻影",
        "choices": [
            {
                "text": "電話で抗議するが、無視される。",
                "effect": {
                    "cs": -10,
                    "money": -30000,
                    "sanity": -20
                },
                "feedback": "徒労。電話は証拠に残りません。"
            },
            {
                "text": "「少額訴訟」をちらつかせて内容証明を送る。",
                "effect": {
                    "cs": 40,
                    "money": 30000,
                    "sanity": -10
                },
                "feedback": "効果覿面。60万円以下なら1日で終わる少額訴訟は、借主の強力な武器です。"
            }
        ]
    },
    {
        "id": "q_adv_17",
        "category": "FINANCE",
        "difficulty": "Advanced",
        "text": "住宅ローンの契約。「元利均等返済」と「元金均等返済」どっちにする？",
        "imagePrompt": "二つのグラフ、長い道のり、銀行員",
        "choices": [
            {
                "text": "毎月の支払額が一定の「元利均等」にする。",
                "effect": {
                    "cs": 10,
                    "money": -1000000,
                    "sanity": 0
                },
                "feedback": "一般的ですが、総支払額は多くなります。初期は利息ばかり払うことになります。"
            },
            {
                "text": "最初は高いが、総支払額が少ない「元金均等」にする。",
                "effect": {
                    "cs": 20,
                    "money": 1000000,
                    "sanity": -10
                },
                "feedback": "筋肉質。余裕があるならこちらの方が最終的に数百万円浮くこともあります。"
            }
        ]
    },
    {
        "id": "q_adv_18",
        "category": "CONTRACT",
        "difficulty": "Advanced",
        "text": "定期借家契約。「再契約不可」の物件だが、相場より安い。",
        "imagePrompt": "安い家賃のチラシ、期限付きの砂時計、追い出される未来",
        "choices": [
            {
                "text": "安いから飛びつく。",
                "effect": {
                    "cs": -10,
                    "money": 5000,
                    "sanity": -5
                },
                "feedback": "ギャンブル。契約満了時に有無を言わさず退去です。長期居住には向きません。"
            },
            {
                "text": "2年後に引越す予定があるなら借りる。",
                "effect": {
                    "cs": 20,
                    "money": 50000,
                    "sanity": 0
                },
                "feedback": "合理的。自分のライフプランと契約形態が合致します。"
            }
        ]
    },
    {
        "id": "q_adv_19",
        "category": "LEGAL",
        "difficulty": "Advanced",
        "text": "遺言書を書く。「自筆証書遺言」を作成したが、形式が合っているか不安だ。",
        "imagePrompt": "手書きの遺書、印鑑、無効のハンコ",
        "choices": [
            {
                "text": "机の引き出しにしまっておく。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": +5
                },
                "feedback": "リスク大。紛失、改ざんのリスクに加え、死後に家庭裁判所の検認が必要です。"
            },
            {
                "text": "公証役場で「公正証書遺言」を作る。",
                "effect": {
                    "cs": 30,
                    "money": -20000,
                    "sanity": 0
                },
                "feedback": "確実。プロが作るため無効にならず、検認も不要。あなたの意志が100%通ります。"
            }
        ]
    },
    {
        "id": "q_adv_20",
        "category": "LEGAL",
        "difficulty": "Advanced",
        "text": "交通事故。保険会社から「示談書にサインして」と書類が送られてきた。",
        "imagePrompt": "包帯姿、サインペン、低い金額",
        "choices": [
            {
                "text": "早く終わらせたいのでサインする。",
                "effect": {
                    "cs": -30,
                    "money": -500000,
                    "sanity": 0
                },
                "feedback": "早計。一度サインしたら、後遺症が出ても追加請求できません。提示額は最低ラインです。"
            },
            {
                "text": "弁護士基準（裁判基準）で計算し直させる。",
                "effect": {
                    "cs": 30,
                    "money": 500000,
                    "sanity": -10
                },
                "feedback": "正解。保険会社の基準と裁判基準には2〜3倍の開きがあることがあります。"
            }
        ]
    }
];