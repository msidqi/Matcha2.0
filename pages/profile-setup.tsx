import React from "react";
import ProfileSetup from "@/components/ProfileSetup";
import Layout from "@/components/ui/Layout";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout>
    <NextSeo title="Matcha - Complete your profile" description="" />
    <ProfileSetup />
  </Layout>
);

export default index;
