// import axios from "axios";
import React, { Fragment } from "react";
import ProfileListing from "@/components/ProfileListing";
import DashboardProfile from "@/components/DashboardProfile";

const Dashboard = (): JSX.Element => {
  const users = ["user1", "user2", "user3", "user4", "user5", "user6"];
  return (
    <div className="flex">
      <section className="bg-white border-r-2 border-gray-300 p-2">
        <DashboardProfile />
      </section>
      <section className="bg-white flex flex-wrap flex-1 items-center justify-center items-center p-2 w-full">
        {users.map((_, index) => (
          <Fragment key={`u-${index}`}>
            <ProfileListing />
          </Fragment>
        ))}
      </section>
      hello world
    </div>
  );
};

export default Dashboard;
