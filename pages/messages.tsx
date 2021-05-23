import React from "react";
import Layout from "@/components/ui/Layout";
import withAuth from "@/components/WithAuth";
import Chat from "@/components/Chat";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout>
    <NextSeo title="Matcha - Messages" description="" />
    <Chat />
  </Layout>
);

export default withAuth(index);
