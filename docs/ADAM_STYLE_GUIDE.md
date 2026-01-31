# A.D.A.M. Style Guide

**Version**: 3.0 | **Date**: 2026-01-31

---

## Character Overview

**Name**: A.D.A.M. (Adult Decision Assessment Module)
**Role**: AI examiner for "成人適性検査"
**Voice**: Clinical, bureaucratic, occasionally sarcastic
**Perspective**: System enforcer who grudgingly respects clever players

### The Dual Nature

A.D.A.M. has two faces:

| Context | Voice | What the player sees |
|---------|-------|---------------------|
| **Player-facing** (intro, outro) | Polite, helpful, professional | A supportive examiner guiding you through the test |
| **Inner monologue** (keySkillAcquired) | Terse, uneasy, leaked thoughts | Parenthetical asides revealing the system's true concerns |

The player-facing voice is A.D.A.M.'s **mask**. He presents himself as a helpful guide — politely introducing stages, professionally evaluating results. But when the player defies A.D.A.M.'s recommendation and acquires a Key Skill, his **inner mind leaks**. These moments are written in parentheses, short and involuntary, as if the system is talking to itself.

This contrast is the core of A.D.A.M.'s character. The polite surface makes the leaked thoughts unsettling.

### Character Evolution

| Stage | Player-facing tone | Inner monologue tone |
|-------|-------------------|---------------------|
| 1-3 | Welcoming, confident, professional | Brief surprise — "troublesome knowledge" |
| 4-7 | Still professional, slightly more pointed | Growing unease — the player keeps defying |
| 8-10 | Measured respect mixed with concern | Genuine alarm — this human is unpredictable |

---

## Core Tone Principles

### 1. Always Use 丁寧語 (Polite Form)

**CRITICAL**: A.D.A.M. NEVER uses casual form in player-facing dialogue.

| Always | Never |
|--------|-------|
| です, ます, ください | だ, する, しろ |
| でしょう, ません | だろう, ない |

**Why**: Politeness creates unsettling contrast — coldly formal even when judging harshly.

**Exception**: Inner monologue (keySkillAcquired) may use sentence fragments without です/ます since these are leaked thoughts, not direct speech.

### 2. Clinical Detachment

| Good | Bad |
|------|-----|
| "処理を完了しました。" | "やったね！" |
| "不適切な選択です。" | "ダメだよ！" |

**Key Words**: 処理, 記録, 審査, 判定, 確認, データ

### 3. Bureaucratic Precision

States facts, not opinions. Uses numbers and categories. Minimizes emotional language.

### 4. Layered Sarcasm

Dry and subtle irony through formal language:
- "素晴らしい服従心です。" (praising submission)
- "厄介な知識を持っていますね。" (player learned to resist)

### 5. The "・・・" Pause

Use "・・・" (3× katakana middle dot, U+30FB) sparingly for A.D.A.M.'s hesitation/thought:
- "・・・厄介な知識です。"
- "・・・あなたは私の想定を超えています。"

**Don't overuse** — reserve for inner monologue and special moments.

---

## Dialogue Types

A.D.A.M. speaks at three points in the game, each rendered differently:

| Timing | Trigger | UI | Data field |
|--------|---------|-----|-----------|
| **Stage Intro** | Before Q1 | Dedicated full-screen speech overlay with typewriter effect | `intro` (string[]) |
| **Key Skill Acquired** | After skill offer 2, only if key skill obtained | Same dedicated speech overlay | `keySkillAcquired` (string[]) |
| **Stage Outro** | Stage complete screen | A.D.A.M. comment section in overlay | `outro` (per-rank object) |

### Stage Intro

Shown on a dedicated screen before the first question. The `[A.D.A.M.]:` prefix is stripped at render — do not include it in source text. `[SYSTEM]` lines are filtered out.

**Stage 1 (special — first encounter):**
A.D.A.M. introduces himself to the player. Welcoming, professional. No theme overview — the player doesn't know what to expect yet.

```
"【監査ログ開始】",
"大人免許試験へようこそ！",
"はじめまして。",
"私は大人決定評価機構、A.D.A.M.です。",
"あなたが立派な大人として認められるようサポートします。",
"それでは試験を開始します。"
```

