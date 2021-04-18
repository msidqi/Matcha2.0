import React from "react";
import Layout from "@/components/ui/Layout";
import Settings from "@/modules/Settings/containers/Settings";
import withAuth from "@/components/WithAuth";

const index = (): JSX.Element => (
  <Layout>
    <Settings />
  </Layout>
);

export default withAuth(index);
