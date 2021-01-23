// import axios from "axios";
import React from "react";
import ProfileListing from "@/components/ProfileListing";
import SideProfileLayout from "@/components/SideProfileLayout";

const Dashboard = (): JSX.Element => (
  <SideProfileLayout>
    <ProfileListing />
  </SideProfileLayout>
);

export default Dashboard;
