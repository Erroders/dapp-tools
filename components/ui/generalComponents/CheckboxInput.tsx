import React from 'react';

interface CheckboxInputProps {
    id: string;
    label: string;
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckboxInput = ({ id, label, setValue, value }: CheckboxInputProps) => {
    return (
        <div className="relative flex">
            <input
                className="ml-0.5 h-5 w-5 block focus:border-gray-500 focus:bg-white focus:ring-1 focus:ring-black"
                id={id}
                type="checkbox"
                checked={value}
                onClick={(e) => {
                    setValue(e.currentTarget.checked);
                }}
            />
            <label className="ml-2 my-auto block text-sm font-medium text-gray-500" htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default CheckboxInput;
