/* eslint-disable react-hooks/exhaustive-deps */
import { ethers } from 'ethers';
import { isEqual } from 'lodash';
import type { AppProps } from 'next/app';
import { createContext, useEffect, useState } from 'react';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';
import connectWallet from '../components/wallet/connectWallet';
import { wallets } from '../components/wallet/connectWallet/enums';
import { CryptoCurrency, NFT } from '../utils/types';
import { getWalletTokenDetails } from '../utils/wallet_token_details';
import networks from '../data/networks.json';
import '../styles/globals.css';

interface WalletContextProps {
    profileDataFetch: boolean;
    walletAddress: string;
    modalVisibility: boolean;
    chainId: keyof typeof networks | null;
    signer: ethers.Signer | null;
    nftData: NFT[] | null;
    dustCryptocurrencyData: CryptoCurrency[] | null;
    nonDustCryptocurrencyData: CryptoCurrency[] | null;
    fetchData: () => void;
    setModalVisibility: (visibilty: boolean) => void;
    updateSigner: (provider: ethers.providers.Web3Provider | null) => void;
}

export const WalletContext = createContext<WalletContextProps>({
    profileDataFetch: false,
    signer: null,
    walletAddress: '',
    chainId: null,
    modalVisibility: false,
    nftData: null,
    dustCryptocurrencyData: null,
    nonDustCryptocurrencyData: null,
    fetchData: async () => {},
    setModalVisibility: (visibilty: boolean) => {},
    updateSigner: (provider: ethers.providers.Web3Provider | null) => {},
});

function MyApp({ Component, pageProps }: AppProps) {
    const [modalVisibility, setModalVisibility] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [chainId, setChainId] = useState<keyof typeof networks | null>(null);
    const [profileDataFetch, setProfileDataFetch] = useState<boolean>(false);
    const [nftData, setNftData] = useState<NFT[] | null>(null);
    const [dustCryptocurrencyData, setDustCryptocurrencyData] = useState<CryptoCurrency[] | null>(null);
    const [nonDustCryptocurrencyData, setNonDustCryptocurrencyData] = useState<CryptoCurrency[] | null>(null);

    const fetchData = async () => {
        if (walletAddress && chainId) {
            setProfileDataFetch(true);
            const data = await getWalletTokenDetails(walletAddress, chainId);
            setProfileDataFetch(false);
            if (data) {
                console.log(data);
                setDustCryptocurrencyData(data.dustCryptocurrencyData);
                setNonDustCryptocurrencyData(data.nonDustCryptocurrencyData);
                setNftData(data.nftData);
            }
        } else {
            setDustCryptocurrencyData(null);
            setNonDustCryptocurrencyData(null);
            setNftData(null);
        }
    };

    useEffect(() => {
        fetchData();
    }, [walletAddress, chainId]);

    useEffect(() => {
        if (signer) {
            console.log('signer updated', signer);
            signer.getAddress().then((address) => {
                if (address !== walletAddress) setWalletAddress(address);
            });
            signer.getChainId().then((chainId_) => {
                const _chainId = chainId_.toString() as keyof typeof networks;
                if (chainId !== _chainId) setChainId(_chainId);
            });
            setModalVisibility(false);
        } else {
            walletAddress && setWalletAddress('');
            chainId && setChainId(null);
            // !modalVisibility && setModalVisibility(true);
            connectWallet(wallets.ANY, updateSigner).then((provider) => {
                updateSigner(provider);
            });
        }
    }, [signer]);

    const updateSigner = (provider: ethers.providers.Web3Provider | null) => {
        if (provider) {
            // TODO: from link
            const signer_ = provider.getSigner();
            if (!isEqual(signer, signer_)) {
                setSigner(signer_);
            } else {
                signer && setSigner(null);
            }
        } else {
            setSigner(null);
        }
    };

    useEffect(() => {
        connectWallet(wallets.ANY, updateSigner).then((provider) => {
            updateSigner(provider);
        });
    }, []);

    return (
        <WalletContext.Provider
            value={{
                profileDataFetch: profileDataFetch,
                walletAddress: walletAddress,
                modalVisibility: modalVisibility,
                chainId: chainId,
                signer: signer,
                nftData: nftData,
                dustCryptocurrencyData: dustCryptocurrencyData,
                nonDustCryptocurrencyData: nonDustCryptocurrencyData,
                fetchData: fetchData,
                setModalVisibility: setModalVisibility,
                updateSigner: updateSigner,
            }}
        >
            <Navbar />
            <Component {...pageProps} />
            <WalletModal />
        </WalletContext.Provider>
    );
}

export default MyApp;
