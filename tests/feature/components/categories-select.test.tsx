import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { CategoriesSelect } from "@/components/ui/forms/categories-select";
import { cleanup, render, screen } from "@testing-library/react";
import { prisma } from "@/prisma/lib/client";
import userEvent from "@testing-library/user-event";
import { CATEGORY_GROUPS } from "@/components/ui/forms/categories-select";
import { CATEGORIES } from "@/prisma/seeders/categories";

const categoryNames = Object.entries(CATEGORIES).map(item => item[1].name);

describe("<CategoriesSelect />", () => {
  beforeEach(async () => {
    const user = userEvent.setup()
    const categories = await prisma.category.findMany();

    render(<CategoriesSelect categories={categories} />)

    // Activate dropdown
    const dropdown = screen.getByRole("combobox");
    await user.click(dropdown);
  })

  afterEach(() => {
    cleanup()
  })

  it("has all category names as options from the database when seeded", async () => {
    // Get all Select Options
    const selectOptions = await screen.findAllByRole("option");
    const optionCategoryNames = selectOptions.map(option => option.textContent.trim());

    // Check all seeded categories exist in dropdown - order does not matter so both sorted
    expect(optionCategoryNames.sort()).toEqual(categoryNames.sort());
  })

  it("returns categories split by 4 groups", async () => {
    // Make sure the groups are displayed in the select dropdown
    CATEGORY_GROUPS.forEach(category => {
      const label = screen.getByRole("group", { name: category });
      expect(label).toBeInTheDocument();
    })
  })
})