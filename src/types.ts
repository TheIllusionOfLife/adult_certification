export type Difficulty = 'Intro' | 'Common' | 'Advanced' | 'Expert' | 'Nightmare';

export interface Choice {
    text: string;
    effect: {
        CS: number;
        Asset: number;
        Autonomy: number;
    };
    feedback: string;
    lockRequirements?: {
        CS?: number;
        Asset?: number;
        Autonomy?: number;
    } | null;
    lockedFeedback?: string;
}

export interface ADAMDialogue {
    intro?: string;
    after?: string;
}

export interface Question {
    id: string;
    category: string;
    text: string;
    imagePrompt: string; // Original 'image' field, used for generation
    imagePath?: string;   // Path to generated asset
    choices: Choice[];
    difficulty?: Difficulty; // Optional for backwards compatibility
    adamDialogue?: ADAMDialogue;
}

export interface SkillEffect {
    type: string;
    value: number;
    category?: string;
    threshold?: number;
}

export interface KeySkillRequirement {
    questionId: string;
    choiceIndex: number; // 0-based index of the choice that must be selected
}

export interface Skill {
    id: string;
    name: string;
    nameEN?: string;
    desc: string;
    effect: SkillEffect;
    category?: 'normal' | 'key';
    isCollectible?: boolean; // True for key skills that count toward True Ending unlock
    acquiredStage?: number;
    adamComment?: string;
    keySkillRequirement?: KeySkillRequirement; // For key skills: which Q/choice unlocks it
}

export interface StageMetadata {
    id: number;
    theme: string;
    themeJP: string;
    keySkillId: string;
    initialParams: {
        CS: number;
        Asset: number;
        Autonomy: number;
    };
    rankThresholds: {
        S: { CS: number };
        A: { CS: number };
        B: { CS: number };
        // C = clear (CS >= 1), no explicit threshold needed
    };
    skills: {
        offer1: [Skill, Skill];
        offer2: [Skill, Skill];
    };
}

export interface GameState {
    CS: number;
    Asset: number;
    Autonomy: number;
    skills: string[];
    keySkills: string[];
    currentQuestionIndex: number;
    currentStage: number;
    isGameOver: boolean;
    questions: Question[];
    choiceHistory: Record<string, number>; // questionId -> choiceIndex (0-based)
}
