import type { Question } from '../../types';

export const stage8Questions: Question[] = [
    // Q1: Knowledge (SEC) - SIM swap attack (concrete scenario)
    {
        id: "s8_q01",
        category: "SEC",
        text: "突然スマホが「圏外」になった。再起動しても戻らない。直後に銀行から「送金完了」の通知メールが届いた。",
        imagePrompt: "Scene: Phone showing 'no service' on screen, email notification from bank about unauthorized transfer visible on laptop, panic setting in, carrier store in distance. Composition: Phone fills foreground, bank alert creates urgency. Mood: Silent attack in progress, time critical.",
        imagePath: "s8_q01.png",
        choices: [
            {
                text: "何が起きているかわからず、とりあえず様子を見る。",
                effect: { CS: -20, Asset: -50, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "SIMスワップ攻撃の可能性。攻撃者があなたの電話番号を別のSIMに移し、SMS認証を突破して銀行口座を操作。すぐに通信キャリアに連絡してSIMを停止し、銀行口座を凍結すべき。時間が経つほど被害が拡大する。",
                lockRequirements: null
            },
            {
                text: "SIMスワップを疑い、通信キャリアに即連絡+銀行口座凍結。",
                effect: { CS: 20, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。SIMスワップ攻撃は「圏外→不正送金」の流れが典型。通信キャリアへの即時連絡でSIM停止、銀行への連絡で口座凍結が最優先。対策としてSMS認証からアプリベース認証(Google Authenticator等)への切り替えが有効。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ8を開始します。テーマは「電子市民」。パスワード、フィッシング、個人情報・・・デジタル社会の生存術を試します。"
        }
    },

    // Q2: Knowledge (SEC) - Data backup importance (smaller effect, before skills)
    {
        id: "s8_q02",
        category: "SEC",
        text: "パソコンに10年分の写真と仕事のデータがある。バックアップは「そのうちやる」と思っている。",
        imagePrompt: "Scene: a computer with years of memories; ransomware lock screen appearing; cloud backup as lifeline. Composition: data loss nightmare vs backup peace. Mood: complacency vs preparation.",
        imagePath: "s8_q02.png",
        choices: [
            {
                text: "壊れたことないし、大丈夫だろう。バックアップは後回し。",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "時間の問題です。HDDは必ず壊れます。ランサムウェアに感染したら、身代金を払うか全データを失うかの二択。「後悔先に立たず」を地で行く選択です。",
                lockRequirements: null
            },
            {
                text: "3-2-1ルール（3つのコピー、2種類の媒体、1つは遠隔地）でバックアップ体制を構築する。",
                effect: { CS: 10, Asset: -10, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。クラウドと外付けHDDの併用で、ほとんどのデータ消失リスクに対応できます。バックアップは「保険」。事故が起きてからでは遅いです。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (SEC) - Password manager necessity [SKILL OFFER 1 AFTER]
    {
        id: "s8_q03",
        category: "SEC",
        text: "パスワードを覚えきれない。「同じパスワードを使い回す」か「メモに書く」か「パスワードマネージャーを使う」か。",
        imagePrompt: "Scene: Computer monitor showing multiple login screens with password fields, sticky notes on monitor edge with simple passwords visible, password manager notification popup in corner. Composition: Screen fills frame, bad habits exposed. Mood: Vulnerability on display.",
        imagePath: "s8_q03.png",
        choices: [
            {
                text: "覚えやすいパスワードを複数サイトで使い回す。",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "最悪の選択です。1つのサイトが情報漏洩すれば、全てのアカウントが危険に。パスワードリスト攻撃で、あらゆるサービスを乗っ取られます。",
                lockRequirements: null
            },
            {
                text: "パスワードマネージャーを使い、サービスごとに強力なパスワードを自動生成・管理する。",
                effect: { CS: 10, Asset: 10, Autonomy: 5 },
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

    // Q4: Knowledge (SEC) - Two-factor authentication importance (medium effect, 1 skill helps)
    {
        id: "s8_q04",
        category: "SEC",
        text: "銀行口座のオンラインサービスで「二段階認証を設定してください」と表示された。面倒だが・・・",
        imagePrompt: "Scene: a bank login screen with 2FA prompt; hacker shadow trying to break in; shield forming with second factor. Composition: security layers visualization. Mood: inconvenience vs protection.",
        imagePath: "s8_q04.png",
        choices: [
            {
                text: "面倒なので「後で」をクリックし続ける。",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "致命的な油断です。パスワードが漏洩した瞬間、口座は乗っ取られます。二段階認証は「最後の砦」。面倒さは、被害の大きさと比べれば取るに足りません。",
                lockRequirements: null
            },
            {
                text: "すぐに設定する。パスワードだけでは防げない攻撃がある。",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。パスワードは漏洩する前提で考えるべき。二段階認証があれば、パスワードが盗まれても口座は守られます。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Dilemma (SEC) - 古いスマホの処分方法
    {
        id: "s8_q05",
        category: "SEC",
        text: "新しいスマホに機種変更した。古いスマホには写真、メール、アプリのログイン情報が残っている。売却すれば数千円になるが・・・",
        imagePrompt: "Scene: Old smartphone on desk next to buyback price tag, screen showing photo gallery preview, shredder in background, money bills fanned out nearby. Composition: Phone centered, destruction vs profit paths visible. Mood: Data vs money, irreversible choice.",
        imagePath: "s8_q05.png",
        choices: [
            {
                text: "初期化してフリマアプリで売却する。工場出荷状態にすれば大丈夫だろう。",
                effect: { CS: -10, Asset: 10, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "リスクのある選択。初期化だけではデータ復元ツールで情報を取り出せる可能性があります。写真、メール、決済情報が流出するリスクを受け入れて利益を取りました。",
                lockRequirements: null
            },
            {
                text: "データ消去ソフトで上書き処理後、メーカーや通信キャリアの公式回収プログラムを利用する。",
                effect: { CS: 10, Asset: 10, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解。データ消去ソフトで上書き処理すれば復元リスクを大幅に低減。メーカーや通信キャリアの公式回収プログラムなら適切に処分される。物理的破壊も有効だが、レアメタル回収の観点では公式回収が望ましい。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "利益とリスク、どちらを優先しますか？"
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
                effect: { CS: -20, Asset: -20, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "危険です。悪意のある偽Wi-Fiかもしれません。入力した情報は攻撃者に筒抜け。公共Wi-Fiで機密情報を入力するのは、公衆の面前で暗証番号を叫ぶようなものです。",
                lockRequirements: null
            },
            {
                text: "公共Wi-Fiでは機密情報を扱わない。必要ならVPNを使うか、モバイル回線を使う。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
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
        text: "オンラインサービスの本人確認で「免許証の写真を送ってください」と言われた。知らないサービスだが・・・",
        imagePrompt: "Scene: a phone camera pointing at ID card; unknown app requesting verification; identity theft scenarios playing out. Composition: identity exposure risk. Mood: verification necessity vs identity theft.",
        imagePath: "s8_q07.png",
        choices: [
            {
                text: "本人確認のためなら仕方ない。免許証の表裏を撮影して送信する。",
                effect: { CS: -10, Asset: -30, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "身元情報の流出です。詐欺サイトに免許証画像を渡したら、あなた名義で借金や契約が行われる可能性があります。「本人確認」を装った詐欺は多発しています。",
                lockRequirements: null
            },
            {
                text: "サービスの信頼性を確認。不審なら送らない。必要なら公式サイトから直接アクセスして確認。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。本人確認書類は「最重要個人情報」。送る前に、そのサービスが本物か、本当に必要かを確認。一度流出した身分証情報は取り消せません。",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。「言われたから送る」という思考停止状態です。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (SEC) - Phishing recognition (biggest effect, 2 skills help)
    {
        id: "s8_q08",
        category: "SEC",
        text: "「【重要】お客様の口座が不正利用されました。今すぐご確認ください」というメールが届いた。リンクがついている。",
        imagePrompt: "Scene: Email notification on phone lock screen showing urgent bank warning, finger hovering over notification, real bank app icon visible in background. Composition: Phone screen fills frame, notification overlay. Mood: Panic trigger, split-second decision.",
        imagePath: "s8_q08.png",
        choices: [
            {
                text: "急いでリンクをクリックし、口座を確認する。",
                effect: { CS: -30, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "フィッシング詐欺にかかりました。偽サイトにIDとパスワードを入力し、口座情報を盗まれました。「緊急」「今すぐ」という煽りは詐欺の常套手段です。",
                lockRequirements: null
            },
            {
                text: "メールのリンクは使わず、公式アプリか、自分でURLを入力して確認する。",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。正規の連絡ならアプリや公式サイトでも確認できます。「メールのリンクは信じない」が鉄則。不安なら電話で直接確認を。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma (SEC) - AIチャットボットへの個人情報入力
    {
        id: "s8_q09",
        category: "SEC",
        text: "業務効率化のためAIチャットボットを使い始めた。契約書のレビューや顧客データの分析を依頼したいが、機密情報を入力することになる。",
        imagePrompt: "Scene: Office desk with AI chat interface on monitor, cursor hovering over send button, confidential document with company watermark being typed into chat input field, warning icon subtle in corner. Composition: Monitor fills frame, sensitive data exposed in text field. Mood: Efficiency temptation, invisible risk.",
        imagePath: "s8_q09.png",
        choices: [
            {
                text: "効率を優先して機密情報も入力する。AIの方が正確だし、業務が早く終わる。",
                effect: { CS: -10, Asset: 0, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "危険な選択。AIサービスは入力データを学習に使用する可能性があります。機密情報の漏洩が起きた場合、責任はあなたに。便利さの代償は計り知れない。",
                lockRequirements: null
            },
            {
                text: "機密情報は一切入力しない。AIには一般的な質問だけにする。",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。AIツールの利便性と情報管理の境界線を引く判断力があります。機密情報の流出リスクをゼロにしました。効率は落ちますが、情報セキュリティを守る姿勢は組織への責任。",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。便利さの誘惑に抗うには自律性が必要です。"
            }
        ],
        adamDialogue: {
            intro: "便利さの裏にあるリスク、見えていますか？"
        }
    },

    // Q10: Knowledge (SEC) - My Number health insurance card benefits
    {
        id: "s8_q10",
        category: "SEC",
        text: "マイナ保険証を使うと何が変わる? 従来の保険証と同じ?",
        imagePrompt: "Scene: Hospital reception counter, My Number card being presented, screen showing automatic high-cost medical limit application, pharmacist checking medication history on system. Composition: Card presentation moment, digital benefits flowing. Mood: Seamless healthcare, invisible advantages.",
        imagePath: "s8_q10.png",
        choices: [
            {
                text: "保険証と同じ。カードが増えるだけで面倒。",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "大きな誤解。マイナ保険証なら限度額適用認定証が不要(高額療養費の自己負担限度額が自動適用)。マイナポータルで過去の診療歴・処方薬を確認可能。確定申告の医療費控除も自動入力。2024年12月から従来の保険証は新規発行停止。",
                lockRequirements: null
            },
            {
                text: "限度額適用認定証が不要になり、高額療養費が自動適用される。医療費控除の自動入力も可能。",
                effect: { CS: 10, Asset: 30, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解。入院時に限度額適用認定証を事前申請する手間がなくなる。薬の飲み合わせチェック、過去の健診結果確認もできる。救急搬送時にも医療情報が共有される。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。デジタル化の実益を理解していますか？",
            after: "ステージ8を終了します。審査結果を算出中・・・"
        }
    }
];
