import { useState } from "react";
import type { FormEvent } from "react";
import { SearchIcon } from "@/components/icons";

export function SearchBar() {
  const [term, setTerm] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-[32px] w-[320px]">
      <input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search for anything"
        className="box-border h-[32px] w-full appearance-none rounded-l-lg border border-r-0 border-primary/20 bg-surface px-4 py-0 text-sm leading-none text-text-strong outline-none transition-colors placeholder:text-[12px] placeholder:leading-none placeholder:text-text-muted focus:border-secondary"
      />
      <button
        type="submit"
        className="flex min-w-[58px] items-center justify-center rounded-r-lg bg-secondary text-white transition-colors hover:bg-secondary-hover"
        aria-label="Search"
      >
        <SearchIcon className="h-3.5 w-3.5" />
      </button>
    </form>
  );
}
