import { FormEvent, useCallback, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "../lib/hooks/useSignInWithEmailAndPassword";

function EmailPasswordSignInForm(
  props: React.PropsWithChildren<{
    onSignIn: () => void;
  }>
) {
  const [signIn, state] = useSignInWithEmailAndPassword();
  const loading = state.loading;
  const error = state.error;

  useEffect(() => {
    if (state.success) {
      props.onSignIn();
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

      // sign user in
      return signIn(email, password);
    },
    [loading, signIn]
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
          Sign In
        </button>
      </div>
    </form>
  );
}

export default EmailPasswordSignInForm;
