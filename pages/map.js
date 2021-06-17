import auth from "../lib/auth";
import dynamic from "next/dynamic";
import useUser from "../lib/useUser";

const DynamicComponentWithNoSSR = dynamic(() => import("../components/map"), {
  ssr: false,
});
export default function MapPage(props) {
  const { user } = useUser({ redirectTo: "/login", permission: "dev" });
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }
  return <DynamicComponentWithNoSSR />;
}

export async function getServerSideProps(ctx) {
  console.log("inside getServerSideProps");
  const valid = await auth.auth(ctx);
  return { props: {} };
}
