import styles from "./TabContent.module.scss";

interface EmptyTabProps {
  message: string;
}

export function EmptyTab({ message }: EmptyTabProps) {
  return <p className={styles.empty}>{message}</p>;
}
