import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/router";
import { TextField } from "@/components/ui/TextField";
import styles from "./LoginForm.module.scss";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    router.push("/users");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.intro}>
        <h1 className={styles.title}>
          Welcome!
        </h1>
        <p className={styles.subtitle}>Enter details to login.</p>
      </div>

      <div className={styles.fields}>
        <TextField
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          aria-label="Email"
        />

        <TextField
          type={showPassword ? "text" : "password"}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          aria-label="Password"
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword((show) => !show)}
              className={styles.toggleVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />

        <a
          href="#"
          className={styles.forgot}
        >
          Forgot Password?
        </a>

        <button
          type="submit"
          disabled={!canSubmit}
          className={styles.submit}
        >
          Log In
        </button>
      </div>
    </form>
  );
}
