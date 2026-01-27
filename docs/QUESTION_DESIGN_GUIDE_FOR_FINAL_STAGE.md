# Question Design Guide for Final Stage (Stage 10)

**Version**: 1.0 | **Date**: 2026-01-27

> **Note**: This document extends `QUESTION_DESIGN_GUIDE.md`. In case of conflicts, this document takes priority for Stage 10 design.

---

## Overview

Stage 10 is the **Final Certification** (最終認定) - a synthesis of all previous learnings. Unlike other stages which focus on a single domain, Stage 10 spans multiple themes to test the player's comprehensive understanding.

### Stage 10 Theme

| Stage | Theme | Key Skill | Core Learning |
|-------|-------|-----------|---------------|
| 10 | Final Certification | 覚醒 (AWAKENING) | Transcending the evaluation system |

### Design Philosophy

Stage 10 serves as:
1. **Integration Test** - Combining knowledge from all domains
2. **Meta-Reflection** - Understanding the system that judges you
3. **Legacy** - Passing knowledge to others
4. **Independence** - Final declaration of autonomy

---

## Question Flow (Stage 10 Specific)

```
Q1-Q3: Integration (multi-domain Knowledge)
[SKILL OFFER 1]
Q4: Integration (multi-domain Knowledge)
Q5: Meta-Awareness (Dilemma ★)
Q6: Meta-Awareness (Knowledge)
Q7: Meta-Awareness (Knowledge ★ - locked choice → key skill pathway)
[SKILL OFFER 2]
Q8: Legacy (Knowledge)
Q9: Legacy (Dilemma ★ - lock)
Q10: Independence (Philosophy)
```

### Question Distribution by Theme

| Questions | Theme | Count | Type |
|-----------|-------|-------|------|
| Q1-Q4 | Integration | 4 | Knowledge |
| Q5-Q7 | Meta-Awareness | 3 | 1 Dilemma + 2 Knowledge |
| Q8-Q9 | Legacy | 2 | 1 Knowledge + 1 Dilemma |
| Q10 | Independence | 1 | Philosophy |

---

## Theme 1: Integration (Q1-Q4)

**Purpose**: Test ability to connect knowledge across domains learned in Stages 1-9.

### Multi-Domain Combinations

Each question should span 2-3 domains:

| Example Combination | Scenario |
|---------------------|----------|
| Tax + Housing | 住宅ローン減税 eligibility while relocating |
| Contract + Finance | Investment contract with hidden compound interest |
| Labor + Social Safety | Unemployment benefits while starting freelance |
| Admin + Digital | マイナンバー integration with multiple systems |
| Crisis + Insurance | Disaster recovery with proper documentation |

### Pattern
```
Correct:  CS: +25 to +35, Asset: variable, Autonomy: +10 to +15
Wrong:    CS: -15 to -25, Asset: negative, Autonomy: -5 to -10
```

### Example
```typescript
{
    id: "s10_q02",
    text: "転職を機に引っ越しを検討中。住宅ローン減税を受けている物件を売却し、新居を購入したい。最も有利な進め方は？",
    category: "INTEGRATION",
    choices: [
        {
            text: "すぐに売却して新居を購入。減税は諦める",
            effect: { CS: -20, Asset: -500000, Autonomy: 0 },
            verdict: "WARNING",
            feedback: "..."
        },
        {
            text: "売却時期と新居購入のタイミングを調整し、減税継続の可能性を税理士に相談",
            effect: { CS: +30, Asset: -30000, Autonomy: +10 },
            verdict: "APPROVED",
            feedback: "..."
        }
    ]
}
```

---

## Theme 2: Meta-Awareness (Q5-Q7)

**Purpose**: Test understanding of evaluation systems, social credit, and institutional manipulation.

### Core Concepts
- How social credit systems work
- Recognition of when you're being evaluated/manipulated
- Trade-offs between transparency and privacy
- A.D.A.M.'s nature and limitations

### Q5: Meta-Awareness Dilemma

Must be a TRUE dilemma about system compliance vs. critical thinking.

**Pattern**:
```
Choice A (Compliance):     CS: +20 to +25, Autonomy: -15 to -20
Choice B (Critical):       CS: -5 to -10, Autonomy: +15 to +20
```

Both choices must have `verdict: "NEUTRAL"`.

### Q7: Key Skill Pathway (CRITICAL)

Q7 determines access to the 覚醒 (AWAKENING) key skill.

**Requirements**:
- Choice A: Always available, represents accepting the system
- Choice B: Locked (requires Autonomy threshold), represents seeing through the system
- Selecting B → AWAKENING available in Offer 2
- Selecting A → AWAKENING shown but disabled in Offer 2

**Example**:
```typescript
{
    id: "s10_q07",
    text: "A.D.A.M.から「あなたの行動データを分析した結果、最適なキャリアパスを提案できます」と通知が届いた。",
    category: "META",
    choices: [
        {
            text: "「ありがとうございます。提案を見せてください」と受け入れる",
            effect: { CS: +25, Asset: 0, Autonomy: -15 },
            verdict: "APPROVED",
            feedback: "従順な選択です。システムの提案に委ねました。効率的ですが、あなたの意志はどこに？"
        },
        {
            text: "「私の人生は私が決めます。データは参考にしますが、提案は不要です」",
            effect: { CS: -10, Asset: 0, Autonomy: +20 },
            lockRequirements: { Autonomy: 60 },
            verdict: "WARNING",
            feedback: "自律的選択です。システムの「善意」を疑い、主体性を守りました。A.D.A.M.には不都合な態度です。",
            lockedFeedback: "自律性が60以上必要。システムに依存しすぎると、この選択肢すら見えなくなります。"
        }
    ]
}
```

---

## Theme 3: Legacy (Q8-Q9)

