import { requireEnv } from "@/lib/utils";

const TEST_DATABASE_URL: string = process.env.CI
  ? requireEnv(process.env.DATABASE_URL, 'DATABASE_URL')
  : "postgresql://test:test@localhost:5434/noise_app_test";

const TEST_PORT = process.env.CI ? 3000 : 3001;

export { TEST_PORT, TEST_DATABASE_URL };