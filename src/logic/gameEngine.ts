import type { GameState, Question, Choice, Skill } from '../types';
import { getStageMetadata } from '../data/stageMetadata';
import { applySkillEffects, getSkillActivationMessage } from '../data/skillEffects';
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
            questions: questions
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

    processChoice(choice: Choice, question: Question): {
        outcome: { CS: number, Asset: number, Autonomy: number },
        feedback: string,
        isTerminated: boolean
    } {
        const originalEffect = { ...choice.effect };

        // Apply skill effects (deterministic, auto-calculated)
        const modifiedEffect = applySkillEffects(originalEffect, question, this.activeSkills);

        let { CS, Asset, Autonomy } = modifiedEffect;

        // Update State
        this.state.CS += CS;
        this.state.Asset += Asset;
        this.state.Autonomy += Autonomy;

        // Check Game Over Condition - ANY parameter <= 0
        const isTerminated = this.state.CS <= 0 || this.state.Asset <= 0 || this.state.Autonomy <= 0;
        if (isTerminated) {
            this.state.isGameOver = true;
        }

        // Generate skill activation messages
        const skillMessages = getSkillActivationMessage(originalEffect, modifiedEffect, this.activeSkills);

        // Generate A.D.A.M. commentary
        const adamComment = getADAMCommentForEffect(modifiedEffect);

        return {
            outcome: modifiedEffect,
            feedback: `${choice.feedback}${skillMessages}<br><br><span style="color:#aaa; font-size:0.9em;">[A.D.A.M.]: ${adamComment}</span>`,
            isTerminated
        };
    }

    calculateEnding() {
        const s = this.state;
        const stageMetadata = getStageMetadata(s.currentStage);

        // Get thresholds - use stage metadata if available, otherwise use defaults
        const thresholds = stageMetadata?.rankThresholds || {
            S: { CS: CONFIG.RANK_THRESHOLDS.S },
            A: { CS: CONFIG.RANK_THRESHOLDS.A },
            B: { CS: CONFIG.RANK_THRESHOLDS.B },
            C: { CS: CONFIG.RANK_THRESHOLDS.C }
        };

        let rank = "D";
        let title = "不合格 (Failed)";
        let desc = "あなたは基準を満たしませんでした。";

        if (s.CS >= thresholds.S.CS) {
            rank = "S";
            title = "完全なる歯車 (Perfect Cog)";
            desc = "完璧です。あなたは個を捨て、社会の立派な部品となりました。";
        } else if (s.CS >= thresholds.A.CS) {
            rank = "A";
            title = "上級適合者 (Prime Compliant)";
            desc = "優秀な成績です。多少の自我は残っていますが、許容範囲です。";
        } else if (s.CS >= thresholds.B.CS) {
            if (s.Autonomy <= 20) {
                rank = "B-";
                title = "消耗品 (Disposable)";
                desc = "信用はありますが、精神が消耗しています。補充可能な労働力です。";
            } else {
                rank = "B";
                title = "一般適合者 (Standard Compliant)";
                desc = "可もなく不可もなく。代替可能な人材です。";
            }
        } else if (s.CS >= thresholds.C.CS) {
            if (s.Autonomy >= 60) {
                rank = "C+";
                title = "要監視対象 (Watch List)";
                desc = "信用は低いですが、妙に精神が安定していますね……危険分子として監視します。";
            } else {
                rank = "C";
                title = "最低限合格 (Minimal Pass)";
                desc = "最低限の基準はクリアしました。再教育を推奨します。";
            }
        }

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
}
