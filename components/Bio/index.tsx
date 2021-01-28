import React from "react";

interface BioProps {
  label?: string;
  name?: string;
  placeholder?: string;
  maxLength?: number;
  initialLength?: number;
  register?: any;
}
const Bio = ({
  name = "bio",
  label,
  placeholder,
  register,
  maxLength = 999999,
  initialLength,
}: BioProps): JSX.Element => {
  const [count, setCount] = React.useState<number>(initialLength ?? 0);
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-gray-700 font-semibold">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          name={name}
          ref={register}
          onChange={(e) => setCount(e.target.value.length)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
          placeholder={placeholder}
        />
        <p
          className={`absolute right-5 bottom-1 ${
            count > maxLength ? "text-red-500" : "text-gray-400"
          }`}
        >{`${count}/${maxLength}`}</p>
      </div>
    </div>
  );
};

export default Bio;
