import React from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/Button";
import { useUpdateUserData } from "@/utils/requests/userRequests";
import { useUser } from "@/components/auth";
import { useForm } from "react-hook-form";
import LoadingRing from "@/components/ui/Icons/LoadingRing";

const SettingsAccount = () => {
  const updateUserMutation = useUpdateUserData();
  const [{ user }, { loading }] = useUser();
  const { register, handleSubmit, errors, getValues, setValue } = useForm();

  /* ------ set fetched user data in the editable fields ------ */
  React.useEffect(() => {
    if (user) {
      const { data } = user;
      setValue("email", data.email);
    }
  }, [user]);

  const onSubmit = (data: { password: string; retryPassword: string }) => {
    updateUserMutation.mutate({
      data,
      authorization: user?.authorization || "",
    });
  };

  if (!user || loading)
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingRing color="#33d398" />
      </div>
    );
  return (
    <section className="w-full flex flex-col">
      <div className="w-full border-b border-gray-300 py-4 px-6">
        <h4 className="text-lg font-semibold">
          Change your account informations
        </h4>
        <p className="text-sm text-gray-500">
          See and change your account informations.
        </p>
      </div>
      <div className="p-4 sm:p-6">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
            type="password"
            register={register({ required: true })}
            placeholder="Enter your password"
          />
          <Input
            name="retryPassword"
            label="Confirm Password"
            type="password"
            register={register({
              required: true,
              validate: (value) => value === getValues("password"),
            })}
            placeholder="Enter your password"
            error={
              errors.retryPassword?.type === "validate"
                ? "Password does not match"
                : errors.retryPassword?.type === "required"
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
