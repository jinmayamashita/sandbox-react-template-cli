import { lazy } from "react";

const FooModule = lazy(() => import("../../modules/foo"));

export default function FooPage() {
  return <FooModule />;
}
