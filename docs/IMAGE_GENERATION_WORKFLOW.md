# Image Generation Workflow

**Version**: 2.1 | **Date**: 2026-01-27

---

## Quick Start

Each question needs **one image** (1024x1024 PNG) that:
- Conveys the scenario visually
- Has Dark Cartoon style, thick ink outlines, distorted perspective, dirty paper texture, no decorative frame borders, limited color palette (black, white, red, yellow)

---

## Base Style Template

**Always prepend this to prompts:**
```
Dark Cartoon style, thick ink outlines, distorted perspective, dirty paper texture, no decorative frame borders, limited color palette (black, white, red, yellow), 1024x1024 PNG
```

### Global Rules
- **Scene illustration** (NOT poster/title-card)
- **No decorative frame borders** - image fills canvas edge-to-edge
- **Text policy**: English-only, minimal text.

### Color Palette
- limited color palette (black, white, red, yellow)

---

## Writing `imagePrompt`

The `imagePrompt` field in question files is a **scene brief**, not the full prompt.

**Final prompt** = [imagePrompt] + [BASE STYLE TEMPLATE]

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
Composition: monitor in foreground, watchers in mid-ground. Mood: oppressive surveillance.
```

---

## Output Image Quality Standards

### Must-Have
- [ ] Scene conveys question's situation (not poster/title card)
- [ ] Mood matches question type (dilemma = tense, knowledge = instructive)
- [ ] Text (if any) is minimal, English-only
- [ ] Consistent Style

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
[Main subject/scene],
[Composition details],
[Emotional tone],
[Specific visual elements],
[BASE STYLE TEMPLATE]
```

### Step 3: Generate & Evaluate
- Max 3 attempts per image
- Check against quality standards
- If gibberish text appears, regenerate

### Step 4: Save
- Filename: `s{N}_q{YY}.png` (e.g., `s2_q05.png`)
- Location: `src/assets/`