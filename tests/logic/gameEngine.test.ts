import { describe, it, expect, beforeEach } from 'vitest';
import { GameEngine } from '../../src/logic/gameEngine';
import type { Question, Choice, Skill } from '../../src/types';

// Test fixtures
const createTestQuestion = (overrides: Partial<Question> = {}): Question => ({
    id: 'test_q01',
    category: 'FINANCE',
    text: 'Test question',
    imagePrompt: 'Test image prompt',
    choices: [
        {
            text: 'Choice A',
            effect: { CS: 10, Asset: 0, Autonomy: 5 },
            feedback: 'Good choice',
            verdict: 'APPROVED',
        },
        {
            text: 'Choice B',
            effect: { CS: -10, Asset: -5000, Autonomy: -5 },
            feedback: 'Bad choice',
            verdict: 'WARNING',
        },
    ],
    ...overrides,
});

const createLockedQuestion = (): Question => ({
    id: 'locked_q01',
    category: 'FINANCE',
    text: 'Locked choice question',
    imagePrompt: 'Test image',
    choices: [
        {
            text: 'Requires high CS',
            effect: { CS: 20, Asset: 10000, Autonomy: 10 },
            feedback: 'Premium choice',
            verdict: 'APPROVED',
            lockRequirements: { CS: 80 },
        },
        {
            text: 'Requires high Asset',
            effect: { CS: 5, Asset: -5000, Autonomy: 5 },
            feedback: 'Standard choice',
            verdict: 'NEUTRAL',
            lockRequirements: { Asset: 500000 },
        },
        {
            text: 'No requirements',
            effect: { CS: 0, Asset: 0, Autonomy: 0 },
            feedback: 'Basic choice',
            verdict: 'NEUTRAL',
        },
    ],
});

const createTestQuestions = (count: number = 10): Question[] => {
    return Array.from({ length: count }, (_, i) =>
        createTestQuestion({
            id: `test_q${String(i + 1).padStart(2, '0')}`,
            text: `Test question ${i + 1}`,
        })
    );
};

