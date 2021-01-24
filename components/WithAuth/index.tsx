import React from "react";
import Router from "next/router";
import { useUser } from "@/components/auth";

const withAuth = (Component: React.ComponentType<any>) => (props: unknown) => {
  const [{ user }, { error, loading }] = useUser();
  if (loading) return "Loading...";
  if (!user || error) Router.push("/signin");
  return <Component {...props} />;
};

export default withAuth;