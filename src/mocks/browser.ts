import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// さっき書いたルール（handlers）を持った門番を作る
export const worker = setupWorker(...handlers);