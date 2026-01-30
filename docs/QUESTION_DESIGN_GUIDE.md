# Question Design Guide

**Version**: 2.0 | **Date**: 2026-01-26

---

## Question Types & Distribution

Every stage: **10 questions** = 7 Knowledge (70%) + 2 Dilemma (20%) + 1 Philosophy (10%)

### Question Flow (Standard)
```
Q1-Q3: Knowledge
[SKILL OFFER 1: CS/Asset skill + Autonomy skill]
Q4: Knowledge
Q5: Dilemma ★ (TRUE dilemma, no correct answer)
Q6: Knowledge
Q7: Knowledge ★ (locked choice → key skill pathway)
[SKILL OFFER 2: Normal skill + Key skill (earned via Q7-B)]
Q8: Knowledge
Q9: Dilemma ★ (lock)
Q10: Philosophy
```

### Constraints
- **Max locks per stage**: 2 (Q7 and Q9)
- **All questions unique** across stages
- **Sources**: `src/data/question_sources/*.md`

---

## Stage Themes

Each stage has a core theme defined by its Key Skill. All questions must align with the stage theme.

| Stage | Theme | Key Skill | Core Learning |
|-------|-------|-----------|---------------|
| 1 | Social Basics | 仲介術 (MEDIATION) | Using systems to avoid conflict |
| 2 | Labor/Work | 証拠連鎖 (EVIDENCE_CHAIN) | Recording prevents disputes |
| 3 | Finance/Money | 複利感覚 (COMPOUND_SENSE) | Understanding compound interest |
| 4 | Administration | 手続き主義 (DUE_PROCESS) | Navigating bureaucracy |
| 5 | Social Safety Net | セーフティネット航法 (SAFETY_NET_NAVIGATION) | Accessing safety nets |
| 6 | Housing | 交渉プロトコル (NEGOTIATION_PROTOCOL) | Third-party negotiation |
| 7 | Contracts/Legal | 契約読解 (CONTRACT_LITERACY) | Reading before signing |
| 8 | Digital Identity | 本人性衛生 (IDENTITY_HYGIENE) | Protecting digital identity |
| 9 | Crisis/Disaster | 被害最小化 (DAMAGE_CONTROL) | Minimizing crisis damage |
| 10 | Final Certification | 覚醒 (AWAKENING) | Transcending the evaluation system |

> **Stage 10 Note**: Stage 10 is a synthesis finale with unique structure. See [QUESTION_DESIGN_GUIDE_FOR_FINAL_STAGE.md](./QUESTION_DESIGN_GUIDE_FOR_FINAL_STAGE.md) for Stage 10 specific guidelines. That document takes priority over this one for Stage 10 design.

---

## Source Coverage (MANDATORY)

1. Search sources for theme: `grep -i "仕事\|労働" src/data/question_sources/*.md`
2. Extract 6-8 "must-cover" topics with specific numbers (e.g., "30日", "25%")
3. Map each topic to a question or feedback

---

## Knowledge Questions (70%)

**Purpose**: Test knowledge with factually correct answer

## Player-Facing Verdict (Overlay Label) (MANDATORY)

The UI shows a big player-facing label after each answer. This label must reflect the *player-perceived* correctness (or intentional neutrality), not the CS delta sign.

### Field

Each choice must set:

- `verdict: "APPROVED" | "WARNING" | "NEUTRAL"`

### Mapping

- `APPROVED` -> overlay shows `APPROVED`
- `WARNING` -> overlay shows `WARNING`
- `NEUTRAL` -> overlay shows `RECORDED` (no single "right" answer)
- Game over overrides: overlay shows `TERMINATED`

### Rules by Question Type

- Knowledge: correct choice = `APPROVED`, wrong choice = `WARNING` (even if CS delta sign would disagree)
- Dilemma: both choices = `NEUTRAL` (trade-offs)
- Philosophy: both choices = `NEUTRAL` (worldview)

Note: if `verdict` is omitted, UI falls back to the legacy behavior (`CS >= 0` => APPROVED, otherwise WARNING). This is for backward compatibility only; do not rely on it in new content.

**Pattern**:
```
Correct:  CS: +20 to +40, Asset: 0, Autonomy: +5 to +15
Wrong:    CS: -10 to -30, Asset: negative, Autonomy: -5 to -10
```

**Knowledge Rule**: Correct = no negatives, Wrong = no positives (except Dilemma/Philosophy questions, which are exempt from this rule)

**Effect Magnitude System**: Effects use a ±10/±20/±30/±40/±50 scale.

**Example**:
```typescript
{
    text: "転職して収入が激減。しかし翌年、見覚えのない高額請求が届いた。",
    choices: [
        {
            text: "「詐欺だ！」と警察に相談する",
            effect: { CS: -30, Asset: 0, Autonomy: -10 },
            verdict: "WARNING",
            feedback: "無知は罪です。住民税は翌年課税。警察の時間を浪費しました。"
        },
        {
            text: "「住民税は翌年課税」を思い出し、分割払いを交渉する",
            effect: { CS: +30, Asset: -50, Autonomy: +15 },
            verdict: "APPROVED",
            feedback: "正解。制度を理解し、交渉で負担を軽減しました。"
        }
    ]
}
```

