import dotenv from 'dotenv'
import { describe, it, expect } from "vitest";
import { requireEnv } from "@/lib/utils";

dotenv.config()

const expectVariableExist = (env: string | undefined, name: string) => {
    expect(requireEnv(env, name)).toBeTruthy();
}

describe('Provider environment variables set in .env', () => {
  it('has Github variables', () => {
    expectVariableExist(process.env.GITHUB_ID, "GITHUB_ID");
    expectVariableExist(process.env.GITHUB_SECRET, "GITHUB_SECRET");
  })
})