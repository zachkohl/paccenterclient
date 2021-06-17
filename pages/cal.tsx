import Link from "next/link";
import useUser from "../lib/useUser";
function CalPage() {
  const { user } = useUser({ redirectTo: "/login", permission: "calendar" });
  if (!user || user.isLoggedIn === false) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Link href="https://cal.bonner.hopto.org/user1/eccc554d-2a25-6b9e-ee95-59d96066cea4/">
        https://cal.bonner.hopto.org/user1/eccc554d-2a25-6b9e-ee95-59d96066cea4/
      </Link>
    </div>
  );
}

export default CalPage;
