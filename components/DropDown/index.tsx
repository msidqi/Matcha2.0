import * as React from "react";
import { Transition } from "@headlessui/react";

interface DropDownProps {
  style?: React.CSSProperties;
  className?: string;
  clickable: React.ReactNode;
}

const DropDown: React.FC<DropDownProps> = ({
  children,
  clickable,
  style,
  className,
}): JSX.Element => {
  const [showFilters, setShowFilters] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.addEventListener("click", hideDropDown);
    return () => {
      window.removeEventListener("click", hideDropDown);
    };
  }, []);

  const handleBodyClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const toggleFilters = (event: React.MouseEvent) => {
    setShowFilters(!showFilters);
    event.stopPropagation();
    if (showFilters) {
      window.addEventListener("click", hideDropDown);
    }
  };

  const hideDropDown = () => {
    setShowFilters(false);
    window.removeEventListener("click", hideDropDown);
  };

  return (
    <>
      {/* ---- clickable ---- */}
      <div onClick={toggleFilters}>{clickable}</div>
      {/* ---- drop down ---- */}
      <Transition
        show={showFilters}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-20"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-20"
      >
        <div
          onClick={handleBodyClick}
          style={style}
          className={`${className} z-10`}
        >
          {children}
        </div>
      </Transition>
    </>
  );
};

export default DropDown;
