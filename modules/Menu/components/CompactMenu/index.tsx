import * as React from "react";
import type { MainMenuItemType } from "@/modules/Menu/components/CompactMenu/types";
import {
  useMenu,
  MenuProvider,
} from "@/modules/Menu/components/CompactMenu/context";
import MainMenu from "@/modules/Menu/components/MainMenu";
import MainMenuContent from "@/modules/Menu/components/MainMenuContent";

interface CompactMenuProps {
  mainMenuTitle?: string;
  mainMenuItems: MainMenuItemType[];
  contentMenuContentItems: { [x: string]: React.ReactNode };
}

const CompactMenu: React.FC<CompactMenuProps> = (props) => {
  return (
    <MenuProvider>
      <CompactMenuContainer {...props} />
    </MenuProvider>
  );
};

const CompactMenuContainer: React.FC<CompactMenuProps> = ({
  mainMenuTitle = "Settings",
  mainMenuItems,
  contentMenuContentItems,
}) => {
  const { getCurrentItem, menuHistoryPush, view } = useMenu();
  const currentItem = getCurrentItem();
  console.log("view", view);
  // set default menu picked
  React.useEffect(() => {
    mainMenuItems.length > 0 && menuHistoryPush(mainMenuItems[0]);
  }, []);

  return (
    <div className="flex h-full w-full border-r border-l border-gray-200">
      <MainMenu
        title={mainMenuTitle}
        items={mainMenuItems}
        className={`flex-auto w-4/12 bg-white border-r border-gray-200 sm:block ${
          view === "main" ? "" : "hidden"
        }`}
      />
      <MainMenuContent>
        {currentItem?.key && contentMenuContentItems[currentItem.key]}
      </MainMenuContent>
    </div>
  );
};

export default CompactMenu;
