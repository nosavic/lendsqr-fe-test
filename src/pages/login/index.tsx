import Head from "next/head";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginIllustration } from "@/components/auth/LoginIllustration";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | lendsqr</title>
      </Head>

      <div className="relative grid min-h-screen grid-cols-1 bg-surface transition-colors lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-6 top-8 z-10 sm:left-[50px] sm:top-[50px]"
        >
          <Logo />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="hidden items-center justify-center overflow-hidden bg-panel px-10 lg:flex"
        >
          <LoginIllustration />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="flex items-center justify-center px-6 py-24 sm:px-10"
        >
          <LoginForm />
        </motion.div>
      </div>
    </>
  );
}
