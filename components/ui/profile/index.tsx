import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../../pages/_app';
import CryptoCard from './cryptoCard';
import NFTCard from './nftCard';

const Profile = () => {
    const { walletAddress, nftData, dustCryptocurrencyData, nonDustCryptocurrencyData, profileDataFetch } =
        useContext(WalletContext);
    const [hideDustToggle, setHideDustToggle] = useState<boolean>(false);
    const [tab, setTab] = useState<'Cryptocurrencies' | 'NFTs'>('Cryptocurrencies');

    return (
        <div className="py-10 px-4 max-w-screen-xl mx-auto">
            {/* Buttons fro NFT / Cryptocurrency */}
            <div className="w-full flex gap-4">
                <div
                    className={`relative transition-all transform duration-300 ${
                        tab === 'Cryptocurrencies' ? 'w-3/5' : 'w-2/5'
                    }`}
                >
                    <span className="absolute inset-0 border-2 border-black border-dashed"></span>
                    <button
                        className={`relative p-2 flex text-center w-full items-center justify-center h-full transition-transform transform border-black ${
                            tab === 'Cryptocurrencies'
                                ? '-translate-y-2 -translate-x-2 bg-white border-2 text-xl font-medium'
                                : 'border-2 text-lg'
                        }`}
                        onClick={() => {
                            setTab('Cryptocurrencies');
                        }}
                    >
                        Cryptocurrencies
                    </button>
                </div>
                <div className={`relative transition-all transform duration-300 ${tab === 'NFTs' ? 'w-3/5' : 'w-2/5'}`}>
                    <span className="absolute inset-0 border-2 border-black border-dashed"></span>
                    <button
                        className={`relative p-2 flex text-center w-full items-center  justify-center h-full transition-transform transform border-black ${
                            tab === 'NFTs'
                                ? '-translate-y-2 -translate-x-2 bg-white border-2 text-xl font-medium'
                                : 'border-2 text-lg'
                        }`}
                        onClick={() => {
                            setTab('NFTs');
                        }}
                    >
                        NFTs
                    </button>
                </div>
            </div>
            {/* Card Division fro NFT / Cryptocurrency */}
            <div className=" mt-5 w-full">
                <div className="grid grid-cols-4 gap-4">
                    {tab === 'Cryptocurrencies' ? (
                        <>
                            <div className="flex col-span-4 justify-end cursor-pointer">
                                <label className="relative flex justify-between items-center group text-base font-medium cursor-pointer">
                                    Hide Zero Balance Tokens
                                    <input
                                        type="checkbox"
                                        className="absolute left-1/2 invisible -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                                        checked={hideDustToggle}
                                        onClick={() => {
                                            setHideDustToggle(!hideDustToggle);
                                        }}
                                        onChange={() => {}}
                                    />
                                    <span className="w-12 h-6 flex items-center flex-shrink-0 pl-1 ml-2 rounded-full duration-300 ease-in-out border-2 border-black after:border-black peer-checked:bg-black after:bg-black after:w-4 after:h-4 after:border-0 peer-checked:after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5"></span>
                                </label>
                            </div>
                            {!profileDataFetch ? (
                                <>
                                    {nonDustCryptocurrencyData &&
                                        nonDustCryptocurrencyData.map((obj, index) => {
                                            return <CryptoCard key={index} {...obj} />;
                                        })}
                                    {dustCryptocurrencyData &&
                                        !hideDustToggle &&
                                        dustCryptocurrencyData.map((obj, index) => {
                                            return <CryptoCard key={index} {...obj} />;
                                        })}
                                    {((!nonDustCryptocurrencyData && !dustCryptocurrencyData) ||
                                        (hideDustToggle && !nonDustCryptocurrencyData)) && (
                                        <div className="w-full col-span-4 text-center py-44">
                                            <div className="flex flex-col gap-2 text-2xl">
                                                <span>No Cryptocurrencies found in the Wallet</span>
                                                <span className="text-xl italic font-mono font-semibold">
                                                    {walletAddress}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="w-full col-span-4 text-center py-44">
                                    <div className="flex flex-col gap-2 text-2xl">
                                        <span>Fetching your tokens ...</span>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {!profileDataFetch ? (
                                <>
                                    {nftData ? (
                                        nftData.map((obj, index) => {
                                            return <NFTCard key={index} {...obj} />;
                                        })
                                    ) : (
                                        <div className="w-full col-span-4 text-center py-44">
                                            <div className="flex flex-col gap-2 text-2xl">
                                                <span>No NFTs found in the Wallet</span>
                                                <span className="text-xl italic font-mono font-semibold">
                                                    {walletAddress}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="w-full col-span-4 text-center py-44">
                                    <div className="flex flex-col gap-2 text-2xl">
                                        <span>Fetching your tokens ...</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
