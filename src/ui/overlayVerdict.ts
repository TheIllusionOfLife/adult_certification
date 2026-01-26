export type ChoiceVerdict = 'APPROVED' | 'WARNING' | 'NEUTRAL';

export interface OverlayPresentation {
    title: 'APPROVED' | 'WARNING' | 'RECORDED' | 'TERMINATED';
    colorVar: string;
}

export interface OverlayPresentationInput {
    isTerminated: boolean;
    csDelta: number;
    choiceVerdict?: ChoiceVerdict;
}

export function getOverlayPresentation(input: OverlayPresentationInput): OverlayPresentation {
    if (input.isTerminated) {
        return { title: 'TERMINATED', colorVar: 'var(--primary-color)' };
    }

    if (input.choiceVerdict === 'APPROVED') {
        return { title: 'APPROVED', colorVar: 'var(--accent-color)' };
    }

    if (input.choiceVerdict === 'WARNING') {
        return { title: 'WARNING', colorVar: 'var(--primary-color)' };
    }

    if (input.choiceVerdict === 'NEUTRAL') {
        return { title: 'RECORDED', colorVar: 'var(--accent-color)' };
    }

    // Backward-compatible fallback: infer from CS delta.
    const approved = input.csDelta >= 0;
    return {
        title: approved ? 'APPROVED' : 'WARNING',
        colorVar: approved ? 'var(--accent-color)' : 'var(--primary-color)',
    };
}

