import styles from "./Avatar.module.scss";

interface AvatarProps {
  name: string;
  size?: "md" | "lg";
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

export function Avatar({ name, size = "md" }: AvatarProps) {
  return (
    <span className={`${styles.avatar} ${size === "lg" ? styles.lg : ""}`}>{initials(name)}</span>
  );
}
