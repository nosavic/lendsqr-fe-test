import "@/styles/globals.css";
import "@/styles/globals.scss";
import type { ReactElement } from "react";
import type { AppProps } from "next/app";
import { Work_Sans, Montserrat } from "next/font/google";
import { PageTransition, ShellTransition } from "@/components/layout";
import type { NextPageWithLayout } from "@/types/next-page";

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

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  const shellKey = Component.getLayout ? "app-shell" : "public";

  return (
    <div className={`${workSans.variable} ${montserrat.variable} font-sans text-body`}>
      <ShellTransition shellKey={shellKey}>
        {getLayout(
          <PageTransition>
            <Component {...pageProps} />
          </PageTransition>,
        )}
      </ShellTransition>
    </div>
  );
}
