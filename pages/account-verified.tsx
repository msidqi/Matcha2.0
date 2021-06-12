import React from "react";
import AccountVerified from "@/components/AccountVerified";
import Layout from "@/components/ui/Layout";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout background>
    <NextSeo title="Matcha - Account Verified" description="" />
    <AccountVerified />
  </Layout>
);

export default index;
