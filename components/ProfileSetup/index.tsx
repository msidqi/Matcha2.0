import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";
import Select from "@/components/ui/Select";
import Bio from "@/components/Bio";
import TagsDisplay from "@/components/TagsDisplay";
import ImageUpload from "@/components/ImageUpload";
import DateInput from "@/components/ui/DateInput";
import getPosition from "@/utils/getPosition";
import { genders, orientation } from "@/components/data/constants.json";
import { ImagePreviewProps } from "@/interfaces";
import { useUser } from "../auth";
import { useRouter } from "next/router";
import { getUserInfoRequest } from "@/utils/requests/userRequests";

type DataType = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ProfileSetup = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [{ user }, { setUser }] = useUser();
  const [tagsSet, setTagsSet] = React.useState<Set<string>>(
    new Set(["Hello", "World", "1337", "42"])
  );
  const [imagePreviews, setImagePreviews] = React.useState<ImagePreviewProps[]>(
    []
  );

  const onSubmit = async (data: DataType) => {
    try {
      const formdata = new FormData();
      for (const key in data) {
        formdata.append(key, (data as any)[key]);
      }
      const pos = (await getPosition()).coords;
      formdata.append("position", pos.longitude.toString());
      formdata.append("position", pos.latitude.toString());
      imagePreviews.forEach((elem) => formdata.append("images", elem.file));
      tagsSet.forEach((tag) => formdata.append("tags", tag));
      const result = await axios.post("/api/updateProfile", formdata, {
        headers: { Authorization: user?.authorization },
      });
      if (result.status == 200) {
        /* -------- get user data ------- */
        // const [userInfoRequest] = getUserInfoRequest({
        //   authorization: user.authorization,
        // });
        // const result = await userInfoRequest;
        // if (result.status === 200) {
        //   /* -------- update global user state ------- */
        //   setUser(result.data);
        //   router.push("/dashboard");
        // }
      }
    } catch (e) {
      console.error("post error", e);
    }
  };

  const checkKeyDown = (e: any) => {
    // console.log('checkKeyDown', e.code)
    if (e.code === "Enter") e.preventDefault();
  };

  return (
    <div className="bg-white sm:border rounded  max shadow-lg p-4 sm:p-10 max-w-3xl m-auto sm:mt-8 mb-8  w-full">
      <h3 className="my-4 text-2xl font-semibold text-gray-700 mt-0">
        Complete your profile
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => checkKeyDown(e)}
        className="flex flex-col space-y-5"
      >
        <Select
          name="gender"
          register={register}
          placeholder="Select your gender"
          label="Gender"
          options={genders}
        />
        <Select
          name="orientation"
          register={register}
          placeholder="Select your orientation"
          label="Sexual Preference"
          options={orientation}
        />
        <DateInput label="Your Birthday" name="birthDate" register={register} />
        <Bio
          register={register({ maxLength: 200 })}
          maxLength={200}
          label="About you"
          placeholder="..."
        />
        <label htmlFor="tags" className="block text-gray-700 font-semibold">
          Interest
        </label>
        <TagsDisplay tagsSet={tagsSet} setTagsSet={setTagsSet} />
        <ImageUpload
          limit={5}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
        />
        <div className="pt-6">
          <input
            className="w-full bg-green-500 hover:bg-green-400 text-white p-2 rounded"
            type="submit"
            value="Complete Profile"
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileSetup;
