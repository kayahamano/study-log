import { delay, http, HttpResponse } from "msw";
import { API_URL } from "@/lib/config";
import type { StudyLog, StudyLogInput } from "@/features/logs/types";

// 偽のデータベース（ブラウザをリロードすると元に戻ります）
let logs: StudyLog[] = [
    {
        id: "1",
        date: "2026-10-06",
        minutes: 60,
        content: "AWSアカウント作成、ルートユーザーのMFA設定、IAMユーザー作成",
        tags: ["AWS"],
        createdAt: "2026-10-06T21:00:00.000Z",
        updatedAt: "2026-10-06T21:00:00.000Z",
    },
    {
        id: "2",
        date: "2026-10-11",
        minutes: 90,
        content: "Next.jsプロジェクト作成、GitHubにpush、MSWの導入",
        tags: ["Next.js", "MSW"],
        createdAt: "2026-10-11T19:00:00.000Z",
        updatedAt: "2026-10-11T19:00:00.000Z",
    },
];

export const handlers = [
    // 一覧取得：GET /logs が来たら、日付の新しい順で返す
    http.get(`${API_URL}/logs`, async () => {
        await delay(300);
        const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));
        return HttpResponse.json(sorted);
    }),

    // 登録：POST /logs が来たら、IDと日時を付けて追加する
    http.post(`${API_URL}/logs`, async ({ request }) => {
        await delay(300);
        const input = (await request.json()) as StudyLogInput;
        const now = new Date().toISOString();
        const newLog: StudyLog = {
            ...input,
            id: crypto.randomUUID(),
            createdAt: now,
            updatedAt: now,
        };
        logs = [...logs, newLog];
        return HttpResponse.json(newLog, { status: 201 });
    }),
];