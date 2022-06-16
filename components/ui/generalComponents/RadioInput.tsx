import React from 'react';

interface RadioInputProps {
    id: string;
    label: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    valueOptions: Array<{
        value: string;
        label: string;
    }>;
}

const RadioInput = ({ id, label, setValue, value, valueOptions }: RadioInputProps) => {
    return (
        <div className="relative">
            <label className="block text-xs font-medium text-gray-500" htmlFor={id}>
                {label}
            </label>

            <div className="pl-1 pt-1 mt-1 w-full space-y-2">
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
            </div>
        </div>
    );
};

export default RadioInput;

{
    /* <input type="radio" id="age1" name="age" value="30">
<label for="age1">0 - 30</label> */
}
