import React, { useState } from "react";

interface SelectProps {
  label?: string;
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
  register?: any;
}

const Select = ({
  register,
  label,
  name,
  placeholder,
  options,
}: SelectProps): JSX.Element => {
  const [isDefault, setIsDefault] = useState<boolean>(true);
  return (
    <>
      {label && (
        <label htmlFor={name} className="block text-gray-700 font-semibold">
          {label}
        </label>
      )}
      <select
        name={name}
        ref={register}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
          isDefault && "text-gray-500"
        }`}
        placeholder={placeholder}
        defaultValue="default"
        onChange={() => isDefault && setIsDefault(false)}
      >
        <option value="default" disabled>
          Select your gender
        </option>
        {options.map((elem, key) => (
          <option key={`select-${key}`} value={elem.value}>
            {elem.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
