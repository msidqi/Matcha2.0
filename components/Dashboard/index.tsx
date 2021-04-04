// import axios from "axios";
import React from "react";
import ProfileListing from "@/components/ProfileListing";
import SideProfileLayout from "@/components/SideProfileLayout";
import { updatePosition } from "@/utils/requests/userRequests";
import { useUser } from "../auth";

const Dashboard = (): JSX.Element => {
  const [{ user }] = useUser();
  React.useEffect(() => {
    const authorization = user?.authorization || "";
    updatePosition(authorization).catch(console.error);
  }, []);

  return (
    <SideProfileLayout>
      <ProfileListing />
    </SideProfileLayout>
  );
};

export default Dashboard;
