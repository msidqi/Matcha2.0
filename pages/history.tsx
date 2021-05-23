import React from "react";
import Layout from "@/components/ui/Layout";
import History from "@/modules/History/containers/History";
import withAuth from "@/components/WithAuth";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout>
    <NextSeo title="Matcha - Activities" description="" />
    <History />
  </Layout>
);

export default withAuth(index);
