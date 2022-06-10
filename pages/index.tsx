import { ethers } from 'ethers';
import type { NextPage } from 'next';
import { createContext, useState } from 'react';
import Homepage from '../components/ui/homepage';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';
import { ERC20Data } from './api/erc20';

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

const Home: NextPage = () => {
    const erc20Opts: ERC20Data = {
        name: 'TestToken',
        symbol: 'TTK',
        burnable: false,
        pausable: false,
        premint: '0',
        mintable: true,
        permit: false,
        accesss: 'ownable',
        info: {
            securityContact: 'abcg@email.com',
            license: 'MIT',
        },
    };

    const [connectWalletModalVisibility, setConnectWalletModalVisibility] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');
    const [web3Provider, setWeb3Provider] = useState<ethers.providers.Web3Provider | null>(null);

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
            <Navbar walletAddressText="0xb8CD57fA4e11987d1e1CBC4E5fB961b5f55e34cc" />
            <main>
                <Homepage />
            </main>
            <WalletModal />
        </WalletContext.Provider>
    );
};

export default Home;
