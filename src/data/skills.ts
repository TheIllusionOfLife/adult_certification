// DEPRECATED: This file is no longer used in Stage redesign
// Skills are now defined in stageMetadata.ts
// Kept for reference only

import type { Skill } from '../types';

export const skills: Skill[] = [
    {
        id: "iron_stomach",
        name: "鋼の胃袋",
        desc: "正気の減少を常に30%軽減する。",
        effect: { type: "passive_sanity", value: 0.3 }
    },
    {
        id: "tax_hacker",
        name: "脱税の心得",
        desc: "金銭消費時に15%の確率で資産が減らない。",
        effect: { type: "passive_money", value: 0.15 }
    },
    {
        id: "logic_bomb",
        name: "論理爆弾",
        desc: "信用度が下がる選択をした際、半分の確率で低下を無効化する。",
        effect: { type: "passive_cs", value: 0.5 }
    }
];
