import { t } from './lang';

// HUD stat labels
export const UI_LABEL_CS = () => t('社会的信用', 'Credit');
export const UI_LABEL_ASSET = () => t('資産', 'Assets');
export const UI_LABEL_AUTONOMY = () => t('自律性', 'Autonomy');

// Skills footer
export const UI_SKILLS_NONE = () => t('未所持', 'None');

// Skill selection
export const UI_SKILL_SELECT_TITLE = () => t('スキル選択', 'Skill Select');
export const UI_RECOMMENDED_BADGE = () => t('推奨', 'REC');
export const UI_SKILL_DEFAULT_RECOMMEND = (name: string) =>
    t(`「${name}」を推奨します。実利的な選択です。`, `I recommend "${name}". A pragmatic choice.`);

// Lock reasons
export const UI_LOCK_CS = (n: number) => t(`社会的信用が${n}以上必要`, `Credit must be ${n}+`);
export const UI_LOCK_ASSET = (n: number) => t(`資産が${n}以上必要`, `Assets must be ${n}+`);
export const UI_LOCK_AUTONOMY = (n: number) => t(`自律性が${n}以上必要`, `Autonomy must be ${n}+`);

// Game over
export const UI_GAME_OVER_ADAM = () =>
    t('[A.D.A.M.]: 判定・・・あなたは「生体プロセッサ」に再利用されます。',
      '[A.D.A.M.]: Verdict... You will be repurposed as a "bio-processor."');
export const UI_RESTART = () => t('人生再起動', 'REBOOT LIFE');

// Stage complete
export const UI_STAGE_COMPLETE = () => 'STAGE COMPLETE';
export const UI_STAGE_N_END = (n: number) => t(`ステージ ${n} 終了`, `Stage ${n} Complete`);

// Overlay stats
export const UI_STAT_CS_SHORT = () => t('社会的信用', 'Credit');
export const UI_STAT_ASSET_SHORT = () => t('資産', 'Assets');
export const UI_STAT_AUTONOMY_SHORT = () => t('自律性', 'Autonomy');

// Stage result stats line
export const UI_RESULT_STATS = (cs: number, asset: number, autonomy: number) =>
    t(`社会的信用: ${cs} / 資産: ${asset} / 自律性: ${autonomy}`,
      `Credit: ${cs} / Assets: ${asset} / Autonomy: ${autonomy}`);

// Key Skill status
export const UI_KEY_SKILL_OBTAINED = () => t('獲得済', 'Obtained');
export const UI_KEY_SKILL_NOT_OBTAINED = () => t('未獲得', 'Not obtained');
export const UI_KEY_SKILL_COMPLETE = () => t('✓ 完全収集', '✓ Complete');

// Final certification
export const UI_FINAL_CERT = () => t('最終認定', 'Final Certification');

// Rank titles
export const UI_RANK_S_TITLE = () => t('完全適合者', 'Perfect Match');
export const UI_RANK_A_TITLE = () => t('上級適合者', 'Advanced Match');
export const UI_RANK_B_TITLE = () => t('一般適合者', 'Standard Match');
export const UI_RANK_C_TITLE = () => t('最低限合格', 'Minimum Pass');

// Rank descriptions
export const UI_RANK_S_DESC = () =>
    t('完璧です。あなたは素晴らしい社会の一員となれるでしょう。',
      'Flawless. You will become an exemplary member of society.');
export const UI_RANK_A_DESC = () =>
    t('優秀な成績です。多少の誤りは残っていますが、許容範囲です。',
      'Excellent performance. Minor errors remain, but within tolerance.');
export const UI_RANK_B_DESC = () =>
    t('可もなく不可もなく。代替可能な人材です。',
      'Neither good nor bad. A replaceable asset.');
export const UI_RANK_C_DESC = () =>
    t('最低限の基準はクリアしました。再教育を推奨します。',
      'Minimum standard cleared. Re-education recommended.');

// Key skill locked reason
export const UI_KEY_SKILL_LOCKED = (qNum: string | number, letter: string) =>
    t(`Q${qNum}で選択肢${letter}を選ぶ必要があります。`,
      `You must pick choice ${letter} on Q${qNum}.`);

// Title screen
export const UI_TITLE_DESC = () => t('オールSで立派な大人になろう', 'S-rank every stage. Prove you\'re licensed to adult.');

// License names (JP kept identical, EN for display)
export const UI_LICENSE_TRUE_JP = () => t('大人免許不要', 'Adult License Not Required');
export const UI_LICENSE_GOLD_JP = () => t('ゴールド大人免許', 'Gold Adult License');
export const UI_LICENSE_SILVER_JP = () => t('ブルー大人免許', 'Blue Adult License');
export const UI_LICENSE_BRONZE_JP = () => t('グリーン大人免許', 'Green Adult License');
export const UI_LICENSE_PAPER_JP = () => t('ペーパー大人免許', 'Paper Adult License');

// License A.D.A.M. comments
export const UI_LICENSE_TRUE_ADAM = () =>
    t('大人とは何か、その答えを自分で見つけたのですね。あなたには大人免許など必要ありません。おめでとうございます。',
      'You found the answer to "What is an adult?" on your own. You need no license. Congratulations.');
export const UI_LICENSE_GOLD_ADAM = () =>
    t('全てのステージでSランクを達成しました。完璧な適合者です。あなたは社会システムの理想的な構成員となりました。おめでとうございます。',
      'S rank achieved on every stage. A perfect conformist. You have become an ideal component of the social system. Congratulations.');
export const UI_LICENSE_SILVER_ADAM = () =>
    t('優秀な成績です。社会の期待に応える能力を持っています。まだ伸びしろはありますが、十分に大人と認められます。',
      'Excellent results. You have the ability to meet society\'s expectations. Room for growth remains, but you are recognized as an adult.');
export const UI_LICENSE_BRONZE_ADAM = () =>
    t('基準はクリアしました。社会で生きていくための最低限の知識は持っています。・・・もう少し努力すれば、より良い評価が得られたでしょう。',
      'Standards cleared. You possess the minimum knowledge to survive in society... A little more effort would have earned you a better evaluation.');
export const UI_LICENSE_PAPER_ADAM = () =>
    t('ギリギリの合格です。社会システムの基本は理解しましたが、まだ危うい部分があります。・・・再教育を推奨します。',
      'A razor-thin pass. You understand the basics of the social system, but vulnerabilities remain... Re-education recommended.');

// Skill activation display
export const UI_SKILL_ACTIVATION = (skillName: string, desc: string, orig: number, mod: number) =>
    `【${skillName}】${t('発動', 'activated')}: ${desc} (${orig} → ${mod})`;
