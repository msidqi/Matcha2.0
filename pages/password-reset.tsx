import React from "react";
import PasswordReset from "@/components/PasswordReset";
import Layout from "@/components/ui/Layout";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      token: context.query.token,
    },
  };
};

const index = ({ token }: { token?: string }): JSX.Element => (
  <Layout background>
    <NextSeo title="Matcha - Reset password" description="" />
    <PasswordReset token={token || ""} />
  </Layout>
);

export default index;
