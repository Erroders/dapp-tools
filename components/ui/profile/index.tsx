import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../../pages/_app';
import { getWalletTokenDetails } from '../../../utils/wallet_token_details';
import CryptoCard from './cryptoCard';
import NFTCard from './nftCard';

const Profile = () => {
    const walletContext = useContext(WalletContext);
    const walletAddress = walletContext.walletAddress;
    const provider = walletContext.web3Provider;

    const [hideDustToggle, setHideDustToggle] = useState<boolean>(false);
    const [nftData, setNftData] = useState<any[]>([]);
    const [dustCryptocurrencyData, setDustCryptocurrencyData] = useState<any[]>([]);
    const [nonDustCryptocurrencyData, setNonDustCryptocurrencyData] = useState<any[]>([]);
    const [tab, setTab] = useState<'Cryptocurrencies' | 'NFTs'>('Cryptocurrencies');
    let nftFlag = 0;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getWalletTokenDetails(provider);
            data && setDustCryptocurrencyData(data.dustCryptocurrencyData);
            data && setNonDustCryptocurrencyData(data.nonDustCryptocurrencyData);
            data && setNftData(data.nftData);
            nftFlag = 0;
        };

        if (provider) {
            fetchData()
                .then(() => {
                    console.log(nonDustCryptocurrencyData, dustCryptocurrencyData, nftData);
                })
                .catch(console.error);
        } else {
            walletContext.updateConnectWalletModalVisibility(true);
        }
    }, [walletAddress, provider]);

    return (
        <div className="py-10 px-4 max-w-screen-xl mx-auto">
            {/* Buttons fro NFT / Cryptocurrency */}
            <div className="w-full flex gap-4">
                <div
                    className={`relative transition-all transform duration-300 ${
                        tab === 'Cryptocurrencies' ? 'w-3/5' : 'w-2/5'
                    }`}
                >
                    <span className="absolute inset-0 border-2 border-black border-dashed bg-gray-300"></span>
                    <button
                        className={`relative p-2 flex text-center w-full items-center justify-center h-full transition-transform transform border-black ${
                            tab === 'Cryptocurrencies'
                                ? '-translate-y-2 translate-x-2 bg-white border-2 text-xl font-medium'
                                : 'bg-gray-200 border text-lg'
                        }`}
                        onClick={() => {
                            setTab('Cryptocurrencies');
                        }}
                    >
                        Cryptocurrencies
                    </button>
                </div>
                <div className={`relative transition-all transform duration-300 ${tab === 'NFTs' ? 'w-3/5' : 'w-2/5'}`}>
                    <span className="absolute inset-0 border-2 border-black border-dashed bg-gray-300"></span>
                    <button
                        className={`relative p-2 flex text-center w-full items-center  justify-center h-full transition-transform transform border-black ${
                            tab === 'NFTs'
                                ? '-translate-y-2 translate-x-2 bg-white border-2 text-xl font-medium'
                                : 'bg-gray-200 border text-lg'
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
                                <label className="relative flex justify-between items-center group text-base font-medium text-gray-500">
                                    Hide Zero Balance Tokens
                                    <input
                                        type="checkbox"
                                        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                                        checked={hideDustToggle}
                                        onClick={() => {
                                            setHideDustToggle(!hideDustToggle);
                                        }}
                                        onChange={() => {}}
                                    />
                                    <span className="w-12 h-6 flex items-center flex-shrink-0 ml-2 bg-gray-300 p-1 rounded-full duration-300 ease-in-out peer-checked:bg-gray-600 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5"></span>
                                </label>
                            </div>
                            {nonDustCryptocurrencyData.length > 0 &&
                                nonDustCryptocurrencyData.map((obj, index) => {
                                    return (
                                        <CryptoCard
                                            key={index}
                                            balance={obj.balance}
                                            contractAddress={obj.contract_address}
                                            contractDecimals={obj.contract_decimals}
                                            contractName={obj.contract_name}
                                            contractSymbol={obj.contract_ticker_symbol}
                                            logoUrl={obj.logo_url}
                                            ercSupports={obj.supports_erc}
                                            type={'nonDust'}
                                            provider={provider}
                                        />
                                    );
                                })}
                            {dustCryptocurrencyData.length > 0 &&
                                !hideDustToggle &&
                                dustCryptocurrencyData.map((obj, index) => {
                                    return (
                                        <CryptoCard
                                            key={index}
                                            balance={obj.balance}
                                            contractAddress={obj.contract_address}
                                            contractDecimals={obj.contract_decimals}
                                            contractName={obj.contract_name}
                                            contractSymbol={obj.contract_ticker_symbol}
                                            logoUrl={obj.logo_url}
                                            ercSupports={obj.supports_erc}
                                            type={'dust'}
                                            provider={provider}
                                        />
                                    );
                                })}
                            {(nonDustCryptocurrencyData.length === 0 && dustCryptocurrencyData.length === 0) ||
                                (nonDustCryptocurrencyData.length === 0 && hideDustToggle && (
                                    <>
                                        <div className="w-full col-span-4 text-center py-20">
                                            <div className="flex flex-col gap-2 text-2xl font-semibold text-gray-500">
                                                <span>No Cryptocurrencies were found in the Wallet</span>
                                                <span className="text-xl italic">{walletAddress}</span>
                                            </div>
                                        </div>
                                    </>
                                ))}
                        </>
                    ) : (
                        <>
                            {nftData.length > 0 &&
                                nftData.map((obj, index1) => {
                                    if (
                                        !obj ||
                                        obj.contract_name === null ||
                                        !obj.nft_data ||
                                        obj.nft_data.length === 0
                                    ) {
                                        nftFlag = nftFlag + 1;
                                        return;
                                    }
                                    return obj.nft_data.map((nft: any, index2: any) => {
                                        return (
                                            <NFTCard
                                                key={index2}
                                                contractAddress={obj.contract_address}
                                                contractName={obj.contract_name}
                                                contractSymbol={obj.contract_ticker_symbol}
                                                type={'nft'}
                                                nftData={{
                                                    tokenId: nft.token_id,
                                                    tokenBalance: nft.token_balance,
                                                    tokenUrl: nft.token_url,
                                                    ercSupports: nft.supports_erc,
                                                }}
                                            />
                                        );
                                    });
                                })}
                            {(nftData.length === 0 || nftFlag === nftData.length) && (
                                <>
                                    <div className="w-full col-span-4 text-center py-20">
                                        <div className="flex flex-col gap-2 text-2xl font-semibold text-gray-500">
                                            <span>No NFTs were found in the Wallet</span>
                                            <span className="text-xl italic">{walletAddress}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
