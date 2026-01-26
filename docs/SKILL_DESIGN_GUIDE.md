# Skill Design Guide

**Version**: 2.0 | **Date**: 2026-01-26

---

## Overview

| Type | Count/Stage | Persistence | Purpose |
|------|-------------|-------------|---------|
| Normal | 3 | Stage-only | Tactical advantages |
| Key | 1 | Collectible | True Ending unlock (need 9/9) |

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
| Damage reduction | 20-50% | Below 20% invisible, above 50% trivializing |
| Cost reduction | ¥5k-20k | Based on typical costs (10k-50k) |

---

## Key Skills (Predefined)

| Stage | ID | Name | Core Learning |
|-------|-----|------|---------------|
| 1 | MEDIATION | 仲介術 | Using systems to avoid conflict |
| 2 | EVIDENCE_CHAIN | 証拠連鎖 | Recording prevents disputes |
| 3 | COMPOUND_SENSE | 複利感覚 | Understanding compound interest |
| 4 | DUE_PROCESS | 手続き主義 | Navigating bureaucracy |
| 5 | SAFETY_NET_NAVIGATION | セーフティネット航法 | Accessing safety nets |
| 6 | NEGOTIATION_PROTOCOL | 交渉プロトコル | Third-party negotiation |
| 7 | CONTRACT_LITERACY | 契約読解 | Reading before signing |
| 8 | IDENTITY_HYGIENE | 本人性衛生 | Protecting digital identity |
| 9 | DAMAGE_CONTROL | 被害最小化 | Minimizing crisis damage |

### Structure
```typescript
{
    id: "{KEY_SKILL_NAME}",      // ALL_CAPS from list
    name: "{日本語名}",           // 2-4 kanji
    nameEN: "{KEY_SKILL_NAME}",
    desc: "{哲学的説明 + 効果説明}",
    effect: { type: "...", value: 0.2-0.3 },  // Weaker than normal
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
"……{skill concept}。{A.D.A.M.'s judgment}。"

Example: "……あなたは『システムを理解しながら、自我を保つ』術を習得しました。厄介ですね。"
```

---

## Effect Types

### 1. autonomy_damage_reduction
Reduces all Autonomy damage by percentage.
```typescript
effect: { type: "autonomy_damage_reduction", value: 0.3-0.5 }
// -20 Autonomy → -14 Autonomy (at 0.3)
```

### 2. category_cs_damage_reduction
Reduces CS damage for specific category.
```typescript
effect: { type: "category_cs_damage_reduction", category: "LABOR", value: 0.3 }
// LABOR question: -30 CS → -21 CS
```

### 3. category_autonomy_damage_reduction
Reduces Autonomy damage for specific category.
```typescript
effect: { type: "category_autonomy_damage_reduction", category: "SOCIAL", value: 0.4 }
```

### 4. asset_damage_reduction / cs_damage_reduction
Universal damage reduction.
```typescript
effect: { type: "asset_damage_reduction", value: 0.3 }
```

### 5. *_gain_amplification
Amplifies gains (not losses).
```typescript
effect: { type: "autonomy_gain_amplification", value: 0.2 }
// +15 Autonomy → +18 Autonomy
```

**Categories**: ADMIN, FINANCE, SEC, LABOR, SOCIAL, HOUSING, TAX, LEGAL, MANNER, HEALTH, CAREER

---

## Skill Uniqueness

**All skills must be unique in BOTH name AND effect across all stages.**

Already used:
- Stage 1: メンタルシールド, 節約マインド, 印象操作, MEDIATION
- Stage 2: 交渉術, 報連相の型, 労働法知識, EVIDENCE_CHAIN

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

### Pairing Strategy

**Offer 1**: Different parameter protection (Autonomy vs Asset vs CS)

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
| Too weak (< 20%) | Player won't notice | Use 20-50% |
| Category mismatch | Never triggers | Match stage categories |
| No trade-off | Obvious choice | Address different needs |
| Key skill too strong | Always correct choice | Keep 20-30% (weaker than normal) |

---

## Quality Checklist

### All Skills
- [ ] Unique IDs: `s{N}_normal_01`, etc.
- [ ] Names professional, thematic
- [ ] Descriptions use です/ます
- [ ] Magnitudes: 20-50% or ¥5k-20k

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
