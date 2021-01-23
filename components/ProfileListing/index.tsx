import React, { CSSProperties } from "react";
import SwipeImage from "@/components/SwipeImage";
import { Transition, Switch } from "@headlessui/react";
import { Range } from "@/components/Range";
import TagsDisplay from "@/components/TagsDisplay";
import SettingsIcon from "@/components/ui/Icons/SettingsIcon";
import { useQuery } from "react-query";
import axios from "axios";
import { useUser } from "../auth";

interface FilterContainerProps {
  disableFiltersDisplay: () => void;
  applyFilter: () => void;
  style?: CSSProperties;
}

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
  const [isEnabledFilters, setIsEnabledFilters] = React.useState<boolean>(
    false
  );
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  const [tagsFilter, setTagsFilter] = React.useState<string[]>([]);
  const [ageRange, setAgeRange] = React.useState<[number, number]>([18, 22]);
  const [popularityRange, setPopularityRange] = React.useState<
    [number, number]
  >([0, 30]);
  const [distanceRange, setDistanceRange] = React.useState<[number]>([1]);
  const [{ user, loggedIn }] = useUser();
  console.log("user?.getAuthorization()", user?.getAuthorization?.());
  const { isLoading, error, data } = useQuery(
    "suggestions",
    () =>
      axios.post(
        "/api/suggestions",
        { offset: 0, row_count: 2 },
        {
          headers: {
            Authorization: user?.getAuthorization?.(),
          },
        }
      ),
    { enabled: loggedIn }
  );

  console.log(isLoading, error, data);
  const toggleFilters = (event: React.MouseEvent) => {
    setShowFilters(!showFilters);
    event.stopPropagation();
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
        tagsFilter,
        "age",
        ageRange,
        "popularity",
        popularityRange,
        "distance",
        distanceRange
      );
    }
  };
  console.log("isEnabledFilters", isEnabledFilters);

  return (
    <>
      <button
        className="my-4 mx-auto transform transition duration-300 hover:scale-110 bg-white rounded-full shadow-md h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center cursor-pointer"
        onClick={toggleFilters}
      >
        <SettingsIcon />
      </button>
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
                onTagChange={(_, all) => setTagsFilter(all)}
                initialTags={["Hello", "World", "1337", "42"]}
                variant="secondary"
              />
            </div>
          </FiltersContainer>
        </Transition>
      </section>
      <SwipeImage />
    </>
  );
};

export default ProfileListing;