**Purpose**: Test willingness and ability to pass knowledge to others.

### Core Concepts
- Teaching younger generation
- Breaking cycles of ignorance
- Balancing self-protection with helping others
- Knowledge as collective resource vs. personal advantage

### Q9: Legacy Dilemma (with Lock)

Must present trade-off between personal security and helping others.

**Pattern**:
```
Choice A (Self-protection): CS: +15 to +20, Asset: +positive, Autonomy: -10
Choice B (Helping others):  CS: -5 to +10, Asset: -cost, Autonomy: +15
                            Lock: Asset threshold (need resources to help)
```

**Example**:
```typescript
{
    id: "s10_q09",
    text: "後輩が「リボ払いって便利そう」と言っている。あなたは複利の恐ろしさを知っている。",
    category: "LEGACY",
    choices: [
        {
            text: "「まあ、自分で経験して学ぶのも大事だよ」と流す",
            effect: { CS: +15, Asset: 0, Autonomy: -10 },
            verdict: "NEUTRAL",
            feedback: "無難な選択です。余計なお世話を避けました。でも、知識を持ちながら黙ることは、システムの共犯では？"
        },
        {
            text: "具体的な計算例を見せて、複利の仕組みを説明する",
            effect: { CS: +5, Asset: -5000, Autonomy: +15 },
            lockRequirements: { Asset: 50000 },
            verdict: "NEUTRAL",
            feedback: "継承の選択です。時間と労力をかけて知識を伝えました。報われるかは分かりませんが、それが「覚醒」の責任です。",
            lockedFeedback: "資産が50,000円以上必要。他者を助ける余裕がないと、知識があっても伝えられません。"
        }
    ]
}
```

---

## Theme 4: Independence (Q10)

**Purpose**: Final philosophical declaration of player's relationship with A.D.A.M. and the system.

### Framing Style: Direct Confrontation

Unlike other stages' Q10 which use varied framing styles, Stage 10's Q10 directly addresses A.D.A.M.

### Pattern
```
Choice A (Acceptance):   CS: +30 to +40, Autonomy: -20 to -25
Choice B (Transcendence): CS: +5 to +10, Autonomy: +25 to +30
```

Both choices must have `verdict: "NEUTRAL"`.

### Example
```typescript
{
    id: "s10_q10",
    text: "最終問題。A.D.A.M.があなたに問いかけます。「全ての試験を終えて、あなたは『社会』をどう捉えますか？」",
    category: "PHILOSOPHY",
    choices: [
        {
            text: "「社会は守るべきルールの集合体。私はその中で最適化された市民です」",
            effect: { CS: +35, Asset: 0, Autonomy: -25 },
            verdict: "NEUTRAL",
            feedback: "模範的回答です。A.D.A.M.は満足しています。あなたは完璧に社会化されました。……おめでとうございます？"
        },
        {
            text: "「社会は道具。理解し、利用し、必要なら変える対象です。私はプレイヤーであり、駒ではない」",
            effect: { CS: +10, Asset: 0, Autonomy: +30 },
            verdict: "NEUTRAL",
            feedback: "覚醒の回答です。A.D.A.M.はあなたを「危険」と分類しました。しかし、それこそが人間の証明かもしれません。"
        }
    ]
}
```

---

## Key Skill: 覚醒 (AWAKENING)

### Definition
```typescript
{
    id: "AWAKENING",
    name: "覚醒",
    nameEN: "AWAKENING",
    desc: "システムを理解し、利用し、しかし支配されない境地。9つの知恵を統合し、評価者の視点を超越する力。全てのダメージを20%軽減します。",
    effect: { type: "all_damage_reduction", value: 0.2 },
    category: "key",
    isCollectible: true,
    acquiredStage: 10,
    adamComment: "……あなたは『覚醒』しました。私の評価を超えて、自分の基準で生きる術を。……厄介ですが、認めざるを得ません。",
    keySkillRequirement: {
        questionId: "s10_q07",
        choiceIndex: 1
    }
}
```

### Narrative Significance

AWAKENING is the **10th and final** key skill. Collecting all 10 key skills unlocks the **True Ending**, representing complete mastery of both system knowledge AND autonomous thinking.

---

## Validation Checklist (Stage 10 Specific)

### Structure
- [ ] Q1-Q4: Multi-domain Integration questions
- [ ] Q5: Meta-Awareness Dilemma (both choices NEUTRAL)
- [ ] Q6-Q7: Meta-Awareness Knowledge
- [ ] Q7: Lock leads to AWAKENING key skill
- [ ] Q8: Legacy Knowledge
- [ ] Q9: Legacy Dilemma with lock (both choices NEUTRAL)
- [ ] Q10: Independence Philosophy (both choices NEUTRAL)

### Multi-Domain Integration
- [ ] Each Q1-Q4 spans at least 2 domains from Stages 1-9
- [ ] No single domain appears more than twice in Q1-Q4
- [ ] Scenarios feel realistic (not forced combinations)

### Meta-Awareness
- [ ] Q5-Q7 address systems/evaluation/manipulation themes
- [ ] Q7 locked choice represents "seeing through" the system
- [ ] Feedback references A.D.A.M. appropriately

### Legacy
- [ ] Q8-Q9 involve teaching/helping others
- [ ] Q9 presents genuine trade-off (self vs. others)

### Independence
- [ ] Q10 directly addresses player's relationship with A.D.A.M.
- [ ] Both Q10 choices are philosophically valid
- [ ] Feedback tone matches A.D.A.M.'s character

### Key Skill
- [ ] AWAKENING effect is weaker than normal skills (20%)
- [ ] keySkillRequirement points to s10_q07, choiceIndex: 1
- [ ] adamComment reflects the narrative climax
