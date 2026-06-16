import { describe, it } from "vitest";
import { CategoriesSelect } from "@/components/ui/forms/categories-select";
import { render, screen } from "@testing-library/react";
import { prisma } from "@/prisma/lib/client";

describe("<CategoriesSelect />", () => {
  it("returns categories split correctly based on groups", async () => {
    const categories = await prisma.category.findMany();

    render(<CategoriesSelect categories={categories} />)

    screen.debug()
  })
})