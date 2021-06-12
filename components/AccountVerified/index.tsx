import React from "react";
import guestRoute from "@/components/GuestRoute";

const AccountVerified = (): JSX.Element => {
  return (
    <div className="bg-white sm:border rounded  max sm:shadow-md px-6 py-10 sm:p-10 max-w-xl m-auto w-full h-full sm:h-auto">
      <h1 className="text-gray-500 text-3xl text-center mb-4">
        Verified Successfully
      </h1>
      <p>
        Success! your email has been verified! Your next step is to login to
        complete your account.
      </p>
    </div>
  );
};

export default guestRoute(AccountVerified);
