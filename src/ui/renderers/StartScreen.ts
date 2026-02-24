import { STAGE_METADATA } from '../../data/stageMetadata';
import { CONFIG } from '../../config';
import { RecordStorage } from '../../storage/RecordStorage';
import { GlobalProgressStorage } from '../../storage/GlobalProgressStorage';
import { getLang, setLang, t } from '../../i18n/lang';
import * as UI from '../../i18n/uiStrings';
import { h } from '../utils';
import { DOMManager } from './DOMManager';

export class StartScreen {
    constructor(private dom: DOMManager) {}

    show(
        recordStorage: RecordStorage,
        globalProgress: GlobalProgressStorage,
        onSelect: (stageNum: number) => void
    ) {
        const d = this.dom.elements;
        d.startScreen.style.display = 'flex';
        d.diffList.innerHTML = '';

        // Language toggle
        d.titleDesc.textContent = UI.UI_TITLE_DESC();

        let langBtn = document.getElementById('lang-toggle') as HTMLButtonElement | null;
        if (!langBtn) {
            langBtn = document.createElement('button');
            langBtn.id = 'lang-toggle';
            langBtn.className = 'lang-toggle-btn';
            d.startScreen.insertBefore(langBtn, d.startScreen.firstChild);
        }
        langBtn.textContent = getLang() === 'ja' ? 'EN' : '日本語';
        langBtn.onclick = () => {
            setLang(getLang() === 'ja' ? 'en' : 'ja');
            this.show(recordStorage, globalProgress, onSelect);
        };

        // All 10 stages - only show unlocked stages (previous stage beaten)
        const allStages = STAGE_METADATA.map((stage) => ({
            key: `Stage${stage.id}`,
            name: `STAGE ${stage.id}`,
            desc: t(stage.themeJP, stage.theme),
            keySkillId: stage.keySkillId
        }));

        // Get collected key skills from global progress
        const collectedKeySkills = globalProgress.getKeySkillsCollected();

        // Only show stages that are unlocked (Stage 1 always visible, others require previous stage beaten)
        allStages.forEach((stage, index) => {
            if (!recordStorage.isStageUnlocked(index)) return; // Don't render locked stages

            const btn = document.createElement('button');
            btn.className = 'diff-btn';
            btn.type = 'button';

            const record = recordStorage.get(stage.key);
            const validRanks: readonly string[] = CONFIG.VALID_RANKS;
            const safeRank = record && validRanks.includes(record.rank) ? record.rank : '';
            const rankClass = safeRank ? `rank-${safeRank}` : '';
            const hasKeySkill = collectedKeySkills.includes(stage.keySkillId);

            // Add shimmer effect for stages with both S rank and key skill
            if (safeRank === 'S' && hasKeySkill) {
                btn.classList.add('stage-perfected');
            }

            btn.textContent = '';
            const rightColChildren: Node[] = [];
            if (hasKeySkill) {
                const ki = h('span', 'key-indicator'); ki.title = `Key Skill ${UI.UI_KEY_SKILL_OBTAINED()}`;
                rightColChildren.push(ki);
            }
            if (safeRank) {
                rightColChildren.push(h('span', `rank-stamp ${rankClass}`, safeRank));
            }
            rightColChildren.push(h('span', 'arrow', '▶'));

            btn.append(
                h('div', 'diff-info', '', [h('span', 'diff-name', stage.name), h('span', 'diff-desc', stage.desc)]),
                h('div', 'btn-right-col', '', rightColChildren)
            );
            btn.addEventListener('click', () => {
                d.startScreen.style.display = 'none';
                onSelect(index + 1); // Pass stage number (1-indexed)
            });
            d.diffList.appendChild(btn);
        });
    }
}
