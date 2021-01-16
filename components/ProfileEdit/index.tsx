import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Select from "@/components/Select";
import Bio from "@/components/Bio";
import TagsDisplay from "@/components/TagsDisplay";
import DateInput from "@/components/DateInput";
import ImageUpload from "@/components/ImageUpload";
import type { ImagePreviewProps } from "@/components/ImageUpload";
import getPosition from "@/utils/getPosition";

type DataType = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

const ProfileEdit = () => {
  const { register, handleSubmit, errors } = useForm();
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
      const result = await axios.post(
        "http://localhost:3001/api/updateProfile",
        data
      );
      console.log("result", result);
    } catch (e) {
      console.error("post error", e);
    }
  };

  const checkKeyDown = (e: any) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const orientation = [...genders, { label: "Both", value: "both" }];
  return (
    <article className="w-full flex flex-col sm:flex-row justify-center bg-white sm:shadow-lg p-0 sm:px-6 sm:py-4 sm:border sm:rounded m-auto sm:mt-8 sm:mb-8">
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
        <TagsDisplay initialTags={["Hello", "World", "1337", "42"]} />
        <ImageUpload
          limit={5}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
        />
        <div className="pt-6">
          <input
            className="w-full bg-blue-500 hover:bg-gray-800 text-white p-2 rounded"
            type="submit"
            value="Complete Profile"
          />
        </div>
      </form>
    </article>
  );
};

export default ProfileEdit;
