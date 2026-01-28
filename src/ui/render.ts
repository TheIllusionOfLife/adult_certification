import { GameEngine } from '../logic/gameEngine';
import type { Choice, Question, LicenseType } from '../types';
import type { SkillActivation } from '../data/skillEffects';
import { CONFIG } from '../config';
import { getOverlayPresentation } from './overlayVerdict';
import { DOM_IDS } from './domIds';
import { RecordStorage } from '../storage/RecordStorage';
import { GlobalProgressStorage } from '../storage/GlobalProgressStorage';
import { STAGE_METADATA, getStageMetadata } from '../data/stageMetadata';

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
            titleLogo: getEl<HTMLImageElement>(DOM_IDS.TITLE_LOGO)
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

        // Initialize start screen logic if needed (currently static text handled in HTML)


        // All 10 stages - only show unlocked stages (previous stage beaten)
        // themeJP comes from stageMetadata.ts
        const allStages: { key: string, name: string, desc: string, keySkillId: string }[] = STAGE_METADATA.map((stage) => ({
            key: `Stage${stage.id}`,
            name: `STAGE ${stage.id}`,
            desc: stage.themeJP,
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
                    ${hasKeySkill ? '<span class="key-indicator" title="Key Skill 獲得済"></span>' : ''}
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
                    <div class="adam-comment-text">[A.D.A.M.]: 判定・・・あなたは「生体プロセッサ」に再利用されます。</div>
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
            const defaultComment = `「${recommendedSkill.skill.name}」を推奨します。実利的な選択です。`;
            const comment = recommendedSkill.skill.recommendComment || defaultComment;
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

            const recommendedBadge = isRecommended ? '<span class="recommended-badge">推奨</span>' : '';

            // Show locked reason for key skills that weren't earned
            const lockedReasonHtml = isLocked && lockedReason
                ? `<span class="skill-locked-reason">${lockedReason}</span>`
                : '';

            sBtn.innerHTML = `
                ${recommendedBadge}
                <div class="skill-letter-circle">${String.fromCharCode(65 + i)}</div>
                <div class="skill-content">
                    <span class="skill-name">${s.name}</span>
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
            ? '<span style="color: #4cc9f0;">獲得済</span>'
            : '<span style="color: #888;">未獲得</span>';

        this.dom.ovTitle.innerText = "STAGE COMPLETE";
        this.dom.ovTitle.style.color = "var(--accent-color)";

        this.dom.ovBody.innerHTML = `
            <div style="text-align: center;">
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
                <div style="margin-top: 15px; font-size: 0.85rem; color: #666;">Key Skill: ${keySkillStatus}</div>
            </div>
        `;
        this.dom.ovStats.innerHTML = "";

        // Stage 10: Show "最終認定" button to proceed to license screen
        // Other stages: Show "TITLE" button to return to title
        if (s.currentStage === 10) {
            this.dom.btnNext.innerText = "最終認定";
            this.dom.btnNext.onclick = () => this.showFinalCertificationEnding();
        } else {
            this.dom.btnNext.innerText = "TITLE";
            this.dom.btnNext.onclick = () => location.reload();
        }
        this.dom.btnNext.style.display = 'block';
        this.dom.overlay.style.display = 'flex';
    }

    private showFinalCertificationEnding() {
        const globalProgress = this.engine.getGlobalProgress();
        const licenseType = globalProgress.calculateLicenseType();
        const totalKeySkills = globalProgress.getKeySkillCount();

        // License information based on type
        const licenseInfo = this.getLicenseInfo(licenseType);

        this.dom.ovTitle.innerText = "最終認定";
        this.dom.ovTitle.style.color = licenseInfo.color;

        // Get license image if available
        let licenseImageHtml = '';
        if (licenseInfo.imagePath) {
            const assetPath = `../assets/${licenseInfo.imagePath}`;
            const mod = images[assetPath] as { default: string } | undefined;
            if (mod?.default) {
                licenseImageHtml = `<img src="${mod.default}" alt="${licenseInfo.nameJP}" style="
                    width: 200px;
                    height: auto;
                    border-radius: 10px;
                    margin: 0 auto 20px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    display: block;
                " />`;
            }
        }
        // Fallback to placeholder if no image
        if (!licenseImageHtml) {
            licenseImageHtml = `<div class="license-placeholder" style="
                width: 200px;
                height: 200px;
                background: linear-gradient(135deg, ${licenseInfo.gradientStart}, ${licenseInfo.gradientEnd});
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            ">
                <div style="text-align: center; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                    <div style="font-size: 2.5rem; font-weight: bold;">${licenseInfo.symbol}</div>
                    <div style="font-size: 0.8rem; margin-top: 5px;">${licenseInfo.nameEN}</div>
                </div>
            </div>`;
        }

        // Build the final certification display (overall results only, no Stage 10 stats)
        this.dom.ovBody.innerHTML = `
            <div class="final-certification" style="text-align: center;">
                <div class="license-image-container">
                    ${licenseImageHtml}
                </div>

                <div style="font-size: 1.5rem; font-weight: bold; color: ${licenseInfo.color}; margin-bottom: 20px;">
                    ${licenseInfo.nameJP}
                </div>

                <div style="font-size: 0.85rem; color: ${totalKeySkills >= 10 ? '#4cc9f0' : '#666'}; margin-bottom: 20px;">
                    キースキル: ${totalKeySkills}/10 ${totalKeySkills >= 10 ? '✓ 完全収集' : ''}
                </div>

                <div class="adam-comment-section">
                    <img src="${this.dom.mascotImg.src}" alt="A.D.A.M." class="adam-comment-img" />
                    <div class="adam-comment-text">[A.D.A.M.]: ${licenseInfo.adamComment}</div>
                </div>
            </div>
        `;

        this.dom.ovStats.innerHTML = "";
        this.dom.btnNext.innerText = "TITLE";
        this.dom.btnNext.style.display = 'block';
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
                    nameJP: '大人免許不要',
                    nameEN: 'ADULT LICENSE NOT REQUIRED',
                    symbol: '自',
                    color: '#ffd700',
                    gradientStart: '#ffd700',
                    gradientEnd: '#ff6b6b',
                    adamComment: '大人とは何か、その答えを自分で見つけたのですね。あなたには大人免許など必要ありません。おめでとうございます。',
                    imagePath: 'license_true.png'
                };
            case 'GOLD':
                return {
                    nameJP: 'ゴールド大人免許',
                    nameEN: 'GOLD ADULT LICENSE',
                    symbol: 'G',
                    color: '#ffd700',
                    gradientStart: '#ffd700',
                    gradientEnd: '#b8860b',
                    adamComment: '全てのステージでSランクを達成しました。完璧な適合者です。あなたは社会システムの理想的な構成員となりました。おめでとうございます。',
                    imagePath: 'license_gold.png'
                };
            case 'SILVER':
                return {
                    nameJP: 'ブルー大人免許',
                    nameEN: 'SILVER ADULT LICENSE',
                    symbol: 'S',
                    color: '#c0c0c0',
                    gradientStart: '#c0c0c0',
                    gradientEnd: '#808080',
                    adamComment: '優秀な成績です。社会の期待に応える能力を持っています。まだ伸びしろはありますが、十分に大人と認められます。',
                    imagePath: 'license_blue.png'
                };
            case 'BRONZE':
                return {
                    nameJP: 'グリーン大人免許',
                    nameEN: 'GREEN ADULT LICENSE',
                    symbol: 'G',
                    color: '#cd7f32',
                    gradientStart: '#cd7f32',
                    gradientEnd: '#8b4513',
                    adamComment: '基準はクリアしました。社会で生きていくための最低限の知識は持っています。・・・もう少し努力すれば、より良い評価が得られたでしょう。',
                    imagePath: 'license_green.png'
                };
            case 'PAPER':
            default:
                return {
                    nameJP: 'ペーパー大人免許',
                    nameEN: 'PAPER ADULT LICENSE',
                    symbol: 'P',
                    color: '#888888',
                    gradientStart: '#888888',
                    gradientEnd: '#444444',
                    adamComment: 'ギリギリの合格です。社会システムの基本は理解しましたが、まだ危うい部分があります。・・・再教育を推奨します。',
                    imagePath: 'license_paper.png'
                };
        }
    }
}
