import React from 'react';

export interface CardProps {
    title: string;
    description?: string;
    icon?: string;

    secondaryTitle?: string;
    actionBtnText?: string;
    actionBtnLink?: string;
}

const Card = ({ title, description, icon, secondaryTitle, actionBtnText, actionBtnLink }: CardProps) => {
    return (
        <div className="relative block group h-96">
            <span className="absolute inset-0 border-2 border-black border-dashed"></span>

            <div className="relative flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="px-8 pb-8 transition-opacity group-hover:opacity-0 group-hover:absolute">
                    <img src={`data:image/svg+xml;utf8,${icon}`} className="w-12 h-12" />

                    <h2 className="mt-4 text-2xl font-medium">{title}</h2>
                </div>

                <div className="absolute p-8 transition-opacity opacity-0 group-hover:opacity-100 group-hover:relative">
                    <h2 className="mt-4 text-2xl font-medium">{secondaryTitle || title}</h2>

                    <p className="mt-4">{description}</p>

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
