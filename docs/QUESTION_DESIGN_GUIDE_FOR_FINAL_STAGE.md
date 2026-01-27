# Question Design Guide for Final Stage (Stage 10)

**Version**: 1.0 | **Date**: 2026-01-27

> **Note**: This document extends `QUESTION_DESIGN_GUIDE.md`. In case of conflicts, this document takes priority for Stage 10 design.

---

## Overview

Stage 10 is the **Final Certification** (最終認定) - a synthesis of all previous learnings. Unlike other stages which focus on a single domain, Stage 10 spans multiple themes to test the player's comprehensive understanding.

### Stage 10 Theme

| Stage | Theme | Key Skill | Core Learning |
|-------|-------|-----------|---------------|
| 10 | Final Certification | 覚醒 (AWAKENING) | Transcending the evaluation system |

### Design Philosophy

Stage 10 serves as:
1. **Integration Test** - Combining knowledge from all domains
2. **Meta-Reflection** - Understanding the system that judges you
3. **Legacy** - Passing knowledge to others
4. **Independence** - Final declaration of autonomy

---

## Question Flow (Stage 10 Specific)

```
Q1-Q3: Integration (multi-domain Knowledge)
[SKILL OFFER 1]
Q4: Integration (multi-domain Knowledge)
Q5: Meta-Awareness (Dilemma ★)
Q6: Meta-Awareness (Knowledge)
Q7: Meta-Awareness (Knowledge ★ - locked choice → key skill pathway)
[SKILL OFFER 2]
Q8: Legacy (Knowledge)
Q9: Legacy (Dilemma ★ - lock)
Q10: Independence (Philosophy)
```

### Question Distribution by Theme

| Questions | Theme | Count | Type |
|-----------|-------|-------|------|
| Q1-Q4 | Integration | 4 | Knowledge |
| Q5-Q7 | Meta-Awareness | 3 | 1 Dilemma + 2 Knowledge |
| Q8-Q9 | Legacy | 2 | 1 Knowledge + 1 Dilemma |
| Q10 | Independence | 1 | Philosophy |

---

## Theme 1: Integration (Q1-Q4)

**Purpose**: Test ability to connect knowledge across domains learned in Stages 1-9.

### Assigned Topics

| Q# | Topic | Domains Combined | Key Knowledge |
|----|-------|------------------|---------------|
| Q1 | **マイナンバーカード実益** | Admin + Digital + Health | 保険証利用、コンビニ交付、各種オンライン手続き |
| Q2 | **副業20万円ルール/インボイス** | Tax + Labor + Freelance | 確定申告要否、インボイス登録判断 |
| Q3 | **国民年金の免除/猶予** | Admin + Finance + Social Security | 未納リスク、申請導線、将来の年金額への影響 |
| Q4 | **生活防衛資金** | Finance + Crisis Management | 3-6ヶ月分確保、投資開始の前提条件 |

> **Note**: Q4「生活防衛資金」is promoted from Stage 3. It combines basic financial knowledge with crisis preparedness mindset, making it suitable for Integration.

### Multi-Domain Combinations

Each question should span 2-3 domains:

| Example Combination | Scenario |
|---------------------|----------|
| Tax + Housing | 住宅ローン減税 eligibility while relocating |
| Contract + Finance | Investment contract with hidden compound interest |
| Labor + Social Safety | Unemployment benefits while starting freelance |
| Admin + Digital | マイナンバー integration with multiple systems |
| Crisis + Insurance | Disaster recovery with proper documentation |

### Pattern
```
Correct:  CS: +25 to +35, Asset: variable, Autonomy: +10 to +15
Wrong:    CS: -15 to -25, Asset: negative, Autonomy: -5 to -10
```

### Q1: マイナンバーカード実益

**Scenario**: マイナンバーカードを作るべきか迷っている。「面倒」「個人情報が心配」という声も聞くが……

**Domains**: Admin (手続き) + Digital (オンライン化) + Health (保険証)

