import { CONFIG } from '../config';

export interface StageRecord {
    rank: string;
    score: number;
    date: string;
}

export type RecordMap = Record<string, StageRecord>;

/**
 * Manages game progress records in localStorage.
 * Provides load/save functionality with error handling for private browsing mode.
 */
export class RecordStorage {
    private records: RecordMap = {};

    constructor() {
        this.load();
    }

    /**
     * Load records from localStorage.
     */
    load(): void {
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.RECORDS);
            if (stored) {
                this.records = JSON.parse(stored);
            }
        } catch {
            // eslint-disable-next-line no-console
            console.warn('Failed to load records, resetting');
            this.records = {};
        }
    }

    /**
     * Save a stage completion record (only if rank is better than existing).
     */
    save(stageKey: string, rank: string, score: number): void {
        const rankOrder: Record<string, number> = { S: 4, A: 3, B: 2, C: 1 };
        const existing = this.records[stageKey];
        const existingRankValue = existing ? (rankOrder[existing.rank] ?? 0) : 0;
        const newRankValue = rankOrder[rank] ?? 0;

        // Only update if new rank is better or first time
        if (!existing || newRankValue > existingRankValue) {
            this.records[stageKey] = {
                rank,
                score,
                date: new Date().toLocaleDateString(),
            };
            try {
                localStorage.setItem(CONFIG.STORAGE_KEYS.RECORDS, JSON.stringify(this.records));
            } catch {
                // eslint-disable-next-line no-console
                console.warn('Failed to save record (private browsing?)');
            }
        }
    }

    /**
     * Get the record for a specific stage.
     */
    get(stageKey: string): StageRecord | undefined {
        return this.records[stageKey];
    }

    /**
     * Get all records.
     */
    getAll(): RecordMap {
        return { ...this.records };
    }

    /**
     * Check if a stage is unlocked.
     * Stage 1 is always unlocked; others require the previous stage to be beaten.
     */
    isStageUnlocked(stageIndex: number): boolean {
        if (stageIndex === 0) return true;
        return !!this.records[`Stage${stageIndex}`];
    }
}
