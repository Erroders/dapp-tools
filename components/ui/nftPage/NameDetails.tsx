import React from 'react';

interface NameDetailsProps {
    contractName: string;
    tokenId: string;
    owner: string;
}

const NameDetails = ({ contractName, tokenId, owner }: NameDetailsProps) => {
    return (
        <div className="bg-white border-2 border-black divide-gray-200 py-4 px-6">
            <h1 className="text-lg font-medium tracking-wider">{contractName}</h1>
            <h2 className="text-3xl font-bold py-3 tracking-wider">#{tokenId}</h2>
            <h3 className="text-sm pt-4">
                <span className="font-semibold">Owned By:</span> {owner}
            </h3>
        </div>
    );
};

export default NameDetails;