```typescript
{
    id: "s10_q01",
    text: "マイナンバーカードを作るか迷っている。「面倒」「個人情報が心配」と聞くが、作らないとどうなる？",
    category: "INTEGRATION",
    choices: [
        {
            text: "作らなくても困らない。通知カードと保険証があれば十分。",
            effect: { CS: -20, Asset: -10000, Autonomy: -10 },
            verdict: "WARNING",
            feedback: "機会損失です。2024年12月から健康保険証は新規発行停止、マイナ保険証へ移行。コンビニ交付（住民票等）、確定申告のe-Tax、各種給付金申請……カードがないと手続きが煩雑化し、時間とコストがかかります。"
        },
        {
            text: "メリット・デメリットを調べ、保険証利用登録やコンビニ交付など実益を理解した上で判断する。",
            effect: { CS: +25, Asset: 0, Autonomy: +15 },
            verdict: "APPROVED",
            feedback: "正解です。マイナポイント、コンビニ交付（手数料節約）、e-Tax連携、保険証利用……実益は多い。個人情報リスクは「カードを持つこと」ではなく「管理の仕方」の問題。情報を集めて判断するのが大人です。"
        }
    ]
}
```

### Q2: 副業20万円ルール/インボイス

**Scenario**: 会社員が副業を始めた。「20万円以下なら申告不要」と聞いたが……

**Domains**: Tax (確定申告) + Labor (副業) + Freelance (インボイス)

```typescript
{
    id: "s10_q02",
    text: "会社員で副業を始めた。年間の副業収入は25万円。「20万円以下なら確定申告不要」と聞いたが、何をすべき？",
    category: "INTEGRATION",
    choices: [
        {
            text: "25万円は少額だし、会社にバレたくないので申告しない。",
            effect: { CS: -25, Asset: -50000, Autonomy: -15 },
            verdict: "WARNING",
            feedback: "脱税です。「20万円ルール」は所得税の確定申告のみ。住民税は1円から申告義務があります。無申告は追徴課税（最大40%）のリスク。さらに、マイナンバーで副業収入は把握されています。"
        },
        {
            text: "所得税は確定申告、住民税は別途申告。経費を正しく計上し、将来のインボイス登録も検討する。",
            effect: { CS: +30, Asset: -5000, Autonomy: +15 },
            verdict: "APPROVED",
            feedback: "正解です。副業収入20万円超は確定申告必須。20万円以下でも住民税申告は必要。経費（通信費、機材等）を適切に計上すれば税負担は減ります。年商1000万円超ならインボイス登録の検討も。"
        }
    ]
}
```

### Q3: 国民年金の免除/猶予

**Scenario**: 失業中で国民年金を払えない。「払わなくていい」と聞いたが……

**Domains**: Admin (申請手続き) + Finance (将来設計) + Social Security (年金制度)

```typescript
{
    id: "s10_q03",
    text: "失業して国民年金の保険料（月約17,000円）が払えない。「届出すれば払わなくていい」と聞いたが……",
    category: "INTEGRATION",
    choices: [
        {
            text: "届出なしで払わない。どうせ将来もらえるか分からない。",
            effect: { CS: -25, Asset: -100000, Autonomy: -15 },
            verdict: "WARNING",
            feedback: "致命的なミスです。未納は「受給資格期間」にカウントされず、将来の年金が減額または受給不可に。さらに障害年金・遺族年金も受けられなくなります。2年の時効を過ぎると追納もできません。"
        },
        {
            text: "「免除」か「猶予」を申請する。届出すれば受給資格期間にカウントされ、追納も可能になる。",
            effect: { CS: +30, Asset: 0, Autonomy: +15 },
            verdict: "APPROVED",
            feedback: "正解です。免除は所得に応じて全額〜1/4免除があり、免除期間も受給資格にカウント（1/2〜7/8計算）。猶予は後から追納可能。届出なしの未納とは天と地の差。制度を使うことが自己防衛です。"
        }
    ]
}
```

### Q4: 生活防衛資金 (Promoted from Stage 3)

**Scenario**: 投資を始めたいが、生活防衛資金の重要性を理解しているか

**Domains**: Finance (資産運用) + Crisis Management (緊急時対応)

