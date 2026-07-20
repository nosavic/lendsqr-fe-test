import { describe, expect, it } from "vitest";
import { formatCurrency, formatDate } from "@/lib/format";

describe("formatCurrency", () => {
  it("renders an amount in naira", () => {
    const result = formatCurrency(200000);
    expect(result).toMatch(/200,000/);
    expect(result).toMatch(/₦|NGN/);
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toMatch(/0/);
  });

  it("groups large amounts", () => {
    expect(formatCurrency(53864)).toMatch(/53,864/);
  });
});

describe("formatDate", () => {
  it("renders a readable date and time", () => {
    const result = formatDate("2024-05-15T09:12:00.000Z");
    expect(result).toMatch(/May/);
    expect(result).toMatch(/2024/);
  });

  it("falls back to the raw value rather than throwing on an unparseable date", () => {
    expect(() => formatDate("not-a-date")).not.toThrow();
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });

  it("does not throw on an empty string", () => {
    expect(() => formatDate("")).not.toThrow();
  });
});
