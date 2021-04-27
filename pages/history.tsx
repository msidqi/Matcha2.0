import React from "react";
import Layout from "@/components/ui/Layout";
import History from "@/modules/History/containers/History";
import withAuth from "@/components/WithAuth";

const index = (): JSX.Element => (
  <Layout>
    <History />
  </Layout>
);

export default withAuth(index);
