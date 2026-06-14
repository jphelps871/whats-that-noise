import userEvent from "@testing-library/user-event";
import { Screen } from "@testing-library/dom";

const getAuthForm = (screen: Screen) => {
  const user = userEvent.setup();

  return {
    user,

    fields: {
      email: () => screen.getByLabelText(/email/i),
      name: () => screen.getByLabelText(/name/i),
      password: () => screen.getByLabelText(/password/i),
      submit: () => screen.getByRole("button", { name: /submit/i }),
    },

    async fill(values: {
      name?: string;
      email: string;
      password: string;
    }) {
      await user.clear(screen.getByLabelText(/email/i));
      await user.type(screen.getByLabelText(/email/i), values.email);

      await user.clear(screen.getByLabelText(/password/i));
      await user.type(screen.getByLabelText(/password/i), values.password);

      if (values.name) {
        await user.clear(screen.getByLabelText(/name/i));
        await user.type(screen.getByLabelText(/name/i), values.name);
      }
    },

    async submit() {
      await user.click(
        screen.getByRole("button", { name: /submit/i })
      );
    },
  };
};

export { getAuthForm }