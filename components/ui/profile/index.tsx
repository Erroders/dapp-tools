import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../../pages/_app';
import { getWalletTokenDetails } from '../../../utils/wallet_token_details';
import CryptoCard from './cryptoCard';
import NFTCard from './nftCard';

const Profile = () => {
    const { signer, walletAddress, chainId, profileDataFetch, setProfileDataFetch } = useContext(WalletContext);
    const [hideDustToggle, setHideDustToggle] = useState<boolean>(false);
    const [nftData, setNftData] = useState<any[]>([]);
    const [dustCryptocurrencyData, setDustCryptocurrencyData] = useState<any[]>([]);
    const [nonDustCryptocurrencyData, setNonDustCryptocurrencyData] = useState<any[]>([]);
    const [tab, setTab] = useState<'Cryptocurrencies' | 'NFTs'>('Cryptocurrencies');
    let nftFlag = 0;

    const fetchData = async () => {
        if (walletAddress && chainId && !profileDataFetch) {
            setProfileDataFetch(true);
            const data = await getWalletTokenDetails(walletAddress, chainId);
            setProfileDataFetch(false);
            if (data) {
                console.log(data);
                setDustCryptocurrencyData(data.dustCryptocurrencyData);
                setNonDustCryptocurrencyData(data.nonDustCryptocurrencyData);
                setNftData(data.nftData);
            }
            nftFlag = 0;
        }
    };

    useEffect(() => {
        setDustCryptocurrencyData([]);
        setNonDustCryptocurrencyData([]);
        setNftData([]);
        if (signer)
            fetchData()
                // .then(() => {
                //     console.log(nonDustCryptocurrencyData, dustCryptocurrencyData, nftData);
                // })
                .catch(console.error);
    }, [signer, walletAddress, chainId]);

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
                                    <span className="w-12 h-6 flex items-center flex-shrink-0 ml-2 p-1 rounded-full duration-300 ease-in-out border-2 border-black after:border-2 after:border-black peer-checked:bg-gray-600 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-5"></span>
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
                                            signer={signer}
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
                                            signer={signer}
                                        />
                                    );
                                })}
                            {(nonDustCryptocurrencyData.length === 0 && dustCryptocurrencyData.length === 0) ||
                                (hideDustToggle && nonDustCryptocurrencyData.length === 0 && (
                                    <>
                                        <div className="w-full col-span-4 text-center py-44">
                                            <div className="flex flex-col gap-2 text-2xl">
                                                <span>No Cryptocurrencies found in the Wallet</span>
                                                <span className="text-xl italic font-mono font-semibold">
                                                    {walletAddress}
                                                </span>
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
                                    <div className="w-full col-span-4 text-center py-44">
                                        <div className="flex flex-col gap-2 text-2xl">
                                            <span>No NFTs found in the Wallet</span>
                                            <span className="text-xl italic font-mono font-semibold">
                                                {walletAddress}
                                            </span>
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
