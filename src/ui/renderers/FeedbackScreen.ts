import { DOMManager } from './DOMManager';
import { Choice, Question } from '../../types';
import { SkillActivation } from '../../data/skillEffects';
import { getOverlayPresentation } from '../overlayVerdict';
import * as UI from '../../i18n/uiStrings';
import { h } from '../utils';
import { CONFIG } from '../../config';
import { getAssetPath } from '../assets';

export interface FeedbackResult {
    outcome: { CS: number; Asset: number; Autonomy: number };
    feedback: string;
    adamComment: string;
    isTerminated: boolean;
    skillActivations: SkillActivation[]
    choiceVerdict?: Choice['verdict'];
}

export class FeedbackScreen {
    constructor(private dom: DOMManager, private mascotUpdater: (state: 'happy' | 'glitch' | 'neutral') => void) {}

    show(
        result: FeedbackResult,
        shouldOfferSkills: boolean,
        nextQuestion: Question | null,
        onNext: () => void,
        onRestart: () => void
    ) {
        const d = this.dom.elements;
        const { outcome, feedback, isTerminated, skillActivations, choiceVerdict } = result;
        const { CS, Asset, Autonomy } = outcome;

        const getAnimClass = (val: number) => {
            if (val > 0) return 'score-pop-up';
            if (val < 0) return 'score-pop-down';
            return '';
        };

        const overlay = getOverlayPresentation({
            isTerminated,
            csDelta: CS,
            choiceVerdict: choiceVerdict,
        });
        d.ovTitle.innerText = overlay.title;
        d.ovTitle.style.color = overlay.colorVar;

        d.ovBody.textContent = '';
        d.ovBody.appendChild(document.createTextNode(feedback));

        if (skillActivations.length > 0) {
            d.ovBody.appendChild(document.createElement('br'));
            skillActivations.forEach((sa, index) => {
                const span = document.createElement('span');
                span.className = 'skill-activation-msg';
                span.textContent = UI.UI_SKILL_ACTIVATION(sa.skillName, sa.description, sa.originalValue, sa.modifiedValue);
                d.ovBody.appendChild(span);
                if (index < skillActivations.length - 1) {
                    d.ovBody.appendChild(document.createElement('br'));
                }
            });
        }
        d.ovStats.textContent = '';
        [
            { l: UI.UI_STAT_CS_SHORT(), v: CS }, { l: UI.UI_STAT_ASSET_SHORT(), v: Asset }, { l: UI.UI_STAT_AUTONOMY_SHORT(), v: Autonomy }
        ].forEach(s => {
            const labelS = h('span', 'stat-label', s.l);
            const valS = h('span', 'stat-value', (s.v > 0 ? '+' : '') + s.v);
            d.ovStats.appendChild(h('div', `stat-result ${getAnimClass(s.v)}`, '', [labelS, document.createElement('br'), valS]));
        });

        // Mascot Reaction
        if (CS > 0) this.mascotUpdater('happy');
        else if (Autonomy < 0 || CS < 0) this.mascotUpdater('glitch');
        else this.mascotUpdater('neutral');

        if (isTerminated) {
            d.btnNext.style.display = 'block';

            const adamSection = document.createElement('div');
            adamSection.className = 'adam-comment-section adam-comment-final';

            const img = document.createElement('img');
            img.src = d.mascotImg.src;
            img.alt = 'A.D.A.M.';
            img.className = 'adam-comment-img';

            const text = document.createElement('div');
            text.className = 'adam-comment-text';
            text.textContent = UI.UI_GAME_OVER_ADAM();

            adamSection.appendChild(img);
            adamSection.appendChild(text);
            d.ovBody.appendChild(adamSection);

            d.btnNext.innerText = UI.UI_RESTART();
            d.btnNext.onclick = onRestart;
            d.btnNext.disabled = false;
            d.btnNext.style.opacity = '1';
        } else {
            if (shouldOfferSkills) {
                d.btnNext.style.display = 'none';
            } else {
                d.btnNext.style.display = 'block';
                d.btnNext.innerText = "NEXT";

                d.btnNext.disabled = true;
                d.btnNext.style.opacity = '0.5';
                d.btnNext.style.cursor = 'not-allowed';

                setTimeout(() => {
                    d.btnNext.disabled = false;
                    d.btnNext.style.opacity = '1';
                    d.btnNext.style.cursor = 'pointer';
                }, CONFIG.BUTTON_DELAY_MS);

                d.btnNext.onclick = onNext;
            }
        }
        d.overlay.style.display = 'flex';

        // Preload next image
        if (nextQuestion && nextQuestion.imagePath) {
             const assetPath = getAssetPath(nextQuestion.imagePath);
             if (assetPath) {
                 d.mainImage.classList.remove('loaded');
                 d.mainImage.src = assetPath;
             }
        }
    }
}
