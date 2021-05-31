import Running from "../components/Running";
import useUser from "../lib/useUser";

function RunningPage(props) {
  const { user } = useUser({ redirectTo: "/login" });
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }
  return <Running />;
}

export default RunningPage;
