import React from "react";

const DashboardProfile = () => {
  return (
    <div className="w-60 mb-10 px-4 text-center">
      <div className="m-auto rounded-full h-20 w-20 overflow-hidden border-2 border-gray-300">
        <img
          alt="content"
          className="object-cover object-center h-full w-full"
          src="/profile.jpg"
        />
      </div>
      <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">
        User Name
      </h2>
    </div>
  );
};

export default DashboardProfile;
