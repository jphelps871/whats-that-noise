import { prisma } from "@/prisma/lib/client";

export const CATEGORIES = [
  { name: "Construction", colour: "#F97316", group: "Infrastructure" },
  { name: "Traffic", colour: "#EF4444", group: "Infrastructure" },
  { name: "Aircraft", colour: "#3B82F6", group: "Infrastructure" },
  { name: "Trains / Rail", colour: "#6366F1", group: "Infrastructure" },
  { name: "Industrial", colour: "#78716C", group: "Infrastructure" },

  { name: "People", colour: "#EC4899", group: "Human" },
  { name: "Neighbours", colour: "#A855F7", group: "Human" },
  { name: "Music / Events", colour: "#8B5CF6", group: "Human" },
  { name: "Nightlife (bars, clubs, etc.)", colour: "#7C3AED", group: "Human" },

  { name: "Animals (dogs barking, etc.)", colour: "#22C55E", group: "Animals & Nature" },

  { name: "Unknown / Other", colour: "#6B7280", group: "Unclassified" },
]

export async function createCategories() {
  await prisma.category.createMany({
    data: CATEGORIES,
    skipDuplicates: true
  })
}