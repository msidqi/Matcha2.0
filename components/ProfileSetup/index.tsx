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

type DataType = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ProfileSetup = (): JSX.Element => {
  const { register, handleSubmit, errors } = useForm();
  const [tagsSet, setTagsSet] = React.useState<Set<string>>(
    new Set(["Hello", "World", "1337", "42"])
  );
  const [imagePreviews, setImagePreviews] = React.useState<ImagePreviewProps[]>(
    []
  );

  const onSubmit = async (data: DataType) => {
    console.log("submit errors", errors);
    console.log({ ...data, images: imagePreviews });
    try {
      const formdata = new FormData();
      for (const key in data) {
        formdata.append(key, (data as any)[key]);
      }
      const pos = (await getPosition()).coords;
      formdata.append("position", pos.longitude.toString());
      formdata.append("position", pos.latitude.toString());
      console.log("formdata", formdata);
      const result = await axios.post("/api/updateProfile", data);
      console.log("result", result);
    } catch (e) {
      console.error("post error", e);
    }
  };

  const checkKeyDown = (e: any) => {
    // console.log('checkKeyDown', e.code)
    if (e.code === "Enter") e.preventDefault();
  };

  /*const mySubmitHandler = (e) => {
    console.log("checkKeyDown", e.code);
    e.preventDefault();
    handleSubmit(onSubmit)();
  };*/

  console.log("errors", errors);
  return (
    <div className="bg-white sm:border rounded  max shadow-lg p-4 sm:p-10 max-w-3xl m-auto sm:mt-8 mb-8">
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
        <DateInput label="Your Birthday" name="birthdate" register={register} />
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
