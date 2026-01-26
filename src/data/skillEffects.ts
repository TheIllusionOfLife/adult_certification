import type { Skill, SkillEffect, Question } from '../types';

interface Effect {
    CS: number;
    Asset: number;
    Autonomy: number;
}

// Helper function to apply a single skill effect
function applySingleEffect(
    effect: SkillEffect,
    current: Effect,
    question: Question
): Effect {
    let { CS, Asset, Autonomy } = current;

    switch (effect.type) {
            case "autonomy_damage_reduction":
                // Reduce all Autonomy damage by value%
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (Autonomy < 0) {
                    const reduced = Autonomy * (1 - effect.value);
                    Autonomy = Math.ceil(reduced);
                }
                break;

            case "admin_cost_reduction":
                // Reduce Asset cost for ADMIN category by value yen
                if (question.category === "ADMIN" && Asset < 0) {
                    Asset = Math.min(0, Asset + effect.value);
                }
                break;

            case "category_cs_damage_reduction":
                // Reduce CS damage for specific category by value%
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (question.category === effect.category && CS < 0) {
                    const reduced = CS * (1 - effect.value);
                    CS = Math.ceil(reduced);
                }
                break;

            case "autonomy_small_damage_reduction":
                // Reduce Autonomy damage under threshold by value%
                // Only applies to "small" damage (e.g., >= -20)
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (Autonomy < 0 && Autonomy >= (effect.threshold ?? -20)) {
                    const reduced = Autonomy * (1 - effect.value);
                    Autonomy = Math.ceil(reduced);
                }
                break;

            case "category_autonomy_damage_reduction":
                // Reduce Autonomy damage for specific category by value%
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (question.category === effect.category && Autonomy < 0) {
                    const reduced = Autonomy * (1 - effect.value);
                    Autonomy = Math.ceil(reduced);
                }
                break;

            case "asset_damage_reduction":
                // Reduce all Asset damage by value%
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (Asset < 0) {
                    const reduced = Asset * (1 - effect.value);
                    Asset = Math.ceil(reduced);
                }
                break;

            case "cs_damage_reduction":
                // Reduce all CS damage by value%
                // Math.ceil rounds toward zero for negative values (reduces damage magnitude)
                if (CS < 0) {
                    const reduced = CS * (1 - effect.value);
                    CS = Math.ceil(reduced);
                }
                break;

            // === NEW: Gain Amplification Types ===
            case "cs_gain_amplification":
                // Increase CS gains by value%
                if (CS > 0) {
                    const amplified = CS * (1 + effect.value);
                    CS = Math.floor(amplified);
                }
                break;

            case "asset_gain_amplification":
                // Increase Asset gains by value%
                if (Asset > 0) {
                    const amplified = Asset * (1 + effect.value);
                    Asset = Math.floor(amplified);
                }
                break;

            case "autonomy_gain_amplification":
                // Increase Autonomy gains by value%
                if (Autonomy > 0) {
                    const amplified = Autonomy * (1 + effect.value);
                    Autonomy = Math.floor(amplified);
                }
                break;

            // === NEW: Flat Bonus Types ===
            case "flat_cs_bonus":
                // Add flat CS bonus to every question
                CS += effect.value;
                break;

            case "flat_asset_bonus":
                // Add flat Asset bonus to every question
                Asset += effect.value;
                break;

            case "flat_autonomy_bonus":
                // Add flat Autonomy bonus to every question
                Autonomy += effect.value;
                break;

            // === NEW: Category-Specific Gain Boost Types ===
            case "category_cs_gain_boost":
                // Increase CS gains for specific category by value%
                if (question.category === effect.category && CS > 0) {
                    const amplified = CS * (1 + effect.value);
                    CS = Math.floor(amplified);
                }
                break;

            case "category_asset_gain_boost":
                // Increase Asset gains for specific category by value%
                if (question.category === effect.category && Asset > 0) {
                    const amplified = Asset * (1 + effect.value);
                    Asset = Math.floor(amplified);
                }
                break;

            case "category_autonomy_gain_boost":
                // Increase Autonomy gains for specific category by value%
                if (question.category === effect.category && Autonomy > 0) {
                    const amplified = Autonomy * (1 + effect.value);
                    Autonomy = Math.floor(amplified);
                }
                break;
    }

    return { CS, Asset, Autonomy };
}

