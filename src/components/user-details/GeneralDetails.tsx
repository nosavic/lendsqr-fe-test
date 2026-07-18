import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { InfoField } from "@/components/user-details/InfoField";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { User } from "@/types/user";

const containerVariants = staggerContainer(0.1);
const sectionVariants = fadeInUp(12, 0.25);
const fieldGridVariants = staggerContainer(0.04);
const fieldVariants = fadeInUp(6, 0.2);

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <motion.section
      variants={sectionVariants}
      className="border-b border-body/20 pb-6 last:border-b-0 last:pb-0"
    >
      <h2 className="text-base font-medium text-primary">{title}</h2>
      <motion.div
        variants={fieldGridVariants}
        className="mt-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <motion.div variants={fieldVariants}>
      <InfoField label={label} value={value} />
    </motion.div>
  );
}

interface GeneralDetailsProps {
  user: User;
}

export function GeneralDetails({ user }: GeneralDetailsProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex flex-col gap-6">
      <Section title="Personal Information">
        <Field label="Full Name" value={user.fullName} />
        <Field label="Phone Number" value={user.phoneNumber} />
        <Field label="Email Address" value={user.email} />
        <Field label="BVN" value={user.bvn} />
        <Field label="Gender" value={user.gender} />
        <Field label="Marital Status" value={user.maritalStatus} />
        <Field label="Children" value={user.children} />
        <Field label="Type of Residence" value={user.residenceType} />
      </Section>

      <Section title="Education and Employment">
        <Field label="Level of Education" value={user.educationAndEmployment.level} />
        <Field label="Employment Status" value={user.educationAndEmployment.employmentStatus} />
        <Field label="Sector of Employment" value={user.educationAndEmployment.sector} />
        <Field label="Duration of Employment" value={user.educationAndEmployment.duration} />
        <Field label="Office Email" value={user.educationAndEmployment.officeEmail} />
        <Field label="Monthly Income" value={user.educationAndEmployment.monthlyIncome} />
        <Field label="Loan Repayment" value={user.educationAndEmployment.loanRepayment} />
      </Section>

      <Section title="Socials">
        <Field label="Twitter" value={user.socials.twitter} />
        <Field label="Facebook" value={user.socials.facebook} />
        <Field label="Instagram" value={user.socials.instagram} />
      </Section>

      <Section title="Guarantor">
        <Field label="Full Name" value={user.guarantor.fullName} />
        <Field label="Phone Number" value={user.guarantor.phoneNumber} />
        <Field label="Email Address" value={user.guarantor.email} />
        <Field label="Relationship" value={user.guarantor.relationship} />
      </Section>
    </motion.div>
  );
}
