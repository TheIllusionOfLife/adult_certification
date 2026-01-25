# UI/UX Guidelines

**Version**: 1.0
**Date**: 2026-01-26
**Purpose**: Consolidated UI/UX standards and design decisions

---

## Table of Contents

1. [Parameter Display](#parameter-display)
2. [Stage System](#stage-system)
3. [Locked Choices](#locked-choices)
4. [A.D.A.M. UI Components](#adam-ui-components)
5. [Skill System UI](#skill-system-ui)
6. [Text & Terminology](#text--terminology)
7. [Layout & Alignment](#layout--alignment)

---

## Parameter Display

### Display Names (Japanese)

Always use Japanese display names in the UI:

| Internal Name | Display Name | Location |
|--------------|--------------|----------|
| CS | 信用度 | HUD, feedback, stats |
| Asset | 資産 | HUD, feedback, stats |
| Autonomy | 自律性 | HUD, feedback, stats |

**Do NOT use**:
- ❌ "CS", "Asset", "Autonomy" in player-facing UI
- ❌ Mixed formats like "信用度(CS)"

### Value Formatting

- **CS**: Plain number (e.g., "50", "+30", "-20")
- **Asset**: With comma and 円 (e.g., "100,000", "+50,000", "-30,000")
- **Autonomy**: Plain number (e.g., "50", "+10", "-15")

---

## Stage System

### Progressive Unlock

Stages unlock progressively - only show stages the player can access:

```
Stage 1: Always visible
Stage 2: Visible after Stage 1 beaten (any rank)
Stage 3: Visible after Stage 2 beaten
...
Stage 10: Visible after Stage 9 beaten
```

**Implementation**:
- Check `records[Stage{N-1}]` exists to determine if Stage N is visible
- Do NOT show locked stages with a lock icon
- Simply don't render stages that aren't unlocked yet

### Rank Display

Show earned rank stamp on completed stages:

| Rank | Color | Threshold |
|------|-------|-----------|
| S | Gold (#fbc02d) | CS ≥ 80 |
| A | Red (#d32f2f) | CS ≥ 50 |
| B | Blue (#1976d2) | CS ≥ 20 |
| C | Gray (#757575) | CS ≥ 1 (cleared) |

### Title Screen Text

```
オールSで立派な大人になろう
```

---

## Locked Choices

### Lock Message Format

Use simple Japanese, NOT technical format:

**✅ Correct**:
```
自律性が30以上必要
資産が100,000円以上必要
信用度が50以上必要
```

**❌ Wrong**:
```
LOCKED: Autonomy >= 30 必要 - 自律性が低く...
LOCKED: Asset >= 100,000円 必要
```

### Lock Behavior

Locked choices are **completely unselectable**:
- Grayed out with strikethrough text
- 🔒 icon displayed
- **No click handler** - clicking does nothing
- No ACCESS DENIED popup screen

### Lock Visual Design

```css
.choice-locked {
  opacity: 0.6;
  cursor: not-allowed;
  background: dark gradient;
  border: 2px solid #ff3232;
}

.choice-locked .choice-text {
  color: #666;
  text-decoration: line-through;
}
```

---

## A.D.A.M. UI Components

### Comment Section Design

Used for A.D.A.M. dialogue in overlays (feedback, stage complete, terminated):

```css
.adam-comment-section {
  display: flex;
  flex-direction: row;
  align-items: center;        /* Image vertically centered */
  gap: 14px;
  padding: 16px 18px;
  background: #1a1a1a;
  border-radius: 4px;
  border-left: 4px solid var(--accent-color);  /* Yellow accent */
  max-width: 420px;
  margin: auto;
}

.adam-comment-img {
  width: 48px;
  height: 48px;
}

.adam-comment-text {
  font-size: 0.95em;
  color: #e0e0e0;
  text-align: left;
}
```

**Key Design Decisions**:
- Horizontal layout (image left, text right)
- Dark background (#1a1a1a), NOT cream/paper style
- Yellow accent border on left (brand color)
- Image vertically centered with text
- Left-aligned text

### When to Show A.D.A.M. Image

- ✅ Stage complete screen (with ending comment)
- ✅ TERMINATED screen (with judgment)
- ✅ Key skill acquisition (special comment)
- ❌ Regular answer feedback (commented out for smoother flow)

### A.D.A.M. Feedback Dialogue

The repetitive "処理完了です" dialogue after each answer was **commented out** for smoother gameplay flow. A.D.A.M. only speaks at:
- Stage intro
- Key skill offer/acquisition
- Stage complete
- TERMINATED

---

## Skill System UI

### A.D.A.M. Recommendation System

Some skills have `isRecommended: true` field:

```typescript
{
    id: "s1_normal_02",
    name: "節約マインド",
    isRecommended: true,  // A.D.A.M. recommends this
    ...
}
```

**Philosophy**:
- A.D.A.M. recommends "practical" skills (protect CS/Asset)
- Non-recommended skills protect Autonomy (hidden True Ending resource)
- Creates tension: trust A.D.A.M.'s recommendation vs protect Autonomy

### Skill Selection Title

Simple format:
```
スキル選択
```

**Do NOT use**:
- ❌ "スキル選択 (1/2)"
- ❌ "SKILL SELECTION"

### Key Skill Display

Key skills should NOT show:
- ❌ "KEY SKILL" badge
- ❌ "真エンド条件" text
- ❌ "Q7で選択肢Bを選ぶ必要があります" (if disabled)

Key skills look similar to normal skills but with subtle differentiation through the acquisition system (earned via Q7 behavior).

### Skill Effect Wording

Use "減少" not "ダメージ":

**✅ Correct**:
```
全ての自律性減少を30%軽減します。
全ての資産減少を30%軽減します。
全ての信用度低下を50%軽減します。
```

**❌ Wrong**:
```
全ての自律性ダメージを30%軽減します。
```

---

## Text & Terminology

### Key Skill Naming

| ID | Japanese Name | English Meaning |
|----|--------------|-----------------|
| MEDIATION | 仲介術 | Mediation technique |

**Note**: Changed from "SOCIAL_CALIBRATION/社会較正" because "社会較正" is not natural Japanese.

### General Japanese Text Guidelines

- Use polite form (です/ます) for A.D.A.M. dialogue
- Use natural Japanese, avoid direct English translations
- Prefer 漢字 over カタカナ where appropriate (大人 not オトナ)

---

## Layout & Alignment

### Choice Button Text

- **Left-aligned** for all choice text
- Multi-line text should wrap naturally, left-aligned
- Do NOT center choice text

```css
.choice-btn > span:not(.choice-letter) {
  display: block;
  text-align: left;
  line-height: 1.4;
}
```

### Stat Display

- Centered in HUD
- Vertical stack: label on top, value below
- No English abbreviations

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-26 | Initial guidelines from session learnings |

---

**These guidelines ensure consistency across the game's UI. Always reference this document when implementing new features or fixing UI issues.**
