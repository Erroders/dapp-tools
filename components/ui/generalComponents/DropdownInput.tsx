import React from 'react';

interface DropdownInputProps {
    id: string;
    label: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    valueOptions: Array<{
        value: string;
        label: string;
    }>;
    disabled?: boolean;
}

const DropdownInput = ({ id, label, setValue, value, valueOptions, disabled = false }: DropdownInputProps) => {
    return (
        <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor={id}>
                {label}
            </label>

            <select
                name={id}
                id={id}
                disabled={disabled}
                onChange={(e) => {
                    setValue(e.currentTarget.value);
                }}
                defaultValue={value}
                className="pl-2 mt-1 w-full space-y-2 block focus:border-gray-500 focus:bg-white focus:ring-1 focus:ring-black"
            >
                {valueOptions.map((valueOption, index) => {
                    return (
                        <option key={index} value={valueOption.value}>
                            {valueOption.label}
                        </option>
                    );
                })}
            </select>

            {/* <div className="pl-1 pt-1 mt-1 w-full space-y-2">
                {valueOptions.map((value, index) => {
                    return (
                        <div key={index} className="flex">
                            <input
                                className="ml-0.5 h-5 w-5 block focus:border-gray-500 focus:bg-white focus:ring-1 focus:ring-black"
                                type="radio"
                                id={value.value}
                                name={id}
                                value={value.value}
                                defaultChecked={index === 0}
                                disabled={disabled}
                            />
                            <label
                                className="ml-2 my-auto block text-sm font-medium text-gray-500"
                                htmlFor={value.value}
                            >
                                {value.label}
                            </label>
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
};

export default DropdownInput;
