import { GameEngine } from '../logic/gameEngine';
import type { Choice, Difficulty } from '../types';
import { CONFIG } from '../config';

// Vite glob import for assets
const images = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true });

interface DOMElements {
    mainImage: HTMLImageElement;
    qCat: HTMLElement;
    qNum: HTMLElement;
    qText: HTMLElement;
    choices: HTMLElement;
    cs: HTMLElement;
    money: HTMLElement;
    sanity: HTMLElement;
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
    scoreHistory: HTMLElement;
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
            money: getEl<HTMLElement>('score-money'),
            sanity: getEl<HTMLElement>('score-sanity'),
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
            scoreHistory: getEl<HTMLElement>('score-history'),
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

    showStartScreen(onSelect: (diff: Difficulty) => void) {
        this.dom.startScreen.style.display = 'flex';
        this.dom.diffList.innerHTML = '';

        // Initialize start screen logic if needed (currently static text handled in HTML)


        const levels: { d: Difficulty, name: string, desc: string }[] = [
            { d: 'Intro', name: 'LEVEL 1: INTRO', desc: '社会人ごっこ（初級）' },
            { d: 'Common', name: 'LEVEL 2: COMMON', desc: '現代の奴隷（中級）' },
            { d: 'Advanced', name: 'LEVEL 3: ADVANCED', desc: '抵抗勢力（上級）' },
            { d: 'Expert', name: 'LEVEL 4: EXPERT', desc: 'システムハッカー（超級）' },
            { d: 'Nightmare', name: 'LEVEL 5: NIGHTMARE', desc: '闇の支配者（裏級）' }
        ];

        levels.forEach(lvl => {
            const btn = document.createElement('div');
            btn.className = 'diff-btn';

            const record = this.records[lvl.d];
            const stampHtml = record ? `<span class="rank-stamp rank-${record.rank.charAt(0)}">${record.rank}</span>` : '';

            btn.innerHTML = `
                <div class="diff-info">
                    <span class="diff-name">${lvl.name}</span>
                    <span class="diff-desc">${lvl.desc}</span>
                </div>
                <div class="btn-right-col">
                    ${stampHtml}
                    <span class="arrow">▶</span>
                </div>
            `;
            btn.addEventListener('click', () => {
                this.dom.startScreen.style.display = 'none';
                onSelect(lvl.d);
            });
            this.dom.diffList.appendChild(btn);
        });
    }

    private lastScores = { cs: CONFIG.INITIAL_STATE.CS, money: CONFIG.INITIAL_STATE.MONEY, sanity: CONFIG.INITIAL_STATE.SANITY };

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

        animate(this.dom.cs, s.cs, this.lastScores.cs);
        animate(this.dom.money, s.money, this.lastScores.money);
        animate(this.dom.sanity, s.sanity, this.lastScores.sanity);

        // Update last scores
        this.lastScores = { cs: s.cs, money: s.money, sanity: s.sanity };

        const progress = s.questions.length > 0
            ? (s.currentQuestionIndex / s.questions.length) * 100
            : 0;
        this.dom.bar.style.width = `${progress}%`;

