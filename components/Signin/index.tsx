import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Input from "@/components/Input";
// import Loading from "@/components/Loading";
import { useUser } from "../auth";

const Signin = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [, { login, loading }] = useUser();
  // console.log("login loading", loading);
  const onSubmit = async (
    data: { userName: string; password: string },
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    try {
      await login(data);
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="bg-white sm:border rounded  max sm:shadow-md px-6 py-10 sm:p-10 max-w-xl m-auto sm:mt-8 mb-8">
      <h3 className="my-4 text-2xl font-semibold text-gray-700 mt-0">
        Sign in
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <Input
          name="userName"
          label="User name"
          register={register}
          placeholder="Enter your username"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          register={register}
          placeholder="Enter your password"
        />
        <input
          className="bg-green-500 hover:bg-green-400 text-white p-2 rounded"
          type="submit"
          value="Signin"
        />
      </form>
    </div>
  );
};

export default Signin;
