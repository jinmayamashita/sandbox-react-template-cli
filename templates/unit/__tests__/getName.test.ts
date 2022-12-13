import { assert, expect, test } from "vitest";
import { getName } from "../helpers/getName";

test("getName", () => {
  expect(getName().toBe("React"));
});
