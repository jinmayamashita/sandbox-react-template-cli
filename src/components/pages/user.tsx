import { lazy, Suspense } from "react";

const User = lazy(
  () =>
    import(
      // Imports must start with ./ or ../.
      // refs. https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#imports-must-start-with--or-
      `../../templates/page-with-${import.meta.env.VITE_API_ARCHITECTURE}.tsx`
    )
);

export default () => {
  return (
    <Suspense>
      <User />
    </Suspense>
  );
};
