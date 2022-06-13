import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import BigNumber from 'bignumber.js';

interface ICard {
    balance: string;
    contractAddress: string;
    contractDecimals: number;
    contractName: string;
    contractSymbol: string;
    logoUrl: string;
    ercSupports: string[];
    type: 'dust' | 'nonDust';
}

const CryptoCard = (props: ICard) => {
    return (
        <div className="relative block group h-48">
            <span className="absolute inset-0 border-2 border-black border-dashed"></span>

            <div className="relative flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2">
                <div className="px-8 pb-8 transition-opacity group-hover:opacity-0 group-hover:absolute">
                    <img
                        src={props.logoUrl}
                        onError={(target) => {
                            target.currentTarget.onerror = null;
                            target.currentTarget.src = makeBlockie(props.contractAddress);
                        }}
                        className="w-14 h-14 rounded-full"
                        alt={props.contractName}
                    />

                    <h2 className="mt-4 text-xl font-medium">{props.contractName}</h2>
                </div>

                <div className="absolute w-full px-8 py-4 transition-opacity opacity-0 group-hover:opacity-100 group-hover:relative">
                    <h2 className="mt-4 text-xl font-medium">
                        {props.contractName} (<span className="text-base font-semibold">{props.contractSymbol}</span>)
                    </h2>
                    <p className="text-2xl mt-0.5 font-bold">
                        {new BigNumber(props.balance).shiftedBy(-props.contractDecimals).toFixed(3)}
                    </p>
                    <div className="flex gap-2 items-center mt-3">
                        {props.ercSupports.map((erc, index) => {
                            return (
                                <div key={index}>
                                    <span className="rounded-full px-4 py-1.5 bg-green-100 text-green-700 font-medium text-xs">
                                        {erc}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex text-xs mt-1 font-semibold items-center gap-1 justify-end text-gray-700 cursor-pointer">
                        <span>Know More</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
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
