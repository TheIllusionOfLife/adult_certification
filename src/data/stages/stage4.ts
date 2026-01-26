import type { Question } from '../../types';

export const stage4Questions: Question[] = [
    // Q1: Knowledge (ADMIN) - Moving procedures (14-day rule)
    {
        id: "s4_q01",
        category: "ADMIN",
        text: "引越し後の手続き。住民票、マイナンバーカード、運転免許証、銀行……全部やる必要がある？",
        imagePrompt: "Scene: a maze of government buildings with different counters; a checklist floating with many items; confused citizen holding moving boxes. Composition: bureaucratic labyrinth with multiple paths. Mood: overwhelm, procedural complexity.",
        imagePath: "s4_q01.png",
        choices: [
            {
                text: "面倒なので住民票だけ移して、他は後回し。",
                effect: { CS: -20, Asset: -10000, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "手続き漏れです。運転免許証の住所変更を怠ると身分証明として使えなくなり、銀行手続きが滞ります。後回しにするほど問題が複雑化します。",
                lockRequirements: null
            },
            {
                text: "チェックリストを作り、住民票→マイナンバー→免許→銀行の順で一気に処理する。",
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。住民票を先に移すと、他の手続きがスムーズに進みます。行政手続きには「正しい順序」があります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "Stage 4を開始します。テーマは『行政の迷宮』。書類、期限、窓口……官僚制の攻略法を試します。"
        }
    },

    // Q2: Knowledge (ADMIN) - MyNumber card benefits
    {
        id: "s4_q02",
        category: "ADMIN",
        text: "マイナンバーカードを作るべきか迷っている。「面倒だし、なくても困らない」と思っているが……",
        imagePrompt: "Scene: a MyNumber card glowing with various services connected (tax filing, health insurance, ID); alternative showing long queues at different offices. Composition: convenience vs inconvenience comparison. Mood: modern efficiency, integration benefits.",
        imagePath: "s4_q02.png",
        choices: [
            {
                text: "作らない。通知カードで十分。",
                effect: { CS: -10, Asset: -5000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "機会損失です。確定申告のオンライン完結、コンビニでの住民票取得、健康保険証としての利用……カードがないと「窓口に並ぶ時間」が増え続けます。",
                lockRequirements: null
            },
            {
                text: "作る。行政サービスのオンライン化が進む中、持っていないと不利になる。",
                effect: { CS: 15, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。今後、マイナンバーカードは「社会インフラ」になります。早めに作っておくと、手続きコストが大幅に下がります。",
                lockRequirements: null
            }
        ]
    },

    // Q3: Knowledge (ADMIN) - Marriage registration requirements [SKILL OFFER 1 AFTER]
    {
        id: "s4_q03",
        category: "ADMIN",
        text: "婚姻届を提出しようとしたら、「証人2名の署名が必要」と言われた。親に頼むべき？",
        imagePrompt: "Scene: a marriage registration form with empty witness sections; two paths showing parents vs friends as witnesses; a clock showing deadline. Composition: document close-up with signature areas highlighted. Mood: milestone moment, procedural requirement.",
        imagePath: "s4_q03.png",
        choices: [
            {
                text: "証人は親でなければならないと思い、疎遠な親に連絡して頼む。",
                effect: { CS: 0, Asset: 0, Autonomy: -15 },
                verdict: "WARNING",
                feedback: "誤解です。証人は20歳以上であれば誰でもOK。親である必要はありません。「常識」と思い込んでいることが、実は法的根拠のない慣習であることは多いです。",
                lockRequirements: null
            },
            {
                text: "友人や同僚に頼む。成人であれば誰でも証人になれる。",
                effect: { CS: 15, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。法律は「成年の証人2名」としか定めていません。制度を正しく理解すれば、選択肢が広がります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            after: "処理完了です。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 1 HAPPENS AFTER Q3]

    // Q4: Knowledge (ADMIN) - Passport/driver's license renewal
    {
        id: "s4_q04",
        category: "ADMIN",
        text: "パスポートの有効期限が3ヶ月後。海外旅行の予定が半年後にある。",
        imagePrompt: "Scene: a passport with expiration date highlighted; a plane ticket showing travel date; warning signs about entry requirements. Composition: timeline showing deadline crunch. Mood: deadline awareness, hidden requirements.",
        imagePath: "s4_q04.png",
        choices: [
            {
                text: "有効期限まで3ヶ月あるから、旅行直前に更新すれば間に合う。",
                effect: { CS: -20, Asset: -30000, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "致命的なミスです。多くの国は「入国時に残存有効期限6ヶ月以上」を要求します。ギリギリでは入国拒否される可能性があります。旅行がキャンセルに。",
                lockRequirements: null
            },
            {
                text: "すぐに更新する。渡航先の残存有効期限要件を確認し、余裕を持って準備。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。行政手続きは「期限ギリギリ」が最も危険。余裕を持った準備が、トラブルを未然に防ぎます。",
                lockRequirements: null
            }
        ]
    },

    // Q5: Dilemma (ADMIN) - Fight bureaucratic error vs accept
    {
        id: "s4_q05",
        category: "ADMIN",
        text: "市役所で手続き中、職員のミスで書類が紛失された。「再提出してください」と言われたが、こちらに非はない。",
        imagePrompt: "Scene: a government counter with frustrated citizen; lost documents visualized as floating papers; two paths - fighting vs accepting. Composition: confrontation scene at bureaucratic desk. Mood: injustice, time vs principle trade-off.",
        imagePath: "s4_q05.png",
        choices: [
            {
                text: "「そちらのミスなのに」と抗議し、責任者を呼んでもらう。",
                effect: { CS: -15, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "原則的行動です。正義を主張しましたが、時間を大幅に失いました。役所の「たらい回し」は精神を削ります。勝っても得るものは少ないかもしれません。",
                lockRequirements: null
            },
            {
                text: "「仕方ない」と諦めて再提出する。時間の方が大事。",
                effect: { CS: 10, Asset: -5000, Autonomy: -10 },
                verdict: "NEUTRAL",
                feedback: "実利的行動です。時間を節約しましたが、「泣き寝入り」を選びました。同じミスが他の誰かに繰り返されるかもしれません。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "原則か、実利か。正解のない問題です。"
        }
    },

    // Q6: Knowledge (ADMIN) - Tax office consultation timing
    {
        id: "s4_q06",
        category: "ADMIN",
        text: "確定申告の時期。税務署に相談に行きたいが、いつ行くのがベスト？",
        imagePrompt: "Scene: a tax office with long queues in March; empty consultation room in November; calendar showing peak vs off-peak. Composition: crowded vs quiet comparison. Mood: strategic timing, avoiding the rush.",
        imagePath: "s4_q06.png",
        choices: [
            {
                text: "申告期限直前の3月に行く。他の人もその時期に行くはず。",
                effect: { CS: -10, Asset: 0, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "非効率です。3月は大混雑で何時間も待ち、質問も十分にできません。繁忙期を避ける知恵がないと、時間を無駄にします。",
                lockRequirements: null
            },
            {
                text: "11月〜1月の閑散期に事前相談に行く。じっくり質問できる。",
                effect: { CS: 15, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。税務署は申告期限前でなくても相談を受け付けています。オフピークを狙う戦略が、質の高い情報を得る鍵です。",
                lockRequirements: null
            }
        ]
    },

    // Q7: Key Skill Pathway (ADMIN) - Proper document submission
    {
        id: "s4_q07",
        category: "ADMIN",
        text: "重要な申請書類を提出。窓口で「コピーを取っておいてください」と言われたが、原本しか持っていない。",
        imagePrompt: "Scene: an official submission counter; original document being handed over; ghost image of copy not taken; future dispute visualized. Composition: document exchange moment with warning signs. Mood: procedural vulnerability, evidence importance.",
        imagePath: "s4_q07.png",
        choices: [
            {
                text: "「大丈夫だろう」と原本だけ提出する。",
                effect: { CS: 0, Asset: 0, Autonomy: -25 },
                verdict: "WARNING",
                feedback: "危険です。書類が紛失した場合、「提出した証拠」がありません。行政との「言った言わない」は、証拠がない方が負けます。",
                lockRequirements: null
            },
            {
                text: "「コピーを取ってから再度来ます」と一度帰り、控えを確保してから提出する。",
                effect: { CS: 5, Asset: 0, Autonomy: 20 },
                verdict: "APPROVED",
                feedback: "正解です。二度手間に見えますが、「証拠を残す」習慣が将来のトラブルを防ぎます。手続き主義は自己防衛です。",
                lockRequirements: { Autonomy: 80 },
                lockedFeedback: "LOCKED: 自律性が80以上必要。面倒くさがって「まあいいか」と流されました。"
            }
        ],
        adamDialogue: {
            intro: "重要な分岐点です。あなたの対応を記録します。",
            after: "データを記録しました。スキル選択に進みます。"
        }
    },
    // [SKILL OFFER 2 HAPPENS AFTER Q7]

    // Q8: Knowledge (ADMIN) - Inheritance procedures basics
    {
        id: "s4_q08",
        category: "ADMIN",
        text: "親が亡くなった。葬儀の後、「相続放棄は3ヶ月以内」と聞いた。何もしなくても大丈夫？",
        imagePrompt: "Scene: a family at funeral transitioning to legal documents; countdown timer showing 3 months; hidden debts revealed as shadows. Composition: emotional moment meeting legal deadline. Mood: grief mixed with procedural urgency.",
        imagePath: "s4_q08.png",
        choices: [
            {
                text: "遺産があるから相続放棄は関係ない。何もしなくていい。",
                effect: { CS: -25, Asset: -100000, Autonomy: 0 },
                verdict: "WARNING",
                feedback: "致命的な誤りです。「プラスの遺産」だけでなく「隠れた借金」も相続されます。3ヶ月以内に調査しないと、知らない借金を背負う可能性があります。",
                lockRequirements: null
            },
            {
                text: "まず負債の有無を調査し、必要なら相続放棄を検討する。期限は3ヶ月。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。相続は「資産」だけでなく「負債」も含みます。調査してから判断することで、隠れた借金を回避できます。",
                lockRequirements: null
            }
        ]
    },

    // Q9: Dilemma + Lock (ADMIN) - Report vs ignore minor issue
    {
        id: "s4_q09",
        category: "ADMIN",
        text: "確定申告で、計算ミスに気づいた。数千円の過少申告。修正申告すべき？",
        imagePrompt: "Scene: a tax return with small error highlighted; two paths - correction form vs ignore; magnifying glass on the discrepancy. Composition: minor error with disproportionate consequences. Mood: integrity vs convenience trade-off.",
        imagePath: "s4_q09.png",
        choices: [
            {
                text: "数千円なら誤差の範囲。そのままにしておく。",
                effect: { CS: 10, Asset: 3000, Autonomy: -5 },
                verdict: "NEUTRAL",
                feedback: "実利的判断です。発覚しない可能性は高いですが、「小さな嘘」を許容する姿勢が、将来大きな問題を招くかもしれません。",
                lockRequirements: null
            },
            {
                text: "修正申告する。金額に関わらず、正確な申告は義務。",
                effect: { CS: 5, Asset: -3000, Autonomy: 15 },
                verdict: "NEUTRAL",
                feedback: "原則的判断です。時間と手間がかかりますが、「正しいことをする」習慣が、長期的な信用を築きます。",
                lockRequirements: { CS: 60 },
                lockedFeedback: "LOCKED: 信用度が60以上必要。社会的信用が低いと、「正直に申告しても得しない」と思ってしまいます。"
            }
        ],
        adamDialogue: {
            intro: "小さな嘘と、大きな手間。どちらを選びますか？"
        }
    },

    // Q10: Philosophy (ADMIN) - Trust in systems vs self-reliance
    {
        id: "s4_q10",
        category: "ADMIN",
        text: "Stage 4の最終問題。あなたにとって「行政システム」とは何ですか？",
        imagePrompt: "Scene: protagonist facing a massive bureaucratic machine; one path shows integration with the system; other shows building parallel structures. Composition: individual vs institutional scale. Mood: systemic dependence vs independence.",
        imagePath: "s4_q10.png",
        choices: [
            {
                text: "従うべきルール。手続きを守り、システムの中で生きていく。",
                effect: { CS: 30, Asset: 0, Autonomy: -15 },
                verdict: "NEUTRAL",
                feedback: "順応的回答です。システムに従えば安定した生活が送れます。ただし、システムが壊れた時、あなたも一緒に壊れます。",
                lockRequirements: null
            },
            {
                text: "利用すべき道具。システムを理解し、自分の利益のために使いこなす。",
                effect: { CS: 5, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "戦略的回答です。行政を「道具」と見なす視点は、制度の隙間を見つける能力につながります。ただし、道具に頼りすぎると、道具が消えた時に困ります。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。システムとの関係を定義してください。",
            after: "Stage 4を終了します。審査結果を算出中..."
        }
    }
];
