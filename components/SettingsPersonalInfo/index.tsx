import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import DateInput from "@/components/DateInput";
import TagsDisplay from "@/components/TagsDisplay";
import Bio from "@/components/Bio";
import { useUser } from "@/components/auth";
import { useForm } from "react-hook-form";
import { useUpdateUserData } from "@/utils/requests/userRequests";
import { genders, orientation } from "@/components/data/constants.json";

type DataType = {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

const SettingsPersonalInfo = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [{ user }, { setUser, loading }] = useUser();
  const [tagsSet, setTagsSet] = React.useState<Set<string>>(
    new Set(["Hello", "World", "1337", "42"])
  );
  const updateUserMutation = useUpdateUserData();

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
  }, [user]);

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

  const checkKeyDown = (e: any) => e.code === "Enter" && e.preventDefault();

  return (
    <section className="md:w-7/12 w-full flex flex-col space-y-10 ">
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
            <label htmlFor="tags" className="block text-gray-700 font-semibold">
              Interest
            </label>
            <TagsDisplay tagsSet={tagsSet} setTagsSet={setTagsSet} />
          </div>

          <div>
            <Button loading={updateUserMutation.isLoading}>Save Changes</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SettingsPersonalInfo;
