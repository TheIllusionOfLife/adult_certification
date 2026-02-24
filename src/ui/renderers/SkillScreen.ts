import { DOMManager } from './DOMManager';
import { Skill } from '../../types';
import { t } from '../../i18n/lang';
import * as UI from '../../i18n/uiStrings';
import { h } from '../utils';

export class SkillScreen {
    constructor(private dom: DOMManager) {}

    show(
        skillsWithStatus: Array<{ skill: Skill; isAvailable: boolean; lockedReason?: string; }>,
        onSelect: (skill: Skill) => void
    ) {
        const d = this.dom.elements;
        d.btnNext.style.display = 'none';
        d.skillBox.style.display = 'flex';
        d.skillBox.innerHTML = '';

        // Find recommended skill for A.D.A.M.'s speech
        const recommendedSkill = skillsWithStatus.find(s => s.skill.isRecommended);

        // Create wrapper for proper layout
        const wrapper = document.createElement('div');
        wrapper.className = 'skill-offer-wrapper';

        // Title section
        const title = h('div', 'skill-offer-title', '', [h('h3', '', UI.UI_SKILL_SELECT_TITLE())]);
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
            adamSection.textContent = '';
            const img = h('img', 'adam-recommend-img');
            Object.assign(img, { src: d.mascotImg.src, alt: 'A.D.A.M.' });
            adamSection.append(img, h('div', 'adam-recommend-speech', '', [h('span', 'adam-label', '[A.D.A.M.]:'), document.createTextNode(` ${comment}`)]));
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

            sBtn.textContent = '';
            sBtn.append(
                ...(isRecommended ? [h('span', 'recommended-badge', UI.UI_RECOMMENDED_BADGE())] : []),
                h('div', 'skill-letter-circle', String.fromCharCode(65 + i)),
                h('div', 'skill-content', '', [
                    h('span', 'skill-name', t(s.name, s.nameEN)),
                    h('span', 'skill-desc', t(s.desc, s.descEN)),
                    ...(isLocked && lockedReason ? [h('span', 'skill-locked-reason', lockedReason)] : [])
                ])
            );

            if (isLocked) {
                sBtn.disabled = true;
            } else {
                sBtn.addEventListener('click', () => onSelect(s));
            }

            skillsContainer.appendChild(sBtn);
        });

        wrapper.appendChild(skillsContainer);
        d.skillBox.appendChild(wrapper);
    }
}
