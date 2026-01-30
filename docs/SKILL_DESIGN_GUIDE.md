# Skill Design Guide

**Version**: 2.0 | **Date**: 2026-01-26

---

## Overview

| Type | Count/Stage | Persistence | Purpose |
|------|-------------|-------------|---------|
| Normal | 3 | Stage-only | Tactical advantages |
| Key | 1 | Collectible | True Ending unlock (need 10/10) |

### Skill Offers
- **Offer 1** (after Q3): 2 normal skills → choose 1
- **Offer 2** (after Q7): 1 normal + 1 key skill → choose 1

### Design Principles
1. **Deterministic** - No random chance
2. **Meaningful** - Player feels difference
3. **Balanced** - Not too weak or strong
4. **Strategic** - Choices matter

---

## Normal Skills

### Structure
```typescript
{
    id: "s{N}_normal_{01-03}",
    name: "{日本語名}",  // 5-10 chars, professional tone
    desc: "{説明（です/ます調）}",
    effect: {
        type: "{effect_type}",
        value: {magnitude},
        category: "{CATEGORY}"  // Optional
    }
}
```

### Effect Magnitudes
| Type | Range | Notes |
|------|-------|-------|
| Gain amplification | 20-30% | Primary effect type; amplifies positive parameter gains |
| Category gain boost | 30% | Key skills use category-specific boosts matching stage theme |
| All gain amplification | 20% | AWAKENING (Stage 10) only |

---

## Key Skills (Predefined)

| Stage | ID | Name | Effect | Category | Core Learning |
|-------|-----|------|--------|----------|---------------|
| 1 | MEDIATION | 仲介術 | `category_cs_gain_boost` 30% | SOCIAL | Using systems to avoid conflict |
| 2 | EVIDENCE_CHAIN | 証拠連鎖 | `category_autonomy_gain_boost` 30% | LABOR | Recording prevents disputes |
| 3 | COMPOUND_SENSE | 複利感覚 | `category_asset_gain_boost` 30% | FINANCE | Understanding compound interest |
| 4 | DUE_PROCESS | 手続き主義 | `category_cs_gain_boost` 30% | ADMIN | Navigating bureaucracy |
| 5 | SAFETY_NET_NAVIGATION | セーフティネット航法 | `category_autonomy_gain_boost` 30% | HEALTH | Accessing safety nets |
| 6 | NEGOTIATION_PROTOCOL | 交渉プロトコル | `category_asset_gain_boost` 30% | HOUSING | Third-party negotiation |
| 7 | CONTRACT_LITERACY | 契約読解 | `category_autonomy_gain_boost` 30% | LEGAL | Reading before signing |
| 8 | IDENTITY_HYGIENE | 本人性衛生 | `category_autonomy_gain_boost` 30% | SEC | Protecting digital identity |
| 9 | DAMAGE_CONTROL | 被害最小化 | `category_autonomy_gain_boost` 30% | DISASTER | Minimizing crisis damage |
| 10 | AWAKENING | 覚醒 | `all_gain_amplification` 20% | (all) | Transcending the evaluation system |

> **Key Skill Pattern**: Each key skill (except AWAKENING) uses a `category_*_gain_boost` effect matching the stage's dominant category. This creates thematic coherence — the skill amplifies gains within the topic you mastered.
>
> **Stage 10 Note**: AWAKENING has a unique effect (`all_gain_amplification`) unlike other key skills. See [QUESTION_DESIGN_GUIDE_FOR_FINAL_STAGE.md](./QUESTION_DESIGN_GUIDE_FOR_FINAL_STAGE.md) for full details.

