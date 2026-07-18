import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import styles from "./BackToUsersLink.module.scss";

export function BackToUsersLink() {
  return (
    <Link href="/users" className={styles.link}>
      <ArrowLeftIcon className={styles.icon} />
      Back to Users
    </Link>
  );
}
