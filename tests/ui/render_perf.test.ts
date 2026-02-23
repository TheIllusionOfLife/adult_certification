import { describe, it, expect, beforeEach, mock, spyOn } from 'bun:test';
import { UIManager } from '../../src/ui/render';
import { GameEngine } from '../../src/logic/gameEngine';
import { DOM_IDS } from '../../src/ui/domIds';

describe('UIManager Performance', () => {
    let ui: UIManager;
    let engine: GameEngine;

    beforeEach(() => {
        // Setup DOM with necessary elements
        document.body.innerHTML = `
            <img id="${DOM_IDS.MAIN_IMAGE}" />
            <div id="${DOM_IDS.QUESTION_CATEGORY}"></div>
            <div id="${DOM_IDS.QUESTION_NUMBER}"></div>
            <div id="${DOM_IDS.QUESTION_TEXT}"></div>
            <div id="${DOM_IDS.CHOICES_GRID}"></div>
            <div id="${DOM_IDS.SCORE_CS}"></div>
            <div id="${DOM_IDS.SCORE_ASSET}"></div>
            <div id="${DOM_IDS.SCORE_AUTONOMY}"></div>
            <div id="${DOM_IDS.PROGRESS_BAR}"></div>
            <div id="${DOM_IDS.GAME_CONTAINER}"></div>
            <div id="${DOM_IDS.SCENE_DESC_OVERLAY}"></div>
            <div id="${DOM_IDS.OVERLAY}"></div>
            <div id="${DOM_IDS.OVERLAY_TITLE}"></div>
            <div id="${DOM_IDS.OVERLAY_BODY}"></div>
            <div id="${DOM_IDS.OVERLAY_STATS}"></div>
            <button id="${DOM_IDS.BTN_NEXT}"></button>
            <div id="${DOM_IDS.SKILL_SELECT_BOX}"></div>
            <div id="${DOM_IDS.SKILL_LIST}"></div>
            <div id="${DOM_IDS.START_SCREEN}"></div>
            <div id="${DOM_IDS.DIFFICULTY_LIST}"></div>
            <div id="${DOM_IDS.MASCOT_CONTAINER}"></div>
            <img id="${DOM_IDS.MASCOT_IMG}" />
            <img id="${DOM_IDS.TITLE_LOGO}" />
            <div id="${DOM_IDS.ADAM_SPEECH_SCREEN}"></div>
            <div id="${DOM_IDS.ADAM_SPEECH_TEXT}"></div>
            <button id="${DOM_IDS.ADAM_SPEECH_BTN}"></button>
            <div id="title-desc"></div>
        `;

        // Mock Engine with empty questions
        engine = new GameEngine([], 1);
        ui = new UIManager(engine);
    });

    it('should cache title-desc element to avoid repeated DOM queries', () => {
        const onSelect = mock();
        const getElementByIdSpy = spyOn(document, 'getElementById');

        // First call to showStartScreen
        ui.showStartScreen(onSelect);

        // Check that none of the calls were for 'title-desc'
        const callsForTitleDesc = getElementByIdSpy.mock.calls.filter(args => args[0] === 'title-desc');
        expect(callsForTitleDesc.length).toBe(0);

        // Clear mock for next assertion
        getElementByIdSpy.mockClear();

        // Second call to showStartScreen
        ui.showStartScreen(onSelect);

        const callsForTitleDesc2 = getElementByIdSpy.mock.calls.filter(args => args[0] === 'title-desc');
        expect(callsForTitleDesc2.length).toBe(0);

        getElementByIdSpy.mockRestore();
    });
});
