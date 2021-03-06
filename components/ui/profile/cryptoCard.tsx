import React, { useContext } from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import networks from '../../../data/networks.json';
import { WalletContext } from '../../../pages/_app';
import { CryptoCurrency } from '../../../utils/types';

const CryptoCard = (cc: CryptoCurrency) => {
    const { chainId } = useContext(WalletContext);
    const {
        contract_address,
        contract_name,
        contract_decimals,
        contract_ticker_symbol,
        supports_erc,
        balance,
        logo_url,
    } = cc;
    return (
        <div className="relative block group h-48">
            <span className="absolute inset-0 border-2 border-black border-dashed"></span>

            <div className="relative flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="absolute flex gap-1 top-3 right-8 group invisible group-hover:visible">
                    <p className="font-medium text-sm italic text-gray-500">
                        {contract_address.substring(0, 6)}......
                        {contract_address.substring(contract_address.length - 6)}
                    </p>
                    <div
                        className="relative"
                        onClick={() => {
                            navigator.clipboard.writeText(contract_address);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute h-5 w-5 text-gray-500 scale-100 hover:scale-0 peer transition-transform duration-500 cursor-pointer ease-in-out"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <title>Copy Contract Address</title>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute h-5 w-5 text-gray-700 peer-hover:scale-100 scale-0 transition-transform duration-500 cursor-pointer ease-in-out"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                        </svg>
                    </div>
                </div>

                <div className="px-8 pb-8 transition-opacity group-hover:opacity-0 group-hover:absolute">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={logo_url}
                        onError={(target) => {
                            target.currentTarget.onerror = null;
                            const blockie = makeBlockie(contract_address);
                            target.currentTarget.src = blockie;
                        }}
                        className="w-14 h-14 rounded-full"
                        alt={contract_name}
                    />
                    <h2 className="mt-4 text-xl font-medium">{contract_name}</h2>
                </div>

                <div className="absolute w-full px-8 py-4 transition-opacity opacity-0 group-hover:opacity-100 group-hover:relative">
                    <h2 className="mt-4 text-xl font-medium">
                        {contract_name} (<span className="text-base font-semibold">{contract_ticker_symbol}</span>)
                    </h2>
                    <p className="text-2xl mt-0.5 font-bold">
                        {new BigNumber(balance ? balance : 0).shiftedBy(-contract_decimals).toFixed(3)}
                    </p>
                    <div className="flex gap-2 items-center mt-3">
                        {supports_erc &&
                            supports_erc.map((erc, index) => {
                                return (
                                    <div key={index}>
                                        <span className="rounded-full px-4 py-1.5 bg-green-100 text-green-700 font-medium text-xs">
                                            {erc}
                                        </span>
                                    </div>
                                );
                            })}
                    </div>
                    <div
                        className="flex text-xs mt-1 font-semibold items-center gap-1 justify-end text-gray-700 cursor-pointer"
                        onClick={async () => {
                            if (chainId) {
                                const explorerUrl = networks[chainId].blockExplorerURL;
                                const link = `${explorerUrl}address/${contract_address}`;
                                window.open(link, '_newtab');
                            }
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

export default CryptoCard;
