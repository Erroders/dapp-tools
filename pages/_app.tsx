import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ethers } from 'ethers';
import { createContext, useState } from 'react';
import networks from '../data/networks.json';

interface WalletContextProps {
    walletAddress: string;
    connectWalletModalVisibility: boolean;
    chainId: keyof typeof networks | null;
    web3Provider: ethers.providers.Web3Provider | null;
    toggleConnectWalletModalVisibility: () => void;
    updateWalletAddress: (walletAddress: string) => void;
    updateChainid: (chainId: keyof typeof networks | null) => void;
    updateConnectWalletModalVisibility: (visibilty: boolean) => void;
    updateWeb3Provider: (provider: ethers.providers.Web3Provider | null) => void;
}

export const WalletContext = createContext<WalletContextProps>({
    web3Provider: null, //# not needed
    walletAddress: '', //# from signer
    chainId: null, //# from signer
    updateWeb3Provider: (provider: ethers.providers.Web3Provider | null) => {}, // !
    updateWalletAddress: (walletAddress: string) => {}, // !
    updateChainid: (chainId: keyof typeof networks | null) => {}, // !
    connectWalletModalVisibility: false, // ?
    toggleConnectWalletModalVisibility: () => {},
    updateConnectWalletModalVisibility: (visibilty: boolean) => {},
});

function MyApp({ Component, pageProps }: AppProps) {
    const [connectWalletModalVisibility, setConnectWalletModalVisibility] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [web3Provider, setWeb3Provider] = useState<ethers.providers.Web3Provider | null>(null);
    const [chainId, setChainId] = useState<keyof typeof networks | null>(null);

    function toggleConnectWalletModalVisibility() {
        setConnectWalletModalVisibility(!connectWalletModalVisibility);
    }

    function updateConnectWalletModalVisibility(visibilty: boolean) {
        setConnectWalletModalVisibility(visibilty);
    }

    function updateChainid(chainId: keyof typeof networks | null) {
        setChainId(chainId);
    }

    function updateWalletAddress(walletAddress: string) {
        setWalletAddress(walletAddress);
    }

    function updateWeb3Provider(provider: ethers.providers.Web3Provider | null) {
        setWeb3Provider(provider);
    }

    return (
        <WalletContext.Provider
            value={{
                walletAddress: walletAddress,
                connectWalletModalVisibility: connectWalletModalVisibility,
                chainId: chainId,
                web3Provider: web3Provider,
                toggleConnectWalletModalVisibility: toggleConnectWalletModalVisibility,
                updateWalletAddress: updateWalletAddress,
                updateChainid: updateChainid,
                updateConnectWalletModalVisibility: updateConnectWalletModalVisibility,
                updateWeb3Provider: updateWeb3Provider,
            }}
        >
            <Component {...pageProps} />
        </WalletContext.Provider>
    );
}

export default MyApp;
