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
- ✅ Read `legacy/improvement_plan_2026-01-24_integrated.md` (sections 3-6)
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
| Game designer review | 30 min | Pattern detection, dilemma authenticity |
| **Total** | **10-14 hours** | Per stage |

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
Q1-Q3: Knowledge (introduce theme, teach facts)
    └ SKILL OFFER 1 (after Q3) - CS/Asset skill (ADAM recommends) + Autonomy skill
Q4: Knowledge (continue learning)
Q5: Dilemma ★ (no perfect answer, skills from Offer 1 affect outcomes)
Q6: Knowledge (more facts)
Q7: Knowledge (key skill pathway) ★ - One answer locked (Autonomy threshold)
    └ SKILL OFFER 2 (after Q7) - CS/Asset skill (ADAM recommends) + Key skill (locked until Q7-B)
Q8: Knowledge (near end)
Q9: Dilemma ★ - One answer locked (CS threshold, first CS lock)
Q10: Philosophy - Define character, no correct answer
```

**Planning Checklist:**
- [ ] Theme aligns with improvement plan
- [ ] Key skill identified and makes sense for theme
- [ ] Question topics cover 70% knowledge, 20% dilemma, 10% philosophy
- [ ] Questions follow standard flow template (dilemmas at Q5 and Q9, not consecutive)
- [ ] Exactly 2 questions will have locked choices (Q7 and Q9)
- [ ] Q5 is a TRUE dilemma (both choices defensible)
- [ ] Q7 leads naturally to key skill acquisition

#### Step 1.4: Verify Source Coverage (MANDATORY)

Before finalizing question topics, verify coverage against source materials:

**1. Open relevant source files:**
- `src/data/question_sources/new_question_ideas_1.md` - Pre-designed questions by category
- `src/data/question_sources/new_question_ideas_2.md` - Additional questions
- `src/data/question_sources/claude_deep_research.md` - Detailed knowledge points
- `src/data/question_sources/gemini_deep_research.md` - Comprehensive research

**2. For Stage theme, identify "must-cover" topics:**

| Stage | Theme | Must-Cover Topics (from sources) |
|-------|-------|----------------------------------|
| 2 | 仕事の基礎 | 報連相, 有給休暇, 残業制度(36協定/割増率/時効), 解雇予告, 退職意思表示, ハラスメント初動 |
| 3 | 金の基礎 | リボ払い, 複利, クレカ不正利用対応, 連帯保証人の危険性 |
| ... | ... | (extract from sources for each stage) |

**3. Cross-check your 10 questions against must-cover list:**
- [ ] Each must-cover topic appears in at least one question
- [ ] Questions teach specific numbers/thresholds from sources (e.g., "30日", "2週間", "25%")
- [ ] No critical topic is completely omitted

**Source Coverage Checklist:**
- [ ] Searched all 4 source files for stage theme keywords
- [ ] Extracted at least 6-8 "must-cover" topics
- [ ] Each must-cover topic is addressed in questions or feedback
- [ ] Specific legal thresholds/numbers are included where applicable

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
        A: { CS: 50 },
        B: { CS: 20 }
        // C = clear (CS >= 1), no explicit threshold
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
- Knowledge: 7 questions (Q1, Q2, Q3, Q4, Q6, Q7, Q8)
- Dilemma: 2 questions (Q5, Q9)
- Philosophy: 1 question (Q10)

**Question Flow Template:**
```
Q1-Q3: knowledge
[SKILL OFFER 1: CS/Asset skill (ADAM recommends) + Autonomy skill]
Q4: knowledge
Q5: dilemma (skills from offer 1 affect parameter changes)
Q6-Q7: knowledge (Q7 has one locked answer - key skill pathway)
[SKILL OFFER 2: CS/Asset skill (ADAM recommends) + Autonomy key skill]
Q8: knowledge
Q9: dilemma (one answer locked - CS/Asset lock)
Q10: philosophy
```

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
5. **Set keySkillRequirement to Q7's locked choice (B)**

**IMPORTANT: Key Skill Causal Earning**

Key skills are NOT automatically available in Offer 2. Players must **earn** them by demonstrating the skill's behavior in Q7:

- Q7's choice B should be locked (require parameter threshold)
- Q7's choice B should embody the key skill's philosophy
- If player selects Q7 choice B → key skill becomes selectable in Offer 2
- If player didn't select Q7 choice B → key skill is shown but disabled with reason

This creates causal connection: demonstrate the behavior → earn the right to select the skill.

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
    adamComment: "……{皮肉なコメント（です/ます調）}",
    keySkillRequirement: {
        questionId: "s{N}_q07",
        choiceIndex: 1 // Choice B (0-indexed)
    }
}
```

