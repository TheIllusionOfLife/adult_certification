# Asset Generation Guide

This project uses AI (specifically Google's Imagen 3 / Antigravity) to generate "Dark Cartoon" style assets. Consistency in style is crucial.

## 🎨 Art Style Definition

**Style Name:** Dark Cartoon (Rubber Hose / Vintage Dystopia)
**Key Visual Elements:**
-   **Line Art:** Thick, ink-like black outlines.
-   **Perspective:** Distorted, fish-eye, or exaggerated angles.
-   **Texture:** Dirty paper, vintage poster, noise, grunge.
-   **Palette:** Limited. Dominant Black/White/Gray. Accents of Red (Warning), Yellow (Caution/Gold).
-   **Mood:** Menacing, satirical, cynical, oppressive.

## 📝 Prompt Template

When interacting with the AI agent to generate new assets for questions or UI, use the following template schema:

```text
[Subject Description]. Dark Cartoon style, thick ink outlines, distorted perspective, dirty paper texture, limited color palette (black, white, red, yellow).
```

### Examples (Used in Production)

**1. Credit Card / Finance**
> A new credit card, a pen, and the signature strip on the back. Dark Cartoon style, thick ink outlines, distorted perspective, dirty paper texture, limited color palette (black, white, red, yellow).

**2. Tax Refund / Accounting**
> A pile of receipts, a calculator, and a faint light of tax refund. Dark Cartoon style, thick ink outlines, distorted perspective, dirty paper texture, limited color palette (black, white, red, yellow).

**3. Border Control / Law**
> A mountain of Bitcoin coins, an airport departure gate, and the suspicious eyes of a customs officer. Dark Cartoon style, thick ink outlines, distorted perspective, dirty paper texture, limited color palette (black, white, red, yellow).

**4. Harassment / Office**
> A twisted, angry face of a boss shouting with flying spit, a closed small room, and a smartphone hidden in a pocket recording. Dark Cartoon style, thick ink outlines, distorted perspective, dirty paper texture, limited color palette (black, white, red, yellow).

##  workflow for Mass Production

1.  **Define Question:** Determine the scenario (e.g., "Signing a contract without reading").
2.  **Draft Prompt:** Convert the scenario into a visual metaphor using the template above (e.g., "A demon hand offering a scroll...").
3.  **Generate:** Request the AI agent to generate the image.
4.  **Review:** Check for style consistency (thickness of lines, palette).
5.  **Integrate:** Save to `src/assets/` and link in `src/data/questions.ts`.
