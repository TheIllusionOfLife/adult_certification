import { describe, it, expect } from 'bun:test';
import { shuffle } from '../../src/utils/shuffle';

describe('shuffle', () => {
    it('should return an array of the same length', () => {
        const input = [1, 2, 3, 4, 5];
        const result = shuffle(input);
        expect(result).toHaveLength(input.length);
    });

    it('should contain all the same elements as the original array', () => {
        const input = [1, 2, 3, 4, 5];
        const result = shuffle(input);
        expect([...result].sort()).toEqual([...input].sort());
    });

    it('should return a new array instance', () => {
        const input = [1, 2, 3];
        const result = shuffle(input);
        expect(result).not.toBe(input);
    });

    it('should not modify the original array', () => {
        const input = [1, 2, 3];
        const inputCopy = [...input];
        shuffle(input);
        expect(input).toEqual(inputCopy);
    });

    it('should handle an empty array', () => {
        const input: number[] = [];
        const result = shuffle(input);
        expect(result).toEqual([]);
        expect(result).not.toBe(input);
    });

    it('should handle a single-element array', () => {
        const input = [1];
        const result = shuffle(input);
        expect(result).toEqual([1]);
        expect(result).not.toBe(input);
    });

    it('should work with different data types', () => {
        const input = [{ a: 1 }, { b: 2 }, { c: 3 }];
        const result = shuffle(input);
        expect(result).toHaveLength(3);
        expect(result).toContain(input[0]);
        expect(result).toContain(input[1]);
        expect(result).toContain(input[2]);
    });

    it('should eventually change the order for a larger array', () => {
        const input = Array.from({ length: 100 }, (_, i) => i);
        const result = shuffle(input);
        // While theoretically possible it stays the same, for 100 elements it's 1/100! which is negligible
        expect(result).not.toEqual(input);
    });
});
