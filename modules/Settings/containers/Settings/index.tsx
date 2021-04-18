import React from "react";
import CompactMenu from "@/modules/Menu/components/CompactMenu";
import { menuList } from "./mainmenu.json";
import SettingsImages from "@/modules/Settings/components/SettingsImages";
import SettingsPersonalInfo from "@/modules/Settings/components/SettingsPersonalInfo";
import SettingsAccount from "@/modules/Settings/components/SettingsAccount";

const Settings = (): JSX.Element => {
  return (
    <div className="h-full w-full bg-white">
      <CompactMenu
        mainMenuItems={menuList}
        contentMenuContentItems={{
          images: <SettingsImages />,
          personal: <SettingsPersonalInfo />,
          account: <SettingsAccount />,
        }}
      />
    </div>
  );
};

export default Settings;
