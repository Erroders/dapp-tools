import React from 'react';
import imagePlaceholder from '../../../assets/imagePlaceholder.svg';

interface ImageInputProps {
    id: string;
    label: string;
    image?: File;
    imageOnChange?: (imageFile: File) => void;
}

const ImageInput = ({ id, label, image, imageOnChange }: ImageInputProps) => {
    return (
        <>
            <div className="relative">
                <p className="block text-xs font-medium text-gray-500">{label}</p>
                <label className="block" htmlFor={id}>
                    <img
                        src={image ? URL.createObjectURL(image) : imagePlaceholder.src}
                        className="object-center w-full"
                    />
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
};

export default ImageInput;
