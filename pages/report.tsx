import react, { useState, useEffect } from "react";
import useUser from "../lib/useUser";

import dynamic from "next/dynamic";
import axios from "axios";
const ReporterPage = dynamic(
  () => import("../components/reports/ReporterPage"),
  { ssr: false }
);

function ReporterPageTop(props) {
  // return (
  //   <div>
  //     This tool has been moved to another website. Please see your group leader
  //     for more information.
  //   </div>
  // );

  const { user } = useUser({ redirectTo: "/login", permission: "report" });
  const [name, setName] = useState("");

  const [data, setData] = useState(null);

  async function getData() {
    const response = await axios.get("./api/politicianapi");
    console.log(response.data);
    setData(response.data);
  }
  useEffect(() => {
    getData();
  }, []);

  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  } else if (data) {
    return <ReporterPage records={data} />;
  } else {
    return <div>loading...</div>;
  }
}

// export async function serverSideProps(context) {
//   const user = context.req.session.get("user");

//   if (user) {
//     return {
//       props: {},
//     };
//   } else {
//     context.res.setHEader("location", "/login");
//     context.res.statusCode(302);
//     context.res.end();
//     return false;
//   }
// }

export default ReporterPageTop;
