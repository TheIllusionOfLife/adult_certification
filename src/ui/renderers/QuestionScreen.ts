import { DOMManager } from './DOMManager';
import { Question, Choice } from '../../types';
import { t, getLang } from '../../i18n/lang';
import * as UI from '../../i18n/uiStrings';
import { h } from '../utils';
import { getAssetPath } from '../assets';

export class QuestionScreen {
    constructor(private dom: DOMManager) {}

    render(
        question: Question,
        currentQuestionIndex: number,
        totalQuestions: number,
        isChoiceLocked: (c: Choice) => boolean,
        onChoice: (c: Choice, i: number) => void
    ) {
        const d = this.dom.elements;

        d.qCat.innerText = question.category;
        d.qNum.innerText = `Q.${currentQuestionIndex + 1} / ${totalQuestions}`;
        d.qText.innerText = t(question.text, question.textEN);

        // Image Handling
        if (question.imagePath) {
            const assetPath = getAssetPath(question.imagePath);
            if (assetPath) {
                d.mainImage.src = assetPath;
                d.mainImage.classList.add('loaded');
            } else {
                console.warn(`Image not found for path: ../assets/${question.imagePath}`);
                d.mainImage.src = '';
                d.mainImage.classList.remove('loaded');
            }
        } else {
            d.mainImage.src = '';
            d.mainImage.classList.remove('loaded');
        }

        d.sceneDesc.innerText = question.imagePrompt || '';

        d.choices.innerHTML = '';
        question.choices.forEach((c: Choice, i: number) => {
            const btn = document.createElement('button');
            const isLocked = isChoiceLocked(c);

            btn.className = isLocked ? 'choice-btn choice-locked' : 'choice-btn';

            btn.textContent = '';
            btn.append(h('span', 'choice-letter', String.fromCharCode(65 + i)), h('span', 'choice-text', t(c.text, c.textEN)));

            if (isLocked && c.lockRequirements) {
                const req = c.lockRequirements;
                const parts: string[] = [];
                if (req.CS !== undefined) parts.push(UI.UI_LOCK_CS(req.CS));
                if (req.Asset !== undefined) parts.push(UI.UI_LOCK_ASSET(req.Asset));
                if (req.Autonomy !== undefined) parts.push(UI.UI_LOCK_AUTONOMY(req.Autonomy));
                const sep = getLang() === 'en' ? '; ' : '、';
                btn.appendChild(h('div', 'lock-reason', parts.join(sep)));
            }

            if (!isLocked) {
                btn.addEventListener('click', () => onChoice(c, i));
            }
            // Locked choices are not clickable at all

            d.choices.appendChild(btn);
        });
    }
}
