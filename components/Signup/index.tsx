import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Input from "@/components/Input";

const Signup = (): JSX.Element => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    console.log(data);
    try {
      const result = await axios.post("http://localhost:3001/api/signup", data);
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="bg-white sm:border rounded max sm:shadow-md px-6 py-10 sm:p-10 max-w-xl m-auto sm:mt-8 mb-8">
      <h3 className="my-4 text-2xl font-semibold text-gray-700 mt-0">
        Create an Account
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
        <Input
          name="email"
          type="email"
          label="Email"
          register={register}
          placeholder="example@email.com"
        />
        <Input
          name="password"
          label="Password"
          register={register}
          placeholder="Enter your password"
        />
        <input
          className="bg-blue-500 hover:bg-gray-800 text-white p-2 rounded"
          type="submit"
          value="Signup"
        />
      </form>
    </div>
  );
};

export default Signup;
