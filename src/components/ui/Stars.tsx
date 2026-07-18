import { StarIcon } from "@/components/icons";
import styles from "./Stars.module.scss";

interface StarsProps {
  value: number;
  max?: number;
}

export function Stars({ value, max = 3 }: StarsProps) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: max }).map((_, index) => (
        <StarIcon key={index} className={`${styles.star} ${index < value ? styles.filled : ""}`} />
      ))}
    </div>
  );
}
