import React, { CSSProperties } from "react";
import SwipeImage from "@/components/SwipeImage";
import type { SwipeDirection } from "@/components/SwipeImage";
import { Transition, Switch } from "@headlessui/react";
import { Range } from "@/components/Range";
import TagsDisplay from "@/components/TagsDisplay";
import SettingsIcon from "@/components/ui/Icons/SettingsIcon";
import { useUser } from "../auth";
import { useSuggestions, useSuggestion } from "@/utils/requests/suggestions";
import { like, deleteLike } from "@/utils/requests/userRequests";
// import { indexOf } from "@/utils/indexOf";

interface FilterContainerProps {
  disableFiltersDisplay: () => void;
  style?: CSSProperties;
}

const ROW_COUNT = 10;

const FiltersContainer: React.FC<FilterContainerProps> = ({
  children,
  disableFiltersDisplay,
  style,
}): JSX.Element => {
  const handleBodyClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  React.useEffect(() => {
    window.addEventListener("click", disableFiltersDisplay);
    return () => {
      window.removeEventListener("click", disableFiltersDisplay);
    };
  }, []);

  return (
    <div
      onClick={handleBodyClick}
      style={{ ...style, maxWidth: "44rem" }}
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 shadow-lg sm:rounded-md w-screen px-4 py-2 bg-white border-2 border-gray-100 z-10"
    >
      {children}
    </div>
  );
};

const ProfileListing = () => {
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  const [ageRange, setAgeRange] = React.useState<[number, number]>([18, 22]);
  const [distanceRange, setDistanceRange] = React.useState<[number]>([1]);
  const [experienceRange, setExperienceRange] = React.useState<
    [number, number]
  >([0, 30]);
  const [tagsSet, setTagsSet] = React.useState<Set<string>>(
    new Set(["Hello", "World", "1337", "42"])
  );
  const [isEnabledFilters, setIsEnabledFilters] = React.useState<boolean>(
    false
  );
  const [{ user }] = useUser();
  const { data, fetchNextPage, isFetching, error, isLoading } = useSuggestions({
    authorization: user?.authorization || "",
    row_count: ROW_COUNT,
    filter: isEnabledFilters
      ? {
          age: ageRange,
          distance: distanceRange,
          experience: experienceRange,
          tags: [...tagsSet],
        }
      : undefined,
  });
  if (error) return <>suggestions error...</>;
  if (isLoading) return <>suggestions are loading...</>;
  const allSuggestedUsers = data?.pages.flatMap((page) => page.data).reverse();
  // console.log({ allSuggestedUsers }, data?.pageParams);

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

  const handleSwipe = async (
    nameToDelete: string,
    direction: SwipeDirection
  ) => {
    if (
      typeof nameToDelete === "string" &&
      typeof user?.data.userName === "string"
    ) {
      try {
        if (direction === "right") {
          //like
          const result = await like({
            authorization: user.authorization,
            liker: user.data.userName,
            liked: nameToDelete,
          });
          console.log("like result", result);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (!isFetching) {
      fetchNextPage();
      // setOffset((prev) => prev + 1);
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
      <SwipeImage
        suggestedUsers={allSuggestedUsers}
        onSwiped={handleSwipe}
        onOutOfFrame={handleOutOfFrame}
      />
      <div className="my-2 mx-auto">
        <div
          className="transform transition duration-300 hover:scale-110 bg-white rounded-full shadow-md h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center cursor-pointer"
          onClick={toggleFilters}
        >
          <SettingsIcon />
        </div>
      </div>
      <section className="relative">
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
                range={experienceRange}
                setRange={setExperienceRange}
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
    </>
  );
};
export default ProfileListing;
