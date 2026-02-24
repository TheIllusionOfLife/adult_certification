import { DOM_IDS } from '../domIds';

export interface DOMElements {
    mainImage: HTMLImageElement;
    qCat: HTMLElement;
    qNum: HTMLElement;
    qText: HTMLElement;
    choices: HTMLElement;
    cs: HTMLElement;
    asset: HTMLElement;
    autonomy: HTMLElement;
    bar: HTMLElement;
    container: HTMLElement;
    sceneDesc: HTMLElement;
    overlay: HTMLElement;
    ovTitle: HTMLElement;
    ovBody: HTMLElement;
    ovStats: HTMLElement;
    btnNext: HTMLButtonElement;
    skillBox: HTMLElement;
    skillList: HTMLElement;
    startScreen: HTMLElement;
    diffList: HTMLElement;
    mascotContainer: HTMLElement;
    mascotImg: HTMLImageElement;
    titleLogo: HTMLImageElement;
    titleDesc: HTMLElement;
    adamSpeechScreen: HTMLElement;
    adamSpeechText: HTMLElement;
    adamSpeechBtn: HTMLButtonElement;
    statLabels: NodeListOf<HTMLElement>;
}

export class DOMManager {
    public dom: DOMElements;

    constructor() {
        const getEl = <T extends HTMLElement>(id: string): T => {
            const el = document.getElementById(id);
            if (!el) throw new Error(`Required element #${id} not found`);
            return el as T;
        };
        this.dom = {
            mainImage: getEl<HTMLImageElement>(DOM_IDS.MAIN_IMAGE),
            qCat: getEl<HTMLElement>(DOM_IDS.QUESTION_CATEGORY),
            qNum: getEl<HTMLElement>(DOM_IDS.QUESTION_NUMBER),
            qText: getEl<HTMLElement>(DOM_IDS.QUESTION_TEXT),
            choices: getEl<HTMLElement>(DOM_IDS.CHOICES_GRID),
            cs: getEl<HTMLElement>(DOM_IDS.SCORE_CS),
            asset: getEl<HTMLElement>(DOM_IDS.SCORE_ASSET),
            autonomy: getEl<HTMLElement>(DOM_IDS.SCORE_AUTONOMY),
            bar: getEl<HTMLElement>(DOM_IDS.PROGRESS_BAR),
            container: getEl<HTMLElement>(DOM_IDS.GAME_CONTAINER),
            sceneDesc: getEl<HTMLElement>(DOM_IDS.SCENE_DESC_OVERLAY),
            overlay: getEl<HTMLElement>(DOM_IDS.OVERLAY),
            ovTitle: getEl<HTMLElement>(DOM_IDS.OVERLAY_TITLE),
            ovBody: getEl<HTMLElement>(DOM_IDS.OVERLAY_BODY),
            ovStats: getEl<HTMLElement>(DOM_IDS.OVERLAY_STATS),
            btnNext: getEl<HTMLButtonElement>(DOM_IDS.BTN_NEXT),
            skillBox: getEl<HTMLElement>(DOM_IDS.SKILL_SELECT_BOX),
            skillList: getEl<HTMLElement>(DOM_IDS.SKILL_LIST),
            startScreen: getEl<HTMLElement>(DOM_IDS.START_SCREEN),
            diffList: getEl<HTMLElement>(DOM_IDS.DIFFICULTY_LIST),
            mascotContainer: getEl<HTMLElement>(DOM_IDS.MASCOT_CONTAINER),
            mascotImg: getEl<HTMLImageElement>(DOM_IDS.MASCOT_IMG),
            titleLogo: getEl<HTMLImageElement>(DOM_IDS.TITLE_LOGO),
            titleDesc: getEl<HTMLElement>(DOM_IDS.TITLE_DESC),
            adamSpeechScreen: getEl<HTMLElement>(DOM_IDS.ADAM_SPEECH_SCREEN),
            adamSpeechText: getEl<HTMLElement>(DOM_IDS.ADAM_SPEECH_TEXT),
            adamSpeechBtn: getEl<HTMLButtonElement>(DOM_IDS.ADAM_SPEECH_BTN),
            statLabels: document.querySelectorAll<HTMLElement>('.stat-label')
        };
    }

    get elements(): DOMElements {
        return this.dom;
    }
}
