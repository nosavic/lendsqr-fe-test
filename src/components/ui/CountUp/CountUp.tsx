import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

interface CountUpProps {
  value: number;
  duration?: number;
  delay?: number;
}

export function CountUp({ value, duration = 1.4, delay = 0 }: CountUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const display = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (prefersReducedMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, { duration, delay, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [count, value, duration, delay, prefersReducedMotion]);

  return <motion.span>{display}</motion.span>;
}
