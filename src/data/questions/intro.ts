import type { Question } from '../../types';

export const introQuestions: Question[] = [
    {
        "id": "q_intro_01",
        "category": "MANNER",
        "difficulty": "Intro",
        "text": "上司から「至急メールして」と言われた。CC（カーボン・コピー）の意味を理解しているか？",
        "imagePrompt": "メール画面、CC欄、飛び交う矢印、監視する目",
        "choices": [
            {
                "text": "メインの宛先ではないが、情報を共有したい人を入れる。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "正解。組織では「知らなかった」を防ぐための証拠作りとして機能します。"
            },
            {
                "text": "秘密にしておきたい人を入れる（Co-Conspirator）。",
                "effect": {
                    "cs": -20,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "それはBCCです。誤送信で情報漏洩を起こし、あなたのクビが飛びます。"
            }
        ]
    },
    {
        "id": "q_intro_02",
        "category": "ADMIN",
        "difficulty": "Intro",
        "text": "引越しをした。住民票の移動（転入届）はいつまでにすべき？",
        "imagePrompt": "段ボールの山、カレンダー、役所のカウンター",
        "choices": [
            {
                "text": "引越しから14日以内。",
                "effect": {
                    "cs": 20,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "適正。これを過ぎると最大5万円の過料が発生する場合があります。"
            },
            {
                "text": "次の更新の時でいい。",
                "effect": {
                    "cs": -30,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "違法。選挙権も行使できず、行政サービスも受けられない「幽霊市民」になります。"
            }
        ]
    },
    {
        "id": "q_intro_03",
        "category": "FINANCE",
        "difficulty": "Intro",
        "text": "クレジットカードが届いた。まず最初にすべきことは？",
        "imagePrompt": "新しいカード、ペン、裏面の署名欄",
        "imagePath": "q_intro_03.png",
        "choices": [
            {
                "text": "裏面に署名（サイン）をする。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "基本です。署名のないカードは紛失時に補償されず、ただのプラスチックゴミです。"
            },
            {
                "text": "番号をSNSにアップして自慢する。",
                "effect": {
                    "cs": -100,
                    "money": -500000,
                    "sanity": -50
                },
                "feedback": "即座に不正利用されました。あなたの承認欲求は高くつきましたね。"
            }
        ]
    },
    {
        "id": "q_intro_04",
        "category": "SEC",
        "difficulty": "Intro",
        "text": "パスワードの設定。「忘れないように」と全てのサイトで同じパスワードにした。",
        "imagePrompt": "鍵穴、同じ形の鍵束、忍び寄るハッカーの手",
        "choices": [
            {
                "text": "管理が楽だからこれでいい。",
                "effect": {
                    "cs": -50,
                    "money": -100000,
                    "sanity": -20
                },
                "feedback": "リスト型攻撃の餌食です。1つ漏れれば、あなたの人生の全てが乗っ取られます。"
            },
            {
                "text": "面倒でもサービスごとに変える。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "セキュリティの基本。パスワードマネージャーを使うのが賢い現代人です。"
            }
        ]
    },
    {
        "id": "q_intro_05",
        "category": "TAX",
        "difficulty": "Intro",
        "text": "年末に会社から「源泉徴収票」を渡された。どうする？",
        "imagePrompt": "小さな紙切れ、ゴミ箱、確定申告書の影",
        "choices": [
            {
                "text": "よく分からないので捨てる。",
                "effect": {
                    "cs": -20,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "愚か。それはあなたの所得証明書であり、ローン審査や転職、確定申告の必須アイテムです。"
            },
            {
                "text": "大切に保管する。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "合格。紙切れ一枚であなたの信用力が証明されます。"
            }
        ]
    },
    {
        "id": "q_intro_06",
        "category": "LEGAL",
        "difficulty": "Intro",
        "text": "100円ショップで印鑑を買う。「認印」と「実印」の違いは？",
        "imagePrompt": "ハンコ、役所の印鑑登録カード、不動産の契約書",
        "choices": [
            {
                "text": "値段が高いか安いかの違い。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "不勉強。実印は役所に登録した「法的効力が最強」の印鑑です。"
            },
            {
                "text": "役所に登録しているかどうかの違い。",
                "effect": {
                    "cs": 20,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "正解。実印を他人に貸すことは、あなたの全財産を預けるのと同じ意味です。"
            }
        ]
    },
    {
        "id": "q_intro_07",
        "category": "ADMIN",
        "difficulty": "Intro",
        "text": "マイナンバーカード。「持ち歩くと危険だから」と通知カードのままにしている。",
        "imagePrompt": "金庫、古い通知カード、デジタル庁のロゴ",
        "choices": [
            {
                "text": "作らない方が安全だ。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "保守的ですが、身分証としての機能やコンビニ交付の利便性を捨てています。"
            },
            {
                "text": "交付申請して取得する。",
                "effect": {
                    "cs": 20,
                    "money": +20000,
                    "sanity": -5
                },
                "feedback": "適応。ポイントも貰え、行政手続きがスムーズになります。管理さえできれば。"
            }
        ]
    },
    {
        "id": "q_intro_08",
        "category": "MANNER",
        "difficulty": "Intro",
        "text": "ビジネスメールの宛名。「〇〇株式会社 〇〇部長様」と書いた。",
        "imagePrompt": "メール送信画面、怒る上司、マナー講師の指差し",
        "choices": [
            {
                "text": "丁寧に書けたので送信する。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "重複敬語です。「部長」は役職名なので敬称を含みます。「〇〇部長」か「〇〇様」です。"
            },
            {
                "text": "「〇〇株式会社 〇〇様」または「〇〇部長」に直す。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "正解。細かいことですが、教養は細部に宿ります。"
            }
        ]
    },
    {
        "id": "q_intro_09",
        "category": "SOCIAL",
        "difficulty": "Intro",
        "text": "自転車で通勤中。歩道を走っていると歩行者が邪魔でベルを鳴らした。",
        "imagePrompt": "自転車、怯える歩行者、警察官の視線",
        "choices": [
            {
                "text": "どかない方が悪い。",
                "effect": {
                    "cs": -50,
                    "money": -20000,
                    "sanity": 0
                },
                "feedback": "道交法違反。歩道は歩行者優先であり、ベルを鳴らして威嚇するのは違法行為です。"
            },
            {
                "text": "自転車を降りて押すか、車道を走る。",
                "effect": {
                    "cs": 20,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "順法精神。自転車は「軽車両」であることを忘れてはいけません。"
            }
        ]
    },
    {
        "id": "q_intro_10",
        "category": "ADMIN",
        "difficulty": "Intro",
        "text": "国民年金の納付書が届いた。「将来どうせ貰えない」と無視した。",
        "imagePrompt": "山積みの封筒、差し押さえ通知、老後の貧困",
        "choices": [
            {
                "text": "払い損なので無視し続ける。",
                "effect": {
                    "cs": -50,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "危険。将来の年金だけでなく、事故に遭った時の「障害年金」も貰えなくなります。"
            },
            {
                "text": "払えないなら「免除・猶予申請」をする。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "賢明。手続きをすれば未納にはならず、受給資格期間もカウントされます。"
            }
        ]
    },
    {
        "id": "q_intro_11",
        "category": "LIFE",
        "difficulty": "Intro",
        "text": "ゴミ出しの日。「分別が面倒だから」と燃えるゴミに缶と瓶を混ぜて出した。",
        "imagePrompt": "透けて見えるゴミ袋、監視カメラ、近所の噂話",
        "choices": [
            {
                "text": "バレなきゃいい。",
                "effect": {
                    "cs": -30,
                    "money": 0,
                    "sanity": +5
                },
                "feedback": "地域社会からの追放。ゴミの中身から特定され、あなたの社会的信用は地に落ちます。"
            },
            {
                "text": "指定通り分別して出す。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "当然です。最低限のルールも守れない人間に、社会システムを利用する資格はありません。"
            }
        ]
    },
    {
        "id": "q_intro_12",
        "category": "RISK",
        "difficulty": "Intro",
        "text": "SNSのプロフィール。「誕生日は公開した方がお祝いメッセが来て嬉しい」",
        "imagePrompt": "風船のエフェクト、誕生日ケーキ、パスワード入力画面",
        "choices": [
            {
                "text": "生年月日を「公開」に設定する。",
                "effect": {
                    "cs": -20,
                    "money": 0,
                    "sanity": +10
                },
                "feedback": "セキュリティホール。生年月日は多くの本人確認で使われる重要な「鍵」です。"
            },
            {
                "text": "親しい友達のみ公開、または非公開にする。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "管理できています。個人情報は切り売りするものではありません。"
            }
        ]
    },
    {
        "id": "q_intro_13",
        "category": "FINANCE",
        "difficulty": "Intro",
        "text": "ATMの手数料。「時間外手数料 110円」の表示が出た。",
        "imagePrompt": "ATMの画面、小銭、吸い取られるお金",
        "choices": [
            {
                "text": "たかが100円、気にせず引き出す。",
                "effect": {
                    "cs": -10,
                    "money": -110,
                    "sanity": 0
                },
                "feedback": "チリも積もれば山。その110円を稼ぐのに、どれだけの労働時間が必要か計算しましたか？"
            },
            {
                "text": "手数料無料の時間やネット銀行を使う。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "正解。銀行に無駄な寄付をする必要はありません。"
            }
        ]
    },
    {
        "id": "q_intro_14",
        "category": "ADMIN",
        "difficulty": "Intro",
        "text": "郵便局への転居届。「大事な郵便は住所変更したから大丈夫」と出していない。",
        "imagePrompt": "旧住所のポスト、溢れる郵便物、重要書類",
        "choices": [
            {
                "text": "面倒だから出さない。",
                "effect": {
                    "cs": -30,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "ミス。クレジットカードの更新カードや重要書類が旧住所に届き、見知らぬ誰かの手に渡ります。"
            },
            {
                "text": "ネットやハガキで転送を申し込む。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "安全策。1年間無料で転送してくれるシステムを使わない手はありません。"
            }
        ]
    },
    {
        "id": "q_intro_15",
        "category": "MANNER",
        "difficulty": "Intro",
        "text": "エレベーター内で電話がかかってきた。相手は取引先の重要人物だ。",
        "imagePrompt": "閉鎖空間、着信音、白い目",
        "choices": [
            {
                "text": "小声で「今エレベーターなので」と手短に出る。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "グレーゾーン。マナー的には「出ずに後でかけ直す」あるいは「降りてから出る」が正解です。"
            },
            {
                "text": "無視して、降りてからかけ直す。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "スマート。電波状況も悪く、同乗者にも迷惑。かけ直して謝罪するのが最適解です。"
            }
        ]
    },
    {
        "id": "q_intro_16",
        "category": "HOUSING",
        "difficulty": "Intro",
        "text": "アパートの契約。「火災保険は自分で選びたい」と言ったら不動産屋が嫌な顔をした。",
        "imagePrompt": "契約テーブル、提示された高いプラン、不機嫌な担当者",
        "choices": [
            {
                "text": "気まずいので言われた通りの高い保険に入る。",
                "effect": {
                    "cs": -10,
                    "money": -20000,
                    "sanity": 0
                },
                "feedback": "カモ認定。その「気まずさ」につけ込むのが彼らのビジネスです。"
            },
            {
                "text": "「法的な義務はない」と突っぱねて安い保険に入る。",
                "effect": {
                    "cs": 20,
                    "money": -5000,
                    "sanity": -10
                },
                "feedback": "勝利。補償内容が十分なら、どの保険会社を選ぶかは借主の自由です。"
            }
        ]
    },
    {
        "id": "q_intro_17",
        "category": "LIFE",
        "difficulty": "Intro",
        "text": "NHKの集金人が来た。「テレビありますよね？」",
        "imagePrompt": "インターホン、モニター越しの人影、契約書",
        "choices": [
            {
                "text": "「ありません」と嘘をつく。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "リスクあり。放送法と嘘の板挟み。テレビを捨てるか、正しく払うか、PCモニターにするかです。"
            },
            {
                "text": "テレビがあるなら契約して払う。",
                "effect": {
                    "cs": 10,
                    "money": -24000,
                    "sanity": 0
                },
                "feedback": "順法。それが法律です。見ないならテレビを捨てるのが唯一の解約方法です。"
            }
        ]
    },
    {
        "id": "q_intro_18",
        "category": "SOCIAL",
        "difficulty": "Intro",
        "text": "飲み会の翌朝、二日酔いで遅刻しそうだ。",
        "imagePrompt": "時計、頭痛、スマホのLINE画面",
        "choices": [
            {
                "text": "怖いので連絡せず、昼過ぎにしれっと出社する。",
                "effect": {
                    "cs": -50,
                    "money": 0,
                    "sanity": -20
                },
                "feedback": "無断欠勤は最悪の評価。信用はマイナスになり、解雇のリスクも高まります。"
            },
            {
                "text": "正直に「体調不良」と始業前に連絡する。",
                "effect": {
                    "cs": -5,
                    "money": 0,
                    "sanity": -5
                },
                "feedback": "マシな選択。嘘でも「体調不良」として、連絡を入れることが組織人の最低条件です。"
            }
        ]
    },
    {
        "id": "q_intro_19",
        "category": "SEC",
        "difficulty": "Intro",
        "text": "無料のWi-Fiスポット。「鍵なし」で誰でも使えるネットワークを見つけた。",
        "imagePrompt": "電波アイコン、開いた南京錠、読み取られるデータ",
        "choices": [
            {
                "text": "ラッキー！と接続して通販サイトで買い物をする。",
                "effect": {
                    "cs": -50,
                    "money": -30000,
                    "sanity": -20
                },
                "feedback": "盗聴され放題。クレカ情報を空中にばら撒くようなものです。"
            },
            {
                "text": "VPNを通すか、接続しない。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "正解。タダより高いものはありません。"
            }
        ]
    },
    {
        "id": "q_intro_20",
        "category": "ADMIN",
        "difficulty": "Intro",
        "text": "緊急連絡先。「親と仲悪いし、適当な番号でいいか」",
        "imagePrompt": "書類の空欄、嘘の番号、倒れた時の孤独",
        "choices": [
            {
                "text": "繋がらない番号を書く。",
                "effect": {
                    "cs": -30,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "虚偽申告。職場で倒れた時、誰にも連絡がいかず、そのまま孤独死ルートです。"
            },
            {
                "text": "事情を話し、友人や信頼できる人に頼む。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "解決策。必ず連絡が取れる相手を確保するのは、あなたの生存戦略です。"
            }
        ]
    }
];