import { RegisterForm } from "@/components/forms/auth/register-form";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getAuthForm } from "@/tests/utils/form-helpers";
import { render, screen, cleanup } from "@testing-library/react";
import { registerUser } from "@/app/actions/auth/register-user";

vi.mock("@/app/actions/auth", { spy: true });

afterEach(() => {
  vi.resetAllMocks();
  cleanup();
})

describe('<RegisterForm />', () => {
  it('shows validation errors for invalid credentials', async () => {
    const form = getAuthForm(screen);

    render(<RegisterForm />);

    await form.fill({
      name: "",
      password: "1234",
      email: "not_an_email"
    });

    await form.submit();

    expect(form.fields.name()).toHaveAttribute('aria-invalid', 'true');
    expect(form.fields.email()).toHaveAttribute('aria-invalid', 'true');
    expect(form.fields.password()).toHaveAttribute('aria-invalid', 'true');

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
  })

  it('calls registerUser() because of no validation errors', async () => {
    const form = getAuthForm(screen);

    render(<RegisterForm />);

    await form.fill({
      name: "Jon Doe",
      email: "jondoe@whatnoise.com",
      password: "123456789",
    })

    await form.submit();

    expect(registerUser).toHaveBeenCalledWith({
      name: "Jon Doe",
      email: "jondoe@whatnoise.com",
      password: "123456789",
    });
  })
})