# Architecture Overview

**Adult Certification** follows a simple, robust Vanilla TypeScript architecture designed for maintainability and readability without the overhead of heavy frameworks.

## 🏗️ High-Level Structure

```mermaid
graph TD
    Main[main.ts] -->|Initializes| Engine[GameEngine]
    Main -->|Initializes| UI[UIManager]
    UI -->|Observes| Engine
    Engine -->|Loads| Data[questions.ts / skills.ts]
    
    subgraph Logic Layer
        Engine -->|State| GameState
        Engine -->|Method| processChoice()
        Engine -->|Method| calculateEnding()
    end
    
    subgraph Presentation Layer
        UI -->|Method| renderCurrentQuestion()
        UI -->|Method| updateHUD()
        UI -->|Method| showFeedback()
        UI -->|Styles| CSS[style.css]
    end
```

## 🧩 Core Components

### 1. `GameEngine` (`src/logic/gameEngine.ts`)
The brain of the application. It holds no reference to the DOM.
-   **Responsibilities**:
    -   Managing `GameState` (CS, Asset, Autonomy, History).
    -   Processing user choices and calculating effects.
    -   Handling skill logic and random probability checks.
    -   Determining Game Over / Victory conditions.
-   **Design Principle**: Pure logic. verifiable via unit tests (in theory).

### 2. `UIManager` (`src/ui/render.ts`)
The face of the application. It handles all DOM manipulations.
-   **Responsibilities**:
    -   Updating the textual display (Score counters, Question text).
    -   Rendering buttons for choices and skills.
    -   Managing overlays (Feedback, Game Over, Start Screen).
    -   Handling CSS animations (e.g., score pop-ups).
-   **Design Principle**: Decoupled from logic. It only reads from `GameEngine` and sends user intents back to it.

### 3. Data Layer (`src/data/`)
-   **`questions.ts`**: The database of all scenario questions, strictly typed.
-   **`skills.ts`**: Definitions of player abilities.

## 🔄 State Flow

1.  **User Action**: Clicks a choice button in `UIManager`.
2.  **Logic Processing**: `UIManager` calls `engine.processChoice(choice)`.
3.  **State Update**: `GameEngine` updates `CS`, `Asset`, `Autonomy` and returns a result object.
4.  **Feedback Rendering**: `UIManager` receives the result and displays the overlay/result text.
5.  **HUD Update**: `UIManager` refreshes the status bars based on the new state.

## 💻 Technology Stack

### Core Framework
-   **Vite**: Build tool and dev server. Chosen for speed and minimal config.
-   **TypeScript**: Strict typing is Enforced. No `any` allow-list.
-   **Vanilla JS/DOM**: No UI frameworks (React/Vue) allowed for the Game Loop to keep overhead low and control precise.

### Libraries & Tools
-   **Prettier**: Code formatting.
-   **ESLint**: Static analysis (Standard config).
-   **Mermaid**: For diagrams in documentation.

### Technical Constraints
-   **Zero Runtime Dependencies**: The core game engine must run without external libraries to ensure portability.
-   **Asset Size**: All images must be optimized (WebP/PNG) to keep initial load under 5MB.
-   **Browser Support**: Modern browsers only (Chrome/Edge/Safari/Firefox latest).

## 📂 Project Structure

### File Organization
The project follows a "Feature-by-Layer" organization:

```text
src/
├── assets/          # Static Assets (Images, Icons)
│   └── [category]_q[id].png  # Naming: category_qid.png
├── data/            # Static Data Definitions
│   ├── questions.ts # The immutable database of questions
│   └── skills.ts    # Skill definitions
├── logic/           # Pure Business Logic (No side effects, No DOM)
│   └── gameEngine.ts
├── ui/              # Presentation Layer (Side effects allowed)
│   └── render.ts
└── main.ts          # Composition Root
```

### Naming Conventions
-   **Files**: `camelCase.ts` (e.g., `gameEngine.ts`) unless exporting a single class, then `PascalCase.ts` represents the class.
    -   *Current Exception*: `gameEngine.ts` exports `GameEngine` class (should ideally be `GameEngine.ts` or kept as module name).
-   **Classes**: `PascalCase` (`GameEngine`, `UIManager`).
-   **methods**: `camelCase` (`processChoice`).
-   **Constants**: `UPPER_SNAKE_CASE` for configuration values.

### Import Patterns
-   Prefer explicit relative imports (`./logic/gameEngine`).
-   Avoid circular dependencies between `ui` and `logic`. `ui` depends on `logic`. `logic` should NOT depend on `ui`.
