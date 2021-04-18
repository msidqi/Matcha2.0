import React from "react";
import ArrowRightIcon from "@/components/ui/Icons/ArrowRightIcon";

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

export default MainMenuItem;
