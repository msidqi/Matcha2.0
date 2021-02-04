import React from "react";
import { useForm } from "react-hook-form";
import Select from "@/components/Select";
import Bio from "@/components/Bio";
import TagsDisplay from "@/components/TagsDisplay";
import DateInput from "@/components/DateInput";
// import ImageUpload from "@/components/ImageUpload";
// import type { ImagePreviewProps } from "@/components/ImageUpload";
// import getPosition from "@/utils/getPosition";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Image } from "@/components/auth/classes";
import { indexOf } from "@/utils/indexOf";
import { genders, orientation } from "@/components/data/constants.json";
import { useUpdateUserData } from "@/utils/requests/userRequests";
import { useUser } from "@/components/auth";

type DataType = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ProfileEdit = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [tagsSet, setTagsSet] = React.useState<Set<string>>(
    new Set(["Hello", "World", "1337", "42"])
  );
  const [images, setImages] = React.useState<Image[]>([
    // { imageName: "1", src: "/profile.jpg", isProfilePicture: 0 },
    // { imageName: "2", src: "/profile_jap.jpg", isProfilePicture: 1 },
    // { imageName: "3", src: "/profile_liz.jpg", isProfilePicture: 0 },
    // { imageName: "4", src: "/profile_saf.jpg", isProfilePicture: 0 },
    // { imageName: "5", src: "/profile_eva.jpg", isProfilePicture: 0 },
  ]);
  const defaultMainIndex = indexOf<Image>(
    images,
    (img) => !!img.isProfilePicture
  );
  const [mainPicIndex, setMainPicIndex] = React.useState<number>(
    defaultMainIndex >= 0 ? defaultMainIndex : 0
  );
  const updateUserMutation = useUpdateUserData();
  const [{ user }, { setUser }] = useUser();
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    errors: passwordErrors,
    getValues: getPasswordValues,
  } = useForm();

  // const [imagePreviews, setImagePreviews] = React.useState<ImagePreviewProps[]>(
  //   []
  // );

  /* ------ set fetched user data in the editable fields ------ */
  React.useEffect(() => {
    setValue("email", user?.data.email);
    setValue("firstName", user?.data.firstName);
    setValue("lastName", user?.data.lastName);
    setValue("userName", user?.data.userName);
    setValue("bio", user?.data.bio);
    setValue("gender", user?.data.gender?.toLowerCase());
    setValue("orientation", user?.data.orientation?.toLowerCase());
    setValue(
      "birthDate",
      user?.data.birthDate instanceof Date
        ? user?.data.birthDate.toISOString().split("T")[0]
        : user?.data.birthDate
    );
    setTagsSet(new Set(user?.data.tags));
    if (user?.data.images) {
      const index = indexOf<Image>(
        user?.data.images,
        (img) => !!img.isProfilePicture
      );
      const indexOfMainImage = index >= 0 ? index : 0;
      setMainPicIndex(indexOfMainImage);
      setImages((prev) => user?.data.images ?? prev);
    }
  }, [user]);

  const handleProfileImageChange = (index: number) => {
    try {
      const data = { profilPicture: images[index].imageName };
      updateUserMutation.mutate({
        data,
        authorization: user?.authorization || "",
      });
      setMainPicIndex(index);
      images[mainPicIndex].isProfilePicture = 0;
      images[index].isProfilePicture = 1;
      setUser({ images });
    } catch (e) {
      console.error(e);
    }
  };

  const onPasswordSubmit = (data: {
    password: string;
    retryPassword: string;
  }) => {
    // make password put request
    // console.log(data);
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
      // console.log("data", data);
    } catch (e) {
      console.error("post error", e);
    }
  };
  // console.log("submit errors", errors);
  // console.log("user", user);

  const checkKeyDown = (e: any) => {
    if (e.code === "Enter") e.preventDefault();
  };
  console.log("mainPicIndex", mainPicIndex, images);
  return (
    <article className="w-full flex justify-between flex-wrap bg-white sm:shadow-lg px-4 sm:px-6 pb-8 sm:py-8 sm:border sm:rounded m-auto sm:mt-8 sm:mb-8">
      {/* ------ profile images section ------ */}
      <section className="md:w-5/12 w-full mb-10">
        <section className="flex justify-center">
          {/* ------ main picture ------ */}
          {images[mainPicIndex] && (
            <div className="w-80" style={{ height: "30rem" }}>
              <picture>
                <source
                  media="(min-width:650px)"
                  srcSet={images[mainPicIndex].src}
                />
                <img
                  src={images[mainPicIndex].src}
                  alt="profile picture"
                  className="h-full w-full object-cover rounded-2xl"
                />
              </picture>
            </div>
          )}
          {/* ------ other images container ------ */}
          <div className="w-24 block sm:py-0">
            {images.map((img, index) => (
              <li
                key={index}
                className="block pr-0 p-0.5 w-20 h-24 mx-auto"
                onClick={() => handleProfileImageChange(index)}
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

        {/* <ImageUpload
          limit={5}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
        /> */}
        {/* <Button onClick={handleImagesSubmit}>Save Images</Button> */}
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
