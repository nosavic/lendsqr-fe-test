import { beforeEach, describe, expect, it } from "vitest";
import { clearLegacyCachedUsers, readCachedUser, writeCachedUser } from "@/lib/user-storage";
import type { User } from "@/types/user";

const CURRENT_KEY = "lendsqr.user.v2.";
const LEGACY_KEY = "lendsqr.user.";

function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: "7",
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
    guarantors: [{ fullName: "Debby Ogana", phoneNumber: "07060780922", email: "debby@gmail.com", relationship: "Sister" }],
    socials: { twitter: "@grace", facebook: "Grace Effiom", instagram: "@grace" },
    ...overrides,
  };
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("writeCachedUser / readCachedUser", () => {
  it("returns null when nothing is stored", () => {
    expect(readCachedUser("7")).toBeNull();
  });

  it("reads back a user that was written", () => {
    const user = makeUser();
    writeCachedUser(user);
    expect(readCachedUser("7")).toEqual(user);
  });

  it("keeps users separate by id", () => {
    writeCachedUser(makeUser({ id: "7" }));
    writeCachedUser(makeUser({ id: "8", fullName: "Tosin Dokunmu" }));
    expect(readCachedUser("8")?.fullName).toBe("Tosin Dokunmu");
    expect(readCachedUser("9")).toBeNull();
  });
});

describe("reading a record that does not match the current shape", () => {
  it("discards a record saved before guarantors became a list", () => {
    const legacyShape: Record<string, unknown> = { ...makeUser() };
    delete legacyShape.guarantors;
    legacyShape.guarantor = { fullName: "Debby Ogana" };
    window.localStorage.setItem(`${CURRENT_KEY}7`, JSON.stringify(legacyShape));

    expect(readCachedUser("7")).toBeNull();
  });

  it("removes the unusable record so it is not read again", () => {
    window.localStorage.setItem(`${CURRENT_KEY}7`, JSON.stringify({ id: "7" }));
    readCachedUser("7");
    expect(window.localStorage.getItem(`${CURRENT_KEY}7`)).toBeNull();
  });

  it("survives malformed JSON", () => {
    window.localStorage.setItem(`${CURRENT_KEY}7`, "{ not json");
    expect(readCachedUser("7")).toBeNull();
  });

  it.each([
    ["a primitive", JSON.stringify("just a string")],
    ["null", JSON.stringify(null)],
    ["an empty object", JSON.stringify({})],
  ])("rejects %s", (_label, stored) => {
    window.localStorage.setItem(`${CURRENT_KEY}7`, stored);
    expect(readCachedUser("7")).toBeNull();
  });
});

describe("clearLegacyCachedUsers", () => {
  it("removes entries written under the previous key", () => {
    window.localStorage.setItem(`${LEGACY_KEY}1`, JSON.stringify({ id: "1" }));
    window.localStorage.setItem(`${LEGACY_KEY}2`, JSON.stringify({ id: "2" }));

    clearLegacyCachedUsers();

    expect(window.localStorage.getItem(`${LEGACY_KEY}1`)).toBeNull();
    expect(window.localStorage.getItem(`${LEGACY_KEY}2`)).toBeNull();
  });

  it("leaves current entries and unrelated keys alone", () => {
    writeCachedUser(makeUser());
    window.localStorage.setItem("lendsqr-theme", "dark");

    clearLegacyCachedUsers();

    expect(readCachedUser("7")).not.toBeNull();
    expect(window.localStorage.getItem("lendsqr-theme")).toBe("dark");
  });
});
