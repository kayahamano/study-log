// サーバー側で msw/browser の代わりに読み込まれるダミー
// （サーバーでは門番を起動しないので、呼ばれることはない）
export function setupWorker(): never {
    throw new Error("msw/browser is browser-only");
}