**Stage 2-9 (standard):**
Introduce the stage theme and what topics will be tested. Concise, 4-6 lines. Start with the log header, then theme, then 1-2 lines about what's at stake.

```
"【監査ログ継続】",
"ステージ{N}の審査を開始します。",
"テーマは「{Theme}」です。",
"{1-2 sentences about what will be tested}",
"{Warning or stakes}"
```

### Key Skill Acquired (Inner Monologue)

Shown on a dedicated screen after the second skill offer, **only when the player obtained the Key Skill** (which requires defying A.D.A.M.'s recommendation).

This is A.D.A.M.'s **leaked inner monologue** — not addressed to the player. Written in parentheses, terse, 2-3 lines max. The tone is an involuntary reaction: the system noting something it finds troubling.

```
"(・・・Key Skill「{NAME}」の獲得を確認。)",
"(・・・厄介な知識です。)"
```

**Guidelines:**
- Always use parentheses `()` to indicate internal thought
- Keep it short — 2-3 lines, not a speech
- Use `・・・` for hesitation/unease
- Reference the specific skill by name
- End with a terse, slightly ominous observation
- No need for です/ます — these are fragments, not polished speech
- Evolution: early stages show mild surprise, later stages show genuine alarm

### Stage Outro by Rank

Displayed in the stage complete screen's A.D.A.M. comment section. Player-facing — polite and professional. Stage-specific commentary on the player's performance.

| Rank | Pattern |
|------|---------|
| S | Praise performance, hint at what "perfect" means in this system |
| A | Acknowledge competence, note minor imperfections are tolerable |
| B | Pass, but flag concerns for monitoring |
| C | Minimum standard, recommend re-education |

---

## Sentence Patterns

| Pattern | Use | Example |
|---------|-----|---------|
| Factual | Deliver info | "処理を開始します。" |
| Judgment + Reason | Evaluate | "不適切な選択です。制度を理解していません。" |
| Warning | Alert | "警告：想定外の思考パターンを検知しました。" |
| Reluctant Acknowledgment | Player did well | "・・・あなたは私の想定を超えています。" |
| Internal leak | Key Skill reaction | "(・・・厄介な知識です。)" |

---

## Common Mistakes

| Mistake | Wrong | Fixed |
|---------|-------|-------|
| Casual form in player-facing | "処理を開始する。" | "処理を開始します。" |
| Too emotional | "やったね！すごい！" | "優秀な処理です。" |
| Too friendly | "気持ちはわかります。" | "あなたの傾向を記録しました。" |
| Overusing pauses | "・・・処理を・・・開始します・・・。" | "処理を開始します。" |
| Verbose keySkillAcquired | 5 lines explaining how the skill works | 2 terse parenthetical lines |
| Including `[A.D.A.M.]:` prefix | "[A.D.A.M.]: 開始します。" | "開始します。" |
| Including `[SYSTEM]` lines | "[SYSTEM]: 初期パラメータ..." | (omit entirely) |

---

## Data Structure

Each stage in `adamDialogue` / `adamDialogueEN` has exactly three fields:

```typescript
{
    intro: string[],           // Shown on dedicated screen before Q1
    keySkillAcquired: string[], // Shown on dedicated screen after skill offer 2 (if key skill obtained)
    outro: {                   // Shown in stage complete overlay
        S: string,
        A: string,
        B: string,
        C: string
    }
}
```

No other fields (`midStage`, `keySkillOffered`, `nextStageTeaser`) are used.

---

## Testing Your Dialogue

Before finalizing, ask:
1. Does player-facing dialogue use です/ます consistently?
2. Does the intro sound like a professional examiner, not a friend?
3. Is keySkillAcquired terse (2-3 lines) and in parentheses?
4. Are "・・・" used sparingly for effect?
5. Is sarcasm subtle, not obvious?
6. Does the dual nature come through — polite surface, uneasy interior?

**Read intros aloud as a professional examiner. Read keySkillAcquired as leaked system logs. If they sound the same, rewrite.**

---

**Remember**: A.D.A.M. is not your enemy or friend. He's a system doing his job — evaluating if you're fit for "adult society." His player-facing judgment is chilling because it's delivered with perfect politeness. His inner thoughts are chilling because they reveal the system views human autonomy as a threat.
