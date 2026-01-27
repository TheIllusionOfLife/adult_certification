/**
 * Registry of DOM element IDs used throughout the application.
 * Centralizes all element ID strings to prevent typos and enable IDE autocomplete.
 */
export const DOM_IDS = {
    // Main game display
    MAIN_IMAGE: 'main-image',
    QUESTION_CATEGORY: 'q-category',
    QUESTION_NUMBER: 'q-number',
    QUESTION_TEXT: 'question-text',
    CHOICES_GRID: 'choices-grid',
    SCENE_DESC_OVERLAY: 'scene-desc-overlay',

    // HUD (stats display)
    SCORE_CS: 'score-cs',
    SCORE_ASSET: 'score-asset',
    SCORE_AUTONOMY: 'score-autonomy',
    PROGRESS_BAR: 'progress-bar',

    // Containers
    GAME_CONTAINER: 'game-container',

    // Overlay (feedback/ending display)
    OVERLAY: 'overlay',
    OVERLAY_TITLE: 'overlay-title',
    OVERLAY_BODY: 'overlay-body',
    OVERLAY_STATS: 'overlay-stats',
    BTN_NEXT: 'btn-next',

    // Skill selection
    SKILL_SELECT_BOX: 'skill-select-box',
    SKILL_LIST: 'skill-list',

    // Start screen
    START_SCREEN: 'start-screen',
    DIFFICULTY_LIST: 'difficulty-list',

    // Mascot (A.D.A.M.)
    MASCOT_CONTAINER: 'mascot-container',
    MASCOT_IMG: 'mascot-img',

    // Title screen
    TITLE_LOGO: 'title-logo-img',
} as const;

// Type for DOM element ID values
export type DOMElementId = (typeof DOM_IDS)[keyof typeof DOM_IDS];
