/* eslint-disable @next/next/no-img-element */
import React from 'react';

export interface CardProps {
    title: string;
    subtitle: string;
    description?: string;
    icon?: string;

    secondaryTitle?: string;
    actionBtnText?: string;
    actionBtnLink?: string;
}

const Card = ({ title, subtitle, description, icon, secondaryTitle, actionBtnText, actionBtnLink }: CardProps) => {
    return (
        <div className="relative block group h-96 cursor-pointer">
            <span className="absolute inset-0 border-2 border-black border-dashed"></span>

            <div className="relative flex flex-col items-center justify-between h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="px-8 py-8 flex flex-col justify-end transition-opacity group-hover:opacity-0 group-hover:absolute">
                    <img src={icon} alt="icon" className="w-32 h-32 my-5" />
                    <h3 className="text-2xl font-medium">{title}</h3>
                    <h4 className="mt-4">{subtitle}</h4>
                </div>

                <div className="absolute px-8 py-6 transition-opacity opacity-0 group-hover:opacity-100 group-hover:relative">
                    <h2 className="mt-4 text-2xl font-medium">{secondaryTitle || title}</h2>

                    <p className="mt-4 text-justify">{description}</p>

                    {/* {actionBtnText && (
                        <a href={actionBtnLink} className="mt-8 font-bold">
                            {actionBtnText}
                        </a>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Card;
