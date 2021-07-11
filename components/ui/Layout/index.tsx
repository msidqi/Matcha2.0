import React, { FC } from "react";
import Navbar from "@/components/ui/Navbar";

const Layout: FC<{ background?: boolean; heightScreen?: boolean }> = ({
  children,
  background = false,
  heightScreen = true,
}) => (
  <>
    <Navbar />
    <main
      className={`overflow-x-hidden ${
        background
          ? "bg-gray-900 bg-mainBackgroundImage bg-cover bg-center animate-backgroundShiftTablet xl:animate-backgroundShift"
          : ""
      }`}
    >
      <div
        className={`${
          heightScreen ? "h-screen" : ""
        } max-w-7xl mx-auto pt-16 box-border block sm:flex justify-center`}
      >
        {children}
      </div>
    </main>
  </>
);

export default Layout;
