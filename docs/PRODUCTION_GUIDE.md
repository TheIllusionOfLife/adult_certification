# Production Guide: Stages 2-10

**Version**: 2.0 | **Date**: 2026-01-26

---

## Quick Start

### Prerequisites
- Read `legacy/improvement_plan_2026-01-24_integrated.md` (sections 3-6)
- Study Stage 1 implementation (`src/data/stages/stage1.ts`)
- Read `QUESTION_DESIGN_GUIDE.md` and `SKILL_DESIGN_GUIDE.md`

### Stage Themes & Key Skills

| Stage | Theme | Key Skill |
|-------|-------|-----------|
| 2 | 仕事の基礎 | EVIDENCE_CHAIN (証拠連鎖) |
| 3 | 金の基礎 | COMPOUND_SENSE (複利感覚) |
| 4 | 税金 | DUE_PROCESS (手続き主義) |
| 5 | 社会保険 | SAFETY_NET_NAVIGATION |
| 6 | 住まい | NEGOTIATION_PROTOCOL |
| 7 | 契約・法律 | CONTRACT_LITERACY |
| 8 | デジタル安全 | IDENTITY_HYGIENE |
| 9 | 危機対応 | DAMAGE_CONTROL |
| 10 | 最終審判 | (Complex multi-stage finale) |

---

## Stage Creation Workflow

### Phase 1: Planning

#### Question Flow (Standard)
```
Q1-Q3: Knowledge
[SKILL OFFER 1: CS/Asset skill + Autonomy skill]
Q4: Knowledge
Q5: Dilemma ★ (TRUE dilemma, no correct answer)
Q6: Knowledge
Q7: Knowledge ★ (locked choice → key skill pathway)
[SKILL OFFER 2: Normal skill + Key skill (earned via Q7-B)]
Q8: Knowledge
Q9: Dilemma ★ (CS lock)
Q10: Philosophy
```

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

See **QUESTION_DESIGN_GUIDE.md** for detailed templates.

**Key Principles:**
1. Always 2 choices (except Stage 10 Q10)
2. At least one choice always available (lock safety)
3. Feedback explains WHY consequences occurred
4. A.D.A.M. dialogue uses 丁寧語 (です/ます)

**Distribution:** 7 knowledge, 2 dilemma, 1 philosophy

---

### Phase 4: Skill Design

See **SKILL_DESIGN_GUIDE.md** for details.

**Per stage:** 3 normal skills + 1 key skill

**Key Skill Earning:**
- Q7 choice B must be locked (parameter threshold)
- Q7 choice B embodies key skill philosophy
- If Q7-B selected → key skill available in Offer 2
- If Q7-A selected → key skill disabled with reason

---

### Phase 5: Image Generation

See **IMAGE_GENERATION_WORKFLOW.md** for details.

**Specs:** 1024x1024 PNG, `s{N}_q{YY}.png`, in `src/assets/`

---

### Phase 6: Testing

#### Simulation (MANDATORY)
```bash
node scripts/simulate_stage.mjs --stage {N}
```

Check:
- [ ] All skills trigger at least once
- [ ] No path leads to parameter ≤ 0
- [ ] S-rank path exists (CS ≥ 80)
- [ ] Locked choices have alternatives

#### Manual Testing
- [ ] Build succeeds (`npm run build`)
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

#### Dilemma Authenticity (Q5, Q9)
- [ ] Both choices have pros AND cons
- [ ] Neither feedback says "正解です"
- [ ] Trade-off is clear (X vs Y, not good vs bad)

#### Scenario Quality
- [ ] Text reads as scenario with verb, not topic summary
- [ ] Stakes are clear
- [ ] Choices are specific actions, not vague attitudes

---

## Quality Checklist

### Structure
- [ ] 10 questions, 4 skills (3 normal + 1 key)
- [ ] Q7 has Autonomy lock, Q9 has CS lock
- [ ] At least one choice always available per question

### Safety
- [ ] No advice that could cause legal/financial harm if followed literally
- [ ] "Correct" answers don't encourage policy violations
- [ ] Safe for a naive 20-year-old to follow exactly

**Red flags:** "Transfer emails to personal account", "Record secretly", "Sue immediately"

### Parameters
- [ ] CS range: -30 to +40 per choice
- [ ] Asset range: -50k to +50k per choice
- [ ] Autonomy range: -30 to +20 per choice
- [ ] Best path: 50 → 80+ CS (S rank)
- [ ] Worst path: still completable (no parameter hits 0)

### Skills
- [ ] Run `node scripts/simulate_stage.mjs --stage {N}` to verify all skills trigger
- [ ] Effects match actual damage types in questions

---

## Common Pitfalls

| Mistake | Fix |
|---------|-----|
| Both choices locked | One choice must have `lockRequirements: null` |
| Parameter imbalance | Best path: +30 CS total, worst path: -30 CS but survive |
| Skill never triggers | Match skill category/type to actual question damage |
| False dilemma | Both choices must have trade-offs, not one obviously better |
| A.D.A.M. uses casual form | Always use です/ます |
| Forgot lockedFeedback | Provide clear reason for lock |
| Skill ID collision | Use stage number: `s{N}_normal_{XX}` |

---

## Resources

- **QUESTION_DESIGN_GUIDE.md** - Question templates and writing
- **SKILL_DESIGN_GUIDE.md** - Skill balancing
- **ADAM_STYLE_GUIDE.md** - A.D.A.M. dialogue
- **IMAGE_GENERATION_WORKFLOW.md** - Image creation
- **scripts/simulate_stage.mjs** - Stage simulation tool
