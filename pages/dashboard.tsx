import React from "react";
import Dashboard from "@/components/Dashboard";
import Layout from "@/components/ui/Layout";
import withAuth from "@/components/WithAuth";

const index = (): JSX.Element => (
  <Layout>
    <Dashboard />
  </Layout>
);

export default withAuth(index);
