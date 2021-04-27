import React from "react";
import SwipeImage from "@/components/SwipeImage";
import type { SwipeDirection } from "@/components/SwipeImage";
import SettingsIcon from "@/components/ui/Icons/SettingsIcon";
import SearchIcon from "@/components/ui/Icons/SearchIcon";
import { useUser } from "@/components/auth";
import { useSuggestions } from "@/utils/requests/suggestions";
import { like } from "@/utils/requests/userRequests";
import Settings from "@/components/ProfileListingSettings";
import LoadingRing from "@/components/ui/Icons/LoadingRing";
import SwipeImageHints from "@/components/SwipeImageHints";

const ROW_COUNT = 4;

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

  if (error) return <>suggestions error...</>;
  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <LoadingRing color="#33d398" />
      </div>
    );
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

  const handleOutOfFrame = (_nameToDelete: string) => {
    setNumberOfSwipes((prev) => prev + 1);
    // data?.pages.splice(
    //   indexOf(data?.pages[0].data, (elem) => elem.userName === nameToDelete),
    //   1
    // ); // find index and delete suggestion from data
  };

  const filterProps = {
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
  };

  const searchProps = {
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
      <Settings {...filterProps} />
      <Settings {...searchProps} />
      <SwipeImageHints />
    </>
  );
};

export default ProfileListing;
