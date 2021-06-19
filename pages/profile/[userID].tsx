import { useState } from "react";
import Profile from "@/components/Profile";
import Layout from "@/components/ui/Layout";
import withAuth from "@/components/WithAuth";
import { NextSeo } from "next-seo";

const index = (): JSX.Element => {
  const [userName, setUserName] = useState<string>("");
  return (
    <Layout>
      <NextSeo
        title={`Matcha - ${userName ? `${userName} 's Profile` : ""}`}
        description=""
      />
      <Profile onUserNameChange={(name: string) => setUserName(name)} />
    </Layout>
  );
};

export default withAuth(index);
