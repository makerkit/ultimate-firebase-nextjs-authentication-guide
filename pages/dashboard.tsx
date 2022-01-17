import GuardedPage from "../components/GuardedPage";
import SignOutButton from "../components/SignOutButton";

const Dashboard = () => {
  return (
    <GuardedPage whenSignedOut="/auth/sign-up">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col space-y-8">
          <h1 className="Hero">Dashboard</h1>

          <p>This is a protected page :)</p>
          <SignOutButton />
        </div>
      </div>
    </GuardedPage>
  );
};

export default Dashboard;
