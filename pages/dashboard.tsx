import React from "react";
import Dashboard from "@/components/Dashboard";
import Layout from "@/components/ui/Layout";
import withAuth from "@/components/WithAuth";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => (
  <Layout>
    <NextSeo title="Matcha - Dashboard" description="" />
    <Dashboard />
  </Layout>
);

export default withAuth(index);
