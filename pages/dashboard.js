import Dashboard from "../components/Dashboard";
import useUser from "../lib/useUser";

function DashboardPage(props) {
  const { user } = useUser({ redirectTo: "/login" });
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }
  return <Dashboard />;
}

export default DashboardPage;
