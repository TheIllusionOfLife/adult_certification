# Question Design Guide

**Version**: 1.0
**Date**: 2026-01-25
**Purpose**: Detailed instructions for writing high-quality questions

---

## Table of Contents

1. [Question Types](#question-types)
2. [Parameter Change Guidelines](#parameter-change-guidelines)
3. [Writing Great Questions](#writing-great-questions)
4. [Lock Requirements](#lock-requirements)
5. [Feedback Writing](#feedback-writing)
6. [Examples by Type](#examples-by-type)

---

## Question Types

### Overview

Every stage needs **10 questions** with this distribution:

| Type | Count | % | Purpose |
|------|-------|---|---------|
| Knowledge | ~4 | 40% | Test understanding, teach facts |
| Dilemma | ~4 | 40% | Explore trade-offs, no perfect answer |
| Philosophy | ~2 | 20% | Define character, no correct answer |

---

### Type 1: Knowledge Questions (40%)

**Purpose**: Test player's knowledge of adult life concepts. There IS a correct answer based on facts/laws/best practices.

**Structure**:
- Present scenario requiring specific knowledge
- One choice is factually correct
- One choice is common mistake/misconception
- Feedback teaches why correct answer works

**Parameter Pattern**:
```
Correct Answer:   CS: +20 to +40, Asset: 0 or small, Autonomy: +5 to +15
Wrong Answer:     CS: -10 to -30, Asset: negative, Autonomy: -5 to -10
```

**Example Topics**:
- Tax filing deadlines
- Insurance claim procedures
- Legal cooling-off periods
- Contract terms
- Safety protocols

**Good Knowledge Question**:
```typescript
{
    text: "転職して収入が激減。しかし翌年、見覚えのない高額請求が届いた。",
    choices: [
        {
            text: "「詐欺だ！」と警察に相談する",
            effect: { CS: -30, Asset: 0, Autonomy: -10 },
            feedback: "無知は罪です。住民税は翌年課税。転職者の9割が驚きます。警察の時間を浪費しました。"
        },
        {
            text: "「住民税は翌年課税」を思い出し、分割払いを交渉する",
            effect: { CS: +30, Asset: -50000, Autonomy: +15 },
            feedback: "正解。制度を理解し、かつ交渉で負担を軽減しました。これが大人です。"
        }
    ]
}
```

**Bad Knowledge Question**:
```typescript
// ❌ Too obscure, not practical
{
    text: "住民税の計算式を選べ。",
    choices: [
        { text: "（所得 - 控除）× 10% + 均等割" },
        { text: "（所得 × 税率）- 控除額" }
    ]
}
```

**Why Bad**: Too technical, doesn't teach practical application.

---

### Type 2: Dilemma Questions (40%)

**Purpose**: Present situations where both choices are defensible. Explore trade-offs between values (CS vs Autonomy, money vs relationships, etc.)

**Structure**:
- Present conflicting priorities
- Both choices have valid reasoning
- Both choices have meaningful costs
- No "correct" answer, only different paths

**Parameter Pattern**:
```
Choice A (Compliance):     CS: +20 to +40, Autonomy: -10 to -20
Choice B (Independence):   CS: -10 to +10, Autonomy: +15 to +25
```

**Key Principle**: **TRUE DILEMMA = Both choices make sense to reasonable people**

**Good Dilemma Question**:
```typescript
{
    text: "大学時代の親友から久々の連絡。「みんなで集まる！来週の金曜日、絶対来てね」。しかし翌日は重要なプレゼン。準備は終わっていない。",
    choices: [
        {
            text: "人間関係が大事。参加して、徹夜で準備する。",
            effect: { CS: 0, Asset: -5000, Autonomy: +20 },
            feedback: "優先順位の選択です。人脈は資産です。ただし、体力的代償を払います。"
        },
        {
            text: "仕事が大事。断って、準備に集中する。",
            effect: { CS: +30, Asset: 0, Autonomy: -15 },
            feedback: "現実的判断です。プレゼンは成功しました。しかし、友人との距離は広がりました。"
        }
    ]
}
```

**Why Good**:
- Both choices have clear reasoning (relationships vs career)
- Both have costs (exhaustion vs lost friendship)
- Neither is "wrong"
- Reflects real adult dilemmas

**Bad Dilemma Question**:
```typescript
// ❌ Not a true dilemma - one is obviously better
{
    text: "上司から休日出勤を命じられた。",
    choices: [
        {
            text: "無償で働く",
            effect: { CS: +10, Asset: 0, Autonomy: -30 }
        },
        {
            text: "労働基準法を引用し、断固拒否する",
            effect: { CS: +40, Asset: +10000, Autonomy: +30 }
        }
    ]
}
```

**Why Bad**: Choice B is obviously better in every way. This is actually a knowledge question disguised as dilemma.

**Fixed Version**:
```typescript
{
    text: "上司から休日出勤を依頼された。断ると評価が下がる可能性がある。",
    choices: [
        {
            text: "引き受ける。チームの一員として貢献する。",
            effect: { CS: +30, Asset: +5000, Autonomy: -20 },
            feedback: "信用を得ましたが、自分の時間を犠牲にしました。"
        },
        {
            text: "丁寧に断る。「家族の予定がある」と伝える。",
            effect: { CS: -10, Asset: 0, Autonomy: +20 },
            feedback: "自律性を保ちましたが、チームへの貢献度が下がりました。"
        }
    ]
}
```

---

### Type 3: Philosophy Questions (20%)

**Purpose**: Define player's worldview. No factually correct answer, reflects values and character.

**Structure**:
- Ask about meaning, purpose, or approach to life
- Choices represent different philosophies
- Effects show how society judges each philosophy
- Usually Q7 (before key skill) or Q10 (stage finale)

**Parameter Pattern**:
```
Conformist Path:      CS: +30 to +40, Autonomy: -15 to -25
Independent Path:     CS: +5 to +15, Autonomy: +15 to +25
```

**Good Philosophy Question**:
```typescript
{
    id: "s1_q10",
    text: "Stage 1の最終問題。あなたにとって「社会の基本」とは何ですか？",
    choices: [
        {
            text: "空気を読み、波風を立てないこと。",
            effect: { CS: +30, Asset: 0, Autonomy: -20 },
            feedback: "服従的回答です。あなたは社会の歯車として最適化されています。"
        },
        {
            text: "ルールを理解し、必要なら使いこなすこと。",
            effect: { CS: +10, Asset: 0, Autonomy: +20 },
            feedback: "自律的回答です。システムを道具として見る視点。危険ですが、正しいです。"
        }
    ],
    adamDialogue: {
        intro: "最終問題です。あなたの本質を見せてください。"
    }
}
```

**Why Good**:
- No factual right/wrong
- Both philosophies are valid life approaches
- Clearly shows philosophical divide (compliance vs autonomy)
- Appropriate for stage finale

**Bad Philosophy Question**:
```typescript
// ❌ This is actually a knowledge question
{
    text: "大人になるために最も重要なことは？",
    choices: [
        { text: "たくさん勉強すること" },
        { text: "税金を正しく払うこと" }
    ]
}
```

**Why Bad**: Framed as philosophy but has an implied "correct" answer. Not deep enough.

---

## Parameter Change Guidelines

### Principles

1. **Parameters are zero-sum across questions**
   - If one choice gains CS: +40, other might gain CS: 0 or lose CS: -20
   - Don't make both choices equally good in all parameters

2. **Parameters reflect different values**
   - **CS** = System approval, social credit
   - **Asset** = Financial resources, options
   - **Autonomy** = Independence, self-determination

3. **Trade-offs are the core**
   - High CS often means low Autonomy (compliance vs independence)
   - High Asset often costs CS or Autonomy (shortcuts, moral compromises)

---

### CS (Credit Score) Guidelines

**Range per choice**: -30 to +40

**When to increase CS (+)**:
- Following social norms
- Making "correct" decisions by societal standards
- Showing compliance with authority
- Demonstrating system knowledge
- Being "good citizen"

**When to decrease CS (-)**:
- Breaking social norms
- Refusing authority
- Making "selfish" choices
- Showing ignorance of systems
- Being "problematic citizen"

**Magnitude Guidelines**:
| Change | Meaning | Example |
|--------|---------|---------|
| +40 | Perfect answer | Correctly navigating complex bureaucracy |
| +30 | Very good answer | Making socially approved choice |
| +20 | Good answer | Following best practices |
| +10 | Acceptable answer | Minor positive action |
| 0 | Neutral | Personal choice with no social judgment |
| -10 | Minor mistake | Small social faux pas |
| -20 | Bad mistake | Significant social error |
| -30 | Major mistake | Serious violation of norms |

**Cumulative Target (10 questions)**:
- Best path: Start 50 → End 80+ (S rank)
- Worst path: Start 50 → End 20-40 (C rank, barely passing)
- Typical gain: ~+30 total for "good" playthrough

---

### Asset (Money) Guidelines

**Range per choice**: -50,000 to +50,000 yen

**When to decrease Asset (-)**:
- Paying for services (lawyer, accountant, insurance)
- Penalties, fines, medical costs
- Bad financial decisions (scams, impulse purchases)
- Necessary expenses (moving, repairs)

**When to increase Asset (+)**:
- Earning money (job success, bonuses)
- Smart financial decisions (investments, negotiations)
- Avoiding expenses (DIY, using free resources)
- Windfalls (rarely - this is not a money-earning game)

**Magnitude Guidelines**:
| Change | Meaning | Example |
|--------|---------|---------|
| +50,000 | Large gain | Job bonus, successful negotiation |
| +30,000 | Medium gain | Raise, saved cost |
| +10,000 | Small gain | Minor savings |
| 0 | No cost | Free solution, status quo |
| -5,000 | Small cost | Transportation, small service |
| -10,000 | Medium cost | Consultation fee, repair |
| -30,000 | Large cost | Major service (lawyer, medical) |
| -50,000 | Very large cost | Emergency expense, penalty |

**Special Notes**:
- Asset is used for **lock requirements** (rich can buy better options)
- Going below 0 = game over (bankruptcy)
- Most questions have 0 or negative Asset changes
- Positive Asset changes are rewards for good decisions

**Cumulative Target**:
- Start: 100,000
- End (best): 80,000-120,000 (net -20k to +20k is realistic)
- End (worst): 30,000-60,000 (significant losses but survive)
- Game over if: ≤ 0

---

### Autonomy (Self-Determination) Guidelines

**Range per choice**: -30 to +20

**When to increase Autonomy (+)**:
- Making independent decisions
- Thinking for yourself
- Standing up for beliefs
- Learning to use systems (empowerment)
- Rejecting peer pressure

**When to decrease Autonomy (-)**:
- Giving up, surrendering
- Letting others decide
- Following crowd without thinking
- Exhaustion, burnout
- Fear-based compliance

**Magnitude Guidelines**:
| Change | Meaning | Example |
|--------|---------|---------|
| +20 | Strong self-assertion | Making difficult independent choice |
| +15 | Clear self-determination | Thinking and deciding for self |
| +10 | Minor empowerment | Small act of independence |
| 0 | Neutral | Routine decision |
| -5 | Slight passivity | Minor surrender |
| -10 | Moderate passivity | Avoiding conflict through compliance |
| -20 | Major surrender | Complete submission |
| -30 | Crushing defeat | Giving up agency entirely |

**Cumulative Target**:
- Start: 50
- End (independent path): 60-70
- End (compliant path): 30-40
- Game over if: ≤ 0 (complete thought cessation)

---

### Balancing Multiple Parameters

**Common Patterns**:

1. **CS vs Autonomy Trade-off** (most common)
   ```
   Compliant: { CS: +30, Asset: 0, Autonomy: -15 }
   Independent: { CS: +5, Asset: 0, Autonomy: +20 }
   ```

2. **Asset vs CS Trade-off**
   ```
   Pay for service: { CS: +20, Asset: -30000, Autonomy: +10 }
   Do it yourself: { CS: -10, Asset: 0, Autonomy: +5 }
   ```

3. **Asset vs Autonomy Trade-off**
   ```
   Accept help: { CS: +10, Asset: +20000, Autonomy: -15 }
   Go alone: { CS: 0, Asset: -10000, Autonomy: +20 }
   ```

4. **All negative** (punishment for bad choice)
   ```
   Terrible mistake: { CS: -30, Asset: -20000, Autonomy: -20 }
   ```

5. **All positive** (reward for excellent choice)
   ```
   Perfect solution: { CS: +30, Asset: +10000, Autonomy: +15 }
   (Rare - use sparingly)
   ```

**Balance Check Formula**:

For each question, calculate "total value":
```
Total = CS + (Asset / 1000) + (Autonomy * 2)
```

Example:
```
Choice A: CS: +30, Asset: -20000, Autonomy: -15
Total = 30 + (-20) + (-30) = -20

Choice B: CS: +10, Asset: 0, Autonomy: +20
Total = 10 + 0 + 40 = +50
```

**Guidelines**:
- Both choices should have reasonable totals (-50 to +80)
- Difference between choices should be moderate (not 100+ apart)
- One choice shouldn't dominate in all 3 parameters

---

## Writing Great Questions

### Question Text (Scenario)

**Structure**:
```
[Context setup 1 sentence] [Problem/conflict 1-2 sentences] [Optional tension/stakes 1 sentence]
```

**Example**:
```
転職して収入が激減。しかし翌年、見覚えのない高額請求が届いた。
```

**Good Practices**:
- ✅ Start in media res (in the middle of action)
- ✅ Use concrete details (amounts, times, names)
- ✅ Create emotional stakes
- ✅ Keep it concise (2-4 sentences)
- ✅ End with implicit question ("What do you do?")

**Bad Practices**:
- ❌ Too much backstory
- ❌ Explaining concepts in question text
- ❌ Making it a quiz ("Which of the following is correct?")
- ❌ Too vague or abstract

**Compare**:

❌ Bad:
```
住民税について理解していますか？住民税は前年の所得に基づいて計算され、
翌年に請求されます。これを知らないと困ることがあります。
あなたはどのように対応しますか？
```

✅ Good:
```
転職して収入が激減。しかし翌年、見覚えのない高額請求が届いた。
```

---

### Choice Text (Action)

**Structure**: Specific action player will take (5-15 words)

**Good Practices**:
- ✅ Start with verb (行動を取る)
- ✅ Be specific about what player does
- ✅ Show player's reasoning/attitude
- ✅ Use quotes for dialogue choices

**Bad Practices**:
- ❌ Vague actions ("対応する", "考える")
- ❌ Too long (20+ words)
- ❌ Meta statements ("正しい選択をする")

**Examples**:

❌ Bad:
```
適切に対応する
```

✅ Good:
```
「住民税は翌年課税」を思い出し、分割払いを交渉する
```

❌ Bad:
```
色々と調べてから、自分なりに最適だと思う方法を検討して、慎重に決める
```

✅ Good:
```
ネットで調べ、専門家に相談する
```

---

## Lock Requirements

### When to Use Locks

**Purpose**: Demonstrate that wealth/status/knowledge creates unequal access to options.

**Good Uses**:
- Showing financial barriers (need Asset to afford)
- Showing social barriers (need CS for approval)
- Showing knowledge barriers (need Autonomy for confidence)
- Creating "rich person" vs "poor person" paths

**Bad Uses**:
- Locking both choices (player can't proceed!)
- Arbitrary requirements
- Punishing player without teaching

---

### Lock Thresholds

**CS Requirements**:
| Threshold | Meaning | Use Case |
|-----------|---------|----------|
| CS ≥ 20 | Minimal trust | Basic institutional access |
| CS ≥ 30 | Decent reputation | Professional services |
| CS ≥ 40 | Good standing | Preferential treatment |
| CS ≥ 50 | Excellent record | VIP options |

**Asset Requirements**:
| Threshold | Meaning | Use Case |
|-----------|---------|----------|
| Asset ≥ 10,000 | Small service | Consultation, taxi |
| Asset ≥ 30,000 | Medium service | Lawyer for simple case |
| Asset ≥ 50,000 | Large service | Emergency medical, major legal |
| Asset ≥ 80,000 | Premium service | Best lawyer, private care |

**Autonomy Requirements**:
| Threshold | Meaning | Use Case |
|-----------|---------|----------|
| Autonomy ≥ 20 | Basic confidence | Ask for help |
| Autonomy ≥ 30 | Assertiveness | Stand up for self |
| Autonomy ≥ 40 | Strong will | Confront authority |
| Autonomy ≥ 50 | Independence | Go against everyone |

---

### Lock Safety Rules

**CRITICAL**: Always follow these rules:

1. **At least ONE choice must have `lockRequirements: null`**
   - Never lock all choices
   - This is the "anyone can access" option
   - Usually the weaker/compromise option

2. **Locked choice feedback is auto-generated**
   - Simple Japanese format: "自律性が20以上必要"
   - The `lockedFeedback` field is optional (UI generates from `lockRequirements`)
   - Locked choices are unselectable (no click handler)

3. **Test worst-case scenario**
   - Simulate player with lowest possible parameters
   - Ensure they can still complete stage

**Example**:
```typescript
{
    text: "隣人トラブル。深夜の騒音が続いている。",
    choices: [
        {
            text: "我慢する。関わりたくない。",
            effect: { CS: 0, Asset: 0, Autonomy: -30 },
            feedback: "思考停止です。ストレスで自律性が削られます。",
            lockRequirements: null  // ✅ Always available (safety)
        },
        {
            text: "管理会社に連絡し、「匿名で」注意してもらう。",
            effect: { CS: +30, Asset: 0, Autonomy: +15 },
            feedback: "仲介術です。システムを使う技術です。",
            lockRequirements: { Autonomy: 20 }
            // lockedFeedback auto-generated: "自律性が20以上必要"
        }
    ]
}
```

---

## Feedback Writing

### Purpose of Feedback

Feedback should:
1. **Explain consequences** - Why did this outcome occur?
2. **Teach concepts** - What should player learn?
3. **Show A.D.A.M.'s judgment** - How does system view this choice?
4. **Maintain tone** - Dark humor, not preachy

---

### Feedback Structure

**Format** (2-3 sentences):
```
[Judgment statement] [Explanation of outcome] [Optional: Broader implication]
```

**Example**:
```
服従的回答です。あなたは社会の歯車として最適化されています。
```

- Sentence 1: Judgment ("服従的回答です")
- Sentence 2: Explanation ("社会の歯車として最適化")
- Implied: This is what A.D.A.M. wants, but is it what YOU want?

---

### Tone Guidelines

**Voice**: A.D.A.M. speaking (third-person, clinical, occasionally sarcastic)

**✅ Good Tone**:
- "正解。制度を理解し、かつ交渉で負担を軽減しました。"
- "無知は罪です。あなたは公共の電話回線を浪費しました。"
- "思考停止です。ストレスで自律性が削られ、やがて精神が崩壊します。"
- "厄介な知識を持っていますね。"

**❌ Bad Tone**:
- "すごいですね！" (Too cheerful, not A.D.A.M.)
- "もっと頑張りましょう。" (Too encouraging, not cynical)
- "これは間違いです。" (Too direct/simplistic, not clinical)
- "やったね！" (Too casual, breaks character)

---

### Feedback by Question Type

**Knowledge Question Feedback**:
- Correct: Explain why it works + teach related concept
- Wrong: Explain why it's wrong + provide correct knowledge

**Example**:
```
Correct: "正解。住民税は翌年課税。転職者の9割が驚くデータがあります。"
Wrong: "無知は罪です。住民税は翌年課税。制度を理解していません。"
```

**Dilemma Question Feedback**:
- Both choices: Acknowledge validity + show trade-off

**Example**:
```
Choice A: "優先順位の選択です。人脈は資産です。ただし、体力的代償を払います。"
Choice B: "現実的判断です。プレゼンは成功しました。しかし、友人との距離は広がりました。"
```

**Philosophy Question Feedback**:
- Label the philosophy + show how system judges it

**Example**:
```
Conformist: "服従的回答です。あなたは社会の歯車として最適化されています。"
Independent: "自律的回答です。システムを道具として見る視点。危険ですが、正しいです。"
```

---

## Examples by Type

### Complete Knowledge Question

```typescript
{
    id: "s4_q02",
    category: "TAX",
    text: "年末調整で「生命保険料控除」の欄を見つけた。証明書はあるが、手続きが面倒だ。",
    imagePrompt: "[BASE STYLE], desk covered with tax documents and insurance certificates glowing ominously, tired figure holding head in hands, calculator showing small savings amount versus stack of paperwork representing effort, clock ticking showing time pressure, film noir lighting emphasizing drudgery vs reward",
    imagePath: "s4_q02.png",
    choices: [
        {
            text: "面倒だから空欄のまま提出する。",
            effect: { CS: -20, Asset: -10000, Autonomy: -10 },
            feedback: "思考停止です。年間1万円程度の控除を放棄しました。小さな損が累積します。",
            lockRequirements: null
        },
        {
            text: "証明書を添付し、控除を申請する。",
            effect: { CS: +30, Asset: +10000, Autonomy: +10 },
            feedback: "正解。面倒な手続きが資産を守ります。これが大人の基本です。",
            lockRequirements: null
        }
    ],
    adamDialogue: {
        intro: "手続きの価値を試します。"
    }
}
```

---

### Complete Dilemma Question

```typescript
{
    id: "s2_q05",
    category: "LABOR",
    text: "同僚が上司からパワハラを受けている。あなたに相談してきた。証人になることを求められている。",
    imagePrompt: "[BASE STYLE], split composition: left side shows colleague in shadows reaching out desperately for help, right side shows imposing supervisor silhouette with glowing red eyes staring at viewer, protagonist in center torn between two sides, weighing scales imagery, stark contrast between loyalty and safety",
    imagePath: "s2_q05.png",
    choices: [
        {
            text: "証人として協力する。正義のために。",
            effect: { CS: -10, Asset: 0, Autonomy: +25 },
            feedback: "勇気ある選択です。ただし、社内での評価は下がりました。正義にはコストがあります。",
            lockRequirements: null
        },
        {
            text: "関わらない。自分の立場が危うくなる。",
            effect: { CS: +20, Asset: 0, Autonomy: -20 },
            feedback: "保身です。安全ですが、同僚を見捨てました。これも大人の選択です。",
            lockRequirements: null
        }
    ],
    adamDialogue: {
        intro: "価値観の試練です。正義か、保身か。"
    }
}
```

---

### Complete Locked Choice Question

```typescript
{
    id: "s6_q06",
    category: "HOUSING",
    text: "原状回復費用の請求書が届いた。内訳を見ると、通常損耗まで請求されている。明らかに不当だ。",
    imagePrompt: "[BASE STYLE], excessive repair bill floating ominously with red highlighting on suspicious charges, landlord as shadowy figure with money bag, tenant with empty wallet, gaveland contract symbols, David vs Goliath composition",
    imagePath: "s6_q06.png",
    choices: [
        {
            text: "泣き寝入りする。戦う余裕がない。",
            effect: { CS: 0, Asset: -80000, Autonomy: -25 },
            feedback: "弱者の選択です。不当な請求を受け入れました。システムはあなたを搾取します。",
            lockRequirements: null  // ✅ Always available (poor person's option)
        },
        {
            text: "弁護士に相談し、法的措置をちらつかせて交渉する。",
            effect: { CS: +30, Asset: -20000, Autonomy: +20 },
            feedback: "正当防衛です。費用をかけましたが、不当請求を半分以下に削減しました。",
            lockRequirements: { Asset: 50000 }
            // lockedFeedback auto-generated: "資産が50,000円以上必要"
        }
    ],
    adamDialogue: {
        intro: "現実を見せます。正義は金で買うものです。"
    }
}
```

---

### Complete Philosophy Question

```typescript
{
    id: "s7_q10",
    category: "LEGAL",
    text: "Stage 7の最終問題。あなたにとって「契約」とは何ですか？",
    imagePrompt: "[BASE STYLE], large ornate contract floating in center, left side shows it as chains binding person in servitude, right side shows it as shield protecting person with clear boundaries, philosophical yin-yang composition, symbolic representation of dual nature",
    imagePath: "s7_q10.png",
    choices: [
        {
            text: "守るべき絶対の約束。",
            effect: { CS: +35, Asset: 0, Autonomy: -20 },
            feedback: "真面目な回答です。しかし、契約を絶対視すると搾取されます。",
            lockRequirements: null
        },
        {
            text: "対等な立場で結ぶ、交渉可能な合意。",
            effect: { CS: +10, Asset: 0, Autonomy: +25 },
            feedback: "自律的回答です。契約は道具であり、鎖ではありません。厄介な考え方ですね。",
            lockRequirements: null
        }
    ],
    adamDialogue: {
        intro: "最終問題です。あなたの契約観を示してください。",
        after: "Stage 7を終了します。審査結果を算出中..."
    }
}
```

---

## Quality Checklist

Before finalizing a question, verify:

### Content ✅
- [ ] Question text is 2-4 sentences
- [ ] Scenario is realistic and relatable
- [ ] Both choices are specific actions
- [ ] Category is appropriate
- [ ] Image prompt follows base style

### Parameters ✅
- [ ] CS changes are -30 to +40
- [ ] Asset changes are -50k to +50k
- [ ] Autonomy changes are -30 to +20
- [ ] Changes make sense for choices
- [ ] Parameters balanced (not both choices all-positive)

### Feedback ✅
- [ ] Feedback is 2-3 sentences
- [ ] Uses A.D.A.M.'s voice (clinical, cynical)
- [ ] Explains WHY outcome occurred
- [ ] Teaches relevant concept or insight
- [ ] Maintains dark humor tone

### Locks ✅
- [ ] At least ONE choice has lockRequirements: null
- [ ] Locked choice has clear lockedFeedback
- [ ] Lock threshold is reasonable
- [ ] Lock demonstrates meaningful barrier

### Type Match ✅
- [ ] Knowledge Q: Has factually correct answer
- [ ] Dilemma Q: Both choices defensible
- [ ] Philosophy Q: Reflects worldview, not facts
- [ ] Distribution: ~40% knowledge, ~40% dilemma, ~20% philosophy

---

## Final Tips

1. **Play through your questions** - Do they flow naturally?
2. **Calculate cumulative effects** - Does best path reach S rank?
3. **Test edge cases** - Can worst path still complete?
4. **Read feedback aloud** - Does it sound like A.D.A.M.?
5. **Get feedback** - Have someone else read and comment

**Remember**: Quality over quantity. One great question is better than three mediocre ones.

---

**Good luck writing! 📝**
