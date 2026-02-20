import { describe, it, expect, beforeEach } from 'bun:test';
import { GlobalProgressStorage } from '../../src/storage/GlobalProgressStorage';
import { RecordStorage } from '../../src/storage/RecordStorage';
import { encodeData, decodeData } from '../../src/utils/security';
import { CONFIG } from '../../src/config';

// Simple localStorage mock
const mockStorage: Record<string, string> = {};
Object.defineProperty(globalThis, 'localStorage', {
    value: {
        getItem: (key: string) => mockStorage[key] || null,
        setItem: (key: string, value: string) => { mockStorage[key] = value; },
        removeItem: (key: string) => { delete mockStorage[key]; },
        clear: () => { for (const key in mockStorage) delete mockStorage[key]; }
    },
    writable: true,
    configurable: true,
});

describe('Security Utilities', () => {
    it('should encode data to base64', () => {
        const data = '{"test":"data"}';
        const encoded = encodeData(data);
        expect(encoded).toBe(btoa(data));
        expect(encoded).not.toBe(data);
    });

    it('should decode base64 data', () => {
        const data = '{"test":"data"}';
        const encoded = btoa(data);
        const decoded = decodeData(encoded);
        expect(decoded).toBe(data);
    });

    it('should fall back to raw data if it looks like JSON', () => {
        const data = '{"test":"data"}';
        const decoded = decodeData(data);
        expect(decoded).toBe(data);
    });
});

describe('Storage Backward Compatibility', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('GlobalProgressStorage should load plaintext JSON (old format)', () => {
        const oldData = {
            stageRanks: { 1: 'S' },
            keySkillsCollected: ['skill1'],
            completedStages: [1]
        };
        localStorage.setItem(CONFIG.STORAGE_KEYS.GLOBAL_PROGRESS, JSON.stringify(oldData));

        const storage = new GlobalProgressStorage();
        expect(storage.getStageRank(1)).toBe('S');
        expect(storage.getKeySkillCount()).toBe(1);
    });

    it('RecordStorage should load plaintext JSON (old format)', () => {
        const oldRecords = {
            'Stage1': { rank: 'A', score: 100, date: '2023-01-01' }
        };
        localStorage.setItem(CONFIG.STORAGE_KEYS.RECORDS, JSON.stringify(oldRecords));

        const storage = new RecordStorage();
        expect(storage.get('Stage1')?.rank).toBe('A');
    });
});

describe('Storage New Format', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('GlobalProgressStorage should save in encoded format', () => {
        const storage = new GlobalProgressStorage();
        storage.recordStageCompletion(1, 'S', 'skill1');

        const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.GLOBAL_PROGRESS);
        expect(stored).not.toBeNull();
        expect(stored).not.toContain('{'); // Should not be plaintext JSON
        expect(decodeData(stored!)).toContain('"S"');
    });

    it('RecordStorage should save in encoded format', () => {
        const storage = new RecordStorage();
        storage.save('Stage1', 'S', 200);

        const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.RECORDS);
        expect(stored).not.toBeNull();
        expect(stored).not.toContain('{');
        expect(decodeData(stored!)).toContain('"S"');
    });

    it('should round-trip data correctly', () => {
        const storage1 = new GlobalProgressStorage();
        storage1.recordStageCompletion(2, 'A', 'skill2');

        const storage2 = new GlobalProgressStorage(); // This will load what storage1 saved
        expect(storage2.getStageRank(2)).toBe('A');
        expect(storage2.getKeySkillsCollected()).toContain('skill2');
    });
});
