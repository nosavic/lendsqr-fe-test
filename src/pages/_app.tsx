import "@/styles/globals.css";
import { useEffect, useState } from "react";
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Work_Sans, Montserrat } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
});

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type TransitionKind = "drill-forward" | "drill-back" | "fade";

function getTransitionKind(fromPath: string, toPath: string): TransitionKind {
  const isUsersList = (path: string) => path === "/users";
  const isUserDetail = (path: string) => path === "/users/[id]";

  if (isUsersList(fromPath) && isUserDetail(toPath)) return "drill-forward";
  if (isUserDetail(fromPath) && isUsersList(toPath)) return "drill-back";
  return "fade";
}

const pageVariants: Variants = {
  initial: (kind: TransitionKind) => {
    if (kind === "drill-forward") return { opacity: 0, x: 48, scale: 0.98 };
    if (kind === "drill-back") return { opacity: 0, x: -48, scale: 0.98 };
    return { opacity: 0, y: 8 };
  },
  animate: { opacity: 1, x: 0, y: 0, scale: 1 },
  exit: (kind: TransitionKind) => {
    if (kind === "drill-forward") return { opacity: 0, x: -32, scale: 0.97 };
    if (kind === "drill-back") return { opacity: 0, x: 32, scale: 0.97 };
    return { opacity: 0, y: -8 };
  },
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  const shellKey = Component.getLayout ? "app-shell" : "public";

  const [prevPath, setPrevPath] = useState(router.pathname);
  const transitionKind = getTransitionKind(prevPath, router.pathname);

  useEffect(() => {
    const handleRouteChangeStart = () => setPrevPath(router.pathname);
    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => router.events.off("routeChangeStart", handleRouteChangeStart);
  }, [router]);

  const pageContent = (
    <AnimatePresence mode="popLayout" initial={false} custom={transitionKind}>
      <motion.div
        key={router.pathname}
        custom={transitionKind}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={
          transitionKind === "fade"
            ? { duration: 0.2, ease: "easeOut" }
            : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }
        }
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className={`${workSans.variable} ${montserrat.variable} font-sans text-body`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={shellKey}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {getLayout(pageContent)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
