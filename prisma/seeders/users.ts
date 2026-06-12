import { requireEnv } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/lib/client";

export async function createTestUser() {
  await prisma.user.create({
      data: {
        name: "Test User",
        email: requireEnv(process.env.TEST_USER, "TEST_USER"),
        password: await bcrypt.hash(requireEnv(process.env.TEST_PASSWORD, "TEST_PASSWORD"), 12)
      }
    })
}