import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/router";
import { TextField } from "@/components/ui/TextField";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[400px] flex-col">
      <div className="mb-10">
        <h1 className="font-heading text-[2.5rem] font-extrabold tracking-[-0.5px] text-primary">
          Welcome!
        </h1>
        <p className="mt-2 text-base text-body">Enter details to login.</p>
      </div>

      <div className="flex flex-col gap-6">
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
              className="text-[10px] font-bold uppercase tracking-wide text-secondary hover:text-secondary-hover"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />

        <a
          href="#"
          className="text-[0.775rem] font-semibold uppercase tracking-[0.5px] text-secondary hover:text-secondary-hover"
        >
          Forgot Password?
        </a>

        <button
          type="submit"
          disabled={!canSubmit}
          className="h-12 rounded-lg bg-secondary text-sm font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-secondary-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          Log In
        </button>
      </div>
    </form>
  );
}
