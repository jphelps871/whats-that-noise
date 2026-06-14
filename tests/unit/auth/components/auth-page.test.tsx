import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthPage } from "@/components/auth/auth-page";
import { LoginForm } from "@/components/forms/auth/login-form";
import { Link } from "lucide-react";

const { mockSignIn } = vi.hoisted(() => ({
  mockSignIn: vi.fn(),
}));

vi.mock("next-auth/react", () => ({
  signIn: mockSignIn,
}));

describe('<AuthPage />', () => {
  it('uses login("github") when corresponding button clicked', async () => {
    const user = userEvent.setup();

    render(
      <AuthPage title="Login" subtitle={
        <>Don't have an account?</>
      }>
        <LoginForm />
      </AuthPage >
    );

    const gitHubButton = screen.getByRole('button', { name: /github/i });

    await user.click(gitHubButton);

    expect(mockSignIn).toHaveBeenCalledWith("github",
      expect.objectContaining({
        callbackUrl: expect.any(String) // Can include "/", "/marker/add", "marker/edit"
      })
    );

    vi.resetAllMocks()
  })
})

