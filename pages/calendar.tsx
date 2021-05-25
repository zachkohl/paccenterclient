import Home from "../components/Home";
import useUser from "../lib/useUser";

function CalendarPage(props) {
  const { user } = useUser({ redirectTo: "/login" });

  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }
  return <div>Only logged in people should see this</div>;
}

export default CalendarPage;
