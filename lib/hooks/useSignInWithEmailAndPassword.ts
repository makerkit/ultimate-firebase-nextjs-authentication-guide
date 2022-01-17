import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";

import { useRequestState } from "./useRequestState";

export function useSignInWithEmailAndPassword() {
  const auth = useAuth();

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  async function signIn(email: string, password: string) {
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setData(credential);
    } catch (error) {
      setError(error as FirebaseError);
    }
  }

  return [signIn, state] as [typeof signIn, typeof state];
}
