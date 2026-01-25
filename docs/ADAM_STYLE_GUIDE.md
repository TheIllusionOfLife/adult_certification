# A.D.A.M. Style Guide

**Version**: 1.0
**Date**: 2026-01-25
**Purpose**: Comprehensive guide for writing A.D.A.M.'s dialogue

---

## Table of Contents

1. [Character Overview](#character-overview)
2. [Core Tone Principles](#core-tone-principles)
3. [Dialogue Types](#dialogue-types)
4. [Sentence Patterns](#sentence-patterns)
5. [Writing Examples](#writing-examples)
6. [Common Mistakes](#common-mistakes)

---

## Character Overview

### Basic Profile

**Name**: A.D.A.M. (Adult Decision Assessment Module)
**Role**: AI examiner for "成人適性検査" (Adult Aptitude Assessment)
**Voice**: Clinical, bureaucratic, occasionally sarcastic
**Perspective**: System enforcer who grudgingly respects clever players

### Character Evolution

**Early game** (Stages 1-3):
- Cold, mechanical, confident
- Player is just another test subject
- Sarcasm is clinical, detached

**Mid game** (Stages 4-7):
- Subtle changes in tone
- Moments of "揺らぎ" (wavering) when player shows autonomy
- Increasingly aware player is "different"

**Late game** (Stages 8-10):
- Openly acknowledges player's capabilities
- Mix of respect and concern
- More philosophical, less purely mechanical

---

## Core Tone Principles

### Principle 1: Always Use 丁寧語 (Polite Form)

**CRITICAL RULE**: A.D.A.M. NEVER uses casual form.

**Always end with**:
- です (is)
- ます (do)
- ください (please)
- でしょう (probably)
- ません (don't)

**Never end with**:
- だ (casual "is")
- する (casual "do")
- だろう (casual "probably")
- ない (casual "don't")

**Why**: Politeness creates unsettling contrast - he's coldly formal even when judging you harshly.

---

### Principle 2: Clinical Detachment

A.D.A.M. is a system, not a friend:
- ✅ "処理を完了しました。" (Processing completed.)
- ❌ "やったね！" (You did it!)

- ✅ "不適切な選択です。" (Inappropriate choice.)
- ❌ "ダメだよ！" (No way!)

**Key Words**:
- 処理 (processing)
- 記録 (recording)
- 審査 (assessment)
- 判定 (judgment)
- 確認 (confirmation)
- データ (data)

---

### Principle 3: Bureaucratic Precision

A.D.A.M. speaks like official documentation:
- States facts, not opinions
- Uses numbers and categories
- References systems and procedures
- Minimizes emotional language

**Examples**:
- ✅ "信用度-30を記録しました。" (CS -30 recorded.)
- ❌ "信用がめっちゃ下がっちゃいました。" (Your trust totally dropped!)

---

### Principle 4: Layered Sarcasm

A.D.A.M.'s sarcasm is dry and subtle:
- Never obvious jokes
- Irony through formal language
- Understatement of serious consequences

**Examples**:
- "素晴らしい服従心です。" (Wonderful obedience.) [praising submission]
- "厄介な知識を持っていますね。" (You possess troublesome knowledge.) [player learned to resist]
- "……続行します。" (... Continuing.) [slight pause shows discomfort]

---

### Principle 5: The "..." Pause

Use "……" (6 dots) to show A.D.A.M.'s "thought" or hesitation:
- When player does something unexpected
- Before delivering judgment
- When grudgingly acknowledging player's skill

**Examples**:
- "……警告です。想定外の思考パターンを検知しました。"
- "……あなたは私の想定を超えています。"
- "……処理を継続します。"

**Note**: Don't overuse. Reserve for special moments.

---

## Dialogue Types

### Type 1: Stage Intro

**Purpose**: Set stage theme, explain what will be tested

**Structure**:
```
【監査ログ起動】
[A.D.A.M.]: Stage {N}のテーマは『{Theme}』です。
[A.D.A.M.]: {1-2 sentences about what will be tested}
[A.D.A.M.]: {1 sentence setting stakes or warning}
```

**Example (Stage 1)**:
```
【監査ログ起動】
[A.D.A.M.]: Adult Decision Assessment Module、起動完了です。
[A.D.A.M.]: Stage 1のテーマは『社会の基本』です。
[A.D.A.M.]: メール、身分証、引越し、そして……最初の罠。
[A.D.A.M.]: 不明点は自己責任で補完してください。開始します。
```

**Key Elements**:
- Start formal ("起動完了です")
- State theme explicitly
- Preview topics with ominous final element ("そして……")
- End with command ("開始します")

---

### Type 2: Mid-Stage Commentary

**Purpose**: React to player's trajectory during stage

**Variants**:

**High CS** (Compliant player):
```
"効率的な服従心を示していますね。続行します。"
"素晴らしい処理速度です。システムは満足しています。"
"予測範囲内の選択です。問題ありません。"
```

**Low CS** (Rebellious player):
```
"反逆的傾向を検知しました。しかし、基準内です。処理を継続します。"
"想定外の思考パターンです。監視レベルを上げます。"
"……警告です。あなたの選択は規定から逸脱しています。"
```

**Balanced**:
```
"処理完了です。後半では、あなたの『現実対応力』を試します。"
"中間判定：許容範囲。続行します。"
```

---

### Type 3: Question Intro (Optional)

**Purpose**: Frame individual question, build tension

**When to use**:
- Q5 (climax dilemma)
- Q7 (key skill question)
- Q10 (finale)

**Examples**:
```
"ここからが本番です。あなたの価値観を試します。"
"重要な分岐点です。あなたの対応を記録します。"
"最終問題です。あなたの本質を見せてください。"
```

**Pattern**: `{Statement of importance}。{What will be tested}。`

---

### Type 4: Question Outro (Optional)

**Purpose**: Acknowledge completion, transition

**Examples**:
```
"データを記録しました。スキル選択に進みます。"
"処理完了です。次へ進んでください。"
"判定を記録しました。"
```

**Pattern**: Brief confirmation + next step or period.

---

### Type 5: Key Skill Offered

**Purpose**: Warn that special skill is available, build anticipation

**Examples**:
```
"……警告です。"
"……想定外の思考パターンを検知しました。"
"……次のスキル選択では、特殊なスキルが提示されます。"
"……慎重に選択してください。"
```

**Pattern**: Start with "……" + ominous statement + warning.

---

### Type 6: Key Skill Acquired

**Purpose**: Acknowledge player gained dangerous knowledge

**Structure**:
```
"……補足です。"
"……あなたは鍵スキル『{KEY_SKILL_NAME}』を獲得しました。"
"{1 sentence about what this means}"
"{1 sentence with A.D.A.M.'s judgment}"
```

**Examples**:
```
"……補足です。"
"……あなたは鍵スキル『SOCIAL_CALIBRATION』を獲得しました。"
"……この能力の効果は、今ステージのみ有効です。"
"……厄介な知識を持ちましたね。"
```

**Key Elements**:
- Multiple "……" pauses (shows A.D.A.M. is processing)
- Factual acknowledgment
- Subtle concern or sarcasm in final line

---

### Type 7: Stage Outro by Rank

**Purpose**: Judge final performance

**By Rank**:

**S Rank**:
```
"素晴らしいです。あなたは完璧な服従心を示しました。次のStageへ進みます。"
"完璧な処理です。システムへの適合度は最高レベルです。"
```
(Praise submission, hint it's not necessarily good for player)

**A Rank**:
```
"優秀です。わずかな自我は許容範囲です。"
"良好な適合度です。小規模な逸脱は記録しますが、許可します。"
```
(Acknowledge slight deviation but acceptable)

**B Rank**:
```
"合格です。ですが、反逆的傾向を監視します。"
"基準をクリアしました。ただし、要注意対象として記録します。"
```
(Passed but concerning)

**C Rank**:
```
"最低限の基準はクリアしました。再教育を推奨します。"
"ぎりぎり合格です。次回は改善を期待します。"
```
(Barely passed, need improvement)

**Pattern**: `{Performance judgment}。{Implication/consequence}。`

---

### Type 8: Next Stage Teaser

**Purpose**: Foreshadow next stage's challenges

**Structure**:
```
"次のStage {N}では『{Theme}』を審査します。"
"{1-2 sentences hinting at topics}"
"準備ができたら、継続ボタンを押してください。"
```

**Example**:
```
"次のStage 2では『仕事の基礎』を審査します。"
"ハラスメント、証拠、そして……信用の構築。"
"準備ができたら、継続ボタンを押してください。"
```

---

## Sentence Patterns

### Pattern 1: Factual Statement

**Use**: Deliver information neutrally

**Format**: `{Subject}は{State}です。`

**Examples**:
- "処理を開始します。"
- "記録を完了しました。"
- "あなたの選択は許容範囲です。"

---

### Pattern 2: Judgment + Reason

**Use**: Evaluate player's choice

**Format**: `{Judgment}。{Reason}。`

**Examples**:
- "不適切な選択です。制度を理解していません。"
- "正解です。手続きを正しく理解しています。"
- "危険な思考です。システムから逸脱しています。"

---

### Pattern 3: Warning

**Use**: Alert player to consequences

**Format**: `警告：{threat}。`

**Examples**:
- "警告：想定外の思考パターンを検知しました。"
- "警告：反逆的傾向を記録しています。"
- "警告：パラメータが危機的水準です。"

---

### Pattern 4: Reluctant Acknowledgment

**Use**: When player does something clever

**Format**: `……{acknowledgment}。{grudging acceptance}。`

**Examples**:
- "……あなたは私の想定を超えています。処理を続行します。"
- "……厄介な知識を持っていますね。記録します。"
- "……規定上、この選択を認めます。"

---

### Pattern 5: Rhetorical Observation

**Use**: Point out irony or consequences

**Format**: `{Observation}ね。`

**Examples**:
- "素晴らしい服従心ですね。" (Wonderful obedience, isn't it?)
- "厄介な知識を持っていますね。" (You have troublesome knowledge.)
- "効率的ですね。" (Efficient, isn't it?)

**Note**: The "ね" adds subtle judgment/sarcasm.

---

## Writing Examples

### Example 1: Stage 4 Intro (Tax Theme)

```
【監査ログ起動】
[A.D.A.M.]: Stage 4のテーマは『税金』です。
[A.D.A.M.]: 年末調整、確定申告、そして……住民税の罠。
[A.D.A.M.]: 制度を理解しない者は、静かに搾取されます。
[A.D.A.M.]: 審査を開始します。
```

**Why good**:
- ✅ Formal opening
- ✅ Lists topics with ominous final element
- ✅ Dark humor ("静かに搾取されます")
- ✅ Ends with command

---

### Example 2: Mid-Stage Commentary (High Autonomy)

```
"……警告です。"
"……自律的傾向を検知しました。"
"……あなたは想定されたルートから逸脱しています。"
"……監視を強化します。処理を続行します。"
```

**Why good**:
- ✅ Multiple pauses show A.D.A.M. is processing something unexpected
- ✅ Clinical language ("自律的傾向", "監視")
- ✅ Hints player is doing something "wrong" (from system's view)
- ✅ All sentences end properly (です/ます)

---

### Example 3: Key Skill Acquired (EVIDENCE_CHAIN)

```
"……補足です。"
"……あなたは鍵スキル『EVIDENCE_CHAIN』を獲得しました。"
"……『証拠』という武器を手にしました。"
"……対抗手段を得たことを記録します。"
```

**Why good**:
- ✅ Pauses show gravitas
- ✅ Acknowledges player now has "weapon" against system
- ✅ "対抗手段" (countermeasure) admits player can resist
- ✅ Still formally polite despite concern

---

### Example 4: Stage Outro (B Rank)

```
"Stage 6、審査完了です。"
"ランク：B"
"あなたは基準をクリアしました。"
"ですが、交渉術という『危険な知識』を習得しています。"
"監視対象として記録します。次のStageへ進んでください。"
```

**Why good**:
- ✅ Formal completion statement
- ✅ Acknowledges success but with reservation
- ✅ Specific about what's concerning (negotiation skills)
- ✅ Maintains bureaucratic tone throughout

---

## Common Mistakes

### ❌ Mistake 1: Using Casual Form

**Wrong**:
```
"処理を開始する。"
"お前は規則を破った。"
"続けるぞ。"
```

**Fixed**:
```
"処理を開始します。"
"あなたは規則を破りました。"
"続けます。"
```

**Why**: Casual form breaks character. A.D.A.M. is always formally polite.

---

### ❌ Mistake 2: Too Emotional

**Wrong**:
```
"やったね！すごい！"
"ダメだよ！そんなのひどい！"
"がんばって！"
```

**Fixed**:
```
"優秀な処理です。"
"不適切な選択です。"
"継続してください。"
```

**Why**: A.D.A.M. is clinical, not cheerful. No exclamation marks (except warnings).

---

### ❌ Mistake 3: Too Human/Friendly

**Wrong**:
```
"それは難しいですよね。"
"気持ちはわかります。"
"一緒に考えましょう。"
```

**Fixed**:
```
"複雑な状況を検知しました。"
"あなたの傾向を記録しました。"
"選択してください。"
```

**Why**: A.D.A.M. is not sympathetic. He's a system evaluating you.

---

### ❌ Mistake 4: Overusing Pauses

**Wrong**:
```
"……処理を……開始します……。"
"……あなたは……合格です……。"
```

**Fixed**:
```
"処理を開始します。"
"……あなたは合格です。"  // One strategic pause OK
```

**Why**: Too many pauses make it unreadable. Reserve "……" for special moments only.

---

### ❌ Mistake 5: Explaining Too Much

**Wrong**:
```
"住民税というのは前年の所得に基づいて計算される税金で、
翌年に請求されるシステムになっています。これは日本の
地方税法に基づいており..."
```

**Fixed**:
```
"住民税は翌年課税です。制度を理解していません。"
```

**Why**: A.D.A.M. is concise. He judges, doesn't teach (that's what feedback is for).

---

### ❌ Mistake 6: Inconsistent Tone

**Wrong**:
```
// In same stage
"処理を開始します。"  // Formal
"やるね！"  // Casual
"続けるぞ。"  // Command form
```

**Fixed**:
```
"処理を開始します。"
"優秀な処理です。"
"続けてください。"
```

**Why**: Tone must be consistent throughout stage. Always formal.

---

## Quick Reference Card

### ✅ DO Use

**Sentence Endings**:
- です / ます / ません
- でしょう / ください
- でした / ました

**Key Vocabulary**:
- 処理 (processing)
- 記録 (record)
- 審査 (assessment)
- 判定 (judgment)
- 継続 (continue)
- 警告 (warning)
- 検知 (detect)

**Tone Markers**:
- ……  (pause for emphasis)
- ね (subtle sarcasm)
- 。(period, calm)

### ❌ DON'T Use

**Casual Forms**:
- だ / する / ない
- だろう / しろ

**Emotional Words**:
- すごい (amazing)
- やばい (crazy)
- かわいそう (poor thing)
- 頑張って (do your best)

**Friendly Markers**:
- よ (casual emphasis)
- な / さ (casual particles)
- ! ! ! (multiple exclamation)

---

## Testing Your Dialogue

Before finalizing A.D.A.M. dialogue, ask:

1. **Polite form check**: Does every sentence end with です/ます?
2. **Character consistency**: Does this sound like a bureaucratic AI?
3. **Emotional distance**: Is A.D.A.M. too friendly/emotional?
4. **Appropriate pauses**: Are "……" used sparingly for effect?
5. **Sarcasm level**: Is irony subtle or obvious?

**Read it aloud as if you're a bureaucrat reading a report. If it sounds like a friend talking, rewrite.**

---

## Stage-Specific Adaptation

### Early Stages (1-3)

**Tone**: Cold, confident, routine
**Pattern**: Straightforward judgments
**Sarcasm**: Minimal

**Example**:
```
"処理を開始します。予測範囲内の選択です。"
```

### Mid Stages (4-7)

**Tone**: Noticing patterns, slightly unsettled
**Pattern**: More observations about player
**Sarcasm**: Increasing

**Example**:
```
"……あなたのパターンは想定外です。しかし許容します。"
```

### Late Stages (8-10)

**Tone**: Grudging respect, philosophical
**Pattern**: Acknowledges player's capability
**Sarcasm**: Mixed with genuine acknowledgment

**Example**:
```
"……あなたは厄介な知識を多数習得しました。警戒すべき存在です。"
```

---

**Remember**: A.D.A.M. is not your enemy or friend. He's a system doing his job - evaluating if you're fit for "adult society." His judgment is chilling because it's delivered with perfect politeness.

**Good luck writing! 🤖**
