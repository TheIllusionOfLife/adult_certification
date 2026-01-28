// Legacy difficulty types (for backward compatibility with old question database)
export type LegacyDifficulty = 'Intro' | 'Common' | 'Advanced' | 'Expert' | 'Nightmare';

// Stage-based difficulty (new system)
export type StageDifficulty = 'Stage1' | 'Stage2' | 'Stage3' | 'Stage4' | 'Stage5' |
                              'Stage6' | 'Stage7' | 'Stage8' | 'Stage9' | 'Stage10';

export type Difficulty = LegacyDifficulty | StageDifficulty;

// ============================================================
// FUTURE ARCHITECTURE: Global Ending System (Stage 10+)
// ============================================================

/**
 * License types for the 5 ending outcomes.
 * Determined by key skill collection and worst rank across completed stages.
 */
export type LicenseType =
    | 'TRUE'      // All 10 key skills collected (highest priority)
    | 'GOLD'      // Worst rank is S (all stages S rank)
    | 'SILVER'    // Worst rank is A
    | 'BRONZE'    // Worst rank is B
    | 'PAPER';    // Worst rank is C

/**
 * Cross-stage progress tracking for global ending calculation.
 * Persisted to localStorage.
 */
export interface GlobalProgress {
    stageRanks: Record<number, 'S' | 'A' | 'B' | 'C'>; // stageId -> rank
    keySkillsCollected: string[];                       // Array of key skill IDs
    completedStages: number[];                          // Array of completed stage IDs
}

// ============================================================

export interface Choice {
    text: string;
    effect: {
        CS: number;
        Asset: number;
        Autonomy: number;
    };
    feedback: string;
    // Player-facing overlay label. When omitted, UI falls back to CS delta.
    verdict?: 'APPROVED' | 'WARNING' | 'NEUTRAL';
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
    effects?: SkillEffect[];  // For multi-effect skills (applied in addition to main effect)
    category?: 'normal' | 'key';
    isCollectible?: boolean; // True for key skills that count toward True Ending unlock
    acquiredStage?: number;
    adamComment?: string;
    keySkillRequirement?: KeySkillRequirement; // For key skills: which Q/choice unlocks it
    isRecommended?: boolean; // A.D.A.M.'s recommendation - helps new players trust the system
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
