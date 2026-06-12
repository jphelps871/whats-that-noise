import { prisma } from "@/prisma/lib/client";

const categories = [
  { name: "Construction" },
  { name: "Traffic" },
  { name: "Aircraft" },
  { name: "Trains / Rail" },
  { name: "Industrial" },
  { name: "People" },
  { name: "Neighbours" },
  { name: "Music / Events" },
  { name: "Nightlife (bars, clubs, etc.)" },
  { name: "Animals (dogs barking, etc.)" },
  { name: "Unknown / Other" },
]

export async function createCategories() {
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true
  })
}