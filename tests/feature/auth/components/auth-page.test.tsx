import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthPage } from "@/components/auth/auth-page";
import { LoginForm } from "@/components/forms/auth/login-form";

const { mockSignIn } = vi.hoisted(() => ({
  mockSignIn: vi.fn(),
}));

vi.mock("next-auth/react", () => ({
  signIn: mockSignIn,
}));

// Mock useSearchParam for provider error handling
const getParamValue = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: getParamValue,
  }),
}));

// Update searchParam based on expected outcome
function getMockSearchParam(error: null | "OAuthAccountNotLinked") {
  getParamValue.mockReturnValue(error);
}

describe('<AuthPage />', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  })

  it('uses login("github") when corresponding button clicked', async () => {
    const user = userEvent.setup();

    getMockSearchParam(null);

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
        callbackUrl: expect.any(String) // Can include "/", "/noise/add", "noise/edit"
      })
    );

    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  })

  it("displays error when Github returns URL callback error", async () => {
    const user = userEvent.setup();

    // Mock Github returning a error in the callback URL
    getMockSearchParam("OAuthAccountNotLinked");

    render(
      <AuthPage title="Login" subtitle={
        <>Don't have an account?</>
      }>
        <LoginForm />
      </AuthPage >
    );

    const gitHubButton = screen.getByRole('button', { name: /github/i });

    await user.click(gitHubButton);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  })
})

