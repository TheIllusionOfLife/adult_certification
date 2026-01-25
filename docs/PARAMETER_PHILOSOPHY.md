# Parameter Philosophy

**Version**: 1.0
**Date**: 2026-01-25
**Purpose**: Design principles for the three-parameter system

---

## Core Design Philosophy

The game uses three parameters, each with a distinct role in gameplay and narrative:

### CS (Credit Score) - Objective Resource
**Role**: Primary scoring metric
**Player Goal**: Maximize to achieve S rank
**Design Intent**: Represents societal conformity and "playing the game right"

**Characteristics**:
- Most visible resource (players actively try to increase it)
- Determines rank (S/A/B/C)
- Game over if ≤ 0 (but rare in normal gameplay)
- Clearly "good to have more"

**Teaching Method**: Direct feedback ("correct answer" gives +CS, "wrong answer" gives -CS)

---

### Asset - Supportive Resource
**Role**: Enables access to higher-scoring choices
**Player Goal**: Maintain enough to unlock better options
**Design Intent**: Represents economic capital as gate to opportunities

**Characteristics**:
- **Unlocks choices** via locks (e.g., "Asset >= 100,000円 required")
- Not directly scored, but enables paths to higher CS
- Game over if ≤ 0 (encourages resource management)
- **"Money opens doors"** metaphor

**Teaching Method**:
- Stage 1: Introduce Asset lock (Q8 - buying interview suit)
- Show that Asset gates access to better outcomes
- Players learn: "Keep Asset healthy or lose opportunities"

**Lock Example (Stage 1 Q8)**:
```typescript
{
    text: "新しいスーツと靴を購入して、万全の状態で臨む。",
    effect: { CS: 40, Asset: -30000, Autonomy: 10 },
    lockRequirements: { Asset: 100000 },
    lockedFeedback: "資産が100,000円以上必要"
}
```

---

### Autonomy - Hidden Critical Resource
**Role**: The "true" resource for reaching True Ending
**Player Goal**: Initially unclear, revealed as crucial later
**Design Intent**: Represents self-determination and resistance to conformity

**Characteristics**:
- **Non-remarkable at first** (players may not notice its importance)
- Actually **the key resource** for True Ending
- Game over if ≤ 0 (teaches consequences of passivity)
- Often inversely related to CS (dilemmas: high CS vs high Autonomy)
- Required for key skill collection (need 9/9 key skills for True Ending)

**Teaching Method**:
- Stage 1: Show Autonomy gates choices (Q6, Q7 locks)
- Demonstrate trade-offs (Q5: CS+30/-15 Autonomy vs Autonomy+20)
- Reveal importance gradually across stages
- True purpose revealed at Stage 10

**Lock Example (Stage 1 Q7)**:
```typescript
{
    text: "管理会社に連絡し、「匿名で」注意してもらう。",
    effect: { CS: 30, Asset: 0, Autonomy: 15 },
    lockRequirements: { Autonomy: 20 },
    lockedFeedback: "自律性が20以上必要"
}
```

---

## Stage 1: Onboarding Design

### Teaching All Three Parameters

**Q8 (Asset Lock)**:
- First and only Asset lock in Stage 1
- Clear cause-effect: "No money → can't buy suit → can't access better choice"
- Teaches: Asset is a supportive resource that enables opportunities

**Q6, Q7 (Autonomy Locks)**:
- Multiple Autonomy locks to emphasize this parameter
- Teaches: Autonomy = breadth of choices
- Shows trade-offs between CS and Autonomy

**No CS Locks in Stage 1**:
- CS is straightforward (higher is better)
- Doesn't need lock demonstration
- Players naturally understand via scoring

### Parameter Introduction Strategy

**Gradual Complexity**:
1. **Stage 1**: Autonomy locks (primary) + 1 Asset lock (introduction)
2. **Stage 2+**: More complex combinations (CS + Asset, all three, etc.)
3. **Stage 5+**: Philosophical dilemmas (CS vs Autonomy trade-offs)
4. **Stage 10**: True Ending unlock (requires high Autonomy history via key skills)

---

## Lock Design Principles

### When to Use Each Lock Type

**Asset Locks**:
- Use when choice requires economic investment
- Examples: Buying equipment, paying fees, making investments
- Represents: "Money opens doors"

**Autonomy Locks**:
- Use when choice requires self-confidence or independence
- Examples: Standing up to authority, asking for help, making bold decisions
- Represents: "Courage to act"

**CS Locks** (Stage 2+):
- Use when choice requires social credibility or status
- Examples: Accessing networks, being taken seriously, having reputation
- Represents: "Social capital opens doors"

