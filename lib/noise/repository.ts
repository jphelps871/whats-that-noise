import { prisma } from "@/prisma/lib/client"
import { Prisma } from "@prisma/client"

type CreateNoise = Prisma.NoiseUncheckedCreateInput

export const noiseRepository = {
  findCategoryByName(name: string) {
    return prisma.category.findUnique({ where: { name } });
  },

  findManyNoises() {
    return prisma.noise.findMany();
  },

  createNoise(data: CreateNoise) {
    return prisma.noise.create({ data });
  }
}