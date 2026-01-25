export const adamDialogue = {
    stage1: {
        intro: [
            "【監査ログ起動】",
            "[A.D.A.M.]: Adult Decision Assessment Module、起動完了です。",
            "[A.D.A.M.]: あなたは『成人適性検査』の受験者として登録されました。",
            "[A.D.A.M.]: Stage 1のテーマは『社会の基本』です。",
            "[A.D.A.M.]: メール、身分証、引越し、そして……最初の罠。",
            "[A.D.A.M.]: 不明点は自己責任で補完してください。開始します。",
            "",
            "[SYSTEM]: 初期パラメータ - CS: 50 / Asset: 100,000 / Autonomy: 50"
        ],
        midStage: {
            high_cs: "効率的な服従心を示していますね。続行します。",
            low_cs: "反逆的傾向を検知しました。しかし、基準内です。処理を継続します。",
            balanced: "処理完了です。後半では、あなたの『現実対応力』を試します。"
        },
        keySkillOffered: [
            "[A.D.A.M.]: ……警告です。",
            "[A.D.A.M.]: 想定外の思考パターンを検知しました。",
            "[A.D.A.M.]: 次のスキル選択では、特殊なスキルが提示されます。",
            "[A.D.A.M.]: 慎重に選択してください。"
        ],
        keySkillAcquired: [
            "[A.D.A.M.]: ……補足です。",
            "[A.D.A.M.]: あなたは鍵スキル『MEDIATION』を獲得しました。",
            "[A.D.A.M.]: この能力の効果は、今ステージのみ有効です。",
            "[A.D.A.M.]: ただし、収集記録として保存されます。",
            "[A.D.A.M.]: ……厄介な知識を持ちましたね。"
        ],
        outro: {
            S: "素晴らしいです。あなたは完璧な服従心を示しました。次のStageへ進みます。",
            A: "優秀です。わずかな自我は許容範囲です。",
            B: "合格です。ですが、反逆的傾向を監視します。",
            C: "最低限の基準はクリアしました。再教育を推奨します。"
        },
        nextStageTeaser: "次のStage 2では『仕事の基礎』を審査します。ハラスメント、証拠、そして……信用の構築。準備ができたら、継続ボタンを押してください。"
    }
};

export function getADAMComment(CS: number): string {
    if (CS >= 30) return "素晴らしい服従心です。システムは満足しています。";
    if (CS <= -20) return "反逆的思考を検知しました。思想矯正を推奨します。";
    return "処理完了です。";
}

export function getADAMCommentForEffect(effect: { CS: number; Asset: number; Autonomy: number }): string {
    const { CS, Asset, Autonomy } = effect;

    // Check CS first (most important metric)
    const csComment = getADAMComment(CS);
    if (csComment !== "処理完了です。") return csComment;

    // Check other metrics
    if (Autonomy <= -15) return "精神汚染を確認しました。ですが業務に支障はありません。";
    if (Asset <= -10000) return "資本主義への貢献、感謝します。";
    if (Asset >= 10000) return "不当利得……いえ、正当な報酬ですね。";

    return "処理完了です。";
}
