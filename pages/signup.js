import Signup from "../components/Signup";
import useUser from "../lib/useUser";

function SignupPage(props) {
  const { user } = useUser({ redirectTo: "/login" });
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }
  return <Signup />;
}

export default SignupPage;
