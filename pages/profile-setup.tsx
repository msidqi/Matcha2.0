import React from "react";
import ProfileSetup from "@/components/ProfileSetup";
import Layout from "@/components/ui/Layout";
import ImageUpload from "@/components/ImageUpload";

const index = (): JSX.Element => (
  <Layout>
    {/* <ProfileSetup /> */}
    <ImageUpload limit={5} />
  </Layout>
)

export default index;
