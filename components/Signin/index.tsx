import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import { useUser } from "@/components/auth";
import guestRoute from "@/components/GuestRoute";
import Link from "next/link";

const Signin = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [, { login }] = useUser();

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
    <div className="bg-white sm:border sm:rounded  max sm:shadow-md px-6 py-10 sm:p-10 max-w-xl m-auto w-full h-full sm:h-auto">
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
        <div className="text-right text-sm sm:text-base">
          <Link href="/forgot-password">
            <a className="text-gray-400 underline bold">
              Forgot your password ?
            </a>
          </Link>
        </div>
        <input
          className="bg-green-500 hover:bg-green-400 text-white p-2 rounded"
          type="submit"
          value="Signin"
        />
      </form>
      <div className="text-center mt-4 text-sm sm:text-base">
        <span className="text-gray-400">
          Not a member yet ?{" "}
          <Link href="/signup">
            <a className="underline bold">Create your account here</a>
          </Link>
          .
        </span>
      </div>
    </div>
  );
};

export default guestRoute(Signin);
