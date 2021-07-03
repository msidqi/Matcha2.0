import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import guestRoute from "@/components/GuestRoute";
import { useResetPassword } from "@/utils/requests/userRequests";
import Modal from "../ui/Modal";
import { useRouter } from "next/router";

const ForgotPassword = ({ token = "" }: { token?: string }): JSX.Element => {
  const router = useRouter();
  const { register, handleSubmit, getValues, errors } = useForm();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const resetPasswordMutation = useResetPassword();
  const onSubmit = async (data: { retryPassword: string; password: string }) =>
    resetPasswordMutation.mutate(
      {
        data: { ...data, passwordToken: token },
      },
      {
        onSuccess: () => {
          setShowSuccessMessage(true);
        },
        onError: (e) => {
          console.error(e);
        },
      }
    );

  return (
    <div className="bg-white sm:border rounded  max sm:shadow-md px-6 py-10 sm:p-10 max-w-xl m-auto w-full h-full sm:h-auto">
      <Modal
        onAccept={() => {
          setShowSuccessMessage(false);
          router.push("/signin");
        }}
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
          label="New Password"
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