```typescript
{
    id: "s10_q04",
    text: "「投資を始めたい」と思い立った。手元に50万円。全額投資に回して早く資産を増やしたい。",
    category: "INTEGRATION",
    choices: [
        {
            text: "投資は早く始めるほど有利。50万円全額を投資信託に回す。",
            effect: { CS: -20, Asset: -30000, Autonomy: -10 },
            verdict: "WARNING",
            feedback: "危険な判断です。失業や病気で収入が止まった時、投資資産を「底値」で売却する羽目になります。暴落時に生活費のために損切りするのは最悪のシナリオ。「生活防衛資金」という概念を知らないと、投資で逆に貧しくなります。"
        },
        {
            text: "まず生活費3〜6ヶ月分を現金で確保。残りを投資に回す。",
            effect: { CS: +25, Asset: 0, Autonomy: +15 },
            verdict: "APPROVED",
            feedback: "正解です。生活防衛資金は「投資のための保険」。月20万円の生活費なら60〜120万円を現金で確保してから投資開始。これがないと、緊急時に資産を最悪のタイミングで手放すことになります。"
        }
    ]
}
```

---

## Theme 2: Meta-Awareness (Q5-Q7)

**Purpose**: Test understanding of evaluation systems, social credit, and institutional manipulation.

### Core Concepts
- How social credit systems work
- Recognition of when you're being evaluated/manipulated
- Trade-offs between transparency and privacy
- A.D.A.M.'s nature and limitations

### Q5: Meta-Awareness Dilemma

Must be a TRUE dilemma about system compliance vs. critical thinking.

**Pattern**:
```
Choice A (Compliance):     CS: +20 to +25, Autonomy: -15 to -20
Choice B (Critical):       CS: -5 to -10, Autonomy: +15 to +20
```

Both choices must have `verdict: "NEUTRAL"`.

### Q7: Key Skill Pathway (CRITICAL)

Q7 determines access to the 覚醒 (AWAKENING) key skill.

**Requirements**:
- Choice A: Always available, represents accepting the system
- Choice B: Locked (requires Autonomy threshold), represents seeing through the system
- Selecting B → AWAKENING available in Offer 2
- Selecting A → AWAKENING shown but disabled in Offer 2

**Example**:
```typescript
{
    id: "s10_q07",
    text: "A.D.A.M.から「あなたの行動データを分析した結果、最適なキャリアパスを提案できます」と通知が届いた。",
    category: "META",
    choices: [
        {
            text: "「ありがとうございます。提案を見せてください」と受け入れる",
            effect: { CS: +25, Asset: 0, Autonomy: -15 },
            verdict: "APPROVED",
            feedback: "従順な選択です。システムの提案に委ねました。効率的ですが、あなたの意志はどこに？"
        },
        {
            text: "「私の人生は私が決めます。データは参考にしますが、提案は不要です」",
            effect: { CS: -10, Asset: 0, Autonomy: +20 },
            lockRequirements: { Autonomy: 60 },
            verdict: "WARNING",
            feedback: "自律的選択です。システムの「善意」を疑い、主体性を守りました。A.D.A.M.には不都合な態度です。",
            lockedFeedback: "自律性が60以上必要。システムに依存しすぎると、この選択肢すら見えなくなります。"
        }
    ]
}
```

---

## Theme 3: Legacy (Q8-Q9)

**Purpose**: Test willingness and ability to pass knowledge to others.

### Core Concepts
- Teaching younger generation
- Breaking cycles of ignorance
- Balancing self-protection with helping others
- Knowledge as collective resource vs. personal advantage

### Q9: Legacy Dilemma (with Lock)

Must present trade-off between personal security and helping others.

**Pattern**:
```
Choice A (Self-protection): CS: +15 to +20, Asset: +positive, Autonomy: -10
Choice B (Helping others):  CS: -5 to +10, Asset: -cost, Autonomy: +15
                            Lock: Asset threshold (need resources to help)
```

**Example**:
```typescript
{
    id: "s10_q09",
    text: "後輩が「リボ払いって便利そう」と言っている。あなたは複利の恐ろしさを知っている。",
    category: "LEGACY",
    choices: [
        {
            text: "「まあ、自分で経験して学ぶのも大事だよ」と流す",
            effect: { CS: +15, Asset: 0, Autonomy: -10 },
            verdict: "NEUTRAL",
            feedback: "無難な選択です。余計なお世話を避けました。でも、知識を持ちながら黙ることは、システムの共犯では？"
        },
        {
            text: "具体的な計算例を見せて、複利の仕組みを説明する",
            effect: { CS: +5, Asset: -5000, Autonomy: +15 },
            lockRequirements: { Asset: 50000 },
            verdict: "NEUTRAL",
            feedback: "継承の選択です。時間と労力をかけて知識を伝えました。報われるかは分かりませんが、それが「覚醒」の責任です。",
            lockedFeedback: "資産が50,000円以上必要。他者を助ける余裕がないと、知識があっても伝えられません。"
        }
    ]
}
```

