import React from "react";
import Layout from "@/components/ui/Layout";
import withAuth from "@/components/WithAuth";
import Chat from "@/components/Chat";

const index = (): JSX.Element => (
  <Layout>
    <Chat />
  </Layout>
);

export default withAuth(index);
