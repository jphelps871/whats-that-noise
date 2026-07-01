import { execSync } from "child_process";
import { TEST_DATABASE_URL } from "./test-env";

function run(cmd: string) {
  execSync(cmd, {
    stdio: "inherit",
    env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
  });
}

function waitForPostgres(retries = 30, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      execSync(
        "docker exec noise_app_test_db pg_isready -U test -d noise_app_test",
        { stdio: "ignore" }
      );
      console.log("Postgres is ready");
      return;
    } catch {
      console.log(`Waiting for Postgres... (${i + 1}/${retries})`);
      execSync(process.platform === "win32" ? "timeout /t 1" : "sleep 1");
    }
  }
  throw new Error("Postgres did not become ready in time");
}

export default async function globalSetup() {
  console.log("Closing previous docker...");
  execSync("docker-compose -f e2e/docker-compose.test.yml down -v", { stdio: "inherit" });

  console.log("Starting test database...");
  execSync("docker-compose -f e2e/docker-compose.test.yml up -d --wait", { stdio: "inherit" });

  console.log("Waiting for Postgres to accept connections...");
  waitForPostgres();

  console.log("Running Prisma migrations...");
  run("npx prisma migrate deploy");

  console.log("Seeding database...");
  run("npx prisma db seed");

  console.log("Test environment ready");
}