import * as React from "react";
import type { MainMenuItemType } from "./types";
import { useMenu, MenuProvider } from "./context";
import ArrowRightIcon from "@/components/ui/Icons/ArrowRightIcon";

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
  const { getCurrentItem, menuHistoryPush } = useMenu();
  const currentItem = getCurrentItem();

  // set default menu picked
  React.useEffect(() => {
    mainMenuItems.length > 0 && menuHistoryPush(mainMenuItems[0]);
  }, []);

  return (
    <div className="flex h-full w-full border-r border-l border-gray-200">
      <MainMenu
        title={mainMenuTitle}
        items={mainMenuItems}
        className="flex-auto w-4/12 bg-white border-r border-gray-200"
      />
      <MainMenuContent>
        {currentItem?.key && contentMenuContentItems[currentItem.key]}
      </MainMenuContent>
    </div>
  );
};

// -----------------------------------

const Title = ({ title }: { title: string }) => (
  <div className="bg-white h-14 w-full border-b border-gray-300 py-2 px-4 flex items-center">
    <h1 className="font-bold text-black text-xl">{title}</h1>
  </div>
);

// -----------------------------------
interface MainMenuProps {
  title?: string;
  items: MainMenuItemType[];
  className?: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ title, items, className }) => {
  const { getCurrentItem, menuHistoryPush } = useMenu();
  const currentItem = getCurrentItem();

  return (
    <section className={className}>
      {title && <Title title={title} />}
      {items.map((item, index) => (
        <MainMenuItem
          {...item}
          isCurrent={item.key === currentItem?.key}
          key={`menuItem-${index}`}
          onItemClick={() => /*menuSetCurrent(item)*/ menuHistoryPush(item)}
        />
      ))}
    </section>
  );
};

// -----------------------------------
interface MainMenuItemProps {
  key: string;
  label: string;
  onItemClick?: () => void;
  isCurrent?: boolean;
}

const MainMenuItem: React.FC<MainMenuItemProps> = ({
  onItemClick,
  label,
  // key,
  isCurrent = false,
}) => {
  return (
    <section
      onClick={onItemClick}
      className=" relative bg-white hover:bg-gray-100 cursor-pointer h-12 py-2 px-4 w-full border-b border-gray-200 flex justify-between items-center"
    >
      {isCurrent && (
        <div className="absolute right-0 h-full border-r-2 border-green-400"></div>
      )}
      <p className="text-gray-700 text-base">{label}</p>
      <ArrowRightIcon />
    </section>
  );
};

// -----------------------------------
interface MainMenuContentProps {}

const MainMenuContent: React.FC<MainMenuContentProps> = ({ children }) => {
  const menu = useMenu();
  const currentItem = menu.getCurrentItem();
  return (
    <section className="flex-auto w-7/12 bg-white">
      {currentItem?.label && <Title title={currentItem.label} />}
      {children}
    </section>
  );
};

export default CompactMenu;