---

### Phase 5: Image Generation (2-3 hours, user responsibility)

#### Step 5.1: Write Image Prompts

Write `imagePrompt` as a **scene brief** (scene + composition + mood + key props),
and rely on the single global generation template in:

- `docs/IMAGE_GENERATION_WORKFLOW.md`

Do NOT embed base style keywords (e.g., "1930s", "Cuphead") inside question files.

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
Use the **Quality Standards** and **Stage Batch Consistency Checklist** in:
- `docs/IMAGE_GENERATION_WORKFLOW.md`

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

### Phase 7: Game Designer Review (30 minutes)

After technical testing passes, review the stage as a game designer. This catches issues that simulations miss.

#### Step 7.1: Read Through All Questions

Read the entire stage file sequentially. Ask yourself:

**Educational Value:**
- [ ] Does each question teach something actionable?
- [ ] Are specific numbers/thresholds included where applicable?
- [ ] Would a naive 20-year-old learn something useful?

**Engagement:**
- [ ] Does each scenario have emotional stakes?
- [ ] Are question texts written as scenarios, not trivia?
- [ ] Is there variety in situation types?

#### Step 7.2: Pattern Detection

Look for repetitive structures:

**Common Anti-Patterns:**
- ❌ Multiple "authority says X → submit vs assert" questions
- ❌ "Correct" answer is always the assertive option
- ❌ All dilemmas follow same trade-off pattern

**Variety Checklist:**
- [ ] At least one question where assertiveness has real costs
- [ ] Mix of interpersonal, bureaucratic, and financial scenarios
- [ ] Different emotional tones (fear, frustration, hope, conflict)

#### Step 7.3: Dilemma Authenticity

For each dilemma question (Q5, Q9):

| Check | Q5 | Q9 |
|-------|----|----|
| Both choices have pros AND cons | ☐ | ☐ |
| Neither feedback says "正解です" | ☐ | ☐ |
| A reasonable person could defend either choice | ☐ | ☐ |
| Trade-off is clear (X vs Y, not good vs bad) | ☐ | ☐ |

#### Step 7.4: Scenario Quality

For each question, verify:
- [ ] Text reads as a scenario with a verb, not a topic summary
- [ ] Stakes are clear (what happens if wrong?)
- [ ] Choices are specific actions, not vague attitudes

**Red Flags:**
- "〜について" (about X) → Should be "〜が起きた" (X happened)
- "〜すべき書類" (documents you should get) → Should be "〜と言われた。何をすべき？" (you were told X. What do you do?)
- Choices like "適切に対応する" → Should be specific action

#### Step 7.5: Document Findings

If issues found, create a revision list before committing:

```markdown
## Game Designer Review Findings

### Issues
1. Q2/Q3/Q7 all follow "submit vs assert" pattern - add variety
2. Q9 has "正解です" in feedback - not a true dilemma
3. Q6 reads like trivia, lacks stakes

### Revisions Needed
- [ ] Q2: Change to show nuance (assertiveness can backfire)
- [ ] Q9: Rewrite as true dilemma
- [ ] Q6: Add scenario tension
```

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
    imagePrompt: "{Scene brief (scene + composition + mood + key props)}", // See docs/IMAGE_GENERATION_WORKFLOW.md
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
    imagePrompt: "{Scene brief: person facing a bureaucratic/technical challenge}",
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
    imagePrompt: "{Scene brief: split scene or crossroads showing both paths}",
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
    imagePrompt: "{Scene brief: disparity or locked-access metaphor (still a scene illustration)}",
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
            lockedFeedback: "資産が30,000円以上必要"
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
    imagePrompt: "{Scene brief: symbolic representation of theme (keep it as a scene, not a poster)}",
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
- [ ] 7 knowledge questions (Q1, Q2, Q3, Q4, Q6, Q7, Q8)
- [ ] 2 dilemma questions (Q5, Q9) - not consecutive
- [ ] 1 philosophy question (Q10)
- [ ] Q7 has key skill pathway lock (Autonomy)
- [ ] Q9 has CS/Asset lock
- [ ] Q5 is TRUE dilemma (equally valid paths)
- [ ] Q7 leads to key skill acquisition

