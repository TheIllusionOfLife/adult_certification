# PR #5 Review Fixes Summary

**Date**: 2026-01-25
**Branch**: feature/stage1-redesign
**Commit**: f71c1fa
**Reviewers**: CodeRabbitAI, Gemini Code Assist, Claude

---

## Overview

Addressed all 17 issues from automated code review feedback, including 3 critical bugs, 1 high priority architecture issue, 8 medium priority improvements, and 5 low priority fixes.

---

## CRITICAL Issues Fixed (3)

### 1. Game-over choice doesn't force termination ✅ FIXED

**File**: `src/data/questions/nightmare.ts:540`
**Issue**: The "システムを破壊する（ゲームオーバー）" choice used `Autonomy: 999` which would increase it, not trigger game over.
**Root Cause**: Delta values are added to current state, so 0 deltas don't force termination.

**Fix**:
```diff
- "CS": 0,
- "Asset": 0,
- "Autonomy": 999
+ "CS": -1000000,
+ "Asset": -10000000,
+ "Autonomy": -1000000
```

**Impact**: Game-over choice now guarantees termination regardless of current state.

---

### 2. Damage reduction rounding over-amplifies reductions ✅ FIXED

**Files**: `src/data/skillEffects.ts:22, 40, 51`
**Issue**: `Math.ceil` on negative values rounds toward zero (e.g., -15 × 0.7 = -10.5 → -10), conflicting with test expectations (-11) and nullifying small damage.
**Root Cause**: Math.ceil behavior on negative numbers.

**Fix**:
```diff
- Autonomy = Math.ceil(reduced);
+ Autonomy = Math.floor(reduced);
```

**Applied to**:
- `autonomy_damage_reduction`
- `category_cs_damage_reduction`
- `autonomy_small_damage_reduction`

**Also changed**:
```diff
- skill.effect.threshold || -20
+ skill.effect.threshold ?? -20
```
To preserve valid zero thresholds.

**Impact**:
- -15 with 30% reduction now correctly becomes -11 (not -10)
- Small damage is no longer completely nullified unintentionally
- Aligns with documented behavior

---

### 3. Activation messages fire for non-applicable skills ✅ FIXED

**File**: `src/data/skillEffects.ts:59-111`
**Issue**: `getSkillActivationMessage` only compared totals, so skills with mismatched category/threshold could show "activated" when another skill changed the same stat.
**Root Cause**: Missing predicate checks in message generation.

**Fix**:
1. Renamed function to `getSkillActivations` returning structured data:
```typescript
export interface SkillActivation {
    skillName: string;
    description: string;
    originalValue: number;
    modifiedValue: number;
}
```

2. Added predicates matching `applySkillEffects` logic:
```typescript
case "admin_cost_reduction":
    // Only show if this is an ADMIN question with Asset cost
    if (question.category === "ADMIN" && originalEffect.Asset < 0 && ...) {
```

3. Updated caller in `gameEngine.ts` to pass `question` parameter

**Impact**: Skill activation messages now only show for actually applicable skills.

---

## HIGH Priority Fixed (1)

### 4. Hardcoded offer number logic is brittle ✅ FIXED

**File**: `src/ui/render.ts:329`
**Issue**: `idx === 2 ? 1 : 2` is hardcoded and breaks if `CONFIG.SKILL_OFFER_POSITIONS` changes.
**Root Cause**: Tight coupling to array indices.

**Fix**:
```diff
- const offerNumber = idx === 2 ? 1 : 2;
+ const offerNumber = (CONFIG.SKILL_OFFER_POSITIONS.indexOf(idx) + 1) as 1 | 2;
```

**Impact**: Offer number now automatically derives from CONFIG, preventing future breakage.

---

## MEDIUM Priority Fixed (8)

### 5. Locked choice text hard to read on dark background ✅ FIXED

**File**: `src/style.css:1041-1051`
**Issue**: `.choice-locked` kept dark text color on `#333` background (low contrast).

**Fix**:
```css
.choice-locked {
  color: #999 !important;  /* Added explicit light text */
}

.choice-locked:hover {
  background: #333 !important;  /* Prevent re-highlighting */
}
```

---

### 6. Key-skill button text inherits dark colors ✅ FIXED

**File**: `src/style.css:502-510`
**Issue**: `.key-skill-btn` uses dark gradient but text elements remained dark.

**Fix**:
```css
.key-skill-btn .skill-name {
    color: #ffd700 !important;
}

.key-skill-btn .skill-desc {
    color: #ccc !important;
}
```

---

### 7. DOM element IDs don't match parameter names ✅ FIXED

**Files**: `index.html:26,30`, `src/ui/render.ts:52-53`
**Issue**: IDs `score-money` and `score-sanity` don't match displayed labels "Asset" and "Autonomy".

**Fix**:
```diff
- <span id="score-money">
+ <span id="score-asset">

- <span id="score-sanity">
+ <span id="score-autonomy">

- asset: getEl<HTMLElement>('score-money'),
+ asset: getEl<HTMLElement>('score-asset'),

- autonomy: getEl<HTMLElement>('score-sanity'),
+ autonomy: getEl<HTMLElement>('score-autonomy'),
```

---

### 8. Skill effect logic violates separation of concerns ✅ FIXED

**Files**: `src/data/skillEffects.ts:59-111`, `src/logic/gameEngine.ts:77,83-87`, `src/ui/render.ts:253-269`
**Issue**: `getSkillActivationMessage` generated HTML strings in logic layer.

**Fix**:
1. Refactored to return structured data (`SkillActivation[]`)
2. Moved HTML formatting to `UIManager.showFeedback()`
3. Updated `processChoice` return type to include `skillActivations: SkillActivation[]`

