// e2e/global-teardown.ts
import { execSync } from "child_process";

export default async function globalTeardown() {
  execSync("docker-compose -f e2e/docker-compose.test.yml down -v", {
    stdio: "inherit",
  });
}