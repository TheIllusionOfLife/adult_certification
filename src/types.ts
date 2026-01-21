export type Difficulty = 'Intro' | 'Common' | 'Advanced' | 'Expert' | 'Nightmare';

export interface Choice {
    text: string;
    effect: {
        cs: number;
        money: number;
        sanity: number;
    };
    feedback: string;
}

export interface Question {
    id: string;
    category: string;
    text: string;
    imagePrompt: string; // Original 'image' field, used for generation
    imagePath?: string;   // Path to generated asset
    choices: Choice[];
    difficulty: Difficulty;
}

export interface Skill {
    id: string;
    name: string;
    desc: string;
    effect: string;
}

export interface GameState {
    cs: number;
    money: number;
    sanity: number;
    skills: string[];
    currentQuestionIndex: number;
    isGameOver: boolean;
    questions: Question[]; // The subset of questions for this run
}
