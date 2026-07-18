import { UserPlaceholderIcon } from "@/components/icons";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  name: string;
  size?: "md" | "lg";
  placeholder?: boolean;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ name, size = "md", placeholder }: AvatarProps) {
  const classes = `${styles.avatar} ${size === "lg" ? styles.lg : ""}`;

  if (placeholder) {
    return (
      <span className={classes} role="img" aria-label={name}>
        <UserPlaceholderIcon className={styles.placeholderIcon} />
      </span>
    );
  }

  return <span className={classes}>{initials(name)}</span>;
}
