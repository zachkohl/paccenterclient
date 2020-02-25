import Login from "../../components/Login.jsx";
import Layout from "../../components/layout";
import axios from "axios";
function SignsPage({ campaignList }) {
  return (
    <Layout title="dashboard" campaignList={campaignList}>
      <p>This is the Signs Page</p>
    </Layout>
  );
}
const Render = () => {
  return <p>This is the Signs Page</p>;
};

SignsPage.getInitialProps = async function(ctx) {
  if (typeof window === "undefined") {
    try {
      //find the token
      const cookies = ctx.req.headers.cookie;
      const slice1 = cookies.split("bearer=")[1];
      const token = slice1.split(";")[0];

      // console.log(token);

      const checkUser = await axios.get(
        "http://localhost:/api/CheckCampaigns",
        {
          headers: { cookie: `bearer=${token}` }
        }
      );

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
  } else {
    try {
      // console.log(token);
      const config = {
        credentials: "include"
      };

      const checkUser = await axios.get("/api/CheckCampaigns", config);

      if (checkUser.data != "access denied") {
        const campaignList = Object.keys(checkUser.data.campaigns);

        return { Render: Render, campaignList: checkUser.data.campaigns };
      } else {
        return { Render: "access denied" };
      }
    } catch (err) {
      console.log(err);

      return;
      //return { Render: "please log in before accessing this resource" };
    }
  }
};

export default SignsPage;
