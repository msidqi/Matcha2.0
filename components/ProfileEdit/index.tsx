import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Select from "@/components/Select";
import Bio from "@/components/Bio";
import TagsDisplay from "@/components/TagsDisplay";
import DateInput from "@/components/DateInput";
// import ImageUpload from "@/components/ImageUpload";
// import type { ImagePreviewProps } from "@/components/ImageUpload";
import getPosition from "@/utils/getPosition";
import Input from "../Input";
import { profile } from "@/pages/profile";
import { ImageType } from "../Profile";
import { indexOf } from "@/utils/indexOf";
import { genders, orientation } from "@/components/data/constants.json";

type DataType = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ProfileEdit = () => {
  const { tags, gender, bio, orientation: userOrientation } = profile;

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { birthdate: "2021-01-13", ...profile },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    errors: passwordErrors,
    getValues: getPasswordValues,
  } = useForm();

  // const [imagePreviews, setImagePreviews] = React.useState<ImagePreviewProps[]>(
  //   []
  // );

  const onPasswordSubmit = (data: {
    password: string;
    confirmPassword: string;
  }) => {
    // make password put request
    console.log(data);
  };

  const onSubmit = async (data: DataType) => {
    // console.log({ ...data, images: imagePreviews });
    try {
      const formdata = new FormData();
      for (const key in data) {
        formdata.append(key, (data as any)[key]);
      }
      console.log("data", data);
      console.log("formdata", formdata);
      const result = await axios.post(
        "http://localhost:3001/api/updateProfile",
        data
      );
      console.log("result", result);
    } catch (e) {
      console.error("post error", e);
    }
  };
  console.log("submit errors", errors);

  const checkKeyDown = (e: any) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const images: ImageType[] = [
    { src: "/profile.jpg", isProfilePicture: false },
    { src: "/profile_jap.jpg", isProfilePicture: true },
    { src: "/profile_liz.jpg", isProfilePicture: false },
    { src: "/profile_saf.jpg", isProfilePicture: false },
    { src: "/profile_eva.jpg", isProfilePicture: false },
  ];
  const [mainPicIndex, setMainPicIndex] = React.useState<number>(
    indexOf<ImageType>(images, (img) => img.isProfilePicture) ?? 0
  );
  return (
    <article className="w-full flex justify-between flex-wrap bg-white sm:shadow-lg px-6 pb-8 sm:py-8 sm:border sm:rounded m-auto sm:mt-8 sm:mb-8">
      <section className="md:w-5/12 w-full mb-10">
        <section className="flex justify-center">
          {/* ------ main picture ------ */}
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
          {/* ------ other images container ------ */}
          <div className="w-24 block sm:py-0">
            {images.map((img, index) => (
              <li
                key={index}
                className="block p-0.5 w-20 h-24 mx-auto"
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

        {/* <ImageUpload
          limit={5}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
        /> */}
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
              register={registerPassword({ required: true })}
              placeholder="Enter your password"
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              register={registerPassword({
                required: true,
                validate: (value) => value === getPasswordValues("password"),
              })}
              placeholder="Enter your password"
              error={
                passwordErrors.confirmPassword?.type === "validate"
                  ? "Password does not match"
                  : passwordErrors.confirmPassword?.type === "required"
                  ? "Required"
                  : undefined
              }
            />
            <div>
              <button className="w-full bg-blue-500 hover:bg-gray-800 text-white p-2 rounded">
                Change Password
              </button>
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
              initialValue={gender}
              name="gender"
              register={register}
              placeholder="Select your gender"
              label="Gender"
              options={genders}
            />
            <Select
              initialValue={userOrientation}
              name="orientation"
              register={register}
              placeholder="Select your orientation"
              label="Sexual Preference"
              options={orientation}
            />
            <DateInput
              label="Your Birthday"
              name="birthdate"
              register={register}
            />
            <Bio
              initialLength={bio.length}
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
              <TagsDisplay initialTags={tags} />
            </div>

            <div>
              <button className="w-full bg-blue-500 hover:bg-gray-800 text-white p-2 rounded">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </article>
  );
};

export default ProfileEdit;
