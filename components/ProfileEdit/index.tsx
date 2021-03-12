import React from "react";
import { useForm } from "react-hook-form";
import Select from "@/components/Select";
import Bio from "@/components/Bio";
import TagsDisplay from "@/components/TagsDisplay";
import DateInput from "@/components/DateInput";
import DeleteIcon from "@/components/ui/Icons/DeleteIcon";
// import ImageUpload from "@/components/ImageUpload";
// import type { ImagePreviewProps } from "@/components/ImageUpload";
// import getPosition from "@/utils/getPosition";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Image } from "@/components/auth/classes";
import { indexOf } from "@/utils/indexOf";
import { genders, orientation } from "@/components/data/constants.json";
import {
  useUpdateUserData,
  deleteUserImageRequest,
  getProfilePictureNameRequest,
} from "@/utils/requests/userRequests";
import { useUser } from "@/components/auth";
import { readImageAsBase64 } from "@/utils/readImageAsBase64";
import PlusIcon from "../ui/Icons/PlusIcon";

type DataType = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ProfileEdit = () => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const [tagsSet, setTagsSet] = React.useState<Set<string>>(
    new Set(["Hello", "World", "1337", "42"])
  );
  const [mainPicIndex, setMainPicIndex] = React.useState<number>(0);
  const updateUserMutation = useUpdateUserData();
  const [{ user }, { setUser, loading }] = useUser();
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    errors: passwordErrors,
    getValues: getPasswordValues,
  } = useForm();

  if (!user || loading) return <>Loading...</>;

  /* ------ set fetched user data in the editable fields ------ */
  React.useEffect(() => {
    const { data } = user;
    setValue("email", data.email);
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    setValue("userName", data.userName);
    setValue("bio", data.bio);
    setValue("gender", data.gender?.toLowerCase());
    setValue("orientation", data.orientation?.toLowerCase());
    setValue(
      "birthDate",
      data.birthDate instanceof Date && !isNaN(data.birthDate.getTime())
        ? data.birthDate.toISOString().split("T")[0]
        : data.birthDate
    );
    setTagsSet(new Set(data.tags));
    const index = indexOf<Image>(data.images, (img) => !!img.isProfilePicture);
    const indexOfMainImage = index >= 0 ? index : 0;
    setMainPicIndex(indexOfMainImage);
  }, [user]);

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

  const onPasswordSubmit = (data: {
    password: string;
    retryPassword: string;
  }) => {
    updateUserMutation.mutate({
      data,
      authorization: user?.authorization || "",
    });
  };

  const onSubmit = async (submitedData: DataType) => {
    const data = { ...submitedData, tags: [...tagsSet] };
    try {
      updateUserMutation.mutate({
        data: data,
        authorization: user?.authorization || "",
      });
      setUser(data);
    } catch (e) {
      console.error("onSubmit", e);
    }
  };

  const checkKeyDown = (e: any) => {
    if (e.code === "Enter") e.preventDefault();
  };
  return (
    <article
      style={{ height: "min-content" }}
      className="w-full flex justify-between flex-wrap bg-white sm:shadow-lg px-4 sm:px-6 pb-8 sm:pb-12 pt-8 sm:border sm:rounded m-auto sm:mt-8 sm:mb-8"
    >
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
      <section className="md:w-7/12 w-full flex flex-col space-y-10 ">
        <div>
          <h3 className="my-4 text-2xl font-semibold text-gray-700 mt-0">
            Change your password
          </h3>
          <form
            className="space-y-5"
            onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          >
            <Input
              name="password"
              label="Password"
              type="password"
              register={registerPassword({ required: true })}
              placeholder="Enter your password"
            />
            <Input
              name="retryPassword"
              label="Confirm Password"
              type="password"
              register={registerPassword({
                required: true,
                validate: (value) => value === getPasswordValues("password"),
              })}
              placeholder="Enter your password"
              error={
                passwordErrors.retryPassword?.type === "validate"
                  ? "Password does not match"
                  : passwordErrors.retryPassword?.type === "required"
                  ? "Required"
                  : undefined
              }
            />
            <div>
              <Button loading={updateUserMutation.isLoading}>
                Save Password
              </Button>
            </div>
          </form>
        </div>
        <div>
          <h3 className="my-4 text-2xl font-semibold text-gray-700 mt-0">
            Change your informations
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => checkKeyDown(e)}
            className="flex flex-col space-y-5"
          >
            <Input
              name="email"
              type="email"
              label="Email"
              register={register}
              placeholder="example@email.com"
            />
            <Input
              name="userName"
              label="User name"
              register={register}
              placeholder="Enter your username"
            />
            <div className="flex flex-wrap space-y-5 sm:space-y-0">
              <Input
                name="firstName"
                label="First name"
                register={register}
                placeholder="Enter your firstname"
                className="w-full sm:w-1/2 sm:pr-2"
              />
              <Input
                name="lastName"
                label="Last name"
                register={register}
                placeholder="Enter your lastname"
                className="w-full sm:w-1/2 sm:pr-2"
              />
            </div>
            <Select
              initialValue={genders[0].value}
              name="gender"
              register={register}
              placeholder="Select your gender"
              label="Gender"
              options={genders}
            />
            <Select
              initialValue={orientation[0].value}
              name="orientation"
              register={register}
              placeholder="Select your orientation"
              label="Orientation"
              options={orientation}
            />
            <DateInput
              label="Your Birthday"
              name="birthDate"
              register={register}
            />
            <Bio
              initialLength={user?.data.bio.length}
              register={register({ maxLength: 200 })}
              maxLength={200}
              label="About you"
              placeholder="..."
            />
            <div>
              <label
                htmlFor="tags"
                className="block text-gray-700 font-semibold"
              >
                Interest
              </label>
              <TagsDisplay tagsSet={tagsSet} setTagsSet={setTagsSet} />
            </div>

            <div>
              <Button loading={updateUserMutation.isLoading}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </section>
    </article>
  );
};

export default ProfileEdit;
