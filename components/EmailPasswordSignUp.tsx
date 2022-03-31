import { FormEvent, useCallback, useEffect } from "react";
import { useSignUpWithEmailAndPassword } from "../lib/hooks/useSignUpWithEmailAndPassword";

function EmailPasswordSignUpForm(
  props: React.PropsWithChildren<{
    onSignup: () => void;
  }>
) {
  const [signUp, state] = useSignUpWithEmailAndPassword();
  const loading = state.loading;
  const error = state.error;

  useEffect(() => {
    if (state.success) {
      props.onSignup();
    }
  }, [props, state.success]);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      const data = new FormData(event.currentTarget);
      const email = data.get(`email`) as string;
      const password = data.get(`password`) as string;

      // sign user up
      return signUp(email, password);
    },
    [loading, signUp]
  );

  return (
    <form className={"w-full"} onSubmit={onSubmit}>
      <div className={"flex-col space-y-6"}>
        <input
          required
          placeholder="Your Email"
          name="email"
          type="email"
          className="TextField"
        />

        <input
          required
          placeholder="Your Password"
          name="password"
          type="password"
          className="TextField"
        />

        {
          error ? <span className="text-red-500">{error.message}</span> : null
        }

        <button disabled={loading} className="Button w-full">
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default EmailPasswordSignUpForm;
