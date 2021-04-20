import React from "react";
import Tag from "@/components/ui/Tag";
import AvatarIcon from "@/components/ui/Icons/AvatarIcon";
import DropDownIcon from "@/components/ui/Icons/DropDownIcon";
import PositionIcon from "@/components/ui/Icons/PositionIcon";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import Modal from "@/components/ui/Modal";
import {
  useOtherUserInfosRequest,
  deleteLike,
  block,
  report,
} from "@/utils/requests/userRequests";
import { useUser } from "@/components/auth";
import formatRelative from "date-fns/formatRelative";
import { useRouter } from "next/router";
import LoadingRing from "@/components/ui/Icons/LoadingRing";
import Carousel from "@/modules/Carousel/components/Carousel";
import ArrowNext from "@/components/ui/Icons/ArrowNext";
import ArrowPrev from "@/components/ui/Icons/ArrowPrev";

export type ImageType = { src: string; isProfilePicture: 1 | 0 };

const ProfileDisplay = () => {
  const router = useRouter();
  const [otherUserId, setOtherUserId] = React.useState<number | undefined>();
  const [isMyProfile, setIsMyProfile] = React.useState<boolean>(false);
  const [showDropDown, setShowDropDown] = React.useState<boolean>(false);
  const [{ user }] = useUser();
  const { data: profile, isLoading, error } = useOtherUserInfosRequest({
    authorization: user?.authorization,
    otherUserId,
  });

  React.useEffect(() => {
    const userID = router.query.userID;
    if (userID && typeof userID === "string") {
      const userIDNumber = parseInt(userID);
      setOtherUserId(userIDNumber);
      if (userIDNumber === user?.data.id) setIsMyProfile(true);
    }
  }, [router.query.userID]);

  const distance = "1.2 km";
  let isConnected = false;
  const getLastConnected = React.useCallback(() => {
    const lastSeenDate = new Date(profile?.lastSeen || "");
    return isNaN(lastSeenDate.getTime())
      ? ""
      : `last seen ${formatRelative(lastSeenDate, new Date())}`;
  }, [profile?.lastSeen]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <LoadingRing color="#33d398" />
      </div>
    );
  if (!profile || error || !user) return <>error</>;
  const reportUser = async () => {
    try {
      const reported = profile.userName;
      const reporter = user.data.userName;
      const result = await report({
        authorization: user.authorization,
        reported,
        reporter,
      });
      if (result.status === 200) {
        console.log("reported user");
      } else {
        console.log("could not report user");
      }
    } catch (e) {
      console.log("error reporting user", e);
    }
  };
  const blockUser = async () => {
    try {
      const blocked = profile.userName;
      const blocker = user.data.userName;
      const result = await block({
        authorization: user.authorization,
        blocked,
        blocker,
      });
      if (result.status === 200) {
        console.log("blocked user");
      } else {
        console.log("could not block user");
      }
    } catch (e) {
      console.log("error blocking user", e);
    }
  };
  const unlikeUser = async () => {
    try {
      const liked = profile.userName;
      const liker = user.data.userName;
      const result = await deleteLike({
        authorization: user.authorization,
        liked,
        liker,
      });
      if (result.status === 200) {
        console.log("unliked user");
      } else {
        console.log("could not unlike user");
      }
    } catch (e) {
      console.log("error unliking user", e);
    }
  };

  return (
    <>
      <article
        style={{ height: "min-content" }}
        className="w-96 max-w-full bg-white sm:shadow-lg pb-6 sm:border sm:rounded m-auto sm:mt-8 sm:mb-8"
      >
        <section className="relative mb-4">
          {/* ------ main picture ------ */}

          <Carousel
            style={{ height: "30rem" }}
            containerClassName="bg-red-50 w-96 max-w-full"
            prevArrow={
              <button className="cursor-pointer">
                <ArrowPrev />
              </button>
            }
            nextArrow={
              <button className="cursor-pointer">
                <ArrowNext />
              </button>
            }
            items={profile.images.map((img, index) => (
              <div
                className="w-96 max-w-full mx-auto"
                style={{ height: "30rem" }}
                key={`image-${index}`}
              >
                <picture>
                  <source media="(min-width:650px)" srcSet={img.src} />
                  <img
                    src={img.src}
                    alt="profile picture"
                    className="h-full w-full object-cover sm:rounded-t"
                  />
                </picture>
              </div>
            ))}
          />
          {/* report and block drop down */}
          {!isMyProfile && (
            <div className="absolute top-4 left-2">
              <div
                className="cursor-pointer inline"
                onClick={() => setShowDropDown(!showDropDown)}
              >
                <DropDownIcon className="shadow rounded-xl" />
              </div>
              <Transition
                show={showDropDown}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-20"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-20"
              >
                <div className=" w-64 bg-white rounded-lg text-center divide-y divide-gray-400 shadow-lg border border-gray-400">
                  <div className="block w-full rounded-t py-2.5 px-4  text-sm">
                    {profile.userName} did something bad ?
                  </div>
                  {!isMyProfile && (
                    <Modal
                      onAccept={unlikeUser}
                      title="Delete like ?"
                      buttonText="Unlike user"
                      acceptText="Unlike"
                      denyText="Cancel"
                      variant="secondary"
                      classNameButton="block w-full text-gray-400 py-2.5 uppercase hover:bg-gray-200 hover:text-gray-600"
                      description={`you and ${profile.userName} wont be able to chat with each other, are you sure ?`}
                    />
                  )}
                  <Modal
                    onAccept={reportUser}
                    title="Report"
                    buttonText="Report"
                    acceptText="Report"
                    denyText="Cancel"
                    variant="secondary"
                    classNameButton="block w-full text-gray-400 py-2.5 uppercase hover:bg-gray-200 hover:text-gray-600"
                    description={`are you sure you want to report ${profile.userName} ?`}
                  />
                  <Modal
                    onAccept={blockUser}
                    title="Block"
                    buttonText="Block"
                    acceptText="Block"
                    denyText="Cancel"
                    variant="secondary"
                    classNameButton="block w-full text-red-400 py-2.5 uppercase rounded-b-xl hover:bg-gray-200 hover:text-red-500"
                    description={`you and ${profile.userName} wont be able to see each other profile, are you sure ?`}
                  />
                </div>
              </Transition>
            </div>
          )}
        </section>

        <section className="flex-grow">
          {/* ------ profile information ------ */}
          <div className="px-6 w-full ">
            <div className="mb-2">
              <div className="flex justify-between items-center">
                <h4 className="text-gray-600 text-base ">
                  <span className="text-2xl font-bold">{profile.userName}</span>{" "}
                  <span className="text-lg">{profile.age}</span>
                </h4>
                {!isMyProfile && (
                  <Link href={`/messages?user=${profile.id}`}>
                    <a
                      style={{ transition: "all .15s ease" }}
                      className="bg-green-400 uppercase font-bold hover:shadow-md text-white rounded text-xs px-4 py-2 outline-none focus:outline-none"
                    >
                      Message
                    </a>
                  </Link>
                )}
              </div>
              {!isMyProfile && (
                <div className="flex justify-start items-center">
                  <>
                    <div
                      className={`rounded-full mr-1 ${
                        isConnected
                          ? "bg-green-400 w-2.5 h-2.5"
                          : "border-gray-200 border w-2.5 h-2.5"
                      }`}
                    />
                    <p className="text-gray-500 text-xs">
                      {isConnected ? "connected" : getLastConnected()}
                    </p>
                  </>
                </div>
              )}
              <div className="mt-4 sm:mt-0">
                <AvatarIcon className="inline-block" />{" "}
                <p className="text-sm inline-block text-gray-400">
                  {`${profile.gender}, ${profile.orientation}`}
                </p>
              </div>
              <div>
                <PositionIcon
                  width="12"
                  height="12"
                  className="inline-block mr-1"
                />
                <p className="text-sm inline-block text-gray-400">{distance}</p>
              </div>
            </div>
            {profile.bio && (
              <div className="mb-2">
                <h4 className="text-gray-600 text-base font-medium">About:</h4>
                <p className="text-gray-500 text-sm max-w-md">{profile.bio}</p>
              </div>
            )}
            {profile.tags.length > 0 && (
              <div>
                <h4 className="text-gray-600 text-base font-medium">
                  Interests:
                </h4>
                <div className="mt-1 text-center  ">
                  {profile.tags.map((tagName: string, i) => (
                    <Tag key={`tag-${i}`} tagName={tagName} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </article>
    </>
  );
};

export default ProfileDisplay;
