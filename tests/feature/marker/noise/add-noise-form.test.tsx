import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import AddNoiseForm from "@/components/forms/noise/add-noise-form";
import { CATEGORIES } from "@/prisma/seeders/categories";
import { createPrismaRecord } from "@/tests/utils/create-prisma-record";

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe("<AddNoiseForm />", () => {
  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();

    const prismaRecordOfCategories = createPrismaRecord(CATEGORIES)

    render(<AddNoiseForm categories={prismaRecordOfCategories} />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByLabelText("Description")).toHaveAttribute(
      "aria-invalid", "true"
    );
    expect(screen.getByLabelText("Category")).toHaveAttribute(
      "aria-invalid", "true"
    );

    screen.debug();
  });
});