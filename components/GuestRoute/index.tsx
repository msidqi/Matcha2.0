import React from "react";
import Router from "next/router";
import { useUser } from "@/components/auth";
import SplashScreen from "@/components/SplashScreen";
import { NextSeo } from "next-seo";

const guestRoute = (Component: React.ComponentType<any>) => (
  props: unknown
) => {
  const [{ loggedIn }, { loading }] = useUser();
  if (loading)
    return (
      <>
        <NextSeo title="Matcha" description="" />
        <SplashScreen />
      </>
    );
  if (loggedIn) {
    Router.push("/dashboard");
    return (
      <>
        <NextSeo title="Matcha" description="" />
        <SplashScreen />
      </>
    );
  }
  return <Component {...props} />;
};

export default guestRoute;

/*
- like request doesn't remove user from suggestions
- notifications for received a like, received a message, was matched(aka liked back), unliked
- activity list request (visits, was liked, was match, was unlike)
- sockets event checkConnectedUser responseConnectedUser

*/
