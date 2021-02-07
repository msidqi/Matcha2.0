import React from "react";
import PositionIcon from "@/components/ui/Icons/PositionIcon";
import { Transition } from "@headlessui/react";
import Tag from "@/components/Tag";
import AvatarIcon from "@/components/ui/Icons/AvatarIcon";
import { ProfileType } from "@/interfaces";
import { formatDistance } from "@/utils/formatDistance";
import { SuggestedUser } from "@/utils/requests/suggestions";

interface Props {
  profile: SuggestedUser;
  isCurrentlyShown?: boolean;
}

const SwipeImageProfile = ({
  profile: { userName, age, distance, gender, orientation, bio },
  isCurrentlyShown,
}: Props) => {
  const [state, setExpand] = React.useState<{
    expand: boolean;
    doExpand: boolean;
  }>({ expand: false, doExpand: true });
  const handleExpand = () => {
    console.log("clicked");
    state.doExpand && setExpand({ ...state, expand: !state.expand });
  };

  const mainDetails = (
    <div
      onClick={!state.expand ? handleExpand : undefined}
      className="cursor-pointer"
    >
      <h4 className="text-gray-600 text-sm">
        <span className=" text-lg font-semibold">{userName}</span> {age}
      </h4>
      <div className="absolute right-2 top-2">
        <PositionIcon width="18" height="18" className="inline-block mr-1" />
        <p className="text-sm inline-block text-gray-500">{`${formatDistance(
          distance
        )} km`}</p>
      </div>
      <div>
        <AvatarIcon className="inline-block mr-1" />{" "}
        <p className="text-sm inline-block text-gray-400">
          {`${gender}, ${orientation}`}
        </p>
      </div>
    </div>
  );
  return (
    <article
      style={{ height: "34rem" }}
      className={`${
        isCurrentlyShown ? "shadow-xl bg-red-500" : "bg-white"
      } absolute top-0 w-full sm:rounded-2xl cursor-pointer`}
    >
      <div
        style={{ backgroundImage: `url(${"url"})` }}
        className="relative sm:max-w-sm h-full w-full sm:rounded-2xl bg-cover bg-center"
      >
        <div
          onClick={state.expand ? handleExpand : undefined}
          className="bg-white px-2 py-2 border-gray-200 border-2 rounded-xl  m-auto mb-0 cursor-pointer w-11/12 absolute bottom-2 left-2/4 transform -translate-x-1/2"
        >
          {mainDetails}
          <Transition
            show={state.expand}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-y-50"
            enterTo="transform scale-y-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform scale-y-100"
            leaveTo="transform scale-y-50"
          >
            {bio && (
              <>
                <h4 className="text-gray-600 text-base font-medium mt-2">
                  About:
                </h4>
                <p className="text-gray-500 text-sm">{bio}</p>
              </>
            )}
            {/*<h4 className="text-gray-600 text-base font-medium mt-2">
              Interests:
            </h4>
             <div className="mt-1">
              {tags.map((tagName: string, i) => (
                <Tag key={`tag-${i}`} tagName={tagName} />
              ))}
            </div> */}
          </Transition>
        </div>
      </div>
    </article>
  );
};

export default SwipeImageProfile;
