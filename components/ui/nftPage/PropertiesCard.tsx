import React from 'react';

interface PropertiesCardProps {
    traitType: string;
    value: string;
}

const PropertiesCard = ({ traitType, value }: PropertiesCardProps) => {
    return (
        <div className="relative block ">
            <span className="absolute inset-0 border-2 border-black border-dashed"></span>

            <div className="relative flex items-end h-full transition-transform transform bg-white border-2 border-black hover:-translate-x-1 hover:-translate-y-1">
                <div className="px-3 py-1.5 transition-opacity hover:absolute">
                    <span className="text-base font-semibold">{value}</span>
                    <br />
                    <span className="text-sm">{traitType}</span>
                </div>
            </div>
        </div>
    );
};

export default PropertiesCard;
