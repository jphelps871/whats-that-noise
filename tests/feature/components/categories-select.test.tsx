import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { CategoriesSelect } from "@/components/ui/forms/categories-select";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CATEGORY_GROUPS } from "@/components/ui/forms/categories-select";
import { CATEGORIES } from "@/prisma/seeders/categories";
import { createPrismaRecord } from "@/tests/utils/create-prisma-record";

const categoryNames = Object.entries(CATEGORIES).map(item => item[1].name);

const mockedControl = {
  register: vi.fn(),
  unregister: vi.fn(),
  getFieldState: vi.fn(),
  _formState: { errors: {} },
} as any

vi.mock("react-hook-form", () => ({
  useController: () => ({
    field: vi.fn()
  })
}))

describe("<CategoriesSelect />", () => {
  beforeEach(async () => {
    const user = userEvent.setup()
    const categories = createPrismaRecord(CATEGORIES);

    render(<CategoriesSelect control={mockedControl} name="category" categories={categories} />)

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