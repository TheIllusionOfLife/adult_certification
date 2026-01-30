# License to Adult (大人免許)

> "School didn't teach you this, but ignorance will kill you."

**License to Adult** is a satirical dystopian adventure game where you are judged by **A.D.A.M.** (Autonomous Decision & Assessment Module). Survive 10 stages of "adult literacy" tests covering finance, labor laws, taxes, and social navigation...or be recycled as a biological processor.

## 🎮 Game Concepts

-   **Educational Dystopia**: Learn real-world survival skills (taxes, contracts, labor rights) through dark humor.
-   **3-Parameter System**: Balance **CS (Credit Score)**, **Asset**, and **Autonomy**. Any hitting 0 = Game Over.
-   **Skill System**: Acquire skills like MEDIATION, EVIDENCE_CHAIN, or COMPOUND_SENSE to navigate the system.
-   **Multiple Endings**: From S Rank (system's ideal citizen) to C Rank, plus a hidden True Ending.

## 🛠️ Tech Stack

This project is built with a lightweight, modern stack ensuring fast performance and easy maintenance.

-   **Framework**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid)
-   **State Management**: Custom GameEngine class
-   **Storage**: `localStorage` for saving records/stamps

## 📚 Documentation

Detailed documentation is available in the `docs/` directory:

### Overview
-   [**Product Overview**](./docs/PRODUCT.md): Purpose, target audience, and goals
-   [**Architecture**](./docs/ARCHITECTURE.md): System design and tech stack

### Design Guides
-   [**Question Design**](./docs/QUESTION_DESIGN_GUIDE.md): Question types, locks, parameter effects
-   [**Skill Design**](./docs/SKILL_DESIGN_GUIDE.md): Skill system and key skills
-   [**Parameter Philosophy**](./docs/PARAMETER_PHILOSOPHY.md): CS/Asset/Autonomy design
-   [**A.D.A.M. Style Guide**](./docs/ADAM_STYLE_GUIDE.md): AI narrator voice and dialogue

### Production
-   [**Production Guide**](./docs/PRODUCTION_GUIDE.md): Stage creation workflow
-   [**Image Generation**](./docs/IMAGE_GENERATION_WORKFLOW.md): AI art pipeline
-   [**Development**](./docs/DEVELOPMENT.md): Setup and testing

## 🚀 Getting Started

### Prerequisites

-   [Bun](https://bun.sh/) (recommended) or Node.js

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/TheIllusionOfLife/adult_certification.git
    cd adult_certification
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

3.  Start the development server:
    ```bash
    bun run dev
    ```

4.  Open `http://localhost:5173` in your browser.

### Testing & Linting

```bash
bun test          # Run unit tests (88+ tests)
npm run lint      # Run ESLint
```

## 🏗️ Build

To create a production build:

```bash
bun run build
```

The output will be in the `dist/` directory.

## 📄 License

This project is open source. 
