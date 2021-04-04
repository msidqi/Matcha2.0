import React from "react";
import ProfileEdit from "@/components/ProfileEdit";
import Layout from "@/components/ui/Layout";
import withAuth from "@/components/WithAuth";

const index = (): JSX.Element => (
  <Layout>
    <ProfileEdit />
  </Layout>
);

export default withAuth(index);
