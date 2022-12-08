import { SetupWorkerApi } from "msw";

export const { worker } = (await import(
  `./${import.meta.env.VITE_API_ARCHITECTURE}-api.ts`
)) as { worker: SetupWorkerApi };
