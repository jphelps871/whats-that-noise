import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

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

async function main() {
  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Category seed complete!")
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })