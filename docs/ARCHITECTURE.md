# Architecture Overview

**Adult Certification** follows a simple, robust Vanilla TypeScript architecture designed for maintainability and readability without the overhead of heavy frameworks.

## High-Level Structure

```mermaid
graph TD
    Main[main.ts] -->|Initializes| Engine[GameEngine]
    Main -->|Initializes| UI[UIManager]
    UI -->|Observes| Engine
    Engine -->|Loads| Data[stages/ + stageMetadata.ts]

    subgraph Logic Layer
        Engine -->|State| GameState
        Engine -->|Method| processChoice()
        Engine -->|Method| calculateEnding()
    end

    subgraph Presentation Layer
        UI -->|Method| renderCurrentQuestion()
        UI -->|Method| updateHUD()
        UI -->|Method| showFeedback()
        UI -->|Styles| CSS[styles/]
    end
```

## Core Components

### 1. `GameEngine` (`src/logic/gameEngine.ts`)
The brain of the application. It holds no reference to the DOM.
-   **Responsibilities**:
    -   Managing `GameState` (CS, Asset, Autonomy, History).
    -   Processing user choices and calculating effects.
    -   Applying skill effects (deterministic amplification).
    -   Determining Game Over / Victory conditions.
-   **Design Principle**: Pure logic, verifiable via unit tests.

### 2. `UIManager` (`src/ui/render.ts`)
The face of the application. It handles all DOM manipulations.
-   **Responsibilities**:
    -   Updating the textual display (Score counters, Question text).
    -   Rendering buttons for choices and skills.
    -   Managing overlays (Feedback, Game Over, Start Screen).
    -   Handling CSS animations (e.g., score pop-ups).
-   **Design Principle**: Decoupled from logic. It only reads from `GameEngine` and sends user intents back to it.

### 3. Data Layer (`src/data/`)
-   **`stages/stage{1-10}.ts`**: Per-stage question definitions (10 questions each).
-   **`stageMetadata.ts`**: Stage metadata (themes, skills, thresholds, A.D.A.M. dialogue references).
-   **`skillEffects.ts`**: Skill effect handler registry.
-   **`adamDialogue.ts`**: A.D.A.M. commentary system.

## State Flow

1.  **User Action**: Clicks a choice button in `UIManager`.
2.  **Logic Processing**: `UIManager` calls `engine.processChoice(choice)`.
3.  **State Update**: `GameEngine` updates `CS`, `Asset`, `Autonomy` and returns a result object.
4.  **Feedback Rendering**: `UIManager` receives the result and displays the overlay/result text.
5.  **HUD Update**: `UIManager` refreshes the status bars based on the new state.

## Technology Stack

### Core Framework
-   **Vite**: Build tool and dev server. Chosen for speed and minimal config.
-   **TypeScript**: Strict typing enforced. No `any` allow-list.
-   **Vanilla JS/DOM**: No UI frameworks (React/Vue) to keep overhead low and control precise.

### Libraries & Tools
-   **Vitest**: Unit testing framework.
-   **Prettier**: Code formatting.
-   **ESLint**: Static analysis (Standard config).

### Technical Constraints
-   **Zero Runtime Dependencies**: The core game engine must run without external libraries to ensure portability.
-   **Asset Size**: All images must be optimized (WebP/PNG) to keep initial load under 5MB.
-   **Browser Support**: Modern browsers only (Chrome/Edge/Safari/Firefox latest).

## Project Structure

### File Organization
The project follows a "Feature-by-Layer" organization:

```text
src/
├── assets/           # Static Assets (Images, Icons)
│   ├── s{N}_q{YY}.png       # Question images (s1_q01.png ... s10_q10.png)
│   ├── ADAM.png              # A.D.A.M. mascot
│   ├── logo_v7.png           # Title logo
│   ├── license_*.png         # Ending license cards
│   ├── key_icon.svg          # Key skill icon
│   └── lock_icon.svg         # Lock icon
├── data/             # Static Data Definitions
│   ├── stages/               # Per-stage question definitions
│   │   ├── stageTemplate.ts  # Factory functions for stage creation
│   │   └── stage{1-10}.ts    # Stage-specific questions
│   ├── stageMetadata.ts      # Stage metadata (themes, skills, thresholds)
│   ├── skillEffects.ts       # Skill effect handler registry
│   ├── adamDialogue.ts       # A.D.A.M. commentary system
│   └── question_sources/     # Research material for question writing
├── logic/            # Pure Business Logic (No side effects, No DOM)
│   └── gameEngine.ts
├── storage/          # Persistence Layer
│   ├── RecordStorage.ts      # localStorage wrapper for game records
│   └── GlobalProgressStorage.ts  # Cross-stage progress tracking
├── styles/           # Modular CSS (imported by style.css)
│   ├── variables.css         # Design tokens (colors, spacing, typography)
│   ├── base.css              # Body, container, progress bar
│   ├── layout.css            # HUD, interaction area, overlay
│   ├── components.css        # Buttons, skill UI, rank stamps
│   ├── animations.css        # Keyframes (mascot, score, shimmer)
│   └── responsive.css        # PC/mobile media queries
├── ui/               # Presentation Layer (Side effects allowed)
│   ├── render.ts             # UIManager class
│   ├── overlayVerdict.ts     # Verdict overlay rendering
│   └── domIds.ts             # DOM element ID registry
├── utils/
│   └── shuffle.ts            # Array shuffle utility
├── config.ts         # Centralized configuration constants
├── types.ts          # TypeScript type definitions
├── style.css         # CSS entry point (imports all modules)
└── main.ts           # Composition Root

tests/
├── logic/
│   └── gameEngine.test.ts    # GameEngine unit tests
└── data/
    ├── skillEffects.test.ts  # Skill effect tests
    ├── stageValidation.test.ts # Stage structure validation
    └── stages/
        └── stage10.test.ts   # Stage 10 specific tests

scripts/
├── simulate_stage.mjs        # Stage balance simulation (DFS)
└── compare_stages.mjs        # Cross-stage comparison report
```

### Naming Conventions
-   **Files**: `camelCase.ts` (e.g., `gameEngine.ts`) unless exporting a single class, then `PascalCase.ts` represents the class.
-   **Classes**: `PascalCase` (`GameEngine`, `UIManager`).
-   **Methods**: `camelCase` (`processChoice`).
-   **Constants**: `UPPER_SNAKE_CASE` for configuration values.

### Import Patterns
-   Prefer explicit relative imports (`./logic/gameEngine`).
-   Avoid circular dependencies between `ui` and `logic`. `ui` depends on `logic`. `logic` should NOT depend on `ui`.
