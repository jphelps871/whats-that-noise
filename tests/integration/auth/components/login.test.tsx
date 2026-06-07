import { describe, expect, it, vi } from "vitest";
import Login from "@/app/auth/login/page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const { mockSignIn } = vi.hoisted(() => ({
  mockSignIn: vi.fn(),
}));

vi.mock("next-auth/react", () => ({
  signIn: mockSignIn,
}));

describe('Login', () => {
  it('uses login("github") when corresponding button clicked', async () => {
    render(
      <Login />
    );

    const gitHubButton = screen.getByRole('button', { name: /github/i });

    await userEvent.click(gitHubButton);

    expect(mockSignIn).toHaveBeenCalledWith("github",
      expect.objectContaining({
        callbackUrl: expect.any(String) // Can include "/", "/marker/add", "marker/edit"
      })
    );

    vi.resetAllMocks();
  })
})