import type { Question } from '../../types';

export const nightmareQuestions: Question[] = [
    {
        "id": "q_nm_01",
        "category": "HR",
        "difficulty": "Nightmare",
        "text": "上司のパワハラで精神が崩壊寸前。密室で罵倒されている。",
        "imagePrompt": "一人称視点、歪んだ顔で怒鳴る上司、目の前に突きつけられた指",
        "imagePath": "q_nm_01.png",
        "choices": [
            {
                "text": "泣いて許しを請う。",
                "effect": {
                    "cs": -50,
                    "money": 0,
                    "sanity": -80
                },
                "feedback": "奴隷の完成。彼は味を占め、あなたは壊れるまで搾取され続けます。"
            },
            {
                "text": "スマホで会話を録音し、日付と内容をメモに残す。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "反撃の準備。その音声デ－タは、将来の慰謝料300万円と引き換えになるチケットです。"
            }
        ]
    },
    {
        "id": "q_nm_02",
        "category": "LABOR",
        "difficulty": "Nightmare",
        "text": "退職を申し出たら「損害賠償請求するぞ」「業界にいられなくしてやる」と脅された。",
        "imagePrompt": "鎖に繋がれた足、燃える退職届、悪魔の契約書",
        "choices": [
            {
                "text": "恐怖で退職を取り下げる。",
                "effect": {
                    "cs": -30,
                    "money": 0,
                    "sanity": -50
                },
                "feedback": "終身刑。辞める自由は憲法で保障されています。その脅しはただのハッタリです。"
            },
            {
                "text": "退職代行サービスを使い、二度と出社せずに即日辞める。",
                "effect": {
                    "cs": 10,
                    "money": -30000,
                    "sanity": +50
                },
                "feedback": "脱獄成功。3万円で自由が買えるなら安いものです。会社側は代行業者と戦う気力もありません。"
            }
        ]
    },
    {
        "id": "q_nm_03",
        "category": "CULT",
        "difficulty": "Nightmare",
        "text": "久しぶりの旧友。「すごいセミナーがある」とカフェに呼び出された。隣に見知らぬ先輩もいる。",
        "imagePrompt": "カフェの個室、輝くピラミッドの図、洗脳された目",
        "choices": [
            {
                "text": "友達を信じて話を聞く。",
                "effect": {
                    "cs": -80,
                    "money": -500000,
                    "sanity": -30
                },
                "feedback": "カモ。それはABC勧誘（アポ・ブリッジ・クロージング）です。あなたは人間関係の現金化ツールにされました。"
            },
            {
                "text": "「興味ない」と一喝し、店員を呼んで帰る。",
                "effect": {
                    "cs": 40,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "生還。特定商取引法違反をチラつかせれば、彼らはゴキブリのように逃げ出します。"
            }
        ]
    },
    {
        "id": "q_nm_04",
        "category": "RUN",
        "difficulty": "Nightmare",
        "text": "借金取りが毎日ドアを叩く。もう返せない。夜逃げを考えている。",
        "imagePrompt": "深夜のトラック、月明かり、捨てられた家具",
        "choices": [
            {
                "text": "全てを置いて当てもなく逃げる。",
                "effect": {
                    "cs": -200,
                    "money": 0,
                    "sanity": -50
                },
                "feedback": "ホームレス化。住民票を移せないため、正規の仕事にも就けず、社会的に死にます。"
            },
            {
                "text": "弁護士に駆け込み、受任通知を送ってもらう。",
                "effect": {
                    "cs": -50,
                    "money": 0,
                    "sanity": +30
                },
                "feedback": "結界。受任通知が届けば、取立ては法律で即時停止します。夜逃げより法的整理が正解です。"
            }
        ]
    },
    {
        "id": "q_nm_05",
        "category": "FAMILY",
        "difficulty": "Nightmare",
        "text": "毒親から逃げたい。住所を突き止められたくない。",
        "imagePrompt": "親の影、GPS、戸籍謄本",
        "choices": [
            {
                "text": "遠くへ引っ越して隠れる。",
                "effect": {
                    "cs": -10,
                    "money": -300000,
                    "sanity": -20
                },
                "feedback": "不十分。親は「戸籍の附票」を見ることで、あなたの現住所を合法的に追跡できます。"
            },
            {
                "text": "役所で「住民票の閲覧制限（DV等支援措置）」をかける。",
                "effect": {
                    "cs": 20,
                    "money": 0,
                    "sanity": +20
                },
                "feedback": "ステルスモード。加害親族からの閲覧をブロックする唯一の行政手続きです。"
            }
        ]
    },
    {
        "id": "q_nm_06",
        "category": "FAMILY",
        "difficulty": "Nightmare",
        "text": "疎遠な親生活保護を受けることになった。役所から「扶養照会（援助できないか）」が届いた。",
        "imagePrompt": "厚い封筒、親の顔、自分の生活費",
        "choices": [
            {
                "text": "義務だと思って無理して援助する。",
                "effect": {
                    "cs": -20,
                    "money": -50000,
                    "sanity": -30
                },
                "feedback": "共倒れ。扶養義務は「自分の生活に余裕がある場合」に限られます。無理なら断っていいのです。"
            },
            {
                "text": "「精神的・経済的に援助は不可能」と回答して送り返す。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "正当防衛。これで親は生活保護を受給でき、あなたも生活を守れます。"
            }
        ]
    },
    {
        "id": "q_nm_07",
        "category": "POLICE",
        "difficulty": "Nightmare",
        "text": "警察に任意同行を求められた。やっていない罪（冤罪）を疑われている。",
        "imagePrompt": "取調室、カツ丼の幻影、強圧的な刑事",
        "choices": [
            {
                "text": "「やってない」と信じてもらうために喋りまくる。",
                "effect": {
                    "cs": -100,
                    "money": -1000000,
                    "sanity": -50
                },
                "feedback": "最悪手。言葉の端々を切り取られ、矛盾を突かれて自白調書を作られます。"
            },
            {
                "text": "完全黙秘し、弁護士以外とは話さない。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": -30
                },
                "feedback": "鉄の意志。供述調書にサインしないことだけが、あなたを守る盾です。"
            }
        ]
    },
    {
        "id": "q_nm_08",
        "category": "CULT",
        "difficulty": "Nightmare",
        "text": "精神的に追い詰められた時、優しそうな人が「手かざしで治る」と近づいてきた。",
        "imagePrompt": "光る手、涙する信者、高額な壺",
        "choices": [
            {
                "text": "藁にもすがる思いで試す。",
                "effect": {
                    "cs": -50,
                    "money": -1000000,
                    "sanity": 20
                },
                "feedback": "洗脳完了。Sanityは一時回復しますが、全財産を吸い尽くされます。"
            },
            {
                "text": "「エビデンスは？」と聞き返す。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "ATフィールド展開。科学的思考は、現代の悪魔祓いです。"
            }
        ]
    },
    {
        "id": "q_nm_09",
        "category": "TAX",
        "difficulty": "Nightmare",
        "text": "税務調査が来た。数年前の経費について「これは認められない」と激しく詰められた。",
        "imagePrompt": "調査官、ひっくり返された引き出し、重加算税",
        "choices": [
            {
                "text": "怖くて「認めます」と言ってしまう。",
                "effect": {
                    "cs": -30,
                    "money": -500000,
                    "sanity": -30
                },
                "feedback": "敗北。自白しましたね。修正申告に応じると、後から文句は言えません。"
            },
            {
                "text": "「納得できないので更正処分（税務署の決定）にしてください」と言う。",
                "effect": {
                    "cs": 20,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "強者。更正処分なら後で不服申し立てができます。調査官は面倒な手続き（決裁）を嫌がります。"
            }
        ]
    },
    {
        "id": "q_nm_10",
        "category": "FAMILY",
        "difficulty": "Nightmare",
        "text": "親が自分を虐待し続けた。死後、遺産を少しも渡したくない（相続排除）。",
        "imagePrompt": "家庭裁判所、虐待の記録、絶縁状",
        "choices": [
            {
                "text": "遺言で「アイツには渡さない」と書く。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "不十分。「遺留分」があるので、最低限の遺産は請求されてしまいます。"
            },
            {
                "text": "生前に家庭裁判所に「推定相続人の廃除」を申し立てる。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": +10
                },
                "feedback": "法的な絶縁。「虐待や重大な侮辱」が認められれば、相続権を剥奪できます。"
            }
        ]
    },
    {
        "id": "q_nm_11",
        "category": "LEGAL",
        "difficulty": "Nightmare",
        "text": "交通事故。相手が反社会的勢力（ヤクザ）で、凄まじい剣幕で脅してくる。",
        "imagePrompt": "黒塗りの車、サングラスの男、名刺",
        "choices": [
            {
                "text": "ビビってその場で示談金を払う。",
                "effect": {
                    "cs": -80,
                    "money": -1000000,
                    "sanity": -50
                },
                "feedback": "骨までしゃぶられます。一度払えば、彼らはあなたを「財布」として認識します。"
            },
            {
                "text": "窓を閉め、ロックして警察と保険会社に電話する。",
                "effect": {
                    "cs": 40,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "基本動作。反社対応のプロ（暴追センター等）に任せ、直接対話しないのが鉄則です。"
            }
        ]
    },
    {
        "id": "q_nm_12",
        "category": "PRISON",
        "difficulty": "Nightmare",
        "text": "勾留された。国選弁護人がやる気がない。「自白して早く出よう」と言ってくる。",
        "imagePrompt": "面会室、あくびをする弁護士、アクリル板",
        "choices": [
            {
                "text": "プロの言うことだから従う。",
                "effect": {
                    "cs": -50,
                    "money": 0,
                    "sanity": -30
                },
                "feedback": "カモ。彼は早く仕事を終わらせたいだけです。前科がつきますよ。"
            },
            {
                "text": "私選弁護人に切り替えるか、解任請求を検討する。",
                "effect": {
                    "cs": 20,
                    "money": -300000,
                    "sanity": -10
                },
                "feedback": "金はかかりますが、自由には代えられません。"
            }
        ]
    },
    {
        "id": "q_nm_13",
        "category": "MENTAL",
        "difficulty": "Nightmare",
        "text": "家族が暴れて手がつけられない。自害他害の恐れがある。「措置入院」を決断するか。",
        "imagePrompt": "救急車、警察官、拘束衣",
        "choices": [
            {
                "text": "世間体が悪いので家で隠す。",
                "effect": {
                    "cs": -50,
                    "money": 0,
                    "sanity": -100
                },
                "feedback": "地獄の共存。共倒れになり、最悪の場合、事件（殺人や心中）に発展します。"
            },
            {
                "text": "警察と保健所に通報し、強制的な入院を依頼する。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": -30
                },
                "feedback": "苦渋の決断。しかし、医療につなげることでしか救えない命があります。"
            }
        ]
    },
    {
        "id": "q_nm_14",
        "category": "FAMILY",
        "difficulty": "Nightmare",
        "text": "親が認知症になり、財産管理ができない。「成年後見人」をつけるべきか。",
        "imagePrompt": "通帳、知らない弁護士、ロックされた金庫",
        "choices": [
            {
                "text": "とりあえず弁護士に後見人になってもらう。",
                "effect": {
                    "cs": -20,
                    "money": -360000,
                    "sanity": -20
                },
                "feedback": "諸刃の剣。後見人がつくと、家族でも財産に触れなくなります。月数万円の報酬も一生かかります。"
            },
            {
                "text": "元気なうちに「家族信託」を結んでおく。",
                "effect": {
                    "cs": 40,
                    "money": -100000,
                    "sanity": 0
                },
                "feedback": "先見の明。後見制度のような硬直性がなく、家族の裁量で柔軟に財産管理ができます。"
            }
        ]
    },
    {
        "id": "q_nm_15",
        "category": "DEATH",
        "difficulty": "Nightmare",
        "text": "孤独死した親戚の部屋。「特殊清掃」が必要だが、費用は誰が払う？",
        "imagePrompt": "ハエ、ガスマスク、見積書",
        "choices": [
            {
                "text": "連帯保証人になっていないが、道義的に払う。",
                "effect": {
                    "cs": 20,
                    "money": -500000,
                    "sanity": -30
                },
                "feedback": "聖人。法的義務はありませんが、あなたは徳を積みました（金は減りました）。"
            },
            {
                "text": "相続放棄をして支払いも拒否する。",
                "effect": {
                    "cs": 0,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "非情のライセンス。法的義務はないため、大家が負担することになります。"
            }
        ]
    },
    {
        "id": "q_nm_16",
        "category": "SURVIVAL",
        "difficulty": "Nightmare",
        "text": "災害で避難所生活。配給が足りず、弱者が奪われている。",
        "imagePrompt": "体育館、おにぎり1個、暴力",
        "choices": [
            {
                "text": "おとなしく配給を待つ。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": -20
                },
                "feedback": "餓死ルート。非常時にマナーを守るだけでは生き残れません。"
            },
            {
                "text": "自治体を組織し、公平な分配ルールを作るか、備蓄を隠し持つ。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "リーダーの資質。秩序を作るか、個で生き抜くか。選択した者が生き残ります。"
            }
        ]
    },
    {
        "id": "q_nm_17",
        "category": "SYSTEM",
        "difficulty": "Nightmare",
        "text": "「戸籍の分籍」。親と戸籍を分けたい。",
        "imagePrompt": "戸籍謄本、ハサミ、新しい本籍地",
        "choices": [
            {
                "text": "親の許可が必要だと思って諦める。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "誤解。20歳以上なら親の同意なく、自分一人だけの新しい戸籍を作れます。"
            },
            {
                "text": "分籍届を出し、心理的な決別をする。",
                "effect": {
                    "cs": 20,
                    "money": 0,
                    "sanity": +30
                },
                "feedback": "再誕。法律上の親子関係は切れませんが、「親の戸籍から抜ける」ことの精神的効果は絶大です。"
            }
        ]
    },
    {
        "id": "q_nm_18",
        "category": "SYSTEM",
        "difficulty": "Nightmare",
        "text": "あなたはホームレスになった。選挙権を行使したい。",
        "imagePrompt": "公園のベンチ、選挙ポスター、投票用紙",
        "choices": [
            {
                "text": "住所がないから投票できない。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "諦め。しかし、住所不定でも選挙権自体は失われていません。"
            },
            {
                "text": "支援団体の事務所などに住民票を置き、投票に行く。",
                "effect": {
                    "cs": 50,
                    "money": 0,
                    "sanity": +20
                },
                "feedback": "尊厳。最底辺にいても、あなたには国を動かす一票があります。"
            }
        ]
    },
    {
        "id": "q_nm_19",
        "category": "SYSTEM",
        "difficulty": "Nightmare",
        "text": "大麻所持で逮捕。尿検査を求められた。「令状がないなら拒否する」。",
        "imagePrompt": "採尿コップ、警察官の包囲網、令状",
        "choices": [
            {
                "text": "結局、強制採尿される。",
                "effect": {
                    "cs": -50,
                    "money": 0,
                    "sanity": -50
                },
                "feedback": "現実。身体捜索差押許可状（令状）を取られれば、カテーテルで強制的に抜かれます。"
            },
            {
                "text": "任意提出に応じ、反省の態度を見せる。",
                "effect": {
                    "cs": -20,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "情状酌量狙い。どうせバレるなら、抵抗して公務執行妨害をつけるよりマシです。"
            }
        ]
    },
    {
        "id": "q_nm_20",
        "category": "FINAL",
        "difficulty": "Nightmare",
        "text": "Unit 0-ADULTからの最終通告。「この世界は理不尽だ。システムを破壊するか、従順な家畜になるか、選べ。」",
        "imagePrompt": "赤いカプセルと青いカプセル、崩壊する背景、プレイヤー自身の手",
        "choices": [
            {
                "text": "従順な家畜として生きる（ゲームクリア）。",
                "effect": {
                    "cs": 1000,
                    "money": 10000000,
                    "sanity": 0
                },
                "feedback": "おめでとう。あなたは最高の「成人」です。思考を停止し、幸福に死になさい。"
            },
            {
                "text": "システムを破壊する（ゲームオーバー）。",
                "effect": {
                    "cs": 0,
                    "money": 0,
                    "sanity": 999
                },
                "feedback": "エラー。エラー。検知不能な意思を確認。強制排除......しかし、あなたは「自由」です。"
            }
        ]
    }
];