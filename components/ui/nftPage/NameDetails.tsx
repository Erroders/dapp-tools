/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React from 'react';

interface NameDetailsProps {
    contractName: string;
    contractAddress: string;
    tokenId: string;
    owner: string;
    chainId: string;
}

const NameDetails = ({ contractName, tokenId, owner, chainId, contractAddress }: NameDetailsProps) => {
    const router = useRouter();
    return (
        <div className="relative bg-white border-2 border-black divide-gray-200 py-4 px-6">
            <div
                className="absolute top-5 right-5 h-6 w-6 cursor-pointer"
                onClick={() => {
                    navigator.clipboard.writeText(
                        `${window.location.origin}${router.pathname}?chainid=${chainId}&tokenid=${tokenId}&contract=${contractAddress}`,
                    );
                }}
            >
                <img
                    src="/share.svg"
                    alt="share"
                    className="absolute h-5 w-5 text-gray-500 scale-100 hover:scale-0 peer transition-transform duration-500 cursor-pointer ease-in-out"
                />
                <img
                    src="/share_filled.svg"
                    alt="share"
                    className="absolute h-5 w-5 text-gray-700 peer-hover:scale-100 scale-0 transition-transform duration-500 cursor-pointer ease-in-out"
                />
            </div>
            <h1 className="text-lg font-medium tracking-wider">{contractName}</h1>
            <h2 className="text-3xl font-bold py-3 tracking-wider">
                #
                {tokenId.length > 10
                    ? tokenId.substring(0, 6) + '...' + tokenId.substring(tokenId.length - 7)
                    : tokenId}
            </h2>
            <h3 className="text-sm pt-4">
                <span className="font-semibold">Owned By:</span> {owner}
            </h3>
        </div>
    );
};

export default NameDetails;
