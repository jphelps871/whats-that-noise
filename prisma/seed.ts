import { prisma } from  "@/prisma/lib/client";
import { createTestUser } from "./seeders/users";
import { createCategories } from "./seeders/categories";

async function main() {
  console.log("NODE_ENV:", process.env.NODE_ENV);

  await createCategories();
  await createTestUser();
}

main()
  .then(async () => {
    console.log("Seed complete!")
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());