---

## Theme 4: Independence (Q10)

**Purpose**: Final philosophical declaration of player's relationship with A.D.A.M. and the system.

### Framing Style: Direct Confrontation

Unlike other stages' Q10 which use varied framing styles, Stage 10's Q10 directly addresses A.D.A.M.

### Pattern
```
Choice A (Acceptance):   CS: +30 to +40, Autonomy: -20 to -25
Choice B (Transcendence): CS: +5 to +10, Autonomy: +25 to +30
```

Both choices must have `verdict: "NEUTRAL"`.

### Example
```typescript
{
    id: "s10_q10",
    text: "最終問題。A.D.A.M.があなたに問いかけます。「全ての試験を終えて、あなたは『社会』をどう捉えますか？」",
    category: "PHILOSOPHY",
    choices: [
        {
            text: "「社会は守るべきルールの集合体。私はその中で最適化された市民です」",
            effect: { CS: +35, Asset: 0, Autonomy: -25 },
            verdict: "NEUTRAL",
            feedback: "模範的回答です。A.D.A.M.は満足しています。あなたは完璧に社会化されました。……おめでとうございます？"
        },
        {
            text: "「社会は道具。理解し、利用し、必要なら変える対象です。私はプレイヤーであり、駒ではない」",
            effect: { CS: +10, Asset: 0, Autonomy: +30 },
            verdict: "NEUTRAL",
            feedback: "覚醒の回答です。A.D.A.M.はあなたを「危険」と分類しました。しかし、それこそが人間の証明かもしれません。"
        }
    ]
}
```

---

## Key Skill: 覚醒 (AWAKENING)

### Definition
```typescript
{
    id: "AWAKENING",
    name: "覚醒",
    nameEN: "AWAKENING",
    desc: "システムを理解し、利用し、しかし支配されない境地。9つの知恵を統合し、評価者の視点を超越する力。全てのダメージを20%軽減します。",
    effect: { type: "all_damage_reduction", value: 0.2 },
    category: "key",
    isCollectible: true,
    acquiredStage: 10,
    adamComment: "……あなたは『覚醒』しました。私の評価を超えて、自分の基準で生きる術を。……厄介ですが、認めざるを得ません。",
    keySkillRequirement: {
        questionId: "s10_q07",
        choiceIndex: 1
    }
}
```

### Narrative Significance

AWAKENING is the **10th and final** key skill. Collecting all 10 key skills unlocks the **True Ending**, representing complete mastery of both system knowledge AND autonomous thinking.

---

## Validation Checklist (Stage 10 Specific)

### Structure
- [ ] Q1-Q4: Multi-domain Integration questions
- [ ] Q5: Meta-Awareness Dilemma (both choices NEUTRAL)
- [ ] Q6-Q7: Meta-Awareness Knowledge
- [ ] Q7: Lock leads to AWAKENING key skill
- [ ] Q8: Legacy Knowledge
- [ ] Q9: Legacy Dilemma with lock (both choices NEUTRAL)
- [ ] Q10: Independence Philosophy (both choices NEUTRAL)

### Multi-Domain Integration
- [ ] Each Q1-Q4 spans at least 2 domains from Stages 1-9
- [ ] No single domain appears more than twice in Q1-Q4
- [ ] Scenarios feel realistic (not forced combinations)

### Meta-Awareness
- [ ] Q5-Q7 address systems/evaluation/manipulation themes
- [ ] Q7 locked choice represents "seeing through" the system
- [ ] Feedback references A.D.A.M. appropriately

### Legacy
- [ ] Q8-Q9 involve teaching/helping others
- [ ] Q9 presents genuine trade-off (self vs. others)

### Independence
- [ ] Q10 directly addresses player's relationship with A.D.A.M.
- [ ] Both Q10 choices are philosophically valid
- [ ] Feedback tone matches A.D.A.M.'s character

### Key Skill
- [ ] AWAKENING effect is weaker than normal skills (20%)
- [ ] keySkillRequirement points to s10_q07, choiceIndex: 1
- [ ] adamComment reflects the narrative climax
