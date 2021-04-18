import React from "react";
import ArrowBack from "@/components/ui/Icons/ArrowBack";
import { useMenu } from "@/modules/Menu/components/CompactMenu/context";

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
          className="sm:hidden mr-2 rounded-full cursor-pointer hover:bg-green-50 p-1"
          onClick={() => menuSetView("main")}
        >
          <ArrowBack />
        </button>
      )}
      <h1 className="font-bold text-black text-xl">{title}</h1>
    </div>
  );
};
export default Title;
