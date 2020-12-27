// import axios from "axios";
import React from "react";
import ProfileListing from "@/components/ProfileListing";
import DashboardProfile from "@/components/DashboardProfile";

const Dashboard = (): JSX.Element => {
  // const users = ["user1", "user2", "user3", "user4", "user5", "user6"];
  return (
    <div className="flex h-full">
      <section className="bg-white border-r border-gray-300 p-2 hidden sm:block relative">
        <DashboardProfile />
      </section>
      <section className="bg-white flex flex-wrap flex-1 justify-center items-center p-2 w-full">
        {/* {users.map((_, index) => ( */}
        {/* <Fragment key={`u-${index}`}> */}
        <ProfileListing />
        {/* </Fragment> */}
        {/* ))} */}
      </section>
    </div>
  );
};

export default Dashboard;
