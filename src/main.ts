import './style.css';
import { GameEngine } from './logic/gameEngine';
import { UIManager } from './ui/render';
import { questionDatabase } from './data/questions';
import type { Question } from './types';
import { CONFIG } from './config';

// Fixed questions for verification to ensure image loading check
const FIXED_FIRST_QUESTIONS: Record<string, string> = {
  'Intro': 'q_intro_03',
  'Common': 'q_common_01',
  'Advanced': 'q_adv_01',
  'Expert': 'q_exp_06',
  'Nightmare': 'q_nm_01'
};

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function selectRandomQuestions(questions: Question[], count: number, forceFirstId?: string): Question[] {
  let pool = [...questions];
  let firstQuestion: Question | undefined;

  if (forceFirstId) {
    const foundIndex = pool.findIndex(q => q.id === forceFirstId);
    if (foundIndex !== -1) {
      firstQuestion = pool[foundIndex];
      pool.splice(foundIndex, 1); // Remove from pool to avoid duplicate
    }
  }

  // Shuffle remaining with Fisher-Yates
  const shuffled = shuffle(pool);

  // Select remaining needed count
  const needed = forceFirstId && firstQuestion ? count - 1 : count;
  const selected = shuffled.slice(0, needed);

  // Prepend forced question
  if (firstQuestion) {
    selected.unshift(firstQuestion);
  }

  return selected;
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('game-container');
  if (!app) return;

  // Initial Engine with empty questions to satisfy constructor
  let engine = new GameEngine([]);
  const ui = new UIManager(engine);

  // Show Start Screen
  ui.showStartScreen((difficulty) => {
    console.log(`Starting game with difficulty: ${difficulty}`);

    const pool = questionDatabase[difficulty];
    const forceId = FIXED_FIRST_QUESTIONS[difficulty]; // Get fixed question ID

    // If pool is small (e.g. testing), take all
    const count = Math.min(pool.length, CONFIG.QUESTIONS_PER_GAME);
    const selected = selectRandomQuestions(pool, count, forceId);

    // Setup new game engine
    engine = new GameEngine(selected);
    engine.difficulty = difficulty;
    ui.setEngine(engine);

    // Start
    ui.renderCurrentQuestion();
  });
});
