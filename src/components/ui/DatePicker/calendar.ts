export interface CalendarDate {
  year: number;
  month: number;
  day: number;
}

const pad = (value: number) => String(value).padStart(2, "0");

export function toISODate({ year, month, day }: CalendarDate): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export function parseISODate(value: string): CalendarDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [, year, month, day] = match.map(Number);
  if (month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month - 1)) return null;

  return { year, month: month - 1, day };
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function firstWeekdayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function addMonths({ year, month, day }: CalendarDate, delta: number): CalendarDate {
  const shifted = new Date(year, month + delta, 1);
  const nextYear = shifted.getFullYear();
  const nextMonth = shifted.getMonth();
  return { year: nextYear, month: nextMonth, day: Math.min(day, daysInMonth(nextYear, nextMonth)) };
}

export function addDays(date: CalendarDate, delta: number): CalendarDate {
  const shifted = new Date(date.year, date.month, date.day + delta);
  return { year: shifted.getFullYear(), month: shifted.getMonth(), day: shifted.getDate() };
}

export function isSameDate(a: CalendarDate | null, b: CalendarDate | null): boolean {
  return !!a && !!b && a.year === b.year && a.month === b.month && a.day === b.day;
}

export function today(): CalendarDate {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
}

export function formatMonthLabel({ year, month }: CalendarDate): string {
  return new Date(year, month, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export function formatDisplayDate(value: string): string {
  const parsed = parseISODate(value);
  if (!parsed) return "";
  return new Date(parsed.year, parsed.month, parsed.day).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
