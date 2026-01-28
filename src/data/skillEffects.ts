import type { Skill, SkillEffect, Question } from '../types';

interface Effect {
    CS: number;
    Asset: number;
    Autonomy: number;
}

// ============================================================
// Effect Handler Registry
// ============================================================

interface EffectHandler {
    /** Check if this effect should activate given context */
    shouldApply: (effect: SkillEffect, current: Effect, question: Question) => boolean;
    /** Apply the effect and return modified values */
    apply: (effect: SkillEffect, current: Effect) => Effect;
    /** Get activation description for UI display */
    description: string;
    /** Get the relevant values for activation display */
    getValues: (effect: SkillEffect, original: Effect, modified: Effect) => {
        originalValue: number;
        modifiedValue: number;
    };
}

// Helper: reduce damage by percentage (rounds toward zero)
const reduceDamage = (value: number, reduction: number): number => {
    return Math.ceil(value * (1 - reduction));
};

// Helper: amplify gain by percentage (rounds down)
const amplifyGain = (value: number, amplification: number): number => {
    return Math.floor(value * (1 + amplification));
};

const EFFECT_HANDLERS: Record<string, EffectHandler> = {
    // === Damage Reduction Effects ===
    autonomy_damage_reduction: {
        shouldApply: (_, current) => current.Autonomy < 0,
        apply: (effect, current) => ({
            ...current,
            Autonomy: reduceDamage(current.Autonomy, effect.value),
        }),
        description: '自律性減少軽減',
        getValues: (_, original, modified) => ({
            originalValue: original.Autonomy,
            modifiedValue: modified.Autonomy,
        }),
    },

    cs_damage_reduction: {
        shouldApply: (_, current) => current.CS < 0,
        apply: (effect, current) => ({
            ...current,
            CS: reduceDamage(current.CS, effect.value),
        }),
        description: '社会的信用低下軽減',
        getValues: (_, original, modified) => ({
            originalValue: original.CS,
            modifiedValue: modified.CS,
        }),
    },

    asset_damage_reduction: {
        shouldApply: (_, current) => current.Asset < 0,
        apply: (effect, current) => ({
            ...current,
            Asset: reduceDamage(current.Asset, effect.value),
        }),
        description: '資産減少軽減',
        getValues: (_, original, modified) => ({
            originalValue: original.Asset,
            modifiedValue: modified.Asset,
        }),
    },

    autonomy_small_damage_reduction: {
        shouldApply: (effect, current) =>
            current.Autonomy < 0 && current.Autonomy >= (effect.threshold ?? -20),
        apply: (effect, current) => ({
            ...current,
            Autonomy: reduceDamage(current.Autonomy, effect.value),
        }),
        description: '自律性減少軽減',
        getValues: (_, original, modified) => ({
            originalValue: original.Autonomy,
            modifiedValue: modified.Autonomy,
        }),
    },

    // === Category-Specific Damage Reduction ===
    category_cs_damage_reduction: {
        shouldApply: (effect, current, question) =>
            question.category === effect.category && current.CS < 0,
        apply: (effect, current) => ({
            ...current,
            CS: reduceDamage(current.CS, effect.value),
        }),
        description: '社会的信用低下軽減',
        getValues: (_, original, modified) => ({
            originalValue: original.CS,
            modifiedValue: modified.CS,
        }),
    },

    category_autonomy_damage_reduction: {
        shouldApply: (effect, current, question) =>
            question.category === effect.category && current.Autonomy < 0,
        apply: (effect, current) => ({
            ...current,
            Autonomy: reduceDamage(current.Autonomy, effect.value),
        }),
        description: '自律性減少軽減',
        getValues: (_, original, modified) => ({
            originalValue: original.Autonomy,
            modifiedValue: modified.Autonomy,
        }),
    },

    category_asset_damage_reduction: {
        shouldApply: (effect, current, question) =>
            question.category === effect.category && current.Asset < 0,
        apply: (effect, current) => ({
            ...current,
            Asset: reduceDamage(current.Asset, effect.value),
        }),
        description: '資産減少軽減',
        getValues: (_, original, modified) => ({
            originalValue: original.Asset,
            modifiedValue: modified.Asset,
        }),
    },

    admin_cost_reduction: {
        shouldApply: (_, current, question) => question.category === 'ADMIN' && current.Asset < 0,
        apply: (effect, current) => ({
            ...current,
            Asset: Math.min(0, current.Asset + effect.value),
        }),
        description: '資産減少軽減',
        getValues: (_, original, modified) => ({
            originalValue: original.Asset,
            modifiedValue: modified.Asset,
        }),
    },

    // === Gain Amplification Effects ===
    cs_gain_amplification: {
        shouldApply: (_, current) => current.CS > 0,
        apply: (effect, current) => ({
            ...current,
            CS: amplifyGain(current.CS, effect.value),
        }),
        description: '社会的信用獲得増幅',
        getValues: (_, original, modified) => ({
            originalValue: original.CS,
            modifiedValue: modified.CS,
        }),
    },

    asset_gain_amplification: {
        shouldApply: (_, current) => current.Asset > 0,
        apply: (effect, current) => ({
            ...current,
            Asset: amplifyGain(current.Asset, effect.value),
        }),
        description: '資産獲得増幅',
        getValues: (_, original, modified) => ({
            originalValue: original.Asset,
            modifiedValue: modified.Asset,
        }),
    },

    autonomy_gain_amplification: {
        shouldApply: (_, current) => current.Autonomy > 0,
        apply: (effect, current) => ({
            ...current,
            Autonomy: amplifyGain(current.Autonomy, effect.value),
        }),
        description: '自律性獲得増幅',
        getValues: (_, original, modified) => ({
            originalValue: original.Autonomy,
            modifiedValue: modified.Autonomy,
        }),
    },

    // === Category-Specific Gain Boosts ===
    category_cs_gain_boost: {
        shouldApply: (effect, current, question) =>
            question.category === effect.category && current.CS > 0,
        apply: (effect, current) => ({
            ...current,
            CS: amplifyGain(current.CS, effect.value),
        }),
        description: '社会的信用獲得増幅',
        getValues: (_effect, original, modified) => ({
            originalValue: original.CS,
            modifiedValue: modified.CS,
        }),
    },

    category_asset_gain_boost: {
        shouldApply: (effect, current, question) =>
            question.category === effect.category && current.Asset > 0,
        apply: (effect, current) => ({
            ...current,
            Asset: amplifyGain(current.Asset, effect.value),
        }),
        description: '資産獲得増幅',
        getValues: (_effect, original, modified) => ({
            originalValue: original.Asset,
            modifiedValue: modified.Asset,
        }),
    },

    category_autonomy_gain_boost: {
        shouldApply: (effect, current, question) =>
            question.category === effect.category && current.Autonomy > 0,
        apply: (effect, current) => ({
            ...current,
            Autonomy: amplifyGain(current.Autonomy, effect.value),
        }),
        description: '自律性獲得増幅',
        getValues: (_effect, original, modified) => ({
            originalValue: original.Autonomy,
            modifiedValue: modified.Autonomy,
        }),
    },

    // === Flat Bonus Effects ===
    flat_cs_bonus: {
        shouldApply: () => true, // Always applies
        apply: (effect, current) => ({
            ...current,
            CS: current.CS + effect.value,
        }),
        description: '社会的信用固定ボーナス',
        getValues: (_, original, modified) => ({
            originalValue: original.CS,
            modifiedValue: modified.CS,
        }),
    },

    flat_asset_bonus: {
        shouldApply: () => true,
        apply: (effect, current) => ({
            ...current,
            Asset: current.Asset + effect.value,
        }),
        description: '資産固定ボーナス',
        getValues: (_, original, modified) => ({
            originalValue: original.Asset,
            modifiedValue: modified.Asset,
        }),
    },

    flat_autonomy_bonus: {
        shouldApply: () => true,
        apply: (effect, current) => ({
            ...current,
            Autonomy: current.Autonomy + effect.value,
        }),
        description: '自律性固定ボーナス',
        getValues: (_, original, modified) => ({
            originalValue: original.Autonomy,
            modifiedValue: modified.Autonomy,
        }),
    },

    // === All Damage Reduction (Stage 10 Key Skill: AWAKENING) ===
    all_damage_reduction: {
        shouldApply: (_, current) =>
            current.CS < 0 || current.Asset < 0 || current.Autonomy < 0,
        apply: (effect, current) => ({
            CS: current.CS < 0 ? reduceDamage(current.CS, effect.value) : current.CS,
            Asset: current.Asset < 0 ? reduceDamage(current.Asset, effect.value) : current.Asset,
            Autonomy: current.Autonomy < 0 ? reduceDamage(current.Autonomy, effect.value) : current.Autonomy,
        }),
        description: '全ダメージ軽減',
        getValues: (_, original, modified) => {
            // Return the stat with the most significant change for display
            const changes = [
                { orig: original.CS, mod: modified.CS },
                { orig: original.Asset, mod: modified.Asset },
                { orig: original.Autonomy, mod: modified.Autonomy },
            ];
            const biggest = changes.reduce((a, b) =>
                Math.abs(a.mod - a.orig) > Math.abs(b.mod - b.orig) ? a : b
            );
            return { originalValue: biggest.orig, modifiedValue: biggest.mod };
        },
    },
};

