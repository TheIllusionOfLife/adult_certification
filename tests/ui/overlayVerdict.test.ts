import { describe, it, expect } from 'vitest';
import { getOverlayPresentation } from '../../src/ui/overlayVerdict';

describe('getOverlayPresentation', () => {
    it('returns TERMINATED presentation when isTerminated is true', () => {
        const input = {
            isTerminated: true,
            csDelta: 10,
            choiceVerdict: 'APPROVED' as const
        };
        const result = getOverlayPresentation(input);
        expect(result).toEqual({
            title: 'TERMINATED',
            colorVar: 'var(--primary-color)'
        });
    });

    it.each([
        { choiceVerdict: 'APPROVED' as const, csDelta: -10, expected: { title: 'APPROVED', colorVar: 'var(--accent-color)' } },
        { choiceVerdict: 'WARNING' as const, csDelta: 10, expected: { title: 'WARNING', colorVar: 'var(--primary-color)' } },
        { choiceVerdict: 'NEUTRAL' as const, csDelta: 0, expected: { title: 'RECORDED', colorVar: 'var(--accent-color)' } },
    ])('returns $expected.title presentation when choiceVerdict is $choiceVerdict', ({ choiceVerdict, csDelta, expected }) => {
        const input = {
            isTerminated: false,
            csDelta,
            choiceVerdict,
        };
        const result = getOverlayPresentation(input);
        expect(result).toEqual(expected);
    });

    describe('fallback logic (when choiceVerdict is undefined)', () => {
        it.each([
            { csDelta: 10, case: 'positive', expected: { title: 'APPROVED', colorVar: 'var(--accent-color)' } },
            { csDelta: 0, case: 'zero', expected: { title: 'APPROVED', colorVar: 'var(--accent-color)' } },
            { csDelta: -5, case: 'negative', expected: { title: 'WARNING', colorVar: 'var(--primary-color)' } },
        ])('returns $expected.title when csDelta is $case ($csDelta)', ({ csDelta, expected }) => {
            const input = {
                isTerminated: false,
                csDelta,
                choiceVerdict: undefined,
            };
            const result = getOverlayPresentation(input);
            expect(result).toEqual(expected);
        });
    });
});
