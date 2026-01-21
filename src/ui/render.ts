import { GameEngine } from '../logic/gameEngine';
import type { Choice, Difficulty } from '../types';

// Vite glob import for assets
const images = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true });

export class UIManager {
    engine: GameEngine;
    dom: any;

    constructor(engine: GameEngine) {
        this.engine = engine;
        this.dom = {
            mainImage: document.getElementById('main-image') as HTMLImageElement,
            qCat: document.getElementById('q-category') as HTMLElement,
            qNum: document.getElementById('q-number') as HTMLElement,
            qText: document.getElementById('question-text') as HTMLElement,
            choices: document.getElementById('choices-grid') as HTMLElement,
            cs: document.getElementById('score-cs') as HTMLElement,
            money: document.getElementById('score-money') as HTMLElement,
            sanity: document.getElementById('score-sanity') as HTMLElement,
            bar: document.getElementById('progress-bar') as HTMLElement,
            container: document.getElementById('game-container') as HTMLElement,
            sceneDesc: document.getElementById('scene-desc-overlay') as HTMLElement,
            overlay: document.getElementById('overlay') as HTMLElement,
            ovTitle: document.getElementById('overlay-title') as HTMLElement,
            ovBody: document.getElementById('overlay-body') as HTMLElement,
            ovStats: document.getElementById('overlay-stats') as HTMLElement,
            btnNext: document.getElementById('btn-next') as HTMLButtonElement,
            skillBox: document.getElementById('skill-select-box') as HTMLElement,
            skillList: document.getElementById('skill-list') as HTMLElement,
            startScreen: document.getElementById('start-screen') as HTMLElement,
            diffList: document.getElementById('difficulty-list') as HTMLElement,
            mascotContainer: document.getElementById('mascot-container') as HTMLElement,
            mascotImg: document.getElementById('mascot-img') as HTMLImageElement,
            scoreHistory: document.getElementById('score-history') as HTMLElement,
            titleLogo: document.getElementById('title-logo-img') as HTMLImageElement
        };
        this.loadRecords();
    }

    private records: Record<string, { rank: string, score: number, date: string }> = {};

    loadRecords() {
        const stored = localStorage.getItem('ac_records');
        if (stored) this.records = JSON.parse(stored);
    }

    saveRecord(difficulty: string, rank: string, score: number) {
        // Only update if new score is better or same (for now just overwrite with latest as requested)
        this.records[difficulty] = { rank, score, date: new Date().toLocaleDateString() };
        localStorage.setItem('ac_records', JSON.stringify(this.records));
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
            btn.onclick = () => {
                this.dom.startScreen.style.display = 'none';
                onSelect(lvl.d);
            };
            this.dom.diffList.appendChild(btn);
        });
    }

    private lastScores = { cs: 500, money: 100000, sanity: 100 };

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

        const progress = (s.currentQuestionIndex / s.questions.length) * 100;
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
            console.log('Looking for image:', assetPath);
            // console.log('Available images:', Object.keys(images));
            const mod = images[assetPath] as any;
            // console.log('Found module:', mod);
            if (mod && mod.default) {
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
            btn.onclick = () => this.handleChoice(c);
            this.dom.choices.appendChild(btn);
        });

        this.updateHUD();
    }

    handleChoice(choice: Choice) {
        const result = this.engine.processChoice(choice);
        this.showFeedback(result);
    }

    showFeedback(result: { outcome: any, feedback: string, isTerminated: boolean }) {
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
            this.dom.ovBody.innerText += `\n\n判定：あなたは「生体プロセッサ」に再利用されます。`;
            this.dom.btnNext.innerText = "人生再起動";
            this.dom.btnNext.onclick = () => location.reload();
            this.dom.btnNext.disabled = false;
            this.dom.btnNext.style.opacity = '1';
        } else {
            const idx = this.engine.state.currentQuestionIndex;
            // Offer skills at Q4 (after 4th) and Q7 (after 7th) since max 10 questions?
            // Let's say Q3 (index 2) and Q7 (index 6)
            if (idx === 2 || idx === 6) {
                this.offerSkills();
            } else {
                this.dom.btnNext.style.display = 'block';
                this.dom.btnNext.innerText = "NEXT";

                // 0.5s Delay
                this.dom.btnNext.disabled = true;
                this.dom.btnNext.style.opacity = '0.5';
                this.dom.btnNext.style.cursor = 'not-allowed';

                setTimeout(() => {
                    this.dom.btnNext.disabled = false;
                    this.dom.btnNext.style.opacity = '1';
                    this.dom.btnNext.style.cursor = 'pointer';
                }, 500);

                this.dom.btnNext.onclick = () => this.closeFeedback();
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
            sBtn.onclick = () => {
                this.engine.addSkill(s.id);
                // Map IDs to Japanese Names
                const skillNames = this.engine.state.skills.map(id => {
                    const skillObj = availableSkills.find(s => s.id === id) ||
                        this.engine.getSkillById(id);
                    return skillObj ? skillObj.name : id;
                });
                this.dom.skillList.innerText = skillNames.length > 0 ? skillNames.join(', ') : "未所持";
                this.closeFeedback();
            };
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
        this.dom.btnNext.onclick = () => location.reload();
        this.dom.overlay.style.display = 'flex';

        if (this.engine.difficulty) {
            this.saveRecord(this.engine.difficulty, ending.rank, s.cs);
        }
    }
}
