
import { describe, it, expect } from 'bun:test';
import { shuffle } from '../../src/utils/shuffle';

describe('shuffle', () => {
    it('should contain the same elements after shuffle', () => {
        const array = [1, 2, 3, 4, 5];
        const originalSet = new Set(array);
        const result = shuffle(array);

        expect(result.length).toBe(array.length);
        result.forEach(item => {
            expect(originalSet.has(item)).toBe(true);
        });
    });

    it('should change the order of elements (statistically)', () => {
        const array = Array.from({ length: 100 }, (_, i) => i);
        const original = [...array];
        const result = shuffle(array);

        // It's extremely unlikely that a shuffled array of 100 items is identical to the original
        expect(result).not.toEqual(original);
    });

    it('should shuffle in-place', () => {
        const array = [1, 2, 3, 4, 5];
        const result = shuffle(array);

        // This expects the function to return the same array instance
        expect(result).toBe(array);

        // This expects the original array to be modified
        // Note: checking if it's different from initial state is hard without a copy,
        // but we already checked result !== original (conceptually) in the previous test.
        // Here we just check reference equality.
    });
});
