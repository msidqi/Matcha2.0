import React from "react";
import CompactMenu from "@/components/CompactMenu";
import { menuList } from "@/components/CompactMenu/mainmenu.json";
import SettingsImages from "@/components/SettingsImages";
import SettingsPersonalInfo from "@/components/SettingsPersonalInfo";
import SettingsAccount from "@/components/SettingsAccount";

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
