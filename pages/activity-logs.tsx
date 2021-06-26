import React from "react";
import Layout from "@/components/ui/Layout";
import ActivityLogs from "@/modules/ActivityLogs/containers/ActivityLogs";
import withAuth from "@/components/WithAuth";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout>
    <NextSeo title="Matcha - Activity logs" description="" />
    <ActivityLogs />
  </Layout>
);

export default withAuth(index);
