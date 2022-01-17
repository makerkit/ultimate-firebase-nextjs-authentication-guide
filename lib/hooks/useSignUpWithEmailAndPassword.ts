import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";

import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

import { useRequestState } from "./useRequestState";

export function useSignUpWithEmailAndPassword() {
  const auth = useAuth();

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  async function signUp(email: string, password: string) {
    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setData(credential);
    } catch (error) {
      setError(error as FirebaseError);
    }
  }

  return [signUp, state] as [typeof signUp, typeof state];
}
