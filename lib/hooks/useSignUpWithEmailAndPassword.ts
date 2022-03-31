import { useCallback } from "react";
import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useRequestState } from "./useRequestState";

export function useSignUpWithEmailAndPassword() {
  const auth = useAuth();

  const {state, setLoading, setData, setError} = useRequestState<UserCredential,
    FirebaseError>();

  const signUp = useCallback(async (email: string, password: string) => {
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
  }, [auth, setData, setError, setLoading]);

  return [signUp, state] as [typeof signUp, typeof state];
}
