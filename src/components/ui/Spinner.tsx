import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: "sm" | "lg";
  centered?: boolean;
}

export function Spinner({ size = "sm", centered }: SpinnerProps) {
  const classes = [styles.spinner, styles[size], centered ? styles.centered : ""]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} role="status" aria-label="Loading" />;
}
