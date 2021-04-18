import * as React from "react";
import type { MainMenuItemType } from "./types";
import { useMenu, MenuProvider } from "./context";
import ArrowRightIcon from "@/components/ui/Icons/ArrowRightIcon";
import ArrowBack from "@/components/ui/Icons/ArrowBack";

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

// -----------------------------------

const Title = ({
  title,
  showBackOnMobile = true,
}: {
  title: string;
  showBackOnMobile?: boolean;
}) => {
  const { menuSetView } = useMenu();
  return (
    <div className="bg-white h-14 w-full border-b border-gray-300 py-2 px-4 flex items-center">
      {showBackOnMobile && (
        <button
          className="sm:hidden mr-2 rounded-full"
          onClick={() => menuSetView("main")}
        >
          <ArrowBack />
        </button>
      )}
      <h1 className="font-bold text-black text-xl">{title}</h1>
    </div>
  );
};

// -----------------------------------
interface MainMenuProps {
  title?: string;
  items: MainMenuItemType[];
  className?: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ title, items, className }) => {
  const { getCurrentItem, menuHistoryPush, menuSetView } = useMenu();
  const currentItem = getCurrentItem();

  const onItemClick = (item: MainMenuItemType) => {
    menuSetView("content");
    menuHistoryPush(item);
  };

  return (
    <section className={className}>
      {title && <Title title={title} showBackOnMobile={false} />}
      {items.map((item, index) => (
        <MainMenuItem
          {...item}
          isCurrent={item.key === currentItem?.key}
          key={`menuItem-${index}`}
          onItemClick={() => onItemClick(item)}
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

const MainMenuContent: React.FC = ({ children }) => {
  const { view, getCurrentItem } = useMenu();
  const currentItem = getCurrentItem();
  return (
    <section
      className={`flex-auto w-7/12 bg-white sm:block ${
        view === "content" ? "" : "hidden"
      }`}
    >
      {currentItem?.label && <Title title={currentItem.label} />}
      {children}
    </section>
  );
};

export default CompactMenu;