---

## Dilemma Questions (20%)

**Purpose**: Present trade-offs where both choices are defensible

**Pattern**:
```
Choice A (Compliance):     CS: +20, Autonomy: -15
Choice B (Independence):   CS: -10, Autonomy: +20
```

### True Dilemma Verification ✅

- [ ] Both choices have positive AND negative effects
- [ ] A reasonable person could argue for either
- [ ] Feedback acknowledges validity of BOTH (no "正解です")

**Anti-Pattern**:
```
❌ BAD: A: CS: -10, Asset: -20, Autonomy: -15  (all negative)
        B: CS: +20, Asset: +20, Autonomy: +15  (all positive)

✅ GOOD: A: CS: +20, Asset: -20, Autonomy: -10  (trades money for reputation)
         B: CS: -10, Asset: +20, Autonomy: +15  (opposite trade-off)
```

---

## Philosophy Questions (10%)

**Purpose**: Define worldview, no factually correct answer

**Pattern**:
```
Conformist:  CS: +30 to +40, Autonomy: -15 to -25
Independent: CS: +5 to +15, Autonomy: +15 to +25
```

**Example**:
```typescript
{
    text: "Stage 1の最終問題。あなたにとって「社会の基本」とは何ですか？",
    choices: [
        {
            text: "空気を読み、波風を立てないこと。",
            effect: { CS: +30, Asset: 0, Autonomy: -20 },
            verdict: "NEUTRAL",
            feedback: "服従的回答です。社会の歯車として最適化されています。"
        },
        {
            text: "ルールを理解し、必要なら使いこなすこと。",
            effect: { CS: +10, Asset: 0, Autonomy: +20 },
            verdict: "NEUTRAL",
            feedback: "自律的回答です。システムを道具として見る視点。危険ですが、正しいです。"
        }
    ]
}
```

### Q10 Philosophy Question Variation

To avoid repetition fatigue across 9 stages, Q10 questions vary in framing styles and effect patterns:

#### Framing Styles
| Stage | Framing Style | Example Phrasing |
|-------|---------------|------------------|
| 1 | Direct | "あなたにとって「X」とは何ですか？" |
| 2 | Scenario | Career fork narrative ("5年後、キャリアの選択肢が出た...") |
| 3 | Hypothetical | Future projection ("10年後どちらに？") |
| 4 | Retrospective | Past experience reflection ("経験を思い出してください") |
| 5 | Crisis narrative | Specific decision moment ("申請書を前に...") |
| 6 | Lifecycle | Multiple life stages perspective ("30歳、40歳、70歳...") |
| 7 | Power analysis | Metacognitive interrogation ("力ある者は...力なき者は...") |
| 8 | Data reality | Concrete data facts ("あなたの検索履歴は売買されている") |
| 9 | Past/Future | Regret vs opportunity cost ("後悔した。しかし完璧な準備は...") |

#### Effect Patterns
Not all Q10s use the standard CS vs Autonomy trade-off:

- **Standard**: CS gain vs Autonomy gain (Stage 1, 2, 4)
- **Asset included**: Some choices include Asset costs/gains to show real-world consequences (Stage 3, 5, 6, 7, 8, 9)
- **Flipped expectations**: Independence choice can include Asset gain (Stage 3: 自由選択 → Asset+10)

#### Key Rules
- Both choices MUST have `verdict: "NEUTRAL"`
- Feedback should acknowledge validity of both choices
- Never use "正解です" in philosophy question feedback

---

## Parameter Guidelines

### CS (Credit Score)
| Change | Meaning | Example |
|--------|---------|---------|
| +30~50 | Perfect/very good | Correct navigation of systems |
| +10~20 | Good/acceptable | Following best practices |
| -10~20 | Minor/bad mistake | Social errors |
| -30~50 | Major mistake | Serious norm violations |

**Cumulative**: Start 100 → Best path 200+ (S rank), Worst 50-100 (C rank)

### Asset (Abstract Score)
| Change | Meaning |
|--------|---------|
| +30~50 | Big gain (bonus, negotiation) |
| +10~20 | Small gain |
| -10~20 | Small cost |
| -30~50 | Big cost (lawyer, emergency) |

**Cumulative**: Start 100 → End range 50-250, Game over if ≤ 0

### Autonomy
| Change | Meaning |
|--------|---------|
| +15~20 | Strong independence |
| +10 | Minor empowerment |
| -10~20 | Moderate/major surrender |
| -30 | Complete submission |

**Cumulative**: Start 100 → Independent path 150+, Compliant 50-80, Game over if ≤ 0

---

## Lock Requirements

### Core Principles (CRITICAL)

