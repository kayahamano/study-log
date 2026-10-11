// 日報1件分のデータの形
export type StudyLog = {
    id: string;        // 日報を区別するためのID
    date: string;      // 学習した日（例："2026-10-11"）
    minutes: number;   // 学習時間（分）
    content: string;   // 学んだこと
    tags: string[];    // タグ（例：["AWS", "Next.js"]）
    createdAt: string; // 作成日時
    updatedAt: string; // 更新日時
};

// 登録フォームで入力する項目だけを取り出した型
export type StudyLogInput = Pick<StudyLog, "date" | "minutes" | "content" | "tags">;