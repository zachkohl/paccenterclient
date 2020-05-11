import auth from "../lib/auth";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/NewWalkingList/NewWalkingList"),
  {
    ssr: false,
  }
);
export default function NewWalkingListPage(props) {
  return <DynamicComponentWithNoSSR />;
}

export async function getServerSideProps(ctx) {
  console.log("inside getServerSideProps");
  const valid = await auth.auth(ctx);
  return { props: {} };
}