**Impact**: Clean separation of concerns - logic layer returns data, UI layer formats HTML.

---

### 9. Sub-ending thresholds are hardcoded ✅ ALREADY RESOLVED

**Status**: Issue was already fixed in previous commit (ef0026b) which simplified rank calculation.

---

### 10. `persistent` property name is misleading ✅ FIXED

**Files**: `src/types.ts:49`, `src/data/stageMetadata.ts:47`
**Issue**: Name `persistent` doesn't reflect that it means "collectible for true ending" (effects don't persist across stages).

**Fix**:
```diff
- persistent?: boolean;
+ isCollectible?: boolean; // True for key skills that count toward True Ending unlock

- persistent: true,
+ isCollectible: true,
```

---

### 11. Testing documentation calculation error ✅ ALREADY CORRECT

**Status**: Documentation (-15 with 30% reduction = -11) is correct after Math.floor fix.
Calculation: -15 × 0.7 = -10.5 → Math.floor(-10.5) = -11 ✓

---

### 12. Unused export in deprecated file ✅ FIXED

**File**: `src/data/skills.ts:7-10`
**Issue**: `skills` export is unused (file marked deprecated).

**Fix**:
```typescript
/**
 * @deprecated This file is no longer used. Skills are now defined in stageMetadata.ts
 */
export const skills: Skill[] = [
```

---

## LOW Priority Fixed (5)

### 13. Typo in feedback text ✅ FIXED

**File**: `src/data/questions/expert.ts:135`
**Issue**: Extra punctuation and missing particle.

**Fix**:
```diff
- "貴族の遊び。、累進課税低い税率を..."
+ "貴族の遊び。累進課税の低い税率を..."
```

---

### 14. Bare URL in markdown ✅ FIXED

**File**: `STAGE1_IMPLEMENTATION_SUMMARY.md:205`
**Issue**: Plain text URL violates MD034.

**Fix**:
```diff
- http://localhost:5173/
+ <http://localhost:5173/>
```

---

### 15. Conflicting `.skill-info` definitions ✅ FIXED

**File**: `src/style.css:481-486,1153-1157`
**Issue**: Two `.skill-info` blocks with later one overriding earlier.

**Fix**:
- Removed second definition (lines 1153-1157)
- Merged `align-items: flex-start` into first definition

---

### 16. ADAM comment duplication ✅ FIXED

**File**: `src/data/adamDialogue.ts:47-57`
**Issue**: `getADAMCommentForEffect` repeated CS threshold logic from `getADAMComment`.

**Fix**:
```typescript
export function getADAMCommentForEffect(effect: { CS: number; Asset: number; Autonomy: number }): string {
    const { CS, Asset, Autonomy } = effect;

    // Check CS first (most important metric) - delegate to getADAMComment
    const csComment = getADAMComment(CS);
    if (csComment !== "処理完了です。") return csComment;

    // Check other metrics
    if (Autonomy <= -15) return "精神汚染を確認しました。ですが業務に支障はありません。";
    if (Asset <= -10000) return "資本主義への貢献、感謝します。";
    if (Asset >= 10000) return "不当利得……いえ、正当な報酬ですね。";

    return "処理完了です。";
}
```

---

### 17. Update deprecated effect type strings ✅ FIXED

**File**: `src/data/skills.ts:15,21`
**Issue**: Effect types used `passive_sanity` and `passive_money` instead of `passive_autonomy` and `passive_asset`.

**Fix**:
```diff
- effect: { type: "passive_sanity", value: 0.3 }
+ effect: { type: "passive_autonomy", value: 0.3 }

- effect: { type: "passive_money", value: 0.15 }
+ effect: { type: "passive_asset", value: 0.15 }
```

---

## Files Modified (12)

1. **STAGE1_IMPLEMENTATION_SUMMARY.md** - Fixed bare URL (#14)
2. **index.html** - Updated element IDs (#7)
3. **src/data/adamDialogue.ts** - Deduplicated CS logic (#16)
4. **src/data/questions/expert.ts** - Fixed typo (#13)
5. **src/data/questions/nightmare.ts** - Fixed game-over termination (#1)
6. **src/data/skillEffects.ts** - Fixed rounding (#2), added question param (#3), refactored HTML (#8)
7. **src/data/skills.ts** - Added @deprecated JSDoc (#12), updated effect types (#17)
8. **src/data/stageMetadata.ts** - Renamed persistent to isCollectible (#10)
9. **src/logic/gameEngine.ts** - Updated skill activation integration (#3, #8)
10. **src/style.css** - Fixed contrast (#5, #6), merged CSS (#15)
11. **src/types.ts** - Renamed persistent to isCollectible with comment (#10)
12. **src/ui/render.ts** - Derive offer number (#4), format HTML (#8), updated IDs (#7)

---

## Testing

### Build Status
```bash
npm run build
✅ PASS - No TypeScript errors
```

### Manual Testing Required
- [ ] Game-over choice triggers termination correctly
- [ ] Skill activation messages show only for applicable skills
- [ ] Damage reduction matches expectations (-15 → -11 with 30%)
- [ ] Locked choice text is readable on dark background
- [ ] Key skill button text is readable on dark gradient
- [ ] Skill offer number updates if CONFIG positions change

---

## Summary

✅ All 17 review issues systematically addressed
✅ 3 critical bugs fixed (game-over, rounding, activation messages)
✅ 1 high priority architecture improvement (dynamic offer number)
✅ 8 medium priority improvements (UX, architecture, semantics)
✅ 5 low priority fixes (typos, docs, cleanup)
✅ Build passes with no TypeScript errors
✅ Clean separation of concerns maintained
✅ All changes follow existing code style

**Ready for re-review and merge.**
