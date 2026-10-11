"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

// 門番の起動は1回だけにする（開発中は useEffect が2回動くことがあるため）
let mockingPromise: Promise<unknown> | null = null;
function enableMocking() {
    if (!mockingPromise) {
        mockingPromise = import("@/mocks/browser").then(({ worker }) =>
            // ルールにないリクエスト（画像やNext.js自体の通信など）は素通りさせる
            worker.start({ onUnhandledFrame: "bypass" }),
        );
    }
    return mockingPromise;
}

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    // MSWを使わないときは最初から準備OK
    const [isReady, setIsReady] = useState(!isMockingEnabled);

    useEffect(() => {
        if (!isMockingEnabled) return;
        enableMocking().then(() => setIsReady(true));
    }, []);

    // 門番の起動が終わるまでは何も表示しない
    if (!isReady) return null;

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}