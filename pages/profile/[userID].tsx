import React from "react";
import Profile from "@/components/Profile";
import Layout from "@/components/ui/Layout";
import { ProfileType } from "@/interfaces";
import { GetServerSideProps } from "next";
import { apiRequest } from "@/utils/API";
import { UserInput } from "@/components/auth";
import withAuth from "@/components/WithAuth";

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
const p = {
  // birthDate: "1980-07-05T00:00:00.000Z",
  // experience: 0,
  // id: 262,
  // images: [],
  // lastSeen: "2021-03-12T15:29:42.000Z",
  // rank: "Apprentice",
};
const index = (): JSX.Element => (
  <Layout>
    <Profile />
  </Layout>
);

const apiURL = "http://localhost:3001";

/*export const getServerSideProps: GetServerSideProps = async ({
  req: { headers },
  params,
  res,
}) => {
  const userID = params?.userID;

  if (!userID) {
    res.writeHead(301, { location: `${apiURL}/dashboard` });
    res.end();
    return { props: {} };
  }
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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImNvbm5lY3RlZFVzZXIiLCJpYXQiOjE2MTU1Njc3ODYsImV4cCI6MTYxNTY1NDE4Nn0.MMY7iwkdZF6S8Sk22Dse0tLgVlgwwoXjEbc9iSavpkk", //`Bearer ${accessToken}`,
          },
        }
      )[0];
      console.log({ userData });
    }
  } catch (e) {
    console.log("err", e);
  }
  return {
    props: { userData: profile },
  };
};
*/
export default withAuth(index);
