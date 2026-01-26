# Image Generation Workflow

**Version**: 2.0 | **Date**: 2026-01-26

---

## Quick Start

Each question needs **one image** (1024x1024 PNG) that:
- Conveys the scenario visually
- Matches 1930s rubber hose cartoon aesthetic
- Creates appropriate mood (dark humor, tension, dystopian)

---

## Base Style Template

**Always prepend this to prompts:**
```
1930s rubber hose animation style, Fleischer Studios aesthetic,
vintage cartoon noir, high contrast black and white with selective
color accents, bold ink outlines, exaggerated expressions,
Cuphead-inspired, dark humor, dystopian mood, hand-drawn feel
```

### Global Rules
- **Scene illustration** (NOT poster/title-card)
- **No decorative frame borders** - image fills canvas edge-to-edge
- **Text policy**: English-only, minimal, fully readable. If text can't be readable, omit it entirely.

### Color Palette
- Primarily black and white
- Selective accents: red (danger), gold (money), blue (cold)
- Film noir lighting with dramatic shadows

---

## Writing `imagePrompt`

The `imagePrompt` field in question files is a **scene brief**, not the full prompt.

**Final prompt** = [BASE STYLE TEMPLATE] + [imagePrompt]

### Must Include
- **Scene**: what is happening (who/where/what)
- **Composition**: how it's framed (split scene, close-up, foreground/background)
- **Mood**: what player should feel (tense, oppressive, conflicted)
- **Key props**: 2-4 specific visual anchors

### Must NOT Include
- Base style keywords (already in global template)
- Tool instructions (resolution, negative prompts)
- Big headline/poster typography
- Abstract concept labels

### Example

✅ **Good**:
```
Scene: office PC showing email with CC field highlighted; coworkers watching from behind; CCTV camera looming.
Composition: monitor in foreground, watchers in midground.
Mood: oppressive surveillance.
```

❌ **Bad**:
```
1930s rubber hose animation style, Fleischer Studios aesthetic...
```

---

## Quality Standards

### Must-Have
- [ ] 1930s rubber hose cartoon style with bold ink outlines
- [ ] Scene conveys question's situation (not poster/title card)
- [ ] Mood matches question type (dilemma = tense, knowledge = instructive)
- [ ] 1024x1024 PNG, < 2MB, no watermarks
- [ ] Text (if any) is intentional, readable, English-only

### Red Flags (Regenerate)
- Modern 3D or realistic style
- Too cheerful/Disney-like
- Gibberish/garbled AI text
- Poster or infographic composition
- Decorative frame borders

---

## Workflow

### Step 1: Analyze Question
1. What type? (Knowledge/Dilemma/Philosophy)
2. What's the core conflict?
3. What emotions should player feel?

### Step 2: Write Prompt
```
[BASE STYLE TEMPLATE],
[Main subject/scene],
[Composition details],
[Emotional tone],
[Specific visual elements]
```

### Step 3: Generate & Evaluate
- Max 3 attempts per image
- Check against quality standards
- If gibberish text appears, regenerate

### Step 4: Save
- Filename: `s{N}_q{YY}.png` (e.g., `s2_q05.png`)
- Location: `src/assets/`
- Update `imagePath` field in question

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Too realistic | Add: "hand-drawn, vintage, cartoon, NOT realistic" |
| Too cheerful | Add: "film noir lighting, heavy shadows, dystopian mood" |
| Unclear composition | Use explicit layout: "left shows X, right shows Y, protagonist in center" |
| Looks like poster | Reframe as narrative scene with characters, remove text labels |
| Gibberish text | Avoid text-heavy elements, or specify exact short text |
| Inconsistent with Stage 1 | Copy exact base style from existing images |

---

## Batch Consistency Checklist

After generating all 10 images for a stage:
- [ ] All are scene illustrations (no posters)
- [ ] No decorative frame borders
- [ ] Rubber hose character style consistent
- [ ] Ink outline thickness consistent
- [ ] Accent colors consistent
- [ ] Any text is readable and English-only
- [ ] No AI gibberish text

---

## Tips

- **Batch process**: Write all 10 prompts first, then generate all images
- **Max 3 attempts** per image - better to have 5 good images than spend all day on 1
- For comparison scenes, show protagonist experiencing the choice, not a diagram explaining it
