import React from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useUpdateUserData } from "@/utils/requests/userRequests";
import { useUser } from "@/components/auth";
import { useForm } from "react-hook-form";

const SettingsAccount = () => {
  const updateUserMutation = useUpdateUserData();
  const [{ user }, { loading }] = useUser();
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    errors: passwordErrors,
    getValues: getPasswordValues,
  } = useForm();

  const onPasswordSubmit = (data: {
    password: string;
    retryPassword: string;
  }) => {
    updateUserMutation.mutate({
      data,
      authorization: user?.authorization || "",
    });
  };

  if (!user || loading) return <>Loading...</>;
  return (
    <section className="p-6  w-full flex flex-col space-y-10 ">
      <div>
        <h3 className="my-4 text-2xl font-semibold mt-0">
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
    </section>
  );
};

export default SettingsAccount;
