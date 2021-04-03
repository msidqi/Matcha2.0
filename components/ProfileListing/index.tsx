import React, { CSSProperties } from "react";
import SwipeImage from "@/components/SwipeImage";
import type { SwipeDirection } from "@/components/SwipeImage";
import { Transition, Switch } from "@headlessui/react";
import { Range } from "@/components/Range";
import TagsDisplay from "@/components/TagsDisplay";
import SettingsIcon from "@/components/ui/Icons/SettingsIcon";
import SearchIcon from "@/components/ui/Icons/SearchIcon";
import { useUser } from "../auth";
import { useSuggestions } from "@/utils/requests/suggestions";
import { like, deleteLike } from "@/utils/requests/userRequests";
import Select from "../Select";
import { sortOptions, sortOrder } from "./selectOptions.json";
// import { indexOf } from "@/utils/indexOf";

interface SettingsContainerProps {
  disableSettingsDisplay: () => void;
  style?: CSSProperties;
}

const ROW_COUNT = 4;

const SettingsContainer: React.FC<SettingsContainerProps> = ({
  children,
  disableSettingsDisplay,
  style,
}): JSX.Element => {
  const handleBodyClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  React.useEffect(() => {
    window.addEventListener("click", disableSettingsDisplay);
    return () => {
      window.removeEventListener("click", disableSettingsDisplay);
    };
  }, []);

  return (
    <div
      onClick={handleBodyClick}
      style={{ ...style, maxWidth: "44rem" }}
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 shadow-lg sm:rounded-md w-screen px-4 py-2 bg-white border-2 border-gray-100"
    >
      {children}
    </div>
  );
};

const ProfileListing = () => {
  const [showSearch, setShowSearch] = React.useState<boolean>(false);
  const [triS, setTriS] = React.useState<string>("");
  const [triOrderS, setTriOrderS] = React.useState<string>("");
  const [ageRangeS, setAgeRangeS] = React.useState<[number, number]>([18, 22]);
  const [distanceRangeS, setDistanceRangeS] = React.useState<[number]>([1]);
  const [experienceRangeS, setExperienceRangeS] = React.useState<
    [number, number]
  >([0, 30]);
  const [tagsSetS, setTagsSetS] = React.useState<Set<string>>(
    new Set(["Hello", "World", "1337", "42"])
  );
  const [isSearchActive, setIsSearchActive] = React.useState<boolean>(false);
  const [showFilters, setShowFilters] = React.useState<boolean>(false);
  const [tri, setTri] = React.useState<string>("");
  const [triOrder, setTriOrder] = React.useState<string>("");
  const [ageRange, setAgeRange] = React.useState<[number, number]>([18, 22]);
  const [distanceRange, setDistanceRange] = React.useState<[number]>([1]);
  const [experienceRange, setExperienceRange] = React.useState<
    [number, number]
  >([0, 30]);
  const [tagsSet, setTagsSet] = React.useState<Set<string>>(
    new Set(["Hello", "World", "1337", "42"])
  );
  const [isFilterActive, setIsFilterActive] = React.useState<boolean>(false);
  const [numberOfSwipes, setNumberOfSwipes] = React.useState<number>(0);
  const [{ user }] = useUser();
  const { data, fetchNextPage, isFetching, error, isLoading } = useSuggestions({
    authorization: user?.authorization || "",
    row_count: ROW_COUNT,
    filter: isFilterActive
      ? {
          age: ageRange,
          distance: distanceRange,
          experience: experienceRange,
          tags: [...tagsSet],
        }
      : isSearchActive
      ? {
          age: ageRangeS,
          distance: distanceRangeS,
          experience: experienceRangeS,
          tags: [...tagsSetS],
        }
      : undefined,
    tri:
      isFilterActive && triOrder && tri
        ? { [`${tri}`]: `${triOrder}` }
        : isSearchActive && triOrderS && triS
        ? { [`${triS}`]: `${triOrderS}` }
        : undefined,
    isSearch: isSearchActive,
  });
  console.log({ isSearchActive });
  if (error) return <>suggestions error...</>;
  if (isLoading) return <>suggestions are loading...</>;
  const allSuggestedUsers = data?.pages.flatMap((page) => page.data).reverse();
  // console.log({ allSuggestedUsers }, data?.pageParams);

  const toggleFilters = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFilters(!showFilters);
    if (!showFilters) {
      setShowSearch(false);
    }
    if (showFilters) {
      window.addEventListener("click", disableFilterDisplay);
    }
  };

  const disableFilterDisplay = () => {
    setShowFilters(false);
    window.removeEventListener("click", disableFilterDisplay);
  };

  const toggleSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSearch(!showSearch);
    if (!showSearch) {
      setShowFilters(false);
    }
    if (showSearch) {
      window.addEventListener("click", disableSearchDisplay);
    }
  };

  const disableSearchDisplay = () => {
    setShowSearch(false);
    window.removeEventListener("click", disableSearchDisplay);
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
          await like({
            authorization: user.authorization,
            liker: user.data.userName,
            liked: nameToDelete,
          });
          // console.log("like result", result);
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
    setNumberOfSwipes((prev) => prev + 1);
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
        endOfSuggestions={allSuggestedUsers?.length === numberOfSwipes}
      />
      <div className="my-2 mx-auto flex justify-center">
        <div
          className="m-2 transform transition duration-300 hover:scale-110 bg-white rounded-full shadow-md h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center cursor-pointer"
          onClick={toggleFilters}
        >
          <SettingsIcon />
        </div>
        <div
          className="m-2 transform transition duration-300 hover:scale-110 bg-white rounded-full shadow-md h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center cursor-pointer"
          onClick={toggleSearch}
        >
          <SearchIcon />
        </div>
      </div>
      <Settings
        {...{
          settingsName: "Filters",
          showSettings: showFilters,
          isSettingActive: isFilterActive,
          setIsSettingActive: setIsFilterActive,
          tri,
          setTri,
          triOrder,
          setTriOrder,
          ageRange,
          setAgeRange,
          distanceRange,
          setDistanceRange,
          experienceRange,
          setExperienceRange,
          tagsSet,
          setTagsSet,
          disableSettingsDisplay: disableFilterDisplay,
        }}
      />
      <Settings
        {...{
          settingsName: "Search",
          showSettings: showSearch,
          isSettingActive: isSearchActive,
          setIsSettingActive: setIsSearchActive,
          tri: triS,
          setTri: setTriS,
          triOrder: triOrderS,
          setTriOrder: setTriOrderS,
          ageRange: ageRangeS,
          setAgeRange: setAgeRangeS,
          distanceRange: distanceRangeS,
          setDistanceRange: setDistanceRangeS,
          experienceRange: experienceRangeS,
          setExperienceRange: setExperienceRangeS,
          tagsSet: tagsSetS,
          setTagsSet: setTagsSetS,
          disableSettingsDisplay: disableSearchDisplay,
        }}
      />
    </>
  );
};
export default ProfileListing;

