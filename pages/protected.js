import Login from "../components/Login.jsx";
import axios from "axios";
function Protected({ Render }) {
  return <div>{Render}</div>;
}

Protected.getInitialProps = async function(req) {
  try {
    //find the token
    const cookies = req.req.headers.cookie;
    const slice1 = cookies.split("bearer=")[1];
    const token = slice1.split(";")[0];

    console.log(token);

    const checkUser = await axios.get("http://localhost:/api/CheckCampaigns", {
      headers: { cookie: `bearer=${token}` }
    });
    console.log(checkUser);
    if (checkUser.data != "access denied") {
      const Render = <p>This is the JSX content</p>;
      return { Render: Render };
    } else {
      return { Render: "access denied" };
    }
  } catch (err) {
    console.log(err);
    return { Render: "please log in before accessing this resource" };
  }
};

export default Protected;
