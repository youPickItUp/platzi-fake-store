import { describe, expect, it } from "vitest";
import { sortByToComparator } from "./utils";

describe("Test title comparator", () => {
  const cmpProductsByTitles = sortByToComparator["title"];
  it("should use alphabetic order not ascii codes values", () => {
    expect(cmpProductsByTitles({ title: "a" }, { title: "B" })).toBeLessThan(0);
    expect(cmpProductsByTitles({ title: "A" }, { title: "B" })).toBeLessThan(0);
  });
});
