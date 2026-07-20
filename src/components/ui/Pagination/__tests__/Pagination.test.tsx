import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../Pagination";

function renderPagination(overrides: Partial<Parameters<typeof Pagination>[0]> = {}) {
  const onPageChange = vi.fn();
  const onPageSizeChange = vi.fn();
  render(
    <Pagination
      page={1}
      totalPages={100}
      total={500}
      pageSize={5}
      pageSizeOptions={[5, 10, 20, 50]}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      {...overrides}
    />,
  );
  return { onPageChange, onPageSizeChange };
}

describe("Pagination", () => {
  it("reports the full result count, not the page size", () => {
    renderPagination();
    expect(screen.getByText(/out of 500/)).toBeInTheDocument();
  });

  it("disables the previous arrow on the first page", () => {
    renderPagination({ page: 1 });
    expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next page/i })).toBeEnabled();
  });

  it("disables the next arrow on the last page", () => {
    renderPagination({ page: 100 });
    expect(screen.getByRole("button", { name: /next page/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /previous page/i })).toBeEnabled();
  });

  it("moves forward when next is pressed", async () => {
    const { onPageChange } = renderPagination({ page: 3 });
    await userEvent.click(screen.getByRole("button", { name: /next page/i }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("moves back when previous is pressed", async () => {
    const { onPageChange } = renderPagination({ page: 3 });
    await userEvent.click(screen.getByRole("button", { name: /previous page/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("does not fire when a disabled arrow is pressed", async () => {
    const { onPageChange } = renderPagination({ page: 1 });
    await userEvent.click(screen.getByRole("button", { name: /previous page/i }));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("jumps to a numbered page", async () => {
    const { onPageChange } = renderPagination({ page: 1 });
    await userEvent.click(screen.getByRole("button", { name: "2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("marks the current page for assistive technology", () => {
    renderPagination({ page: 2 });
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "1" })).not.toHaveAttribute("aria-current");
  });

  it("changes the page size", async () => {
    const { onPageSizeChange } = renderPagination();
    await userEvent.selectOptions(screen.getByRole("combobox", { name: /rows per page/i }), "20");
    expect(onPageSizeChange).toHaveBeenCalledWith(20);
  });
});
