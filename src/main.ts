import './style.css';
import { GameEngine } from './logic/gameEngine';
import { UIManager } from './ui/render';
import type { Question } from './types';

// Import all stage questions (add more as stages are implemented)
import { stage1Questions } from './data/stages/stage1';

// Stage question registry - add more stages as they are implemented
const stageQuestions: Record<number, Question[]> = {
  1: stage1Questions,
  // 2: stage2Questions,
  // 3: stage3Questions,
  // etc.
};

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('game-container');
  if (!app) return;

  // Initial Engine with empty questions to satisfy constructor
  let engine = new GameEngine([], 1);
  const ui = new UIManager(engine);

  // Show Start Screen
  ui.showStartScreen((stageNum: number) => {
    console.log(`Starting Stage ${stageNum}`);

    // Get questions for the selected stage
    const selected = stageQuestions[stageNum];
    if (!selected) {
      console.warn(`Stage ${stageNum} questions not yet implemented. Using Stage 1.`);
      // Fallback to Stage 1 if stage not implemented
      engine = new GameEngine(stage1Questions, 1);
      engine.difficulty = "Stage1";
    } else {
      engine = new GameEngine(selected, stageNum);
      engine.difficulty = `Stage${stageNum}` as typeof engine.difficulty;
    }

    ui.setEngine(engine);

    // Start
    ui.renderCurrentQuestion();
  });
});
