// import axios from "axios";
import React from "react";
import CompactMenu from "@/components/CompactMenu";
import { menuList } from "@/components/CompactMenu/mainmenu.json";

const Settings = (): JSX.Element => {
  return (
    <div className="h-full w-full bg-white">
      <CompactMenu
        mainMenuItems={menuList}
        contentMenuContentItems={{
          images: "Hello",
          personal: "World",
          account: "Goodbye",
        }}
      />
    </div>
  );
};

export default Settings;
