import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import AddMarkerForm from "@/components/forms/marker/add-marker-form";
import { CATEGORIES } from "@/prisma/seeders/categories";
import { createPrismaRecords } from "@/tests/utils/db/category";

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe("<AddMarkerForm />", () => {
  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();

    const prismaRecordOfCategories = createPrismaRecords(CATEGORIES)

    render(<AddMarkerForm categories={prismaRecordOfCategories} />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByLabelText("Description")).toHaveAttribute(
      "aria-invalid", "true"
    );
    expect(screen.getByLabelText("Category")).toHaveAttribute(
      "aria-invalid", "true"
    );
  });
});