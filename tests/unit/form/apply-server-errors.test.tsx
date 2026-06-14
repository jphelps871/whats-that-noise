import { applyServerErrors } from "@/lib/forms/applyServerErrors";
import { describe, expect, it, vi } from "vitest";

const userRegisterErrors = {
  "name": [
    "name is required"
  ],
  "email": [
    "Invalid email address"
  ],
  "password": [
    "Password must be at least 6 characters"
  ]
}

describe("applyServerErrors() converts backend errors (Zod) into frontend errors (react-form-hook)", () => {
  it("handles authentication errors", () => {
    const setError = vi.fn();

    applyServerErrors(userRegisterErrors, setError)

    expect(setError).toHaveBeenCalledWith("name",
      { message: "name is required" }
    );

    expect(setError).toHaveBeenCalledWith("email",
      { message: "Invalid email address" }
    );

    expect(setError).toHaveBeenCalledWith("password",
      { message: "Password must be at least 6 characters" }
    );
  })
})