import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../../pages/_app';
import { NFT } from '../../../utils/types';

interface IIPFSdata {
    ipfsLink: string;
    name: string;
    description: string;
    imageUrl: string;
}

const NFTCard = (nft: NFT) => {
    const router = useRouter();
    const { token_id, contract_name, contract_ticker_symbol, supports_erc, contract_address, metadata } = nft;
    const { chainId } = useContext(WalletContext);
    const stringifed_nft = JSON.stringify(nft);

    return (
        <div className="relative block group h-72">
            <span className="absolute inset-0 border-2 border-black border-dashed"></span>

            <div className="relative flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2">
                {metadata && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={metadata.image ? metadata.image : '/logo.svf'}
                        className="w-full h-full object-cover bg-black absolute opacity-90"
                        alt={metadata.name ? metadata.name : contract_address ? contract_address : 'Unknown'}
                    />
                )}
                <div className="w-full h-full justify-end flex flex-col bg-black bg-opacity-50 z-10 transition-opacity group-hover:opacity-0 group-hover:absolute">
                    <h2 className="px-8 text-xl text-white font-bold">{metadata?.name}</h2>
                    <h2 className="px-8 pb-8 mt-1 text-base font-medium text-white">
                        {contract_name}
                        {contract_ticker_symbol && (
                            <span className="text-sm font-semibold"> ({contract_ticker_symbol})</span>
                        )}
                    </h2>
                </div>
                <div className="absolute w-full z-10 h-full bg-black flex justify-end flex-col bg-opacity-70 transition-opacity opacity-0 group-hover:opacity-100 group-hover:relative">
                    <h2 className="px-8 mt-4 text-xl font-bold text-white">{metadata?.name}</h2>
                    {token_id && (
                        <p className="px-8 text-xl mt-0.5 font-bold text-white">
                            <span className="text-base font-medium">Token ID : </span>
                            {token_id.length > 4 ? token_id.substring(0, 4).concat('....') : token_id}
                        </p>
                    )}
                    {supports_erc && (
                        <div className="px-8 flex gap-2 items-center mt-3">
                            {supports_erc.map((erc, index) => {
                                return (
                                    <div key={index}>
                                        <span className="rounded-full px-4 py-1 bg-green-50 text-green-700 font-medium text-xs">
                                            {erc}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <div
                        className=" px-8 pb-4 flex text-xs mt-2 font-semibold items-center gap-1 justify-end text-white cursor-pointer"
                        onClick={() => {
                            router.push({
                                pathname: '/nft',
                                query: {
                                    nft: stringifed_nft,
                                    chainid: chainId,
                                    tokenid: token_id,
                                    contract: contract_address,
                                },
                            });
                        }}
                    >
                        <span>Know More</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 hover:translate-x-1 transform-all duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
