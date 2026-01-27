import type { Question } from '../../types';

export const stage8Questions: Question[] = [
    // Q1: Knowledge (SEC) - Two-factor authentication importance
    {
        id: "s8_q01",
        category: "SEC",
        text: "銀行口座のオンラインサービスで「二段階認証を設定してください」と表示された。面倒だが……",
        imagePrompt: "Scene: a bank login screen with 2FA prompt; hacker shadow trying to break in; shield forming with second factor. Composition: security layers visualization. Mood: inconvenience vs protection.",
        imagePath: "s8_q01.png",
        choices: [
            {
                text: "面倒なので「後で」をクリックし続ける。",
                effect: { CS: -20, Asset: -100000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "致命的な油断です。パスワードが漏洩した瞬間、口座は乗っ取られます。二段階認証は「最後の砦」。面倒さは、被害の大きさと比べれば取るに足りません。",
                lockRequirements: null
            },
            {
                text: "すぐに設定する。パスワードだけでは防げない攻撃がある。",
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。パスワードは漏洩する前提で考えるべき。二段階認証があれば、パスワードが盗まれても口座は守られます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "Stage 8を開始します。テーマは『電子市民』。パスワード、フィッシング、個人情報……デジタル社会の生存術を試します。"
        }
    },

    // Q2: Knowledge (SEC) - Phishing recognition
    {
        id: "s8_q02",
        category: "SEC",
        text: "「【重要】お客様の口座が不正利用されました。今すぐご確認ください」というメールが届いた。リンクがついている。",
        imagePrompt: "Scene: an urgent email with suspicious link; real bank website vs fake lookalike; fishing hook hidden in the message. Composition: deceptive urgency with hidden danger. Mood: panic manipulation.",
        imagePath: "s8_q02.png",
        choices: [
            {
                text: "急いでリンクをクリックし、口座を確認する。",
                effect: { CS: -25, Asset: -200000, Autonomy: -15 },
                verdict: "WARNING",
                feedback: "フィッシング詐欺にかかりました。偽サイトにIDとパスワードを入力し、口座情報を盗まれました。「緊急」「今すぐ」という煽りは詐欺の常套手段です。",
                lockRequirements: null
            },
            {
                text: "メールのリンクは使わず、公式アプリか、自分でURLを入力して確認する。",
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。正規の連絡ならアプリや公式サイトでも確認できます。「メールのリンクは信じない」が鉄則。不安なら電話で直接確認を。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (SEC) - Password manager necessity [SKILL OFFER 1 AFTER]
    {
        id: "s8_q03",
        category: "SEC",
        text: "パスワードを覚えきれない。「同じパスワードを使い回す」か「メモに書く」か「パスワードマネージャーを使う」か。",
        imagePrompt: "Scene: multiple login screens with same password (dangerous); sticky notes with passwords (risky); password manager vault (secure). Composition: three paths of password management. Mood: convenience vs security trade-off.",
        imagePath: "s8_q03.png",
        choices: [
            {
                text: "覚えやすいパスワードを複数サイトで使い回す。",
                effect: { CS: -20, Asset: -50000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "最悪の選択です。1つのサイトが情報漏洩すれば、全てのアカウントが危険に。パスワードリスト攻撃で、あらゆるサービスを乗っ取られます。",
                lockRequirements: null
            },
            {
                text: "パスワードマネージャーを使い、サービスごとに強力なパスワードを自動生成・管理する。",
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。マスターパスワード1つを覚えれば、何百ものサイトを安全に管理できます。初期設定の手間は、将来の被害と比べれば微々たるものです。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (SEC) - SIM swap attack awareness
    {
        id: "s8_q04",
        category: "SEC",
        text: "「SIMスワップ詐欺」という言葉を聞いた。どんな攻撃か知らないが、対策は必要？",
        imagePrompt: "Scene: a phone losing signal; attacker taking over same number on new device; bank SMS codes being intercepted. Composition: invisible takeover process. Mood: silent threat, hidden vulnerability.",
        imagePath: "s8_q04.png",
        choices: [
            {
                text: "聞いたことがない攻撃は気にしなくていい。自分には関係ない。",
                effect: { CS: -15, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "危険な無知です。SIMスワップは攻撃者があなたの電話番号を乗っ取る手口。SMS認証を突破され、銀行口座やSNSを乗っ取られます。知らないことは弱点です。",
                lockRequirements: null
            },
            {
                text: "SMSではなくアプリベースの認証（Google Authenticator等）を優先的に使う。",
                effect: { CS: 15, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。SMS認証はSIMスワップに脆弱。認証アプリやハードウェアキーを使えば、電話番号を乗っ取られても認証は守られます。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Dilemma (SEC) - Convenience vs security settings
    {
        id: "s8_q05",
        category: "SEC",
        text: "スマホの設定。「生体認証のみ」（便利）か「生体認証＋パスコード」（より安全）か。",
        imagePrompt: "Scene: phone settings screen with security options; convenience icon vs security icon; scales balancing daily use vs protection. Composition: security level choice. Mood: daily friction vs protection level.",
        imagePath: "s8_q05.png",
        choices: [
            {
                text: "生体認証のみ。毎回パスコードを入力するのは面倒。",
                effect: { CS: 5, Asset: 0, Autonomy: 10 },
                verdict: "NEUTRAL",
                feedback: "利便性を選びました。日常の摩擦は減りますが、指紋や顔認証が突破された場合のバックアップがありません。リスクを受け入れた選択です。",
                lockRequirements: null
            },
            {
                text: "生体認証＋パスコード。利便性より安全性を優先する。",
                effect: { CS: 15, Asset: 0, Autonomy: -5 },
                verdict: "NEUTRAL",
                feedback: "安全性を選びました。毎日の手間は増えますが、万が一の時の被害を最小化できます。「面倒」を「保険」と捉える姿勢です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "便利さと安全性、どちらを優先しますか？"
        }
    },

    // Q6: Knowledge (SEC) - Public Wi-Fi risks
    {
        id: "s8_q06",
        category: "SEC",
        text: "カフェの無料Wi-Fiに接続。「ログイン情報を入力してください」という画面が出た。",
        imagePrompt: "Scene: a cafe with free Wi-Fi sign; fake login page intercepting data; hacker watching network traffic. Composition: public network danger zones. Mood: false convenience, hidden surveillance.",
        imagePath: "s8_q06.png",
        choices: [
            {
                text: "カフェのWi-Fiだから安全。メールアドレスとパスワードを入力してログイン。",
                effect: { CS: -20, Asset: -30000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "危険です。悪意のある偽Wi-Fiかもしれません。入力した情報は攻撃者に筒抜け。公共Wi-Fiで機密情報を入力するのは、公衆の面前で暗証番号を叫ぶようなものです。",
                lockRequirements: null
            },
            {
                text: "公共Wi-Fiでは機密情報を扱わない。必要ならVPNを使うか、モバイル回線を使う。",
                effect: { CS: 15, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。公共Wi-Fiは「盗聴される前提」で使うべき。銀行、クレジットカード、重要なログインは避けるか、VPNで通信を暗号化してください。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (SEC) - Identity document protection
    {
        id: "s8_q07",
        category: "SEC",
        text: "オンラインサービスの本人確認で「免許証の写真を送ってください」と言われた。知らないサービスだが……",
        imagePrompt: "Scene: a phone camera pointing at ID card; unknown app requesting verification; identity theft scenarios playing out. Composition: identity exposure risk. Mood: verification necessity vs identity theft.",
        imagePath: "s8_q07.png",
        choices: [
            {
                text: "本人確認のためなら仕方ない。免許証の表裏を撮影して送信する。",
                effect: { CS: 0, Asset: -100000, Autonomy: -25 },
                verdict: "WARNING",
                feedback: "身元情報の流出です。詐欺サイトに免許証画像を渡したら、あなた名義で借金や契約が行われる可能性があります。「本人確認」を装った詐欺は多発しています。",
                lockRequirements: null
            },
            {
                text: "サービスの信頼性を確認。不審なら送らない。必要なら公式サイトから直接アクセスして確認。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。本人確認書類は「最重要個人情報」。送る前に、そのサービスが本物か、本当に必要かを確認。一度流出した身分証情報は取り消せません。",
                lockRequirements: { Autonomy: 80 },
                lockedFeedback: "LOCKED: 自律性が80以上必要。「言われたから送る」という思考停止状態です。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (SEC) - Data backup importance
    {
        id: "s8_q08",
        category: "SEC",
        text: "パソコンに10年分の写真と仕事のデータがある。バックアップは「そのうちやる」と思っている。",
        imagePrompt: "Scene: a computer with years of memories; ransomware lock screen appearing; cloud backup as lifeline. Composition: data loss nightmare vs backup peace. Mood: complacency vs preparation.",
        imagePath: "s8_q08.png",
        choices: [
            {
                text: "壊れたことないし、大丈夫だろう。バックアップは後回し。",
                effect: { CS: -15, Asset: -50000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "時間の問題です。HDDは必ず壊れます。ランサムウェアに感染したら、身代金を払うか全データを失うかの二択。「後悔先に立たず」を地で行く選択です。",
                lockRequirements: null
            },
            {
                text: "3-2-1ルール（3つのコピー、2種類の媒体、1つは遠隔地）でバックアップ体制を構築する。",
                effect: { CS: 15, Asset: -10000, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。クラウドと外付けHDDの併用で、ほとんどのデータ消失リスクに対応できます。バックアップは「保険」。事故が起きてからでは遅いです。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (SEC) - Report data breach vs ignore
    {
        id: "s8_q09",
        category: "SEC",
        text: "利用しているサービスで情報漏洩が発生。自分のメールアドレスも含まれているが、今のところ被害はない。",
        imagePrompt: "Scene: data breach notification; exposed personal data floating; choice between active response vs passive waiting. Composition: breach aftermath decision. Mood: aftermath, proactive vs reactive.",
        imagePath: "s8_q09.png",
        choices: [
            {
                text: "被害がないなら様子を見る。パスワード変更は面倒。",
                effect: { CS: 5, Asset: 0, Autonomy: -10 },
                verdict: "NEUTRAL",
                feedback: "リスクを放置しました。漏洩した情報は闇市場で売買されます。今は大丈夫でも、数ヶ月後に攻撃を受ける可能性があります。",
                lockRequirements: null
            },
            {
                text: "すぐにパスワードを変更し、同じパスワードを使っている他サービスも全て変更する。",
                effect: { CS: 10, Asset: 0, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "予防的行動です。手間はかかりますが、被害を未然に防ぐ最善の方法。漏洩情報は永遠に消えないので、先手を打つしかありません。",
                lockRequirements: { Asset: 80000 },
                lockedFeedback: "LOCKED: 資産が80,000円以上必要。パスワードマネージャー等のツールを導入する余裕がありません。"
            }
        ],
        adamDialogue: {
            intro: "予防と対処、どちらを選びますか？"
        }
    },

    // Q10: Philosophy (SEC) - Privacy vs connectivity [DATA REALITY CHECK]
    {
        id: "s8_q10",
        category: "SEC",
        text: "あなたの検索履歴、位置情報、購買記録は企業に売買されている。その時、『個人情報』は何ですか？",
        imagePrompt: "Scene: protagonist's data floating as currency between corporations; one path shows data as protected treasure; other shows data as tradable commodity. Composition: data marketplace reality. Mood: uncomfortable truth, pragmatic choice.",
        imagePath: "s8_q10.png",
        choices: [
            {
                text: "守るべき人格の一部。売買されること自体が間違っている。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "プライバシー重視の回答です。原理的には正しいですが、現実のデジタル経済から離脱するコストは高く、機会損失も生じます。",
                lockRequirements: null
            },
            {
                text: "売買される商品。どうせ取られるなら、自分にも利益を還元させる。",
                effect: { CS: 20, Asset: 5000, Autonomy: -10 },
                verdict: "NEUTRAL",
                feedback: "実利的回答です。ポイント還元、無料サービス……データ提供の見返りを最大化する姿勢。ただし、一度渡した情報は取り戻せません。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。あなたのデータは誰のものですか？",
            after: "Stage 8を終了します。審査結果を算出中..."
        }
    }
];
