import React from "react";
import Router from "next/router";
import { useUser } from "@/components/auth";
import SplashScreen from "@/components/SplashScreen";

const withAuth = (Component: React.ComponentType<any>) => (props: unknown) => {
  const [{ user }, { error, loading }] = useUser();
  if (loading) return <SplashScreen />;
  if (!user || error) {
    Router.push("/signin");
    return <SplashScreen />;
  }
  return <Component {...props} />;
};

export default withAuth;
