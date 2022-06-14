import React from 'react';

interface ButtonProps {
    title: string;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    onClick?: VoidFunction;
}

const Button = ({ title, leftIcon, rightIcon, onClick }: ButtonProps) => {
    return (
        <button className="relative block group cursor-pointer w-full h-full" onClick={onClick}>
            <span className="absolute inset-0 border-2 border-black border-dashed"></span>

            <div className="relative flex items-end h-full w-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="px-8 py-2.5 transition-opacity flex w-full">
                    {leftIcon}

                    <div className="text-center w-full items-center flex justify-center">
                        <h2 className="text-2xl font-medium">{title}</h2>
                    </div>

                    {rightIcon}
                </div>
            </div>
        </button>
    );
};

export default Button;
