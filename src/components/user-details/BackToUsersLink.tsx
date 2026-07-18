import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

export function BackToUsersLink() {
  return (
    <Link
      href="/users"
      className="mb-6 flex w-fit items-center gap-2 text-base text-body transition-colors hover:text-primary"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      Back to Users
    </Link>
  );
}
