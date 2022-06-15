import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ethers } from 'ethers';
import { createContext, useState } from 'react';

interface WalletContextProps {
    walletAddress: string;
    connectWalletModalVisibility: boolean;
    chainId: number;
    web3Provider: ethers.providers.Web3Provider | null;
    toggleConnectWalletModalVisibility: () => void;
    updateWalletAddress: (walletAddress: string) => void;
    updateChainid: (chainId: number) => void;
    updateConnectWalletModalVisibility: (visibilty: boolean) => void;
    updateWeb3Provider: (provider: ethers.providers.Web3Provider | null) => void;
}

export const WalletContext = createContext<WalletContextProps>({
    walletAddress: '',
    connectWalletModalVisibility: false,
    chainId: 0x0,
    web3Provider: null,
    toggleConnectWalletModalVisibility: () => {},
    updateWalletAddress: (walletAddress: string) => {},
    updateChainid: (chainId: number) => {},
    updateConnectWalletModalVisibility: (visibilty: boolean) => {},
    updateWeb3Provider: (provider: ethers.providers.Web3Provider | null) => {},
});

function MyApp({ Component, pageProps }: AppProps) {
    const [connectWalletModalVisibility, setConnectWalletModalVisibility] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [web3Provider, setWeb3Provider] = useState<ethers.providers.Web3Provider | null>(null);
    const [chainId, setChainId] = useState<number>(0x0);

    function toggleConnectWalletModalVisibility() {
        setConnectWalletModalVisibility(!connectWalletModalVisibility);
    }

    function updateConnectWalletModalVisibility(visibilty: boolean) {
        setConnectWalletModalVisibility(visibilty);
    }

    function updateChainid(chainId: number) {
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
