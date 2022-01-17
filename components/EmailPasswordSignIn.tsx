import { FormEvent, useCallback } from "react";
import { useSignInWithEmailAndPassword } from "../lib/hooks/useSignInWithEmailAndPassword";

function EmailPasswordSignInForm(
  props: React.PropsWithChildren<{
    onSignIn: () => void;
  }>
) {
  const [signIn, state] = useSignInWithEmailAndPassword();

  const loading = state.loading;

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (loading) {
        return;
      }

      const data = new FormData(event.currentTarget);
      const email = data.get(`email`) as string;
      const password = data.get(`password`) as string;

      // sign user in
      await signIn(email, password);

      props.onSignIn();
    },
    [loading, props, signIn]
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

        <button disabled={loading} className="Button w-full">
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default EmailPasswordSignInForm;
