import type { GameState, Question, Choice, Skill } from '../types';
import { getStageMetadata } from '../data/stageMetadata';
import { applySkillEffects, getSkillActivations, type SkillActivation } from '../data/skillEffects';
import { getADAMCommentForEffect } from '../data/adamDialogue';
import { CONFIG } from '../config';

export class GameEngine {
    state: GameState;
    difficulty: string = ""; // Kept for backwards compatibility
    activeSkills: Skill[] = []; // Currently active skills for this stage

    constructor(questions: Question[], stageId: number = 1) {
        const stageMetadata = getStageMetadata(stageId);
        const initialParams = stageMetadata?.initialParams || { CS: 50, Asset: 100000, Autonomy: 50 };

        this.state = {
            CS: initialParams.CS,
            Asset: initialParams.Asset,
            Autonomy: initialParams.Autonomy,
            skills: [],
            keySkills: [],
            currentQuestionIndex: 0,
            currentStage: stageId,
            isGameOver: false,
            questions: questions,
            choiceHistory: {}
        };
    }

    getCurrentQuestion(): Question | null {
        if (this.state.currentQuestionIndex >= this.state.questions.length) {
            return null;
        }
        return this.state.questions[this.state.currentQuestionIndex];
    }

    isChoiceLocked(choice: Choice): boolean {
        if (!choice.lockRequirements) return false;

        const { CS, Asset, Autonomy } = choice.lockRequirements;

        if (CS !== undefined && this.state.CS < CS) return true;
        if (Asset !== undefined && this.state.Asset < Asset) return true;
        if (Autonomy !== undefined && this.state.Autonomy < Autonomy) return true;

        return false;
    }

    processChoice(choice: Choice, question: Question, choiceIndex: number): {
        outcome: { CS: number, Asset: number, Autonomy: number },
        feedback: string,
        isTerminated: boolean,
        skillActivations: SkillActivation[]
    } {
        // Validate choice is not locked (defensive programming)
        if (this.isChoiceLocked(choice)) {
            throw new Error(`Attempted to process locked choice: ${choice.text}`);
        }

        // Track choice history for key skill requirements
        this.state.choiceHistory[question.id] = choiceIndex;

        const originalEffect = { ...choice.effect };

        // Apply skill effects (deterministic, auto-calculated)
        const modifiedEffect = applySkillEffects(originalEffect, question, this.activeSkills);

        const { CS, Asset, Autonomy } = modifiedEffect;

        // Update State
        this.state.CS += CS;
        this.state.Asset += Asset;
        this.state.Autonomy += Autonomy;

        // Check Game Over Condition - ANY parameter <= 0
        const isTerminated = this.state.CS <= 0 || this.state.Asset <= 0 || this.state.Autonomy <= 0;
        if (isTerminated) {
            this.state.isGameOver = true;
        }

        // Get skill activations (structured data, no HTML)
        const skillActivations = getSkillActivations(originalEffect, modifiedEffect, question, this.activeSkills);

        // Generate A.D.A.M. commentary
        const adamComment = getADAMCommentForEffect(modifiedEffect);

        return {
            outcome: modifiedEffect,
            feedback: `${choice.feedback}<br><br><span style="color:#aaa; font-size:0.9em;">[A.D.A.M.]: ${adamComment}</span>`,
            isTerminated,
            skillActivations
        };
    }

    calculateEnding() {
        const s = this.state;
        const stageMetadata = getStageMetadata(s.currentStage);

        // Get thresholds - use stage metadata if available, otherwise use defaults
        // Note: C = clear (CS >= 1), no explicit threshold
        const thresholds = stageMetadata?.rankThresholds || {
            S: { CS: CONFIG.RANK_THRESHOLDS.S },
            A: { CS: CONFIG.RANK_THRESHOLDS.A },
            B: { CS: CONFIG.RANK_THRESHOLDS.B }
        };

        let rank = "C";
        let title = "最低限合格 (Minimal Pass)";
        let desc = "最低限の基準はクリアしました。再教育を推奨します。";

        if (s.CS >= thresholds.S.CS) {
            rank = "S";
            title = "完全なる歯車 (Perfect Cog)";
            desc = "完璧です。あなたは個を捨て、社会の立派な部品となりました。";
        } else if (s.CS >= thresholds.A.CS) {
            rank = "A";
            title = "上級適合者 (Prime Compliant)";
            desc = "優秀な成績です。多少の自我は残っていますが、許容範囲です。";
        } else if (s.CS >= thresholds.B.CS) {
            rank = "B";
            title = "一般適合者 (Standard Compliant)";
            desc = "可もなく不可もなく。代替可能な人材です。";
        }
        // C = clear: If CS >= 1 and you finished, you get C rank
        // Game over happens at CS <= 0, so completing means at least C

        return { rank, title, desc };
    }

    nextQuestion() {
        this.state.currentQuestionIndex++;
    }

    addSkill(skill: Skill) {
        if (!this.state.skills.includes(skill.id)) {
            this.state.skills.push(skill.id);
            this.activeSkills.push(skill);

            // Track key skills separately
            if (skill.category === 'key') {
                if (!this.state.keySkills.includes(skill.id)) {
                    this.state.keySkills.push(skill.id);
                }
            }
        }
    }

    getSkillsForOffer(offerNumber: 1 | 2): [Skill, Skill] {
        const stageMetadata = getStageMetadata(this.state.currentStage);
        if (!stageMetadata) {
            throw new Error(`No metadata found for stage ${this.state.currentStage}`);
        }

        return offerNumber === 1 ? stageMetadata.skills.offer1 : stageMetadata.skills.offer2;
    }

    getSkillById(id: string): Skill | undefined {
        const stageMetadata = getStageMetadata(this.state.currentStage);
        if (!stageMetadata) return undefined;

        const allSkills = [...stageMetadata.skills.offer1, ...stageMetadata.skills.offer2];
        return allSkills.find(s => s.id === id);
    }

    /**
     * Check if a key skill's requirement has been met.
     * Key skills require the player to have chosen a specific choice in a specific question.
     */
    isKeySkillEarned(skill: Skill): boolean {
        if (!skill.keySkillRequirement) {
            // No requirement = always available (shouldn't happen for key skills, but defensive)
            return true;
        }

        const { questionId, choiceIndex } = skill.keySkillRequirement;
        const selectedChoice = this.state.choiceHistory[questionId];

        // Check if the required choice was selected
        return selectedChoice === choiceIndex;
    }

    /**
     * Get skills for offer with availability status.
     * Key skills may be locked if the player didn't demonstrate the required behavior.
     */
    getSkillsForOfferWithStatus(offerNumber: 1 | 2): Array<{
        skill: Skill;
        isAvailable: boolean;
        lockedReason?: string;
    }> {
        const skills = this.getSkillsForOffer(offerNumber);

        return skills.map(skill => {
            if (skill.category !== 'key') {
                // Normal skills are always available
                return { skill, isAvailable: true };
            }

            // Key skills require earning through behavior
            const isEarned = this.isKeySkillEarned(skill);
            if (isEarned) {
                return { skill, isAvailable: true };
            }

            // Key skill not earned - show why
            const req = skill.keySkillRequirement;
            const question = this.state.questions.find(q => q.id === req?.questionId);
            const choiceLetter = req ? String.fromCharCode(65 + req.choiceIndex) : '?';
            const questionNum = question ? this.state.questions.indexOf(question) + 1 : '?';

            return {
                skill,
                isAvailable: false,
                lockedReason: `Q${questionNum}で選択肢${choiceLetter}を選ぶ必要があります`
            };
        });
    }
}
