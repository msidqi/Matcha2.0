import React from "react";
import { ProfileType } from "@/interfaces";
import Tag from "@/components/Tag";
import AvatarIcon from "@/components/ui/Icons/AvatarIcon";
import DropDownIcon from "@/components/ui/Icons/DropDownIcon";
import PositionIcon from "@/components/ui/Icons/PositionIcon";
import { getSexePreference } from "@/utils/getSexePreference";
import { indexOf } from "@/utils/indexOf";
import Link from "next/link";
// import Modal from "../Modal";

interface ProfileProps {
  profile: ProfileType;
}

export type ImageType = { src: string; isProfilePicture: boolean };

const ProfileDisplay = ({ profile }: ProfileProps) => {
  const { userName, tags, distance, gender, bio, orientation, age } = profile;
  const images: ImageType[] = [
    { src: "/profile.jpg", isProfilePicture: false },
    { src: "/profile_jap.jpg", isProfilePicture: true },
    { src: "/profile_liz.jpg", isProfilePicture: false },
    { src: "/profile_saf.jpg", isProfilePicture: false },
    { src: "/profile_eva.jpg", isProfilePicture: false },
  ];
  const isConnected = true;
  const lastConnected = "2h ago";
  const [mainPicIndex, setMainPicIndex] = React.useState<number>(
    indexOf<ImageType>(images, (img) => img.isProfilePicture) ?? 0
  );
  return (
    <>
      <article className="w-full flex flex-col sm:flex-row justify-center bg-white sm:shadow-lg p-0 sm:px-6 sm:py-4 sm:border sm:rounded m-auto sm:mt-8 sm:mb-8">
        <section className="min-w-1/4 relative">
          {/* ------ main picture ------ */}
          <div
            className="sm:max-w-sm sm:w-80 w-full"
            style={{ height: "30rem" }}
          >
            <picture>
              <source
                media="(min-width:650px)"
                srcSet={images[mainPicIndex].src}
              />
              <img
                src={images[mainPicIndex].src}
                alt="profile picture"
                className="h-full w-full object-cover "
              />
            </picture>
          </div>
          <div className="absolute top-4 left-2 cursor-pointer">
            <DropDownIcon className="shadow rounded-xl" />
          </div>
        </section>
        <section className="sm:flex">
          {/* ------ other images container ------ */}
          <div className="sm:w-24 flex justify-evenly sm:block sm:py-0 py-2">
            {images.map((img, index) => (
              <li
                key={index}
                className="block p-0.5 w-16 sm:w-20 h-24 mx-auto "
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
          {/* ------ profile information ------ */}
          <div className="">
            <div className="px-2 py-2 w-full sm:border-b sm:border-gray-200 divide-y sm:divide-y-0 divide-gray-200 divide-solide">
              <div className="mb-4 sm:mb-6">
                <div className="flex justify-between items-center">
                  <h4 className="text-gray-600 text-base ">
                    <span className="text-xl font-bold">{name}</span> {age}
                  </h4>
                  <Link href="/messages">
                    <a className="bg-green-400 uppercase font-bold hover:shadow-md text-white rounded text-xs px-4 py-2 outline-none focus:outline-none sm:mr-2">
                      Message
                    </a>
                  </Link>
                </div>
                <div className="flex justify-start items-center">
                  <div
                    className={`rounded-full mr-1 ${
                      isConnected
                        ? "bg-green-400 w-2.5 h-2.5"
                        : "border-gray-200 border w-2.5 h-2.5"
                    }`}
                  />
                  <p className="text-gray-500 text-xs">
                    {isConnected ? "connected" : lastConnected}
                  </p>
                </div>
                <div className="">
                  <AvatarIcon className="inline-block" />{" "}
                  <p className="text-sm inline-block text-gray-400">
                    {gender}, {getSexePreference(gender, orientation)}
                  </p>
                </div>
                <div className="">
                  <PositionIcon
                    width="12"
                    height="12"
                    className="inline-block mr-1"
                  />
                  <p className="text-sm inline-block text-gray-400">{`${distance} km`}</p>
                </div>
              </div>
              <div className="mb-4 sm:mx-4">
                <h4 className="text-gray-600 text-base font-medium my-2">
                  About:
                </h4>
                <p className="text-gray-500 text-sm">{bio}</p>
              </div>
              <div className="sm:mx-4">
                <h4 className="text-gray-600 text-base font-medium my-2">
                  Interests:
                </h4>
                <div className="mt-1">
                  {tags.map((tagName: string, i) => (
                    <Tag key={`tag-${i}`} tagName={tagName} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default ProfileDisplay;
