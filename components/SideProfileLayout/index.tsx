import React from "react";
import DashboardProfile from "@/components/DashboardProfile";

const SideProfileLayout: React.FC = ({ children }): JSX.Element => {
  return (
    <div className="flex h-full">
      <section className="bg-white border-r border-gray-300 p-2 hidden sm:block relative">
        <DashboardProfile />
      </section>
      <section className="bg-white flex flex-wrap flex-1 justify-center items-center p-2 w-full">
        {children}
      </section>
    </div>
  );
};

export default SideProfileLayout;
