import type { GlobalProgress, LicenseType } from '../types';
import { CONFIG } from '../config';
import { encodeData, decodeData } from '../utils/security';

const STORAGE_KEY = CONFIG.STORAGE_KEYS.GLOBAL_PROGRESS;
const TOTAL_KEY_SKILLS = CONFIG.TOTAL_STAGES;

/**
 * Manages cross-stage progress tracking for global ending calculation.
 * Tracks stage ranks, key skills collected, and completed stages.
 */
export class GlobalProgressStorage {
    private _progress: GlobalProgress | null = null;

    private get progress(): GlobalProgress {
        if (!this._progress) {
            this._progress = this.load();
        }
        return this._progress;
    }

    constructor() {
        // Data is loaded lazily on first access
    }

    /**
     * Load progress from localStorage.
     */
    private load(): GlobalProgress {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const decoded = decodeData(stored);
                const data = JSON.parse(decoded);
                if (this.isValid(data)) {
                    return data;
                }
                // eslint-disable-next-line no-console
                console.warn('Invalid global progress data, resetting');
            }
        } catch {
            // eslint-disable-next-line no-console
            console.warn('Failed to load global progress, resetting');
        }
        return {
            stageRanks: {},
            keySkillsCollected: [],
            completedStages: [],
        };
    }

    /**
     * Validate the loaded data structure.
     */
    private isValid(data: unknown): data is GlobalProgress {
        if (!data || typeof data !== 'object') return false;

        const progress = data as Record<string, unknown>;

        // Validate completedStages
        const completedStages = progress.completedStages;
        if (!Array.isArray(completedStages)) return false;
        if (!completedStages.every((id) => typeof id === 'number')) return false;

        // Validate keySkillsCollected
        const keySkillsCollected = progress.keySkillsCollected;
        if (!Array.isArray(keySkillsCollected)) return false;
        if (!keySkillsCollected.every((id) => typeof id === 'string')) return false;

        // Validate stageRanks
        const stageRanks = progress.stageRanks;
        if (!stageRanks || typeof stageRanks !== 'object' || Array.isArray(stageRanks)) return false;

        const ranks = stageRanks as Record<string, unknown>;
        const validRanks = CONFIG.VALID_RANKS as readonly string[];
        for (const key in ranks) {
            const val = ranks[key];
            if (typeof val !== 'string' || !validRanks.includes(val)) return false;
        }

        return true;
    }

    /**
     * Save progress to localStorage.
     */
    private save(): void {
        try {
            const data = JSON.stringify(this.progress);
            localStorage.setItem(STORAGE_KEY, encodeData(data));
        } catch {
            // eslint-disable-next-line no-console
            console.warn('Failed to save global progress (private browsing?)');
        }
    }

    /**
     * Record completion of a stage.
     * @param stageId The stage number (1-10)
     * @param rank The rank achieved ('S' | 'A' | 'B' | 'C')
     * @param keySkillId Optional key skill ID if earned in this stage
     */
    recordStageCompletion(
        stageId: number,
        rank: 'S' | 'A' | 'B' | 'C',
        keySkillId?: string
    ): void {
        // Record the rank (only update if better or first time)
        const existingRank = this.progress.stageRanks[stageId];
        const rankOrder = { S: 4, A: 3, B: 2, C: 1 };
        if (!existingRank || rankOrder[rank] > rankOrder[existingRank]) {
            this.progress.stageRanks[stageId] = rank;
        }

        // Mark stage as completed
        if (!this.progress.completedStages.includes(stageId)) {
            this.progress.completedStages.push(stageId);
        }

        // Record key skill if provided and not already collected
        if (keySkillId && !this.progress.keySkillsCollected.includes(keySkillId)) {
            this.progress.keySkillsCollected.push(keySkillId);
        }

        this.save();
    }

    /**
     * Get the count of collected key skills.
     */
    getKeySkillCount(): number {
        return this.progress.keySkillsCollected.length;
    }

    /**
     * Check if all 10 key skills have been collected.
     */
    hasAllKeySkills(): boolean {
        return this.progress.keySkillsCollected.length >= TOTAL_KEY_SKILLS;
    }

    /**
     * Get the list of collected key skill IDs.
     */
    getKeySkillsCollected(): string[] {
        return [...this.progress.keySkillsCollected];
    }

    /**
     * Get the worst rank across all completed stages.
     * Returns null if no stages completed.
     */
    getWorstRank(): 'S' | 'A' | 'B' | 'C' | null {
        const ranks = Object.values(this.progress.stageRanks);
        if (ranks.length === 0) return null;

        const rankOrder = { C: 1, B: 2, A: 3, S: 4 };
        return ranks.reduce((worst, current) =>
            rankOrder[current] < rankOrder[worst] ? current : worst
        );
    }

    /**
     * Calculate the license type based on key skills and ranks.
     * Returns null if Stage 10 hasn't been completed.
     */
    calculateLicenseType(): LicenseType | null {
        // Must have completed Stage 10
        if (!this.progress.completedStages.includes(10)) {
            return null;
        }

        // True Ending: All 10 key skills collected
        if (this.hasAllKeySkills()) {
            return 'TRUE';
        }

        // Determine license by worst rank
        const worstRank = this.getWorstRank();
        if (!worstRank) return null;

        switch (worstRank) {
            case 'S':
                return 'GOLD';
            case 'A':
                return 'SILVER';
            case 'B':
                return 'BRONZE';
            case 'C':
            default:
                return 'PAPER';
        }
    }

    /**
     * Get all progress data.
     */
    getProgress(): GlobalProgress {
        return { ...this.progress };
    }

    /**
     * Check if a specific stage has been completed.
     */
    isStageCompleted(stageId: number): boolean {
        return this.progress.completedStages.includes(stageId);
    }

    /**
     * Get the rank for a specific stage.
     */
    getStageRank(stageId: number): 'S' | 'A' | 'B' | 'C' | undefined {
        return this.progress.stageRanks[stageId];
    }
}
