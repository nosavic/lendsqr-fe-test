import { Html, Head, Main, NextScript } from "next/document";

const APPEARANCE_INIT_SCRIPT = `
(function () {
  try {
    var root = document.documentElement;

    var storedTheme = window.localStorage.getItem("lendsqr-theme");
    var theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") root.classList.add("dark");

    if (window.localStorage.getItem("lendsqr-sidebar-collapsed") === "collapsed") {
      root.classList.add("sidebar-collapsed");
    }
  } catch (e) {}
})();
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: APPEARANCE_INIT_SCRIPT }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
