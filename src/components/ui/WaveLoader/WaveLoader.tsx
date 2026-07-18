import styles from "./WaveLoader.module.scss";

const WAVE_PATH = "M0 12 Q10 4 20 12 T40 12 T60 12 T80 12 T100 12 T120 12";

interface WaveLoaderProps {
  label?: string;
}

export function WaveLoader({ label = "Loading" }: WaveLoaderProps) {
  return (
    <span className={styles.wave} role="status" aria-label={label}>
      <svg className={styles.svg} viewBox="0 0 120 24" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.path} d={WAVE_PATH} vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}
