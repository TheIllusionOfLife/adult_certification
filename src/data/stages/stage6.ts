import type { Question } from '../../types';

export const stage6Questions: Question[] = [
    // Q1: Knowledge (HOUSING) - Rental contract basics [SWAPPED A↔B]
    {
        id: "s6_q01",
        category: "HOUSING",
        text: "初めての一人暮らし。賃貸契約で「礼金1ヶ月・仲介手数料1ヶ月」と言われた。交渉の余地は？",
        imagePrompt: "Scene: a rental contract with multiple fee items highlighted; young tenant facing real estate agent; money flowing out. Composition: initial costs breakdown, negotiation opportunity hints. Mood: first-time vulnerability, hidden flexibility.",
        imagePath: "s6_q01.png",
        choices: [
            {
                text: "「相場だから仕方ない」と全額払う。",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "機会損失です。礼金は交渉で減額できることが多く、仲介手数料は法的上限（賃料1ヶ月分）を超えている場合も。言い値で払うと損をします。",
                lockRequirements: null
            },
            {
                text: "礼金の減額と仲介手数料の根拠を確認し、交渉を試みる。",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。礼金は慣習であり法的義務ではなく、仲介手数料は原則「貸主・借主で折半」（宅建業法46条）。知識があれば交渉できます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ6を開始します。テーマは「契約の攻防」。賃貸、売買、交渉・・・契約は力関係で決まります。"
        }
    },

    // Q2: Knowledge (FINANCE) - Mortgage loan comparison (smaller effect, before skills) [SWAPPED A↔B]
    {
        id: "s6_q02",
        category: "FINANCE",
        text: "住宅ローンを検討中。複数の銀行から見積もりを取ったが、金利以外に何を比較すべき？",
        imagePrompt: "Scene: Kitchen counter with laptop showing bank comparison website, multiple browser tabs visible, coffee mug with bank logo received as promotional gift. Composition: Laptop screen dominant, casual home research setting. Mood: DIY research, information overload.",
        imagePath: "s6_q02.png",
        choices: [
            {
                text: "金利、手数料、保証料、団信条件、繰上返済条件を総合的に比較し、総支払額で判断する。",
                effect: { CS: 10, Asset: 10, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。35年ローンでは0.1%の金利差が数十万円になります。複数要素を比較し、本当の「安さ」を見極める力が必要です。",
                lockRequirements: null
            },
            {
                text: "金利が一番低い銀行を選ぶ。金利がすべて。",
                effect: { CS: -10, Asset: -30, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "視野狭窄です。事務手数料、保証料、団信保険料、繰上返済手数料・・・金利以外のコストで数十万円の差が出ます。総支払額で比較しないと損をします。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (HOUSING) - Guarantor vs guarantee company [SKILL OFFER 1 AFTER] [SWAPPED A↔B]
    {
        id: "s6_q03",
        category: "HOUSING",
        text: "賃貸契約で「連帯保証人が必要」と言われた。親に頼めないが、保証会社を使うと費用がかかる。",
        imagePrompt: "Scene: Rental application form on table, guarantor section highlighted with blank fields, phone showing estranged relative's contact, guarantee company pamphlet with fee schedule nearby. Composition: Form centered, two options at edges. Mood: Independence costs money, relationships cost more.",
        imagePath: "s6_q03.png",
        choices: [
            {
                text: "保証会社は高いので、疎遠な親戚に無理を言って保証人を頼む。",
                effect: { CS: -10, Asset: 0, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "リスクの転嫁です。連帯保証人は「あなたの借金を全額肩代わりする義務」を負います。親戚関係を壊すリスクと、金銭トラブルの種を撒いています。",
                lockRequirements: null
            },
            {
                text: "保証会社を利用する。費用はかかるが、人間関係のリスクを避けられる。",
                effect: { CS: 10, Asset: 0, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。保証会社費用（賃料の0.5〜1ヶ月分）は「人間関係保険」。金銭トラブルで親戚関係を壊すよりはるかに安い投資です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (HOUSING) - Fixed-term vs regular lease (定期借家) [SWAPPED A↔B]
    {
        id: "s6_q04",
        category: "HOUSING",
        text: "気に入った物件が「定期借家契約」だと説明された。「普通借家」との違いを聞かれたが、よくわからない。",
        imagePrompt: "Scene: Two lease contracts on real estate agent's desk, one stamped with fixed-term label and end date visible, agent's hand pointing at signature line, apartment keys waiting. Composition: Contracts fill frame, critical difference in stamps. Mood: Hidden trap in routine paperwork.",
        imagePath: "s6_q04.png",
        choices: [
            {
                text: "定期借家は「更新なし」を確認し、長期居住なら普通借家を探す。",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。定期借家は家賃が安いことが多いですが、契約終了時に更新請求権がありません。転勤予定など短期なら定期借家、長期居住なら普通借家と使い分けるのが賢明です。",
                lockRequirements: null
            },
            {
                text: "「借家」は同じだから大差ないと思い、そのまま契約する。",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "重大な見落としです。定期借家は「契約期間満了で終了」が原則。更新がなく、期間満了時に退去を求められます。再契約を拒否されれば引越し費用が発生します。長く住みたいなら普通借家を選ぶべきでした。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (HOUSING) - Rental AC: equipment vs leftover
    {
        id: "s6_q05",
        category: "HOUSING",
        text: "入居直後にエアコンが故障した。管理会社に連絡したら「それは残置物なので自己負担です」と言われた。",
        imagePrompt: "Scene: Broken air conditioner dripping water, lease agreement open on table with equipment list highlighted, phone showing management company contact, repair estimate on screen. Composition: Broken AC dominant, contract as reference. Mood: Unexpected cost, contract knowledge as defense.",
        imagePath: "s6_q05.png",
        choices: [
            {
                text: "仕方ない。自費で修理する。",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "確認不足。契約書の「付帯設備」欄を確認すべき。「設備」として記載されていれば経年劣化の修理は大家負担。「残置物」(前入居者の残り)なら借主負担。入居前の確認と動作チェックが重要。",
                lockRequirements: null
            },
            {
                text: "契約書の設備一覧を確認。「設備」なら大家負担、「残置物」なら自己負担。まず契約書を根拠に管理会社と交渉。",
                effect: { CS: 10, Asset: 20, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解。2020年民法改正で、設備の場合は一定期間対応がなければ自分で修理し費用請求も可能に。フィルター掃除の怠慢や入居者の過失は自己負担。入居時に設備の動作確認と写真記録を忘れずに。",
                lockRequirements: null
            }
        ]
    },

    // Q6: Knowledge (HOUSING) - Home purchase hidden costs [SWAPPED A↔B]
    {
        id: "s6_q06",
        category: "HOUSING",
        text: "3,000万円の中古マンションを購入予定。「頭金300万円があれば買える」と思っているが・・・",
        imagePrompt: "Scene: a home purchase calculation; visible price tag vs hidden costs (taxes, fees, renovation); iceberg metaphor. Composition: surface price vs total cost. Mood: hidden expense revelation.",
        imagePath: "s6_q06.png",
        choices: [
            {
                text: "頭金300万円を用意し、残りはローンで問題ない。",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "見積もり不足です。諸費用（登記、仲介手数料、税金等）は物件価格の5〜10%（150〜300万円）。頭金だけでは足りず、追加で借入が必要になります。",
                lockRequirements: null
            },
            {
                text: "諸費用（物件価格の5〜10%）を含めた総予算を計算し、資金計画を立て直す。",
                effect: { CS: 10, Asset: 20, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。「買える」と「払える」は違います。諸費用、引越し費用、家具購入、緊急予備費まで含めた計画が必要です。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (HOUSING) - Using third-party mediation [SWAPPED A↔B]
    {
        id: "s6_q07",
        category: "HOUSING",
        text: "大家との敷金返還トラブル。話し合いでは解決せず、「裁判するしかない」と言われた。",
        imagePrompt: "Scene: Standoff at apartment doorway, landlord's hand holding inflated bill, tenant's hand holding smartphone showing legal rights article, keys on hook between them. Composition: Doorway frames confrontation, hands and documents central. Mood: Dispute at threshold, knowledge as leverage.",
        imagePath: "s6_q07.png",
        choices: [
            {
                text: "「民事調停」や「少額訴訟」など、裁判以外の解決手段を調べて活用する。",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。民事調停は数千円、少額訴訟は60万円以下の請求に使え、弁護士不要。第三者機関を使う知恵が、不当な要求から身を守ります。",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。「戦う方法がある」という発想自体が浮かばない状態です。"
            },
            {
                text: "裁判は面倒なので諦める。敷金は返ってこないものと割り切る。",
                effect: { CS: 0, Asset: -30, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "権利放棄です。泣き寝入りは相手の不当な行為を認めることになります。あなたの敷金は合法的に奪われました。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (HOUSING) - Move-out damage assessment rules (bigger damage, 2 skills help) [SWAPPED A↔B]
    {
        id: "s6_q08",
        category: "HOUSING",
        text: "退去時、管理会社から「壁の日焼け跡とクロスの汚れで10万円請求」と言われた。",
        imagePrompt: "Scene: an apartment wall with normal wear; aggressive property manager pointing at minor marks; tenant looking shocked at bill. Composition: normal aging vs excessive claims. Mood: exit trap, knowledge as defense.",
        imagePath: "s6_q08.png",
        choices: [
            {
                text: "「通常損耗は貸主負担」とガイドラインを根拠に反論し、明細の説明を求める。",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。原状回復ガイドラインを知っているだけで数万円〜数十万円の差。「言われるがまま」は最も損な選択です。",
                lockRequirements: null
            },
            {
                text: "「敷金から引かれるなら仕方ない」と払う。",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "無知による損失です。国土交通省のガイドラインでは、通常の使用による損耗（日焼け、家具跡等）は貸主負担。「原状回復」の意味を誤解しています。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (HOUSING) - Confront landlord vs accept [SWAPPED A↔B]
    {
        id: "s6_q09",
        category: "HOUSING",
        text: "賃貸の更新料（賃料1ヶ月分）を請求された。契約書には記載があるが、「更新料は不当」という判例もある。",
        imagePrompt: "Scene: renewal contract with fee highlighted; legal precedent documents; landlord waiting for signature. Composition: contract obligation vs legal challenge. Mood: comply vs contest.",
        imagePath: "s6_q09.png",
        choices: [
            {
                text: "更新料の減額交渉を試みる。法的にグレーな部分があることを伝える。",
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "挑戦的な選択です。交渉は決裂するリスクがありますが、更新料が減額される可能性もあります。契約上の力関係に挑む姿勢を見せました。",
                lockRequirements: { Asset: 150 },
                lockedFeedback: "LOCKED: 資産が150以上必要。契約条件に挑むには経済的余裕が必要です。"
            },
            {
                text: "契約書に書いてあるなら払うしかない。",
                effect: { CS: 10, Asset: -30, Autonomy: -10 },
                verdict: "NEUTRAL",
                feedback: "順応的な選択です。契約は守られ、大家との関係も維持されます。ただし、最高裁判例では「高額すぎる更新料は無効」とされた例もあります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "契約を守るか、挑戦するか。どちらを選びますか？"
        }
    },

    // Q10: Knowledge (HOUSING) - Rental trouble consultation
    {
        id: "s6_q10",
        category: "HOUSING",
        text: "賃貸でトラブルが起きた。管理会社が対応してくれず、大家とも連絡が取れない。自分では解決できそうにない。",
        imagePrompt: "Scene: Phone showing unanswered calls to management company, notepad with complaint timeline, consumer hotline number circled, frustrated tenant at kitchen table. Composition: Communication attempts documented, solution paths emerging. Mood: Stonewalled, but exits exist.",
        imagePath: "s6_q10.png",
        choices: [
            {
                text: "諦める。引越しを検討する。",
                effect: { CS: -10, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "泣き寝入り。費用と時間を無駄にする。公的な相談窓口を知っていれば解決の糸口が見つかる。",
                lockRequirements: null
            },
            {
                text: "各自治体の住宅相談窓口、国民生活センター(188)、法テラス(0570-078374)など、公的な相談窓口に相談する。",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。自治体の不動産相談窓口(無料)、国民生活センター(188)、法テラス(経済的余裕がなければ無料法律相談)。民事調停(数千円)や少額訴訟(60万円以下)も弁護士不要で利用可能。相談先を知っているだけで選択肢が広がる。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。トラブル時に頼れる場所を知っていますか？",
            after: "ステージ6を終了します。審査結果を算出中・・・"
        }
    }
];
