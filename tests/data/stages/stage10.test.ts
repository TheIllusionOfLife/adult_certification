import { describe, it, expect } from 'vitest';
import { stage10Questions } from '../../../src/data/stages/stage10';

describe('Stage 10 Questions', () => {
    it('should have exactly 10 questions', () => {
        expect(stage10Questions).toHaveLength(10);
    });

    it('should have correct question IDs (s10_q01 to s10_q10)', () => {
        const actualIds = stage10Questions.map(q => q.id);

        for (let i = 0; i < 10; i++) {
            const expected = i < 9 ? `s10_q0${i + 1}` : 's10_q10';
            expect(actualIds[i]).toBe(expected);
        }
    });

    it('should have Q7 choice A with Autonomy lock requirement of 150', () => {
        const q7 = stage10Questions.find(q => q.id === 's10_q07');
        expect(q7).toBeDefined();

        // Choice A (index 0) is now locked (A↔B swapped)
        const choiceA = q7!.choices[0];
        expect(choiceA.lockRequirements).toBeDefined();
        expect(choiceA.lockRequirements?.Autonomy).toBe(150);
    });

    it('should have Q9 choice B with Autonomy lock requirement of 150', () => {
        const q9 = stage10Questions.find(q => q.id === 's10_q09');
        expect(q9).toBeDefined();

        const choiceB = q9!.choices[1];
        expect(choiceB.lockRequirements).toBeDefined();
        expect(choiceB.lockRequirements?.Autonomy).toBe(180);
    });

    it('should have Q5 with WARNING and APPROVED verdicts', () => {
        const q5 = stage10Questions.find(q => q.id === 's10_q05');
        expect(q5).toBeDefined();
        expect(q5!.choices).toHaveLength(2);
        expect(q5!.choices[0].verdict).toBe('WARNING');
        expect(q5!.choices[1].verdict).toBe('APPROVED');
    });

    it('should have Q9 with both choices as NEUTRAL', () => {
        const q9 = stage10Questions.find(q => q.id === 's10_q09');
        expect(q9).toBeDefined();
        expect(q9!.choices).toHaveLength(2);
        expect(q9!.choices[0].verdict).toBe('NEUTRAL');
        expect(q9!.choices[1].verdict).toBe('NEUTRAL');
    });

    it('should have Q10 with both choices as NEUTRAL', () => {
        const q10 = stage10Questions.find(q => q.id === 's10_q10');
        expect(q10).toBeDefined();
        expect(q10!.choices).toHaveLength(2);
        expect(q10!.choices[0].verdict).toBe('NEUTRAL');
        expect(q10!.choices[1].verdict).toBe('NEUTRAL');
    });

    it('should have Q1-Q3 with INTEGRATION category', () => {
        const integrationQuestions = stage10Questions.slice(0, 3);
        integrationQuestions.forEach(q => {
            expect(q.category).toBe('INTEGRATION');
        });
    });

    it('should have Q4 with SOCIAL category', () => {
        const q4 = stage10Questions[3];
        expect(q4.category).toBe('SOCIAL');
    });

    it('should have Q5 with ADMIN category', () => {
        const q5 = stage10Questions[4];
        expect(q5.category).toBe('ADMIN');
    });

    it('should have Q6 with FINANCE category', () => {
        const q6 = stage10Questions[5];
        expect(q6.category).toBe('FINANCE');
    });

    it('should have Q7 with META category', () => {
        const q7 = stage10Questions[6];
        expect(q7.category).toBe('META');
    });

    it('should have Q8-Q9 with LEGACY category', () => {
        const legacyQuestions = stage10Questions.slice(7, 9);
        legacyQuestions.forEach(q => {
            expect(q.category).toBe('LEGACY');
        });
    });

    it('should have Q10 with PHILOSOPHY category', () => {
        const q10 = stage10Questions[9];
        expect(q10.category).toBe('PHILOSOPHY');
    });

    it('should have A.D.A.M. intro dialogue on Q1', () => {
        const q1 = stage10Questions[0];
        expect(q1.adamDialogue).toBeDefined();
        expect(q1.adamDialogue?.intro).toBeDefined();
        expect(q1.adamDialogue?.intro).toContain('最終ステージ');
    });

    it('should have A.D.A.M. after dialogue on Q10', () => {
        const q10 = stage10Questions[9];
        expect(q10.adamDialogue).toBeDefined();
        expect(q10.adamDialogue?.after).toBeDefined();
        expect(q10.adamDialogue?.after).toContain('最終認定審査');
    });

    it('should have skill offer trigger points at Q3 and Q7', () => {
        // Q3 should have 'after' dialogue for skill offer 1
        const q3 = stage10Questions[2];
        expect(q3.adamDialogue?.after).toBeDefined();
        expect(q3.adamDialogue?.after).toContain('スキル選択');

        // Q7 should have 'after' dialogue for skill offer 2
        const q7 = stage10Questions[6];
        expect(q7.adamDialogue?.after).toBeDefined();
        expect(q7.adamDialogue?.after).toContain('スキル選択');
    });

    it('should have lockedFeedback for locked choices', () => {
        const q7 = stage10Questions.find(q => q.id === 's10_q07');
        const q9 = stage10Questions.find(q => q.id === 's10_q09');

        // Q7 choice A (index 0) is now locked (A↔B swapped)
        expect(q7!.choices[0].lockedFeedback).toBeDefined();
        expect(q7!.choices[0].lockedFeedback).toContain('自律性');

        expect(q9!.choices[1].lockedFeedback).toBeDefined();
        expect(q9!.choices[1].lockedFeedback).toContain('自律性');
    });

    it('all questions should have imagePath', () => {
        stage10Questions.forEach(q => {
            expect(q.imagePath).toBeDefined();
            expect(q.imagePath).toMatch(/^s10_q\d{2}\.png$/);
        });
    });

    it('all questions should have imagePrompt', () => {
        stage10Questions.forEach(q => {
            expect(q.imagePrompt).toBeDefined();
            expect(q.imagePrompt.length).toBeGreaterThan(50);
        });
    });
});