1. **Parameter changes must be realistic**
   - Match real-world consequences (e.g., リボ払い = -50, not -10)
   - Taking positive action should increase Autonomy, not decrease it
   - Following rules properly shouldn't hurt Autonomy

2. **Locked choice = desirable choice**
   - The locked option should be the "better" or "more desirable" outcome
   - Lock teaches: "You need X resource to access this opportunity"
   - ❌ Bad: Lock the "wrong" answer
   - ✅ Good: Lock the "investment" or "empowered" answer

3. **Lock type distribution per stage**
   - Every stage: **1 Asset lock + 1 Autonomy/CS lock**
   - Stage 1: No CS lock (CS is the obvious goal, self-explanatory)
   - Stage 2+: CS lock allowed

4. **Lock availability must be meaningful (40-80%)**
   - 0% availability = impossible = bad design
   - 100% availability = no impact = pointless
   - Target: 40-80% of paths can unlock
   - **Always simulate to verify** before finalizing

### Thresholds
| Parameter | Low | Medium | High |
|-----------|-----|--------|------|
| CS | ≥50 | ≥100 | ≥150 |
| Asset | ≥80 | ≥120 | ≥180 |
| Autonomy | ≥80 | ≥120 | ≥150 |

**Consistent lock assignments across all stages**:
- Q7: Autonomy >= 150
- Q9: Asset >= 180

### Safety Rules
1. **ONE choice must have `lockRequirements: null`** - Always available
2. **Simulate worst-case** - lowest params must complete stage
3. **Check cumulative effects** - multiple bad choices shouldn't cause unavoidable game over

### Lock Design Examples

✅ **Good Lock Design (Q9 Interview Suit)**:
```typescript
{
    text: "新しいスーツと靴を購入して、万全の状態で臨む。",
    effect: { CS: 20, Asset: -30, Autonomy: 10 },  // Good outcome
    lockRequirements: { Asset: 180 },  // Need money to invest
    lockedFeedback: "資産が180以上必要。お金がないとチャンスすら掴めない。"
}
```

❌ **Bad Lock Design**:
```typescript
{
    text: "適当な番号を書いておく。",  // Bad choice
    effect: { CS: -30, Asset: 0, Autonomy: 0 },
    lockRequirements: { CS: 30 }  // Why lock a bad choice?
}
```

---

## Writing Guidelines

### Question Text
```
[Context 1 sentence] [Problem 1-2 sentences] [Stakes optional]
```

✅ Good: `転職して収入が激減。しかし翌年、見覚えのない高額請求が届いた。`

❌ Bad: `住民税について理解していますか？住民税は前年の所得に基づいて...`

### Choice Text
- Start with verb (specific action)
- 5-15 words
- Use quotes for dialogue

✅ Good: `「住民税は翌年課税」を思い出し、分割払いを交渉する`

❌ Bad: `適切に対応する`

### Feedback
**Format**: `[Judgment] [Explanation] [Implication]`

**Do NOT include parameter change descriptions** in the feedback text (e.g., 「社会的信用+10」「資産-50,000」). These are displayed in a separate UI section.

Guidelines by question type:
- Knowledge: Explain why + teach concept
- Dilemma: Acknowledge validity + show trade-off (NEVER say "正解です")
- Philosophy: Label philosophy + show system judgment

**Voice**: A.D.A.M. (clinical, cynical, dark humor)

✅ Good: `"無知は罪です。住民税は翌年課税。制度を理解していません。"`

❌ Bad: `"もっと頑張りましょう。"` (too encouraging)

❌ Bad: `"「社会的信用-30」「資産-20,000」—無知は罪です。住民税は翌年課税。"` (redundant param display)

---

## Quality Checklist

### Structure
- [ ] 10 questions: 7 knowledge, 2 dilemma (Q5, Q9), 1 philosophy (Q10)
- [ ] At least one choice always available per question

### Locks (CRITICAL - Run Simulator)
- [ ] Exactly 2 locks: Q7 + Q9
- [ ] 1 Asset lock + 1 Autonomy/CS lock
- [ ] Stage 1 only: No CS lock
- [ ] Locked choice is the "desirable" option
- [ ] Lock availability: 40-80% (not 0%, not 100%)
- [ ] Run `node scripts/simulate_stage.mjs --stage N` to verify

### Parameter Balance
- [ ] Parameter changes are realistic to real-world consequences
- [ ] Positive actions increase Autonomy (not decrease)
- [ ] CS: -30 to +40, Asset: -50 to +50, Autonomy: -30 to +30
- [ ] Best path: 100 → 200+ CS (S rank)
- [ ] Worst path: survives (no param hits 0)

### Content
- [ ] Feedback uses A.D.A.M.'s voice (です/ます, clinical)
- [ ] Every choice sets `verdict` appropriately (Knowledge: APPROVED/WARNING; Dilemma/Philosophy: NEUTRAL)
- [ ] Dilemmas have true trade-offs (both choices have pros AND cons)
- [ ] No "正解です" in dilemma feedback
