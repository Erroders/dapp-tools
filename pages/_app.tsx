import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ethers } from 'ethers';
import { createContext, useEffect, useState } from 'react';

interface WalletContextProps {
    walletAddress: string;
    connectWalletModalVisibility: boolean;
    web3Provider: ethers.providers.Web3Provider | null;
    toggleConnectWalletModalVisibility: () => void;
    updateWalletAddress: (walletAddress: string) => void;
    updateConnectWalletModalVisibility: (visibilty: boolean) => void;
    updateWeb3Provider: (provider: ethers.providers.Web3Provider) => void;
}

export const WalletContext = createContext<WalletContextProps>({
    walletAddress: '',
    connectWalletModalVisibility: false,
    web3Provider: null,
    toggleConnectWalletModalVisibility: () => {},
    updateWalletAddress: (walletAddress: string) => {},
    updateConnectWalletModalVisibility: (visibilty: boolean) => {},
    updateWeb3Provider: (provider: ethers.providers.Web3Provider) => {},
});

function MyApp({ Component, pageProps }: AppProps) {
    const [connectWalletModalVisibility, setConnectWalletModalVisibility] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [web3Provider, setWeb3Provider] = useState<ethers.providers.Web3Provider | null>(null);

    // useEffect(() => {
    //     console.log(web3Provider);
    // }, [walletAddress]);

    function toggleConnectWalletModalVisibility() {
        setConnectWalletModalVisibility(!connectWalletModalVisibility);
    }

    function updateConnectWalletModalVisibility(visibilty: boolean) {
        setConnectWalletModalVisibility(visibilty);
    }

    function updateWalletAddress(walletAddress: string) {
        setWalletAddress(walletAddress);
    }

    function updateWeb3Provider(provider: ethers.providers.Web3Provider) {
        setWeb3Provider(provider);
    }

    return (
        <WalletContext.Provider
            value={{
                walletAddress: walletAddress,
                connectWalletModalVisibility: connectWalletModalVisibility,
                web3Provider: web3Provider,
                toggleConnectWalletModalVisibility: toggleConnectWalletModalVisibility,
                updateWalletAddress: updateWalletAddress,
                updateConnectWalletModalVisibility: updateConnectWalletModalVisibility,
                updateWeb3Provider: updateWeb3Provider,
            }}
        >
            <Component {...pageProps} />
        </WalletContext.Provider>
    );
}

export default MyApp;
