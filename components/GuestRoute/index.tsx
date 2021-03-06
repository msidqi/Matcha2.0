import React from "react";
import Router from "next/router";
import { useUser } from "@/components/auth";
import SplashScreen from "@/components/SplashScreen";

const guestRoute = (Component: React.ComponentType<any>) => (
  props: unknown
) => {
  const [{ loggedIn }, { loading }] = useUser();
  if (loading) return <SplashScreen />;
  if (loggedIn) {
    Router.push("/dashboard");
    return <SplashScreen />;
  }
  return <Component {...props} />;
};

export default guestRoute;
