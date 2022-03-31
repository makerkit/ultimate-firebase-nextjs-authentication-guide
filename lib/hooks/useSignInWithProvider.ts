import { useAuth } from "reactfire";
import { FirebaseError } from "firebase/app";

import {
  AuthProvider,
  signInWithPopup,
  browserPopupRedirectResolver,
  UserCredential,
} from "firebase/auth";

import { useRequestState } from "./useRequestState";
import { useCallback } from "react";

export function useSignInWithProvider() {
  const auth = useAuth();

  const { state, setLoading, setData, setError } = useRequestState<
    UserCredential,
    FirebaseError
  >();

  const signInWithProvider = useCallback(async (provider: AuthProvider) => {
    setLoading(true);

    try {
      const credential = await signInWithPopup(
        auth,
        provider,
        browserPopupRedirectResolver
      );

      setData(credential);
    } catch (error) {
      setError(error as FirebaseError);
    }
  }, [auth, setData, setError, setLoading]);

  return [signInWithProvider, state] as [
    typeof signInWithProvider,
    typeof state
  ];
}
