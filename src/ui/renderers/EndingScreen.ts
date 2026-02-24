import { DOMManager } from './DOMManager';
import { GlobalProgressStorage } from '../../storage/GlobalProgressStorage';
import { getStageMetadata } from '../../data/stageMetadata';
import * as UI from '../../i18n/uiStrings';
import { LicenseType } from '../../types';
import { getAssetPath } from '../assets';
import { h } from '../utils';

export interface Ending {
    rank: string;
    title: string;
    desc: string;
}

export class EndingScreen {
    constructor(private dom: DOMManager) {}

    show(
        ending: Ending,
        currentStage: number,
        cs: number,
        asset: number,
        autonomy: number,
        keySkills: string[],
        adamComment: string,
        globalProgress: GlobalProgressStorage,
        onRestart: () => void
    ) {
        const d = this.dom.elements;
        const stageMetadata = getStageMetadata(currentStage);
        const stageKeySkillId = stageMetadata?.keySkillId;
        const keySkillObtained = stageKeySkillId && keySkills.includes(stageKeySkillId);
        const keySkillStatus = keySkillObtained
            ? `<span class="key-skill-obtained">${UI.UI_KEY_SKILL_OBTAINED()}</span>`
            : `<span class="key-skill-not-obtained">${UI.UI_KEY_SKILL_NOT_OBTAINED()}</span>`;

        d.ovTitle.innerText = UI.UI_STAGE_COMPLETE();
        d.ovTitle.style.color = "var(--accent-color)";

        d.ovBody.innerHTML = `
            <div class="ending-container">
                <div class="ending-subtitle">${UI.UI_STAGE_N_END(currentStage)}</div>
                <strong class="ending-rank">${ending.rank}</strong>
                <span class="ending-title">${ending.title}</span>
                <div class="ending-desc">
                    ${UI.UI_RESULT_STATS(cs, asset, autonomy)}
                </div>
                <div class="adam-comment-section">
                    <img src="${d.mascotImg.src}" alt="A.D.A.M." class="adam-comment-img" />
                    <div class="adam-comment-text">${adamComment}</div>
                </div>
                <div class="key-skill-status-container">Key Skill: ${keySkillStatus}</div>
            </div>
        `;
        d.ovStats.innerHTML = "";
        d.skillBox.style.display = 'none';

        // Stage 10: Show "最終認定" button to proceed to license screen
        // Other stages: Show "TITLE" button to return to title
        if (currentStage === 10) {
            d.btnNext.innerText = UI.UI_FINAL_CERT();
            d.btnNext.onclick = () => this.showFinalCertificationEnding(globalProgress, onRestart);
        } else {
            d.btnNext.innerText = "TITLE";
            d.btnNext.onclick = onRestart;
        }
        d.btnNext.style.display = 'block';
        d.btnNext.disabled = false;
        d.btnNext.style.opacity = '1';
        d.btnNext.style.cursor = 'pointer';
        d.overlay.style.display = 'flex';
    }

