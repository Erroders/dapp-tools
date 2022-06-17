import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';
import networks from '../data/networks.json';
import WalletModal from '../components/ui/modal';
import connectWallet from '../components/wallet/connectWallet';
import { wallets } from '../components/wallet/connectWallet/enums';
import Navbar from '../components/ui/navbar';

interface WalletContextProps {
    walletAddress: string;
    modalVisibility: boolean;
    chainId: keyof typeof networks | null;
    signer: ethers.Signer | null;
    setModalVisibility: (visibilty: boolean) => void;
    updateSigner: (provider: ethers.providers.Web3Provider | null) => void;
}

export const WalletContext = createContext<WalletContextProps>({
    signer: null,
    walletAddress: '',
    chainId: null,
    modalVisibility: false,
    setModalVisibility: (visibilty: boolean) => {},
    updateSigner: (provider: ethers.providers.Web3Provider | null) => {},
});

function MyApp({ Component, pageProps }: AppProps) {
    const [modalVisibility, setModalVisibility] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [chainId, setChainId] = useState<keyof typeof networks | null>(null);

    useEffect(() => {
        console.log('signer updated', signer);
        if (signer) {
            signer.getAddress().then((address) => {
                setWalletAddress(address);
            });
            signer.getChainId().then((chainId_) => {
                const chainId = chainId_.toString() as keyof typeof networks;
                setChainId(chainId);
            });
            setModalVisibility(false);
        } else {
            setWalletAddress('');
            setChainId(null);
            setModalVisibility(true);
        }
    }, [signer]);

    useEffect(() => {
        connectWallet(wallets.ANY, (provider) => {
            provider && setSigner(provider.getSigner());
        }).then((provider) => {
            provider && setSigner(provider.getSigner());
        });
    }, []);

    return (
        <WalletContext.Provider
            value={{
                walletAddress: walletAddress,
                modalVisibility: modalVisibility,
                chainId: chainId,
                signer: signer,
                setModalVisibility: setModalVisibility,
                updateSigner: (provider: ethers.providers.Web3Provider | null) => {
                    if (provider) {
                        const signer = provider.getSigner();
                        setSigner(signer);
                    } else {
                        setSigner(null);
                    }
                },
            }}
        >
            <Navbar />
            <Component {...pageProps} />
            <WalletModal />
        </WalletContext.Provider>
    );
}

export default MyApp;
