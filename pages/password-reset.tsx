import React from "react";
import PasswordReset from "@/components/PasswordReset";
import Layout from "@/components/ui/Layout";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout background>
    <NextSeo title="Matcha - Reset password" description="" />
    <PasswordReset />
  </Layout>
);

export default index;
