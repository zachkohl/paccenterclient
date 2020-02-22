import Login from "../components/Login.jsx";
import Layout from "../components/layout";
import axios from "axios";
function Protected({ campaignList }) {
  return (
    <Layout title="dashboard" campaignList={["campaign A", "campaign B"]}>
      <Render />
    </Layout>
  );
}
const Render = () => {
  return <p>This is the JSX content</p>;
};

Protected.getInitialProps = async function(ctx) {
  try {
    //find the token
    const cookies = ctx.req.headers.cookie;
    const slice1 = cookies.split("bearer=")[1];
    const token = slice1.split(";")[0];

    console.log(token);

    const checkUser = await axios.get("http://localhost:/api/CheckCampaigns", {
      headers: { cookie: `bearer=${token}` }
    });
    console.log(checkUser);
    if (checkUser.data != "access denied") {
      const campaignList = ["campaign A", "campaign B"];
      return { Render: Render, campaignList: campaignList };
    } else {
      return { Render: "access denied" };
    }
  } catch (err) {
    console.log(err);
    ctx.res.writeHead(302, { Location: "http://localhost:3000/" });
    ctx.res.end();
    return;
    //return { Render: "please log in before accessing this resource" };
  }
};

export default Protected;
