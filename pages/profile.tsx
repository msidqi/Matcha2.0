import React from "react";
import Profile from "@/components/Profile";
import Layout from "@/components/ui/Layout";
import { ProfileType } from "@/interfaces";

const profile: ProfileType = {
  name: "vmod",
  url: "/profile.jpg",
  distance: 1.1,
  age: 42,
  gender: "male",
  orientation: "female",
  tags: ["Hello", "World", "1337", "42"],
  bio:
    "Dignissim suspendisse in est ant nibh Nisi est ? sit amet facilisis...Urna condimentum mattis pellentesque id nibh tortor id 🖤❤️",
};

const index = (): JSX.Element => (
  <Layout>
    <Profile profile={profile} />
  </Layout>
);

export default index;
