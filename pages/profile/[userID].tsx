import React from "react";
import Profile from "@/components/Profile";
import Layout from "@/components/ui/Layout";
import { ProfileType } from "@/interfaces";
import { GetServerSideProps } from "next";
import { apiRequest } from "@/utils/API";
import { UserInput } from "@/components/auth";

export const profile: ProfileType = {
  firstName: "vmod",
  lastName: "vmod",
  userName: "vmod",
  email: "vmod@gmail.com",
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

const apiURL = "http://localhost:3001";

export const getServerSideProps: GetServerSideProps = async ({
  req: { headers },
  params,
}) => {
  const userID = params?.userID;
  console.log({ userID });
  try {
    const result = await apiRequest<{ accessToken: string }>(
      "get",
      `${apiURL}/api/generateAccessToken`,
      { headers }
    )[0];
    console.log("result", result.data);
    if (result.status === 200 && typeof result.data.accessToken === "string") {
      const accessToken = result.data.accessToken;
      const { data: userData } = await apiRequest<UserInput>(
        "get",
        `${apiURL}/api/otherUserInfos/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )[0];
      console.log({ userData });
    }
  } catch (e) {
    console.log("err", e);
  }
  return {
    props: {},
  };
};

export default index;