// Main function to apply all skill effects (supports multi-effect skills)
export function applySkillEffects(
    baseEffect: Effect,
    question: Question,
    activeSkills: Skill[]
): Effect {
    let current = { ...baseEffect };

    activeSkills.forEach(skill => {
        // Apply main effect
        if (skill.effect) {
            current = applySingleEffect(skill.effect, current, question);
        }

        // Apply additional effects (for multi-effect skills)
        if (skill.effects) {
            skill.effects.forEach(eff => {
                current = applySingleEffect(eff, current, question);
            });
        }
    });

    return current;
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
        const effect = skill.effect; // Alias for cleaner code
        let activated = false;
        let description = "";
        let originalValue = 0;
        let modifiedValue = 0;

        switch (effect.type) {
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
                if (question.category === effect.category && originalEffect.CS < 0 && modifiedEffect.CS !== originalEffect.CS) {
                    activated = true;
                    description = "信用度低下軽減";
                    originalValue = originalEffect.CS;
                    modifiedValue = modifiedEffect.CS;
                }
                break;

            case "autonomy_small_damage_reduction":
                // Only show if damage meets threshold and was reduced
                if (originalEffect.Autonomy < 0 && originalEffect.Autonomy >= (effect.threshold ?? -20) && modifiedEffect.Autonomy !== originalEffect.Autonomy) {
                    activated = true;
                    description = "自律性減少軽減";
                    originalValue = originalEffect.Autonomy;
                    modifiedValue = modifiedEffect.Autonomy;
                }
                break;

            case "category_autonomy_damage_reduction":
                // Only show if question category matches and Autonomy was reduced
                if (question.category === effect.category && originalEffect.Autonomy < 0 && modifiedEffect.Autonomy !== originalEffect.Autonomy) {
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

            // === NEW: Gain Amplification Types ===
            case "cs_gain_amplification":
                if (originalEffect.CS > 0 && modifiedEffect.CS !== originalEffect.CS) {
                    activated = true;
                    description = "信用度獲得増幅";
                    originalValue = originalEffect.CS;
                    modifiedValue = modifiedEffect.CS;
                }
                break;

            case "asset_gain_amplification":
                if (originalEffect.Asset > 0 && modifiedEffect.Asset !== originalEffect.Asset) {
                    activated = true;
                    description = "資産獲得増幅";
                    originalValue = originalEffect.Asset;
                    modifiedValue = modifiedEffect.Asset;
                }
                break;

            case "autonomy_gain_amplification":
                if (originalEffect.Autonomy > 0 && modifiedEffect.Autonomy !== originalEffect.Autonomy) {
                    activated = true;
                    description = "自律性獲得増幅";
                    originalValue = originalEffect.Autonomy;
                    modifiedValue = modifiedEffect.Autonomy;
                }
                break;

            // === NEW: Flat Bonus Types ===
            case "flat_cs_bonus":
                // Always activates (flat bonus every question)
                activated = true;
                description = "信用度固定ボーナス";
                originalValue = originalEffect.CS;
                modifiedValue = modifiedEffect.CS;
                break;

            case "flat_asset_bonus":
                activated = true;
                description = "資産固定ボーナス";
                originalValue = originalEffect.Asset;
                modifiedValue = modifiedEffect.Asset;
                break;

            case "flat_autonomy_bonus":
                activated = true;
                description = "自律性固定ボーナス";
                originalValue = originalEffect.Autonomy;
                modifiedValue = modifiedEffect.Autonomy;
                break;

            // === NEW: Category-Specific Gain Boost Types ===
            case "category_cs_gain_boost":
                if (question.category === effect.category && originalEffect.CS > 0 && modifiedEffect.CS !== originalEffect.CS) {
                    activated = true;
                    description = `${effect.category}信用度獲得増幅`;
                    originalValue = originalEffect.CS;
                    modifiedValue = modifiedEffect.CS;
                }
                break;

            case "category_asset_gain_boost":
                if (question.category === effect.category && originalEffect.Asset > 0 && modifiedEffect.Asset !== originalEffect.Asset) {
                    activated = true;
                    description = `${effect.category}資産獲得増幅`;
                    originalValue = originalEffect.Asset;
                    modifiedValue = modifiedEffect.Asset;
                }
                break;

            case "category_autonomy_gain_boost":
                if (question.category === effect.category && originalEffect.Autonomy > 0 && modifiedEffect.Autonomy !== originalEffect.Autonomy) {
                    activated = true;
                    description = `${effect.category}自律性獲得増幅`;
                    originalValue = originalEffect.Autonomy;
                    modifiedValue = modifiedEffect.Autonomy;
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
