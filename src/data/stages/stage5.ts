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
                effect: { CS: -20, Asset: -50000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "無知による損失です。高額療養費制度により、一般所得者の自己負担上限は月約8〜9万円。100万円払う必要はありません。制度を知らないと、不要な借金を背負います。",
                lockRequirements: null
            },
            {
                text: "「高額療養費制度」を使い、自己負担を上限額に抑える。事前に限度額適用認定証を取得。",
                effect: { CS: 10, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。公的制度を知っているだけで数十万円の差。限度額適用認定証があれば、窓口での支払いも上限額で済みます。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "Stage 5を開始します。テーマは『社会保障の羅針盤』。病気、失業、出産……公的制度を知らないと詰みます。"
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
                effect: { CS: -15, Asset: -30000, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "制度の見落としです。健康保険の傷病手当金は、給与の約2/3を最長1年6ヶ月支給。申請しないと受け取れませんが、知っていれば収入を確保できます。",
                lockRequirements: null
            },
            {
                text: "傷病手当金を申請する。給与の約2/3が最長1年6ヶ月支給される。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。会社員の特権である健康保険の傷病手当金。申請主義なので、自分から動かないと受け取れません。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (LABOR) - Education and training benefits (simpler cost, before skills) [SKILL OFFER 1 AFTER]
    {
        id: "s5_q03",
        category: "LABOR",
        text: "スキルアップのため資格学校に通いたいが、費用が50万円かかる。会社員で雇用保険に加入中。",
        imagePrompt: "Scene: a professional school brochure with price tag; employment insurance card glowing; subsidy calculation showing 70% coverage. Composition: expensive education with hidden support. Mood: career investment, government support discovery.",
        imagePath: "s5_q03.png",
        choices: [
            {
                text: "50万円は高すぎる。諦めて独学でやる。",
                effect: { CS: -10, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "機会損失です。教育訓練給付金を使えば、受講費用の最大70%（専門実践教育訓練）が支給されます。50万円のコースが実質15万円に。制度を知らないと、キャリアアップの機会を逃します。",
                lockRequirements: null
            },
            {
                text: "教育訓練給付金の対象講座か確認し、給付金を申請して受講する。",
                effect: { CS: 10, Asset: -150000, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。雇用保険加入1年以上（初回）で利用可能。一般は20%、特定一般は40%、専門実践は最大70%給付。ハローワークで事前に相談すれば、対象講座と手続きがわかります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (HEALTH) - Maternity/paternity leave benefits (simpler, 1 skill)
    {
        id: "s5_q04",
        category: "HEALTH",
        text: "育児休業を取りたいが、「給料が出ないなら取れない」と思っている。",
        imagePrompt: "Scene: new parent with baby looking at finances; employment insurance document showing 67% wage replacement. Composition: misconception vs reality. Mood: worry transforming to possibility.",
        imagePath: "s5_q04.png",
        choices: [
            {
                text: "給料が出ないなら育休は取れない。すぐ復帰するしかない。",
                effect: { CS: -10, Asset: 0, Autonomy: -15 },
                verdict: "WARNING",
                feedback: "制度の誤解です。育児休業給付金は、最初の6ヶ月は給与の67%、以降50%が雇用保険から支給されます。「無収入」ではありません。",
                lockRequirements: null
            },
            {
                text: "育児休業給付金（67%→50%）を確認し、生活設計に組み込んで育休を取得する。",
                effect: { CS: 10, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。社会保険料も免除されるため、実質的な手取り差は縮まります。制度を理解すれば、育児と仕事の両立が可能になります。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Dilemma (HEALTH) - Sick leave vs critical deadline
    {
        id: "s5_q05",
        category: "HEALTH",
        text: "体調不良で病院へ。医師から「過労による免疫低下。1週間の安静が必要」と言われた。しかし今週は昇進がかかったプロジェクトの締切がある。",
        imagePrompt: "Scene: exhausted worker with doctor's note; calendar showing deadline; promotion document floating. Composition: health vs career crossroads. Mood: difficult trade-off, no easy answer.",
        imagePath: "s5_q05.png",
        choices: [
            {
                text: "無理をしてでも出勤する。このチャンスを逃せば昇進は数年遅れる。",
                effect: { CS: 10, Asset: 10000, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "キャリア優先の選択です。締切を守れば昇進に近づきますが、体を壊せば長期休職のリスクも。「今回だけ」が習慣化すると、燃え尽きへの道を歩むことになります。",
                lockRequirements: null
            },
            {
                text: "休む。健康を失えばキャリアも終わる。上司に状況を説明し、締切延長を交渉する。",
                effect: { CS: -10, Asset: -5000, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "健康優先の選択です。締切に間に合わなければ評価に影響しますが、長期的な働く力を守りました。ただし「休むべき時に休める職場か」という問いも残ります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "キャリアと健康、どちらを犠牲にしますか？"
        }
    },

    // Q6: Knowledge (LABOR) - Unemployment insurance (medium damage, 1 skill helps)
    {
        id: "s5_q06",
        category: "LABOR",
        text: "会社を辞めた。ハローワークで「失業保険」の手続きを聞かれた。自己都合退職だと不利？",
        imagePrompt: "Scene: a job seeker at unemployment office; two paths showing resignation vs layoff; waiting period calendar. Composition: bureaucratic process with timing implications. Mood: transition, system navigation.",
        imagePath: "s5_q06.png",
        choices: [
            {
                text: "自己都合だと失業保険はもらえないと思い、申請しない。",
                effect: { CS: -20, Asset: -50000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "大損です。自己都合退職でも給付制限（2〜3ヶ月待機）後に受給可能。申請しないのは権利の放棄です。",
                lockRequirements: null
            },
            {
                text: "申請する。自己都合でも給付制限期間後に受給できる。待機中は就職活動を進める。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。給付制限期間は転職準備に充て、制限明けから受給。制度を理解して計画的に動くことが大切です。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (HEALTH) - Accessing mental health support
    {
        id: "s5_q07",
        category: "HEALTH",
        text: "最近、眠れない日が続き、仕事に集中できない。「自分は弱いだけ」と思っているが……",
        imagePrompt: "Scene: a person sitting alone in dark room; one path shows struggling alone; other shows mental health clinic with warm light. Composition: isolation vs seeking help. Mood: stigma vs self-care.",
        imagePath: "s5_q07.png",
        choices: [
            {
                text: "気合で乗り切る。病院に行くほどではない。",
                effect: { CS: 0, Asset: 0, Autonomy: -30 },
                verdict: "WARNING",
                feedback: "危険な思考です。メンタルヘルスの問題を放置すると、悪化して長期休職に追い込まれます。「まだ大丈夫」は「もう限界」のサインかもしれません。",
                lockRequirements: null
            },
            {
                text: "心療内科を予約する。早期受診が重症化を防ぐ。",
                effect: { CS: 10, Asset: -5000, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。メンタルヘルスケアは「弱さ」ではなく「自己管理能力」。自立支援医療制度を使えば、医療費負担も軽減できます。",
                lockRequirements: { Autonomy: 80 },
                lockedFeedback: "LOCKED: 自律性が80以上必要。「助けを求める」という発想自体が浮かばない状態です。"
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
                effect: { CS: -10, Asset: -500000, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "制度の見落としです。出産育児一時金（50万円）が健康保険から支給されます。直接支払制度を使えば、窓口負担はほぼゼロにできます。知らなかったために50万円を自己負担しました。",
                lockRequirements: null
            },
            {
                text: "出産育児一時金（50万円）の直接支払制度を使い、自己負担を最小化する。",
                effect: { CS: 10, Asset: 0, Autonomy: 10 },
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
        imagePrompt: "Scene: an empty refrigerator and unpaid bills; welfare office entrance; internal struggle between need and pride. Composition: desperation vs stigma. Mood: survival vs dignity trade-off.",
        imagePath: "s5_q09.png",
        choices: [
            {
                text: "生活保護は最後の手段。親戚に頭を下げて借金する。",
                effect: { CS: 5, Asset: 30000, Autonomy: -20 },
                verdict: "NEUTRAL",
                feedback: "プライドを守る選択です。しかし、借金は返済義務が発生し、親戚関係も複雑になります。「援助」ではなく「負債」を選びました。",
                lockRequirements: null
            },
            {
                text: "生活保護を申請する。困窮時の公的支援は権利であり、恥ではない。",
                effect: { CS: -10, Asset: 0, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "合理的な選択です。生活保護は「税金で生きる」のではなく「再起するための一時的支援」。制度を使って立て直すことは、自立への第一歩です。",
                lockRequirements: { Autonomy: 70 },
                lockedFeedback: "LOCKED: 自律性が70以上必要。プライドが邪魔をして、「助けを求める」選択肢が見えません。"
            }
        ],
        adamDialogue: {
            intro: "プライドと生存、どちらを選びますか？"
        }
    },

    // Q10: Philosophy (HEALTH) - Dependency vs self-reliance [CRISIS NARRATIVE + ASSET COST]
    {
        id: "s5_q10",
        category: "HEALTH",
        text: "失業中、生活保護の申請書を前にしている。これは権利か、施しか、敗北か。その瞬間、『社会保障』の本質が見えた。",
        imagePrompt: "Scene: protagonist at welfare office, application form in hand; one path shows pride preserved but struggling; other shows assistance accepted. Composition: moment of decision at institutional threshold. Mood: crisis crossroads, dignity vs survival.",
        imagePath: "s5_q10.png",
        choices: [
            {
                text: "申請しない。自力で何とかする。自立こそが人間の尊厳。",
                effect: { CS: 10, Asset: -10000, Autonomy: -5 },
                verdict: "NEUTRAL",
                feedback: "自尊心優先の回答です。自力で乗り越えようとしますが、収入がない期間の生活費を切り詰めるため、資産が減ります。限界を超えると回復不能なダメージを負います。",
                lockRequirements: null
            },
            {
                text: "申請する。社会保障は「施し」ではなく、再起のための橋。",
                effect: { CS: 5, Asset: 5000, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "合理的回答です。生活保護を受けることで、当面の生活費が確保され、再就職活動に集中できます。制度を使うことは権利の行使です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。危機の瞬間に、あなたはどう動きますか？",
            after: "Stage 5を終了します。審査結果を算出中..."
        }
    }
];
