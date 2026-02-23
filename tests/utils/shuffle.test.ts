import { describe, it, expect, spyOn } from 'bun:test';
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
        expect([...result].sort((a, b) => a - b)).toEqual([...input].sort((a, b) => a - b));
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

    it('should shuffle predictably with mocked Math.random', () => {
        const input = [1, 2, 3];
        const randomSpy = spyOn(Math, 'random');

        // Fisher-Yates for [1, 2, 3]:
        // i=2: j = Math.floor(random * 3).
        // i=1: j = Math.floor(random * 2).
        randomSpy
            .mockReturnValueOnce(0.1) // i=2, j=0. Swap [2] and [0]. [1,2,3] -> [3,2,1]
            .mockReturnValueOnce(0.9); // i=1, j=1. Swap [1] and [1]. [3,2,1] -> [3,2,1]

        const result = shuffle(input);
        expect(result).toEqual([3, 2, 1]);
        randomSpy.mockRestore();
    });
});
