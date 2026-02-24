import { GameEngine } from '../logic/gameEngine';
import type { Choice, Question } from '../types';
import { CONFIG } from '../config';
import { RecordStorage } from '../storage/RecordStorage';
import { adamDialogue, adamDialogueEN } from '../data/adamDialogue';
import { getLang } from '../i18n/lang';

import { DOMManager } from './renderers/DOMManager';
import { StartScreen } from './renderers/StartScreen';
import { HUD } from './renderers/HUD';
import { AdamSpeech } from './renderers/AdamSpeech';
import { QuestionScreen } from './renderers/QuestionScreen';
import { FeedbackScreen, type FeedbackResult } from './renderers/FeedbackScreen';
import { SkillScreen } from './renderers/SkillScreen';
import { EndingScreen } from './renderers/EndingScreen';

export class UIManager {
    engine: GameEngine;
    private recordStorage: RecordStorage;

    // Renderers
    private dom: DOMManager;
    private startScreen: StartScreen;
    private hud: HUD;
    private adamSpeech: AdamSpeech;
    private questionScreen: QuestionScreen;
    private feedbackScreen: FeedbackScreen;
    private skillScreen: SkillScreen;
    private endingScreen: EndingScreen;

    constructor(engine: GameEngine) {
        this.engine = engine;
        this.recordStorage = new RecordStorage();

        this.dom = new DOMManager();
        this.startScreen = new StartScreen(this.dom);
        this.hud = new HUD(this.dom);
        this.adamSpeech = new AdamSpeech(this.dom);
        this.questionScreen = new QuestionScreen(this.dom);
        this.feedbackScreen = new FeedbackScreen(this.dom, (state) => this.hud.updateMascot(state));
        this.skillScreen = new SkillScreen(this.dom);
        this.endingScreen = new EndingScreen(this.dom);
    }

    saveRecord(difficulty: string, rank: string, score: number) {
        void this.recordStorage.save(difficulty, rank, score);
    }

    setEngine(engine: GameEngine) {
        this.engine = engine;
    }

    showStartScreen(onSelect: (stageNum: number) => void) {
        this.startScreen.show(this.recordStorage, this.engine.getGlobalProgress(), onSelect);
    }

    showAdamSpeech(lines: string[], onDismiss: () => void): void {
        this.adamSpeech.show(lines, onDismiss);
    }

    updateHUD() {
        this.hud.update(this.engine.state);
    }

    updateMascot(state: 'happy' | 'glitch' | 'neutral') {
        this.hud.updateMascot(state);
    }

    renderCurrentQuestion() {
        const q = this.engine.getCurrentQuestion();
        if (!q) {
            this.finishGame();
            return;
        }

        // A.D.A.M. speech screen before Q1 (intro)
        const idx = this.engine.state.currentQuestionIndex;
        const timing = idx === 0 ? 'intro' : null;
        if (timing) {
            const key = `${timing}-${idx}`;
            if (!this.adamSpeech.hasShownFor(key)) {
                const lines = this.getAdamLinesForTiming(timing);
                if (lines) {
                    this.adamSpeech.markShown(key);
                    this.showAdamSpeech(lines, () => this.doRenderQuestion(q));
                    return;
                }
            }
        }

        this.doRenderQuestion(q);
    }

    private doRenderQuestion(q: Question) {
        this.questionScreen.render(
            q,
            this.engine.state.currentQuestionIndex,
            this.engine.state.questions.length,
            (c) => this.engine.isChoiceLocked(c),
            (c, i) => this.handleChoice(c, q, i)
        );
        this.updateHUD();
    }

    handleChoice(choice: Choice, question: Question, choiceIndex: number) {
        const result = this.engine.processChoice(choice, question, choiceIndex);
        this.showFeedback({ ...result, choiceVerdict: choice.verdict });
    }

    showFeedback(result: FeedbackResult) {
        const idx = this.engine.state.currentQuestionIndex;
        const shouldOfferSkills = !result.isTerminated && CONFIG.SKILL_OFFER_POSITIONS.includes(idx);

        // Find next question
        const nextIndex = idx + 1;
        const nextQ = nextIndex < this.engine.state.questions.length ? this.engine.state.questions[nextIndex] : null;

        this.feedbackScreen.show(
            result,
            shouldOfferSkills,
            nextQ,
            () => this.closeFeedback(), // onNext
            () => location.reload()    // onRestart
        );

        if (shouldOfferSkills) {
            this.offerSkills();
        }
    }

    offerSkills() {
        // Determine which offer this is (1 or 2) dynamically from CONFIG
        const idx = this.engine.state.currentQuestionIndex;
        const offerNumber = (CONFIG.SKILL_OFFER_POSITIONS.indexOf(idx) + 1) as 1 | 2;
        const skillsWithStatus = this.engine.getSkillsForOfferWithStatus(offerNumber);

        this.skillScreen.show(skillsWithStatus, (s) => {
            this.engine.addSkill(s);
            this.hud.updateSkillList(this.engine.activeSkills);
            this.closeFeedback();
        });
    }

    closeFeedback() {
        const idx = this.engine.state.currentQuestionIndex;
        const skillOfferIdx = CONFIG.SKILL_OFFER_POSITIONS.indexOf(idx);

        const d = this.dom.elements;
        d.overlay.style.display = 'none';
        d.skillBox.style.display = 'none';

        this.engine.nextQuestion();

        // After skill offer 2 → keySkillAcquired (only if key skill was obtained)
        if (skillOfferIdx === 1 && this.engine.state.keySkills.length > 0) {
            const key = `keySkillAcquired-${idx}`;
            if (!this.adamSpeech.hasShownFor(key)) {
                const lines = this.getAdamLinesForTiming('keySkillAcquired');
                if (lines) {
                    this.adamSpeech.markShown(key);
                    this.showAdamSpeech(lines, () => this.renderCurrentQuestion());
                    return;
                }
            }
        }

        this.renderCurrentQuestion();
    }

    finishGame() {
        const d = this.dom.elements;
        d.bar.style.width = '100%';

        const s = this.engine.state;
        const ending = this.engine.calculateEnding();

        this.engine.recordStageCompletion(ending.rank as 'S' | 'A' | 'B' | 'C');

        const dl = this.getLocalizedDialogue(s.currentStage);
        const rankKey = ending.rank as 'S' | 'A' | 'B' | 'C';
        const adamComment = dl?.outro[rankKey] || ending.desc;

        this.endingScreen.show(
            ending,
            s.currentStage,
            s.CS,
            s.Asset,
            s.Autonomy,
            s.keySkills,
            adamComment,
            this.engine.getGlobalProgress(),
            () => location.reload()
        );

        const stageKey = `Stage${this.engine.state.currentStage}`;
        this.saveRecord(stageKey, ending.rank, s.CS);
    }

    private getStageDialogue(stageNum: number) {
        const key = `stage${stageNum}` as keyof typeof adamDialogue;
        const ja = adamDialogue[key];
        const en = adamDialogueEN[key];
        if (!ja) return null;
        return { ja, en: en || null };
    }

    private getLocalizedDialogue(stageNum: number) {
        const d = this.getStageDialogue(stageNum);
        if (!d) return null;
        return getLang() === 'en' && d.en ? d.en : d.ja;
    }

    private getAdamLinesForTiming(timing: 'intro' | 'keySkillAcquired'): string[] | null {
        const dl = this.getLocalizedDialogue(this.engine.state.currentStage);
        if (!dl) return null;
        return dl[timing] ?? null;
    }
}