### Structure
```typescript
{
    id: "{KEY_SKILL_NAME}",      // ALL_CAPS from list
    name: "{日本語名}",           // 2-4 kanji
    nameEN: "{KEY_SKILL_NAME}",
    desc: "{哲学的説明 + 効果説明}",
    effect: { type: "category_*_gain_boost", value: 0.3, category: "..." },  // Category-specific
    category: "key",
    isCollectible: true,
    acquiredStage: {N},
    adamComment: "{皮肉なコメント}",
    keySkillRequirement: {
        questionId: "s{N}_q07",
        choiceIndex: 1  // Choice B (locked)
    }
}
```

### Causal Earning (CRITICAL)
1. Q7 choice B is **locked** (requires Autonomy threshold)
2. Q7 choice B **embodies** key skill philosophy
3. If Q7-B selected → key skill available in Offer 2
4. If Q7-A selected → key skill shown but disabled

### A.D.A.M. Comment Pattern
```
"・・・{skill concept}。{A.D.A.M.'s judgment}。"

Example: "・・・あなたは『システムを理解しながら、自我を保つ』術を習得しました。厄介ですね。"
```

---

## Effect Types

### Primary: Gain Amplification

Skills primarily use **gain amplification** — they boost positive parameter changes rather than reducing negative ones.

### 1. autonomy_gain_amplification (KEY SKILL TYPE)
Amplifies all Autonomy gains by percentage.
```typescript
effect: { type: "autonomy_gain_amplification", value: 0.20-0.25 }
// +20 Autonomy → +24 Autonomy (at 0.20)
```

### 2. cs_gain_amplification
Amplifies all CS gains by percentage.
```typescript
effect: { type: "cs_gain_amplification", value: 0.20-0.25 }
// +30 CS → +36 CS (at 0.20)
```

### 3. asset_gain_amplification
Amplifies all Asset gains by percentage.
```typescript
effect: { type: "asset_gain_amplification", value: 0.20-0.25 }
// +20 Asset → +24 Asset (at 0.20)
```

### 4. all_gain_amplification (AWAKENING only)
Amplifies all parameter gains by percentage. Exclusive to Stage 10 AWAKENING.
```typescript
effect: { type: "all_gain_amplification", value: 0.20 }
// All positive effects amplified by 20%
```

### 5. category_*_gain_amplification
Category-specific gain amplification.
```typescript
effect: { type: "category_cs_gain_amplification", category: "LABOR", value: 0.25 }
// LABOR question: +30 CS → +37 CS
```

**Categories**: ADMIN, FINANCE, SEC, LABOR, SOCIAL, HOUSING, TAX, LEGAL, MANNER, HEALTH, CAREER

---

## Skill Uniqueness

**All skills must be unique in BOTH name AND effect across all stages.**

Already used:
- Stage 1: 信用基礎 (cs_gain_amplification), 自律性増幅, 信用増幅, MEDIATION (category_cs_gain_boost/SOCIAL)
- Stage 2: 資産増幅, 自律性増幅, 信用増幅, EVIDENCE_CHAIN (category_autonomy_gain_boost/LABOR)
- Stage 3: 信用増幅, 自律性増幅, 資産増幅, COMPOUND_SENSE (category_asset_gain_boost/FINANCE)
- Stage 4: 信用増幅, 自律性増幅, 資産増幅, DUE_PROCESS (category_cs_gain_boost/ADMIN)
- Stage 5: 信用増幅, 自律性増幅, 資産増幅, SAFETY_NET_NAVIGATION (category_autonomy_gain_boost/HEALTH)
- Stage 6: 資産増幅, 自律性増幅, 信用増幅, NEGOTIATION_PROTOCOL (category_asset_gain_boost/HOUSING)
- Stage 7: 信用増幅, 自律性増幅, 資産増幅, CONTRACT_LITERACY (category_autonomy_gain_boost/LEGAL)
- Stage 8: 信用増幅, 自律性増幅, 資産増幅, IDENTITY_HYGIENE (category_autonomy_gain_boost/SEC)
- Stage 9: 資産増幅, 自律性増幅, 信用増幅, DAMAGE_CONTROL (category_autonomy_gain_boost/DISASTER)
- Stage 10: 信用増幅, 自律性増幅, 信用増幅+, AWAKENING (all_gain_amplification)

