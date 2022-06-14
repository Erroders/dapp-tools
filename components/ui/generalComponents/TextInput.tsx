import React from 'react';

export enum TextInputTypes {
    TEXT = 'text',
    PASSWORD = 'password',
    EMAIL = 'email',
    NUMBER = 'number',
    URL = 'url',
    DATE = 'date',
    DATETIME_LOCAL = 'datetime-local',
    MONTH = 'month',
    WEEK = 'week',
    TIME = 'time',
    SEARCH = 'search',
    TEL = 'tel',
    // CHECKBOX = 'checkbox',
    // IMAGE = 'image',
    // RADIO = 'radio',
}

interface TextInputProps {
    id: string;
    label: string;
    type: TextInputTypes;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput = ({ id, label, type, value, setValue }: TextInputProps) => {
    return (
        <div className="relative">
            <label className="block text-xs font-medium text-gray-500" htmlFor={id}>
                {label}
            </label>

            <input
                className="mt-1 block w-full focus:border-gray-500 focus:bg-white focus:ring-1 focus:ring-black"
                id={id}
                type={type}
                value={value}
                onChange={(e) => {
                    setValue(e.currentTarget.value);
                }}
            />
        </div>
    );
};

export default TextInput;
