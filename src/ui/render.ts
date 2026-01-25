import { GameEngine } from '../logic/gameEngine';
import type { Choice, Difficulty, Question } from '../types';
import type { SkillActivation } from '../data/skillEffects';
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

        const allowedRanks = ['S', 'A', 'B', 'B-', 'C', 'C+', 'D', 'E', 'F'];

        levels.forEach(lvl => {
            const btn = document.createElement('div');
            btn.className = 'diff-btn';

            const record = this.records[lvl.d];
            const safeRank = record && allowedRanks.includes(record.rank) ? record.rank : '';
            const rankClass = safeRank ? `rank-${safeRank.charAt(0)}` : '';

            btn.innerHTML = `
                <div class="diff-info">
                    <span class="diff-name">${lvl.name}</span>
                    <span class="diff-desc">${lvl.desc}</span>
                </div>
                <div class="btn-right-col">
                    ${safeRank ? `<span class="rank-stamp ${rankClass}"></span>` : ''}
                    <span class="arrow">▶</span>
                </div>
            `;
            if (safeRank) {
                const stampEl = btn.querySelector('.rank-stamp');
                if (stampEl) stampEl.textContent = safeRank;
            }
            btn.addEventListener('click', () => {
                this.dom.startScreen.style.display = 'none';
                onSelect(lvl.d);
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

            let content = `<span class="choice-letter">${String.fromCharCode(65 + i)}</span><span>${c.text}</span>`;

            if (isLocked && c.lockedFeedback) {
                content += `<div class="lock-reason">${c.lockedFeedback}</div>`;
            }

            btn.innerHTML = content;

            if (isLocked) {
                btn.disabled = true;
            } else {
                btn.addEventListener('click', () => this.handleChoice(c, q));
            }

            this.dom.choices.appendChild(btn);
        });

        this.updateHUD();
    }

    handleChoice(choice: Choice, question: Question) {
        const result = this.engine.processChoice(choice, question);
        this.showFeedback(result);
    }

    showFeedback(result: {
        outcome: { CS: number; Asset: number; Autonomy: number };
        feedback: string;
        isTerminated: boolean;
        skillActivations: SkillActivation[]
    }) {
        const { outcome, feedback, isTerminated, skillActivations } = result;
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

        this.dom.ovTitle.innerText = CS >= 0 ? "APPROVED" : "WARNING";
        this.dom.ovTitle.style.color = CS >= 0 ? "var(--accent-color)" : "var(--primary-color)";
        this.dom.ovBody.innerHTML = feedback + skillMessagesHTML; // Feedback includes A.D.A.M. comment, add skill messages
        this.dom.ovStats.innerHTML = `
            <div class="stat-result ${getAnimClass(CS)}">
                <span style="font-size:0.8em">信用度 (CS)</span><br>
                <span style="font-size:1.2em; font-weight:bold">${CS > 0 ? '+' : ''}${CS}</span>
            </div>
            <div class="stat-result ${getAnimClass(Asset)}">
                <span style="font-size:0.8em">資産 (Asset)</span><br>
                <span style="font-size:1.2em; font-weight:bold">${Asset > 0 ? '+' : ''}${Asset.toLocaleString()}</span>
            </div>
            <div class="stat-result ${getAnimClass(Autonomy)}">
                <span style="font-size:0.8em">自律性 (Autonomy)</span><br>
                <span style="font-size:1.2em; font-weight:bold">${Autonomy > 0 ? '+' : ''}${Autonomy}</span>
            </div>
        `;

        // Mascot Reaction
        if (CS > 0) this.updateMascot('happy');
        else if (Autonomy < 0 || CS < 0) this.updateMascot('glitch');
        else this.updateMascot('neutral');

        if (isTerminated) {
            this.dom.ovTitle.innerText = "TERMINATED";
            this.dom.btnNext.style.display = 'block';
            this.dom.ovBody.innerHTML += `<br><br>判定：あなたは「生体プロセッサ」に再利用されます。`;
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
        const availableSkills = this.engine.getSkillsForOffer(offerNumber);

        const title = document.createElement('div');
        title.className = 'skill-offer-title';
        title.innerHTML = `<h3>スキル選択 (${offerNumber}/2)</h3><p>どちらかを選択してください</p>`;
        this.dom.skillBox.appendChild(title);

        availableSkills.forEach((s, i) => {
            const sBtn = document.createElement('button');
            const isKeySkill = s.category === 'key';
            sBtn.className = isKeySkill ? 'choice-btn skill-btn key-skill-btn' : 'choice-btn skill-btn';

            const keyBadge = isKeySkill ? '<span class="key-skill-badge">★KEY SKILL★</span>' : '';
            const keyNote = isKeySkill ? '<div class="key-skill-note">※効果は今ステージのみ有効<br>※取得時に「収集済み」として記録（真エンド条件）</div>' : '';

            sBtn.innerHTML = `
                <div class="skill-info">
                    <span class="skill-letter">${String.fromCharCode(65 + i)}</span>
                    <div class="skill-content">
                        <span class="skill-name">${s.name}${keyBadge}</span>
                        <span class="skill-desc">${s.desc}</span>
                        ${keyNote}
                    </div>
                </div>
            `;
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

        this.dom.ovTitle.innerText = "STAGE COMPLETE";
        this.dom.ovTitle.style.color = "var(--accent-color)";

        const keySkillCount = s.keySkills.length;
        const keySkillStatus = `鍵スキル収集: ${keySkillCount}/9`;

        this.dom.ovBody.innerHTML = `
            Stage ${s.currentStage} 終了。<br>
            適性ランク: <br><strong style="font-size:2.5rem; color:var(--accent-color)">${ending.rank} - ${ending.title}</strong><br>
            <span style="font-size:0.9rem; color:#ccc">${ending.desc}</span><br><br>
            最終CS: ${s.CS} / 最終Asset: ${s.Asset.toLocaleString()}円 / 最終Autonomy: ${s.Autonomy}<br>
            ${keySkillStatus}
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
