import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "../DatePicker";

function renderPicker(value = "") {
  const onChange = vi.fn();
  render(<DatePicker label="Date" value={value} onChange={onChange} />);
  return { onChange };
}

const openCalendar = async () => {
  await userEvent.click(screen.getByRole("button", { name: /date/i }));
  return screen.getByRole("dialog", { name: /choose date/i });
};

describe("closed state", () => {
  it("shows a placeholder when no date is chosen", () => {
    renderPicker();
    expect(screen.getByText(/select date/i)).toBeInTheDocument();
  });

  it("shows the chosen date in a readable form, not the raw value", () => {
    renderPicker("2025-04-30");
    expect(screen.getByText(/Apr 30, 2025/)).toBeInTheDocument();
    expect(screen.queryByText("2025-04-30")).not.toBeInTheDocument();
  });

  it("keeps the calendar closed until asked", () => {
    renderPicker();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("choosing a date", () => {
  it("emits a zero-padded YYYY-MM-DD for the day that was clicked", async () => {
    const { onChange } = renderPicker("2025-04-15");
    const dialog = await openCalendar();
    await userEvent.click(within(dialog).getByRole("button", { name: "7" }));
    expect(onChange).toHaveBeenCalledWith("2025-04-07");
  });

  it("emits the clicked day itself, with no timezone drift", async () => {
    const { onChange } = renderPicker("2025-01-01");
    const dialog = await openCalendar();
    await userEvent.click(within(dialog).getByRole("button", { name: "1" }));
    expect(onChange).toHaveBeenCalledWith("2025-01-01");
  });

  it("closes once a day is chosen", async () => {
    renderPicker("2025-04-15");
    const dialog = await openCalendar();
    await userEvent.click(within(dialog).getByRole("button", { name: "7" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});

describe("moving between months", () => {
  it("steps back a month", async () => {
    renderPicker("2025-04-15");
    const dialog = await openCalendar();
    await userEvent.click(within(dialog).getByRole("button", { name: /previous month/i }));
    expect(within(dialog).getByText(/March 2025/)).toBeInTheDocument();
  });

  it("steps forward across a year boundary", async () => {
    renderPicker("2025-12-15");
    const dialog = await openCalendar();
    await userEvent.click(within(dialog).getByRole("button", { name: /next month/i }));
    expect(within(dialog).getByText(/January 2026/)).toBeInTheDocument();
  });

  it("shows the right number of days for a leap February", async () => {
    renderPicker("2024-02-10");
    const dialog = await openCalendar();
    expect(within(dialog).getByRole("button", { name: "29" })).toBeInTheDocument();
  });

  it("has no 29th in a non-leap February", async () => {
    renderPicker("2025-02-10");
    const dialog = await openCalendar();
    expect(within(dialog).queryByRole("button", { name: "29" })).not.toBeInTheDocument();
  });
});

describe("keyboard and clearing", () => {
  it("closes on Escape without choosing anything", async () => {
    const { onChange } = renderPicker("2025-04-15");
    await openCalendar();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(onChange).not.toHaveBeenCalled();
  });

  it("clears the value", async () => {
    const { onChange } = renderPicker("2025-04-15");
    const dialog = await openCalendar();
    await userEvent.click(within(dialog).getByRole("button", { name: /clear/i }));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("cannot clear when there is nothing set", async () => {
    renderPicker();
    const dialog = await openCalendar();
    expect(within(dialog).getByRole("button", { name: /clear/i })).toBeDisabled();
  });
});
