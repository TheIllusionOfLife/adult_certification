import { GameEngine } from '../logic/gameEngine';
import type { Choice, Question, LicenseType } from '../types';
import type { SkillActivation } from '../data/skillEffects';
import { CONFIG } from '../config';
import { getOverlayPresentation } from './overlayVerdict';
import { DOM_IDS } from './domIds';
import { RecordStorage } from '../storage/RecordStorage';
import { GlobalProgressStorage } from '../storage/GlobalProgressStorage';
import { STAGE_METADATA, getStageMetadata } from '../data/stageMetadata';
import { getLang, setLang, t } from '../i18n/lang';
import * as UI from '../i18n/uiStrings';
import { adamDialogue, adamDialogueEN } from '../data/adamDialogue';

// Vite glob import for assets
const images = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true });

interface DOMElements {
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
    adamSpeechScreen: HTMLElement;
    adamSpeechText: HTMLElement;
    adamSpeechBtn: HTMLButtonElement;
}

export class UIManager {
    engine: GameEngine;
    private dom: DOMElements;
    private recordStorage: RecordStorage;

    constructor(engine: GameEngine) {
        this.engine = engine;
        this.recordStorage = new RecordStorage();
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
            adamSpeechScreen: getEl<HTMLElement>(DOM_IDS.ADAM_SPEECH_SCREEN),
            adamSpeechText: getEl<HTMLElement>(DOM_IDS.ADAM_SPEECH_TEXT),
            adamSpeechBtn: getEl<HTMLButtonElement>(DOM_IDS.ADAM_SPEECH_BTN)
        };
    }

    saveRecord(difficulty: string, rank: string, score: number) {
        this.recordStorage.save(difficulty, rank, score);
    }

    setEngine(engine: GameEngine) {
        this.engine = engine;
    }

    showStartScreen(onSelect: (stageNum: number) => void) {
        this.dom.startScreen.style.display = 'flex';
        this.dom.diffList.innerHTML = '';

        // Language toggle
        const titleDesc = document.getElementById('title-desc');
        if (titleDesc) titleDesc.textContent = UI.UI_TITLE_DESC();

        let langBtn = document.getElementById('lang-toggle') as HTMLButtonElement | null;
        if (!langBtn) {
            langBtn = document.createElement('button');
            langBtn.id = 'lang-toggle';
            langBtn.className = 'lang-toggle-btn';
            this.dom.startScreen.insertBefore(langBtn, this.dom.startScreen.firstChild);
        }
        langBtn.textContent = getLang() === 'ja' ? 'EN' : '日本語';
        langBtn.onclick = () => {
            setLang(getLang() === 'ja' ? 'en' : 'ja');
            this.showStartScreen(onSelect);
        };

        // All 10 stages - only show unlocked stages (previous stage beaten)
        const allStages: { key: string, name: string, desc: string, keySkillId: string }[] = STAGE_METADATA.map((stage) => ({
            key: `Stage${stage.id}`,
            name: `STAGE ${stage.id}`,
            desc: t(stage.themeJP, stage.theme),
            keySkillId: stage.keySkillId
        }));

        // Get collected key skills from global progress
        const globalProgress = new GlobalProgressStorage();
        const collectedKeySkills = globalProgress.getKeySkillsCollected();

        // Only show stages that are unlocked (Stage 1 always visible, others require previous stage beaten)
        allStages.forEach((stage, index) => {
            if (!this.recordStorage.isStageUnlocked(index)) return; // Don't render locked stages

            const btn = document.createElement('div');
            btn.className = 'diff-btn';

            const record = this.recordStorage.get(stage.key);
            const validRanks: readonly string[] = CONFIG.VALID_RANKS;
            const safeRank = record && validRanks.includes(record.rank) ? record.rank : '';
            const rankClass = safeRank ? `rank-${safeRank}` : '';
            const hasKeySkill = collectedKeySkills.includes(stage.keySkillId);

            // Add shimmer effect for stages with both S rank and key skill
            if (safeRank === 'S' && hasKeySkill) {
                btn.classList.add('stage-perfected');
            }

            btn.innerHTML = `
                <div class="diff-info">
                    <span class="diff-name">${stage.name}</span>
                    <span class="diff-desc">${stage.desc}</span>
                </div>
                <div class="btn-right-col">
                    ${hasKeySkill ? `<span class="key-indicator" title="Key Skill ${UI.UI_KEY_SKILL_OBTAINED()}"></span>` : ''}
                    ${safeRank ? `<span class="rank-stamp ${rankClass}">${safeRank}</span>` : ''}
                    <span class="arrow">▶</span>
                </div>
            `;
            btn.addEventListener('click', () => {
                this.dom.startScreen.style.display = 'none';
                onSelect(index + 1); // Pass stage number (1-indexed)
            });
            this.dom.diffList.appendChild(btn);
        });
    }

    private lastScores = { CS: 100, Asset: 100, Autonomy: 100 };
    private adamSpeechShownFor = new Set<string>();
    private typewriterTimerId: ReturnType<typeof setTimeout> | null = null;
    private typewriterResolve: (() => void) | null = null;

    private typewriterEffect(element: HTMLElement, text: string, speed = 30): Promise<void> {
        return new Promise((resolve) => {
            this.cancelTypewriter();
            this.typewriterResolve = resolve;
            element.textContent = '';
            let i = 0;
            const tick = () => {
                if (i < text.length) {
                    element.textContent += text[i];
                    i++;
                    element.scrollTop = element.scrollHeight;
                    this.typewriterTimerId = setTimeout(tick, speed);
                } else {
                    this.typewriterTimerId = null;
                    this.typewriterResolve = null;
                    resolve();
                }
            };
            tick();
        });
    }

    private cancelTypewriter(): void {
        if (this.typewriterTimerId !== null) {
            clearTimeout(this.typewriterTimerId);
            this.typewriterTimerId = null;
        }
        if (this.typewriterResolve) {
            this.typewriterResolve();
            this.typewriterResolve = null;
        }
    }

    private getStageDialogue(stageNum: number) {
        const key = `stage${stageNum}` as keyof typeof adamDialogue;
        const ja = adamDialogue[key];
        const en = adamDialogueEN[key];
        if (!ja) return null;
        return { ja, en: en || null };
    }

    showAdamSpeech(lines: string[], onDismiss: () => void): void {
        const text = lines.filter(l => l.length > 0).join('\n');
        this.dom.adamSpeechScreen.style.display = 'flex';
        this.dom.adamSpeechBtn.disabled = true;
        this.dom.adamSpeechBtn.style.opacity = '0.5';

        this.typewriterEffect(this.dom.adamSpeechText, text, 25).then(() => {
            this.dom.adamSpeechBtn.disabled = false;
            this.dom.adamSpeechBtn.style.opacity = '1';
        });

        // Allow click to skip typewriter
        const skipHandler = () => {
            if (this.typewriterTimerId !== null) {
                this.cancelTypewriter();
                this.dom.adamSpeechText.textContent = text;
                this.dom.adamSpeechBtn.disabled = false;
                this.dom.adamSpeechBtn.style.opacity = '1';
            }
        };
        this.dom.adamSpeechScreen.onclick = (e) => {
            if (e.target === this.dom.adamSpeechBtn) return;
            skipHandler();
        };

        this.dom.adamSpeechBtn.onclick = () => {
            this.dom.adamSpeechScreen.onclick = null;
            this.dom.adamSpeechScreen.style.display = 'none';
            this.cancelTypewriter();
            onDismiss();
        };
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

    updateHUD() {
        const s = this.engine.state;

        // Update stat labels for current language
        const labels = document.querySelectorAll('.stat-label');
        const labelTexts = [UI.UI_LABEL_CS(), UI.UI_LABEL_ASSET(), UI.UI_LABEL_AUTONOMY()];
        labels.forEach((el, i) => { if (labelTexts[i]) el.textContent = labelTexts[i]; });

        // Helper for animation
        const animate = (el: HTMLElement, newVal: number, oldVal: number) => {
            el.innerText = String(newVal);
            el.classList.remove('score-pop-up', 'score-pop-down');
            void el.offsetWidth; // Trigger reflow
            if (newVal > oldVal) el.classList.add('score-pop-up');
            if (newVal < oldVal) el.classList.add('score-pop-down');
        };

        animate(this.dom.cs, s.CS, this.lastScores.CS);
        animate(this.dom.asset, s.Asset, this.lastScores.Asset);
        animate(this.dom.autonomy, s.Autonomy, this.lastScores.Autonomy);

        // Update last scores
        this.lastScores = { CS: s.CS, Asset: s.Asset, Autonomy: s.Autonomy };

        const progress = s.questions.length > 0
            ? (s.currentQuestionIndex / s.questions.length) * 100
            : 0;
        this.dom.bar.style.width = `${progress}%`;

        if (s.CS < 30 || s.Autonomy < 20 || s.Asset < 20) {
            this.dom.container.style.boxShadow = "0 0 50px red";
            this.updateMascot('glitch');
        } else {
            this.dom.container.style.boxShadow = "15px 15px 0px var(--ink-black)";
            // Only reset to happy/neutral if not in overlay (handled elsewhere)
        }
    }

    updateMascot(state: 'happy' | 'glitch' | 'neutral') {
        this.dom.mascotImg.className = ''; // Reset
        this.dom.mascotContainer.classList.remove('mascot-happy', 'mascot-glitch');

        if (state === 'happy') {
            this.dom.mascotContainer.classList.add('mascot-happy');
        } else if (state === 'glitch') {
            this.dom.mascotContainer.classList.add('mascot-glitch');
        }
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
        if (timing && !this.adamSpeechShownFor.has(`${timing}-${idx}`)) {
            this.adamSpeechShownFor.add(`${timing}-${idx}`);
            const lines = this.getAdamLinesForTiming(timing);
            if (lines) {
                this.showAdamSpeech(lines, () => this.doRenderQuestion(q));
                return;
            }
        }

        this.doRenderQuestion(q);
    }

    private doRenderQuestion(q: Question) {

        this.dom.qCat.innerText = q.category;
        this.dom.qNum.innerText = `Q.${this.engine.state.currentQuestionIndex + 1} / ${this.engine.state.questions.length}`;
        this.dom.qText.innerText = t(q.text, q.textEN);

        // Image Handling
        if (q.imagePath) {
            const assetPath = `../assets/${q.imagePath}`;
            const mod = images[assetPath] as { default: string } | undefined;
            if (mod?.default) {
                this.dom.mainImage.src = mod.default;
                this.dom.mainImage.classList.add('loaded');
            } else {
                console.warn(`Image not found for path: ${assetPath}`);
                this.dom.mainImage.src = '';
                this.dom.mainImage.classList.remove('loaded');
            }
        } else {
            this.dom.mainImage.src = '';
            this.dom.mainImage.classList.remove('loaded');
        }

        this.dom.sceneDesc.innerText = q.imagePrompt || '';

        this.dom.choices.innerHTML = '';
        q.choices.forEach((c: Choice, i: number) => {
            const btn = document.createElement('button');
            const isLocked = this.engine.isChoiceLocked(c);

            btn.className = isLocked ? 'choice-btn choice-locked' : 'choice-btn';

            let content = `<span class="choice-letter">${String.fromCharCode(65 + i)}</span><span class="choice-text">${t(c.text, c.textEN)}</span>`;

            if (isLocked && c.lockRequirements) {
                const req = c.lockRequirements;
                const parts: string[] = [];
                if (req.CS !== undefined) parts.push(UI.UI_LOCK_CS(req.CS));
                if (req.Asset !== undefined) parts.push(UI.UI_LOCK_ASSET(req.Asset));
                if (req.Autonomy !== undefined) parts.push(UI.UI_LOCK_AUTONOMY(req.Autonomy));
                const sep = getLang() === 'en' ? '; ' : '、';
                content += `<div class="lock-reason">${parts.join(sep)}</div>`;
            }

            btn.innerHTML = content;

            if (!isLocked) {
                btn.addEventListener('click', () => this.handleChoice(c, q, i));
            }
            // Locked choices are not clickable at all

            this.dom.choices.appendChild(btn);
        });

        this.updateHUD();
    }

    handleChoice(choice: Choice, question: Question, choiceIndex: number) {
        const result = this.engine.processChoice(choice, question, choiceIndex);
        this.showFeedback({ ...result, choiceVerdict: choice.verdict });
    }

    showFeedback(result: {
        outcome: { CS: number; Asset: number; Autonomy: number };
        feedback: string;
        isTerminated: boolean;
        skillActivations: SkillActivation[]
        choiceVerdict?: Choice['verdict'];
    }) {
        const { outcome, feedback, isTerminated, skillActivations, choiceVerdict } = result;
        const { CS, Asset, Autonomy } = outcome;

        const getAnimClass = (val: number) => {
            if (val > 0) return 'score-pop-up';
            if (val < 0) return 'score-pop-down';
            return '';
        };

        // Format skill activation messages as HTML
        const skillMessagesHTML = skillActivations.length > 0
            ? "<br>" + skillActivations.map(sa =>
                `<span class="skill-activation-msg">${UI.UI_SKILL_ACTIVATION(sa.skillName, sa.description, sa.originalValue, sa.modifiedValue)}</span>`
            ).join("<br>")
            : "";

        const overlay = getOverlayPresentation({
            isTerminated,
            csDelta: CS,
            choiceVerdict: choiceVerdict,
        });
        this.dom.ovTitle.innerText = overlay.title;
        this.dom.ovTitle.style.color = overlay.colorVar;

        // A.D.A.M. comment section commented out for smoother gameplay flow
        // const adamCommentMatch = feedback.match(/\[A\.D\.A\.M\.\]: (.+)$/);
        // const adamCommentHTML = adamCommentMatch
        //     ? `<div class="adam-comment-section">
        //         <img src="${this.dom.mascotImg.src}" alt="A.D.A.M." class="adam-comment-img" />
        //         <div class="adam-comment-text">[A.D.A.M.]: ${adamCommentMatch[1]}</div>
        //        </div>`
        //     : '';
        const mainFeedback = feedback.replace(/<br><br><span.*?\[A\.D\.A\.M\.\]:.*?<\/span>$/, '');

        this.dom.ovBody.innerHTML = mainFeedback + skillMessagesHTML;
        this.dom.ovStats.innerHTML = `
            <div class="stat-result ${getAnimClass(CS)}">
                <span class="stat-label">${UI.UI_STAT_CS_SHORT()}</span><br>
                <span class="stat-value">${CS > 0 ? '+' : ''}${CS}</span>
            </div>
            <div class="stat-result ${getAnimClass(Asset)}">
                <span class="stat-label">${UI.UI_STAT_ASSET_SHORT()}</span><br>
                <span class="stat-value">${Asset > 0 ? '+' : ''}${Asset}</span>
            </div>
            <div class="stat-result ${getAnimClass(Autonomy)}">
                <span class="stat-label">${UI.UI_STAT_AUTONOMY_SHORT()}</span><br>
                <span class="stat-value">${Autonomy > 0 ? '+' : ''}${Autonomy}</span>
            </div>
        `;

        // Mascot Reaction
        if (CS > 0) this.updateMascot('happy');
        else if (Autonomy < 0 || CS < 0) this.updateMascot('glitch');
        else this.updateMascot('neutral');

        if (isTerminated) {
            this.dom.btnNext.style.display = 'block';
            this.dom.ovBody.innerHTML += `
                <div class="adam-comment-section adam-comment-final">
                    <img src="${this.dom.mascotImg.src}" alt="A.D.A.M." class="adam-comment-img" />
                    <div class="adam-comment-text">${UI.UI_GAME_OVER_ADAM()}</div>
                </div>`;
            this.dom.btnNext.innerText = UI.UI_RESTART();
            this.dom.btnNext.onclick = () => location.reload();
            this.dom.btnNext.disabled = false;
            this.dom.btnNext.style.opacity = '1';
        } else {
            const idx = this.engine.state.currentQuestionIndex;
            if (CONFIG.SKILL_OFFER_POSITIONS.includes(idx)) {
                this.offerSkills();
            } else {
                this.dom.btnNext.style.display = 'block';
                this.dom.btnNext.innerText = "NEXT";

                this.dom.btnNext.disabled = true;
                this.dom.btnNext.style.opacity = '0.5';
                this.dom.btnNext.style.cursor = 'not-allowed';

                setTimeout(() => {
                    this.dom.btnNext.disabled = false;
                    this.dom.btnNext.style.opacity = '1';
                    this.dom.btnNext.style.cursor = 'pointer';
                }, CONFIG.BUTTON_DELAY_MS);

                this.dom.btnNext.onclick = () => this.closeFeedback();
            }
        }
        this.dom.overlay.style.display = 'flex';

        // Preload the next question's image behind the overlay so it's
        // already decoded when the user clicks NEXT.
        this.preloadNextQuestionImage();
    }

    private preloadNextQuestionImage() {
        const nextIndex = this.engine.state.currentQuestionIndex + 1;
        if (nextIndex >= this.engine.state.questions.length) return;

        const nextQ = this.engine.state.questions[nextIndex];
        if (!nextQ.imagePath) return;

        const assetPath = `../assets/${nextQ.imagePath}`;
        const mod = images[assetPath] as { default: string } | undefined;
        if (!mod?.default) {
            console.warn(`Image not found for path: ${assetPath}`);
            return;
        }

        // Hide the image first, then swap the src behind the overlay
        this.dom.mainImage.classList.remove('loaded');
        this.dom.mainImage.src = mod.default;
    }

    offerSkills() {
        this.dom.btnNext.style.display = 'none';
        this.dom.skillBox.style.display = 'flex';
        this.dom.skillBox.innerHTML = '';

        // Determine which offer this is (1 or 2) dynamically from CONFIG
        const idx = this.engine.state.currentQuestionIndex;
        const offerNumber = (CONFIG.SKILL_OFFER_POSITIONS.indexOf(idx) + 1) as 1 | 2;
        const skillsWithStatus = this.engine.getSkillsForOfferWithStatus(offerNumber);

        // Find recommended skill for A.D.A.M.'s speech
        const recommendedSkill = skillsWithStatus.find(s => s.skill.isRecommended);

        // Create wrapper for proper layout
        const wrapper = document.createElement('div');
        wrapper.className = 'skill-offer-wrapper';

        // Title section
        const title = document.createElement('div');
        title.className = 'skill-offer-title';
        title.innerHTML = `<h3>${UI.UI_SKILL_SELECT_TITLE()}</h3>`;
        wrapper.appendChild(title);

        // A.D.A.M. recommendation speech
        if (recommendedSkill) {
            const adamSection = document.createElement('div');
            adamSection.className = 'adam-recommendation';
            const skillDisplayName = t(recommendedSkill.skill.name, recommendedSkill.skill.nameEN);
            const defaultComment = UI.UI_SKILL_DEFAULT_RECOMMEND(skillDisplayName);
            const comment = recommendedSkill.skill.recommendComment
                ? t(recommendedSkill.skill.recommendComment, recommendedSkill.skill.recommendCommentEN)
                : defaultComment;
            adamSection.innerHTML = `
                <img src="${this.dom.mascotImg.src}" alt="A.D.A.M." class="adam-recommend-img" />
                <div class="adam-recommend-speech">
                    <span class="adam-label">[A.D.A.M.]:</span>
                    ${comment}
                </div>
            `;
            wrapper.appendChild(adamSection);
        }

        // Skills container (horizontal)
        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'skill-buttons-container';

        skillsWithStatus.forEach(({ skill: s, isAvailable, lockedReason }, i) => {
            const sBtn = document.createElement('button');
            const isKeySkill = s.category === 'key';
            const isLocked = !isAvailable;
            const isRecommended = s.isRecommended === true;

            // Build class names
            let className = 'choice-btn skill-btn';
            if (isKeySkill) className += ' key-skill-btn';
            if (isLocked) className += ' skill-locked';
            if (isRecommended) className += ' skill-recommended';
            sBtn.className = className;

            const recommendedBadge = isRecommended ? `<span class="recommended-badge">${UI.UI_RECOMMENDED_BADGE()}</span>` : '';

            // Show locked reason for key skills that weren't earned
            const lockedReasonHtml = isLocked && lockedReason
                ? `<span class="skill-locked-reason">${lockedReason}</span>`
                : '';

            sBtn.innerHTML = `
                ${recommendedBadge}
                <div class="skill-letter-circle">${String.fromCharCode(65 + i)}</div>
                <div class="skill-content">
                    <span class="skill-name">${t(s.name, s.nameEN)}</span>
                    <span class="skill-desc">${t(s.desc, s.descEN)}</span>
                    ${lockedReasonHtml}
                </div>
            `;

            if (isLocked) {
                sBtn.disabled = true;
            } else {
                sBtn.addEventListener('click', () => {
                    this.engine.addSkill(s);

                    // Show A.D.A.M. comment for key skills
                    if (s.category === 'key' && s.adamComment) {
                        const adamText = t(s.adamComment, s.adamCommentEN);
                        this.dom.ovBody.innerHTML += `<div class="adam-comment-special-block">${adamText}</div>`;
                    }

                    // Update skill list display
                    const allSkills = [...this.engine.activeSkills];
                    const skillNames = allSkills.map(skill => t(skill.name, skill.nameEN));
                    this.dom.skillList.innerText = skillNames.length > 0 ? skillNames.join(', ') : UI.UI_SKILLS_NONE();

                    this.closeFeedback();
                });
            }

            skillsContainer.appendChild(sBtn);
        });

        wrapper.appendChild(skillsContainer);
        this.dom.skillBox.appendChild(wrapper);
    }

    closeFeedback() {
        const idx = this.engine.state.currentQuestionIndex;
        const skillOfferIdx = CONFIG.SKILL_OFFER_POSITIONS.indexOf(idx);

        this.dom.overlay.style.display = 'none';
        this.dom.skillBox.style.display = 'none';
        this.engine.nextQuestion();

        // After skill offer 2 → keySkillAcquired (only if key skill was obtained)
        if (skillOfferIdx === 1 && this.engine.state.keySkills.length > 0) {
            const key = `keySkillAcquired-${idx}`;
            if (!this.adamSpeechShownFor.has(key)) {
                this.adamSpeechShownFor.add(key);
                const lines = this.getAdamLinesForTiming('keySkillAcquired');
                if (lines) {
                    this.showAdamSpeech(lines, () => this.renderCurrentQuestion());
                    return;
                }
            }
        }

        this.renderCurrentQuestion();
    }

    finishGame() {
        this.dom.bar.style.width = '100%';
        const s = this.engine.state;
        const ending = this.engine.calculateEnding();

        // Record stage completion to global progress
        this.engine.recordStageCompletion(ending.rank as 'S' | 'A' | 'B' | 'C');

        // Always show regular ending first (including Stage 10)
        this.showRegularEnding(ending);

        if (this.engine.difficulty) {
            this.saveRecord(this.engine.difficulty, ending.rank, s.CS);
        }
    }

    private showRegularEnding(ending: { rank: string; title: string; desc: string }) {
        const s = this.engine.state;
        const stageMetadata = getStageMetadata(s.currentStage);
        const stageKeySkillId = stageMetadata?.keySkillId;
        const keySkillObtained = stageKeySkillId && s.keySkills.includes(stageKeySkillId);
        const keySkillStatus = keySkillObtained
            ? `<span class="key-skill-obtained">${UI.UI_KEY_SKILL_OBTAINED()}</span>`
            : `<span class="key-skill-not-obtained">${UI.UI_KEY_SKILL_NOT_OBTAINED()}</span>`;

        // Use stage-specific outro from adamDialogue if available, fall back to generic ending.desc
        const dl = this.getLocalizedDialogue(s.currentStage);
        const rankKey = ending.rank as 'S' | 'A' | 'B' | 'C';
        const adamComment = dl?.outro[rankKey] || ending.desc;

        this.dom.ovTitle.innerText = UI.UI_STAGE_COMPLETE();
        this.dom.ovTitle.style.color = "var(--accent-color)";

        this.dom.ovBody.innerHTML = `
            <div class="ending-container">
                <div class="ending-subtitle">${UI.UI_STAGE_N_END(s.currentStage)}</div>
                <strong class="ending-rank">${ending.rank}</strong>
                <span class="ending-title">${ending.title}</span>
                <div class="ending-desc">
                    ${UI.UI_RESULT_STATS(s.CS, s.Asset, s.Autonomy)}
                </div>
                <div class="adam-comment-section">
                    <img src="${this.dom.mascotImg.src}" alt="A.D.A.M." class="adam-comment-img" />
                    <div class="adam-comment-text">${adamComment}</div>
                </div>
                <div class="key-skill-status-container">Key Skill: ${keySkillStatus}</div>
            </div>
        `;
        this.dom.ovStats.innerHTML = "";
        this.dom.skillBox.style.display = 'none';

        // Stage 10: Show "最終認定" button to proceed to license screen
        // Other stages: Show "TITLE" button to return to title
        if (s.currentStage === 10) {
            this.dom.btnNext.innerText = UI.UI_FINAL_CERT();
            this.dom.btnNext.onclick = () => this.showFinalCertificationEnding();
        } else {
            this.dom.btnNext.innerText = "TITLE";
            this.dom.btnNext.onclick = () => location.reload();
        }
        this.dom.btnNext.style.display = 'block';
        this.dom.btnNext.disabled = false;
        this.dom.btnNext.style.opacity = '1';
        this.dom.btnNext.style.cursor = 'pointer';
        this.dom.overlay.style.display = 'flex';
    }

    private showFinalCertificationEnding() {
        const globalProgress = this.engine.getGlobalProgress();
        const licenseType = globalProgress.calculateLicenseType();
        const totalKeySkills = globalProgress.getKeySkillCount();

        // License information based on type
        const licenseInfo = this.getLicenseInfo(licenseType);

        this.dom.ovTitle.innerText = UI.UI_FINAL_CERT();
        this.dom.ovTitle.style.color = licenseInfo.color;

        // Get license image if available
        let licenseImageHtml = '';
        if (licenseInfo.imagePath) {
            const assetPath = `../assets/${licenseInfo.imagePath}`;
            const mod = images[assetPath] as { default: string } | undefined;
            if (mod?.default) {
                licenseImageHtml = `<img src="${mod.default}" alt="${licenseInfo.nameJP}" class="license-img" />`;
            }
        }
        // Fallback to placeholder if no image
        if (!licenseImageHtml) {
            licenseImageHtml = `<div class="license-placeholder" style="background: linear-gradient(135deg, ${licenseInfo.gradientStart}, ${licenseInfo.gradientEnd});">
                <div class="license-placeholder-content">
                    <div class="license-symbol">${licenseInfo.symbol}</div>
                    <div class="license-name-en">${licenseInfo.nameEN}</div>
                </div>
            </div>`;
        }

        // Build the final certification display (overall results only, no Stage 10 stats)
        this.dom.ovBody.innerHTML = `
            <div class="final-certification">
                <div class="license-image-container">
                    ${licenseImageHtml}
                </div>

                <div class="license-name-jp" style="color: ${licenseInfo.color}">
                    ${licenseInfo.nameJP}
                </div>

                <div class="key-skill-summary" style="color: ${totalKeySkills >= 10 ? 'var(--color-positive)' : 'var(--color-text-dark-muted)'}">
                    Key Skill: ${totalKeySkills}/10 ${totalKeySkills >= 10 ? UI.UI_KEY_SKILL_COMPLETE() : ''}
                </div>

                <div class="adam-comment-section">
                    <img src="${this.dom.mascotImg.src}" alt="A.D.A.M." class="adam-comment-img" />
                    <div class="adam-comment-text">${licenseInfo.adamComment}</div>
                </div>
            </div>
        `;

        this.dom.ovStats.innerHTML = "";
        this.dom.skillBox.style.display = 'none';
        this.dom.btnNext.innerText = "TITLE";
        this.dom.btnNext.style.display = 'block';
        this.dom.btnNext.disabled = false;
        this.dom.btnNext.style.opacity = '1';
        this.dom.btnNext.style.cursor = 'pointer';
        this.dom.btnNext.onclick = () => location.reload();
        this.dom.overlay.style.display = 'flex';
    }

    private getLicenseInfo(licenseType: LicenseType | null): {
        nameJP: string;
        nameEN: string;
        symbol: string;
        color: string;
        gradientStart: string;
        gradientEnd: string;
        adamComment: string;
        imagePath?: string;
    } {
        switch (licenseType) {
            case 'TRUE':
                return {
                    nameJP: UI.UI_LICENSE_TRUE_JP(),
                    nameEN: 'ADULT LICENSE NOT REQUIRED',
                    symbol: '自',
                    color: '#ffd700',
                    gradientStart: '#ffd700',
                    gradientEnd: '#ff6b6b',
                    adamComment: UI.UI_LICENSE_TRUE_ADAM(),
                    imagePath: 'license_true.png'
                };
            case 'GOLD':
                return {
                    nameJP: UI.UI_LICENSE_GOLD_JP(),
                    nameEN: 'GOLD ADULT LICENSE',
                    symbol: 'G',
                    color: '#ffd700',
                    gradientStart: '#ffd700',
                    gradientEnd: '#b8860b',
                    adamComment: UI.UI_LICENSE_GOLD_ADAM(),
                    imagePath: 'license_gold.png'
                };
            case 'SILVER':
                return {
                    nameJP: UI.UI_LICENSE_SILVER_JP(),
                    nameEN: 'BLUE ADULT LICENSE',
                    symbol: 'S',
                    color: '#c0c0c0',
                    gradientStart: '#c0c0c0',
                    gradientEnd: '#808080',
                    adamComment: UI.UI_LICENSE_SILVER_ADAM(),
                    imagePath: 'license_blue.png'
                };
            case 'BRONZE':
                return {
                    nameJP: UI.UI_LICENSE_BRONZE_JP(),
                    nameEN: 'GREEN ADULT LICENSE',
                    symbol: 'G',
                    color: '#cd7f32',
                    gradientStart: '#cd7f32',
                    gradientEnd: '#8b4513',
                    adamComment: UI.UI_LICENSE_BRONZE_ADAM(),
                    imagePath: 'license_green.png'
                };
            case 'PAPER':
            default:
                return {
                    nameJP: UI.UI_LICENSE_PAPER_JP(),
                    nameEN: 'PAPER ADULT LICENSE',
                    symbol: 'P',
                    color: '#888888',
                    gradientStart: '#888888',
                    gradientEnd: '#444444',
                    adamComment: UI.UI_LICENSE_PAPER_ADAM(),
                    imagePath: 'license_paper.png'
                };
        }
    }
}
