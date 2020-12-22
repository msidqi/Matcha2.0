import React, { FC } from "react";
import Navbar from "@/components/ui/Navbar";

const Layout: FC = ({ children }) => (
  <>
    <Navbar />
    <main>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  </>
);

export default Layout;
