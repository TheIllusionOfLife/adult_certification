import './style.css';
import { GameEngine } from './logic/gameEngine';
import { UIManager } from './ui/render';
import { stage1Questions } from './data/stages/stage1';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('game-container');
  if (!app) return;

  // Initial Engine with empty questions to satisfy constructor
  let engine = new GameEngine([], 1);
  const ui = new UIManager(engine);

  // Show Start Screen (temporarily using the old UI)
  ui.showStartScreen((difficulty) => {
    console.log(`Starting Stage 1 (was: ${difficulty})`);

    // Use Stage 1 questions in fixed order (no shuffle)
    const selected = stage1Questions;

    // Setup new game engine for Stage 1
    engine = new GameEngine(selected, 1);
    engine.difficulty = "Stage1"; // For backwards compatibility
    ui.setEngine(engine);

    // Start
    ui.renderCurrentQuestion();
  });
});
