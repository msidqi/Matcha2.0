import React, { CSSProperties } from "react";
import { Transition, Switch } from "@headlessui/react";
import { Range } from "@/components/ui/Range";
import TagsDisplay from "@/components/TagsDisplay";
import Select from "@/components/ui/Select";
import { sortOptions, sortOrder } from "./selectOptions.json";

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
          <div className="sm:px-2 sm:mb-2  sm:border-2 w-full py-4 px-4 border-gray-200 rounded-md">
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
          <div className="border-gray-200 border-2 p-4 rounded-md">
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

interface SettingsContainerProps {
  disableSettingsDisplay: () => void;
  style?: CSSProperties;
}

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
      className="sm:absolute sm:bottom-16 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:p-4 sm:shadow-md sm:rounded-md border-2 sm:border-gray-100 w-screen bg-white"
    >
      {children}
    </div>
  );
};

export default Settings;
