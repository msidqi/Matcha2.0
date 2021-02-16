import React, { CSSProperties } from "react";
import SwipeImage from "@/components/SwipeImage";
import type { SwipeDirection } from "@/components/SwipeImage";
import { Transition, Switch } from "@headlessui/react";
import { Range } from "@/components/Range";
import TagsDisplay from "@/components/TagsDisplay";
import SettingsIcon from "@/components/ui/Icons/SettingsIcon";
import { useUser } from "../auth";
import { useSuggestions } from "@/utils/requests/suggestions";
import { indexOf } from "@/utils/indexOf";
// import { ProfileType } from "@/interfaces";

interface FilterContainerProps {
  disableFiltersDisplay: () => void;
  applyFilter: () => void;
  style?: CSSProperties;
}

const ROW_COUNT = 3;

const FiltersContainer: React.FC<FilterContainerProps> = ({
  children,
  disableFiltersDisplay,
  applyFilter,
  style,
}): JSX.Element => {
  const handleBodyClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  React.useEffect(() => {
    window.addEventListener("click", disableFiltersDisplay);
    return () => {
      window.removeEventListener("click", disableFiltersDisplay);
      // applyFilter();
    };
  }, []);

  return (
    <div
      onClick={handleBodyClick}
      style={{ ...style, maxWidth: "44rem" }}
      className="absolute top-0 left-1/2 transform -translate-x-1/2 shadow-lg sm:rounded-md w-screen px-4 py-2 bg-white border-2 border-gray-100 z-10"
    >
      {children}
    </div>
  );
};

const ProfileListing = () => {
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  const [ageRange, setAgeRange] = React.useState<[number, number]>([18, 22]);
  const [distanceRange, setDistanceRange] = React.useState<[number]>([1]);
  const [popularityRange, setPopularityRange] = React.useState<
    [number, number]
  >([0, 30]);
  const [isEnabledFilters, setIsEnabledFilters] = React.useState<boolean>(
    false
  );
  const [tagsSet, setTagsSet] = React.useState<Set<string>>(
    new Set(["Hello", "World", "1337", "42"])
  );
  const [{ user, loggedIn }] = useUser();
  const [offset, setOffset] = React.useState<number>(1);
  const { data, fetchNextPage, isFetching } = useSuggestions({
    authorization: user?.authorization || "",
    enabled: loggedIn,
    offset,
    row_count: ROW_COUNT,
  });

  const allSuggestedUsers = data?.pages.flatMap((page) => page.data);
  console.log("allSuggestedUsers", allSuggestedUsers);

  const toggleFilters = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFilters(!showFilters);
    if (showFilters) {
      window.addEventListener("click", disableFiltersDisplay);
    }
  };

  const disableFiltersDisplay = () => {
    setShowFilters(false);
    window.removeEventListener("click", disableFiltersDisplay);
  };

  const applyFilter = () => {
    if (isEnabledFilters) {
      console.log(
        "apply filter with these settings\n",
        "tags",
        [...tagsSet],
        "age",
        ageRange,
        "popularity",
        popularityRange,
        "distance",
        distanceRange
      );
    }
  };
  // console.log("isEnabledFilters", isEnabledFilters);
  // console.log("data?.pageParams", data?.pageParams);
  const handleSwipe = (nameToDelete: string, direction: SwipeDirection) => {
    //   `${direction === "left" ? "Disliked" : "Liked"} ${nameToDelete}`
    if (!isFetching) {
      fetchNextPage();
      setOffset((prev) => prev + 1);
    }
  };

  const handleOutOfFrame = (nameToDelete: string) => {
    // data?.pages.splice(
    //   indexOf(data?.pages[0].data, (elem) => elem.userName === nameToDelete),
    //   1
    // ); // find index and delete suggestion from data
  };

  return (
    <>
      <button
        className="my-4 mx-auto transform transition duration-300 hover:scale-110 bg-white rounded-full shadow-md h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center cursor-pointer"
        onClick={toggleFilters}
      >
        <SettingsIcon />
      </button>
      {/* <button
        style={{ backgroundColor: "red" }}
        onClick={() => {
          if (!isFetching) {
            fetchNextPage();
            setOffset((prev) => prev + 1);
          }
        }}
      >
        fetch more
      </button> */}
      {/* {isFetching ? "isFetching..." : ""} */}
      <section className="relative z-10">
        <Transition
          show={showFilters}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-20"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-20"
        >
          <FiltersContainer
            applyFilter={applyFilter}
            disableFiltersDisplay={disableFiltersDisplay}
            style={!isEnabledFilters ? { filter: "grayscale(80%)" } : {}}
          >
            <div className="w-full mb-4 mt-2 pr-4">
              <Switch.Group
                as="div"
                className="flex items-center justify-between space-x-4"
              >
                <label>Enable Filters</label>
                <Switch
                  as="button"
                  checked={isEnabledFilters}
                  onChange={setIsEnabledFilters}
                  className={`${
                    isEnabledFilters ? "bg-green-400" : "bg-gray-200"
                  } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
                >
                  {({ checked }) => (
                    <span
                      className={`${
                        checked ? "translate-x-5" : "translate-x-0"
                      } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
                    />
                  )}
                </Switch>
              </Switch.Group>
            </div>
            <div className="mb-2">
              <Range
                label="Age"
                range={ageRange}
                setRange={setAgeRange}
                onRangeChange={(currentRange) =>
                  console.log("age", currentRange)
                }
              />
            </div>
            <div className="mb-2">
              <Range
                label="Popularity range"
                max={100}
                min={0}
                unit="pt"
                range={popularityRange}
                setRange={setPopularityRange}
                onRangeChange={(currentRange) =>
                  console.log("popularity range", currentRange)
                }
              />
            </div>
            <div className="mb-2">
              <Range
                label="Location"
                step={0.1}
                max={10}
                min={0}
                unit="km"
                range={distanceRange}
                setRange={setDistanceRange}
                onRangeChange={(currentRange) =>
                  console.log("location", currentRange)
                }
              />
            </div>
            <div className="mb-2">
              <TagsDisplay
                tagsSet={tagsSet}
                setTagsSet={setTagsSet}
                variant="secondary"
              />
            </div>
          </FiltersContainer>
        </Transition>
      </section>
      <SwipeImage
        suggestedUsers={allSuggestedUsers}
        onSwiped={handleSwipe}
        onOutOfFrame={handleOutOfFrame}
      />
    </>
  );
};
export default ProfileListing;
