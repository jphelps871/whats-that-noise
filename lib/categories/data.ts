import { cache } from "react";
import { prisma } from "@/prisma/lib/client";

const getCategories = cache(async () => {
  return prisma.category.findMany();
})

export { getCategories }