interface SettingsProps {
  settingsName?: string;
  showSettings: boolean;
  isSettingActive: boolean;
  setIsSettingActive: React.Dispatch<React.SetStateAction<boolean>>;
  disableSettingsDisplay: () => void;
  ageRange: [number, number];
  setAgeRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  experienceRange: [number, number];
  setExperienceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  distanceRange: [number];
  setDistanceRange: React.Dispatch<React.SetStateAction<[number]>>;
  tagsSet: Set<string>;
  setTagsSet: React.Dispatch<React.SetStateAction<Set<string>>>;

  tri: string;
  setTri: React.Dispatch<React.SetStateAction<string>>;

  triOrder: string;
  setTriOrder: React.Dispatch<React.SetStateAction<string>>;
}

const Settings = ({
  settingsName = "Settings",
  showSettings,
  isSettingActive,
  setIsSettingActive,
  disableSettingsDisplay,
  ageRange,
  setAgeRange,
  experienceRange,
  setExperienceRange,
  distanceRange,
  setDistanceRange,
  tagsSet,
  setTagsSet,
  tri,
  setTri,
  triOrder,
  setTriOrder,
}: SettingsProps) => {
  return (
    <section className="z-20 relative">
      <Transition
        show={showSettings}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-20"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-20"
      >
        <SettingsContainer
          disableSettingsDisplay={disableSettingsDisplay}
          style={!isSettingActive ? { filter: "grayscale(80%)" } : {}}
        >
          <div className="w-full mb-2 mt-2 py-4 px-2 border-gray-200 border-2 rounded-md">
            <Switch.Group
              as="div"
              className="flex items-center justify-between space-x-4"
            >
              <label className="block text-gray-700 font-semibold">
                {`Enable ${settingsName}`}
              </label>
              <Switch
                as="button"
                checked={isSettingActive}
                onChange={setIsSettingActive}
                className={`${
                  isSettingActive ? "bg-green-400" : "bg-gray-200"
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
          <div className="border-gray-200 border-2 p-4 rounded-md mb-4">
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
            <div className="mb-2 p-4 border-gray-200 border-2 rounded-2xl">
              <Select
                name="tri"
                initialValue={tri}
                placeholder="Select what to sort by"
                label="Sort by"
                options={sortOptions}
                onChange={(e) => setTri(e.target.value)}
              />
            </div>
            <div className="mb-2 p-4 border-gray-200 border-2 rounded-2xl">
              <Select
                name="triOrder"
                initialValue={triOrder}
                placeholder="Select sort order"
                label="Sort order"
                options={sortOrder}
                onChange={(e) => setTriOrder(e.target.value)}
              />
            </div>
          </div>
          {/* <div className="border-gray-200 border-2 p-4 rounded-md">

          </div> */}
        </SettingsContainer>
      </Transition>
    </section>
  );
};
