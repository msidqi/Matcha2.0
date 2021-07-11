import React from "react";
import Router from "next/router";
import { useUser } from "@/components/auth";
import SplashScreen from "@/components/SplashScreen";
import { NextSeo } from "next-seo";

const withAuth = (Component: React.ComponentType<any>) => (props: unknown) => {
  const [{ user }, { error, loading }] = useUser();
  if (loading)
    return (
      <>
        <NextSeo title="Matcha" description="" />
        <SplashScreen />
      </>
    );

  if (!user || error) {
    Router.push("/signin");
    return (
      <>
        <NextSeo title="Matcha" description="" />
        <SplashScreen />
      </>
    );
  }

  if (user?.data.isCompleted && Router.pathname === "/profile-setup") {
    Router.push("/dashboard");
    return (
      <>
        <NextSeo title="Matcha" description="" />
        <SplashScreen />
      </>
    );
  }
  console.log("withAuth");
  if (!user.data.isCompleted && Router.pathname !== "/profile-setup") {
    Router.push("/profile-setup");
    return (
      <>
        <NextSeo title="Matcha" description="" />
        <SplashScreen />
      </>
    );
  }

  return <Component {...props} />;
};

export default withAuth;