---

## Validation (CRITICAL)

### Skills Must Trigger
**#1 Design Failure**: Skills that never trigger.

**Validation Process**:
1. List categories in stage
2. List damage types by category (CS/Asset/Autonomy)
3. Match skills to ACTUAL damage types
4. Verify triggers AFTER skill acquired (Offer 1: Q4-Q10, Offer 2: Q8-Q10)

```bash
node scripts/simulate_stage.mjs --stage {N}
```

### Skill Activation Validation Checklist

Before finalizing a stage, verify each skill can trigger:

1. **Identify skill effect type** (e.g., `cs_gain_amplification`)
2. **Check trigger conditions**:
   - For `cs_gain_amplification`: Questions with CS > 0
   - For `asset_gain_amplification`: Questions with Asset > 0
   - For `autonomy_gain_amplification`: Questions with Autonomy > 0
   - For `all_gain_amplification`: Any question with any positive parameter
   - For `category_*_gain_amplification`: Questions in that category with the relevant parameter > 0
3. **Count trigger opportunities after acquisition**:
   - Offer 1 skills: Count triggers in Q4-Q10
   - Offer 2 skills: Count triggers in Q8-Q10
4. **Minimum**: Each skill must have ≥1 trigger opportunity
5. **Run simulation**: Verify activation > 0%

**Example**: Stage 5's s5_normal_01 (`asset_gain_amplification`)
- Q4 (HEALTH): Correct choice has Asset: +20 ✓
- Q7 (HEALTH): Correct locked choice has Asset: +10 ✓
- Result: Skill can trigger → Simulation shows amplified gains

### A.D.A.M. Recommendation Strategy

A.D.A.M. recommends skills that appear beneficial but subtly steer players away from the key skill type:

- **ADAM recommends**: CS gain amplification, Asset gain amplification
- **Non-recommended**: Autonomy gain amplification (the key skill type for True Ending)
- **Stages 1-4**: Key skill (`autonomy_gain_amplification`) is reachable even when following ADAM's recommendation
- **Stages 5-9**: Key skill becomes unreachable if the player follows ADAM's recommendation — this is the trap

This creates a progression where early stages teach players to trust ADAM, while later stages punish blind obedience.

### Pairing Strategy

**Offer 1**: Different parameter amplification (Autonomy vs Asset vs CS)

**Offer 2**: Normal (stronger, immediate) vs Key (weaker, collectible)

| ❌ Bad | ✅ Good |
|--------|---------|
| Both reduce same param | Protect different params |
| One clearly better | Trade-offs based on playstyle |
| Category doesn't exist in stage | Matches actual stage categories |

---

## Common Mistakes

| Mistake | Problem | Fix |
|---------|---------|-----|
| Random activation | RNG frustration | Make deterministic |
| Too weak (< 20%) | Player won't notice | Use 20-30% |
| Category mismatch | Never triggers | Match stage categories |
| No trade-off | Obvious choice | Address different needs |
| Key skill too strong | Always correct choice | Keep 20-30% (weaker than normal) |

---

## Quality Checklist

### All Skills
- [ ] Unique IDs: `s{N}_normal_01`, etc.
- [ ] Names professional, thematic
- [ ] Descriptions use です/ます
- [ ] Magnitudes: 20-30% gain amplification

### Normal Skills
- [ ] 3 per stage
- [ ] Match stage theme
- [ ] **Verified triggers exist** (run simulation)
- [ ] Offer 1 creates meaningful choice
- [ ] Offer 2 complements Offer 1

### Key Skill
- [ ] ID from predefined list
- [ ] `category: "key"`, `isCollectible: true`
- [ ] `keySkillRequirement` points to Q7-B
- [ ] Has `adamComment`
- [ ] Effect weaker than normal (20-30%)
- [ ] Description: philosophical + mechanical
