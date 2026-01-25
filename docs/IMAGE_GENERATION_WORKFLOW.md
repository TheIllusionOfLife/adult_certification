# Image Generation Workflow

**Version**: 1.0
**Date**: 2026-01-25
**Purpose**: Step-by-step guide for generating images for questions

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Base Style Template](#base-style-template)
3. [Writing Prompts](#writing-prompts)
4. [Generation Tools](#generation-tools)
5. [Quality Standards](#quality-standards)
6. [Workflow Steps](#workflow-steps)
7. [Examples](#examples)

---

## Quick Start

### Overview

Each question needs **one image** that:
- Conveys the scenario/dilemma visually
- Matches the 1930s rubber hose cartoon aesthetic
- Creates appropriate mood (dark humor, tension, dystopian)
- Is 1024x1024 PNG format

### Time Estimate

- Writing prompt: 10-15 minutes
- Generating image: 5-10 minutes per attempt
- Refinement: 2-3 attempts average
- Total per image: ~30-40 minutes

### Required Images per Stage

**Minimum** (5 images):
- Q5 (climax dilemma) - REQUIRED
- Q6 (locked choice demo) - REQUIRED
- Q7 (key skill question) - REQUIRED
- Q8 (skill effects) - REQUIRED
- Q10 (finale) - REQUIRED

**Optional** (5 more images for Q1-Q4, Q9):
- Improves immersion
- Can reuse/adapt legacy images initially
- Generate later if time permits

---

## Base Style Template

### Core Style Statement

**Always prepend this to your prompts**:

```
1930s rubber hose animation style, Fleischer Studios aesthetic,
vintage cartoon noir, high contrast black and white with selective
color accents, bold ink outlines, exaggerated expressions,
Cuphead-inspired, dark humor, dystopian mood, hand-drawn feel
with intentional imperfections
```

### Key Elements

**Visual Style**:
- 1930s Fleischer Bros./Betty Boop era
- Rubber hose animation (bendy limbs, round forms)
- Heavy black ink outlines
- High contrast (deep blacks, bright whites)

**Color Palette**:
- Primarily black and white
- Selective color accents (red for danger, gold for money, blue for cold)
- Sepia/warm tones acceptable

**Mood**:
- Film noir lighting (dramatic shadows)
- Dark humor (unsettling but not horror)
- Dystopian atmosphere (oppressive systems)
- Exaggerated expressions (cartoon style)

**Reference Points**:
- Cuphead (game) - modern rubber hose revival
- Fleischer Studios - original 1930s style
- Old cartoons with social commentary (not Disney-sweet)

---

## Writing Prompts

### Prompt Structure

**Format**:
```
[BASE STYLE],
[MAIN SUBJECT/SCENE],
[COMPOSITION DETAILS],
[EMOTIONAL TONE],
[LIGHTING/ATMOSPHERE],
[SPECIFIC VISUAL ELEMENTS]
```

### Components Explained

**1. Main Subject/Scene** (What's happening):
```
"split scene composition showing two contrasting paths"
"person at desk with looming bureaucratic documents"
"tug of war between two opposing forces"
```

**2. Composition Details** (How it's arranged):
```
"left side shows X, right side shows Y"
"central figure surrounded by threatening symbols"
"forced perspective making desk loom menacingly"
"David vs Goliath composition"
```

**3. Emotional Tone** (What player should feel):
```
"tense and conflicted"
"desperate isolation"
"ominous pressure"
"philosophical choice"
```

**4. Lighting/Atmosphere** (Visual mood):
```
"dramatic spotlight creating strong shadows"
"film noir lighting emphasizing dread"
"warm orange glow vs cold blue light"
"heavy ink shadows surrounding scene"
```

**5. Specific Visual Elements** (Concrete details):
```
"clock with menacing grin showing time pressure"
"contract papers floating ominously"
"wall vibrating with musical notes"
"money bag with exaggerated size"
```

---

## Generation Tools

### Recommended Tools

#### Option 1: Stable Diffusion (Best Control)

**Pros**:
- ✅ Free (if self-hosted)
- ✅ Complete control over parameters
- ✅ Can iterate quickly
- ✅ Best for matching specific style

**Cons**:
- ❌ Requires technical setup
- ❌ Needs good hardware (GPU)
- ❌ Steeper learning curve

**Best For**: If you have GPU and want precise control

**Setup**:
1. Install Stable Diffusion WebUI (AUTOMATIC1111)
2. Download Cuphead/vintage cartoon style LoRA
3. Use negative prompts to exclude modern elements

**Key Settings**:
- Model: Stable Diffusion 1.5 or XL
- LoRA: Cuphead or 1930s Cartoon style (search CivitAI)
- Steps: 30-50
- CFG Scale: 7-9
- Negative Prompt: "modern, 3D, realistic, anime, photo"

---

#### Option 2: Midjourney (Best Quality)

**Pros**:
- ✅ Highest quality output
- ✅ Great at understanding art styles
- ✅ Fast generation
- ✅ Good at composition

**Cons**:
- ❌ Subscription cost ($10-30/month)
- ❌ Less precise control
- ❌ Requires Discord

**Best For**: If budget allows and want best results

**Usage**:
1. Join Midjourney Discord
2. Use `/imagine` command with full prompt
3. Add `--ar 1:1` for square format
4. Add `--stylize 250` for strong style adherence

**Example Command**:
```
/imagine [YOUR PROMPT] --ar 1:1 --stylize 250 --v 6
```

---

#### Option 3: DALL-E 3 (Easiest)

**Pros**:
- ✅ Easy to use (ChatGPT interface)
- ✅ Good prompt understanding
- ✅ Safe/consistent output
- ✅ No technical knowledge needed

**Cons**:
- ❌ Subscription ($20/month for ChatGPT Plus)
- ❌ Sometimes overly sanitizes prompts
- ❌ Less control over exact style

**Best For**: If you want simplicity and have ChatGPT Plus

**Usage**:
1. Open ChatGPT
2. Paste full prompt
3. Request "square format, 1024x1024"
4. Iterate with modifications

---

### Tool Comparison

| Tool | Quality | Control | Cost | Ease | Speed |
|------|---------|---------|------|------|-------|
| Stable Diffusion | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Free* | ⭐⭐ | ⭐⭐⭐⭐ |
| Midjourney | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | $-$$ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| DALL-E 3 | ⭐⭐⭐⭐ | ⭐⭐⭐ | $$ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

\* Free if self-hosted, otherwise cloud services charge fees

---

## Quality Standards

### Must-Have Criteria

#### 1. Style Match ✅
- [ ] Looks like 1930s rubber hose cartoon
- [ ] Bold black ink outlines visible
- [ ] Exaggerated expressions (not realistic)
- [ ] High contrast black and white (with selective color)

#### 2. Scenario Clarity ✅
- [ ] Scene conveys question's situation
- [ ] Key elements are recognizable
- [ ] Composition supports understanding

#### 3. Emotional Tone ✅
- [ ] Mood matches question type (dilemma = tense, etc.)
- [ ] Dark humor present (not cute or cheerful)
- [ ] Dystopian atmosphere maintained

#### 4. Technical Requirements ✅
- [ ] Resolution: 1024x1024 pixels
- [ ] Format: PNG
- [ ] File size: < 2MB (for web performance)
- [ ] No watermarks or text (except intentional)

---

### Nice-to-Have Criteria

#### Artistic Polish ✅
- [ ] Interesting composition (not centered/boring)
- [ ] Dramatic lighting creating mood
- [ ] Symbolic elements enhancing meaning
- [ ] Hand-drawn feel (imperfections OK)

#### Thematic Elements ✅
- [ ] Subtle references to stage theme
- [ ] Visual metaphors for concepts
- [ ] Personality in character expressions

---

### Red Flags (Regenerate if...)

❌ **Wrong style**:
- Modern 3D rendering
- Realistic/photographic
- Anime or manga style
- Wrong era (not 1930s)

❌ **Wrong mood**:
- Too cheerful/bright (Disney-esque)
- Horror/graphic violence
- Completely abstract (unreadable)

❌ **Technical issues**:
- Text/words (unless intentional glitch for Stage 10)
- Watermarks or logos
- Low resolution or blurry
- Wrong aspect ratio (not square)

❌ **Composition problems**:
- Nothing happening (static)
- Too cluttered (can't parse)
- Missing key elements from prompt
- Unclear focus

---

## Workflow Steps

### Step 1: Understand Question (5 minutes)

Before writing prompt, analyze question:

**Questions to answer**:
1. What type? (Knowledge/Dilemma/Philosophy)
2. What's the core conflict?
3. What emotions should player feel?
4. What's the setting/context?

**Example (Q5 Dilemma)**:
```
Type: Dilemma
Conflict: Friends vs career
Emotion: Torn, pressured by time
Setting: Social gathering vs office desk
```

---

### Step 2: Write Prompt Draft (10 minutes)

**Process**:
1. Start with base style template
2. Add main subject (the conflict/situation)
3. Describe composition (how elements arranged)
4. Specify emotional tone
5. Detail lighting/atmosphere
6. Add specific visual elements

**Example**:
```
1930s rubber hose animation style, Fleischer Studios aesthetic,
vintage cartoon noir, high contrast black and white with selective
color accents, bold ink outlines, exaggerated expressions,
Cuphead-inspired, dark humor, dystopian mood, hand-drawn feel
with intentional imperfections,

split scene composition: left side warm cozy gathering with smiling
friends holding drinks in soft orange glow, right side cold blue
spotlight on lonely figure at desk buried in documents with laptop,
ominous wall clock ticking dramatically between scenes showing time
pressure, both paths visualized as equally valid but conflicting,
exaggerated emotional expressions showing internal conflict
```

---

### Step 3: Generate First Attempt (5-10 minutes)

**Using your chosen tool**:
1. Paste full prompt
2. Generate
3. Wait for result (30 seconds - 2 minutes)

**On first try**:
- ✅ Often good enough if prompt was clear
- ⚠️ May need 1-2 iterations for perfect match
- ❌ Rarely need more than 3 attempts

---

### Step 4: Evaluate Result (2 minutes)

**Check against quality standards**:
- Style match?
- Scenario clarity?
- Emotional tone?
- Technical requirements?

**Quick Decision Tree**:
```
Perfect match? → Save and move on
Minor issues? → Try small prompt adjustment
Major issues? → Rewrite significant portion of prompt
Wrong style? → Add style keywords, use negative prompts
```

---

### Step 5: Iterate if Needed (5-10 minutes per attempt)

**Common Adjustments**:

**Too modern**:
- Add: "hand-drawn, vintage, 1930s era"
- Remove: Any modern elements from prompt

**Too realistic**:
- Add: "cartoon, exaggerated, rubber hose animation"
- Use negative prompt: "realistic, photographic"

**Wrong mood**:
- Strengthen mood keywords: "ominous", "tense", "dystopian"
- Add lighting details: "film noir lighting", "dramatic shadows"

**Composition unclear**:
- Be more specific about layout
- Use comparisons: "left vs right", "foreground vs background"
- Add: "forced perspective", "David vs Goliath"

---

### Step 6: Save and Integrate (2 minutes)

**File Naming**:
```
s{N}_q{YY}.png
```
Examples:
- s2_q05.png (Stage 2, Question 5)
- s3_q10.png (Stage 3, Question 10)

**File Location**:
```
src/assets/s{N}_q{YY}.png
```

**Update Question File**:
```typescript
{
    imagePath: "s2_q05.png",  // Just filename, Vite handles path
    // ...
}
```

---

## Examples

### Example 1: Dilemma Question (Friends vs Career)

**Question Context**:
- Type: Dilemma
- Scenario: Choose between friend gathering or work prep
- Emotion: Torn, time pressure
- Theme: Work-life balance

**Full Prompt**:
```
1930s rubber hose animation style, Fleischer Studios aesthetic, vintage
cartoon noir, high contrast black and white with selective color accents,
bold ink outlines, exaggerated expressions, Cuphead-inspired, dark humor,
dystopian mood, hand-drawn feel with intentional imperfections,

split scene composition: left side warm cozy gathering with smiling friends
holding drinks in soft orange glow, right side cold blue spotlight on lonely
figure at desk buried in documents with laptop, ominous wall clock ticking
dramatically between two scenes showing time pressure, both paths visualized
as equally valid but conflicting, exaggerated emotional expressions showing
internal conflict
```

**Key Elements**:
- ✅ Split scene (shows two paths)
- ✅ Color contrast (warm vs cold)
- ✅ Clock (time pressure)
- ✅ Emotional expressions
- ✅ Both paths look valid (not one obviously better)

**Expected Result**: Split image with welcoming friends on left, lonely work on right, clock in middle building tension.

---

### Example 2: Lock Demonstration (Emergency Contact)

**Question Context**:
- Type: Locked choice demo
- Scenario: Need emergency contact, estranged from family
- Emotion: Isolation, helplessness
- Theme: Social safety nets

**Full Prompt**:
```
1930s rubber hose animation style, Fleischer Studios aesthetic, vintage
cartoon noir, high contrast black and white with selective color accents,
bold ink outlines, exaggerated expressions, Cuphead-inspired, dark humor,
dystopian mood, hand-drawn feel with intentional imperfections,

empty official form on desk with 'emergency contact' field glowing ominous
red and pulsing, smartphone lying beside showing contact list fading to
shadows, solitary figure hunched over with face hidden in hands showing
isolation and despair, heavy ink shadows surrounding entire scene, dramatic
spotlight creating strong contrast, melancholic mood, film noir lighting
```

**Key Elements**:
- ✅ Form with glowing red field (threat/pressure)
- ✅ Empty contact list (isolation)
- ✅ Hunched figure (despair)
- ✅ Heavy shadows (oppression)
- ✅ Spotlight (interrogation feel)

**Expected Result**: Lonely figure at desk, intimidating form, red warning, dark shadows emphasizing isolation.

---

### Example 3: Key Skill Question (Noise Complaint)

**Question Context**:
- Type: Key skill pathway
- Scenario: Neighbor noise, choose to endure or use system
- Emotion: Frustration, fear of confrontation
- Theme: Social navigation

**Full Prompt**:
```
1930s rubber hose animation style, Fleischer Studios aesthetic, vintage
cartoon noir, high contrast black and white with selective color accents,
bold ink outlines, exaggerated expressions, Cuphead-inspired, dark humor,
dystopian mood, hand-drawn feel with intentional imperfections,

thin apartment wall vibrating with wavy distortion lines and musical notes
bouncing chaotically, wall clock showing 2 AM with menacing grin and shifty
animated eyes, neighbor's silhouette visible through wall partying with drink
raised celebrating, protagonist in foreground covering ears with hands in
cartoonish distress, exaggerated sweat drops flying, high contrast noir,
Cuphead-esque linework
```

**Key Elements**:
- ✅ Vibrating wall (physical problem)
- ✅ Menacing clock with eyes (time + pressure)
- ✅ Neighbor silhouette (threat but not direct)
- ✅ Protagonist distressed (exaggerated cartoon style)
- ✅ Musical notes (noise visualization)

**Expected Result**: Clear depiction of noise conflict with cartoon exaggeration, showing both sides of thin wall.

---

### Example 4: Philosophy Question (Mirror Reflection)

**Question Context**:
- Type: Philosophy/finale
- Scenario: Reflect on stage theme
- Emotion: Introspection, duality
- Theme: Identity under system

**Full Prompt**:
```
1930s rubber hose animation style, Fleischer Studios aesthetic, vintage
cartoon noir, high contrast black and white with selective color accents,
bold ink outlines, exaggerated expressions, Cuphead-inspired, dark humor,
dystopian mood, hand-drawn feel with intentional imperfections,

large ornate mirror reflecting protagonist's face split vertically into two
halves (left half conforming with forced smile and dead eyes, right half
autonomous with fire in eyes and determined expression), behind protagonist
A.D.A.M.'s growing shadow as puppet master with visible control strings
descending toward player, dramatic spotlight from above, ink splatter
decorative frame, existential choice symbolism, climactic finale atmosphere
```

**Key Elements**:
- ✅ Split face reflection (duality)
- ✅ Contrasting expressions (conformity vs autonomy)
- ✅ A.D.A.M. shadow with strings (system control)
- ✅ Ornate frame (importance)
- ✅ Dramatic lighting (finale feel)

**Expected Result**: Symbolic image of choice between conformity and independence, with A.D.A.M.'s looming presence.

---

## Troubleshooting

### Problem: Image Too Realistic

**Symptoms**: Looks like photograph or 3D render

**Solutions**:
1. Strengthen style keywords:
   ```
   heavy hand-drawn ink outlines, bold cartoon aesthetic,
   exaggerated vintage animation, NOT realistic
   ```

2. Add negative prompt (if tool supports):
   ```
   Negative: realistic, photographic, 3D, modern, HD, detailed
   ```

3. Reference specific examples:
   ```
   in the style of Cuphead game, Fleischer Bros cartoons,
   Betty Boop era animation
   ```

---

### Problem: Wrong Mood (Too Cheerful)

**Symptoms**: Bright colors, happy atmosphere, Disney-like

**Solutions**:
1. Emphasize dark elements:
   ```
   film noir lighting, heavy shadows, ominous atmosphere,
   dystopian mood, subtle menace
   ```

2. Specify color palette:
   ```
   primarily black and white, high contrast, selective dark
   color accents only (no bright pastels)
   ```

3. Add threatening elements:
   ```
   looming shadows, ominous symbols, oppressive atmosphere,
   dark humor, unsettling undertones
   ```

---

### Problem: Composition Unclear

**Symptoms**: Can't tell what's happening, elements jumbled

**Solutions**:
1. Be more specific about layout:
   ```
   foreground: [element A]
   background: [element B]
   center: [main focus]
   ```

2. Use clear directional language:
   ```
   left side shows [X], right side shows [Y],
   protagonist in center torn between them
   ```

3. Simplify:
   ```
   Remove some elements, focus on 2-3 key visual ideas
   ```

---

### Problem: Style Inconsistent with Stage 1

**Symptoms**: Looks different from existing images

**Solutions**:
1. Review Stage 1 prompts:
   ```
   Look at s1_q05.png through s1_q10.png
   Copy their exact base style statement
   ```

2. Match specific elements:
   ```
   Same line weight, same contrast level,
   same era references
   ```

3. Generate test comparison:
   ```
   Put new image next to Stage 1 images
   Adjust until visual consistency achieved
   ```

---

## Quick Reference

### Essential Prompt Components Checklist

- [ ] Base style template included
- [ ] Main subject clearly described
- [ ] Composition specified (layout)
- [ ] Emotional tone stated
- [ ] Lighting/atmosphere detailed
- [ ] Specific visual elements listed
- [ ] Era confirmed (1930s)
- [ ] Mood reinforced (dark humor, dystopian)

### File Checklist

- [ ] Resolution: 1024x1024
- [ ] Format: PNG
- [ ] File size: < 2MB
- [ ] Filename: s{N}_q{YY}.png
- [ ] Location: src/assets/
- [ ] Referenced in question imagePath field

### Quality Checklist

- [ ] Style matches base template
- [ ] Scenario is clear
- [ ] Mood is appropriate
- [ ] No watermarks or unwanted text
- [ ] Composition is readable
- [ ] Expressions are exaggerated (cartoon style)

---

## Time Management Tips

### Batch Processing

Instead of generating one at a time:
1. Write ALL 5-10 prompts first (1 hour)
2. Generate ALL images in one session (1-2 hours)
3. Review and iterate ALL images (30 minutes)

**Benefit**: Stay in creative flow, maintain consistency

### Priority Order

If time-limited, generate in this order:
1. Q5 (climax) - Most important
2. Q7 (key skill) - Thematically important
3. Q10 (finale) - Strong finish
4. Q6 (lock demo) - Teaches mechanic
5. Q8 (skill effects) - Shows system working
6. Others - If time permits

### Iteration Limits

**Rule**: Max 3 attempts per image
- Attempt 1: Use full prompt
- Attempt 2: Adjust based on result
- Attempt 3: Final refinement
- If still not working: Use placeholder, move on

**Why**: Better to have 5 good images than spend all day perfecting 1.

---

**Good luck generating! 🎨**
