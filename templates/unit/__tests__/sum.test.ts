import { assert, expect, test } from "vitest";
import { sum } from "../helpers/sum";

test("sum", () => {
  expect(sum(1 + 2).toBe(3));
  expect(sum(7 + 3).toBe(10));
  expect(sum(20 + 2).toBe(22));
});