// ============================================================
// Public API
// ============================================================

/**
 * Apply a single skill effect using the handler registry.
 */
function applySingleEffect(effect: SkillEffect, current: Effect, question: Question): Effect {
    const handler = EFFECT_HANDLERS[effect.type];
    if (!handler) {
        // Unknown effect type - return unchanged
        return current;
    }

    if (handler.shouldApply(effect, current, question)) {
        return handler.apply(effect, current);
    }

    return current;
}

/**
 * Apply all skill effects to a base effect.
 * Supports multi-effect skills (main effect + additional effects array).
 */
export function applySkillEffects(
    baseEffect: Effect,
    question: Question,
    activeSkills: Skill[]
): Effect {
    let current = { ...baseEffect };

    activeSkills.forEach((skill) => {
        // Apply main effect
        if (skill.effect) {
            current = applySingleEffect(skill.effect, current, question);
        }

        // Apply additional effects (for multi-effect skills)
        if (skill.effects) {
            skill.effects.forEach((eff) => {
                current = applySingleEffect(eff, current, question);
            });
        }
    });

    return current;
}

// ============================================================
// Skill Activation Tracking (for UI display)
// ============================================================

export interface SkillActivation {
    skillName: string;
    description: string;
    originalValue: number;
    modifiedValue: number;
}