**Combined Locks** (Stage 3+):
- Use when choice requires multiple resources
- Example: Autonomy + Asset (independent action that costs money)
- Represents: "Real opportunities require multiple forms of capital"

---

## Balance Guidelines

### Asset Balance (Starting: 100,000 yen)

**Stage 1 Range**:
- Best path: 95,000 - 120,000 yen
- Worst path: 95,000 - 100,000 yen
- Q8 lock threshold: 100,000 yen

**Design Goals**:
- Q5 choice (-5,000 for friends) should matter
- Players who skip Q4 bonus (+20,000) can still survive but face consequences
- Lock threshold at starting value (100,000) creates tension

**Future Stages**:
- Gradually increase costs and stakes
- Introduce larger Asset penalties
- Make Asset management more critical

---

### Autonomy Balance (Starting: 50)

**Stage 1 Range**:
- Best path: 105 Autonomy (all active choices)
- Worst path: 5 Autonomy (all passive choices)
- Lock thresholds: 20, 30

**Design Goals**:
- Show clear consequences of passivity
- Allow recovery if player course-corrects
- Demonstrate trade-offs (Q5: work gives -15, friends gives +20)

**Lock Cascade**:
- Intentional: Sustained passivity leads to lockout
- Fair: Single "wrong" choice doesn't doom player
- Example: Q5 work (-15) → still 35 Autonomy → all locks still available

---

### CS Balance (Starting: 50)

**Stage 1 Range**:
- Best path: 80+ CS (S rank)
- Worst path: 20-40 CS (C/B rank)
- No locks in Stage 1

**Design Goals**:
- Players can achieve S rank with good choices
- Rank distribution reflects player skill
- Game over (CS ≤ 0) requires catastrophic failure

---

## Philosophical Summary

### The Three-Parameter System Metaphor

**CS = Society's Approval**
"How well are you playing by the rules?"

**Asset = Economic Capital**
"Do you have the resources to access opportunities?"

**Autonomy = Self-Determination**
"Can you make your own choices, or are you a passive victim?"

### True Ending Philosophy

The True Ending requires:
- Collecting 9/9 key skills (demonstrating high Autonomy across all stages)
- Understanding that conformity (high CS) isn't the only path
- Recognizing Autonomy as the "hidden" critical resource

**Narrative Message**:
"The system rewards conformity (CS), but true freedom requires autonomy. Those who never question the rules never reach the true ending."

---

## Implementation Notes

### For Future Stage Designers

1. **Always include at least one lock type** to maintain mechanical variety
2. **Asset locks should have clear economic logic** (buying, investing, paying)
3. **Autonomy locks should have clear psychological logic** (courage, independence)
4. **CS locks (Stage 2+) should have clear social logic** (reputation, status)
5. **Lock thresholds should create tension** (achievable but not trivial)
6. **Lock safety rule**: At least ONE choice must always be available (lockRequirements: null)

### Testing Locks

Before finalizing a stage:
1. Trace best path (all optimal choices)
2. Trace worst path (all suboptimal choices)
3. Verify no complete lockouts (lock safety)
4. Verify locks create meaningful decisions (not arbitrary)
5. Verify lock feedback explains WHY choice is locked

---

## Examples

### Good Asset Lock (Stage 1 Q8)
```typescript
text: "新しいスーツと靴を購入して、万全の状態で臨む。"
lockRequirements: { Asset: 100000 }
lockedFeedback: "資産が100,000円以上必要"
```
✅ Clear economic logic (buying costs money)
✅ Threshold at starting value (100k) creates tension
✅ Feedback explains reason clearly

### Good Autonomy Lock (Stage 1 Q7)
```typescript
text: "管理会社に連絡し、「匿名で」注意してもらう。"
lockRequirements: { Autonomy: 20 }
lockedFeedback: "自律性が20以上必要"
```
✅ Clear psychological logic (requires confidence to use systems)
✅ Low threshold (20) allows recovery
✅ Feedback explains psychological state

### Bad Lock Example ❌
```typescript
text: "建設的な指摘をする。"
lockRequirements: { Asset: 100000 }
lockedFeedback: "資産が100,000円以上必要"
```
❌ No economic logic (why does speaking require money?)
❌ Lock doesn't make narrative sense
❌ Feels arbitrary

---

## Conclusion

The three-parameter system creates a game where:
- **CS** is the obvious goal (society's scorecard)
- **Asset** is the supportive tool (enables opportunities)
- **Autonomy** is the hidden truth (the real path to freedom)

This design teaches players about systems, conformity, and the hidden costs of following rules without question.

**Remember**: Locks aren't just mechanics—they're narrative tools that show how different forms of capital (social, economic, psychological) gate access to choices in adult life.
