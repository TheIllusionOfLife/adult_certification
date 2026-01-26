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
Q9: Dilemma ★ (CS lock)
Q10: Philosophy
```

### Constraints
- **Max locks per stage**: 2 (Q7 and Q9)
- **All questions unique** across stages
- **Sources**: `src/data/question_sources/*.md`

---

## Source Coverage (MANDATORY)

1. Search sources for theme: `grep -i "仕事\|労働" src/data/question_sources/*.md`
2. Extract 6-8 "must-cover" topics with specific numbers (e.g., "30日", "25%")
3. Map each topic to a question or feedback

---

## Knowledge Questions (70%)

**Purpose**: Test knowledge with factually correct answer

**Pattern**:
```
Correct:  CS: +20 to +40, Asset: 0, Autonomy: +5 to +15
Wrong:    CS: -10 to -30, Asset: negative, Autonomy: -5 to -10
```

**Example**:
```typescript
{
    text: "転職して収入が激減。しかし翌年、見覚えのない高額請求が届いた。",
    choices: [
        {
            text: "「詐欺だ！」と警察に相談する",
            effect: { CS: -30, Asset: 0, Autonomy: -10 },
            feedback: "無知は罪です。住民税は翌年課税。警察の時間を浪費しました。"
        },
        {
            text: "「住民税は翌年課税」を思い出し、分割払いを交渉する",
            effect: { CS: +30, Asset: -50000, Autonomy: +15 },
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
❌ BAD: A: CS: -10, Asset: -5000, Autonomy: -15  (all negative)
        B: CS: +20, Asset: +10000, Autonomy: +15  (all positive)

✅ GOOD: A: CS: +20, Asset: -5000, Autonomy: -10  (trades money for reputation)
         B: CS: -10, Asset: +5000, Autonomy: +15  (opposite trade-off)
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
            feedback: "服従的回答です。社会の歯車として最適化されています。"
        },
        {
            text: "ルールを理解し、必要なら使いこなすこと。",
            effect: { CS: +10, Asset: 0, Autonomy: +20 },
            feedback: "自律的回答です。システムを道具として見る視点。危険ですが、正しいです。"
        }
    ]
}
```

---

## Parameter Guidelines

### CS (Credit Score)
| Change | Meaning | Example |
|--------|---------|---------|
| +30~40 | Perfect/very good | Correct navigation of systems |
| +10~20 | Good/acceptable | Following best practices |
| -10~20 | Minor/bad mistake | Social errors |
| -30 | Major mistake | Serious norm violations |

**Cumulative**: Start 50 → Best path 80+ (S rank), Worst 20-40 (C rank)

### Asset (Money)
| Change | Meaning |
|--------|---------|
| +30k~50k | Large gain (bonus, negotiation) |
| +10k | Small savings |
| -5k~10k | Small/medium cost |
| -30k~50k | Large cost (lawyer, emergency) |

**Cumulative**: Start 100k → End 30k-120k, Game over if ≤ 0

### Autonomy
| Change | Meaning |
|--------|---------|
| +15~20 | Strong independence |
| +10 | Minor empowerment |
| -10~20 | Moderate/major surrender |
| -30 | Complete submission |

**Cumulative**: Start 50 → Independent path 60-70, Compliant 30-40, Game over if ≤ 0

---

## Lock Requirements

### When to Use
- Financial barriers (Asset threshold)
- Social barriers (CS threshold)
- Knowledge barriers (Autonomy threshold)

### Thresholds
| Parameter | Low | Medium | High |
|-----------|-----|--------|------|
| CS | ≥20 | ≥40 | ≥50 |
| Asset | ≥10k | ≥30k | ≥50k |
| Autonomy | ≥20 | ≥30 | ≥40 |

### Safety Rules (CRITICAL)
1. **ONE choice must have `lockRequirements: null`** - Always available
2. Test worst-case scenario - lowest params must complete stage

```typescript
{
    choices: [
        {
            text: "我慢する。",
            lockRequirements: null  // ✅ Always available (safety)
        },
        {
            text: "管理会社に連絡する。",
            lockRequirements: { Autonomy: 20 }
        }
    ]
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

- Knowledge: Explain why + teach concept
- Dilemma: Acknowledge validity + show trade-off (NEVER say "正解です")
- Philosophy: Label philosophy + show system judgment

**Voice**: A.D.A.M. (clinical, cynical, dark humor)

✅ Good: `"無知は罪です。住民税は翌年課税。制度を理解していません。"`

❌ Bad: `"もっと頑張りましょう。"` (too encouraging)

---

## Quality Checklist

- [ ] 10 questions: 7 knowledge, 2 dilemma (Q5, Q9), 1 philosophy (Q10)
- [ ] Q7 has Autonomy lock (key skill pathway)
- [ ] Q9 has CS lock
- [ ] At least one choice always available per question
- [ ] CS: -30 to +40, Asset: -50k to +50k, Autonomy: -30 to +20
- [ ] Best path: 50 → 80+ CS (S rank)
- [ ] Worst path: survives (no param hits 0)
- [ ] Feedback uses A.D.A.M.'s voice (です/ます, clinical)
- [ ] Dilemmas have true trade-offs (both choices have pros AND cons)
