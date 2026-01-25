# Production Guide: Stages 2-10

**Version**: 1.0
**Date**: 2026-01-25
**Status**: Production Ready

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Stage Creation Workflow](#stage-creation-workflow)
3. [File Structure](#file-structure)
4. [Templates Reference](#templates-reference)
5. [Quality Checklist](#quality-checklist)
6. [Testing Protocol](#testing-protocol)
7. [Common Pitfalls](#common-pitfalls)

---

## Quick Start

### Prerequisites

Before creating a new stage, ensure you have:
- ✅ Read `improvement_plan_2026-01-24_integrated.md` (sections 3-6)
- ✅ Studied Stage 1 implementation (`src/data/stages/stage1.ts`)
- ✅ Read `QUESTION_DESIGN_GUIDE.md`
- ✅ Read `SKILL_DESIGN_GUIDE.md`

### Time Estimates

| Task | Time | Notes |
|------|------|-------|
| Stage planning | 1-2 hours | Define theme, key skill, question topics |
| Question writing | 3-4 hours | 10 questions with all fields |
| Skill design | 1 hour | 4 skills (3 normal + 1 key) |
| A.D.A.M. dialogue | 1 hour | Intro, mid-stage, outro, teaser |
| Image generation | 2-3 hours | 5-10 images (user responsibility) |
| Testing | 1-2 hours | Full playthrough + edge cases |
| **Total** | **9-13 hours** | Per stage |

---

## Stage Creation Workflow

### Phase 1: Planning (1-2 hours)

#### Step 1.1: Define Stage Theme

Reference the improvement plan section 3.1 for the 10 stage themes:

| Stage | Theme | Focus Area |
|-------|-------|-----------|
| 1 | 社会の基本 | Email, ID, moving, first trap |
| 2 | 仕事の基礎 | Building trust, harassment |
| 3 | 金の基礎 | Credit cards, installments, scams |
| 4 | 税金 | Year-end adjustment, filing, tax bombs |
| 5 | 社会保険 | Unemployment, disability, pension |
| 6 | 住まい | Original state recovery, moving traps |
| 7 | 契約・法律 | Cooling-off, guarantees, settlements |
| 8 | デジタル安全 | 2FA, SIM swap, phishing |
| 9 | 危機対応 | Disasters, insurance, medical costs |
| 10 | 最終審判 | Complex accident + A.D.A.M. dialogue |

#### Step 1.2: Identify Key Skill

Each stage has exactly **one key skill** from the list of 9:

| Stage | Key Skill | Japanese Name | Core Learning |
|-------|-----------|---------------|---------------|
| 2 | EVIDENCE_CHAIN | 証拠連鎖 | Recording evidence prevents disputes |
| 3 | COMPOUND_SENSE | 複利感覚 | Understanding compound interest/fees |
| 4 | DUE_PROCESS | 手続き主義 | Navigating bureaucracy and deadlines |
| 5 | SAFETY_NET_NAVIGATION | セーフティネット航法 | Accessing social safety nets |
| 6 | NEGOTIATION_PROTOCOL | 交渉プロトコル | Using third parties for negotiation |
| 7 | CONTRACT_LITERACY | 契約読解 | Reading contracts before signing |
| 8 | IDENTITY_HYGIENE | 本人性衛生 | Protecting digital identity |
| 9 | DAMAGE_CONTROL | 被害最小化 | Minimizing damage in crises |

#### Step 1.3: Outline 10 Questions

Use the fixed structure from improvement plan section 4.1:

```
Q1: 導入 (Introduction) - Introduce theme with scenario
Q2: 基礎 (Foundation) - Test basic knowledge/safety
Q3: 小分岐 (Small Branch) - Character-defining choice
    └ SKILL OFFER 1 (after Q3) - 2 normal skills
Q4: 収束 (Convergence) - Same Q, reactions vary by params
Q5: 山場 (Climax) - TRUE DILEMMA ★ (no perfect answer)
Q6: 因果① (Consequence 1) - Locked choices demonstrate inequality
Q7: 鍵スキル (Key Skill) - Question leading to key skill ★
    └ SKILL OFFER 2 (after Q7) - 1 normal + 1 key skill
Q8: 因果② (Consequence 2) - Skills visibly affect outcomes
Q9: 鏡合わせ (Mirror) - Revisit theme from different angle
Q10: Final - Philosophical reflection + next stage foreshadowing
```

**Planning Checklist:**
- [ ] Theme aligns with improvement plan
- [ ] Key skill identified and makes sense for theme
- [ ] Question topics cover 40% knowledge, 40% dilemma, 20% philosophy
- [ ] At least 2 questions will have locked choices (Q6, Q7 recommended)
- [ ] Q5 is a TRUE dilemma (both choices defensible)
- [ ] Q7 leads naturally to key skill acquisition

---

### Phase 2: File Creation (30 minutes)

#### Step 2.1: Create Stage File

Copy template:
```bash
cp src/data/stages/stage1.ts src/data/stages/stage{N}.ts
```

Update file header:
```typescript
// Stage {N}: {Theme in Japanese}
// Theme: {Theme in English}
// Key Skill: {KEY_SKILL_NAME}

import type { Question } from '../../types';

export const STAGE_{N}_QUESTIONS: Question[] = [
    // Questions go here
];
```

#### Step 2.2: Add Stage Metadata

Open `src/data/stageMetadata.ts` and add:

```typescript
export const STAGE_{N}_METADATA: StageMetadata = {
    id: {N},
    theme: "{English Theme}",
    themeJP: "{日本語テーマ}",
    keySkillId: "{KEY_SKILL_NAME}",
    initialParams: { CS: 50, Asset: 100000, Autonomy: 50 }, // Adjust if needed
    rankThresholds: {
        S: { CS: 80 },
        A: { CS: 60 },
        B: { CS: 40 },
        C: { CS: 20 }
    },
    skills: {
        offer1: [
            // Two normal skills (defined in Step 3)
        ],
        offer2: [
            // One normal skill + one key skill (defined in Step 3)
        ]
    }
};
```

#### Step 2.3: Add A.D.A.M. Dialogue Section

Open `src/data/adamDialogue.ts` and add:

```typescript
stage{N}: {
    intro: [
        "【監査ログ起動】",
        "[A.D.A.M.]: Stage {N}のテーマは『{Theme}』です。",
        // Stage-specific intro (3-5 lines)
    ],
    midStage: {
        high_cs: "Positive comment about compliance",
        low_cs: "Warning about rebellious thinking",
        balanced: "Neutral processing confirmation"
    },
    keySkillOffered: [
        // Warning before key skill offer
    ],
    keySkillAcquired: [
        // Commentary when key skill acquired
    ],
    outro: {
        S: "S rank commentary",
        A: "A rank commentary",
        B: "B rank commentary",
        C: "C rank commentary"
    },
    nextStageTeaser: "次のStage {N+1}では『{Next Theme}』を審査します。..."
}
```

---

### Phase 3: Question Writing (3-4 hours)

For each question, follow the **QUESTION_DESIGN_GUIDE.md** and use templates from **Templates Reference** section below.

**Key Principles:**
1. **Always 2 choices** (except Stage 10 Q10 which has 3)
2. **At least one choice always available** (lock safety)
3. **Effects add up to reasonable range** (see Parameter Guidelines)
4. **Feedback explains consequences** (not just "correct/wrong")
5. **A.D.A.M. dialogue maintains 丁寧語** (です/ます form)

**Question Type Distribution (10 questions total):**
- Knowledge: ~4 questions (Q1, Q2, Q4, Q8)
- Dilemma: ~4 questions (Q3, Q5, Q6, Q9)
- Philosophy: ~2 questions (Q7, Q10)

See **QUESTION_DESIGN_GUIDE.md** for detailed writing instructions.

---

### Phase 4: Skill Design (1 hour)

#### Step 4.1: Design 3 Normal Skills

For Offer 1 (after Q3), create 2 normal skills:
- One should address a common problem in this stage
- One should provide alternative strategy

For Offer 2 (after Q7), create 1 normal skill:
- Should complement (not duplicate) Offer 1 skills
- Should be relevant to Q8-Q10

**Available Effect Types:**
1. `autonomy_damage_reduction` - Reduces all Autonomy damage by %
2. `admin_cost_reduction` - Reduces Asset cost for ADMIN category by amount
3. `category_cs_damage_reduction` - Reduces CS damage for specific category by %
4. `autonomy_small_damage_reduction` - Reduces small Autonomy damage by %

See **SKILL_DESIGN_GUIDE.md** for balancing guidelines.

#### Step 4.2: Design Key Skill

Key skill is pre-defined in improvement plan. Your job:
1. Write compelling Japanese description
2. Design appropriate effect (usually 20-30% reduction)
3. Write A.D.A.M. comment for acquisition
4. Ensure Q7 leads naturally to this skill

**Key Skill Template:**
```typescript
{
    id: "{KEY_SKILL_NAME}",
    name: "{日本語名}",
    nameEN: "{KEY_SKILL_NAME}",
    desc: "{詳細な説明（です/ます調）}",
    effect: { type: "{effect_type}", value: {0.2-0.3}, /* other params */ },
    category: "key",
    isCollectible: true,
    acquiredStage: {N},
    adamComment: "……{皮肉なコメント（です/ます調）}"
}
```

---

### Phase 5: Image Generation (2-3 hours, user responsibility)

#### Step 5.1: Write Image Prompts

For each question, write image prompt using base style:

**Base Style Template:**
```
1930s rubber hose animation style, Fleischer Studios aesthetic,
vintage cartoon noir, high contrast black and white with selective
color accents, bold ink outlines, exaggerated expressions,
Cuphead-inspired, dark humor, dystopian mood, hand-drawn feel
with intentional imperfections
```

**Prompt Structure:**
```
[BASE STYLE], [MAIN SUBJECT/SCENE], [EMOTIONAL TONE],
[COMPOSITION DETAILS], [LIGHTING/ATMOSPHERE]
```

**Example from Stage 1 Q5:**
```
[BASE STYLE], split scene composition: left side warm cozy gathering
with smiling friends holding drinks in soft orange glow, right side
cold blue spotlight on lonely figure at desk buried in documents
with laptop, ominous wall clock ticking dramatically between scenes
showing time pressure, both paths visualized as equally valid but
conflicting, exaggerated emotional expressions showing internal conflict
```

See **IMAGE_GENERATION_WORKFLOW.md** for step-by-step process.

#### Step 5.2: Generate Images

**Recommended Tools:**
- Stable Diffusion (best control)
- Midjourney (best quality)
- DALL-E 3 (easiest to use)

**Specifications:**
- Resolution: 1024x1024 (square)
- Format: PNG
- Naming: `s{N}_q{YY}.png` (e.g., `s2_q05.png`)
- Location: `src/assets/`

**Quality Check:**
- [ ] Style matches base template
- [ ] Scene conveys question's dilemma/situation
- [ ] Mood appropriate (dark humor, not too serious)
- [ ] No text/words in image (except intentional glitches for Stage 10)
- [ ] File size < 2MB

#### Step 5.3: Integrate Images

Update question `imagePath` fields:
```typescript
imagePath: "s{N}_q{YY}.png"
```

Vite will automatically bundle images from `src/assets/`.

---

### Phase 6: Testing (1-2 hours)

Follow **Testing Protocol** section below.

---

## File Structure

### Files You'll Modify

```
src/
├── assets/
│   └── s{N}_q{YY}.png           # NEW: Your generated images (5-10 files)
├── data/
│   ├── stages/
│   │   └── stage{N}.ts          # NEW: Your 10 questions
│   ├── stageMetadata.ts         # MODIFY: Add STAGE_{N}_METADATA
│   └── adamDialogue.ts          # MODIFY: Add stage{N} dialogue
└── main.ts                      # MODIFY: Add stage to selection (later)
```

### Files You Won't Modify

```
src/
├── logic/gameEngine.ts          # ✅ Already stage-agnostic
├── ui/render.ts                 # ✅ Already handles all systems
├── types.ts                     # ✅ Already has all interfaces
├── config.ts                    # ✅ May need if changing constants
└── data/skillEffects.ts         # ✅ Already has effect implementations
```

---

## Templates Reference

### Question Template (Annotated)

```typescript
{
    id: "s{N}_q{YY}",                          // Stage number + question number (01-10)
    category: "{CATEGORY}",                     // ADMIN, FINANCE, SEC, LABOR, SOCIAL, HOUSING, TAX, LEGAL, MANNER, HEALTH
    text: "{問題文（状況設定）}",              // 2-3 sentences, present a scenario
    imagePrompt: "{Base style + scene description}", // For image generation
    imagePath: "s{N}_q{YY}.png",               // Will be generated separately
    choices: [
        {
            text: "{選択肢A（具体的な行動）}",  // What player chooses to do
            effect: {                           // Parameter changes (see guidelines below)
                CS: {-30 to +40},               // Credit Score change
                Asset: {-50000 to +50000},      // Asset change (yen)
                Autonomy: {-30 to +20}          // Autonomy change
            },
            feedback: "{結果の説明（です/ます調）}", // Explain consequences (2-3 sentences)
            lockRequirements: null              // Or { CS: X, Asset: Y, Autonomy: Z }
        },
        {
            text: "{選択肢B（具体的な行動）}",
            effect: {
                CS: {-30 to +40},
                Asset: {-50000 to +50000},
                Autonomy: {-30 to +20}
            },
            feedback: "{結果の説明（です/ます調）}",
            lockRequirements: { Autonomy: 30 }  // Example: requires Autonomy >= 30
        }
    ],
    adamDialogue: {
        intro: "{A.D.A.M.の導入コメント（です/ます調）}", // Optional
        after: "{A.D.A.M.の終了コメント（です/ます調）}"  // Optional
    }
}
```

### Knowledge Question Template

```typescript
{
    id: "s{N}_q{YY}",
    category: "{CATEGORY}",
    text: "{状況を提示し、正しい対応を問う}",
    imagePrompt: "{Person facing bureaucratic/technical challenge}",
    imagePath: "s{N}_q{YY}.png",
    choices: [
        {
            text: "{間違った/危険な対応}",
            effect: { CS: -20, Asset: -10000, Autonomy: -5 },
            feedback: "{なぜ間違いか説明。正しい知識を提示。}",
            lockRequirements: null  // Wrong answer always available
        },
        {
            text: "{正しい対応（知識に基づく）}",
            effect: { CS: +30, Asset: 0, Autonomy: +10 },
            feedback: "{なぜ正しいか説明。補足知識を提供。}",
            lockRequirements: null  // Correct answer always available
        }
    ]
}
```

### Dilemma Question Template

```typescript
{
    id: "s{N}_q{YY}",
    category: "{CATEGORY}",
    text: "{2つの価値観が対立する状況}",
    imagePrompt: "{Split scene or crossroads showing both paths}",
    imagePath: "s{N}_q{YY}.png",
    choices: [
        {
            text: "{価値観A（例：人間関係優先）}",
            effect: { CS: 0, Asset: -5000, Autonomy: +20 },
            feedback: "{この選択の正当性と代償を説明}",
            lockRequirements: null  // Both should be available in true dilemma
        },
        {
            text: "{価値観B（例：仕事優先）}",
            effect: { CS: +30, Asset: 0, Autonomy: -15 },
            feedback: "{この選択の正当性と代償を説明}",
            lockRequirements: null  // Unless testing specific parameter requirement
        }
    ],
    adamDialogue: {
        intro: "価値観の選択です。正解は存在しません。"
    }
}
```

### Locked Choice Question Template

```typescript
{
    id: "s{N}_q{YY}",
    category: "{CATEGORY}",
    text: "{パラメータが足りないと選べない状況}",
    imagePrompt: "{Scene showing disparity or locked door metaphor}",
    imagePath: "s{N}_q{YY}.png",
    choices: [
        {
            text: "{弱い選択肢（妥協案）}",
            effect: { CS: -10, Asset: 0, Autonomy: -20 },
            feedback: "{妥協の結果。なぜ理想的でないか説明。}",
            lockRequirements: null  // ⚠️ ALWAYS available (safety rule)
        },
        {
            text: "{強い選択肢（理想的だがコストor要件付き）}",
            effect: { CS: +20, Asset: -30000, Autonomy: +10 },
            feedback: "{理想的な結果。なぜこれが最善か説明。}",
            lockRequirements: { Asset: 30000 },  // Example: need money to afford
            lockedFeedback: "LOCKED: Asset >= 30,000必要 - 資産が足りず、この選択肢は取れません。"
        }
    ],
    adamDialogue: {
        intro: "現実を見せます。選択の自由は幻想です。"
    }
}
```

### Philosophy Question Template

```typescript
{
    id: "s{N}_q10",  // Usually Q7 or Q10
    category: "SOCIAL",
    text: "{このステージのテーマについての哲学的問い}",
    imagePrompt: "{Abstract or symbolic representation of theme}",
    imagePath: "s{N}_q10.png",
    choices: [
        {
            text: "{服従寄りの回答}",
            effect: { CS: +30, Asset: 0, Autonomy: -20 },
            feedback: "{この回答が示す価値観とその意味}",
            lockRequirements: null
        },
        {
            text: "{自律寄りの回答}",
            effect: { CS: +10, Asset: 0, Autonomy: +20 },
            feedback: "{この回答が示す価値観とその意味}",
            lockRequirements: null
        }
    ],
    adamDialogue: {
        intro: "最終問題です。あなたの本質を見せてください。",
        after: "Stage {N}を終了します。審査結果を算出中..."
    }
}
```

---

## Quality Checklist

### Stage-Level Checklist

Before committing your stage, verify:

#### Structure ✅
- [ ] Exactly 10 questions (Q1-Q10)
- [ ] Exactly 4 skills (3 normal + 1 key)
- [ ] All files created/modified:
  - [ ] `src/data/stages/stage{N}.ts`
  - [ ] `src/data/stageMetadata.ts` (STAGE_{N}_METADATA added)
  - [ ] `src/data/adamDialogue.ts` (stage{N} section added)
  - [ ] `src/assets/s{N}_q*.png` (5-10 images)

#### Question Distribution ✅
- [ ] ~4 knowledge questions (correct answer exists)
- [ ] ~4 dilemma questions (both choices defensible)
- [ ] ~2 philosophy questions (no correct answer)
- [ ] Q5 is TRUE dilemma (equally valid paths)
- [ ] Q7 leads to key skill acquisition

#### Lock Safety ✅
- [ ] At least one choice ALWAYS available in every question
- [ ] Locked choices have clear `lockedFeedback`
- [ ] Lock requirements are reasonable (not impossible to reach)
- [ ] Tested: Can complete stage even with worst choices

#### Parameter Balance ✅
- [ ] Initial values: CS: 50, Asset: 100000, Autonomy: 50
- [ ] Best path achieves S rank (final CS ≥ 80)
- [ ] Worst path still completable (no parameter hits 0)
- [ ] Total parameter swings are reasonable:
  - [ ] CS range: -30 to +40 per choice
  - [ ] Asset range: -50000 to +50000 per choice
  - [ ] Autonomy range: -30 to +20 per choice

#### Content Quality ✅
- [ ] All question text is clear and engaging (2-3 sentences)
- [ ] All feedback explains WHY consequences occurred
- [ ] All A.D.A.M. dialogue uses 丁寧語 (です/ます)
- [ ] No typos or grammatical errors
- [ ] Tone is consistent (dark humor, not preachy)

#### Skills ✅
- [ ] All 4 skills have unique `id` (s{N}_normal_01, s{N}_normal_02, etc.)
- [ ] All skills have clear Japanese descriptions (です/ます調)
- [ ] Key skill matches improvement plan specification
- [ ] Skill effects are balanced (20-50% reductions, 5000-10000 yen)
- [ ] Skills are meaningful for this stage's challenges

#### Images ✅
- [ ] All images follow base style template
- [ ] All images are 1024x1024 PNG
- [ ] All images correctly named (s{N}_q{YY}.png)
- [ ] All images placed in `src/assets/`
- [ ] All `imagePath` fields correctly reference images

---

## Testing Protocol

### Pre-Commit Testing

#### Test 1: Build Verification
```bash
npm run build
```
- [ ] Build succeeds with no errors
- [ ] No TypeScript errors
- [ ] All images bundle correctly

#### Test 2: S-Rank Path (Best Choices)
Play through choosing "best" answer each time:
- [ ] Achieves final CS ≥ 80 (S rank)
- [ ] No game over triggered
- [ ] All "good" choices feel rewarding
- [ ] Stage completion message appropriate

#### Test 3: C-Rank Path (Worst Choices)
Play through choosing "worst" answer each time:
- [ ] Achieves final CS ≥ 20 but < 40 (C rank)
- [ ] NO game over (parameters stay above 0)
- [ ] Still feels completable despite mistakes
- [ ] Feedback makes poor choices clear

#### Test 4: Lock Mechanism
Intentionally create low parameters:
- [ ] Locked choices show grayed out
- [ ] Locked choices show clear feedback when clicked
- [ ] At least one choice always available
- [ ] Can recover from locked situation

#### Test 5: Skill Effects
Choose different skills in Offer 1 and Offer 2:
- [ ] Skills activate when conditions met
- [ ] Skill activation messages display correctly
- [ ] Parameter changes reflect skill effects
- [ ] Skills feel meaningful (not too weak/strong)

#### Test 6: Key Skill Path
Play through acquiring key skill:
- [ ] Q7 choice leads naturally to key skill
- [ ] Key skill offer appears in Offer 2
- [ ] Key skill has special badge/note
- [ ] A.D.A.M. special comment displays
- [ ] Key skill collection counter updates

#### Test 7: A.D.A.M. Dialogue
Verify dialogue throughout:
- [ ] Stage intro dialogue displays
- [ ] Mid-stage commentary appropriate for CS level
- [ ] Key skill dialogue triggers correctly
- [ ] Outro matches achieved rank
- [ ] Next stage teaser makes sense

### Post-Commit Testing

After merging to main:
- [ ] Full playthrough from Stage 1 to new stage
- [ ] Verify stage progression works
- [ ] Check save/load functionality
- [ ] Test on different browsers (Chrome, Firefox, Safari)

---

## Common Pitfalls

### ❌ Mistake 1: Both Choices Locked

**Problem**: Forgot to leave at least one choice always available.

**Example**:
```typescript
choices: [
    { lockRequirements: { Asset: 50000 }, ... },
    { lockRequirements: { Autonomy: 40 }, ... }  // ❌ Both can be locked!
]
```

**Fix**: Always ensure at least one choice has `lockRequirements: null`.

---

### ❌ Mistake 2: Parameter Imbalance

**Problem**: Too many large negative swings, impossible to reach S rank.

**Example**: 10 questions all with CS: -30 → Final CS = 50 + (-300) = -250 (game over!)

**Fix**: Balance negative and positive. Calculate cumulative effects.

**Rule of Thumb**:
- Best path should gain ~+30 CS total across 10 questions (50 → 80)
- Worst path should lose ~-30 CS total but stay above 20 (50 → 20)

---

### ❌ Mistake 3: Skill Doesn't Matter

**Problem**: Skill effect is too weak or never triggers.

**Example**: 5% damage reduction on rare condition → Player never notices.

**Fix**:
- Use 20-50% reductions (noticeable)
- Use 5000-10000 yen for Asset effects (meaningful)
- Ensure skill triggers in Q8-Q10

---

### ❌ Mistake 4: False Dilemma

**Problem**: Q5 has obvious "correct" answer, not a true dilemma.

**Example**:
```typescript
// ❌ Not a dilemma - one is clearly better
A: "仕事を頑張る" → CS: +40, Asset: +30000, Autonomy: +20
B: "サボる" → CS: -30, Asset: -10000, Autonomy: -20
```

**Fix**: Both choices should have valid reasoning and trade-offs.

**Good Dilemma**:
```typescript
A: "仕事優先" → CS: +30, Asset: 0, Autonomy: -15 (lose relationships)
B: "友人優先" → CS: 0, Asset: -5000, Autonomy: +20 (lose work progress)
```

---

### ❌ Mistake 5: A.D.A.M. Uses Casual Form

**Problem**: Wrote A.D.A.M. dialogue without です/ます.

**Example**:
```typescript
adamDialogue: {
    intro: "テストを開始する。" // ❌ Casual form
}
```

**Fix**: Always use 丁寧語 (です/ます).
```typescript
adamDialogue: {
    intro: "テストを開始します。" // ✅ Polite form
}
```

---

### ❌ Mistake 6: Forgot Lock Feedback

**Problem**: Locked choice has no `lockedFeedback`, confusing players.

**Example**:
```typescript
{
    lockRequirements: { Asset: 50000 }
    // ❌ No lockedFeedback!
}
```

**Fix**: Always provide clear reason.
```typescript
{
    lockRequirements: { Asset: 50000 },
    lockedFeedback: "LOCKED: Asset >= 50,000必要 - 資産が足りません。"
}
```

---

### ❌ Mistake 7: Image Doesn't Match Question

**Problem**: Generated image shows wrong mood or scene.

**Example**: Question about serious financial crisis, image shows cheerful cartoon.

**Fix**:
- Review image prompt carefully
- Specify mood explicitly ("desperate situation", "ominous", "tense")
- Regenerate if mismatch

---

### ❌ Mistake 8: Skill ID Collision

**Problem**: Used same skill ID as another stage.

**Example**: `id: "s1_normal_01"` in Stage 2 (collision with Stage 1!)

**Fix**: Always use stage number in ID: `s{N}_normal_{XX}` or `{KEY_SKILL_NAME}`.

---

## Tips for Success

### 💡 Tip 1: Study Stage 1 First

Before writing Stage 2, play through Stage 1 multiple times:
- Try different choices
- Observe parameter changes
- Feel the pacing and tone
- Note how skills affect gameplay

### 💡 Tip 2: Start with Question Outlines

Write all 10 question concepts first (just text, no effects):
```
Q1: [Brief concept]
Q2: [Brief concept]
...
Q10: [Brief concept]
```

Then fill in details. This ensures overall flow makes sense.

### 💡 Tip 3: Balance Parameters on Paper

Create spreadsheet:
```
Question | Choice | CS | Asset | Autonomy
Q1       | A      | +30| 0     | +10
Q1       | B      | -20| 0     | -5
...
Total (Best):      +300 | +50000 | +100
Total (Worst):     -200 | -80000 | -150
```

Adjust until best path reaches S rank and worst path survives.

### 💡 Tip 4: Write A.D.A.M. Last

After all questions written, write A.D.A.M. dialogue to tie them together. His commentary should:
- Reference specific stage theme
- React to player's trajectory
- Foreshadow next stage

### 💡 Tip 5: Playtest with Fresh Eyes

After finishing, take a break. Then play through as if you're a new player:
- Is anything confusing?
- Are choices interesting?
- Does pacing feel right?
- Is tone consistent?

### 💡 Tip 6: Iterate on Feedback

Stage 1 went through multiple revisions based on testing. Expect to:
- Adjust parameter values
- Rewrite unclear feedback
- Fix balance issues
- Polish A.D.A.M. dialogue

Don't aim for perfection on first draft.

---

## Additional Resources

- **QUESTION_DESIGN_GUIDE.md** - Detailed question writing instructions
- **SKILL_DESIGN_GUIDE.md** - Skill balancing and design principles
- **ADAM_STYLE_GUIDE.md** - A.D.A.M. tone and dialogue patterns
- **IMAGE_GENERATION_WORKFLOW.md** - Step-by-step image creation
- **improvement_plan_2026-01-24_integrated.md** - Master design document

---

## Getting Help

If you encounter issues:

1. **Check Stage 1** - It's your reference implementation
2. **Review Guides** - Detailed guides for each aspect
3. **Check Git History** - See how problems were solved before
4. **Ask Questions** - Better to clarify than guess

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-25 | Initial production guide created |

---

**Remember**: Stage 1 took effort to get right. Each subsequent stage will be faster as you internalize patterns. Focus on quality over speed, and use these guides to maintain consistency.

**Good luck with production! 🎮**
