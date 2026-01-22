import type { GameState, Question, Choice } from '../types';
import { skills as skillDatabase } from '../data/skills';
import { CONFIG } from '../config';
import { shuffle } from '../utils/shuffle';

export class GameEngine {
    state: GameState;
    difficulty: string = "";

    constructor(questions: Question[]) {
        this.state = {
            cs: CONFIG.INITIAL_STATE.CS,
            money: CONFIG.INITIAL_STATE.MONEY,
            sanity: CONFIG.INITIAL_STATE.SANITY,
            skills: [],
            currentQuestionIndex: 0,
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

    processChoice(choice: Choice): {
        outcome: { cs: number, money: number, sanity: number },
        feedback: string,
        isTerminated: boolean
    } {
        let { cs, money, sanity } = choice.effect;

        // Apply Passive Skills
        let skillActivated = "";

        if (this.state.skills.includes('iron_stomach') && sanity < 0) {
            const original = sanity;
            sanity = Math.ceil(sanity * CONFIG.SKILLS.IRON_STOMACH_REDUCTION);
            // Ensure at least -1 damage to prevent full nullification
            if (sanity === 0 && original < 0) sanity = -1;
            skillActivated += `<br><span style="color:#4cc9f0">【鋼の胃袋】発動: 精神ダメージ軽減 (${original} -> ${sanity})</span>`;
        }
        if (this.state.skills.includes('tax_hacker') && money < 0 && Math.random() < CONFIG.SKILLS.TAX_HACKER_CHANCE) {
            money = 0;
            skillActivated += `<br><span style="color:#ffd700">【脱税の心得】発動: 支払いを回避しました！</span>`;
        }
        if (this.state.skills.includes('logic_bomb') && cs < 0 && Math.random() < CONFIG.SKILLS.LOGIC_BOMB_CHANCE) {
            cs = 0;
            skillActivated += `<br><span style="color:#f72585">【論理爆弾】発動: 信用失墜を計算あわせで無効化！</span>`;
        }

        // Update State
        this.state.cs += cs;
        this.state.money += money;
        this.state.sanity += sanity;

        // Check Death Condition
        const isTerminated = this.state.cs <= 0 || this.state.sanity <= 0;
        if (isTerminated) {
            this.state.isGameOver = true;
        }

        // Generate Sarcastic Commentary
        let sarcasm = "";
        if (cs >= 30) sarcasm = "素晴らしい服従心です！システムは満足しています。";
        else if (cs <= -20) sarcasm = "反逆的思考を検知。思想矯正を推奨します。";
        else if (sanity <= -15) sarcasm = "精神汚染を確認。ですが業務に支障はありません。";
        else if (money <= -10000) sarcasm = "資本主義への貢献、感謝します。";
        else if (money >= 10000) sarcasm = "不当利益...いえ、正当な報酬ですね。";
        else sarcasm = "処理完了。";

        return {
            outcome: { cs, money, sanity },
            feedback: `${choice.feedback}${skillActivated}<br><br><span style="color:#aaa; font-size:0.9em;">[AI]: ${sarcasm}</span>`,
            isTerminated
        };
    }

    calculateEnding() {
        const s = this.state;
        let rank = "D";
        let title = "廃棄対象 (Waste)";
        let desc = "あなたは社会の役に立ちませんでした。";

        if (s.cs >= 800) {
            rank = "S";
            title = "完全なる歯車 (Perfect Cog)";
            desc = "完璧です！あなたは個を捨て、社会の立派な部品となりました！";
        } else if (s.cs >= 600) {
            rank = "A";
            title = "上級市民 (Prime Citizen)";
            desc = "優秀な成績です。多少の自我は残っていますが、許容範囲です。";
        } else if (s.cs >= 400) {
            // Check for specific sub-endings
            if (s.sanity <= 20) {
                rank = "B-";
                title = "壊れた玩具 (Broken Toy)";
                desc = "信用はありますが、精神が崩壊しています。使い捨て労働力として最適です。";
            } else {
                rank = "B";
                title = "一般資源 (Common Resource)";
                desc = "可もなく不可もなく。代替可能な人材です。";
            }
        } else if (s.sanity >= 80) {
            rank = "C+";
            title = "隠れ革命家 (Silent Rebel)";
            desc = "信用は低いですが、妙に精神が安定していますね...危険分子として監視します。";
        } else {
            rank = "C";
            title = "社会のお荷物 (Burden)";
            desc = "生産性が低すぎます。再教育が必要です。";
        }

        return { rank, title, desc };
    }

    nextQuestion() {
        this.state.currentQuestionIndex++;
    }

    addSkill(skillId: string) {
        if (!this.state.skills.includes(skillId)) {
            this.state.skills.push(skillId);
        }
    }

    getAvailableSkills(count: number) {
        const available = skillDatabase.filter(s => !this.state.skills.includes(s.id));
        return shuffle(available).slice(0, count);
    }

    getSkillById(id: string) {
        return skillDatabase.find(s => s.id === id);
    }
}
