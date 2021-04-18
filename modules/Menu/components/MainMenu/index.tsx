import React from "react";
import { MainMenuItemType } from "@/modules/Menu/components/CompactMenu/types";
import { useMenu } from "@/modules/Menu/components/CompactMenu/context";
import MainMenuItem from "@/modules/Menu/components/MainMenuItem";
import Title from "@/modules/Menu/components/Title";

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

export default MainMenu;
