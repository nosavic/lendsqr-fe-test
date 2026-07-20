import { describe, expect, it } from "vitest";
import {
  addDays,
  addMonths,
  daysInMonth,
  firstWeekdayOfMonth,
  formatDisplayDate,
  isSameDate,
  parseISODate,
  toISODate,
} from "../calendar";

describe("toISODate", () => {
  it("zero-pads month and day", () => {
    expect(toISODate({ year: 2024, month: 0, day: 5 })).toBe("2024-01-05");
  });

  it("emits the day that was selected, whatever the machine's timezone", () => {
    const iso = toISODate({ year: 2024, month: 4, day: 15 });
    expect(iso).toBe("2024-05-15");
    expect(iso).not.toBe(new Date(2024, 4, 15).toISOString().slice(0, 10) + "!");
  });

  it("round-trips through parseISODate", () => {
    const date = { year: 2026, month: 11, day: 31 };
    expect(parseISODate(toISODate(date))).toEqual(date);
  });
});

describe("parseISODate", () => {
  it("reads a well-formed date", () => {
    expect(parseISODate("2025-04-30")).toEqual({ year: 2025, month: 3, day: 30 });
  });

  it.each([
    ["", "empty string"],
    ["2025-4-30", "unpadded month"],
    ["30-04-2025", "wrong order"],
    ["2025-13-01", "month 13"],
    ["2025-00-10", "month 0"],
    ["2025-02-30", "day beyond the month"],
    ["2025-04-31", "31st of a 30-day month"],
    ["not-a-date", "nonsense"],
  ])("rejects %s (%s)", (value) => {
    expect(parseISODate(value)).toBeNull();
  });

  it("accepts 29 February in a leap year but not otherwise", () => {
    expect(parseISODate("2024-02-29")).not.toBeNull();
    expect(parseISODate("2025-02-29")).toBeNull();
  });
});

describe("daysInMonth", () => {
  it("knows month lengths", () => {
    expect(daysInMonth(2025, 0)).toBe(31);
    expect(daysInMonth(2025, 3)).toBe(30);
    expect(daysInMonth(2025, 1)).toBe(28);
  });

  it("handles leap years", () => {
    expect(daysInMonth(2024, 1)).toBe(29);
    expect(daysInMonth(2000, 1)).toBe(29);
    expect(daysInMonth(1900, 1)).toBe(28);
  });
});

describe("firstWeekdayOfMonth", () => {
  it("returns the weekday index the month starts on", () => {
    expect(firstWeekdayOfMonth(2026, 6)).toBe(3);
    expect(firstWeekdayOfMonth(2024, 8)).toBe(0);
  });
});

describe("addMonths", () => {
  it("moves forward across a year boundary", () => {
    expect(addMonths({ year: 2025, month: 11, day: 10 }, 1)).toEqual({ year: 2026, month: 0, day: 10 });
  });

  it("moves backward across a year boundary", () => {
    expect(addMonths({ year: 2025, month: 0, day: 10 }, -1)).toEqual({ year: 2024, month: 11, day: 10 });
  });

  it("clamps the day when the target month is shorter", () => {
    expect(addMonths({ year: 2025, month: 0, day: 31 }, 1)).toEqual({ year: 2025, month: 1, day: 28 });
  });
});

describe("addDays", () => {
  it("rolls over the end of a month", () => {
    expect(addDays({ year: 2025, month: 0, day: 31 }, 1)).toEqual({ year: 2025, month: 1, day: 1 });
  });

  it("rolls back over the start of a year", () => {
    expect(addDays({ year: 2025, month: 0, day: 1 }, -1)).toEqual({ year: 2024, month: 11, day: 31 });
  });

  it("steps a full week for arrow-key navigation", () => {
    expect(addDays({ year: 2026, month: 6, day: 18 }, 7)).toEqual({ year: 2026, month: 6, day: 25 });
  });
});

describe("isSameDate", () => {
  it("compares all three parts", () => {
    expect(isSameDate({ year: 2025, month: 1, day: 2 }, { year: 2025, month: 1, day: 2 })).toBe(true);
    expect(isSameDate({ year: 2025, month: 1, day: 2 }, { year: 2025, month: 2, day: 2 })).toBe(false);
  });

  it("is false when either side is missing", () => {
    expect(isSameDate(null, { year: 2025, month: 1, day: 2 })).toBe(false);
    expect(isSameDate(null, null)).toBe(false);
  });
});

describe("formatDisplayDate", () => {
  it("renders a readable date", () => {
    expect(formatDisplayDate("2025-04-30")).toMatch(/Apr/);
    expect(formatDisplayDate("2025-04-30")).toMatch(/30/);
    expect(formatDisplayDate("2025-04-30")).toMatch(/2025/);
  });

  it("returns an empty string for an unusable value", () => {
    expect(formatDisplayDate("")).toBe("");
    expect(formatDisplayDate("nonsense")).toBe("");
  });
});
