export const CONFIG = {
    SKILL_OFFER_POSITIONS: [2, 6] as number[], // After Q3 (index 2) and Q7 (index 6)
    QUESTIONS_PER_GAME: 10,
    BUTTON_DELAY_MS: 500,
    RANK_THRESHOLDS: {
        S: 80,
        A: 50,
        B: 20
        // C = clear (CS >= 1), no explicit threshold
    }
};
