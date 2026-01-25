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
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (Autonomy < 0) {
                    const reduced = Autonomy * (1 - skill.effect.value);
                    Autonomy = Math.ceil(reduced);
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
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (question.category === skill.effect.category && CS < 0) {
                    const reduced = CS * (1 - skill.effect.value);
                    CS = Math.ceil(reduced);
                }
                break;

            case "autonomy_small_damage_reduction":
                // Reduce Autonomy damage under threshold by value%
                // Only applies to "small" damage (e.g., >= -20)
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (Autonomy < 0 && Autonomy >= (skill.effect.threshold ?? -20)) {
                    const reduced = Autonomy * (1 - skill.effect.value);
                    Autonomy = Math.ceil(reduced);
                }
                break;

            case "asset_damage_reduction":
                // Reduce all Asset damage by value%
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (Asset < 0) {
                    const reduced = Asset * (1 - skill.effect.value);
                    Asset = Math.ceil(reduced);
                }
                break;

            case "cs_damage_reduction":
                // Reduce all CS damage by value%
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (CS < 0) {
                    const reduced = CS * (1 - skill.effect.value);
                    CS = Math.ceil(reduced);
                }
                break;
        }
    });

    return { CS, Asset, Autonomy };
}

export interface SkillActivation {
    skillName: string;
    description: string;
    originalValue: number;
    modifiedValue: number;
}

export function getSkillActivations(
    originalEffect: Effect,
    modifiedEffect: Effect,
    question: Question,
    activeSkills: Skill[]
): SkillActivation[] {
    const activations: SkillActivation[] = [];

    activeSkills.forEach(skill => {
        let activated = false;
        let description = "";
        let originalValue = 0;
        let modifiedValue = 0;

        switch (skill.effect.type) {
            case "autonomy_damage_reduction":
                // Only show if Autonomy damage was actually reduced
                if (originalEffect.Autonomy < 0 && modifiedEffect.Autonomy !== originalEffect.Autonomy) {
                    activated = true;
                    description = "自律性減少軽減";
                    originalValue = originalEffect.Autonomy;
                    modifiedValue = modifiedEffect.Autonomy;
                }
                break;

            case "admin_cost_reduction":
                // Only show if this is an ADMIN question with Asset cost
                if (question.category === "ADMIN" && originalEffect.Asset < 0 && modifiedEffect.Asset !== originalEffect.Asset) {
                    activated = true;
                    description = "資産減少軽減";
                    originalValue = originalEffect.Asset;
                    modifiedValue = modifiedEffect.Asset;
                }
                break;

            case "category_cs_damage_reduction":
                // Only show if question category matches and CS was reduced
                if (question.category === skill.effect.category && originalEffect.CS < 0 && modifiedEffect.CS !== originalEffect.CS) {
                    activated = true;
                    description = "信用度低下軽減";
                    originalValue = originalEffect.CS;
                    modifiedValue = modifiedEffect.CS;
                }
                break;

            case "autonomy_small_damage_reduction":
                // Only show if damage meets threshold and was reduced
                if (originalEffect.Autonomy < 0 && originalEffect.Autonomy >= (skill.effect.threshold ?? -20) && modifiedEffect.Autonomy !== originalEffect.Autonomy) {
                    activated = true;
                    description = "自律性減少軽減";
                    originalValue = originalEffect.Autonomy;
                    modifiedValue = modifiedEffect.Autonomy;
                }
                break;

            case "asset_damage_reduction":
                // Only show if Asset damage was actually reduced
                if (originalEffect.Asset < 0 && modifiedEffect.Asset !== originalEffect.Asset) {
                    activated = true;
                    description = "資産減少軽減";
                    originalValue = originalEffect.Asset;
                    modifiedValue = modifiedEffect.Asset;
                }
                break;

            case "cs_damage_reduction":
                // Only show if CS damage was actually reduced
                if (originalEffect.CS < 0 && modifiedEffect.CS !== originalEffect.CS) {
                    activated = true;
                    description = "信用度低下軽減";
                    originalValue = originalEffect.CS;
                    modifiedValue = modifiedEffect.CS;
                }
                break;
        }

        if (activated) {
            activations.push({
                skillName: skill.name,
                description,
                originalValue,
                modifiedValue
            });
        }
    });

    return activations;
}
