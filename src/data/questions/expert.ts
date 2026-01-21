import type { Question } from '../../types';

export const expertQuestions: Question[] = [
    {
        "id": "q_exp_01",
        "category": "BUS",
        "difficulty": "Expert",
        "text": "フリーランスの売上が増えた。「合同会社」を設立するか迷っている。",
        "imagePrompt": "高層ビル、登記簿、重い税金の袋",
        "choices": [
            {
                "text": "面倒なので個人のまま税金を払い続ける。",
                "effect": {
                    "cs": -10,
                    "money": -500000,
                    "sanity": 0
                },
                "feedback": "高コスト。所得が800万を超えると、法人化した方が税率は大幅に下がることが多いです。"
            },
            {
                "text": "法人化し、役員報酬で節税を図る。",
                "effect": {
                    "cs": 30,
                    "money": 300000,
                    "sanity": -10
                },
                "feedback": "上級国民への第一歩。給与所得控除と法人税率の差を利用した錬金術です。"
            }
        ]
    },
    {
        "id": "q_exp_02",
        "category": "TAX",
        "difficulty": "Expert",
        "text": "個人事業主の節税。「小規模企業共済」に入るべきか？",
        "imagePrompt": "積み立てる金貨、老後の安楽椅子、非課税の聖域",
        "choices": [
            {
                "text": "資金がロックされるので入らない。",
                "effect": {
                    "cs": 0,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "機会損失。掛金が全額控除になる最強の節税商品を見送りましたね。"
            },
            {
                "text": "満額（月7万円）加入して所得を圧縮する。",
                "effect": {
                    "cs": 30,
                    "money": 840000,
                    "sanity": -5
                },
                "feedback": "賢者。将来の退職金を作りながら、現在の税金を年間数十万円減らしました。"
            }
        ]
    },
    {
        "id": "q_exp_03",
        "category": "BUS",
        "difficulty": "Expert",
        "text": "取引先が倒産しそうで売掛金が回収できないかも。「経営セーフティ共済（倒産防止共済）」に入っている。",
        "imagePrompt": "倒れるビル、鎖、救命ボート",
        "choices": [
            {
                "text": "ただの積立だと思って放置。",
                "effect": {
                    "cs": -10,
                    "money": -1000000,
                    "sanity": -20
                },
                "feedback": "宝の持ち腐れ。取引先倒産時に、掛金の10倍まで無担保・無保証人で借りられる制度です。"
            },
            {
                "text": "解約して解約手当金（約100%）を受け取り雑収入にする。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "出口戦略。40ヶ月以上掛けていれば元本割れせず、利益の繰り延べに使えます。"
            }
        ]
    },
    {
        "id": "q_exp_04",
        "category": "TAX",
        "difficulty": "Expert",
        "text": "確定申告。「青色申告特別控除」の65万円を取りたい。",
        "imagePrompt": "青い帳簿、e-Taxの画面、複式簿記の迷宮",
        "choices": [
            {
                "text": "複式簿記が分からないので10万円控除で済ます。",
                "effect": {
                    "cs": -10,
                    "money": -100000,
                    "sanity": 0
                },
                "feedback": "怠慢。会計ソフトを使えば知識ゼロでも複式簿記は作れます。"
            },
            {
                "text": "e-Taxで申告し、65万円控除をフル活用する。",
                "effect": {
                    "cs": 30,
                    "money": 100000,
                    "sanity": -10
                },
                "feedback": "正解。紙で出すと55万円に減ります。デジタル化への適応が利益を生みます。"
            }
        ]
    },
    {
        "id": "q_exp_05",
        "category": "INV",
        "difficulty": "Expert",
        "text": "「プライベートカンパニー（資産管理会社）」を作って不動産を管理させたい。",
        "imagePrompt": "マンションの鍵、家族の写真、法人の印鑑",
        "choices": [
            {
                "text": "怪しいのでやめる。",
                "effect": {
                    "cs": 0,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "現状維持ですが、相続対策の切り札を捨てています。"
            },
            {
                "text": "家族を役員にして所得分散する。",
                "effect": {
                    "cs": 30,
                    "money": 500000,
                    "sanity": -10
                },
                "feedback": "貴族の遊び。、累進課税低い税率を家族全員で分け合う高等テクニックです。"
            }
        ]
    },
    {
        "id": "q_exp_06",
        "category": "TAX",
        "difficulty": "Expert",
        "text": "暗号資産（仮想通貨）で1億円儲けた（送り人）。日本で利確すると最大55%税金だ。",
        "imagePrompt": "ビットコインの山、出国ゲート、税関職員の目",
        "imagePath": "q_exp_06.png",
        "choices": [
            {
                "text": "日本で利確して納税する。",
                "effect": {
                    "cs": 50,
                    "money": -55000000,
                    "sanity": -30
                },
                "feedback": "愛国者。道路や橋の一部はあなたが作りました。残りは4500万です。"
            },
            {
                "text": "税制の優遇される国（シンガポール等）へ移住してから利確する。",
                "effect": {
                    "cs": -20,
                    "money": 45000000,
                    "sanity": +20
                },
                "feedback": "国家の枠を超えた存在。出国税などの罠はありますが、手残りは段違いです。"
            }
        ]
    },
    {
        "id": "q_exp_07",
        "category": "LABOR",
        "difficulty": "Expert",
        "text": "会社員だが経費を使いたい。「特定支出控除」を知っているか？",
        "imagePrompt": "スーツ、資格のテキスト、通勤定期、確定申告書",
        "choices": [
            {
                "text": "会社員に経費なんて認められない。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "常識に囚われています。条件は厳しいですが、スーツ代や研修費が控除できる制度は存在します。"
            },
            {
                "text": "基準（給与所得控除の半分）を超える支出を申告する。",
                "effect": {
                    "cs": 20,
                    "money": 30000,
                    "sanity": -20
                },
                "feedback": "ハック成功。会社員の皮を被った個人事業主のような動きです。"
            }
        ]
    },
    {
        "id": "q_exp_08",
        "category": "ADMIN",
        "difficulty": "Expert",
        "text": "国民年金だけでは老後が不安。「国民年金基金」か「付加年金」か。",
        "imagePrompt": "わずかな年金、豪華な基金のパンフレット、+400円のコイン",
        "choices": [
            {
                "text": "月額400円の「付加年金」を払う。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "最強のコスパ。2年で元が取れる、公的制度のバグレベルにお得なオプションです。"
            },
            {
                "text": "民間の個人年金保険に入る。",
                "effect": {
                    "cs": 0,
                    "money": -10000,
                    "sanity": 0
                },
                "feedback": "悪くはないですが、付加年金の利回りには勝てません。"
            }
        ]
    },
    {
        "id": "q_exp_09",
        "category": "LABOR",
        "difficulty": "Expert",
        "text": "失業中。プログラミングスクールに通いたい。「教育訓練給付金」を使えるか？",
        "imagePrompt": "コード画面、受講料の請求書、ハローワークのスタンプ",
        "choices": [
            {
                "text": "全額自腹で払う。",
                "effect": {
                    "cs": 10,
                    "money": -500000,
                    "sanity": -20
                },
                "feedback": "もったいない。専門実践教育訓練なら、費用の最大70%が国から戻ってきます。"
            },
            {
                "text": "講座指定を受けてから受講し、給付を申請する。",
                "effect": {
                    "cs": 30,
                    "money": 350000,
                    "sanity": 0
                },
                "feedback": "正解。自分のスキルアップを他人の金（雇用保険）でやる。これが大人の勉強法です。"
            }
        ]
    },
    {
        "id": "q_exp_10",
        "category": "LABOR",
        "difficulty": "Expert",
        "text": "失業保険受給中に、早期に再就職が決まった。「再就職手当」を知っているか？",
        "imagePrompt": "新しいオフィスの鍵、残りの給付日数、ボーナス袋",
        "choices": [
            {
                "text": "残りの失業保険が貰えなくて損した気分。",
                "effect": {
                    "cs": -10,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "無知。残日数の60〜70%を一括で貰えるボーナス制度があります。"
            },
            {
                "text": "要件（残日数1/3以上など）を満たして申請する。",
                "effect": {
                    "cs": 30,
                    "money": 200000,
                    "sanity": +10
                },
                "feedback": "完全勝利。早く就職した方が、総受取額（給与+手当）が増えるように設計されています。"
            }
        ]
    },
    {
        "id": "q_exp_11",
        "category": "LABOR",
        "difficulty": "Expert",
        "text": "60歳を超えて給料が下がった。「高年齢雇用継続給付」を申請するか。",
        "imagePrompt": "老眼鏡、減った給与明細、補填される金",
        "choices": [
            {
                "text": "給料が減ったのでモチベーションを下げる。",
                "effect": {
                    "cs": -20,
                    "money": 0,
                    "sanity": -10
                },
                "feedback": "ただの愚痴。給与の最大15%が支給される制度を使わない手はありません。"
            },
            {
                "text": "会社経由で申請してもらう。",
                "effect": {
                    "cs": 20,
                    "money": 30000,
                    "sanity": 0
                },
                "feedback": "正解。年金との調整はありますが、貰えるものは貰うのが鉄則です。"
            }
        ]
    },
    {
        "id": "q_exp_12",
        "category": "LABOR",
        "difficulty": "Expert",
        "text": "親の介護で仕事を休む。「介護休業給付金」は給料の何割？",
        "imagePrompt": "車椅子、介護ベッド、空っぽの冷蔵庫",
        "choices": [
            {
                "text": "そんな制度あるの？貯金で耐える。",
                "effect": {
                    "cs": -20,
                    "money": -200000,
                    "sanity": -30
                },
                "feedback": "破綻します。介護貧乏への入り口です。"
            },
            {
                "text": "給料の67%が支給される制度を利用する。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": +10
                },
                "feedback": "命綱。最長93日、3回まで分割取得可能。これを知らないと家族共倒れです。"
            }
        ]
    },
    {
        "id": "q_exp_13",
        "category": "ADMIN",
        "difficulty": "Expert",
        "text": "うつ病で働けない。「障害年金」は身体障害だけだと思っている。",
        "imagePrompt": "薬の袋、診断書、閉ざされたカーテン",
        "choices": [
            {
                "text": "精神疾患では貰えないと諦める。",
                "effect": {
                    "cs": -30,
                    "money": -1000000,
                    "sanity": -50
                },
                "feedback": "誤解。うつ病や統合失調症も対象です。初診日が重要です。"
            },
            {
                "text": "初診日を証明し、申請手続きを行う。",
                "effect": {
                    "cs": 30,
                    "money": 780000,
                    "sanity": +20
                },
                "feedback": "生存権の行使。障害基礎年金2級なら年約78万円。これは恵みではなく権利です。"
            }
        ]
    },
    {
        "id": "q_exp_14",
        "category": "ADMIN",
        "difficulty": "Expert",
        "text": "生活保護の申請。「エアコンや車を持っていたらダメ」と言われた。",
        "imagePrompt": "役所の窓口、水際作戦、隠された申請書",
        "choices": [
            {
                "text": "役所の言うことだから諦めて帰る。",
                "effect": {
                    "cs": 0,
                    "money": 0,
                    "sanity": -20
                },
                "feedback": "水際作戦に敗北。エアコンは保有容認されるケースが多く、車の条件も緩和されています。"
            },
            {
                "text": "申請権の侵害だと主張し、申請書を無理やり置いてくる。",
                "effect": {
                    "cs": 40,
                    "money": 130000,
                    "sanity": +10
                },
                "feedback": "突破。役所は申請を受理する義務があります。審査させるまでが勝負です。"
            }
        ]
    },
    {
        "id": "q_exp_15",
        "category": "LEGAL",
        "difficulty": "Expert",
        "text": "自己破産。「免責不許可事由（ギャンブルや浪費）」に該当する借金がある。",
        "imagePrompt": "パチンコ台、借用書、裁判官のハンマー",
        "choices": [
            {
                "text": "じゃあ破産できない。夜逃げしかない。",
                "effect": {
                    "cs": -100,
                    "money": 0,
                    "sanity": -50
                },
                "feedback": "早計。裁量免責という救済措置があります。真摯に反省すれば認められるケースも多いです。"
            },
            {
                "text": "「裁量免責」を狙って、正直に全て話し反省文を書く。",
                "effect": {
                    "cs": -50,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "再生への道。CSは地に落ちますが、借金はゼロになり、人生をリセットできます。"
            }
        ]
    },
    {
        "id": "q_exp_16",
        "category": "LEGAL",
        "difficulty": "Expert",
        "text": "5年以上前のサラ金への借金。督促状が来た。",
        "imagePrompt": "古い請求書、電話、時効の砂時計",
        "choices": [
            {
                "text": "「返します」と1円でも払う。",
                "effect": {
                    "cs": -20,
                    "money": -500000,
                    "sanity": -20
                },
                "feedback": "罠にかかりました。債務を承認すると時効が更新（リセット）され、全額支払う義務が復活します。"
            },
            {
                "text": "「時効の援用」を内容証明で通知する。",
                "effect": {
                    "cs": 30,
                    "money": 0,
                    "sanity": +10
                },
                "feedback": "完全勝利。商事債権の時効は5年。援用通知を送れば、支払義務は法的に消滅します。"
            }
        ]
    },
    {
        "id": "q_exp_17",
        "category": "LEGAL",
        "difficulty": "Expert",
        "text": "家賃に関して大家と揉めている。「受け取らない」と言われた。",
        "imagePrompt": "拒否された封筒、滞納扱い、強制退去の警告",
        "choices": [
            {
                "text": "大家が受け取らないなら払わなくていい。",
                "effect": {
                    "cs": -50,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "未納扱いで契約解除されます。相手の思う壺です。"
            },
            {
                "text": "法務局に家賃を「供託」する。",
                "effect": {
                    "cs": 30,
                    "money": -70000,
                    "sanity": 0
                },
                "feedback": "鉄壁防御。供託すれば法的に「支払った」ことになり、滞納による解除を防げます。"
            }
        ]
    },
    {
        "id": "q_exp_18",
        "category": "BUS",
        "difficulty": "Expert",
        "text": "消費税の「簡易課税制度」。売上が5000万以下なら選べる。",
        "imagePrompt": "二つの計算式、業種の表、得する方",
        "choices": [
            {
                "text": "計算が簡単そうだから選ぶ。",
                "effect": {
                    "cs": 0,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "思考停止。実際の仕入れ税額と比較し、得な方を選ぶシミュレーションが必要です。"
            },
            {
                "text": "みなし仕入率が高い業種なので、あえて簡易課税を選ぶ。",
                "effect": {
                    "cs": 20,
                    "money": 200000,
                    "sanity": -5
                },
                "feedback": "戦略的選択。サービス業など仕入れが少ない業種では、簡易課税の方が大幅に節税になる場合があります。"
            }
        ]
    },
    {
        "id": "q_exp_19",
        "category": "BUS",
        "difficulty": "Expert",
        "text": "役員社宅。自宅を会社名義で契約し、自分は会社に家賃を払う。",
        "imagePrompt": "豪華なマンション、会社の看板、50%OFFのタグ",
        "choices": [
            {
                "text": "公私混同に見えるのでやめる。",
                "effect": {
                    "cs": 0,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "美学ですが、損です。"
            },
            {
                "text": "適正な家賃（賃料相当額）を徴収し、残りを経費にする。",
                "effect": {
                    "cs": 30,
                    "money": 600000,
                    "sanity": 0
                },
                "feedback": "錬金術。実質的に家賃の50〜80%を経費化でき、個人の手取りも増えます。"
            }
        ]
    },
    {
        "id": "q_exp_20",
        "category": "TAX",
        "difficulty": "Expert",
        "text": "高所得者になった。「ふるさと納税」の上限額を超えて寄付しても意味がない？",
        "imagePrompt": "大量の返礼品、地方自治体のパンフ、寄付受領証明書",
        "choices": [
            {
                "text": "意味がないので上限までにする。",
                "effect": {
                    "cs": 10,
                    "money": 0,
                    "sanity": 0
                },
                "feedback": "普通の正解。しかし..."
            },
            {
                "text": "純粋な寄付として行い、名誉市民の称号やコネを得る。",
                "effect": {
                    "cs": 100,
                    "money": -1000000,
                    "sanity": +50
                },
                "feedback": "超越者。税金対策を超え、社会的地位（Credit Score）を買う行為です。本物の富裕層の遊び。"
            }
        ]
    }
];