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

