import { lazy } from "react";

export default lazy(
  () => import(`./apps/${import.meta.env.VITE_API_ARCHITECTURE}-app/app.tsx`)
);
