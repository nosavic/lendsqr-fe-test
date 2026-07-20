import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { User } from "@/types/user";

const ENDPOINT = "https://example.test/users.json";

function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: "1", organization: "Lendsqr", username: "grace", email: "grace@lendsqr.com",
    phoneNumber: "07060780922", dateJoined: "2024-05-15T09:12:00.000Z", status: "active",
    fullName: "Grace Effiom", bvn: "07060780922", gender: "Female", maritalStatus: "Single",
    children: "None", residenceType: "Rented", address: "1 Way", tier: 2, accountBalance: 1,
    accountNumber: "0123456789", bankName: "Providus", hasLoans: false, hasSavings: true,
    educationAndEmployment: {
      level: "B.Sc", employmentStatus: "Employed", sector: "FinTech", duration: "2 years",
      officeEmail: "g@work.com", monthlyIncome: "₦1", loanRepayment: "1",
    },
    guarantors: [], socials: { twitter: "@g", facebook: "G", instagram: "@g" },
    ...overrides,
  };
}

function mockFetchOnce(payload: unknown, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({ ok, status: ok ? 200 : 502, json: async () => payload });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function freshModule() {
  vi.resetModules();
  return import("@/lib/users-api");
}

beforeEach(() => {
  vi.stubEnv("USERS_API_URL", ENDPOINT);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("when the endpoint is not configured", () => {
  it("fails with a message naming the variable", async () => {
    vi.stubEnv("USERS_API_URL", "");
    mockFetchOnce([makeUser()]);
    const { getAllUsers } = await freshModule();
    await expect(getAllUsers()).rejects.toThrow(/USERS_API_URL/);
  });
});

describe("when the request fails", () => {
  it("surfaces the status rather than returning nothing", async () => {
    mockFetchOnce(null, false);
    const { getAllUsers } = await freshModule();
    await expect(getAllUsers()).rejects.toThrow(/502/);
  });

  it("rejects an empty dataset instead of reporting zero users", async () => {
    mockFetchOnce([]);
    const { getAllUsers } = await freshModule();
    await expect(getAllUsers()).rejects.toThrow(/no records/i);
  });
});

describe("reading the dataset", () => {
  it("returns the records", async () => {
    mockFetchOnce([makeUser({ id: "1" }), makeUser({ id: "2" })]);
    const { getAllUsers } = await freshModule();
    expect(await getAllUsers()).toHaveLength(2);
  });

  it("accepts a payload wrapped in a data property", async () => {
    mockFetchOnce({ data: [makeUser()] });
    const { getAllUsers } = await freshModule();
    expect(await getAllUsers()).toHaveLength(1);
  });

  it("fetches once and serves later calls from cache", async () => {
    const fetchMock = mockFetchOnce([makeUser()]);
    const { getAllUsers } = await freshModule();
    await getAllUsers();
    await getAllUsers();
    await getAllUsers();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("shares one request when callers arrive together", async () => {
    const fetchMock = mockFetchOnce([makeUser()]);
    const { getAllUsers, getUserStats, getOrganizations } = await freshModule();
    await Promise.all([getAllUsers(), getUserStats(), getOrganizations()]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("derived views", () => {
  it("finds a user by id", async () => {
    mockFetchOnce([makeUser({ id: "1" }), makeUser({ id: "2", fullName: "Tosin" })]);
    const { getUserById } = await freshModule();
    expect((await getUserById("2"))?.fullName).toBe("Tosin");
  });

  it("returns undefined for an id that is not present", async () => {
    mockFetchOnce([makeUser({ id: "1" })]);
    const { getUserById } = await freshModule();
    expect(await getUserById("999")).toBeUndefined();
  });

  it("counts the dashboard totals", async () => {
    mockFetchOnce([
      makeUser({ id: "1", status: "active", hasLoans: true, hasSavings: false }),
      makeUser({ id: "2", status: "blacklisted", hasLoans: false, hasSavings: true }),
      makeUser({ id: "3", status: "active", hasLoans: true, hasSavings: true }),
    ]);
    const { getUserStats } = await freshModule();
    expect(await getUserStats()).toEqual({ total: 3, active: 2, withLoans: 2, withSavings: 2 });
  });

  it("lists organisations without duplicates", async () => {
    mockFetchOnce([
      makeUser({ id: "1", organization: "Lendsqr" }),
      makeUser({ id: "2", organization: "Irorun" }),
      makeUser({ id: "3", organization: "Lendsqr" }),
    ]);
    const { getOrganizations } = await freshModule();
    expect(await getOrganizations()).toEqual(["Irorun", "Lendsqr"]);
  });
});
