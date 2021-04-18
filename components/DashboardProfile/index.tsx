import React from "react";
import { useUser } from "../auth";

const DashboardProfile = () => {
  const [{ user }] = useUser();
  return (
    <div className="w-60 mb-10 px-4 text-center">
      <div className="m-auto rounded-full h-20 w-20 overflow-hidden border border-gray-300">
        {user?.ProfileImageSrc && (
          <img
            alt="content"
            className="object-cover object-center h-full w-full"
            src={user?.ProfileImageSrc}
          />
        )}
      </div>
      <h2 className="title-font text-xl font-medium text-gray-900 mt-6 mb-3">
        {user?.data.userName}
      </h2>
    </div>
  );
};

export default DashboardProfile;
