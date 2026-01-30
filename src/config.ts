export const CONFIG = {
    // Game structure
    SKILL_OFFER_POSITIONS: [2, 6] as number[], // After Q3 (index 2) and Q7 (index 6)
    QUESTIONS_PER_GAME: 10,
    TOTAL_STAGES: 10,

    // UI timing
    BUTTON_DELAY_MS: 500,

    // Ranking thresholds (CS-based)
    RANK_THRESHOLDS: {
        S: 200,
        A: 150,
        B: 100,
        // C = clear (CS >= 1), no explicit threshold
    },

    // Game over thresholds (danger levels)
    DANGER_THRESHOLDS: {
        CS: 0, // Game over at or below
        Asset: 0,
        Autonomy: 0,
    },

    // Default initial parameters (used when stage metadata unavailable)
    DEFAULT_INITIAL_PARAMS: {
        CS: 100,
        Asset: 100,
        Autonomy: 100,
    },

    // LocalStorage keys
    STORAGE_KEYS: {
        RECORDS: 'ac_records',
        GLOBAL_PROGRESS: 'ac_global_progress',
    },

    // Valid ranks for display
    VALID_RANKS: ['S', 'A', 'B', 'C'] as const,
} as const;

// Type for valid ranks
export type ValidRank = (typeof CONFIG.VALID_RANKS)[number];
