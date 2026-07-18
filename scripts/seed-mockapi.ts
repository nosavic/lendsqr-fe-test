import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mockUsers } from "./data/generate-dataset";

const TOTAL_RECORDS = 500;
const REQUEST_DELAY_MS = 60;

function loadEnvLocal() {
  const path = resolve(__dirname, "../.env.local");
  if (!existsSync(path)) return;

  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!(key in process.env)) process.env[key] = trimmed.slice(eq + 1).trim();
  }
}

function delay(ms: number) {
  return new Promise((done) => setTimeout(done, ms));
}

async function wipe(endpoint: string) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Could not list ${endpoint} (${response.status})`);
  }

  const existing = (await response.json()) as { id: string }[];
  if (!existing.length) return;

  process.stdout.write(`  wiping ${existing.length} existing record(s)`);
  for (const { id } of existing) {
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    await delay(REQUEST_DELAY_MS);
  }
  process.stdout.write(" done\n");
}

async function seed(endpoint: string, users: typeof mockUsers) {
  let created = 0;

  for (const user of users) {
    const { id: _ignored, ...payload } = user;
    void _ignored;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      created += 1;
    } else {
      console.error(`  POST failed (${response.status}): ${await response.text()}`);
      break;
    }

    await delay(REQUEST_DELAY_MS);
  }

  console.log(`  seeded ${created}/${users.length}`);
  return created;
}

async function main() {
  loadEnvLocal();

  const endpoints = (process.env.USERS_API_URL ?? "")
    .split(",")
    .map((url) => url.trim().replace(/\/+$/, ""))
    .filter(Boolean);

  if (!endpoints.length) {
    console.error("USERS_API_URL is not set in .env.local");
    process.exit(1);
  }

  const users = mockUsers.slice(0, TOTAL_RECORDS);
  const perShard = Math.ceil(users.length / endpoints.length);

  console.log(`Seeding ${users.length} users across ${endpoints.length} resource(s), ${perShard} each.\n`);

  let total = 0;
  for (const [index, endpoint] of endpoints.entries()) {
    const slice = users.slice(index * perShard, (index + 1) * perShard);
    console.log(`[${index + 1}/${endpoints.length}] ${endpoint} (${slice.length} records)`);
    await wipe(endpoint);
    total += await seed(endpoint, slice);
  }

  console.log(`\nDone. ${total}/${users.length} records live.`);
  if (total < users.length) {
    console.log("Short of target — add more resources to USERS_API_URL (mockapi.io caps each at 100).");
  }
}

main();
