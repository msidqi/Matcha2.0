import React from "react";
import { ProfileType } from "@/interfaces";
import Tag from "../Tag";
import AvatarIcon from "../ui/Icons/AvatarIcon";
import PositionIcon from "../ui/Icons/PositionIcon";
import { getSexePreference } from "@/utils/getSexePreference";

interface ProfileProps {
  profile: ProfileType;
}

type ImageType = { src: string; isProfilePicture: boolean };

const ProfileDisplay = ({ profile }: ProfileProps) => {
  const { name, tags, distance, gender, bio, orientation, age } = profile;
  const images: ImageType[] = [
    { src: "/profile.jpg", isProfilePicture: true },
    { src: "/profile_jap.jpg", isProfilePicture: false },
    { src: "/profile_liz.jpg", isProfilePicture: false },
    { src: "/profile_saf.jpg", isProfilePicture: false },
    { src: "/profile_eva.jpg", isProfilePicture: false },
  ];
  const [mainPic, setMainPic] = React.useState<ImageType>(
    images.find((img) => img.isProfilePicture) || images[0]
  );
  return (
    <>
      <article className="w-full flex flex-col sm:flex-row justify-center min-h-screen pt-10 pb-5 bg-white shadow-lg p-4 sm:p-10 sm:border rounded m-auto sm:mt-8 mb-8">
        <section className="min-w-1/4">
          {/* ------ main picture ------ */}
          <div
            className="sm:max-w-sm sm:w-80 w-full"
            style={{ height: "30rem" }}
          >
            <picture>
              <source media="(min-width:650px)" srcSet={mainPic.src} />
              <img
                src={mainPic.src}
                alt="profile picture"
                className="h-full w-full object-cover sm:rounded-2xl"
              />
            </picture>
          </div>
        </section>
        <section className="sm:flex">
          {/* ------ other images container ------ */}
          <div className=" sm:w-20 flex justify-evenly sm:block">
            {images.map((img, index) => (
              <li
                key={index}
                className="block p-1 w-16 sm:w-20 h-24"
                onClick={() => setMainPic(img)}
              >
                <article
                  tabIndex={0}
                  className={`${
                    img === mainPic ? "shadow-lg" : ""
                  } w-full h-full rounded focus:outline-none focus:shadow-outline`}
                >
                  <img
                    alt="upload preview"
                    src={img.src}
                    className="w-full h-full sticky object-cover rounded"
                  />
                </article>
              </li>
            ))}
          </div>
          {/* ------ profile information ------ */}
          <div className="">
            <div className="px-2 py-2 w-full">
              <div>
                <h4 className="text-gray-600 text-base">
                  <span className="3">{name}</span> {age}
                </h4>
                <div className="absolute right-2 top-2">
                  <PositionIcon
                    width="18"
                    height="18"
                    className="inline-block mr-1"
                  />
                  <p className="text-sm inline-block text-gray-500">{`${distance} km`}</p>
                </div>
                <div>
                  <AvatarIcon className="inline-block mr-1" />{" "}
                  <p className="text-sm inline-block text-gray-400">
                    {gender}, {getSexePreference(gender, orientation)}
                  </p>
                </div>
              </div>

              <h4 className="text-gray-600 text-base font-medium mt-2">
                About:
              </h4>
              <p className="text-gray-500 text-sm">{bio}</p>
              <h4 className="text-gray-600 text-base font-medium mt-2">
                Interests:
              </h4>
              <div className="mt-1">
                {tags.map((name: string, i) => (
                  <Tag key={`tag-${i}`} tagName={name} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default ProfileDisplay;
