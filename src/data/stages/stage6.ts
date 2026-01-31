import type { Question } from '../../types';

export const stage6Questions: Question[] = [
    // Q1: Knowledge (HOUSING) - Rental contract basics [SWAPPED A↔B]
    {
        id: "s6_q01",
        category: "HOUSING",
        text: "初めての一人暮らし。賃貸契約で「礼金1ヶ月・仲介手数料1ヶ月」と言われた。交渉の余地は？",
        textEN: "Your first time living alone. The rental contract states 'key money: 1 month, broker fee: 1 month.' Is there room for negotiation?",
        imagePrompt: "Scene: a rental contract with multiple fee items highlighted; young tenant facing real estate agent; money flowing out. Composition: initial costs breakdown, negotiation opportunity hints. Mood: first-time vulnerability, hidden flexibility.",
        imagePath: "s6_q01.png",
        choices: [
            {
                text: "礼金の減額と仲介手数料の根拠を確認し、交渉を試みる。",
                textEN: "Ask for a reduction in key money and verify the basis for the broker fee, then negotiate.",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。礼金は慣習であり法的義務ではなく、仲介手数料は原則「貸主・借主で折半」（宅建業法46条）。知識があれば交渉できます。",
                feedbackEN: "Correct. Key money (礼金) is customary, not legally required, and broker fees are in principle split between landlord and tenant (Real Estate Brokerage Act, Article 46). Knowledge gives you negotiating power.",
                lockRequirements: null
            },
            {
                text: "「相場だから仕方ない」と全額払う。",
                textEN: "Pay the full amount, thinking 'that's just the market rate.'",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "機会損失です。礼金は交渉で減額できることが多く、仲介手数料は法的上限（賃料1ヶ月分）を超えている場合も。言い値で払うと損をします。",
                feedbackEN: "A missed opportunity. Key money can often be negotiated down, and broker fees sometimes exceed the legal cap (one month's rent). Paying the asking price without question costs you money.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ6を開始します。テーマは「契約の攻防」。賃貸、売買、交渉・・・契約は力関係で決まります。",
            introEN: "Starting Stage 6. The theme is 'Contract Battles.' Rentals, purchases, negotiations... contracts are decided by power dynamics."
        }
    },

    // Q2: Knowledge (FINANCE) - Mortgage loan comparison (smaller effect, before skills) [SWAPPED A↔B]
    {
        id: "s6_q02",
        category: "FINANCE",
        text: "住宅ローンを検討中。複数の銀行から見積もりを取ったが、金利以外に何を比較すべき？",
        textEN: "You're considering a mortgage. You've gotten quotes from multiple banks, but what should you compare besides interest rates?",
        imagePrompt: "Scene: Kitchen counter with laptop showing bank comparison website, multiple browser tabs visible, coffee mug with bank logo received as promotional gift. Composition: Laptop screen dominant, casual home research setting. Mood: DIY research, information overload.",
        imagePath: "s6_q02.png",
        choices: [
            {
                text: "金利、手数料、保証料、団信条件、繰上返済条件を総合的に比較し、総支払額で判断する。",
                textEN: "Compare interest rates, fees, guarantee charges, life insurance terms, and prepayment conditions comprehensively, then judge by total cost.",
                effect: { CS: 10, Asset: 10, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。35年ローンでは0.1%の金利差が数十万円になります。複数要素を比較し、本当の「安さ」を見極める力が必要です。",
                feedbackEN: "Correct. Over a 35-year loan, a 0.1% interest rate difference can mean hundreds of thousands of yen. You need the ability to compare multiple factors to determine the true 'cheapest' option.",
                lockRequirements: null
            },
            {
                text: "金利が一番低い銀行を選ぶ。金利がすべて。",
                textEN: "Pick the bank with the lowest interest rate. Interest rate is everything.",
                effect: { CS: -10, Asset: -30, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "視野狭窄です。事務手数料、保証料、団信保険料、繰上返済手数料・・・金利以外のコストで数十万円の差が出ます。総支払額で比較しないと損をします。",
                feedbackEN: "Tunnel vision. Processing fees, guarantee charges, life insurance premiums, prepayment penalties... costs beyond interest rates can differ by hundreds of thousands of yen. You lose money if you don't compare total payment amounts.",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (HOUSING) - Guarantor vs guarantee company [SKILL OFFER 1 AFTER] [SWAPPED A↔B]
    {
        id: "s6_q03",
        category: "HOUSING",
        text: "賃貸契約で「連帯保証人が必要」と言われた。頼める身内はいないが、保証会社を使うと費用がかかる。",
        textEN: "You're told a joint guarantor is required for your rental contract. You have no family to ask, but using a guarantee company costs money.",
        imagePrompt: "Scene: Rental application form on table, guarantor section highlighted with blank fields, phone showing estranged relative's contact, guarantee company pamphlet with fee schedule nearby. Composition: Form centered, two options at edges. Mood: Independence costs money, relationships cost more.",
        imagePath: "s6_q03.png",
        choices: [
            {
                text: "保証会社を利用する。費用はかかるが、人間関係のリスクを避けられる。",
                textEN: "Use a guarantee company. It costs money, but avoids the risk to personal relationships.",
                effect: { CS: 10, Asset: 0, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。保証会社費用（賃料の0.5〜1ヶ月分）は「人間関係保険」。金銭トラブルで親戚関係を壊すよりはるかに安い投資です。",
                feedbackEN: "Correct. The guarantee company fee (0.5-1 month's rent) is 'relationship insurance.' It's a far cheaper investment than destroying family ties over money troubles.",
                lockRequirements: null
            },
            {
                text: "保証会社は高いので、疎遠な親戚に無理を言って保証人を頼む。",
                textEN: "The guarantee company is too expensive, so ask a distant relative to be your guarantor despite the awkwardness.",
                effect: { CS: -10, Asset: 0, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "リスクの転嫁です。連帯保証人は「あなたの借金を全額肩代わりする義務」を負います。親戚関係を壊すリスクと、金銭トラブルの種を撒いています。",
                feedbackEN: "Transferring risk. A joint guarantor assumes the obligation to pay your entire debt. You're risking the relationship and sowing seeds of financial conflict.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。",
            afterEN: "Processing complete. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (HOUSING) - Fixed-term vs regular lease (定期借家) [SWAPPED A↔B]
    {
        id: "s6_q04",
        category: "HOUSING",
        text: "気に入った物件が「定期借家契約」だと説明された。「普通借家」との違いを聞かれたが、よくわからない。",
        textEN: "You're told the property you like has a 'fixed-term lease' (定期借家). You're asked about the difference from a 'standard lease,' but you're not sure.",
        imagePrompt: "Scene: Two lease contracts on real estate agent's desk, one stamped with fixed-term label and end date visible, agent's hand pointing at signature line, apartment keys waiting. Composition: Contracts fill frame, critical difference in stamps. Mood: Hidden trap in routine paperwork.",
        imagePath: "s6_q04.png",
        choices: [
            {
                text: "定期借家は「更新なし」を確認し、長期居住なら普通借家を探す。",
                textEN: "Confirm that a fixed-term lease means 'no renewal,' and look for a standard lease if planning to stay long-term.",
                effect: { CS: 10, Asset: 10, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。定期借家は家賃が安いことが多いですが、契約終了時に更新請求権がありません。転勤予定など短期なら定期借家、長期居住なら普通借家と使い分けるのが賢明です。",
                feedbackEN: "Correct. Fixed-term leases often have lower rent, but you have no right to renew when the contract ends. Use fixed-term for short stays (e.g., job transfers), and standard leases for long-term residence.",
                lockRequirements: null
            },
            {
                text: "「借家」は同じだから大差ないと思い、そのまま契約する。",
                textEN: "Assume 'a lease is a lease' with no major difference, and sign the contract as-is.",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "重大な見落としです。定期借家は「契約期間満了で終了」が原則。更新がなく、期間満了時に退去を求められます。再契約を拒否されれば引越し費用が発生します。長く住みたいなら普通借家を選ぶべきでした。",
                feedbackEN: "A critical oversight. Fixed-term leases end when the contract period expires. There's no renewal, and you can be asked to leave. If re-contracting is refused, you'll face moving costs. You should have chosen a standard lease for long-term living.",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (HOUSING) - Rental AC: equipment vs leftover
    {
        id: "s6_q05",
        category: "HOUSING",
        text: "入居直後にエアコンが故障した。管理会社に連絡したら「それは残置物なので自己負担です」と言われた。",
        textEN: "Right after moving in, the air conditioner broke. The management company says 'that's a leftover item from the previous tenant, so it's your responsibility.'",
        imagePrompt: "Scene: Broken air conditioner dripping water, lease agreement open on table with equipment list highlighted, phone showing management company contact, repair estimate on screen. Composition: Broken AC dominant, contract as reference. Mood: Unexpected cost, contract knowledge as defense.",
        imagePath: "s6_q05.png",
        choices: [
            {
                text: "仕方ない。自費で修理する。",
                textEN: "Accept it and pay for repairs yourself.",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "確認不足。契約書の「付帯設備」欄を確認すべき。「設備」として記載されていれば経年劣化の修理は大家負担。「残置物」(前入居者の残り)なら借主負担。入居前の確認と動作チェックが重要。",
                feedbackEN: "Insufficient verification. Check the 'included equipment' section of your contract. If listed as 'equipment,' the landlord covers age-related repairs. If it's a 'leftover item' (残置物) from the previous tenant, it's on you. Pre-move-in checks and testing are essential.",
                lockRequirements: null
            },
            {
                text: "契約書の設備一覧を確認。「設備」なら大家負担、「残置物」なら自己負担。まず契約書を根拠に管理会社と交渉。",
                textEN: "Check the equipment list in the contract. If it's 'equipment,' the landlord pays; if it's a 'leftover item,' you pay. Negotiate with the management company using the contract as evidence.",
                effect: { CS: 10, Asset: 20, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解。2020年民法改正で、設備の場合は一定期間対応がなければ自分で修理し費用請求も可能に。フィルター掃除の怠慢や入居者の過失は自己負担。入居時に設備の動作確認と写真記録を忘れずに。",
                feedbackEN: "Correct. Under the 2020 Civil Code revision, if it's classified as equipment and the landlord fails to act within a reasonable period, you can repair it yourself and bill them. Neglecting filter cleaning or tenant negligence is your responsibility. Always test equipment and take photos at move-in.",
                lockRequirements: null
            }
        ]
    },

    // Q6: Knowledge (HOUSING) - Home purchase hidden costs [SWAPPED A↔B]
    {
        id: "s6_q06",
        category: "HOUSING",
        text: "3,000万円の中古マンションを購入予定。「頭金300万円があれば買える」と思っているが・・・",
        textEN: "Planning to buy a 30-million-yen used apartment. You think 'I can buy it with a 3-million-yen down payment,' but...",
        imagePrompt: "Scene: a home purchase calculation; visible price tag vs hidden costs (taxes, fees, renovation); iceberg metaphor. Composition: surface price vs total cost. Mood: hidden expense revelation.",
        imagePath: "s6_q06.png",
        choices: [
            {
                text: "諸費用（物件価格の5〜10%）を含めた総予算を計算し、資金計画を立て直す。",
                textEN: "Calculate the total budget including closing costs (5-10% of property price) and revise the financial plan.",
                effect: { CS: 10, Asset: 20, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。「買える」と「払える」は違います。諸費用、引越し費用、家具購入、緊急予備費まで含めた計画が必要です。",
                feedbackEN: "Correct. 'Can buy' and 'can afford' are different. You need a plan that includes closing costs, moving expenses, furniture, and an emergency fund.",
                lockRequirements: null
            },
            {
                text: "頭金300万円を用意し、残りはローンで問題ない。",
                textEN: "Prepare 3 million yen for the down payment; the rest can be covered by a mortgage.",
                effect: { CS: -20, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "見積もり不足です。諸費用（登記、仲介手数料、税金等）は物件価格の5〜10%（150〜300万円）。頭金だけでは足りず、追加で借入が必要になります。",
                feedbackEN: "Underestimated. Closing costs (registration, broker fees, taxes, etc.) run 5-10% of the property price (1.5-3 million yen). The down payment alone won't cover it, and you'll need additional borrowing.",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (HOUSING) - Using third-party mediation [SWAPPED A↔B]
    {
        id: "s6_q07",
        category: "HOUSING",
        text: "大家との敷金返還トラブル。話し合いでは解決せず、「裁判するしかない」と言われた。",
        textEN: "A dispute with the landlord over your security deposit return. Negotiation failed, and you're told 'the only option is to go to court.'",
        imagePrompt: "Scene: Standoff at apartment doorway, landlord's hand holding inflated bill, tenant's hand holding smartphone showing legal rights article, keys on hook between them. Composition: Doorway frames confrontation, hands and documents central. Mood: Dispute at threshold, knowledge as leverage.",
        imagePath: "s6_q07.png",
        choices: [
            {
                text: "「民事調停」や「少額訴訟」など、裁判以外の解決手段を調べて活用する。",
                textEN: "Research and use alternative dispute resolution methods like civil mediation (民事調停) or small claims court (少額訴訟).",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。民事調停は数千円、少額訴訟は60万円以下の請求に使え、弁護士不要。第三者機関を使う知恵が、不当な要求から身を守ります。",
                feedbackEN: "Correct. Civil mediation costs just a few thousand yen, and small claims court handles claims up to 600,000 yen without needing a lawyer. Knowing how to use third-party institutions protects you from unfair demands.",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。「戦う方法がある」という発想自体が浮かばない状態です。",
                lockedFeedbackEN: "LOCKED: Autonomy of 150 or higher required. You can't even conceive the idea that 'there are ways to fight back.'"
            },
            {
                text: "裁判は面倒なので諦める。敷金は返ってこないものと割り切る。",
                textEN: "Going to court is too much hassle. Accept that the security deposit won't be returned.",
                effect: { CS: 0, Asset: -30, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "権利放棄です。泣き寝入りは相手の不当な行為を認めることになります。あなたの敷金は合法的に奪われました。",
                feedbackEN: "Surrendering your rights. Giving in validates the other party's unfair behavior. Your security deposit was legally taken from you.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            introEN: "A critical branching point. Recording your response.",
            after: "データを記録しました。スキル選択に進みます。",
            afterEN: "Data recorded. Proceeding to skill selection."
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (HOUSING) - Move-out damage assessment rules (bigger damage, 2 skills help) [SWAPPED A↔B]
    {
        id: "s6_q08",
        category: "HOUSING",
        text: "退去時、管理会社から「壁の日焼け跡とクロスの汚れで10万円請求」と言われた。",
        textEN: "At move-out, the management company says 'we're charging 100,000 yen for sun damage on the walls and stains on the wallpaper.'",
        imagePrompt: "Scene: an apartment wall with normal wear; aggressive property manager pointing at minor marks; tenant looking shocked at bill. Composition: normal aging vs excessive claims. Mood: exit trap, knowledge as defense.",
        imagePath: "s6_q08.png",
        choices: [
            {
                text: "「通常損耗は貸主負担」とガイドラインを根拠に反論し、明細の説明を求める。",
                textEN: "Counter by citing the guideline that 'normal wear and tear is the landlord's responsibility,' and request a detailed breakdown.",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。原状回復ガイドラインを知っているだけで数万円〜数十万円の差。「言われるがまま」は最も損な選択です。",
                feedbackEN: "Correct. Just knowing the restoration guidelines can save you tens of thousands to hundreds of thousands of yen. Accepting whatever you're told is the worst choice.",
                lockRequirements: null
            },
            {
                text: "「敷金から引かれるなら仕方ない」と払う。",
                textEN: "Pay up, thinking 'if it comes from the deposit, there's nothing I can do.'",
                effect: { CS: 0, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "無知による損失です。国土交通省のガイドラインでは、通常の使用による損耗（日焼け、家具跡等）は貸主負担。「原状回復」の意味を誤解しています。",
                feedbackEN: "A loss due to ignorance. According to MLIT guidelines, normal wear and tear (sun damage, furniture marks, etc.) is the landlord's responsibility. You're misunderstanding what 'restoration to original condition' means.",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (HOUSING) - Confront landlord vs accept [SWAPPED A↔B]
    {
        id: "s6_q09",
        category: "HOUSING",
        text: "賃貸の更新料（賃料1ヶ月分）を請求された。契約書には記載があるが、「更新料は不当」という判例もある。",
        textEN: "You're charged a lease renewal fee (one month's rent). It's in the contract, but there are court precedents ruling renewal fees 'unjust.'",
        imagePrompt: "Scene: renewal contract with fee highlighted; legal precedent documents; landlord waiting for signature. Composition: contract obligation vs legal challenge. Mood: comply vs contest.",
        imagePath: "s6_q09.png",
        choices: [
            {
                text: "更新料の減額交渉を試みる。法的にグレーな部分があることを伝える。",
                textEN: "Attempt to negotiate the renewal fee down, pointing out that it's legally ambiguous.",
                effect: { CS: -10, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "挑戦的な選択です。交渉は決裂するリスクがありますが、更新料が減額される可能性もあります。契約上の力関係に挑む姿勢を見せました。",
                feedbackEN: "A bold choice. Negotiation risks breaking down, but the renewal fee might be reduced. You've shown willingness to challenge the contractual power dynamic.",
                lockRequirements: { Asset: 150 },
                lockedFeedback: "LOCKED: 資産が150以上必要。契約条件に挑むには経済的余裕が必要です。",
                lockedFeedbackEN: "LOCKED: Asset of 150 or higher required. You need financial stability to challenge contract terms."
            },
            {
                text: "契約書に書いてあるなら払うしかない。",
                textEN: "If it's written in the contract, you have no choice but to pay.",
                effect: { CS: 10, Asset: -30, Autonomy: -10 },
                verdict: "NEUTRAL",
                feedback: "順応的な選択です。契約は守られ、大家との関係も維持されます。ただし、最高裁判例では「高額すぎる更新料は無効」とされた例もあります。",
                feedbackEN: "A compliant choice. The contract is honored and the landlord relationship preserved. However, the Supreme Court has ruled that 'excessively high renewal fees are invalid' in some cases.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "契約を守るか、挑戦するか。どちらを選びますか？",
            introEN: "Honor the contract, or challenge it. Which do you choose?"
        }
    },

    // Q10: Knowledge (HOUSING) - Rental trouble consultation
    {
        id: "s6_q10",
        category: "HOUSING",
        text: "賃貸でトラブルが起きた。管理会社が対応してくれず、大家とも連絡が取れない。自分では解決できそうにない。",
        textEN: "A problem arose with your rental. The management company won't respond, and you can't reach the landlord. You can't resolve it on your own.",
        imagePrompt: "Scene: Phone showing unanswered calls to management company, notepad with complaint timeline, consumer hotline number circled, frustrated tenant at kitchen table. Composition: Communication attempts documented, solution paths emerging. Mood: Stonewalled, but exits exist.",
        imagePath: "s6_q10.png",
        choices: [
            {
                text: "諦める。引越しを検討する。",
                textEN: "Give up and consider moving out.",
                effect: { CS: -10, Asset: -30, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "泣き寝入り。費用と時間を無駄にする。公的な相談窓口を知っていれば解決の糸口が見つかる。",
                feedbackEN: "Giving in. A waste of money and time. Knowing about public consultation services could have led to a solution.",
                lockRequirements: null
            },
            {
                text: "各自治体の住宅相談窓口、国民生活センター(188)、法テラス(0570-078374)など、公的な相談窓口に相談する。",
                textEN: "Consult public services: your local government's housing consultation desk, the National Consumer Affairs Center (188), Legal Support Center (法テラス, 0570-078374), etc.",
                effect: { CS: 10, Asset: 20, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解。自治体の不動産相談窓口(無料)、国民生活センター(188)、法テラス(経済的余裕がなければ無料法律相談)。民事調停(数千円)や少額訴訟(60万円以下)も弁護士不要で利用可能です。",
                feedbackEN: "Correct. Municipal real estate consultation desks (free), the National Consumer Affairs Center (188), and Legal Support Center (free legal advice if financially constrained). Civil mediation (a few thousand yen) and small claims court (up to 600,000 yen) don't require a lawyer.",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。トラブル時に頼れる場所を知っていますか？",
            introEN: "Final question. Do you know where to turn when trouble arises?",
            after: "ステージ6を終了します。審査結果を算出中・・・",
            afterEN: "Stage 6 complete. Calculating assessment results..."
        }
    }
];