    private showFinalCertificationEnding(globalProgress: GlobalProgressStorage, onRestart: () => void) {
        const d = this.dom.elements;
        const licenseType = globalProgress.calculateLicenseType();
        const totalKeySkills = globalProgress.getKeySkillCount();

        // License information based on type
        const licenseInfo = this.getLicenseInfo(licenseType);

        d.ovTitle.innerText = UI.UI_FINAL_CERT();
        d.ovTitle.style.color = licenseInfo.color;

        // Get license image if available
        let licenseImageHtml = '';
        if (licenseInfo.imagePath) {
            const assetPath = getAssetPath(licenseInfo.imagePath);
            if (assetPath) {
                licenseImageHtml = `<img src="${assetPath}" alt="${licenseInfo.nameJP}" class="license-img" />`;
            }
        }
        // Fallback to placeholder if no image
        if (!licenseImageHtml) {
            licenseImageHtml = `<div class="license-placeholder" style="background: linear-gradient(135deg, ${licenseInfo.gradientStart}, ${licenseInfo.gradientEnd});">
                <div class="license-placeholder-content">
                    <div class="license-symbol">${licenseInfo.symbol}</div>
                    <div class="license-name-en">${licenseInfo.nameEN}</div>
                </div>
            </div>`;
        }

        // Build the final certification display (overall results only, no Stage 10 stats)
        d.ovBody.innerHTML = `
            <div class="final-certification">
                <div class="license-image-container">
                    ${licenseImageHtml}
                </div>

                <div class="license-name-jp" style="color: ${licenseInfo.color}">
                    ${licenseInfo.nameJP}
                </div>

                <div class="key-skill-summary" style="color: ${totalKeySkills >= 10 ? 'var(--color-positive)' : 'var(--color-text-dark-muted)'}">
                    Key Skill: ${totalKeySkills}/10 ${totalKeySkills >= 10 ? UI.UI_KEY_SKILL_COMPLETE() : ''}
                </div>

                <div class="adam-comment-section">
                    <img src="${d.mascotImg.src}" alt="A.D.A.M." class="adam-comment-img" />
                    <div class="adam-comment-text">${licenseInfo.adamComment}</div>
                </div>
            </div>
        `;

        d.ovStats.innerHTML = "";
        d.skillBox.style.display = 'none';
        d.btnNext.innerText = "TITLE";
        d.btnNext.style.display = 'block';
        d.btnNext.disabled = false;
        d.btnNext.style.opacity = '1';
        d.btnNext.style.cursor = 'pointer';
        d.btnNext.onclick = onRestart;
        d.overlay.style.display = 'flex';
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
                    nameJP: UI.UI_LICENSE_TRUE_JP(),
                    nameEN: 'ADULT LICENSE NOT REQUIRED',
                    symbol: '自',
                    color: '#ffd700',
                    gradientStart: '#ffd700',
                    gradientEnd: '#ff6b6b',
                    adamComment: UI.UI_LICENSE_TRUE_ADAM(),
                    imagePath: 'license_true.png'
                };
            case 'GOLD':
                return {
                    nameJP: UI.UI_LICENSE_GOLD_JP(),
                    nameEN: 'GOLD ADULT LICENSE',
                    symbol: 'G',
                    color: '#ffd700',
                    gradientStart: '#ffd700',
                    gradientEnd: '#b8860b',
                    adamComment: UI.UI_LICENSE_GOLD_ADAM(),
                    imagePath: 'license_gold.png'
                };
            case 'SILVER':
                return {
                    nameJP: UI.UI_LICENSE_SILVER_JP(),
                    nameEN: 'BLUE ADULT LICENSE',
                    symbol: 'S',
                    color: '#c0c0c0',
                    gradientStart: '#c0c0c0',
                    gradientEnd: '#808080',
                    adamComment: UI.UI_LICENSE_SILVER_ADAM(),
                    imagePath: 'license_blue.png'
                };
            case 'BRONZE':
                return {
                    nameJP: UI.UI_LICENSE_BRONZE_JP(),
                    nameEN: 'GREEN ADULT LICENSE',
                    symbol: 'G',
                    color: '#cd7f32',
                    gradientStart: '#cd7f32',
                    gradientEnd: '#8b4513',
                    adamComment: UI.UI_LICENSE_BRONZE_ADAM(),
                    imagePath: 'license_green.png'
                };
            case 'PAPER':
            default:
                return {
                    nameJP: UI.UI_LICENSE_PAPER_JP(),
                    nameEN: 'PAPER ADULT LICENSE',
                    symbol: 'P',
                    color: '#888888',
                    gradientStart: '#888888',
                    gradientEnd: '#444444',
                    adamComment: UI.UI_LICENSE_PAPER_ADAM(),
                    imagePath: 'license_paper.png'
                };
        }
    }
}
