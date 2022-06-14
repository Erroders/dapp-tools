import React from 'react';

interface SubmitButtonProps {
    title: string;
    leftIcon?: JSX.Element;
    rightIcon?: JSX.Element;
    onClick?: VoidFunction;
}

const SubmitButton = ({ title, leftIcon, rightIcon, onClick }: SubmitButtonProps) => {
    return (
        <div className="relative block">
            <label htmlFor="submitbtn">
                <div className="group cursor-pointer w-full h-full">
                    <span className="absolute inset-0 border-2 border-black border-dashed"></span>

                    <div className="relative flex items-end h-full w-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2">
                        <div className="px-8 py-2.5 transition-opacity flex w-full">
                            {leftIcon}

                            <div className="text-center w-full items-center flex justify-center">
                                <h2 className="text-base font-medium">{title}</h2>
                            </div>

                            {rightIcon}
                        </div>
                    </div>
                </div>
            </label>

            <input className="hidden" id="submitbtn" name="submitbtn" type="submit" />
        </div>
    );
};

export default SubmitButton;
