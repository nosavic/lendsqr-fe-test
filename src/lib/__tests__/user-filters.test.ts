import { describe, expect, it } from "vitest";
import {
  EMPTY_USER_FILTERS,
  activeFilters,
  clearFilterField,
  countActiveFilters,
  filterUsers,
  filtersToSearchParams,
  uniqueOrganizations,
} from "@/lib/user-filters";
import type { UserFilters } from "@/lib/user-filters";
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
      level: "B.Sc",
      employmentStatus: "Employed",
      sector: "FinTech",
      duration: "2 years",
      officeEmail: "grace@lendsqr.com",
      monthlyIncome: "₦200,000.00 - ₦400,000.00",
      loanRepayment: "40,000",
    },
    guarantors: [],
    socials: { twitter: "@grace", facebook: "Grace Effiom", instagram: "@grace" },
    ...overrides,
  };
}

const users = [
  makeUser({ id: "1" }),
  makeUser({
    id: "2",
    organization: "Irorun",
    username: "tosin.dokunmu",
    email: "tosin@irorun.com",
    phoneNumber: "08012345678",
    status: "blacklisted",
    dateJoined: "2023-11-02T18:40:00.000Z",
  }),
];

describe("filterUsers", () => {
  it("returns every user when no filter is set", () => {
    expect(filterUsers(users, EMPTY_USER_FILTERS)).toHaveLength(2);
  });

  it("matches organisation exactly", () => {
    const result = filterUsers(users, { ...EMPTY_USER_FILTERS, organization: "Irorun" });
    expect(result.map((user) => user.id)).toEqual(["2"]);
  });

  it("does not match an organisation that only partially matches", () => {
    expect(filterUsers(users, { ...EMPTY_USER_FILTERS, organization: "Iro" })).toEqual([]);
  });

  it("matches username on a case-insensitive fragment", () => {
    const result = filterUsers(users, { ...EMPTY_USER_FILTERS, username: "TOSIN" });
    expect(result.map((user) => user.id)).toEqual(["2"]);
  });

  it("matches email on a fragment rather than the whole address", () => {
    const result = filterUsers(users, { ...EMPTY_USER_FILTERS, email: "lendsqr.com" });
    expect(result.map((user) => user.id)).toEqual(["1"]);
  });

  it("returns nothing when a fragment matches no one", () => {
    expect(filterUsers(users, { ...EMPTY_USER_FILTERS, email: "nobody@example.com" })).toEqual([]);
  });

  it("matches status exactly", () => {
    expect(filterUsers(users, { ...EMPTY_USER_FILTERS, status: "blacklisted" })).toHaveLength(1);
  });

  it("matches a date by its day prefix, ignoring the time", () => {
    const result = filterUsers(users, { ...EMPTY_USER_FILTERS, date: "2024-05-15" });
    expect(result.map((user) => user.id)).toEqual(["1"]);
  });

  it("returns nothing for a day with no records", () => {
    expect(filterUsers(users, { ...EMPTY_USER_FILTERS, date: "2024-05-16" })).toEqual([]);
  });

  it("requires every active filter to match, not just one", () => {
    const filters: UserFilters = { ...EMPTY_USER_FILTERS, organization: "Lendsqr", status: "blacklisted" };
    expect(filterUsers(users, filters)).toEqual([]);
  });
});

describe("activeFilters", () => {
  it("is empty when nothing is set", () => {
    expect(activeFilters(EMPTY_USER_FILTERS)).toEqual([]);
    expect(countActiveFilters(EMPTY_USER_FILTERS)).toBe(0);
  });

  it("reports only the fields that carry a value, with their labels", () => {
    const filters = { ...EMPTY_USER_FILTERS, email: "grace", status: "active" as const };
    expect(activeFilters(filters)).toEqual([
      { field: "email", label: "Email", value: "grace" },
      { field: "status", label: "Status", value: "active" },
    ]);
    expect(countActiveFilters(filters)).toBe(2);
  });
});

describe("clearFilterField", () => {
  it("clears one field and leaves the others alone", () => {
    const filters = { ...EMPTY_USER_FILTERS, email: "grace", username: "grace" };
    expect(clearFilterField(filters, "email")).toEqual({ ...EMPTY_USER_FILTERS, username: "grace" });
  });
});

describe("filtersToSearchParams", () => {
  it("omits empty fields so the query string stays clean", () => {
    const params = filtersToSearchParams({ ...EMPTY_USER_FILTERS, username: "grace" });
    expect(params.toString()).toBe("username=grace");
  });

  it("includes every field that has a value", () => {
    const params = filtersToSearchParams({ ...EMPTY_USER_FILTERS, email: "a@b.com", status: "pending" });
    expect(params.get("email")).toBe("a@b.com");
    expect(params.get("status")).toBe("pending");
  });
});

describe("uniqueOrganizations", () => {
  it("de-duplicates and sorts", () => {
    const list = [...users, makeUser({ id: "3", organization: "Irorun" })];
    expect(uniqueOrganizations(list)).toEqual(["Irorun", "Lendsqr"]);
  });
});