/**
 * Get a list of skill activations for UI display.
 * Returns one activation per effect that actually modified a stat.
 * Each activation shows the correct description and stat values for that effect.
 */
export function getSkillActivations(
    originalEffect: Effect,
    _modifiedEffect: Effect,
    question: Question,
    activeSkills: Skill[]
): SkillActivation[] {
    const activations: SkillActivation[] = [];

    // Track cumulative state to compute per-effect deltas
    let currentState = { ...originalEffect };

    activeSkills.forEach((skill) => {
        // Collect all effects for this skill (supports both single and multi-effect skills)
        const skillEffects: SkillEffect[] = [];
        if (skill.effect) {
            skillEffects.push(skill.effect);
        }
        if (skill.effects) {
            skillEffects.push(...skill.effects);
        }

        // Skip skills with no effects
        if (skillEffects.length === 0) return;

        // Apply each effect individually and report activations
        skillEffects.forEach((eff) => {
            const stateBeforeEffect = { ...currentState };
            currentState = applySingleEffect(eff, currentState, question);
            const stateAfterEffect = currentState;

            // Check which stat this effect changed
            const csChanged = stateBeforeEffect.CS !== stateAfterEffect.CS;
            const assetChanged = stateBeforeEffect.Asset !== stateAfterEffect.Asset;
            const autonomyChanged = stateBeforeEffect.Autonomy !== stateAfterEffect.Autonomy;

            // Only report if this specific effect caused a change
            if (csChanged || assetChanged || autonomyChanged) {
                const handler = EFFECT_HANDLERS[eff.type];
                const description = handler?.description ?? 'スキル効果';

                // Report the stat that actually changed
                let originalValue: number;
                let modifiedValue: number;

                if (csChanged) {
                    originalValue = stateBeforeEffect.CS;
                    modifiedValue = stateAfterEffect.CS;
                } else if (assetChanged) {
                    originalValue = stateBeforeEffect.Asset;
                    modifiedValue = stateAfterEffect.Asset;
                } else {
                    originalValue = stateBeforeEffect.Autonomy;
                    modifiedValue = stateAfterEffect.Autonomy;
                }

                activations.push({
                    skillName: skill.name,
                    description,
                    originalValue,
                    modifiedValue,
                });
            }
        });
    });

    return activations;
}
