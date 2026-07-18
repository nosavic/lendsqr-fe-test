export type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

export interface UserStats {
  total: number;
  active: number;
  withLoans: number;
  withSavings: number;
}

export interface UserEducationAndEmployment {
  level: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
}

export interface UserGuarantor {
  fullName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
}

export interface UserSocials {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  fullName: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  residenceType: string;
  address: string;
  tier: number;
  accountBalance: number;
  accountNumber: string;
  bankName: string;
  hasLoans: boolean;
  hasSavings: boolean;
  educationAndEmployment: UserEducationAndEmployment;
  guarantor: UserGuarantor;
  socials: UserSocials;
}
