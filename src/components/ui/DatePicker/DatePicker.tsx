import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarIcon, ChevronDownIcon } from "@/components/icons";
import {
  WEEKDAY_LABELS,
  addDays,
  addMonths,
  daysInMonth,
  firstWeekdayOfMonth,
  formatDisplayDate,
  formatMonthLabel,
  isSameDate,
  parseISODate,
  toISODate,
  today,
} from "./calendar";
import type { CalendarDate } from "./calendar";
import styles from "./DatePicker.module.scss";

interface DatePickerProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export function DatePicker({ label, value, placeholder = "Select date", onChange, ...rest }: DatePickerProps) {
  const selected = parseISODate(value);
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState<CalendarDate>(selected ?? today());
  const gridRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const fieldId = useId();

  useEffect(() => {
    if (!open) return;
    gridRef.current?.querySelector<HTMLButtonElement>('[data-focusable="true"]')?.focus({ preventScroll: true });
  }, [open, cursor.year, cursor.month, cursor.day]);

  function close(returnFocus = true) {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }

  function select(day: number) {
    onChange(toISODate({ ...cursor, day }));
    close();
  }

  function handleGridKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };

    if (event.key in moves) {
      event.preventDefault();
      setCursor((current) => addDays(current, moves[event.key]));
      return;
    }
    if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      setCursor((current) => addMonths(current, event.key === "PageUp" ? -1 : 1));
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(cursor.day);
    }
  }

  const totalDays = daysInMonth(cursor.year, cursor.month);
  const leadingBlanks = firstWeekdayOfMonth(cursor.year, cursor.month);
  const now = today();

  return (
    <div className={styles.field}>
      <span className={styles.label} id={`${fieldId}-label`}>
        {label}
      </span>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (open) {
            close(false);
            return;
          }
          setCursor(selected ?? today());
          setOpen(true);
        }}
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        aria-labelledby={`${fieldId}-label ${fieldId}-value`}
        aria-haspopup="dialog"
        aria-expanded={open}
        {...rest}
      >
        <span id={`${fieldId}-value`} className={value ? styles.valueText : styles.placeholder}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>
        <CalendarIcon className={styles.calendarIcon} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onAnimationComplete={() => {
              if (open) panelRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
            }}
            className={styles.panelWrap}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.stopPropagation();
                close();
              }
            }}
          >
            <div ref={panelRef} className={styles.panel} role="dialog" aria-label={`Choose ${label.toLowerCase()}`}>
              <div className={styles.header}>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => setCursor((current) => addMonths(current, -1))}
                  aria-label="Previous month"
                >
                  <ChevronDownIcon className={styles.prevIcon} />
                </button>
                <span className={styles.monthLabel} aria-live="polite">
                  {formatMonthLabel(cursor)}
                </span>
                <button
                  type="button"
                  className={styles.navButton}
                  onClick={() => setCursor((current) => addMonths(current, 1))}
                  aria-label="Next month"
                >
                  <ChevronDownIcon className={styles.nextIcon} />
                </button>
              </div>

              <div className={styles.weekdays} aria-hidden="true">
                {WEEKDAY_LABELS.map((weekday, index) => (
                  <span key={`${weekday}-${index}`}>{weekday}</span>
                ))}
              </div>

              <div className={styles.grid} ref={gridRef} onKeyDown={handleGridKeyDown}>
                {Array.from({ length: leadingBlanks }, (_, index) => (
                  <span key={`blank-${index}`} />
                ))}
                {Array.from({ length: totalDays }, (_, index) => {
                  const day = index + 1;
                  const date = { ...cursor, day };
                  const isSelected = isSameDate(selected, date);
                  const isToday = isSameDate(now, date);
                  const isCursor = cursor.day === day;

                  return (
                    <button
                      key={day}
                      type="button"
                      data-focusable={isCursor ? "true" : undefined}
                      tabIndex={isCursor ? 0 : -1}
                      onClick={() => select(day)}
                      aria-current={isSelected ? "date" : undefined}
                      className={`${styles.day} ${isSelected ? styles.selected : ""} ${isToday ? styles.today : ""}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className={styles.footer}>
                <button
                  type="button"
                  className={styles.footerButton}
                  onClick={() => {
                    onChange("");
                    close();
                  }}
                  disabled={!value}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className={styles.footerButton}
                  onClick={() => {
                    onChange(toISODate(now));
                    close();
                  }}
                >
                  Today
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
