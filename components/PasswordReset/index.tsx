import React from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import guestRoute from "@/components/GuestRoute";
import { useResetPassword } from "@/utils/requests/userRequests";
import Modal from "../ui/Modal";
import { useRouter } from "next/router";

const ForgotPassword = (): JSX.Element => {
  const router = useRouter();
  const { register, handleSubmit, getValues, errors } = useForm();
  const [showSuccessMessage, setShowSuccessMessage] = React.useState<boolean>(
    false
  );
  const [passwordToken, setPasswordToken] = React.useState<string>("");
  const resetPasswordMutation = useResetPassword();
  const onSubmit = async (
    data: { retryPassword: string; password: string },
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    try {
      const result = await resetPasswordMutation.mutateAsync({
        data: { ...data, passwordToken },
      });
      if (result.status === 200) {
        setShowSuccessMessage(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // set passwordToken
  React.useEffect(() => {
    if (typeof router.query.t === "string") setPasswordToken(router.query.t);
  }, []);

  return (
    <div className="bg-white sm:border rounded  max sm:shadow-md px-6 py-10 sm:p-10 max-w-xl m-auto w-full h-full sm:h-auto">
      <Modal
        onAccept={() => setShowSuccessMessage(false)}
        doShowModal={showSuccessMessage}
        noButton
        acceptText="Continue"
        classNameButton="block w-full text-gray-400 py-2.5 uppercase hover:bg-gray-50"
        description="Your password was reset successfully"
      />
      <h3 className="my-4 text-2xl font-semibold text-gray-700 mt-0">
        Enter you new password:
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
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
        <input
          className="bg-green-500 hover:bg-green-400 text-white p-2 rounded"
          type="submit"
          value="Reset My Password"
        />
      </form>
    </div>
  );
};

export default guestRoute(ForgotPassword);
