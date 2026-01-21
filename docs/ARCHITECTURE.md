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
    -   Managing `GameState` (CS, Money, Sanity, History).
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
3.  **State Update**: `GameEngine` updates `cs`, `money`, `sanity` and returns a result object.
4.  **Feedback Rendering**: `UIManager` receives the result and displays the overlay/result text.
5.  **HUD Update**: `UIManager` refreshes the status bars based on the new state.

## 🛠️ File Structure

```text
src/
├── assets/          # Images, Icons
├── data/            # Static Data (Questions, Skills)
├── logic/           # Business Logic (GameEngine)
├── ui/              # Presentation Logic (UIManager)
├── types.ts         # TypeScript Interfaces
├── main.ts          # Entry Point & Wiring
└── style.css        # Global Styles
```
