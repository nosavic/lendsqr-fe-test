import Head from "next/head";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginIllustration } from "@/components/auth/LoginIllustration";
import styles from "./Login.module.scss";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | lendsqr</title>
      </Head>

      <div className={styles.page}>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={styles.logo}
        >
          <Logo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={styles.illustrationPane}
        >
          <LoginIllustration />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className={styles.formPane}
        >
          <LoginForm />
        </motion.div>
      </div>
    </>
  );
}
