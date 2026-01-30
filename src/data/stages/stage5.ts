import type { Question } from '../../types';

export const stage5Questions: Question[] = [
    // Q1: Knowledge (HEALTH) - High-cost medical expense system (高額療養費)
    {
        id: "s5_q01",
        category: "HEALTH",
        text: "入院手術で医療費が100万円かかると言われた。貯金は50万円しかない。どうする？",
        imagePrompt: "Scene: a hospital bill showing 1 million yen; a worried patient; a glowing public insurance card with 'high-cost medical expense system' hint. Composition: despair transforming to hope through knowledge. Mood: crisis, hidden safety net.",
        imagePath: "s5_q01.png",
        choices: [
            {
                text: "貯金を全て使い、足りない分は借金するしかない。",
                effect: { CS: -30, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "無知による損失です。高額療養費制度により、一般所得者の自己負担上限は月約8〜9万円。100万円払う必要はありません。制度を知らないと、不要な借金を背負います。",
                lockRequirements: null
            },
            {
                text: "「高額療養費制度」を使い、自己負担を上限額に抑える。事前に限度額適用認定証を取得。",
                effect: { CS: 15, Asset: 30, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。公的制度を知っているだけで数十万円の差。限度額適用認定証があれば、窓口での支払いも上限額で済みます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "ステージ5を開始します。テーマは「社会保障の羅針盤」。病気、失業、出産・・・公的制度を知らないと詰みます。"
        }
    },

    // Q2: Knowledge (HEALTH) - Injury/illness benefit (傷病手当金)
    {
        id: "s5_q02",
        category: "HEALTH",
        text: "病気で3ヶ月休職することになった。会社員で健康保険に加入中。収入はどうなる？",
        imagePrompt: "Scene: a person in hospital bed looking worried about bills; paycheck being cut; health insurance card glowing with hidden benefit. Composition: income loss fear vs safety net discovery. Mood: vulnerability, system support.",
        imagePath: "s5_q02.png",
        choices: [
            {
                text: "休職したら給料ゼロ。貯金を切り崩すしかない。",
                effect: { CS: -20, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "制度の見落としです。健康保険の傷病手当金は、給与の約2/3を最長1年6ヶ月支給。申請しないと受け取れませんが、知っていれば収入を確保できます。",
                lockRequirements: null
            },
            {
                text: "傷病手当金を申請する。給与の約2/3が最長1年6ヶ月支給される。",
                effect: { CS: 15, Asset: 40, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。会社員の特権である健康保険の傷病手当金。申請主義なので、自分から動かないと受け取れません。退職後も継続受給可能(退職日に労務不能+1年以上の被保険者期間が条件)。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (LABOR) - Education and training benefits (simpler cost, before skills) [SKILL OFFER 1 AFTER] [SWAPPED A↔B]
    {
        id: "s5_q03",
        category: "LABOR",
        text: "スキルアップのため資格学校に通いたいが、費用が50万円かかる。会社員で雇用保険に加入中。",
        imagePrompt: "Scene: a professional school brochure with price tag; employment insurance card glowing; subsidy calculation showing 70% coverage. Composition: expensive education with hidden support. Mood: career investment, government support discovery.",
        imagePath: "s5_q03.png",
        choices: [
            {
                text: "教育訓練給付金の対象講座か確認し、給付金を申請して受講する。",
                effect: { CS: 20, Asset: -30, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解です。雇用保険加入1年以上（初回）で利用可能。一般は20%、特定一般は40%、専門実践は最大70%給付。ハローワークで事前に相談すれば、対象講座と手続きがわかります。",
                lockRequirements: null
            },
            {
                text: "まずは独学や無料の教材で学び、必要なら有料講座を検討する。",
                effect: { CS: 0, Asset: 0, Autonomy: 10 },
                verdict: "NEUTRAL",
                feedback: "独学も立派な選択。無料のオンライン教材やコミュニティも充実しています。ただし、教育訓練給付金(最大70%給付)という制度の存在は知っておくべき。使うかどうかは状況次第だが、「知らなかった」で機会を逃すのはもったいない。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (HEALTH) - Maternity/paternity leave benefits (simpler, 1 skill) [SWAPPED A↔B]
    {
        id: "s5_q04",
        category: "HEALTH",
        text: "育児休業を取りたいが、「給料が出ないなら取れない」と思っている。",
        imagePrompt: "Scene: new parent with baby looking at finances; employment insurance document showing 67% wage replacement. Composition: misconception vs reality. Mood: worry transforming to possibility.",
        imagePath: "s5_q04.png",
        choices: [
            {
                text: "育児休業給付金（67%→50%）を確認し、生活設計に組み込んで育休を取得する。",
                effect: { CS: 15, Asset: 30, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。社会保険料も免除されるため、実質的な手取り差は縮まります。制度を理解すれば、育児と仕事の両立が可能になります。",
                lockRequirements: null
            },
            {
                text: "給料が出ないなら育休は取れない。すぐ復帰するしかない。",
                effect: { CS: 10, Asset: 0, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "制度の誤解です。育児休業給付金は、最初の6ヶ月は給与の67%、以降50%が雇用保険から支給されます。「無収入」ではありません。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Knowledge (HEALTH) - Proper response to infectious disease
    {
        id: "s5_q05",
        category: "HEALTH",
        text: "インフルエンザと診断された。明日は重要な会議。どうする?",
        imagePrompt: "Scene: Thermometer showing fever, phone showing calendar with important meeting marked, flu medication on nightstand, mask hanging on door handle. Composition: Sick room with work pressure visible through phone. Mood: Duty vs responsibility to others.",
        imagePath: "s5_q05.png",
        choices: [
            {
                text: "テレワークか欠席を提案し、回復に専念する。上司に状況を説明して会議の代理を依頼する。",
                effect: { CS: 15, Asset: 0, Autonomy: 5 },
                verdict: "APPROVED",
                feedback: "正解。インフルエンザは発症後5日かつ解熱後2日の出席停止が目安(学校保健安全法準拠、企業も多くが準用)。テレワークで体調が許す範囲の対応は合理的。同僚への感染防止が社会人としての責任。",
                lockRequirements: null
            },
            {
                text: "同僚にインフルエンザのことは黙って出社する。マスクをすれば大丈夫。",
                effect: { CS: -30, Asset: 0, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "最悪の選択。職場全体に感染が広がり、プロジェクト全体が停止するリスク。感染症を隠して出社するのは「頑張り」ではなく「迷惑」。報告と休養が社会人の義務。",
                lockRequirements: null
            }
        ]
    },

    // Q6: Knowledge (LABOR) - Unemployment insurance (medium damage, 1 skill helps) [SWAPPED A↔B]
    {
        id: "s5_q06",
        category: "LABOR",
        text: "会社を辞めた。ハローワークで「失業保険」の手続きを聞かれた。自己都合退職だと不利？",
        imagePrompt: "Scene: Unemployment office waiting room ticket in hand, number display showing current serving, application forms on clipboard, other job seekers visible as silhouettes. Composition: Ticket number close-up, waiting room atmosphere. Mood: Bureaucratic limbo, transition state.",
        imagePath: "s5_q06.png",
        choices: [
            {
                text: "申請する。自己都合でも給付制限期間後に受給できる。待機中は就職活動を進める。",
                effect: { CS: 15, Asset: 30, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。自己都合退職の給付制限は原則2ヶ月(5年以内に2回まで、3回目以降は3ヶ月)。制限期間は転職準備に充て、制限明けから受給。早期再就職なら「再就職手当」(残日数の60〜70%)も。制度を理解して計画的に動くことが大切です。",
                lockRequirements: null
            },
            {
                text: "自己都合だと失業保険はもらえないと思い、申請しない。",
                effect: { CS: -20, Asset: 0, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "大損です。自己都合退職でも一定期間後に受給可能。申請しないのは権利の放棄です。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (HEALTH) - Accessing mental health support
    {
        id: "s5_q07",
        category: "HEALTH",
        text: "最近、眠れない日が続き、仕事に集中できない。「自分は弱いだけ」と思っているが・・・",
        imagePrompt: "Scene: Dark bedroom at 3 AM, phone screen illuminating the space showing mental health clinic search results, untouched sleeping pills on nightstand, rumpled sheets. Composition: Phone glow is only light source, isolation palpable. Mood: Exhaustion, small step toward help.",
        imagePath: "s5_q07.png",
        choices: [
            {
                text: "気合で乗り切る。病院に行くほどではない。",
                effect: { CS: 0, Asset: 0, Autonomy: -40 },
                verdict: "WARNING",
                feedback: "危険な思考です。メンタルヘルスの問題を放置すると、悪化して長期休職に追い込まれます。「まだ大丈夫」は「もう限界」のサインかもしれません。",
                lockRequirements: null
            },
            {
                text: "心療内科を予約する。早期受診が重症化を防ぐ。",
                effect: { CS: 10, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。メンタルヘルスケアは「弱さ」ではなく「自己管理能力」。自立支援医療制度を使えば、医療費負担も軽減できます。",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。「助けを求める」という発想自体が浮かばない状態です。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (HEALTH) - Childbirth lump sum payment (biggest damage, 2 skills help)
    {
        id: "s5_q08",
        category: "HEALTH",
        text: "妊娠が発覚。出産費用は約50万円と聞いた。どう準備すべき？",
        imagePrompt: "Scene: expecting couple looking at hospital bills; a health insurance document showing '500,000 yen benefit' glowing. Composition: financial worry transforming to relief. Mood: life milestone, public support.",
        imagePath: "s5_q08.png",
        choices: [
            {
                text: "50万円を貯めるか、借りるしかない。",
                effect: { CS: -10, Asset: -30, Autonomy: -20 },
                verdict: "WARNING",
                feedback: "制度の見落としです。出産育児一時金（50万円）が健康保険から支給されます。直接支払制度を使えば、窓口負担はほぼゼロにできます。知らなかったために50万円を自己負担しました。",
                lockRequirements: null
            },
            {
                text: "出産育児一時金（50万円）の直接支払制度を使い、自己負担を最小化する。",
                effect: { CS: 15, Asset: 50, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。出産は「病気ではない」ため保険適用外ですが、一時金で実質カバーされます。制度を知れば、出産のハードルは下がります。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (HEALTH) - Apply for welfare vs pride
    {
        id: "s5_q09",
        category: "HEALTH",
        text: "失業が長引き、貯金も底をついた。生活保護の申請を勧められたが、「恥ずかしい」と感じる。",
        imagePrompt: "Scene: Open refrigerator showing nearly empty shelves, stack of unpaid utility bills on counter, welfare application form partially visible, last few coins in open wallet. Composition: Empty fridge dominates, desperation visible in details. Mood: Rock bottom, pride vs survival.",
        imagePath: "s5_q09.png",
        choices: [
            {
                text: "生活保護は最後の手段。親戚に頭を下げて借金する。",
                effect: { CS: -20, Asset: 20, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "プライドを守る選択です。しかし、借金は返済義務が発生し、親戚関係も複雑になります。「援助」ではなく「負債」を選びました。",
                lockRequirements: null
            },
            {
                text: "生活保護を申請する。困窮時の公的支援は権利であり、恥ではない。",
                effect: { CS: 0, Asset: 30, Autonomy: 0 },
                verdict: "NEUTRAL",
                feedback: "合理的な選択です。生活保護は「税金で生きる」のではなく「再起するための一時的支援」。制度を使って立て直すことは、自立への第一歩です。",
                lockRequirements: { Autonomy: 150 },
                lockedFeedback: "LOCKED: 自律性が150以上必要。「恥ずかしい」という感情に支配され、権利を行使する自律性がありません。"
            }
        ],
        adamDialogue: {
            intro: "プライドと生存、どちらを選びますか？"
        }
    },

    // Q10: Philosophy (HEALTH) - 退職後の健康保険選択
    {
        id: "s5_q10",
        category: "HEALTH",
        text: "退職して無職になった。健康保険の選択肢は「任意継続（2年限定、保険料は退職時の約2倍）」か「国民健康保険（前年所得ベース、減免制度あり）」。どちらを選ぶべきか？",
        imagePrompt: "Scene: Kitchen table with two insurance documents side by side, calculator showing different premium amounts, calendar marking 20-day deadline, coffee cup half empty. Composition: Documents dominate, numbers visible on both. Mood: Critical decision window, money at stake.",
        imagePath: "s5_q10.png",
        choices: [
            {
                text: "任意継続を選ぶ。退職前と同じ保険証が使え、扶養家族がいれば追加保険料なしでカバーできる。",
                effect: { CS: 10, Asset: -30, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "継続性を重視した回答です。任意継続は最大2年間、会社負担分も自己負担になるため保険料は約2倍。扶養家族ありなら任意継続有利(追加保険料なし)。退職後20日以内に手続き必須。",
                lockRequirements: null
            },
            {
                text: "国民健康保険を選ぶ。失業中なら減免申請で保険料が下がる可能性がある。",
                effect: { CS: 10, Asset: -20, Autonomy: 10 },
                verdict: "NEUTRAL",
                feedback: "状況に応じた回答です。単身+前年収入低なら国保減免有利。国保には「扶養」がなく家族分の保険料が発生するが、失業減免を使えば大幅に安くなることも。退職後20日以内に任意継続の手続き期限あり。両方を試算して比較すれば、年間数十万円の差が出ます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。「知っているか」だけで数十万円の差がつく領域があります。",
            after: "ステージ5を終了します。審査結果を算出中・・・"
        }
    }
];
