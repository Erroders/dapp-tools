import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';
import networks from '../data/networks.json';
import WalletModal from '../components/ui/modal';
import connectWallet from '../components/wallet/connectWallet';
import { wallets } from '../components/wallet/connectWallet/enums';
import Navbar from '../components/ui/navbar';
import { isEqual } from 'lodash';

interface WalletContextProps {
    profileDataFetch: boolean;
    walletAddress: string;
    modalVisibility: boolean;
    chainId: keyof typeof networks | null;
    signer: ethers.Signer | null;
    setProfileDataFetch: (profileDataFetch: boolean) => void;
    setModalVisibility: (visibilty: boolean) => void;
    updateSigner: (provider: ethers.providers.Web3Provider | null) => void;
}

export const WalletContext = createContext<WalletContextProps>({
    profileDataFetch: false,
    signer: null,
    walletAddress: '',
    chainId: null,
    modalVisibility: false,
    setProfileDataFetch: (profileDataFetch: boolean) => {},
    setModalVisibility: (visibilty: boolean) => {},
    updateSigner: (provider: ethers.providers.Web3Provider | null) => {},
});

function MyApp({ Component, pageProps }: AppProps) {
    const [modalVisibility, setModalVisibility] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [chainId, setChainId] = useState<keyof typeof networks | null>(null);
    const [profileDataFetch, setProfileDataFetch] = useState<boolean>(false);

    useEffect(() => {
        console.log('signer updated', signer);
        setProfileDataFetch(false);
        if (signer) {
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
            !modalVisibility && setModalVisibility(true);
        }
    }, [signer]);

    const updateSigner = (provider: ethers.providers.Web3Provider | null) => {
        if (provider) {
            const signer_ = provider.getSigner();
            if (!isEqual(signer, signer_)) {
                setSigner(signer_);
            } else {
                signer && setSigner(null);
            }
        }
    };

    useEffect(() => {
        connectWallet(wallets.ANY, updateSigner);
    }, []);

    return (
        <WalletContext.Provider
            value={{
                profileDataFetch: profileDataFetch,
                walletAddress: walletAddress,
                modalVisibility: modalVisibility,
                chainId: chainId,
                signer: signer,
                setProfileDataFetch: setProfileDataFetch,
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
