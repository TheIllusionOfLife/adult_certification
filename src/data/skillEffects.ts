import type { Skill, Question } from '../types';

interface Effect {
    CS: number;
    Asset: number;
    Autonomy: number;
}

export function applySkillEffects(
    baseEffect: Effect,
    question: Question,
    activeSkills: Skill[]
): Effect {
    let { CS, Asset, Autonomy } = baseEffect;

    activeSkills.forEach(skill => {
        if (!skill.effect) return;

        switch (skill.effect.type) {
            case "autonomy_damage_reduction":
                // Reduce all Autonomy damage by value%
                if (Autonomy < 0) {
                    Autonomy = Math.ceil(Autonomy * (1 - skill.effect.value));
                }
                break;

            case "admin_cost_reduction":
                // Reduce Asset cost for ADMIN category by value yen
                if (question.category === "ADMIN" && Asset < 0) {
                    Asset = Math.min(0, Asset + skill.effect.value);
                }
                break;

            case "category_cs_damage_reduction":
                // Reduce CS damage for specific category by value%
                if (question.category === skill.effect.category && CS < 0) {
                    CS = Math.ceil(CS * (1 - skill.effect.value));
                }
                break;

            case "autonomy_small_damage_reduction":
                // Reduce Autonomy damage under threshold by value%
                if (Autonomy < 0 && Autonomy >= (skill.effect.threshold || -20)) {
                    Autonomy = Math.ceil(Autonomy * (1 - skill.effect.value));
                }
                break;
        }
    });

    return { CS, Asset, Autonomy };
}

export function getSkillActivationMessage(
    originalEffect: Effect,
    modifiedEffect: Effect,
    activeSkills: Skill[]
): string {
    const messages: string[] = [];

    activeSkills.forEach(skill => {
        let activated = false;
        let message = "";

        switch (skill.effect.type) {
            case "autonomy_damage_reduction":
                if (originalEffect.Autonomy < 0 && modifiedEffect.Autonomy !== originalEffect.Autonomy) {
                    activated = true;
                    message = `【${skill.name}】発動: 自律性ダメージ軽減 (${originalEffect.Autonomy} → ${modifiedEffect.Autonomy})`;
                }
                break;

            case "admin_cost_reduction":
                if (originalEffect.Asset < 0 && modifiedEffect.Asset !== originalEffect.Asset) {
                    activated = true;
                    message = `【${skill.name}】発動: 資産減少軽減 (${originalEffect.Asset} → ${modifiedEffect.Asset})`;
                }
                break;

            case "category_cs_damage_reduction":
                if (originalEffect.CS < 0 && modifiedEffect.CS !== originalEffect.CS) {
                    activated = true;
                    message = `【${skill.name}】発動: 信用度低下軽減 (${originalEffect.CS} → ${modifiedEffect.CS})`;
                }
                break;

            case "autonomy_small_damage_reduction":
                if (originalEffect.Autonomy < 0 && modifiedEffect.Autonomy !== originalEffect.Autonomy) {
                    activated = true;
                    message = `【${skill.name}】発動: 小ダメージ軽減 (${originalEffect.Autonomy} → ${modifiedEffect.Autonomy})`;
                }
                break;
        }

        if (activated && message) {
            messages.push(`<span style="color:#4cc9f0">${message}</span>`);
        }
    });

    return messages.length > 0 ? "<br>" + messages.join("<br>") : "";
}
