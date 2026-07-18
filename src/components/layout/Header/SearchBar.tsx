import { useState } from "react";
import type { FormEvent } from "react";
import { SearchIcon } from "@/components/icons";
import styles from "./SearchBar.module.scss";

export function SearchBar() {
  const [term, setTerm] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} role="search">
      <input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search for anything"
        aria-label="Search for anything"
        className={styles.input}
      />
      <button type="submit" className={styles.submit} aria-label="Search">
        <SearchIcon className={styles.icon} />
      </button>
    </form>
  );
}
