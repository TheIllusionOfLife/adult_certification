import { DOMManager } from './DOMManager';
import { GameState, Skill } from '../../types';
import { CONFIG } from '../../config';
import * as UI from '../../i18n/uiStrings';
import { t } from '../../i18n/lang';

export class HUD {
    private lastScores = { ...CONFIG.DEFAULT_INITIAL_PARAMS };

    constructor(private dom: DOMManager) {}

    update(state: GameState) {
        const d = this.dom.elements;
        const s = state;

        // Update stat labels for current language
        const labels = d.statLabels;
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

        animate(d.cs, s.CS, this.lastScores.CS);
        animate(d.asset, s.Asset, this.lastScores.Asset);
        animate(d.autonomy, s.Autonomy, this.lastScores.Autonomy);

        // Update last scores
        this.lastScores = { CS: s.CS, Asset: s.Asset, Autonomy: s.Autonomy };

        const progress = s.questions.length > 0
            ? (s.currentQuestionIndex / s.questions.length) * 100
            : 0;
        d.bar.style.width = `${progress}%`;

        if (s.CS < 30 || s.Autonomy < 20 || s.Asset < 20) {
            d.container.style.boxShadow = "0 0 50px red";
            this.updateMascot('glitch');
        } else {
            d.container.style.boxShadow = "15px 15px 0px var(--ink-black)";
            // Only reset to happy/neutral if not in overlay (handled elsewhere)
        }
    }

    updateMascot(state: 'happy' | 'glitch' | 'neutral') {
        const d = this.dom.elements;
        d.mascotImg.className = ''; // Reset
        d.mascotContainer.classList.remove('mascot-happy', 'mascot-glitch');

        if (state === 'happy') {
            d.mascotContainer.classList.add('mascot-happy');
        } else if (state === 'glitch') {
            d.mascotContainer.classList.add('mascot-glitch');
        }
    }

    updateSkillList(activeSkills: Skill[]) {
        const d = this.dom.elements;
        const skillNames = activeSkills.map(skill => t(skill.name, skill.nameEN));
        d.skillList.innerText = skillNames.length > 0 ? skillNames.join(', ') : UI.UI_SKILLS_NONE();
    }
}
