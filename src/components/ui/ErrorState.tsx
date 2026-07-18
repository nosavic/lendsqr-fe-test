import { motion } from "framer-motion";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center"
    >
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <p className="max-w-md text-sm text-body">{message}</p>
      {onRetry && (
        <motion.button
          type="button"
          onClick={onRetry}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 rounded-md bg-secondary px-5 py-2 text-sm font-semibold text-white hover:bg-secondary-hover"
        >
          Try again
        </motion.button>
      )}
    </motion.div>
  );
}
