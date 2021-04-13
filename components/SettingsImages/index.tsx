import React from "react";
import { useUser } from "../auth";
import PlusIcon from "../ui/Icons/PlusIcon";
import DeleteIcon from "@/components/ui/Icons/DeleteIcon";
import { indexOf } from "@/utils/indexOf";
import { Image } from "@/components/auth/classes";
import { readImageAsBase64 } from "@/utils/readImageAsBase64";
import {
  useUpdateUserData,
  deleteUserImageRequest,
  getProfilePictureNameRequest,
} from "@/utils/requests/userRequests";

const ImageSettings = () => {
  const [{ user }, { setUser, loading }] = useUser();
  const [mainPicIndex, setMainPicIndex] = React.useState<number>(0);
  const updateUserMutation = useUpdateUserData();

  /* ------ set fetched user data in the editable fields ------ */
  React.useEffect(() => {
    if (user) {
      const { data } = user;
      const index = indexOf<Image>(
        data.images,
        (img) => !!img.isProfilePicture
      );
      const indexOfMainImage = index >= 0 ? index : 0;
      setMainPicIndex(indexOfMainImage);
    }
  }, [user]);

  if (!user || loading) return <>Loading...</>;

  const handleImageDelete = async (indexToDelete: number) => {
    const {
      authorization,
      data: { images },
    } = user;
    const imageNameToDelete = images[indexToDelete].imageName;
    try {
      const result = await deleteUserImageRequest({
        imageNameToDelete,
        authorization,
      });
      if (result.status !== 200) throw new Error("could not delete image");
      // if deleted image is main profile pic
      if (images[indexToDelete].isProfilePicture) {
        const result = await getProfilePictureNameRequest({
          authorization,
        });
        if (result.status !== 200)
          throw new Error("could not get profile image name");
        console.log("getProfilePictureNameRequest", result.data);
        // result.data.
        // images[0].isProfilePicture = 1;
      } else {
        console.log("is not main profile pic");
      }
      // delete image from local user state
      images.splice(indexToDelete, 1);
      setUser({ images: [...images] });
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageUpload = async (file?: File) => {
    if (!file || !user) return;

    try {
      const result = await updateUserMutation.mutateAsync({
        data: { images: [file] },
        authorization: user.authorization || "",
      });
      if (typeof result.data.newImages[0] !== "string")
        throw Error("could not get uploaded image name's name");
      if (result.status === 200) {
        const { base64Data } = await readImageAsBase64(file);
        setUser({
          images: [
            ...user.data.images,
            new Image({
              imageName: result.data.newImages[0],
              isProfilePicture: user.data.images.length ? 0 : 1,
              imageBase64: base64Data,
            }),
          ],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleProfileImageChange = async (index: number) => {
    if (user.data.images[index].isProfilePicture) return;
    try {
      const data = { profilPicture: user.data.images[index].imageName };
      const result = await updateUserMutation.mutateAsync({
        data,
        authorization: user?.authorization || "",
      });
      if (result.status === 200) {
        setMainPicIndex(index);
        user.data.images[mainPicIndex].isProfilePicture = 0;
        user.data.images[index].isProfilePicture = 1;
        setUser({ images: user.data.images });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* ------ profile images section ------ */}
      <section className="md:w-5/12 w-full mb-10">
        <section className="flex md:justify-start justify-center">
          {/* ------ main picture ------ */}
          {
            <div className="w-80" style={{ height: "30rem" }}>
              <picture>
                <source
                  media="(min-width:650px)"
                  srcSet={user.data.images[mainPicIndex]?.src}
                />
                <img
                  src={user.data.images[mainPicIndex]?.src}
                  alt="profile picture"
                  className="h-full w-full object-cover rounded-2xl sm:rounded-none"
                />
              </picture>
            </div>
          }
          {/* ------ other images container ------ */}
          <div className="w-24 block sm:py-0">
            {user.data.images.map((img, index) => (
              <li
                key={index}
                className="block pr-0 p-0.5 w-20 h-24 mx-auto cursor-pointer"
                onClick={() => handleProfileImageChange(index)}
              >
                <article
                  tabIndex={0}
                  className="w-full h-full rounded outline-none relative"
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
                  <button
                    className="absolute -right-2 -bottom-1 rounded-xl z-10 opacity-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageDelete(index);
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </article>
              </li>
            ))}
            {/* ------ add new image ------ */}
            {user.data.images.length < 5 && (
              <li className="block pr-0 p-0.5 w-20 h-24 mx-auto relative">
                <article
                  tabIndex={0}
                  className="w-full h-full rounded border-gray-200 border-4"
                >
                  <label htmlFor="imageInput">
                    <input
                      id="imageInput"
                      className="opacity-0 w-full h-full"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files?.[0])}
                    />
                    <PlusIcon
                      color="#e6e7eb"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </label>
                </article>
              </li>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default ImageSettings;
