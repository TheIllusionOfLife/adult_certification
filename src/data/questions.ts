import { introQuestions } from './questions/intro';
import { commonQuestions } from './questions/common';
import { advancedQuestions } from './questions/advanced';
import { expertQuestions } from './questions/expert';
import { nightmareQuestions } from './questions/nightmare';
import type { Question, Difficulty } from '../types';

export const questionDatabase: Record<Difficulty, Question[]> = {
    'Intro': introQuestions,
    'Common': commonQuestions,
    'Advanced': advancedQuestions,
    'Expert': expertQuestions,
    'Nightmare': nightmareQuestions
};

// Fallback for flat list if needed
export const questions: Question[] = [
    ...introQuestions,
    ...commonQuestions,
    ...advancedQuestions,
    ...expertQuestions,
    ...nightmareQuestions
];
