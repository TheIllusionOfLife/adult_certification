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

    // Q2: Knowledge (ADMIN) - Marriage registration requirements (simpler effect, before skills)
    {
        id: "s4_q02",
        category: "ADMIN",
        text: "婚姻届を提出しようとしたら、「証人2名の署名が必要」と言われた。親に頼むべき？",
        imagePrompt: "Scene: a marriage registration form with empty witness sections; two paths showing parents vs friends as witnesses; a clock showing deadline. Composition: document close-up with signature areas highlighted. Mood: milestone moment, procedural requirement.",
        imagePath: "s4_q02.png",
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
        ]
    },

    // Q3: Knowledge (TAX) - Furusato tax donation (bigger effect, after skill offer 1) [SKILL OFFER 1 AFTER]
    {
        id: "s4_q03",
        category: "TAX",
        text: "「ふるさと納税」を勧められた。「実質2,000円で返礼品がもらえる」と聞いたが、注意点は？",
        imagePrompt: "Scene: hometown tax donation website with regional products; calculation showing deduction limit; calendar with deadline. Composition: benefit visualization with hidden requirements. Mood: opportunity with conditions.",
        imagePath: "s4_q03.png",
        choices: [
            {
                text: "お得なら上限なく寄附する。たくさん寄附すればたくさん返礼品がもらえる。",
                effect: { CS: -20, Asset: -50000, Autonomy: -5 },
                verdict: "WARNING",
                feedback: "大損です。控除上限額を超えた分は「ただの寄附」。年収500万円なら上限は約6万円。さらにワンストップ特例は5自治体まで、申請書は翌年1月10日必着。知らないと損をします。",
                lockRequirements: null
            },
            {
                text: "自分の控除上限額を確認し、5自治体以内でワンストップ特例を活用する。",
                effect: { CS: 20, Asset: 0, Autonomy: 10 },
                verdict: "APPROVED",
                feedback: "正解です。控除上限額は年収・家族構成で異なります。上限内なら実質2,000円で返礼品（寄附額の30%相当）を受け取れます。制度を理解して使うのが大人です。",
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

    // Q6: Knowledge (ADMIN) - Tax filing preparation timing
    {
        id: "s4_q06",
        category: "ADMIN",
        text: "初めての確定申告。「3月15日が期限」と知っているが、いつから準備を始めるべき？",
        imagePrompt: "Scene: a calendar showing tax deadline in March; one path shows last-minute panic with errors; other shows calm early preparation. Composition: timeline with preparation stages. Mood: procrastination vs proactive planning.",
        imagePath: "s4_q06.png",
        choices: [
            {
                text: "期限に間に合えばいい。2月後半から始める。",
                effect: { CS: -15, Asset: -10000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "危険です。書類不足や計算ミスに気づいても修正する時間がありません。税務署も混雑し、相談もできず、延滞税や加算税のリスクも。「間に合えばいい」は甘い考えです。",
                lockRequirements: null
            },
            {
                text: "年明けすぐに書類を揃え、1月中に下書きを完成させる。",
                effect: { CS: 20, Asset: 0, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。源泉徴収票は1月末までに届きます。早めに準備すれば、不明点を税務署に相談する余裕もあり、控除の漏れも防げます。",
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

    // Q9: Knowledge (ADMIN) - Tax correction (修正申告)
    {
        id: "s4_q09",
        category: "ADMIN",
        text: "確定申告後、計算ミスで税金を少なく申告していたことに気づいた。どう対応すべき？",
        imagePrompt: "Scene: a tax return with error discovered; correction form glowing; tax office counter. Composition: mistake discovery with proper correction path. Mood: error found, responsible action.",
        imagePath: "s4_q09.png",
        choices: [
            {
                text: "少額だし、バレなければ問題ない。放置する。",
                effect: { CS: -25, Asset: -50000, Autonomy: -10 },
                verdict: "WARNING",
                feedback: "危険です。税務署の調査で発覚すると、過少申告加算税（10〜15%）と延滞税が課されます。悪質と判断されれば重加算税（35%）も。自主的に修正すれば加算税は軽減されます。",
                lockRequirements: null
            },
            {
                text: "速やかに修正申告を行い、差額を納付する。",
                effect: { CS: 20, Asset: -5000, Autonomy: 15 },
                verdict: "APPROVED",
                feedback: "正解です。自主的な修正申告なら、過少申告加算税は課されないか軽減されます。「正直者が損をする」のではなく、「正直者がリスクを回避できる」のが税の仕組みです。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "税の申告に誠実さは必要ですか？"
        }
    },

    // Q10: Philosophy (ADMIN) - Trust in systems vs self-reliance [RETROSPECTIVE FRAMING]
    {
        id: "s4_q10",
        category: "ADMIN",
        text: "行政で困った経験を思い出してください。『システムに従った』か『システムを使った』か？その経験から、行政をどう見ますか？",
        imagePrompt: "Scene: protagonist recalling past bureaucratic experiences; one path shows obedient citizen following signs; other shows strategic navigator finding shortcuts. Composition: memory flashback with two interpretations. Mood: retrospective reflection, learned wisdom.",
        imagePath: "s4_q10.png",
        choices: [
            {
                text: "従った。ルールを守ることで、最終的には解決した。",
                effect: { CS: 30, Asset: 0, Autonomy: -15 },
                verdict: "NEUTRAL",
                feedback: "順応的回答です。ルールに従う姿勢は確実な結果をもたらします。ただし、ルールが不合理な時も従い続けますか？",
                lockRequirements: null
            },
            {
                text: "使った。制度を調べ、自分に有利な方法を見つけた。",
                effect: { CS: 5, Asset: 0, Autonomy: 20 },
                verdict: "NEUTRAL",
                feedback: "戦略的回答です。制度の「使い方」を知る者は、同じルールでも違う結果を得ます。ただし、その知識を得るには時間と労力が必要です。",
                lockRequirements: null
            }
        ],
        adamDialogue: {
            intro: "最終問題です。過去の経験から、システムとの関係を定義してください。",
            after: "Stage 4を終了します。審査結果を算出中..."
        }
    }
];
