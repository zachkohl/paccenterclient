import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

export type useUserType = {
  redirectTo?: string;
  redirectIfFound?: string;
  permission?: string;
};

export default function useUser(
  props: useUserType = {
    redirectTo: undefined,
    redirectIfFound: undefined,
    permission: undefined,
  }
) {
  const { data: user, mutate: mutateUser } = useSWR(
    `/api/user?permission=${props.permission}`
  );

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!props.redirectTo || !user) return;
    if (user?.authorized == false && props.permission) {
      Router.push("/unauthorized");
    } else if (
      // If redirectTo is set, redirect if the user was not found.
      (props.redirectTo && !props.redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (props.redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(props.redirectTo);
    }
  }, [user, props.redirectIfFound, props.redirectTo]);

  return { user, mutateUser };
}
