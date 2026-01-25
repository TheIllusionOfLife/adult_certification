# Skill Design Guide

**Version**: 1.0
**Date**: 2026-01-25
**Purpose**: Guidelines for creating balanced, meaningful skills

---

## Table of Contents

1. [Skill System Overview](#skill-system-overview)
2. [Normal Skills](#normal-skills)
3. [Key Skills](#key-skills)
4. [Effect Types Reference](#effect-types-reference)
5. [Balancing Guidelines](#balancing-guidelines)
6. [Skill Pairing Strategy](#skill-pairing-strategy)
7. [Examples](#examples)

---

## Skill System Overview

### Skill Categories

| Category | Count per Stage | Persistence | Purpose |
|----------|----------------|-------------|---------|
| **Normal Skills** | 3 | Stage-only | Tactical gameplay advantages |
| **Key Skills** | 1 | Collectible* | True Ending unlock + stage gameplay |

\* Key skills provide gameplay effects within current stage, but are **collected** for True Ending unlock (need 9/9 across Stages 1-9).

### Skill Offers

Each stage has **2 skill offers**:

**Offer 1** (after Q3):
- 2 normal skills
- Player chooses 1

**Offer 2** (after Q7):
- 1 normal skill + 1 key skill
- Player chooses 1

**Total per stage**: Player acquires 2 skills (one from each offer)

---

### Design Philosophy

**Principles**:
1. **Deterministic** - No random chance, always same result
2. **Meaningful** - Player should feel the difference
3. **Balanced** - Not too weak (pointless) or too strong (trivializing)
4. **Strategic** - Choices should matter based on playstyle

**Anti-Patterns**:
- ❌ Random activation (RNG frustration)
- ❌ Invisible effects (player can't tell it worked)
- ❌ Overpowered effects (removes challenge)
- ❌ Useless effects (why choose it?)

---

## Normal Skills

### Purpose

Normal skills provide **tactical advantages** for current stage:
- Reduce damage in specific situations
- Lower costs for certain actions
- Mitigate risks in upcoming questions

### Naming Convention

```
{日本語名}
```

**Examples**:
- "コミュニケーション緩衝材" (Communication Buffer)
- "お役所ショートカット" (Bureaucracy Shortcut)
- "デジタル衛生" (Digital Hygiene)

**Guidelines**:
- 5-10 characters in Japanese
- Descriptive and professional tone
- No ALL_CAPS (that's for key skills only)
- Should sound like an actual skill/technique

---

### Structure

```typescript
{
    id: "s{N}_normal_{01-03}",
    name: "{日本語名}",
    desc: "{詳細な説明（です/ます調）}",
    effect: {
        type: "{effect_type}",
        value: {magnitude},
        category: "{CATEGORY}",  // Optional, for category-specific effects
        threshold: {number}       // Optional, for conditional effects
    }
}
```

---

### Effect Magnitude

**Damage Reduction Effects** (percentage):
- **20-30%**: Noticeable but not game-breaking
- **40-50%**: Strong, clearly helpful
- **60%+**: Too strong, avoid

**Cost Reduction Effects** (yen):
- **5,000-10,000**: Small but meaningful
- **15,000-20,000**: Medium, significant
- **30,000+**: Large, very impactful

**Why These Ranges**:
- Below 20%: Hard for player to notice (-15 becomes -12)
- Above 50%: Trivializes challenges (-30 becomes -15 or less)
- For yen: Based on typical Asset costs (10k-50k range)

---

### When Skills Should Trigger

**Good Trigger Conditions**:
- ✅ Category-based (triggers in ADMIN questions)
- ✅ Parameter-based (triggers when Autonomy damage occurs)
- ✅ Threshold-based (triggers for damage above/below threshold)
- ✅ Universal (always triggers when relevant)

**Bad Trigger Conditions**:
- ❌ Random chance (30% chance to activate)
- ❌ Too specific (only Q8 in ADMIN category during full moon)
- ❌ Never triggers (category that doesn't appear in stage)

---

### Examples by Effect Type

**Type 1: Universal Damage Reduction**
```typescript
{
    id: "s1_normal_01",
    name: "コミュニケーション緩衝材",
    desc: "対人トラブルでの自律性ダメージを常に50%軽減します。",
    effect: { type: "autonomy_damage_reduction", value: 0.5 }
}
```
- **When it triggers**: Any time Autonomy damage occurs
- **Strength**: 50% (strong but fair - still feel consequences)
- **Use case**: General protection for risky social choices

**Type 2: Category-Specific Cost Reduction**
```typescript
{
    id: "s1_normal_02",
    name: "お役所ショートカット",
    desc: "行政手続き関連の資産減少を10,000円軽減します。",
    effect: { type: "admin_cost_reduction", value: 10000 }
}
```
- **When it triggers**: ADMIN category questions with Asset cost
- **Strength**: 10,000 yen (meaningful for 20k-40k costs)
- **Use case**: Stage focused on bureaucracy

**Type 3: Category-Specific Damage Reduction**
```typescript
{
    id: "s1_normal_03",
    name: "デジタル衛生",
    desc: "セキュリティ関連の信用度低下を30%軽減します。",
    effect: { type: "category_cs_damage_reduction", category: "SEC", value: 0.3 }
}
```
- **When it triggers**: SEC category with CS damage
- **Strength**: 30% (moderate protection)
- **Use case**: Stage with security-related challenges

**Type 4: Conditional Damage Reduction**
```typescript
{
    id: "s3_normal_02",
    name: "小額損失の歯止め",
    desc: "資産減少が-10,000以下の時、損失を40%軽減します。",
    effect: { type: "asset_small_damage_reduction", threshold: -10000, value: 0.4 }
}
```
- **When it triggers**: Small Asset losses (>= -10,000)
- **Strength**: 40% but only for small losses
- **Use case**: Prevents death by a thousand cuts

---

## Key Skills

### Purpose

Key skills serve **dual purpose**:
1. **Gameplay**: Provide tactical advantage within current stage
2. **Collection**: Count toward True Ending unlock (need 9/9)

### Pre-Defined List

All 9 key skills are specified in `improvement_plan_2026-01-24_integrated.md` section 6.1:

| Stage | Key Skill ID | Japanese Name | Core Learning |
|-------|-------------|---------------|---------------|
| 1 | SOCIAL_CALIBRATION | 社会較正 | Reading social rules, avoiding friction |
| 2 | EVIDENCE_CHAIN | 証拠連鎖 | Recording evidence prevents disputes |
| 3 | COMPOUND_SENSE | 複利感覚 | Understanding compound interest |
| 4 | DUE_PROCESS | 手続き主義 | Navigating bureaucracy |
| 5 | SAFETY_NET_NAVIGATION | セーフティネット航法 | Accessing social safety nets |
| 6 | NEGOTIATION_PROTOCOL | 交渉プロトコル | Using third parties for negotiation |
| 7 | CONTRACT_LITERACY | 契約読解 | Reading contracts before signing |
| 8 | IDENTITY_HYGIENE | 本人性衛生 | Protecting digital identity |
| 9 | DAMAGE_CONTROL | 被害最小化 | Minimizing damage in crises |

---

### Naming Convention

**English ID**: ALL_CAPS_ENGLISH (e.g., SOCIAL_CALIBRATION)
**Japanese Name**: 漢字2-4文字 (e.g., 社会較正)
**English Name**: Optional, for UI display

**Pattern**: Sounds like a "system capability" or "protocol" (not casual)

---

### Structure

```typescript
{
    id: "{KEY_SKILL_NAME}",           // ALL_CAPS from predefined list
    name: "{日本語名}",                // 2-4 kanji
    nameEN: "{KEY_SKILL_NAME}",       // Same as id
    desc: "{哲学的な説明（です/ます調）}", // Deeper than normal skills
    effect: {
        type: "{effect_type}",
        value: 0.2-0.3,              // Usually lower than normal skills
        category: "{CATEGORY}",       // If category-specific
        threshold: {number}           // If conditional
    },
    category: "key",                  // ⚠️ Important: marks as key skill
    isCollectible: true,              // ⚠️ Important: for True Ending
    acquiredStage: {N},               // Which stage this belongs to
    adamComment: "{A.D.A.M.の皮肉なコメント（です/ます調）}" // Special comment
}
```

---

### Description Style

Key skill descriptions should:
1. **Explain the concept** - What is this skill philosophically?
2. **Describe effect** - What it does mechanically
3. **Be inspiring** - This is a "power" player earned

**Good Description**:
```
場のルール、距離感、最低限の作法を読み、不要な摩擦を避ける能力。
自律性への小ダメージ（-20以下）を30%軽減します。
```

**Bad Description**:
```
自律性ダメージを30%軽減する。
```
(Too mechanical, no philosophy)

---

### A.D.A.M. Comment

When player acquires key skill, A.D.A.M. gives special comment showing:
- Recognition that player learned something dangerous
- Grudging acknowledgment
- Sarcasm or concern

**Examples**:
```
"……あなたは『システムを理解しながら、自我を保つ』術を習得しました。厄介ですね。"

"……『証拠』という武器を手にしました。対抗手段を得たことを記録します。"

"……リスクを最小化する技術。生存戦略として合理的です。警戒対象にします。"
```

**Pattern**: `"……{skill concept}。{A.D.A.M.'s judgment}。"`

---

### Effect Balance

Key skills should be **slightly weaker** than best normal skills:
- Normal skill: 50% reduction
- Key skill: 20-30% reduction

**Why**:
- Key skills have dual value (gameplay + collection)
- Already special with unique dialogue
- Prevents key skill from being "always correct choice"

**Exception**: If key skill has very specific trigger (narrow category + threshold), can be stronger (30-40%).

---

## Effect Types Reference

### Available Effect Types

#### 1. autonomy_damage_reduction

**Purpose**: Reduce all Autonomy damage by percentage

**Parameters**:
```typescript
{
    type: "autonomy_damage_reduction",
    value: 0.2-0.5  // 20-50%
}
```

**When to use**:
- Stage with many social conflict questions
- General protection for independent choices
- Character who wants to preserve autonomy

**Example**:
```typescript
// Normal skill version (stronger)
effect: { type: "autonomy_damage_reduction", value: 0.5 }
// Original: -20 Autonomy → After: -10 Autonomy

// Key skill version (weaker)
effect: { type: "autonomy_damage_reduction", value: 0.3 }
// Original: -20 Autonomy → After: -14 Autonomy
```

---

#### 2. admin_cost_reduction

**Purpose**: Reduce Asset costs for ADMIN category questions

**Parameters**:
```typescript
{
    type: "admin_cost_reduction",
    value: 5000-15000  // yen amount
}
```

**When to use**:
- Stage focused on bureaucracy (tax, legal, documentation)
- Multiple ADMIN questions in Q8-Q10
- Want to reward investing in bureaucracy knowledge

**Example**:
```typescript
effect: { type: "admin_cost_reduction", value: 10000 }
// Original: -30,000 Asset → After: -20,000 Asset
```

**Important**: Only triggers if:
- Question category is "ADMIN"
- Asset change is negative
- Otherwise has no effect

---

#### 3. category_cs_damage_reduction

**Purpose**: Reduce CS damage for specific category

**Parameters**:
```typescript
{
    type: "category_cs_damage_reduction",
    category: "SEC",  // Any valid category
    value: 0.2-0.4    // 20-40%
}
```

**When to use**:
- Stage focused on specific domain (security, finance, etc.)
- Want to reward specialization
- Category appears multiple times in Q8-Q10

**Example**:
```typescript
effect: { type: "category_cs_damage_reduction", category: "SEC", value: 0.3 }
// In SEC question: Original: -30 CS → After: -21 CS
// In LABOR question: No effect
```

**Available Categories**:
- ADMIN, FINANCE, SEC, LABOR, SOCIAL, HOUSING, TAX, LEGAL, MANNER, HEALTH

---

#### 4. autonomy_small_damage_reduction

**Purpose**: Reduce small Autonomy damage (above threshold)

**Parameters**:
```typescript
{
    type: "autonomy_small_damage_reduction",
    threshold: -20,   // Only applies to damage >= this value
    value: 0.3-0.5    // 30-50%
}
```

**When to use**:
- Want to protect against small cuts but not major losses
- Theme of "resilience" or "coping"
- Stage with many -10 to -20 Autonomy choices

**Example**:
```typescript
effect: { type: "autonomy_small_damage_reduction", threshold: -20, value: 0.3 }
// Original: -15 Autonomy (above -20) → After: -11 Autonomy (reduced)
// Original: -30 Autonomy (below -20) → After: -30 Autonomy (no effect)
```

**Key Insight**: This is SOCIAL_CALIBRATION's effect - preventing "social friction" (small damage) but can't save you from major disasters.

---

### Creating New Effect Types

**Process**:
1. Define need based on stage theme
2. Design effect logic
3. Implement in `src/data/skillEffects.ts`
4. Add switch case in `applySkillEffects()`
5. Add corresponding case in `getSkillActivations()`
6. Document here

**Example New Effect**:
```typescript
// If you needed "reduce ALL CS damage by %"
case "cs_damage_reduction":
    if (CS < 0) {
        const reduced = CS * (1 - skill.effect.value);
        CS = Math.floor(reduced);
    }
    break;
```

---

## Balancing Guidelines

### Testing Your Skill

**Test Questions**:
1. **Does it trigger often enough?**
   - Aim for 2-3 triggers in Q8-Q10
   - If never triggers, it's useless

2. **Is the effect noticeable?**
   - Player should see activation message
   - Change should feel meaningful (not 1-2 points)

3. **Is it overpowered?**
   - Can player trivialize challenges?
   - Does best path become too easy?

4. **Is it underpowered?**
   - Would player regret choosing it?
   - Is it clearly worse than alternative?

---

### Balance Checklist

Before finalizing skill:

**Magnitude** ✅
- [ ] Percentage reductions are 20-50%
- [ ] Yen amounts are 5k-20k
- [ ] Effect feels meaningful when it triggers

**Trigger Frequency** ✅
- [ ] Skill triggers 2-4 times in stage
- [ ] Not too rare (never triggers)
- [ ] Not too common (always triggers)

**Comparison** ✅
- [ ] Skill A and Skill B feel roughly equal value
- [ ] Choice between skills is meaningful
- [ ] No "trap" options (obviously worse)

**Stage Fit** ✅
- [ ] Skill makes thematic sense for stage
- [ ] Skill addresses actual challenges in stage
- [ ] Skill name/description matches stage theme

---

## Skill Pairing Strategy

### Offer 1 Pairing (Q3)

**Purpose**: Establish playstyle direction early

**Good Pairing Patterns**:

1. **Offense vs Defense**
   - Skill A: Prevents damage (autonomy_damage_reduction)
   - Skill B: Reduces costs (admin_cost_reduction)

2. **General vs Specific**
   - Skill A: Universal protection (all Autonomy damage)
   - Skill B: Category-specific (ADMIN costs only)

3. **Different Parameters**
   - Skill A: Protects Autonomy
   - Skill B: Protects Asset

**Example (Stage 1)**:
```typescript
offer1: [
    {
        name: "コミュニケーション緩衝材",
        effect: { type: "autonomy_damage_reduction", value: 0.5 }
        // Universal, defensive
    },
    {
        name: "お役所ショートカット",
        effect: { type: "admin_cost_reduction", value: 10000 }
        // Specific, economic
    }
]
```

**Why Good**: Clear choice based on whether player prioritizes social resilience or financial efficiency.

---

### Offer 2 Pairing (Q7)

**Purpose**: Final tactical choice + key skill option

**Structure**: 1 normal skill + 1 key skill

**Normal Skill Strategy**:
- Should complement (not duplicate) Offer 1 skills
- Should address challenges in Q8-Q10
- Should be tempting despite competing with key skill

**Key Skill Strategy**:
- Related to stage theme
- Slightly weaker effect but collectible
- Chosen if player prioritizes True Ending path

**Example (Stage 1)**:
```typescript
offer2: [
    {
        name: "デジタル衛生",
        effect: { type: "category_cs_damage_reduction", category: "SEC", value: 0.3 }
        // Normal skill, strong for SEC questions
    },
    {
        name: "社会較正",  // KEY SKILL
        effect: { type: "autonomy_small_damage_reduction", threshold: -20, value: 0.3 }
        // Weaker but collectible
    }
]
```

**Why Good**: Player choosing normal skill gets immediate strong benefit. Player choosing key skill makes strategic long-term choice.

---

### Bad Pairing Examples

❌ **Both too similar**:
```typescript
offer1: [
    { effect: { type: "autonomy_damage_reduction", value: 0.3 } },
    { effect: { type: "autonomy_damage_reduction", value: 0.5 } }
]
```
**Why bad**: No meaningful choice, just "pick bigger number".

❌ **One clearly better**:
```typescript
offer1: [
    { effect: { type: "autonomy_damage_reduction", value: 0.5 } },  // Universal
    { effect: { type: "category_cs_damage_reduction", category: "MANNER", value: 0.2 } }  // Narrow + weak
]
```
**Why bad**: First skill is obviously superior. Second is trap option.

❌ **Neither fits stage**:
```typescript
// In stage about finance
offer1: [
    { effect: { type: "autonomy_damage_reduction", value: 0.4 } },
    { effect: { type: "admin_cost_reduction", value: 10000 } }
]
```
**Why bad**: Stage 3 is about FINANCE (credit cards, debt). Neither skill addresses this. Should have finance-related skills.

---

## Examples

### Complete Normal Skill (Strong)

```typescript
{
    id: "s2_normal_01",
    name: "録音習慣",
    desc: "重要な会話を記録する習慣。証拠があれば、後から言った言わないで揉めません。労働関連の信用度低下を40%軽減します。",
    effect: {
        type: "category_cs_damage_reduction",
        category: "LABOR",
        value: 0.4
    }
}
```

**Analysis**:
- ✅ Category-specific (LABOR for work-focused stage)
- ✅ Strong effect (40%) but narrow trigger
- ✅ Thematically fits Stage 2 (workplace evidence)
- ✅ Name and description clear

---

### Complete Normal Skill (Balanced)

```typescript
{
    id: "s3_normal_02",
    name: "金利計算機",
    desc: "複利の威力を見抜く能力。ローン・リボ・分割払いの真のコストを理解します。金融関連の資産減少を30%軽減します。",
    effect: {
        type: "category_cs_damage_reduction",
        category: "FINANCE",
        value: 0.3
    }
}
```

**Analysis**:
- ✅ Moderate effect (30%) for common category
- ✅ Thematically perfect for Stage 3 (finance basics)
- ✅ Effect type is CS damage (protects credit score from bad financial decisions)
- ✅ Description explains both concept and mechanic

---

### Complete Key Skill (Stage 1)

```typescript
{
    id: "SOCIAL_CALIBRATION",
    name: "社会較正",
    nameEN: "SOCIAL_CALIBRATION",
    desc: "場のルール、距離感、最低限の作法を読み、不要な摩擦を避ける能力。自律性への小ダメージ（-20以下）を30%軽減します。",
    effect: {
        type: "autonomy_small_damage_reduction",
        threshold: -20,
        value: 0.3
    },
    category: "key",
    isCollectible: true,
    acquiredStage: 1,
    adamComment: "……あなたは『システムを理解しながら、自我を保つ』術を習得しました。厄介ですね。"
}
```

**Analysis**:
- ✅ Philosophical description (social calibration concept)
- ✅ Mechanical description (small damage reduction)
- ✅ Weaker than normal skills (30% + threshold limit)
- ✅ A.D.A.M. comment shows concern
- ✅ All required fields present

---

### Complete Key Skill (Stage 6)

```typescript
{
    id: "NEGOTIATION_PROTOCOL",
    name: "交渉プロトコル",
    nameEN: "NEGOTIATION_PROTOCOL",
    desc: "ガイドライン、基準、第三者を活用し、「気まずさ」を突破する技術。住居関連の資産減少を50%軽減します。",
    effect: {
        type: "category_asset_reduction",  // Hypothetical new type
        category: "HOUSING",
        value: 0.5
    },
    category: "key",
    isCollectible: true,
    acquiredStage: 6,
    adamComment: "……『交渉』という名の戦術。弱者が対等を装う技術ですね。記録します。"
}
```

**Analysis**:
- ✅ Fits Stage 6 theme (housing negotiations)
- ✅ Strong effect (50%) justified by narrow category
- ✅ Description explains negotiation philosophy
- ✅ A.D.A.M. shows grudging respect
- ⚠️ Note: Would need to implement new effect type for Asset reduction

---

## Common Mistakes

### ❌ Mistake 1: Random Activation

```typescript
// DON'T DO THIS
{
    name: "運の守護",
    desc: "30%の確率で自律性ダメージを無効化します。",
    effect: { type: "autonomy_damage_reduction_random", value: 0.3 }
}
```

**Why wrong**: Game design explicitly forbids randomness (運要素排除).

**Fix**: Make it deterministic.

---

### ❌ Mistake 2: Too Weak

```typescript
// Effect is invisible
{
    name: "軽微な節約",
    desc: "行政手続き関連の資産減少を1,000円軽減します。",
    effect: { type: "admin_cost_reduction", value: 1000 }
}
```

**Why wrong**: 1,000 yen on 30,000 yen cost is 3% - player won't notice.

**Fix**: Use 5,000-10,000 yen for meaningful impact.

---

### ❌ Mistake 3: Category Mismatch

```typescript
// In Stage 3 (Finance theme)
{
    name: "法律知識",
    desc: "法律関連の信用度低下を40%軽減します。",
    effect: { type: "category_cs_damage_reduction", category: "LEGAL", value: 0.4 }
}
```

**Why wrong**: Stage 3 has no LEGAL questions. Skill never triggers.

**Fix**: Match skill to stage's actual categories (FINANCE for Stage 3).

---

### ❌ Mistake 4: No Trade-Off

```typescript
offer1: [
    {
        name: "完璧な守り",
        effect: { type: "autonomy_damage_reduction", value: 0.5 }
    },
    {
        name: "不完全な守り",
        effect: { type: "autonomy_damage_reduction", value: 0.2 }
    }
]
```

**Why wrong**: Obviously pick first one. No meaningful choice.

**Fix**: Make skills address different needs (Autonomy vs Asset, general vs specific).

---

## Final Checklist

Before finalizing your 4 skills:

### All Skills ✅
- [ ] IDs are unique (`s{N}_normal_01`, `s{N}_normal_02`, etc.)
- [ ] Names are professional and thematic
- [ ] Descriptions use です/ます form
- [ ] Effects use valid effect types
- [ ] Magnitudes are balanced (20-50% or 5k-20k yen)

### Normal Skills ✅
- [ ] 3 normal skills total
- [ ] Skills fit stage theme
- [ ] Skills will trigger in Q8-Q10
- [ ] Offer 1 pair creates meaningful choice
- [ ] Offer 2 skill complements Offer 1

### Key Skill ✅
- [ ] ID matches predefined list
- [ ] Has nameEN field
- [ ] category: "key" is set
- [ ] isCollectible: true is set
- [ ] acquiredStage matches current stage
- [ ] Has adamComment field
- [ ] Effect is slightly weaker than comparable normal skill
- [ ] Description is philosophical + mechanical

### Pairing ✅
- [ ] Offer 1 skills are balanced alternatives
- [ ] Offer 2 creates choice between power now (normal) vs collection (key)
- [ ] No "trap" options (obviously worse choices)
- [ ] Both offers feel meaningful

---

**Good luck designing! ⚡**
