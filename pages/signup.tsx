import React from "react";
import Signup from "@/components/Signup";
import Layout from "@/components/ui/Layout";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout background>
    <NextSeo title="Matcha - Create a profile" description="" />
    <Signup />
  </Layout>
);

export default index;
