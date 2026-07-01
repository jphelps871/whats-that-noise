import { prisma } from "@/prisma/lib/client"
import { Prisma } from "@prisma/client"

type CreateNoise = Prisma.NoiseUncheckedCreateInput

type FindManyNoisesProps = {
  n: number, e: number, s: number, w: number,
  include?: Prisma.NoiseInclude
}

export const noiseRepository = {
  findCategoryByName(name: string) {
    return prisma.category.findUnique({ where: { name } });
  },

  findManyNoises({n, e, s, w, include}: FindManyNoisesProps) {
    return prisma.noise.findMany({
      where: {
        AND: [
          { lat: { gte: s, lte: n } },
          { lng: { gte: w, lte: e } },
        ],
      },
      
      include,
    });
  },

  createNoise(data: CreateNoise) {
    return prisma.noise.create({ data });
  }
}