#### Lock Safety ✅
- [ ] At least one choice ALWAYS available in every question
- [ ] Locked choices have clear `lockedFeedback`
- [ ] Lock requirements are reasonable (not impossible to reach)
- [ ] Tested: Can complete stage even with worst choices

#### Safety Review ✅
- [ ] No advice that could cause legal/financial harm if followed literally
- [ ] "Correct" answers don't encourage policy violations (e.g., data exfiltration)
- [ ] Feedback includes appropriate caveats for context-dependent advice
- [ ] Checked: Would this advice be safe for a naive 20-year-old to follow exactly?

**Red flags to avoid:**
- "Transfer company emails to personal account" (could be data theft)
- "Record conversations secretly" (illegal in some jurisdictions)
- "Refuse to work overtime" (without explaining 36協定 context)
- "Sue immediately" (without mentioning cost/time/stress)

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
- [ ] **CRITICAL**: Run `node scripts/simulate_stage.mjs --stage {N}` to verify all skills trigger

#### Images ✅
- [ ] All images follow base style template
- [ ] All images are 1024x1024 PNG
- [ ] All images correctly named (s{N}_q{YY}.png)
- [ ] All images placed in `src/assets/`
- [ ] All `imagePath` fields correctly reference images

---

## Testing Protocol

### Pre-Commit Testing

#### Test 0: Stage Simulation (MANDATORY)

Before any manual testing, run the exhaustive stage simulation:

```bash
node scripts/simulate_stage.mjs --stage {N}
```

This script simulates **all possible decision paths** through the stage and reports:
- **Skill trigger analysis**: Which skills actually trigger and when
- **Parameter ranges**: Min/max values for CS, Asset, Autonomy across all paths
- **Lock analysis**: Which choices get locked and under what conditions
- **Path viability**: Whether any path leads to game over

**What to check in output:**
- [ ] All skills trigger at least once (critical - see SKILL_DESIGN_GUIDE.md)
- [ ] No path leads to parameter ≤ 0 (game over prevention)
- [ ] S-rank path exists (best path achieves CS ≥ 80)
- [ ] Locked choices have available alternatives

**If skills don't trigger**: Redesign skill effects to match actual damage types in questions. This is the #1 skill design failure - see SKILL_DESIGN_GUIDE.md for details.

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
- [ ] Completes without game over (C rank = clear with CS >= 1)
- [ ] NO game over (all parameters stay above 0)
- [ ] Still feels completable despite mistakes
- [ ] Feedback makes poor choices clear

#### Test 4: Lock Mechanism
Intentionally create low parameters:
- [ ] Locked choices show grayed out with strikethrough
- [ ] Locked choices are unselectable (no click handler)
- [ ] Lock message shows simple Japanese (e.g., "自律性が30以上必要")
- [ ] At least one choice always available

#### Test 5: Skill Effects
Choose different skills in Offer 1 and Offer 2:
- [ ] Skills activate when conditions met
- [ ] Skill activation messages display correctly
- [ ] Parameter changes reflect skill effects
- [ ] Skills feel meaningful (not too weak/strong)

#### Test 6: Key Skill Path (Earned)
Play through selecting Q7 choice B (the locked choice):
- [ ] Q7 choice B is locked (requires parameter threshold)
- [ ] Q7 choice B embodies the key skill's behavior
- [ ] In Offer 2, key skill is **selectable** (earned through Q7B)
- [ ] Key skill has special badge/note
- [ ] A.D.A.M. special comment displays when selected
- [ ] Key skill collection counter updates

#### Test 6b: Key Skill Path (Not Earned)
Play through selecting Q7 choice A (the safe choice):
- [ ] In Offer 2, key skill is **disabled** with reason shown
- [ ] Reason message: "Q7で選択肢Bを選ぶ必要があります"
- [ ] Normal skill in Offer 2 remains selectable
- [ ] Player can still complete stage without key skill

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
    lockedFeedback: "資産が50,000円以上必要"
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
- **legacy/improvement_plan_2026-01-24_integrated.md** - Master design document
- **scripts/simulate_stage.mjs** - Exhaustive stage simulation tool for validation

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
| 1.1 | 2026-01-25 | Added simulate_stage.mjs as mandatory pre-commit test |

---

**Remember**: Stage 1 took effort to get right. Each subsequent stage will be faster as you internalize patterns. Focus on quality over speed, and use these guides to maintain consistency.

**Good luck with production! 🎮**
