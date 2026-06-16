import { prisma } from "@/prisma/lib/client";

export const CATEGORIES = [
  { name: "Construction", group: "Infrastructure" },
  { name: "Traffic", group: "Infrastructure" },
  { name: "Aircraft", group: "Infrastructure" },
  { name: "Trains / Rail", group: "Infrastructure" },
  { name: "Industrial", group: "Infrastructure" },

  { name: "People", group: "Human" },
  { name: "Neighbours", group: "Human" },
  { name: "Music / Events", group: "Human" },
  { name: "Nightlife (bars, clubs, etc.)", group: "Human" },

  { name: "Animals (dogs barking, etc.)", group: "Animals & Nature" },

  { name: "Unknown / Other", group: "Unclassified" },
]

export async function createCategories() {
  await prisma.category.createMany({
    data: CATEGORIES,
    skipDuplicates: true
  })
}