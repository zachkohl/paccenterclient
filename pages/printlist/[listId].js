import auth from "../../lib/auth";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../components/Printpage"),
  {
    ssr: false,
  }
);
export default function PrintPage(props) {
  return <DynamicComponentWithNoSSR />;
}

export async function getServerSideProps(ctx) {
  console.log("inside getServerSideProps");
  const valid = await auth.auth(ctx);
  return { props: {} };
}
