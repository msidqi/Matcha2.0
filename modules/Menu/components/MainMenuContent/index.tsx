import React from "react";
import { useMenu } from "@/modules/Menu/components/CompactMenu/context";
import Title from "@/modules/Menu/components/Title";

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

export default MainMenuContent;