describe('GameEngine', () => {
    describe('constructor', () => {
        it('initializes with default stage 1 parameters', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);

            expect(engine.state.CS).toBe(50);
            expect(engine.state.Asset).toBe(200000);
            expect(engine.state.Autonomy).toBe(50);
            expect(engine.state.currentQuestionIndex).toBe(0);
            expect(engine.state.currentStage).toBe(1);
            expect(engine.state.isGameOver).toBe(false);
            expect(engine.state.skills).toEqual([]);
            expect(engine.state.keySkills).toEqual([]);
        });

        it('loads correct initial params for different stages', () => {
            const questions = createTestQuestions();
            const engine2 = new GameEngine(questions, 2);

            // Stage 2 has different initial Asset
            expect(engine2.state.Asset).toBe(100000);
        });
    });

    describe('getCurrentQuestion', () => {
        it('returns the current question', () => {
            const questions = createTestQuestions(3);
            const engine = new GameEngine(questions, 1);

            expect(engine.getCurrentQuestion()).toBe(questions[0]);
        });

        it('returns null when past last question', () => {
            const questions = createTestQuestions(2);
            const engine = new GameEngine(questions, 1);

            engine.state.currentQuestionIndex = 2;
            expect(engine.getCurrentQuestion()).toBeNull();
        });
    });

    describe('isChoiceLocked', () => {
        let engine: GameEngine;

        beforeEach(() => {
            const questions = [createLockedQuestion()];
            engine = new GameEngine(questions, 1);
        });

        it('returns false for choices without lock requirements', () => {
            const choice: Choice = {
                text: 'No lock',
                effect: { CS: 0, Asset: 0, Autonomy: 0 },
                feedback: 'test',
            };
            expect(engine.isChoiceLocked(choice)).toBe(false);
        });

        it('returns false for choices with null lock requirements', () => {
            const choice: Choice = {
                text: 'Null lock',
                effect: { CS: 0, Asset: 0, Autonomy: 0 },
                feedback: 'test',
                lockRequirements: null,
            };
            expect(engine.isChoiceLocked(choice)).toBe(false);
        });

        it('returns true when CS is below requirement', () => {
            engine.state.CS = 50;
            const choice: Choice = {
                text: 'High CS required',
                effect: { CS: 0, Asset: 0, Autonomy: 0 },
                feedback: 'test',
                lockRequirements: { CS: 80 },
            };
            expect(engine.isChoiceLocked(choice)).toBe(true);
        });

        it('returns false when CS meets requirement', () => {
            engine.state.CS = 80;
            const choice: Choice = {
                text: 'High CS required',
                effect: { CS: 0, Asset: 0, Autonomy: 0 },
                feedback: 'test',
                lockRequirements: { CS: 80 },
            };
            expect(engine.isChoiceLocked(choice)).toBe(false);
        });

        it('returns true when Asset is below requirement', () => {
            engine.state.Asset = 100000;
            const choice: Choice = {
                text: 'High Asset required',
                effect: { CS: 0, Asset: 0, Autonomy: 0 },
                feedback: 'test',
                lockRequirements: { Asset: 500000 },
            };
            expect(engine.isChoiceLocked(choice)).toBe(true);
        });

        it('returns true when Autonomy is below requirement', () => {
            engine.state.Autonomy = 30;
            const choice: Choice = {
                text: 'High Autonomy required',
                effect: { CS: 0, Asset: 0, Autonomy: 0 },
                feedback: 'test',
                lockRequirements: { Autonomy: 50 },
            };
            expect(engine.isChoiceLocked(choice)).toBe(true);
        });

        it('checks multiple requirements', () => {
            engine.state.CS = 80;
            engine.state.Asset = 100000;
            const choice: Choice = {
                text: 'Multiple requirements',
                effect: { CS: 0, Asset: 0, Autonomy: 0 },
                feedback: 'test',
                lockRequirements: { CS: 80, Asset: 500000 },
            };
            // Asset fails even though CS passes
            expect(engine.isChoiceLocked(choice)).toBe(true);
        });
    });

    describe('processChoice', () => {
        it('applies positive effects correctly', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            const initialCS = engine.state.CS;
            const initialAutonomy = engine.state.Autonomy;

            const question = questions[0];
            const choice = question.choices[0]; // +10 CS, +5 Autonomy

            const result = engine.processChoice(choice, question, 0);

            expect(engine.state.CS).toBe(initialCS + 10);
            expect(engine.state.Autonomy).toBe(initialAutonomy + 5);
            expect(result.outcome.CS).toBe(10);
            expect(result.outcome.Autonomy).toBe(5);
            expect(result.isTerminated).toBe(false);
        });

        it('applies negative effects correctly', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            const initialCS = engine.state.CS;
            const initialAsset = engine.state.Asset;

            const question = questions[0];
            const choice = question.choices[1]; // -10 CS, -5000 Asset, -5 Autonomy

            engine.processChoice(choice, question, 1);

            expect(engine.state.CS).toBe(initialCS - 10);
            expect(engine.state.Asset).toBe(initialAsset - 5000);
        });

        it('tracks choice history', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);

            const question = questions[0];
            engine.processChoice(question.choices[1], question, 1);

            expect(engine.state.choiceHistory[question.id]).toBe(1);
        });

        it('triggers game over when CS reaches 0', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            engine.state.CS = 5;

            const question = questions[0];
            const choice: Choice = {
                text: 'Fatal',
                effect: { CS: -10, Asset: 0, Autonomy: 0 },
                feedback: 'Game over',
            };

            const result = engine.processChoice(choice, question, 0);

            expect(result.isTerminated).toBe(true);
            expect(engine.state.isGameOver).toBe(true);
        });

        it('triggers game over when Asset reaches 0', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            engine.state.Asset = 1000;

            const question = questions[0];
            const choice: Choice = {
                text: 'Bankrupt',
                effect: { CS: 0, Asset: -5000, Autonomy: 0 },
                feedback: 'Bankrupt',
            };

            const result = engine.processChoice(choice, question, 0);

            expect(result.isTerminated).toBe(true);
            expect(engine.state.isGameOver).toBe(true);
        });

        it('triggers game over when Autonomy reaches 0', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            engine.state.Autonomy = 3;

            const question = questions[0];
            const choice: Choice = {
                text: 'Lost autonomy',
                effect: { CS: 0, Asset: 0, Autonomy: -5 },
                feedback: 'No autonomy',
            };

            const result = engine.processChoice(choice, question, 0);

            expect(result.isTerminated).toBe(true);
            expect(engine.state.isGameOver).toBe(true);
        });

        it('throws error when processing locked choice', () => {
            const questions = [createLockedQuestion()];
            const engine = new GameEngine(questions, 1);
            engine.state.CS = 50;

            const question = questions[0];
            const lockedChoice = question.choices[0]; // Requires CS: 80

            expect(() => engine.processChoice(lockedChoice, question, 0)).toThrow(
                'Attempted to process locked choice'
            );
        });
    });

    describe('calculateEnding', () => {
        it('returns S rank for CS >= 80', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            engine.state.CS = 85;

            const ending = engine.calculateEnding();

            expect(ending.rank).toBe('S');
            expect(ending.title).toContain('完全適合者');
        });

        it('returns A rank for CS >= 50 and < 80', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            engine.state.CS = 60;

            const ending = engine.calculateEnding();

            expect(ending.rank).toBe('A');
            expect(ending.title).toContain('上級適合者');
        });

        it('returns B rank for CS >= 20 and < 50', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            engine.state.CS = 35;

            const ending = engine.calculateEnding();

            expect(ending.rank).toBe('B');
            expect(ending.title).toContain('一般適合者');
        });

        it('returns C rank for CS >= 1 and < 20', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            engine.state.CS = 10;

            const ending = engine.calculateEnding();

            expect(ending.rank).toBe('C');
            expect(ending.title).toContain('最低限合格');
        });

        it('uses stage-specific thresholds', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            // Stage 1 thresholds: S: 80, A: 50, B: 20
            engine.state.CS = 80;

            const ending = engine.calculateEnding();
            expect(ending.rank).toBe('S');
        });
    });

    describe('nextQuestion', () => {
        it('increments question index', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);

            expect(engine.state.currentQuestionIndex).toBe(0);
            engine.nextQuestion();
            expect(engine.state.currentQuestionIndex).toBe(1);
            engine.nextQuestion();
            expect(engine.state.currentQuestionIndex).toBe(2);
        });
    });

    describe('addSkill', () => {
        it('adds skill to skills array', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            const skill: Skill = {
                id: 'test_skill',
                name: 'Test Skill',
                desc: 'Test description',
                effect: { type: 'cs_damage_reduction', value: 0.3 },
                category: 'normal',
            };

            engine.addSkill(skill);

            expect(engine.state.skills).toContain('test_skill');
            expect(engine.activeSkills).toContainEqual(skill);
        });

        it('does not add duplicate skills', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            const skill: Skill = {
                id: 'test_skill',
                name: 'Test Skill',
                desc: 'Test description',
                effect: { type: 'cs_damage_reduction', value: 0.3 },
                category: 'normal',
            };

            engine.addSkill(skill);
            engine.addSkill(skill);

            expect(engine.state.skills.filter((s) => s === 'test_skill')).toHaveLength(1);
        });

        it('tracks key skills separately', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            const keySkill: Skill = {
                id: 'key_skill',
                name: 'Key Skill',
                desc: 'Key description',
                effect: { type: 'autonomy_damage_reduction', value: 0.5 },
                category: 'key',
                isCollectible: true,
            };

            engine.addSkill(keySkill);

            expect(engine.state.skills).toContain('key_skill');
            expect(engine.state.keySkills).toContain('key_skill');
        });

        it('does not add normal skills to keySkills', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            const normalSkill: Skill = {
                id: 'normal_skill',
                name: 'Normal Skill',
                desc: 'Normal description',
                effect: { type: 'cs_damage_reduction', value: 0.3 },
                category: 'normal',
            };

            engine.addSkill(normalSkill);

            expect(engine.state.skills).toContain('normal_skill');
            expect(engine.state.keySkills).not.toContain('normal_skill');
        });
    });

    describe('isKeySkillEarned', () => {
        it('returns true for skills without keySkillRequirement', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            const skill: Skill = {
                id: 'no_req',
                name: 'No Requirement',
                desc: 'Test',
                effect: { type: 'cs_damage_reduction', value: 0.3 },
            };

            expect(engine.isKeySkillEarned(skill)).toBe(true);
        });

        it('returns true when required choice was selected', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            engine.state.choiceHistory['test_q01'] = 1;

            const skill: Skill = {
                id: 'key_skill',
                name: 'Key Skill',
                desc: 'Test',
                effect: { type: 'autonomy_damage_reduction', value: 0.5 },
                keySkillRequirement: {
                    questionId: 'test_q01',
                    choiceIndex: 1,
                },
            };

            expect(engine.isKeySkillEarned(skill)).toBe(true);
        });

        it('returns false when required choice was not selected', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            engine.state.choiceHistory['test_q01'] = 0;

            const skill: Skill = {
                id: 'key_skill',
                name: 'Key Skill',
                desc: 'Test',
                effect: { type: 'autonomy_damage_reduction', value: 0.5 },
                keySkillRequirement: {
                    questionId: 'test_q01',
                    choiceIndex: 1,
                },
            };

            expect(engine.isKeySkillEarned(skill)).toBe(false);
        });

        it('returns false when question was not answered yet', () => {
            const questions = createTestQuestions();
            const engine = new GameEngine(questions, 1);
            // No choice history for test_q01

            const skill: Skill = {
                id: 'key_skill',
                name: 'Key Skill',
                desc: 'Test',
                effect: { type: 'autonomy_damage_reduction', value: 0.5 },
                keySkillRequirement: {
                    questionId: 'test_q01',
                    choiceIndex: 1,
                },
            };

            expect(engine.isKeySkillEarned(skill)).toBe(false);
        });
    });
});
