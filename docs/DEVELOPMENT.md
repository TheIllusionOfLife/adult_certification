# Development & Contribution Guide

## 💻 Environment Setup

### Requirements
-   **Node.js**: v18.0.0 or higher.
-   **npm**: v8.0.0 or higher.
-   **Browser**: Chrome (recommended), Firefox, or Safari (Modern).

### Setup
1.  `npm install`
2.  `npm run dev` (Starts Vite server at `http://localhost:5173`)

## 🎨 Coding Style

We follow standard TypeScript best practices with a focus on functional clarity.

-   **Formatting**: Prettier default settings (2 spaces indentation, semicolons).
-   **Naming Conventions**:
    -   Classes: `PascalCase` (e.g., `GameEngine`)
    -   Functions/Methods: `camelCase` (e.g., `processChoice`)
    -   Variables: `camelCase` default, `UPPER_SNAKE_CASE` for constants.
-   **CSS**:
    -   Use CSS Variables for colors (`var(--ink-black)`).
    -   Avoid deep nesting. Keep selectors flat when possible.
    -   Use Flexbox/Grid for layout. Avoid `float`.

## 🧪 Testing Strategy

The project uses **bun test** for unit testing with 88+ tests covering core logic.

### Running Tests
```bash
bun test              # Run all tests
bun test --watch      # Watch mode
bun test --coverage   # With coverage report
```

### Running Linter
```bash
npm run lint          # Run ESLint on src and tests
npm run lint:fix      # Auto-fix linting issues
```

### Test Coverage
-   **GameEngine** (`tests/logic/gameEngine.test.ts`): processChoice, isChoiceLocked, calculateEnding, skill management
-   **SkillEffects** (`tests/data/skillEffects.test.ts`): All 18 effect types, damage reduction, gain amplification
-   **Stage Validation** (`tests/data/stageValidation.test.ts`): Structure validation for all 9 stages

### Manual Test Scenarios
1.  **Game Over Check**: Deliberately reduce CS or Sanity to 0. Verify "TERMINATED" screen.
2.  **Victory Check**: Complete all questions. Verify "COMPLETE" screen and Rank calculation.
3.  **Skill Activation**: Acquire a damage reduction skill and take damage. Verify damage reduction log.
4.  **Persistence**: Reload the page after finishing a game. Verify the Stamp appears on the Title Screen.

## 📦 Pull Request Process

1.  Fork the repository.
2.  Create a feature branch (`feat/new-skill-system`).
3.  Commit changes with descriptive messages.
4.  Ensure no console errors during gameplay.
5.  Submit PR to `main`.
