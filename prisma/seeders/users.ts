import { requireEnv } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/lib/client";

export async function createTestUser() {
  const email = requireEnv(process.env.TEST_USER, "TEST_USER");
  const password = requireEnv(process.env.TEST_PASSWORD, "TEST_PASSWORD");

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name: "Test User",
      email,
      password: await bcrypt.hash(password, 12),
    },
  });
}