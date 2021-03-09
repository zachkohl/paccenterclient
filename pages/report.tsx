import dynamic from "next/dynamic";

const ReporterPage = dynamic(
  () => import("../components/reports/ReporterPage"),
  { ssr: false }
);

function ReporterPageTop() {
  return <ReporterPage />;
}

export default ReporterPageTop;
