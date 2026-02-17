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

describe('GlobalProgressStorage', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('loads valid data correctly', () => {
        const validData = {
            stageRanks: { 1: 'S', 2: 'A' },
            keySkillsCollected: ['skill1', 'skill2'],
            completedStages: [1, 2],
        };
        localStorage.setItem(CONFIG.STORAGE_KEYS.GLOBAL_PROGRESS, JSON.stringify(validData));

        const storage = new GlobalProgressStorage();
        expect(storage.getProgress()).toEqual(validData);
    });

    it('handles malformed JSON gracefully', () => {
        const getItemSpy = vi.spyOn(localStorage, 'getItem');
        getItemSpy.mockReturnValueOnce('{invalid-json');

        const storage = new GlobalProgressStorage();
        const progress = storage.getProgress();

        expect(progress.stageRanks).toEqual({});

        getItemSpy.mockRestore();
    });

    it('should reject invalid data structure (missing fields)', () => {
        const invalidData = {
            stageRanks: { 1: 'S' },
            // Missing keySkillsCollected and completedStages
        };
        localStorage.setItem(CONFIG.STORAGE_KEYS.GLOBAL_PROGRESS, JSON.stringify(invalidData));

        const storage = new GlobalProgressStorage();
        const progress = storage.getProgress();

        expect(progress.keySkillsCollected).toBeDefined();
        expect(progress.completedStages).toBeDefined();
        expect(progress.completedStages).toEqual([]);
    });

    it('should reject invalid data types', () => {
        const invalidData = {
            stageRanks: "not-an-object",
            keySkillsCollected: 12345,
            completedStages: "should-be-array",
        };
        localStorage.setItem(CONFIG.STORAGE_KEYS.GLOBAL_PROGRESS, JSON.stringify(invalidData));

        const storage = new GlobalProgressStorage();
        const progress = storage.getProgress();

        expect(Array.isArray(progress.completedStages)).toBe(true);
        expect(Array.isArray(progress.keySkillsCollected)).toBe(true);
        expect(typeof progress.stageRanks).toBe('object');
    });

    it('should reject invalid rank values', () => {
        const invalidData = {
            stageRanks: { 1: 'X' }, // Invalid rank
            keySkillsCollected: [],
            completedStages: [1],
        };
        localStorage.setItem(CONFIG.STORAGE_KEYS.GLOBAL_PROGRESS, JSON.stringify(invalidData));

        const storage = new GlobalProgressStorage();
        const progress = storage.getProgress();

        expect(progress.stageRanks[1]).toBeUndefined();
    });
});
