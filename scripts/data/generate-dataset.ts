import { faker } from "@faker-js/faker";
import type { User, UserStatus } from "../../src/types/user";

const STATUSES: UserStatus[] = ["active", "inactive", "pending", "blacklisted"];
const RELATIONSHIPS = ["Sister", "Brother", "Mother", "Father", "Spouse", "Friend"];
const EDUCATION_LEVELS = ["B.Sc", "M.Sc", "HND", "OND", "PhD", "SSCE"];
const EMPLOYMENT_STATUSES = ["Employed", "Unemployed", "Self-Employed", "Student", "Retired"];
const SECTORS = ["FinTech", "Education", "Health", "Retail", "Oil and Gas", "Technology"];

function buildUser(index: number): User {
  const fullName = faker.person.fullName();
  const status = faker.helpers.arrayElement(STATUSES);

  return {
    id: (index + 1).toString(),
    organization: faker.company.name(),
    username: faker.internet.username({ firstName: fullName.split(" ")[0] }),
    email: faker.internet.email({ firstName: fullName.split(" ")[0] }),
    phoneNumber: faker.phone.number({ style: "national" }),
    dateJoined: faker.date.past({ years: 3 }).toISOString(),
    status,
    fullName,
    bvn: faker.string.numeric(11),
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    maritalStatus: faker.helpers.arrayElement(["Single", "Married", "Divorced"]),
    children: faker.helpers.arrayElement(["None", "1", "2", "3", "4+"]),
    residenceType: faker.helpers.arrayElement(["Parent's Apartment", "Rented Apartment", "Owned Apartment"]),
    address: faker.location.streetAddress({ useFullAddress: true }),
    tier: faker.number.int({ min: 1, max: 3 }),
    accountBalance: faker.number.int({ min: 1000, max: 900000 }),
    accountNumber: faker.finance.accountNumber(10),
    bankName: faker.company.name() + " Bank",
    hasLoans: faker.datatype.boolean(),
    hasSavings: faker.datatype.boolean(),
    educationAndEmployment: {
      level: faker.helpers.arrayElement(EDUCATION_LEVELS),
      employmentStatus: faker.helpers.arrayElement(EMPLOYMENT_STATUSES),
      sector: faker.helpers.arrayElement(SECTORS),
      duration: `${faker.number.int({ min: 1, max: 10 })} years`,
      officeEmail: faker.internet.email({ firstName: fullName.split(" ")[0], provider: "work.com" }),
      monthlyIncome: `₦${faker.number.int({ min: 100, max: 800 })},000.00 - ₦${faker.number.int({ min: 801, max: 1200 })},000.00`,
      loanRepayment: `₦${faker.number.int({ min: 10, max: 100 })},000`,
    },
    guarantors: Array.from({ length: 2 }, () => ({
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number({ style: "national" }),
      email: faker.internet.email(),
      relationship: faker.helpers.arrayElement(RELATIONSHIPS),
    })),
    socials: {
      twitter: `@${faker.internet.username()}`,
      facebook: fullName,
      instagram: `@${faker.internet.username()}`,
    },
  };
}

function generateUsers(count: number): User[] {
  faker.seed(20260716);
  return Array.from({ length: count }, (_, index) => buildUser(index));
}

export const mockUsers = generateUsers(500);
