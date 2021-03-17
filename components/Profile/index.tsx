import React from "react";
import Tag from "@/components/Tag";
import AvatarIcon from "@/components/ui/Icons/AvatarIcon";
import DropDownIcon from "@/components/ui/Icons/DropDownIcon";
import PositionIcon from "@/components/ui/Icons/PositionIcon";
import { indexOf } from "@/utils/indexOf";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import Modal from "@/components/ui/Modal";
import { useOtherUserInfosRequest } from "@/utils/requests/userRequests";
import { useUser } from "@/components/auth";
import formatRelative from "date-fns/formatRelative";
import { useRouter } from "next/router";
import { Image } from "@/components/auth/classes";

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
  Image;
  const [mainPicIndex, setMainPicIndex] = React.useState<number>(
    Math.max(
      0,
      profile
        ? indexOf<Image>(profile.images as Image[], (img) =>
            Boolean(img.isProfilePicture)
          )
        : 0
    )
  );

  const blockUser = () => {};
  const reportUser = () => {};
  if (isLoading) return <>loading...</>;
  if (!profile || error) return <>error</>;
  return (
    <>
      <article
        style={{ height: "min-content" }}
        className="max-w-4xl bg-white sm:shadow-lg p-0 sm:px-6 sm:py-4 sm:border sm:rounded m-auto sm:mt-8 sm:mb-8"
      >
        <section className="flex justify-around flex-wrap relative mb-4">
          {/* ------ main picture ------ */}
          <div
            className="sm:max-w-sm sm:w-80 w-full"
            style={{ height: "30rem" }}
          >
            <picture>
              <source
                media="(min-width:650px)"
                srcSet={profile.images[mainPicIndex].src}
              />
              <img
                src={profile.images[mainPicIndex].src}
                alt="profile picture"
                className="h-full w-full object-cover sm:rounded-2xl "
              />
            </picture>
          </div>
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
                <div className=" w-64 bg-white rounded-xl text-center divide-y divide-gray-400 shadow-lg border border-gray-400">
                  <div className="block w-full rounded-t py-2.5 px-4">
                    {profile.userName} did something bad ?
                  </div>
                  <Modal
                    onAccept={reportUser}
                    title="Report"
                    buttonText="Report"
                    acceptText="Report"
                    denyText="Cancel"
                    variant="secondary"
                    classNameButton="block w-full text-gray-400 py-2.5 uppercase hover:bg-gray-50"
                    description={`are you sure you want to report ${profile.userName} ?`}
                  />
                  <Modal
                    onAccept={blockUser}
                    title="Block"
                    buttonText="Block"
                    acceptText="Block"
                    denyText="Cancel"
                    variant="secondary"
                    classNameButton="block w-full text-gray-400 py-2.5 uppercase rounded-xl hover:bg-gray-50"
                    description={`you and ${profile.userName} wont be able to see each other profile, are you sure ?`}
                  />
                </div>
              </Transition>
            </div>
          )}
          {/* ------ other images container ------ */}
          <div className="flex-none sm:w-24 flex justify-evenly sm:block sm:py-0 py-2">
            {profile.images.map((img, index) => (
              <li
                key={index}
                className="block p-0.5 w-16 sm:w-20 h-24 ml-auto mr-0"
                onClick={() => setMainPicIndex(index)}
              >
                <article
                  tabIndex={0}
                  className="w-full h-full rounded outline-none"
                >
                  <img
                    alt="upload preview"
                    src={img.src}
                    className={`${
                      index === mainPicIndex ? "ring ring-green-400" : ""
                    } w-full h-full object-cover rounded`}
                    style={
                      index === mainPicIndex
                        ? {}
                        : { filter: "brightness(60%)" }
                    }
                  />
                </article>
              </li>
            ))}
          </div>
        </section>

        <section className="flex-grow">
          {/* ------ profile information ------ */}
          <div className="px-2 py-2 w-full divide-y sm:divide-y-0 divide-gray-200 divide-solide">
            <div className="text-center mb-4 sm:mb-6 px-2 sm:px-0">
              <div className="flex justify-between items-center">
                <h4 className="text-gray-600 text-base ">
                  <span className="text-xl font-bold">{profile.userName}</span>{" "}
                  {profile.age}
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
              <div className="text-center mb-4 sm:mx-4">
                <h4 className="text-gray-600 text-base font-medium my-2">
                  About:
                </h4>
                <p className="text-gray-500 text-sm max-w-md">{profile.bio}</p>
              </div>
            )}
            {profile.tags.length > 0 && (
              <div className="text-center  sm:mx-4">
                <h4 className="text-gray-600 text-base font-medium my-2">
                  Interests:
                </h4>
                <div className="mt-1">
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
