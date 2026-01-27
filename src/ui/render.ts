import { GameEngine } from '../logic/gameEngine';
import type { Choice, Question } from '../types';
import type { SkillActivation } from '../data/skillEffects';
import { CONFIG } from '../config';
import { getOverlayPresentation } from './overlayVerdict';

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
}

export class UIManager {
    engine: GameEngine;
    private dom: DOMElements;

    constructor(engine: GameEngine) {
        this.engine = engine;
        const getEl = <T extends HTMLElement>(id: string): T => {
            const el = document.getElementById(id);
            if (!el) throw new Error(`Required element #${id} not found`);
            return el as T;
        };
        this.dom = {
            mainImage: getEl<HTMLImageElement>('main-image'),
            qCat: getEl<HTMLElement>('q-category'),
            qNum: getEl<HTMLElement>('q-number'),
            qText: getEl<HTMLElement>('question-text'),
            choices: getEl<HTMLElement>('choices-grid'),
            cs: getEl<HTMLElement>('score-cs'),
            asset: getEl<HTMLElement>('score-asset'),
            autonomy: getEl<HTMLElement>('score-autonomy'),
            bar: getEl<HTMLElement>('progress-bar'),
            container: getEl<HTMLElement>('game-container'),
            sceneDesc: getEl<HTMLElement>('scene-desc-overlay'),
            overlay: getEl<HTMLElement>('overlay'),
            ovTitle: getEl<HTMLElement>('overlay-title'),
            ovBody: getEl<HTMLElement>('overlay-body'),
            ovStats: getEl<HTMLElement>('overlay-stats'),
            btnNext: getEl<HTMLButtonElement>('btn-next'),
            skillBox: getEl<HTMLElement>('skill-select-box'),
            skillList: getEl<HTMLElement>('skill-list'),
            startScreen: getEl<HTMLElement>('start-screen'),
            diffList: getEl<HTMLElement>('difficulty-list'),
            mascotContainer: getEl<HTMLElement>('mascot-container'),
            mascotImg: getEl<HTMLImageElement>('mascot-img'),
            titleLogo: getEl<HTMLImageElement>('title-logo-img')
        };
        this.loadRecords();
    }

    private records: Record<string, { rank: string, score: number, date: string }> = {};

    loadRecords() {
        try {
            const stored = localStorage.getItem('ac_records');
            if (stored) this.records = JSON.parse(stored);
        } catch {
            console.warn('Failed to load records, resetting');
            this.records = {};
        }
    }

    saveRecord(difficulty: string, rank: string, score: number) {
        this.records[difficulty] = { rank, score, date: new Date().toLocaleDateString() };
        try {
            localStorage.setItem('ac_records', JSON.stringify(this.records));
        } catch {
            console.warn('Failed to save record (private browsing?)');
        }
    }

    setEngine(engine: GameEngine) {
        this.engine = engine;
    }

