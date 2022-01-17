import { signOut } from "firebase/auth";
import { useCallback } from "react";
import { useAuth } from "reactfire";

const SignOutButton = () => {
  const auth = useAuth();

  const onSignOutRequested = useCallback(() => {
    return signOut(auth);
  }, [auth]);

  return (
    <button className="Button" onClick={onSignOutRequested}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
