import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { pageTiming, pageVariants, resolveTransitionKind } from "./transitions";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const router = useRouter();
  const [previousPath, setPreviousPath] = useState(router.pathname);
  const kind = resolveTransitionKind(previousPath, router.pathname);

  useEffect(() => {
    const handleRouteChangeStart = () => setPreviousPath(router.pathname);
    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => router.events.off("routeChangeStart", handleRouteChangeStart);
  }, [router]);

  return (
    <AnimatePresence mode="popLayout" initial={false} custom={kind}>
      <motion.div
        key={router.pathname}
        custom={kind}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTiming(kind)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
