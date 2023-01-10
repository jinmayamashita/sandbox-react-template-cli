import { useFoo } from "../hooks/useFoo";

export default function Foo() {
  const foo = useFoo();

  return <>{foo}</>;
}
