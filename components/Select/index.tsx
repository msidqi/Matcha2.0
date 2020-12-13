import React, { useState } from 'react'

interface SelectProps {
    label?: string;
    name: string;
    placeholder: string;
    options: { value: string; label: string; }[];
    register?: any;
}

const Select = ({ register, label, name, placeholder, options }: SelectProps) => {
    const [isDefault, setIsDefault] = useState<boolean>(true)
    return (
        <>
            {label &&
                <label htmlFor={name} className="block text-gray-700 font-semibold">{label}</label>
            }
            <select
                name={name}
                ref={register}
                className={`form-select block ${isDefault && 'text-gray-500'}`}
                placeholder={placeholder}
                defaultValue="default"
                onChange={() => isDefault && setIsDefault(false)}
            >
                <option value="default" disabled>Select your gender</option>
                {options.map((elem, key) =>
                    <option key={`select-${key}`} value={elem.value}>{elem.label}</option>
                )}
            </select>
        </>
    )
}

export default Select
