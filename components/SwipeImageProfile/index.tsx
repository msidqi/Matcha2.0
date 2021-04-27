import React from "react";
import PositionIcon from "@/components/ui/Icons/PositionIcon";
import AvatarIcon from "@/components/ui/Icons/AvatarIcon";
import { formatDistance } from "@/utils/formatDistance";
import { SuggestedUser } from "@/utils/requests/suggestions";
import { useUser } from "../auth";

interface Props {
  profile: SuggestedUser;
}

const SwipeImageProfile = ({
  profile: { userName, age, distance, gender, orientation, bio, image },
}: Props) => {
  const [state, setExpand] = React.useState<{
    expand: boolean;
    doExpand: boolean;
  }>({ expand: false, doExpand: true });
  const handleExpand = () => {
    state.doExpand && setExpand({ ...state, expand: !state.expand });
  };

  const [{ user }, { loading }] = useUser();

  if (loading) return <>Loading...</>;
  if (!user) return <>Error</>;

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
    <SwipeCardContainer>
      <div
        style={{ backgroundImage: `url(data:image/jpg;base64,${image})` }}
        className="relative sm:max-w-sm h-full w-full sm:rounded-2xl bg-cover bg-center cursor-pointer"
      >
        <div
          onClick={state.expand ? handleExpand : undefined}
          className="bg-white px-2 py-2 border-gray-200 border-2 rounded-xl  m-auto mb-0 cursor-pointer w-11/12 absolute bottom-2 left-2/4 transform -translate-x-1/2"
        >
          {mainDetails}
          {bio && state.expand && (
            <>
              <h4 className="text-gray-600 text-base font-medium mt-2">
                About:
              </h4>
              <p className="text-gray-500 text-sm">{bio}</p>
            </>
          )}
        </div>
      </div>
    </SwipeCardContainer>
  );
};

export const SwipeCardContainer: React.FC = ({ children }) => (
  <article
    style={{ height: "34rem" }}
    className="bg-white absolute top-0 w-full sm:rounded-2xl"
  >
    {children}
  </article>
);

export const SuggestionEmptyCard: React.FC = () => (
  <SwipeCardContainer>
    <div className="bg-green-400 sm:max-w-sm h-full w-full sm:rounded-2xl bg-cover bg-center flex justify-center items-center flex-col px-6">
      <h1 className="text-2xl font-bold select-none">That's everyone !</h1>
      <p className="select-none text-center">
        You've seen everyone that fit your criterias. Change your filters or
        check later.
      </p>
    </div>
  </SwipeCardContainer>
);

export default SwipeImageProfile;
