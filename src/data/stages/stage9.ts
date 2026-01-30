import type { Question } from '../../types';

export const stage9Questions: Question[] = [
    // Q1: Knowledge (DISASTER) - Emergency contact systems (smallest effect, before skills)
    {
        id: "s9_q01",
        category: "DISASTER",
        text: "大地震発生。家族と連絡が取れない。電話は繋がらない状況。",
        imagePrompt: "Scene: Phone screen showing no signal bars, emergency broadcast text notification partially visible, hand-written family contact card tucked in phone case, cracked ceiling visible above. Composition: Phone fills frame, analog backup visible. Mood: Digital failure, prepared alternatives.",
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
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。「171」は毎月1日と15日に体験利用可能。家族との事前の取り決め（集合場所、連絡方法）が、混乱時の命綱になります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ9を開始します。テーマは「危機管理」。災害、事故、緊急事態・・・最悪を想定できる者だけが生き残ります。"
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
                effect: { CS: -10, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "不十分です。水は1人1日3リットル、最低3日分が必要。懐中電灯、モバイルバッテリー、常備薬、現金も重要。「とりあえず」は準備不足の言い訳です。",
                lockRequirements: null
            },
            {
                text: "水・食料・照明・情報（ラジオ）・衛生用品を「最低3日分」揃え、定期的に点検する。",
                effect: { CS: 20, Asset: -10, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。災害後72時間は自助が基本。備蓄は買って終わりではなく、賞味期限チェックと入れ替え（ローリングストック）が必要です。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (DISASTER) - Hazard map usage [SKILL OFFER 1 AFTER] [SWAPPED A↔B]
    {
        id: "s9_q03",
        category: "DISASTER",
        text: "引越し先を検討中。「ハザードマップを確認した方がいい」と言われたが・・・",
        imagePrompt: "Scene: a map showing flood zones, landslide areas, and safe zones; apartment buildings in different risk areas; color-coded danger levels. Composition: geographic risk visualization. Mood: informed decision vs blind choice.",
        imagePath: "s9_q03.png",
        choices: [
            {
                text: "ハザードマップで浸水・土砂災害リスクを確認し、リスクと利便性を天秤にかけて判断する。",
                effect: { CS: 20, Asset: 0, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。ハザードマップは自治体のウェブサイトで無料閲覧可能。リスクを知った上で住むのと、知らずに住むのでは、備えの質が違います。",
                lockRequirements: null
            },
            {
                text: "駅近で便利な場所を優先。ハザードマップは気にしない。",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "リスクの見落としです。洪水浸水想定区域や土砂災害警戒区域に住むと、災害時の被害が甚大に。「便利」の代償が「命」になりえます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (DISASTER) - Insurance claim documentation [SWAPPED A↔B]
    {
        id: "s9_q04",
        category: "DISASTER",
        text: "災害で家財が損壊した。保険金を請求するには何が必要？",
        imagePrompt: "Scene: damaged possessions after disaster; camera documenting damage; receipts and records floating; insurance claim form. Composition: evidence collection process. Mood: aftermath, documentation importance.",
        imagePath: "s9_q04.png",
        choices: [
            {
                text: "片付け前に被害状況を写真・動画で記録。購入記録や修理見積もりを集めてから請求する。罹災証明書も自治体に申請。",
                effect: { CS: 20, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。罹災証明書の取得が公的支援の入口。被災者生活再建支援金(最大300万円)の申請にも写真記録が必要。自治体窓口に早めに相談を。「片付けてしまった後」では証拠がなくなります。",
                lockRequirements: null
            },
            {
                text: "保険会社に電話すれば、あとは向こうがやってくれるはず。",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "受け身すぎます。被害状況の写真、購入時の領収書、修理見積もりがないと、保険金は満額出ません。罹災証明書の取得が公的支援の入口。被災者生活再建支援金(最大300万円)の申請にも写真記録が必要。自治体窓口に早めに相談を。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (DISASTER) - Disaster fake news handling
    {
        id: "s9_q05",
        category: "DISASTER",
        text: "大地震後、SNSで「〇〇地区の浄水場が汚染された。水道水を飲むな」という投稿がバズっている。",
        imagePrompt: "Scene: Phone screen showing viral disaster post with alarming headline and retweet count, official news app showing no updates yet, water bottle in hand, finger hovering over share button. Composition: Phone dominates, share/ignore decision moment. Mood: Information fog, panic potential.",
        imagePath: "s9_q05.png",
        choices: [
            {
                text: "家族や知人に早く知らせるため、そのまま拡散する。",
                effect: { CS: -20, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "デマの可能性。災害時のSNSは誤情報が急速に広がる。善意の拡散がパニックを助長する。公式情報(自治体HP、NHK、気象庁)を確認してから判断すべき。",
                lockRequirements: null
            },
            {
                text: "公式情報(自治体HP、NHK)を確認してから判断する。未確認情報は拡散しない。",
                effect: { CS: 20, Asset: 0, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解。災害時の情報は「出典を確認」が鉄則。自治体の公式SNSアカウント、NHKのニュース速報、気象庁のサイトが信頼できる情報源。「速さ」より「正確さ」が人命を守る。",
                lockRequirements: null
            }
        ]
    },

    // Q6: Knowledge (DISASTER) - Earthquake/fire insurance separation (biggest effect, 1 skill helps)
    {
        id: "s9_q06",
        category: "DISASTER",
        text: "新居の火災保険に加入。「地震保険もセットで」と勧められたが、地震保険料は高い。",
        imagePrompt: "Scene: Kitchen table with insurance documents spread out, fire insurance policy open, separate earthquake insurance rider with premium circled, TV showing earthquake damage in background. Composition: Documents dominate, TV provides context. Mood: Coverage gap revealed.",
        imagePath: "s9_q06.png",
        choices: [
            {
                text: "地震保険に加入する。火災保険だけでは地震による被害は補償されない。",
                effect: { CS: 20, Asset: -20, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。地震保険は火災保険の特約として加入が必要。保険料は高いですが、「家を失うリスク」と比較すれば合理的な投資です。",
                lockRequirements: null
            },
            {
                text: "火災保険で地震も補償されると思う。地震保険は不要。",
                effect: { CS: -30, Asset: -50, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "致命的な誤解です。火災保険では地震・津波・噴火による損害は免責。地震大国日本で、地震保険なしは「家を失っても補償ゼロ」を意味します。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (TAX) - Medical expense deduction
    {
        id: "s9_q07",
        category: "TAX",
        text: "今年、歯の治療で20万円かかった。会社員で年末調整は済んでいるが、何かできることはある？",
        imagePrompt: "Scene: Shoebox overflowing with medical receipts from the year, tax return guide booklet dog-eared, sticky note with refund estimate calculation. Composition: Receipt collection chaos, organization attempt. Mood: Annual reckoning, hidden money to reclaim.",
        imagePath: "s9_q07.png",
        choices: [
            {
                text: "年末調整で終わったから、もう何もできない。",
                effect: { CS: -20, Asset: -20, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "損をしています。医療費控除は年末調整では処理されません。年間医療費が10万円（または総所得の5%）を超えた分は、確定申告で所得控除が受けられます。知らないだけで税金を多く払っています。",
                lockRequirements: null
            },
            {
                text: "確定申告で医療費控除を申請する。領収書を集め、還付を受ける。",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。20万円の医療費なら、約1〜2万円の還付が期待できます。交通費も対象。医療費が10万円未満でも、OTC医薬品の年間購入額が1.2万円超なら最大8.8万円の控除が可能(セルフメディケーション税制、医療費控除との選択制)。「会社員だから確定申告は関係ない」は大きな誤解です。",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。「確定申告は面倒」という先入観で行動できません。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (DISASTER) - Rental property contents insurance
    {
        id: "s9_q08",
        category: "DISASTER",
        text: "賃貸に住んでいるが、家財保険には入っていない。「賃貸だから建物は大家の責任。保険は不要」と思っている。",
        imagePrompt: "Scene: Rental apartment living room with electronics and furniture, insurance pamphlet on coffee table, water stain on ceiling hinting at leak risk, hazard map pinned to fridge. Composition: Comfortable home with hidden vulnerabilities. Mood: False security, affordable protection available.",
        imagePath: "s9_q08.png",
        choices: [
            {
                text: "家財保険に加入する。建物は大家の責任でも、家財は自分の責任。ハザードマップと併せてリスク把握する。",
                effect: { CS: 20, Asset: 10, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。家財保険は火災だけでなく水害、盗難、落雷もカバー。個人賠償責任特約もつけておけば、階下への漏水事故なども補償。月額数百円で大きなリスクをカバーできる。",
                lockRequirements: null
            },
            {
                text: "賃貸だから保険は不要。大家が入っているはず。",
                effect: { CS: -20, Asset: -40, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "大家の火災保険は建物のみ。家財(家電、家具、衣類)は対象外。水害・盗難・漏水被害も家財保険でカバー。月額数百円〜。加入しないと数百万円の損害を全額自己負担。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Knowledge (DISASTER) - Evacuation behavior during heavy rain
    {
        id: "s9_q09",
        category: "DISASTER",
        text: "大雨警報が出た。自宅はハザードマップで浸水想定区域。避難指示はまだ出ていない。",
        imagePrompt: "Scene: Window showing heavy rain outside, phone displaying weather alert level 3, hazard map on table showing flood zone with home marked, emergency bag by door. Composition: Rain visible through window, preparation visible indoors. Mood: Rising urgency, prepared response.",
        imagePath: "s9_q09.png",
        choices: [
            {
                text: "避難指示が出るまで大丈夫。出たら避難する。",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "危険。警戒レベル5(緊急安全確保)の段階では既に手遅れの可能性。レベル3(高齢者等避難)で避難開始が推奨。ハザードマップで確認した避難場所・経路を使い、早めに行動すべき。",
                lockRequirements: null
            },
            {
                text: "警戒レベル3の段階で避難開始。避難場所と経路はハザードマップで事前確認済み。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。警戒レベル: 1(注意)→2(避難行動確認)→3(高齢者等避難)→4(避難指示=全員避難)→5(緊急安全確保=手遅れ)。レベル4が出る前に行動。非常持出袋、モバイルバッテリー、現金、保険証コピーを持って避難。",
                lockRequirements: { Autonomy: 180 },
                lockedFeedback: "LOCKED: 自律性が180以上必要。指示を待たず自ら判断して行動する力が不足しています。"
            }
        ]
    },

    // Q10: Knowledge (DISASTER) - Earthquake evacuation (specific knowledge)
    {
        id: "s9_q10",
        category: "DISASTER",
        text: "地震発生。自宅マンション5階。避難警報が出ている。どうする?",
        imagePrompt: "Scene: Apartment room shaking, items falling from shelves, emergency stairs sign glowing, breaker panel on wall, door slightly ajar. Composition: Chaos with clear exit path visible. Mood: Immediate danger, practiced response needed.",
        imagePath: "s9_q10.png",
        choices: [
            {
                text: "まず身の安全確保(テーブル下など)。揺れが収まったら非常階段で避難。ブレーカーを落とし(通電火災防止)、ガスの元栓を閉める。避難場所はハザードマップで確認済みの場所へ。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。通電火災は地震後に電気が復旧した際に発火するもので、阪神大震災の火災原因の多くを占める。エレベーターは絶対に使わない(閉じ込めリスク)。避難時はドアを開けて逃げ道を確保。",
                lockRequirements: null
            },
            {
                text: "エレベーターで急いで避難する。",
                effect: { CS: -20, Asset: 0, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "致命的な判断ミス。地震時のエレベーターは閉じ込めのリスクが極めて高い。停電で動かなくなり、救助まで数時間〜数日かかることも。必ず非常階段を使う。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。地震発生時、正しい行動を取れますか？",
            after: "ステージ9を終了します。審査結果を算出中・・・"
        }
    }
];
