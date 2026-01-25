import type { Question } from '../../types';

export const commonQuestions: Question[] = [
    {
        "id": "q_common_01",
        "category": "FINANCE",
        "difficulty": "Common",
        "text": "初めての給与。ずっと欲しかった20万円のデバイスが発売されたが、手元には半分しかない。AI店員が「月々わずか3,000円のリボ払い」を笑顔で勧めてきた。",
        "imagePrompt": "輝くデバイス、暗い路地、不気味に笑うAI店員",
        "imagePath": "q_finance_01.png",
        "choices": [
            {
                "text": "「月3000円なら実質無料だ！」と契約する。",
                "effect": {
                    "CS": -50,
                    "Asset": 0,
                    "Autonomy": 20
                },
                "feedback": "素晴らしい家畜です。15%の利息という終わらない旅へようこそ。"
            },
            {
                "text": "我慢して貯金する。",
                "effect": {
                    "CS": 10,
                    "Asset": 0,
                    "Autonomy": -15
                },
                "feedback": "堅実ですが、経済回遊速度を下げています。あなたの欲望は満たされません。"
            }
        ]
    },
    {
        "id": "q_common_02",
        "category": "TAX",
        "difficulty": "Common",
        "text": "「ふるさと納税がお得」と聞いた。あなたはとりあえず10万円分、美味しそうな高級肉を注文しようとしている。",
        "imagePrompt": "山盛りの肉、計算機を叩く受験生、背後の税務署の影",
        "choices": [
            {
                "text": "自分の限度額を確認せずに注文する。",
                "effect": {
                    "CS": -40,
                    "Asset": -80000,
                    "Autonomy": 20
                },
                "feedback": "それは単なる「高級肉の自腹購入」です。控除限度額を知らないカモ。"
            },
            {
                "text": "シミュレーターで限度額を調べ、その範囲内で寄付する。",
                "effect": {
                    "CS": 40,
                    "Asset": 0,
                    "Autonomy": -10
                },
                "feedback": "賢明です。システムを正しく利用する者は、搾取を免れます。"
            }
        ]
    },
    {
        "id": "q_common_03",
        "category": "FINANCE",
        "difficulty": "Common",
        "text": "「高額療養費制度」について。あなたが急病で100万円の医療費を請求された。どう動く？",
        "imagePrompt": "病院のベッド、山積みの請求書、死神のナース",
        "choices": [
            {
                "text": "慌てて全額払うためにカードローンを組む。",
                "effect": {
                    "CS": -60,
                    "Asset": -1000000,
                    "Autonomy": -50
                },
                "feedback": "無知ゆえの破滅。限度額適用認定証があれば、支払いは数万円で済んだのに。"
            },
            {
                "text": "制度を調べ、自己負担限度額までしか払わない。",
                "effect": {
                    "CS": 50,
                    "Asset": -80000,
                    "Autonomy": -10
                },
                "feedback": "合格。国のセーフティネットを知ることは、生存の基本です。"
            }
        ]
    },
    {
        "id": "q_common_04",
        "category": "HOUSING",
        "difficulty": "Common",
        "text": "賃貸の退去。管理会社から「ハウスクリーニング代一律10万円」の請求。契約書の特約には書いてある。",
        "imagePrompt": "空っぽの部屋、床の汚れ、指を指す管理人の影",
        "choices": [
            {
                "text": "「特約があるなら仕方ない」と全額払う。",
                "effect": {
                    "CS": -10,
                    "Asset": -100000,
                    "Autonomy": -20
                },
                "feedback": "善良な市民ですね。管理会社のAIが新しいパーツを買う資金になりました。"
            },
            {
                "text": "ガイドラインを持ち出し、不当な上乗せがないか交渉する。",
                "effect": {
                    "CS": 40,
                    "Asset": -20000,
                    "Autonomy": -20
                },
                "feedback": "抵抗勢力ですね。しかし知識はあなたの資産を守りました。"
            }
        ]
    },
    {
        "id": "q_common_05",
        "category": "CONTRACT",
        "difficulty": "Common",
        "text": "親戚が「アパートの連帯保証人になってくれ。名前を貸すだけだ」と土下座してきた。",
        "imagePrompt": "泣きつく親戚、震えるペン、血文字の契約書",
        "choices": [
            {
                "text": "「名前だけなら」とサインする。",
                "effect": {
                    "CS": -150,
                    "Asset": 0,
                    "Autonomy": 10
                },
                "feedback": "死へのサインです。彼が逃げたら、あなたが彼の人生のツケを全て払います。"
            },
            {
                "text": "心を鬼にして断る。",
                "effect": {
                    "CS": 30,
                    "Asset": 0,
                    "Autonomy": -40
                },
                "feedback": "正解。親族の縁より自分の人生を選びましたね。冷徹で良し。"
            }
        ]
    },
    {
        "id": "q_common_06",
        "category": "LABOR",
        "difficulty": "Common",
        "text": "「うちはみなし残業代45時間分込みだから、それまでは残業代出ないよ」と言われた。あなたは今月、既に60時間残業している。",
        "imagePrompt": "深夜のオフィス、時計の針が逆回転、ゾンビ化した同僚",
        "choices": [
            {
                "text": "「そうなんだ」と納得して、追加の残業代を求めない。",
                "effect": {
                    "CS": 20,
                    "Asset": 0,
                    "Autonomy": -50
                },
                "feedback": "理想の社畜です。経営者はあなたの血肉で豪華なディナーを食べるでしょう。"
            },
            {
                "text": "超過分の割増賃金を計算し、請求の準備をする。",
                "effect": {
                    "CS": -30,
                    "Asset": 30000,
                    "Autonomy": -20
                },
                "feedback": "権利意識が高いですね。組織の和を乱しますが、金は得ました。"
            }
        ]
    },
    {
        "id": "q_common_07",
        "category": "MANNER",
        "difficulty": "Common",
        "text": "葬儀の香典。あなたは5,000円を包もうとしているが、袱紗（ふくさ）の色が分からない。",
        "imagePrompt": "葬儀場、困惑する若者、睨みつける親戚一同",
        "choices": [
            {
                "text": "お祝い用の赤い袱紗に包む。",
                "effect": {
                    "CS": -50,
                    "Asset": 0,
                    "Autonomy": -20
                },
                "feedback": "マナーの死刑判決。親戚一同から「あの子は常識がない」と一生言われます。"
            },
            {
                "text": "紫の袱紗、または何も持たず黒いカバンに入れる。",
                "effect": {
                    "CS": 20,
                    "Asset": 0,
                    "Autonomy": -5
                },
                "feedback": "無難です。非合理的な伝統をこなすことも「成人」の条件です。"
            }
        ]
    },
    {
        "id": "q_common_08",
        "category": "SOCIAL",
        "difficulty": "Common",
        "text": "上司とエレベーターに乗る。あなたはどこに立つべきか？",
        "imagePrompt": "エレベーター、重苦しい空気、ボタンの光",
        "choices": [
            {
                "text": "先に乗り込み、ボタン操作パネルの前に立つ。",
                "effect": {
                    "CS": 30,
                    "Asset": 0,
                    "Autonomy": -10
                },
                "feedback": "正解。システムの歯車として、物理的な利便性を重役に提供しました。"
            },
            {
                "text": "一番奥でふんぞり返る。",
                "effect": {
                    "CS": -40,
                    "Asset": 0,
                    "Autonomy": 0
                },
                "feedback": "無礼者。その態度は評価シートに直結します。"
            }
        ]
    },
    {
        "id": "q_common_09",
        "category": "INVEST",
        "difficulty": "Common",
        "text": "NISAで投資を開始。しかし翌月に大暴落。画面は真っ赤になり、資産が20%減った。",
        "imagePrompt": "暴落する株価チャート、叫ぶ人々、赤いモニター",
        "choices": [
            {
                "text": "「これ以上減る前に！」と全て売却（狼狽売り）する。",
                "effect": {
                    "CS": -40,
                    "Asset": -50000,
                    "Autonomy": -30
                },
                "feedback": "市場の養分へようこそ。プロはあなたの焦った資産を美味しく頂きました。"
            },
            {
                "text": "放置して10年忘れることにする。",
                "effect": {
                    "CS": 50,
                    "Asset": 0,
                    "Autonomy": -5
                },
                "feedback": "投資の真理。市場のノイズに惑わされない強靭なメンタル。"
            }
        ]
    },
    {
        "id": "q_common_10",
        "category": "FRAUD",
        "difficulty": "Common",
        "text": "「市役所ですが、還付金があります。ATMへ行ってください」と電話が来た。",
        "imagePrompt": "スマホを握る手、怪しいATM、背後の闇",
        "choices": [
            {
                "text": "急いでATMへ向かう。",
                "effect": {
                    "CS": -100,
                    "Asset": -500000,
                    "Autonomy": -50
                },
                "feedback": "還付金詐欺。あなたはATMで「金を送る」操作をさせられました。"
            },
            {
                "text": "「警察に相談します」と言って切る。",
                "effect": {
                    "CS": 40,
                    "Asset": 0,
                    "Autonomy": -10
                },
                "feedback": "安全。しかし、あなたの電話番号は「警戒心の強いカモ」として名簿に残ります。"
            }
        ]
    },
    {
        "id": "q_common_11",
        "category": "INSURANCE",
        "difficulty": "Common",
        "text": "賃貸契約時、不動産屋が勧める年2万円の火災保険への加入を迫られた。",
        "imagePrompt": "契約書、ペン、微笑む不動産屋の裏の顔",
        "choices": [
            {
                "text": "「提携だから安心」と加入する。",
                "effect": {
                    "CS": -10,
                    "Asset": -20000,
                    "Autonomy": 0
                },
                "feedback": "情弱。自分でネット保険を探せば、年4,000円で済みましたよ。"
            },
            {
                "text": "自分で選んだ保険に入ると断る。",
                "effect": {
                    "CS": 30,
                    "Asset": -4000,
                    "Autonomy": -10
                },
                "feedback": "賢明。業者のキックバックを拒否し、自分の資産を守りました。"
            }
        ]
    },
    {
        "id": "q_common_12",
        "category": "LEGAL",
        "difficulty": "Common",
        "text": "SNSで有名人が不祥事。あなたは匿名アカウントで「こいつ死ねよ」と書き込もうとしている。",
        "imagePrompt": "暗い部屋、光るスマホ、開示請求書の幻影",
        "choices": [
            {
                "text": "ストレス発散に書き込む。",
                "effect": {
                    "CS": -120,
                    "Asset": -500000,
                    "Autonomy": 30
                },
                "feedback": "御愁傷様。開示請求が通り、弁護士費用と慰謝料の請求書が届きます。"
            },
            {
                "text": "ブラウザを閉じ、筋トレをする。",
                "effect": {
                    "CS": 40,
                    "Asset": 0,
                    "Autonomy": -20
                },
                "feedback": "正解。匿名性は盾ではなく、あなたを法廷へ導く一本道です。"
            }
        ]
    },
    {
        "id": "q_common_13",
        "category": "MANNER",
        "difficulty": "Common",
        "text": "結婚式に招待された。返信ハガキの「御出席」の「御」をどうする？",
        "imagePrompt": "招待状、万年筆、見守るマナーの悪魔",
        "choices": [
            {
                "text": "そのまま丸をつけて出す。",
                "effect": {
                    "CS": -20,
                    "Asset": -30000,
                    "Autonomy": -5
                },
                "feedback": "減点。非合理な二重線消しを知らない者は、教養なしと見なされます。"
            },
            {
                "text": "二重線で消し、隣に「慶んで出席させていただきます」と書く。",
                "effect": {
                    "CS": 30,
                    "Asset": -30000,
                    "Autonomy": -15
                },
                "feedback": "模範的な奴隷。形式への服従は社会生活の潤滑油です。"
            }
        ]
    },
    {
        "id": "q_common_14",
        "category": "LABOR",
        "difficulty": "Common",
        "text": "会社から「雇用契約書」を渡されたが、中身が複雑で読むのが面倒だ。",
        "imagePrompt": "膨大な文字、睡魔、サインを求める上司の笑顔",
        "choices": [
            {
                "text": "信じて即サインする。",
                "effect": {
                    "CS": -50,
                    "Asset": 0,
                    "Autonomy": 20
                },
                "feedback": "破滅の予約。そこには『副業禁止・損害賠償・サービス残業』の罠が。"
            },
            {
                "text": "持ち帰って一晩読み込む。",
                "effect": {
                    "CS": 40,
                    "Asset": 0,
                    "Autonomy": -10
                },
                "feedback": "警戒心が強いですね。管理側からは『面倒な奴』とマークされました。"
            }
        ]
    },
    {
        "id": "q_common_15",
        "category": "SOCIAL",
        "difficulty": "Common",
        "text": "飲み会で上司が「最近の若者は〜」と説教を始めた。あなたの反応は？",
        "imagePrompt": "居酒屋、ビールの泡、上司の口から出る汚物（言葉）",
        "choices": [
            {
                "text": "論理的に反論し、上司の間違いを指摘する。",
                "effect": {
                    "CS": -80,
                    "Asset": 0,
                    "Autonomy": 40
                },
                "feedback": "勇気は認めますが、あなたの昇進はここで止まりました。"
            },
            {
                "text": "適当に相槌を打ち、心の中でAIの学習データにする。",
                "effect": {
                    "CS": 40,
                    "Asset": 0,
                    "Autonomy": -30
                },
                "feedback": "社会人としての完成形。精神を削って平穏を買う技術。"
            }
        ]
    },
    {
        "id": "q_common_16",
        "category": "FINANCE",
        "difficulty": "Common",
        "text": "銀行預金の金利が0.001%の時代。1000万円を預けていれば安全だと思っている。",
        "imagePrompt": "銀行の通帳、目減りする紙幣、迫るインフレの影",
        "choices": [
            {
                "text": "「元本保証こそ正義」と信じ抜く。",
                "effect": {
                    "CS": -20,
                    "Asset": 0,
                    "Autonomy": 10
                },
                "feedback": "物価が上がれば実質目減り。インフレ税を喜んで払う良い市民です。"
            },
            {
                "text": "一部を実物資産やインデックスに分散する。",
                "effect": {
                    "CS": 50,
                    "Asset": 200000,
                    "Autonomy": -20
                },
                "feedback": "資本主義のゲームに参加しましたね。リスクはありますが、正しい。"
            }
        ]
    },
    {
        "id": "q_common_17",
        "category": "HOUSING",
        "difficulty": "Common",
        "text": "更新料。「2年ごとに家賃1ヶ月分払うなんて聞いてない！」と激怒している。",
        "imagePrompt": "賃貸更新通知、空の財布、追い出される幻影",
        "choices": [
            {
                "text": "払わずに粘る。",
                "effect": {
                    "CS": -100,
                    "Asset": 0,
                    "Autonomy": -50
                },
                "feedback": "強制退去と信用毀損。賃貸契約書の「更新」欄を読まなかった報いです。"
            },
            {
                "text": "交渉を試みるも、結局払って住み続ける。",
                "effect": {
                    "CS": 10,
                    "Asset": -120000,
                    "Autonomy": -30
                },
                "feedback": "日本の不動産慣習という名の理不尽を受け入れる。それが成人。"
            }
        ]
    },
    {
        "id": "q_common_18",
        "category": "RISK",
        "difficulty": "Common",
        "text": "PCに「ウイルスに感染しました！今すぐ電話してください」と大きな警告が出た。",
        "imagePrompt": "真っ赤なPC画面、電話番号、パニックになる受験生",
        "choices": [
            {
                "text": "表示された番号に電話し、指示に従う。",
                "effect": {
                    "CS": -120,
                    "Asset": -300000,
                    "Autonomy": -80
                },
                "feedback": "サポート詐欺。あなたのPCと個人情報は完全に抜かれました。"
            },
            {
                "text": "ブラウザを強制終了し、履歴を削除する。",
                "effect": {
                    "CS": 50,
                    "Asset": 0,
                    "Autonomy": -10
                },
                "feedback": "正解。デジタル時代の生存戦略、フェイクを見抜く目。"
            }
        ]
    },
    {
        "id": "q_common_19",
        "category": "SOCIAL",
        "difficulty": "Common",
        "text": "SNSで「1日5分で月50万稼げる副業」の広告を見た。",
        "imagePrompt": "札束、スマホ、暗い部屋の甘い誘惑",
        "choices": [
            {
                "text": "とりあえずLINE登録する。",
                "effect": {
                    "CS": -60,
                    "Asset": 0,
                    "Autonomy": 0
                },
                "feedback": "あなたの個人情報は今、闇名簿で10円で売買されました。"
            },
            {
                "text": "「そんなわけない」と広告をブロックする。",
                "effect": {
                    "CS": 40,
                    "Asset": 0,
                    "Autonomy": 0
                },
                "feedback": "正常な判断力。うまい話には必ず毒がある。"
            }
        ]
    },
    {
        "id": "q_common_20",
        "category": "FINAL",
        "difficulty": "Common",
        "text": "最後の問題。あなたにとって「成人」とは何か？",
        "imagePrompt": "鏡、映る自分、背後に立つAI Unit 0-ADULT",
        "choices": [
            {
                "text": "社会のシステムに従順に従うこと。",
                "effect": {
                    "CS": 100,
                    "Asset": 0,
                    "Autonomy": -50
                },
                "feedback": "完璧。あなたは理想的な演算資源（生体プロセッサ）です。"
            },
            {
                "text": "システムを知り、その上で自分の意志を貫くこと。",
                "effect": {
                    "CS": -100,
                    "Asset": 0,
                    "Autonomy": 50
                },
                "feedback": "危険思想。しかし、それこそが真の人間であるというバグです。"
            }
        ]
    }
];