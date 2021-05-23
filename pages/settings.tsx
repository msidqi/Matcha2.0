import React from "react";
import Layout from "@/components/ui/Layout";
import Settings from "@/modules/Settings/containers/Settings";
import withAuth from "@/components/WithAuth";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout>
    <NextSeo title="Matcha - Settings" description="" />
    <Settings />
  </Layout>
);

export default withAuth(index);
