# Production Guide: Stages 2-10

**Version**: 3.0 | **Date**: 2026-01-31

---

## Quick Start

### Prerequisites
- Read `legacy/improvement_plan_2026-01-24_integrated.md` (sections 3-6)
- Study Stage 1 implementation (`src/data/stages/stage1.ts`)
- Read `QUESTION_DESIGN_GUIDE.md` and `SKILL_DESIGN_GUIDE.md`

### References
- **Stage themes & key skills**: See `SKILL_DESIGN_GUIDE.md`
- **Question flow & lock design**: See `QUESTION_DESIGN_GUIDE.md`
- **Parameter philosophy & balance**: See `PARAMETER_PHILOSOPHY.md`

---

## Stage Creation Workflow

### Phase 1: Planning

#### Source Coverage (MANDATORY)

Search source files for stage theme topics:
- `src/data/question_sources/new_question_ideas_1.md`
- `src/data/question_sources/new_question_ideas_2.md`
- `src/data/question_sources/claude_deep_research.md`
- `src/data/question_sources/gemini_deep_research.md`

Checklist:
- [ ] Identified 6-8 must-cover topics for theme
- [ ] Each topic addressed in questions or feedback
- [ ] Specific numbers/thresholds included (e.g., "30日", "2週間", "25%")

---

### Phase 2: File Creation

**Create/modify these files:**
```
src/data/stages/stage{N}.ts      # 10 questions
src/data/stageMetadata.ts        # Stage metadata
src/data/adamDialogue.ts         # A.D.A.M. dialogue
src/assets/s{N}_q*.png           # 5-10 images
```

---

### Phase 3: Question Writing

See **QUESTION_DESIGN_GUIDE.md** for templates, effect magnitudes, and verdict rules.

**Key Principles:**
1. Always 2 choices per question
2. At least one choice always available (lock safety)
3. Feedback explains WHY consequences occurred
4. A.D.A.M. dialogue uses 丁寧語 (です/ます)

---

### Phase 4: Skill Design

See **SKILL_DESIGN_GUIDE.md** for details.

**Per stage:** 3 normal skills + 1 key skill

---

### Phase 5: Image Generation

See **IMAGE_GENERATION_WORKFLOW.md** for details.

**Specs:** 1024x1024 PNG, `s{N}_q{YY}.png`, in `src/assets/`

---

### Phase 6: Testing

#### Simulation (MANDATORY)
```bash
bun scripts/simulate_stage.mjs --stage {N}
```

Check:
- [ ] All skills trigger at least once
- [ ] Worst path survives (no parameter hits 0)
- [ ] S-rank path exists (CS ≥ 200)
- [ ] Locked choices have alternatives
- [ ] Lock availability is 40-80% (not 0%, not 100%)

#### Manual Testing
- [ ] Build succeeds (`bun run build`)
- [ ] S-rank path works
- [ ] C-rank path (worst choices) still completes
- [ ] Lock mechanisms work correctly
- [ ] A.D.A.M. dialogue displays correctly

---

### Phase 7: Game Designer Review

After technical testing, review as a game designer.

#### Pattern Detection
- [ ] No repetitive "authority says X → submit vs assert" pattern
- [ ] At least one question where assertiveness has costs
- [ ] Variety in emotional tones

#### Scenario Quality
- [ ] Text reads as scenario with verb, not topic summary
- [ ] Stakes are clear
- [ ] Choices are specific actions, not vague attitudes

#### Choice Position Balance
- [ ] Correct answers (APPROVED) not heavily skewed to A or B
- [ ] Run simulation `prefer_A_choice` / `prefer_B_choice` to verify no exploitable bias

---

## Quality Checklist

### Structure
- [ ] 10 questions, 4 skills (3 normal + 1 key)
- [ ] Locks per QUESTION_DESIGN_GUIDE.md
- [ ] At least one choice always available per question

### Safety
- [ ] No advice that could cause legal/financial harm if followed literally
- [ ] "Correct" answers don't encourage policy violations
- [ ] Safe for a naive 20-year-old to follow exactly

**Red flags:** "Transfer emails to personal account", "Record secretly", "Sue immediately"

### Parameters
- [ ] See PARAMETER_PHILOSOPHY.md for balance targets
- [ ] Best path: CS 200+ (S rank)
- [ ] Worst path: still completable (no parameter hits 0)

### Skills
- [ ] Run `bun scripts/simulate_stage.mjs --stage {N}` to verify all skills trigger
- [ ] Effects match actual damage types in questions

---

## Common Pitfalls

| Mistake | Fix |
|---------|-----|
| Both choices locked | One choice must have `lockRequirements: null` |
| Skill never triggers | Match skill category/type to actual question damage |
| A.D.A.M. uses casual form | Always use です/ます |
| Forgot lockedFeedback | Provide clear reason for lock |
| Skill ID collision | Use stage number: `s{N}_normal_{XX}` |
| Correct answers all on same position | Swap A↔B to balance distribution |

---

## Resources

- **QUESTION_DESIGN_GUIDE.md** - Question templates, effects, locks, and writing
- **SKILL_DESIGN_GUIDE.md** - Skill balancing and validation
- **PARAMETER_PHILOSOPHY.md** - Parameter design principles and balance targets
- **ADAM_STYLE_GUIDE.md** - A.D.A.M. dialogue
- **IMAGE_GENERATION_WORKFLOW.md** - Image creation
- **scripts/simulate_stage.mjs** - Stage simulation tool
- **scripts/compare_stages.mjs** - Cross-stage comparison
