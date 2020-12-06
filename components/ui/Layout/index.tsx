import { FC } from "react";
import Navbar from "@/components/ui/Navbar";

const Layout: FC = ({ children }) => (
  <>
    <Navbar />
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
  </>
);

export default Layout;
