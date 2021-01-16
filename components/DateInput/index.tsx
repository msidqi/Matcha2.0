import React from "react";

interface InputProps {
  label?: string;
  name: string;
  register?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null;
}

const DateInput = ({ label, name, register }: InputProps): JSX.Element => (
  <div>
    {label && (
      <label htmlFor={name} className="block text-gray-700 font-semibold">
        {label}
      </label>
    )}
    <input
      type="date"
      name={name}
      ref={register}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    />
  </div>
);

export default DateInput;
