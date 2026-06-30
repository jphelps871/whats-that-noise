import { prisma } from "@/prisma/lib/client"
import { Prisma } from "@prisma/client"

type CreateNoise = Prisma.NoiseUncheckedCreateInput

export const noiseRepository = {
  findCategoryByName(name: string) {
    return prisma.category.findUnique({ where: { name } });
  },

  findManyNoises({n, e, s, w}: {n: number, e: number, s: number, w: number}) {
    return prisma.noise.findMany({
      where: {
        AND: [
          { lat: { gte: s, lte: n } },
          { lng: { gte: w, lte: e } },
        ],
      },
    });
  },

  createNoise(data: CreateNoise) {
    return prisma.noise.create({ data });
  }
}