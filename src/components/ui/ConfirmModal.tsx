import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onCancel}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-4"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm rounded-lg bg-surface p-6 shadow-xl"
          >
            <h2 id="confirm-modal-title" className="text-lg font-semibold text-primary">
              {title}
            </h2>
            {description && <p className="mt-2 text-sm text-body">{description}</p>}

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline-secondary" className="h-10" onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button variant="outline-danger" className="h-10" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
