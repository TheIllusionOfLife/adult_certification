import './style.css';
import { GameEngine } from './logic/gameEngine';
import { UIManager } from './ui/render';
import type { Question } from './types';

// Stage question registry - add more stages as they are implemented
const stageImporters: Record<number, () => Promise<Question[]>> = {
  1: async () => (await import('./data/stages/stage1')).stage1Questions,
  2: async () => (await import('./data/stages/stage2')).stage2Questions,
  3: async () => (await import('./data/stages/stage3')).stage3Questions,
  4: async () => (await import('./data/stages/stage4')).stage4Questions,
  5: async () => (await import('./data/stages/stage5')).stage5Questions,
  6: async () => (await import('./data/stages/stage6')).stage6Questions,
  7: async () => (await import('./data/stages/stage7')).stage7Questions,
  8: async () => (await import('./data/stages/stage8')).stage8Questions,
  9: async () => (await import('./data/stages/stage9')).stage9Questions,
  10: async () => (await import('./data/stages/stage10')).stage10Questions,
};

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('game-container');
  if (!app) return;

  // Initial Engine with empty questions to satisfy constructor
  let engine = new GameEngine([], 1);
  const ui = new UIManager(engine);

  // Show Start Screen
  ui.showStartScreen(async (stageNum: number) => {
    console.log(`Starting Stage ${stageNum}`);

    try {
      const importer = stageImporters[stageNum];
      if (!importer) {
        throw new Error(`Stage ${stageNum} importer not found`);
      }

      // Load questions for the selected stage
      const questions = await importer();
      engine = new GameEngine(questions, stageNum);
      engine.difficulty = `Stage${stageNum}` as typeof engine.difficulty;

    } catch (error) {
      console.warn(`Failed to load questions for Stage ${stageNum}. Using Stage 1 as fallback.`, error);
      // Fallback to Stage 1
      const fallbackQuestions = await stageImporters[1]();
      engine = new GameEngine(fallbackQuestions, 1);
      engine.difficulty = "Stage1";
    }

    ui.setEngine(engine);

    // Start
    ui.renderCurrentQuestion();
  });
});
