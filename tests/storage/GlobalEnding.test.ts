import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { GlobalProgressStorage } from '../../src/storage/GlobalProgressStorage';
import { CONFIG } from '../../src/config';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = value.toString();
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
        clear: vi.fn(() => {
            store = {};
        }),
    };
})();

// Use globalThis to avoid linter errors with 'global'
Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true // Allow overwriting/deleting if needed
});

describe('GlobalEnding System', () => {
    let storage: GlobalProgressStorage;

    beforeEach(() => {
        // eslint-disable-next-line no-undef
        localStorage.clear();
        vi.clearAllMocks();
        storage = new GlobalProgressStorage();
    });

    afterEach(() => {
        // eslint-disable-next-line no-undef
        localStorage.clear();
    });

    it('calculateLicenseType returns null if Stage 10 is not completed', () => {
        // Completed stages 1-9
        for (let i = 1; i <= 9; i++) {
            storage.recordStageCompletion(i, 'S', `skill${i}`);
        }
        expect(storage.calculateLicenseType()).toBeNull();
    });

    it('calculateLicenseType returns TRUE if all 10 key skills are collected', () => {
        // Complete all stages with key skills, ranks don't matter for TRUE ending (priority)
        // Even if ranks are C, having all key skills should give TRUE
        for (let i = 1; i <= 10; i++) {
            storage.recordStageCompletion(i, 'C', `skill${i}`);
        }

        // Ensure we have 10 key skills
        expect(storage.getKeySkillCount()).toBe(10);
        expect(storage.calculateLicenseType()).toBe('TRUE');
    });

    it('calculateLicenseType returns GOLD if Stage 10 completed, not all key skills, and worst rank is S', () => {
        // Complete stages 1-10 with S rank, but miss some key skills
        for (let i = 1; i <= 10; i++) {
            // Only collect key skill for even stages to miss some
            const keySkill = i % 2 === 0 ? `skill${i}` : undefined;
            storage.recordStageCompletion(i, 'S', keySkill);
        }

        expect(storage.getKeySkillCount()).toBe(5); // Not all 10
        expect(storage.calculateLicenseType()).toBe('GOLD');
    });

    it('calculateLicenseType returns SILVER if worst rank is A', () => {
        // Complete stages 1-10, mostly S but one A
        for (let i = 1; i <= 10; i++) {
            storage.recordStageCompletion(i, 'S');
        }
        // Update stage 5 to A (should overwrite if better, but wait, recordStageCompletion only updates if better)
        // So we need to ensure the recorded rank is A.
        // Let's start fresh for this test case or just record A initially.
        localStorage.clear();
        storage = new GlobalProgressStorage();

        for (let i = 1; i <= 9; i++) {
            storage.recordStageCompletion(i, 'S');
        }
        storage.recordStageCompletion(10, 'A'); // Stage 10 is A

        expect(storage.calculateLicenseType()).toBe('SILVER');
    });

    it('calculateLicenseType returns BRONZE if worst rank is B', () => {
        // Complete stages 1-10, mix of S and A, but one B
        for (let i = 1; i <= 9; i++) {
            storage.recordStageCompletion(i, 'S');
        }
        storage.recordStageCompletion(10, 'B');

        expect(storage.calculateLicenseType()).toBe('BRONZE');
    });

    it('calculateLicenseType returns PAPER if worst rank is C', () => {
        // Complete stages 1-10, mostly S, but one C
        for (let i = 1; i <= 9; i++) {
            storage.recordStageCompletion(i, 'S');
        }
        storage.recordStageCompletion(10, 'C');

        expect(storage.calculateLicenseType()).toBe('PAPER');
    });

    it('recordStageCompletion updates rank only if better', () => {
        // Record Stage 1 with C
        storage.recordStageCompletion(1, 'C');
        expect(storage.getStageRank(1)).toBe('C');

        // Record Stage 1 with B (better)
        storage.recordStageCompletion(1, 'B');
        expect(storage.getStageRank(1)).toBe('B');

        // Record Stage 1 with A (better)
        storage.recordStageCompletion(1, 'A');
        expect(storage.getStageRank(1)).toBe('A');

        // Record Stage 1 with S (better)
        storage.recordStageCompletion(1, 'S');
        expect(storage.getStageRank(1)).toBe('S');

        // Record Stage 1 with C (worse) - should NOT update
        storage.recordStageCompletion(1, 'C');
        expect(storage.getStageRank(1)).toBe('S');
    });

    it('recordStageCompletion adds key skill if acquired', () => {
        storage.recordStageCompletion(1, 'C', 'skill1');
        expect(storage.getKeySkillsCollected()).toContain('skill1');

        // Record again without key skill - should still be there
        storage.recordStageCompletion(1, 'S');
        expect(storage.getKeySkillsCollected()).toContain('skill1');

        // Record another stage with another key skill
        storage.recordStageCompletion(2, 'C', 'skill2');
        expect(storage.getKeySkillsCollected()).toContain('skill1');
        expect(storage.getKeySkillsCollected()).toContain('skill2');
    });

    it('recordStageCompletion handles existing key skill correctly', () => {
        storage.recordStageCompletion(1, 'C', 'skill1');
        expect(storage.getKeySkillCount()).toBe(1);

        // Record same skill again
        storage.recordStageCompletion(1, 'B', 'skill1');
        expect(storage.getKeySkillCount()).toBe(1); // Should not duplicate
    });

    it('handles worst rank correctly with mixed history', () => {
        // Simulate a player who got C first, then replayed to get S
        storage.recordStageCompletion(1, 'C');
        expect(storage.getWorstRank()).toBe('C');

        storage.recordStageCompletion(1, 'S');
        expect(storage.getWorstRank()).toBe('S');

        // Add another stage with B
        storage.recordStageCompletion(2, 'B');
        // Ranks are S, B. Worst is B.
        expect(storage.getWorstRank()).toBe('B');
    });
});
