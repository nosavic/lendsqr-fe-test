import Image from "next/image";
import { UserPlaceholderIcon } from "@/components/icons";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  name: string;
  size?: "md" | "lg";
  src?: string;
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

export function Avatar({ name, size = "md", src, placeholder }: AvatarProps) {
  const classes = `${styles.avatar} ${size === "lg" ? styles.lg : ""}`;

  if (src) {
    return (
      <span className={classes}>
        <Image src={src} alt={name} width={96} height={96} className={styles.image} />
      </span>
    );
  }

  if (placeholder) {
    return (
      <span className={classes} role="img" aria-label={name}>
        <UserPlaceholderIcon className={styles.placeholderIcon} />
      </span>
    );
  }

  return <span className={classes}>{initials(name)}</span>;
}
