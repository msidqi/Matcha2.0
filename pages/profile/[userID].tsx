import React from "react";
import Profile from "@/components/Profile";
import Layout from "@/components/ui/Layout";
import withAuth from "@/components/WithAuth";

const index = (): JSX.Element => (
  <Layout>
    <Profile />
  </Layout>
);

export default withAuth(index);
