import { applyServerErrors, errorCreation } from "@/lib/forms/error-handling";
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

const expectedCreatedError = { success: false, error: { fieldErrors: { email: ["Email already in use"] } } }

describe("errorCreation() converts errors into Zod-like flattened error object that can be used by applyServerErrors()", () => {
  it("matches expectedCreatedError object", () => {
    const createdError = errorCreation({
      email: "Email already in use"
    })

    expect(createdError).toMatchObject(expectedCreatedError);
  })
})