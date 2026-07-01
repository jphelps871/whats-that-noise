import { describe, expect, it, vi, afterEach } from "vitest"
import { LoginForm } from "@/components/forms/auth/login-form"
import { cleanup, render, screen } from "@testing-library/react"
import { getAuthForm } from "@/tests/utils/form-helpers"

const signIn = vi.hoisted(() => {
  return vi.fn();
})

vi.mock("next-auth/react", () => ({
  signIn: signIn
}))

vi.mock("next/navigation", () => ({
  redirect: vi.fn()
}))

describe('<LoginForm />', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  })

  it('shows validation errors for invalid credentials', async () => {
    const form = getAuthForm(screen);

    render(<LoginForm />);

    await form.fill({
      email: "not_a_email",
      password: "1234",
    })
    await form.submit();

    // Assert
    expect(form.fields.email()).toHaveAttribute("aria-invalid", "true");
    expect(form.fields.password()).toHaveAttribute("aria-invalid", "true");

    expect(
      screen.getByText(/invalid email address/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Password must be at least 6 characters/i)
    ).toBeInTheDocument()
  })

  it('calls signIn() because of no validation errors', async () => {
    const form = getAuthForm(screen);

    render(<LoginForm />);

    await form.fill({
      email: "correct.email@whatsnoise.com",
      password: "123456789"
    });
    await form.submit();

    // Assert
    expect(signIn).toHaveBeenCalled();
  })
})