import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UsersTableBody } from "../UsersTableBody";
import type { User } from "@/types/user";

function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: "1",
    organization: "Lendsqr",
    username: "grace.effiom",
    email: "grace@lendsqr.com",
    phoneNumber: "07060780922",
    dateJoined: "2024-05-15T09:12:00.000Z",
    status: "active",
    fullName: "Grace Effiom",
    bvn: "07060780922",
    gender: "Female",
    maritalStatus: "Single",
    children: "None",
    residenceType: "Parent's Apartment",
    address: "1 Lendsqr Way",
    tier: 2,
    accountBalance: 200000,
    accountNumber: "0123456789",
    bankName: "Providus Bank",
    hasLoans: false,
    hasSavings: true,
    educationAndEmployment: {
      level: "B.Sc", employmentStatus: "Employed", sector: "FinTech", duration: "2 years",
      officeEmail: "grace@lendsqr.com", monthlyIncome: "₦200,000", loanRepayment: "40,000",
    },
    guarantors: [],
    socials: { twitter: "@grace", facebook: "Grace Effiom", instagram: "@grace" },
    ...overrides,
  };
}

function renderBody(props: Partial<Parameters<typeof UsersTableBody>[0]> = {}) {
  const onSelect = vi.fn();
  const onRetry = vi.fn();
  render(
    <table>
      <UsersTableBody
        users={[]}
        columnCount={7}
        isLoading={false}
        isError={false}
        onRetry={onRetry}
        onSelect={onSelect}
        {...props}
      />
    </table>,
  );
  return { onSelect, onRetry };
}

describe("while loading", () => {
  it("shows a loading indicator and no rows", () => {
    renderBody({ isLoading: true });
    expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();
    expect(screen.queryByText("Grace Effiom")).not.toBeInTheDocument();
  });
});

describe("when the request fails", () => {
  it("explains the failure and offers a retry", () => {
    renderBody({ isError: true });
    expect(screen.getByText(/couldn't load users/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  it("calls onRetry when the retry is pressed", async () => {
    const { onRetry } = renderBody({ isError: true });
    await userEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("prefers the error over the empty message", () => {
    renderBody({ isError: true, users: [] });
    expect(screen.queryByText(/no users match/i)).not.toBeInTheDocument();
  });
});

describe("when nothing matches the filters", () => {
  it("says so rather than showing a blank table", () => {
    renderBody({ users: [] });
    expect(screen.getByText(/no users match the selected filters/i)).toBeInTheDocument();
  });

  it("does not offer a retry, since nothing failed", () => {
    renderBody({ users: [] });
    expect(screen.queryByRole("button", { name: /try again/i })).not.toBeInTheDocument();
  });
});

describe("with rows", () => {
  it("renders one row per user", () => {
    renderBody({ users: [makeUser({ id: "1" }), makeUser({ id: "2", username: "tosin" })] });
    expect(screen.getAllByRole("row")).toHaveLength(2);
  });

  it("shows the fields the design lists", () => {
    renderBody({ users: [makeUser()] });
    expect(screen.getByText("Lendsqr")).toBeInTheDocument();
    expect(screen.getByText("grace.effiom")).toBeInTheDocument();
    expect(screen.getByText("grace@lendsqr.com")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("selects the user when the row is clicked", async () => {
    const user = makeUser();
    const { onSelect } = renderBody({ users: [user] });
    await userEvent.click(screen.getByText("grace.effiom"));
    expect(onSelect).toHaveBeenCalledWith(user);
  });

  it("shows neither the empty nor the error message", () => {
    renderBody({ users: [makeUser()] });
    expect(screen.queryByText(/no users match/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/couldn't load/i)).not.toBeInTheDocument();
  });
});