        if (s.cs < 200 || s.sanity < 30) {
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
            btn.className = 'choice-btn';
            btn.innerHTML = `<span class="choice-letter">${String.fromCharCode(65 + i)}</span><span>${c.text}</span>`;
            btn.addEventListener('click', () => this.handleChoice(c));
            this.dom.choices.appendChild(btn);
        });

        this.updateHUD();
    }

    handleChoice(choice: Choice) {
        const result = this.engine.processChoice(choice);
        this.showFeedback(result);
    }

    showFeedback(result: {
        outcome: { cs: number; money: number; sanity: number };
        feedback: string;
        isTerminated: boolean
    }) {
        const { outcome, feedback, isTerminated } = result;
        const { cs, money, sanity } = outcome;

        const getAnimClass = (val: number) => {
            if (val > 0) return 'score-pop-up';
            if (val < 0) return 'score-pop-down';
            return '';
        };

        this.dom.ovTitle.innerText = cs >= 0 ? "APPROVED" : "WARNING";
        this.dom.ovTitle.style.color = cs >= 0 ? "var(--accent-color)" : "var(--primary-color)";
        this.dom.ovBody.innerHTML = feedback; // Use innerHTML for styling
        this.dom.ovStats.innerHTML = `
            <div class="stat-result ${getAnimClass(cs)}">
                <span style="font-size:0.8em">信用度</span><br>
                <span style="font-size:1.2em; font-weight:bold">${cs > 0 ? '+' : ''}${cs}</span>
            </div>
            <div class="stat-result ${getAnimClass(money)}">
                <span style="font-size:0.8em">資産</span><br>
                <span style="font-size:1.2em; font-weight:bold">${money > 0 ? '+' : ''}${money.toLocaleString()}</span>
            </div>
            <div class="stat-result ${getAnimClass(sanity)}">
                <span style="font-size:0.8em">正気</span><br>
                <span style="font-size:1.2em; font-weight:bold">${sanity > 0 ? '+' : ''}${sanity}</span>
            </div>
        `;

        // Mascot Reaction
        if (cs > 0) this.updateMascot('happy');
        else if (sanity < 0 || cs < 0) this.updateMascot('glitch');
        else this.updateMascot('neutral');

        if (isTerminated) {
            this.dom.ovTitle.innerText = "TERMINATED";
            this.dom.btnNext.style.display = 'block';
            this.dom.ovBody.innerHTML += `<br><br>判定：あなたは「生体プロセッサ」に再利用されます。`;
            this.dom.btnNext.innerText = "人生再起動";
            this.dom.btnNext.addEventListener('click', () => location.reload());
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

                this.dom.btnNext.addEventListener('click', () => this.closeFeedback());
            }
        }
        this.dom.overlay.style.display = 'flex';
    }

    offerSkills() {
        this.dom.btnNext.style.display = 'none';
        this.dom.skillBox.style.display = 'flex';
        this.dom.skillBox.innerHTML = '';

        const availableSkills = this.engine.getAvailableSkills(2);

        availableSkills.forEach(s => {
            const sBtn = document.createElement('button');
            sBtn.className = 'choice-btn skill-btn';
            // sBtn.style.width = "250px"; // Handled in CSS
            sBtn.innerHTML = `
                <div class="skill-info">
                    <span class="skill-name">${s.name}</span>
                    <span class="skill-desc">${s.desc}</span>
                </div>
            `;
            sBtn.addEventListener('click', () => {
                this.engine.addSkill(s.id);
                // Map IDs to Japanese Names
                const skillNames = this.engine.state.skills.map(id => {
                    const skillObj = availableSkills.find(s => s.id === id) ||
                        this.engine.getSkillById(id);
                    return skillObj ? skillObj.name : id;
                });
                this.dom.skillList.innerText = skillNames.length > 0 ? skillNames.join(', ') : "未所持";
                this.closeFeedback();
            });
            this.dom.skillBox.appendChild(sBtn);
        });
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

        this.dom.ovTitle.innerText = "COMPLETE";
        this.dom.ovTitle.style.color = "var(--accent-color)";
        this.dom.ovBody.innerHTML = `
            シミュレーション終了。<br>
            適性ランク: <br><strong style="font-size:2.5rem; color:var(--accent-color)">${ending.rank} - ${ending.title}</strong><br>
            <span style="font-size:0.9rem; color:#ccc">${ending.desc}</span><br><br>
            最終信用度: ${s.cs} <br> 最終資産: ${s.money.toLocaleString()}円
        `;
        this.dom.ovStats.innerHTML = "";
        this.dom.btnNext.innerText = "人生再起動";
        this.dom.btnNext.addEventListener('click', () => location.reload());
        this.dom.overlay.style.display = 'flex';

        if (this.engine.difficulty) {
            this.saveRecord(this.engine.difficulty, ending.rank, s.cs);
        }
    }
}
