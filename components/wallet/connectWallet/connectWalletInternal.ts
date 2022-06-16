// https://mirror.xyz/woj.eth/bFdyI5_3f0MoKSRIQ0piYdSOFJWQqbo-r8oTqjSQ9hI
// https://www.npmjs.com/package/web3modal

import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { wallets } from './enums';

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: process.env.NEXT_PUBLIC_WALLET_CONNECT_INFURA_ID, // required
            rpc: {
                137: 'https://rpc-mainnet.maticvigil.com/',
            },
            network: 'matic',
        },
    },
};

// function accountsChanged(accounts: string[]) {
//     console.log(accounts[0]);
// }

// function chainChanged(chainId: number) {
//     console.log(chainId);
// }

// function connect(info: { chainId: number }) {
//     console.log(info);
// }

// function disconnect(error: { code: number; message: string }) {
//     console.log(error);
// }

export interface ConnectWalletCallbackFunctionsProps {
    accountsChanged: (accounts: string[]) => void;
    chainChanged: (chainId: number) => void;
    connect: (info: { chainId: number }) => void;
    disconnect: (error: { code: number; message: string }) => void;
}

async function connectWalletInternal(
    wallet: wallets,
    callbackFunc: ConnectWalletCallbackFunctionsProps,
): Promise<ethers.providers.Web3Provider | null> {
    const web3Modal = new Web3Modal({
        network: 'matic', // optional
        cacheProvider: true, // optional
        providerOptions, // required
    });

    try {
        let connection;
        if (wallet === wallets.ANY) {
            connection = await web3Modal.connect();
        } else {
            connection = await web3Modal.connectTo(wallet);
        }
        const provider = new ethers.providers.Web3Provider(connection);

        connection.on('accountsChanged', callbackFunc.accountsChanged);
        connection.on('chainChanged', callbackFunc.chainChanged);
        connection.on('connect', callbackFunc.connect);
        connection.on('disconnect', callbackFunc.disconnect);

        return provider;
    } catch (error) {
        console.log(error);
    }

    return null;
}

export default connectWalletInternal;
