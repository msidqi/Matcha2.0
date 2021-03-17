import React from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import guestRoute from "@/components/GuestRoute";

const PasswordReset = (): JSX.Element => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (
    data: { userName: string; password: string },
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    try {
      // await resetPasswordRequest()
      // show Message
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="bg-white sm:border rounded  max sm:shadow-md px-6 py-10 sm:p-10 max-w-xl m-auto w-full h-full sm:h-auto">
      <h3 className="my-4 text-2xl font-semibold text-gray-700 mt-0">
        Forgot your password ?
      </h3>
      <p className="my-2 text-sm font-normal text-gray-400">
        Enter the email linked to your profile and we will send you an email to
        reset your password.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <Input
          name="email"
          type="email"
          label="Email"
          register={register}
          placeholder="example@email.com"
        />
        <input
          className="bg-green-500 hover:bg-green-400 text-white p-2 rounded"
          type="submit"
          value="Reset My Password"
        />
      </form>
    </div>
  );
};

export default guestRoute(PasswordReset);
