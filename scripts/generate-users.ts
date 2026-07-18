import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { mockUsers } from "./data/generate-dataset";

const RECORD_COUNT = 500;

function main() {
  const outPath = resolve(__dirname, "../data/users.json");
  const users = mockUsers.slice(0, RECORD_COUNT);

  if (users.length < RECORD_COUNT) {
    console.error(`Expected ${RECORD_COUNT} users, generator produced ${users.length}.`);
    process.exit(1);
  }

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(users));

  const kb = (JSON.stringify(users).length / 1024).toFixed(1);
  console.log(`Wrote ${users.length} users to ${outPath} (${kb} KB).`);
  console.log("Upload this file to your mock API host, then set USERS_API_URL in .env.local.");
}

main();
