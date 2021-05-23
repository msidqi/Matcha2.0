import React from "react";
import ForgotPassword from "@/components/ForgotPassword";
import Layout from "@/components/ui/Layout";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout background>
    <NextSeo title="Matcha - Forgot password" description="" />
    <ForgotPassword />
  </Layout>
);

export default index;
