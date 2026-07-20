import { describe, expect, it } from "vitest";
import { buildPageRange } from "@/lib/pagination";

describe("buildPageRange", () => {
  it("lists every page when there are few enough to show", () => {
    expect(buildPageRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a single page", () => {
    expect(buildPageRange(1, 1)).toEqual([1]);
  });

  it("keeps the first and last page visible on a long range", () => {
    const range = buildPageRange(50, 100);
    expect(range[0]).toBe(1);
    expect(range[range.length - 1]).toBe(100);
  });

  it("always includes the current page", () => {
    for (const page of [1, 2, 37, 99, 100]) {
      expect(buildPageRange(page, 100)).toContain(page);
    }
  });

  it("collapses the gap rather than listing every page", () => {
    const range = buildPageRange(50, 100);
    expect(range).toContain("ellipsis");
    expect(range.length).toBeLessThan(12);
  });

  it("never emits a page outside the range", () => {
    const numbers = buildPageRange(1, 100).filter((item): item is number => item !== "ellipsis");
    expect(Math.min(...numbers)).toBeGreaterThanOrEqual(1);
    expect(Math.max(...numbers)).toBeLessThanOrEqual(100);
  });

  it("never repeats a page", () => {
    const numbers = buildPageRange(50, 100).filter((item): item is number => item !== "ellipsis");
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("keeps pages in ascending order", () => {
    const numbers = buildPageRange(50, 100).filter((item): item is number => item !== "ellipsis");
    expect([...numbers].sort((a, b) => a - b)).toEqual(numbers);
  });
});
