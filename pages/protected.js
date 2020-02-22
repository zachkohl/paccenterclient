import Login from "../components/Login.jsx";
import Layout from "../components/layout";
import axios from "axios";
function Protected({ campaignList }) {
  return (
    <Layout title="dashboard" campaignList={campaignList}>
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

    // console.log(token);

    const checkUser = await axios.get("http://localhost:/api/CheckCampaigns", {
      headers: { cookie: `bearer=${token}` }
    });

    if (checkUser.data != "access denied") {
      const campaignList = Object.keys(checkUser.data.campaigns);

      return { Render: Render, campaignList: checkUser.data.campaigns };
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
