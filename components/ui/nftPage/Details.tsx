import React from 'react';
import { ERCStandards } from '../../../utils/types';

interface DetailsProps {
    contractAddress: string;
    contractTickerSymbol: string;
    tokenId: string;
    tokenBalance: string;
    tokenStandard: ERCStandards[];
    blockchain: string;
    metadata: {
        burned: boolean | null;
    };
}

const Details = ({
    blockchain,
    contractAddress,
    contractTickerSymbol,
    metadata,
    tokenId,
    tokenBalance,
    tokenStandard,
}: DetailsProps) => {
    let tokenType: string;
    if (tokenStandard.includes(ERCStandards.ERC1155)) {
        tokenType = 'ERC1155';
    } else if (tokenStandard.includes(ERCStandards.ERC777)) {
        tokenType = 'ERC777';
    } else if (tokenStandard.includes(ERCStandards.ERC721)) {
        tokenType = 'ERC721';
    } else {
        tokenType = 'ERC20';
    }

    return (
        <div className="bg-white border-2 border-black divide-y divide-gray-200 my-2">
            <details className="p-6 group">
                <summary className="flex items-center justify-between cursor-pointer">
                    <h5 className="text-lg font-semibold text-gray-900">Details</h5>

                    <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                        <svg
                            className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </summary>

                <div className="text-sm w-full grid gap-1.5 my-4">
                    <p className="grid grid-cols-2">
                        <span className="text-black font-medium">Contract Address</span>
                        <span className="text-gray-800 truncate">{contractAddress}</span>
                    </p>
                    <p className="grid grid-cols-2">
                        <span className="text-black font-medium">Token ID</span>
                        <span className="text-gray-800 truncate">{tokenId}</span>
                    </p>
                    <p className="grid grid-cols-2">
                        <span className="text-black font-medium">Contract Ticker Symbol</span>
                        <span className="text-gray-800 truncate">{contractTickerSymbol}</span>
                    </p>
                    <p className="grid grid-cols-2">
                        <span className="text-black font-medium">Token Standard</span>
                        <span className="text-gray-800 truncate">{tokenType}</span>
                    </p>
                    {tokenType == 'ERC1155' && (
                        <p className="grid grid-cols-2">
                            <span className="text-black font-medium">Token Balance</span>
                            <span className="text-gray-800 truncate">{tokenBalance}</span>
                        </p>
                    )}
                    <p className="grid grid-cols-2">
                        <span className="text-black font-medium">Blockchain</span>
                        <span className="text-gray-800 truncate">{blockchain}</span>
                    </p>
                    {metadata.burned && (
                        <p className="grid grid-cols-2">
                            <span className="text-black font-medium">Metadata</span>
                            <span className="text-gray-800 truncate">Burned</span>
                        </p>
                    )}
                </div>
            </details>
        </div>
    );
};

export default Details;
