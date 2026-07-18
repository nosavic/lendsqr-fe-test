interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-secondary/30 border-t-secondary ${className ?? "h-6 w-6"}`}
      role="status"
      aria-label="Loading"
    />
  );
}
