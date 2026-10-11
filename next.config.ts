import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ↓ create-next-app が最初から入れていた設定（消してしまっていたもの）
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    // CSSファイルをTailwindで処理する設定
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
    // ↓ さっき追加した MSW 用の読み替え設定
    resolveAlias: {
      "msw/browser": {
        browser: "msw/browser",
        default: "./src/mocks/empty.ts",
      },
    },
  },
};

export default nextConfig;