import React from "react";
import SwipeImage from "@/components/SwipeImage";
import { Transition } from "@headlessui/react";
import { Range } from "@/components/Range";
import Input from "@/components/Input";

interface FilterContainerProps {
  disableFiltersDisplay: () => void;
}

const FiltersContainer: React.FC<FilterContainerProps> = ({
  children,
  disableFiltersDisplay,
}): JSX.Element => {
  const handleBodyClick = (event: React.MouseEvent) => {
    console.log("body click");
    event.stopPropagation();
  };

  React.useEffect(() => {
    window.addEventListener("click", disableFiltersDisplay);
    return () => window.removeEventListener("click", disableFiltersDisplay);
  }, []);

  return (
    <div
      onClick={handleBodyClick}
      className="absolute top-full w-full sm:w-96 px-4 py-2 bg-white border-2 border-gray-100 h-96 z-10"
    >
      {children}
    </div>
  );
};

const ProfileListing = () => {
  const [showFilters, setShowFilters] = React.useState<boolean>(false);

  const toggleFilters = (event: React.MouseEvent) => {
    setShowFilters(!showFilters);
    event.stopPropagation();
    if (showFilters) {
      window.addEventListener("click", disableFiltersDisplay);
    }
  };

  const disableFiltersDisplay = () => {
    setShowFilters(false);
    console.log("global click");
    window.removeEventListener("click", disableFiltersDisplay);
  };

  return (
    <>
      <section className="relative z-10">
        <button onClick={toggleFilters}>FILTERICON</button>

        <Transition
          show={showFilters}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-75"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <FiltersContainer disableFiltersDisplay={disableFiltersDisplay}>
            <h4 className="mb-4 mt-0">Filter by</h4>
            <Range
              label="Age"
              initialState={[18, 22]}
              onRangeChange={(currentRange) => console.log(currentRange)}
            />
            <Input name="search" placeholder="Type a name" label="Search" />
          </FiltersContainer>
        </Transition>
      </section>
      <SwipeImage />
    </>
  );
};

export default ProfileListing;
