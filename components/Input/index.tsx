import React from "react";

interface InputProps {
  label?: string;
  type?: string;
  placeholder: string;
  name: string;
  register?:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null;
  className?: string;
  inputClassName?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type = "text",
  label,
  placeholder,
  name,
  register,
  className,
  inputClassName,
  onChange,
}: InputProps): JSX.Element => (
  <div className={`${className ? className : "w-full"}`}>
    {label && (
      <label htmlFor={name} className="block text-gray-700 font-semibold">
        {label}
      </label>
    )}
    <input
      onChange={onChange}
      type={type}
      name={name}
      ref={register}
      className={`${
        inputClassName ? inputClassName : ""
      } mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
      placeholder={placeholder}
    />
  </div>
);

export default Input;
