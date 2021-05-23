import React from "react";
import Signin from "@/components/Signin";
import Layout from "@/components/ui/Layout";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout background>
    <NextSeo title="Matcha - Sign in" description="" />
    <Signin />
  </Layout>
);

export default index;
