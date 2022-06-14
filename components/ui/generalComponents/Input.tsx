import React from 'react';
import imagePlaceholder from '../../../assets/imagePlaceholder.svg';

export enum InputTypes {
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
    CHECKBOX = 'checkbox',
    IMAGE = 'image',
    // RADIO = 'radio',
}

interface TextInputProps {
    id: string;
    label: string;
    type: InputTypes;
    checked?: boolean;
    image?: string;
    imageOnChange?: (imageFile: File) => void;
}

const Input = ({ id, label, type, checked = false, image, imageOnChange }: TextInputProps) => {
    if (type == InputTypes.CHECKBOX) {
        return (
            <div className="relative flex">
                <input
                    className="ml-0.5 h-5 w-5 block focus:border-gray-500 focus:bg-white focus:ring-1 focus:ring-black"
                    id={id}
                    type={type}
                    defaultChecked={checked}
                />
                <label className="ml-2 my-auto block text-sm font-medium text-gray-500" htmlFor={id}>
                    {label}
                </label>
            </div>
        );
    }

    if (type == InputTypes.IMAGE) {
        return (
            <>
                <div className="relative">
                    <p className="block text-xs font-medium text-gray-500">{label}</p>
                    <label className="block" htmlFor={id}>
                        <img src={image || imagePlaceholder.src} alt="" className="object-center w-full" />
                    </label>

                    <input
                        className="hidden mt-1 w-full focus:border-gray-500 focus:bg-white focus:ring-1 focus:ring-black"
                        id={id}
                        name={id}
                        type={'file'}
                        accept="image/*"
                        onChange={(e) => {
                            e.currentTarget.files && imageOnChange && imageOnChange(e.currentTarget.files[0]);
                        }}
                    />
                </div>
            </>
        );
    }

    return (
        <div className="relative">
            <label className="block text-xs font-medium text-gray-500" htmlFor={id}>
                {label}
            </label>

            <input
                className="mt-1 block w-full focus:border-gray-500 focus:bg-white focus:ring-1 focus:ring-black"
                id={id}
                type={type}
            />
        </div>
    );
};

export default Input;