    showStartScreen(onSelect: (stageNum: number) => void) {
        this.dom.startScreen.style.display = 'flex';
        this.dom.diffList.innerHTML = '';

        // Initialize start screen logic if needed (currently static text handled in HTML)


        // All 10 stages - only show unlocked stages (previous stage beaten)
        // Themes aligned with improvement_plan_2026-01-24_integrated.md section 3.1
        const allStages: { key: string, name: string, desc: string }[] = [
            { key: 'Stage1', name: 'STAGE 1', desc: '社会の基本' },
            { key: 'Stage2', name: 'STAGE 2', desc: '仕事の基礎' },
            { key: 'Stage3', name: 'STAGE 3', desc: '金の基礎' },
            { key: 'Stage4', name: 'STAGE 4', desc: '税金' },
            { key: 'Stage5', name: 'STAGE 5', desc: '社会保険' },
            { key: 'Stage6', name: 'STAGE 6', desc: '住まい' },
            { key: 'Stage7', name: 'STAGE 7', desc: '契約・法律' },
            { key: 'Stage8', name: 'STAGE 8', desc: 'デジタル安全' },
            { key: 'Stage9', name: 'STAGE 9', desc: '危機対応' },
            { key: 'Stage10', name: 'STAGE 10', desc: '最終審判' }
        ];

        const allowedRanks = ['S', 'A', 'B', 'C'];

        // Only show stages that are unlocked (Stage 1 always visible, others require previous stage beaten)
        allStages.forEach((stage, index) => {
            const isUnlocked = index === 0 || this.records[`Stage${index}`]; // Previous stage beaten
            if (!isUnlocked) return; // Don't render locked stages

            const btn = document.createElement('div');
            btn.className = 'diff-btn';

            const record = this.records[stage.key];
            const safeRank = record && allowedRanks.includes(record.rank) ? record.rank : '';
            const rankClass = safeRank ? `rank-${safeRank}` : '';

            btn.innerHTML = `
                <div class="diff-info">
                    <span class="diff-name">${stage.name}</span>
                    <span class="diff-desc">${stage.desc}</span>
                </div>
                <div class="btn-right-col">
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

    private lastScores = { CS: 50, Asset: 100000, Autonomy: 50 };

    updateHUD() {
        const s = this.engine.state;

        // Helper for animation
        const animate = (el: HTMLElement, newVal: number, oldVal: number) => {
            el.innerText = newVal.toLocaleString();
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

        if (s.CS < 30 || s.Autonomy < 20 || s.Asset < 20000) {
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

        this.dom.qCat.innerText = q.category;
        this.dom.qNum.innerText = `Q.${this.engine.state.currentQuestionIndex + 1} / ${this.engine.state.questions.length}`;
        this.dom.qText.innerText = q.text;

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

            let content = `<span class="choice-letter">${String.fromCharCode(65 + i)}</span><span class="choice-text">${c.text}</span>`;

            if (isLocked && c.lockRequirements) {
                // Generate simple lock reason text
                const req = c.lockRequirements;
                const parts: string[] = [];
                if (req.CS !== undefined) parts.push(`社会的信用が${req.CS}以上必要`);
                if (req.Asset !== undefined) parts.push(`資産が${req.Asset.toLocaleString()}円以上必要`);
                if (req.Autonomy !== undefined) parts.push(`自律性が${req.Autonomy}以上必要`);
                content += `<div class="lock-reason">${parts.join('、')}</div>`;
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
                `<span style="color:#4cc9f0">【${sa.skillName}】発動: ${sa.description} (${sa.originalValue} → ${sa.modifiedValue})</span>`
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
                <span style="font-size:0.8em">社会的信用</span><br>
                <span style="font-size:1.2em; font-weight:bold">${CS > 0 ? '+' : ''}${CS}</span>
            </div>
            <div class="stat-result ${getAnimClass(Asset)}">
                <span style="font-size:0.8em">資産</span><br>
                <span style="font-size:1.2em; font-weight:bold">${Asset > 0 ? '+' : ''}${Asset.toLocaleString()}</span>
            </div>
            <div class="stat-result ${getAnimClass(Autonomy)}">
                <span style="font-size:0.8em">自律性</span><br>
                <span style="font-size:1.2em; font-weight:bold">${Autonomy > 0 ? '+' : ''}${Autonomy}</span>
            </div>
        `;

        // Mascot Reaction
        if (CS > 0) this.updateMascot('happy');
        else if (Autonomy < 0 || CS < 0) this.updateMascot('glitch');
        else this.updateMascot('neutral');

        if (isTerminated) {
            this.dom.btnNext.style.display = 'block';
            this.dom.ovBody.innerHTML += `
                <div class="adam-comment-section" style="margin-top: 20px;">
                    <img src="${this.dom.mascotImg.src}" alt="A.D.A.M." class="adam-comment-img" />
                    <div class="adam-comment-text">[A.D.A.M.]: 判定……あなたは「生体プロセッサ」に再利用されます。</div>
                </div>`;
            this.dom.btnNext.innerText = "人生再起動";
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
        title.innerHTML = `<h3>スキル選択</h3>`;
        wrapper.appendChild(title);

        // A.D.A.M. recommendation speech
        if (recommendedSkill) {
            const adamSection = document.createElement('div');
            adamSection.className = 'adam-recommendation';
            adamSection.innerHTML = `
                <img src="${this.dom.mascotImg.src}" alt="A.D.A.M." class="adam-recommend-img" />
                <div class="adam-recommend-speech">
                    <span class="adam-label">[A.D.A.M.]:</span>
                    「${recommendedSkill.skill.name}」を推奨します。実利的な選択です。
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

            const recommendedBadge = isRecommended ? '<span class="recommended-badge">推奨</span>' : '';

            // Show locked reason for key skills that weren't earned
            const lockedReasonHtml = isLocked && lockedReason
                ? `<span class="skill-locked-reason">${lockedReason}</span>`
                : '';

            sBtn.innerHTML = `
                <div class="skill-letter-circle">${String.fromCharCode(65 + i)}</div>
                <div class="skill-content">
                    <span class="skill-name">${s.name}${recommendedBadge}</span>
                    <span class="skill-desc">${s.desc}</span>
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
                        this.dom.ovBody.innerHTML += `<br><br><span style="color:#f72585; font-style:italic;">[A.D.A.M.]: ${s.adamComment}</span>`;
                    }

                    // Update skill list display
                    const allSkills = [...this.engine.activeSkills];
                    const skillNames = allSkills.map(skill => skill.name);
                    this.dom.skillList.innerText = skillNames.length > 0 ? skillNames.join(', ') : "未所持";

                    this.closeFeedback();
                });
            }

            skillsContainer.appendChild(sBtn);
        });

        wrapper.appendChild(skillsContainer);
        this.dom.skillBox.appendChild(wrapper);
    }

    closeFeedback() {
        this.dom.overlay.style.display = 'none';
        this.dom.skillBox.style.display = 'none';
        this.engine.nextQuestion();
        this.renderCurrentQuestion();
    }

    finishGame() {
        this.dom.bar.style.width = '100%';
        const s = this.engine.state;
        const ending = this.engine.calculateEnding();

        this.dom.ovTitle.innerText = "STAGE COMPLETE";
        this.dom.ovTitle.style.color = "var(--accent-color)";

        const keySkillCount = s.keySkills.length;

        this.dom.ovBody.innerHTML = `
            <div style="margin-bottom: 15px;">ステージ ${s.currentStage} 終了</div>
            <strong style="font-size:2.5rem; color:var(--accent-color)">${ending.rank}</strong><br>
            <span style="font-size:1.2rem; color:var(--accent-color)">${ending.title}</span><br><br>
            <div style="font-size:0.9rem; color:#888; margin-bottom: 15px;">
                社会的信用: ${s.CS} / 資産: ${s.Asset.toLocaleString()}円 / 自律性: ${s.Autonomy}
            </div>
            <div class="adam-comment-section">
                <img src="${this.dom.mascotImg.src}" alt="A.D.A.M." class="adam-comment-img" />
                <div class="adam-comment-text">[A.D.A.M.]: ${ending.desc}</div>
            </div>
            <div style="margin-top: 15px; font-size: 0.85rem; color: #666;">鍵スキル: ${keySkillCount}/9</div>
        `;
        this.dom.ovStats.innerHTML = "";
        this.dom.btnNext.innerText = "タイトルに戻る";
        this.dom.btnNext.onclick = () => location.reload();
        this.dom.overlay.style.display = 'flex';

        if (this.engine.difficulty) {
            this.saveRecord(this.engine.difficulty, ending.rank, s.CS);
        }
    }
}
