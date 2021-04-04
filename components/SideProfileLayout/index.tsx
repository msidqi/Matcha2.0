import React from "react";
import DashboardProfile from "@/components/DashboardProfile";

const SideProfileLayout: React.FC = ({ children }): JSX.Element => {
  return (
    <div className="flex h-full">
      {/* <section className="border-r border-gray-300 p-2 hidden sm:block">
        <DashboardProfile />
      </section> */}
      <section className="flex flex-1 justify-start sm:justify-center flex-col items-center sm:p-2 w-full">
        {children}
      </section>
    </div>
  );
};

export default SideProfileLayout;
