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

    it('returns APPROVED presentation when choiceVerdict is APPROVED', () => {
        const input = {
            isTerminated: false,
            csDelta: -10,
            choiceVerdict: 'APPROVED' as const
        };
        const result = getOverlayPresentation(input);
        expect(result).toEqual({
            title: 'APPROVED',
            colorVar: 'var(--accent-color)'
        });
    });

    it('returns WARNING presentation when choiceVerdict is WARNING', () => {
        const input = {
            isTerminated: false,
            csDelta: 10,
            choiceVerdict: 'WARNING' as const
        };
        const result = getOverlayPresentation(input);
        expect(result).toEqual({
            title: 'WARNING',
            colorVar: 'var(--primary-color)'
        });
    });

    it('returns RECORDED presentation when choiceVerdict is NEUTRAL', () => {
        const input = {
            isTerminated: false,
            csDelta: 0,
            choiceVerdict: 'NEUTRAL' as const
        };
        const result = getOverlayPresentation(input);
        expect(result).toEqual({
            title: 'RECORDED',
            colorVar: 'var(--accent-color)'
        });
    });

    describe('fallback logic (when choiceVerdict is undefined)', () => {
        it('returns APPROVED when csDelta is positive', () => {
            const input = {
                isTerminated: false,
                csDelta: 10,
                choiceVerdict: undefined
            };
            const result = getOverlayPresentation(input);
            expect(result).toEqual({
                title: 'APPROVED',
                colorVar: 'var(--accent-color)'
            });
        });

        it('returns APPROVED when csDelta is zero', () => {
            const input = {
                isTerminated: false,
                csDelta: 0,
                choiceVerdict: undefined
            };
            const result = getOverlayPresentation(input);
            expect(result).toEqual({
                title: 'APPROVED',
                colorVar: 'var(--accent-color)'
            });
        });

        it('returns WARNING when csDelta is negative', () => {
            const input = {
                isTerminated: false,
                csDelta: -5,
                choiceVerdict: undefined
            };
            const result = getOverlayPresentation(input);
            expect(result).toEqual({
                title: 'WARNING',
                colorVar: 'var(--primary-color)'
            });
        });
    });
});
