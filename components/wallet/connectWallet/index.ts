// https://mirror.xyz/woj.eth/bFdyI5_3f0MoKSRIQ0piYdSOFJWQqbo-r8oTqjSQ9hI
// https://www.npmjs.com/package/web3modal

import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
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

async function connectWallet(
    wallet: wallets,
    cb: (provider: ethers.providers.Web3Provider | null) => void,
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
        const provider = new ethers.providers.Web3Provider(connection, 'any');

        connection.on('accountsChanged', (accounts: string[]) => {
            console.log('account changed:', accounts[0]);
            if (!accounts[0]) {
                web3Modal.clearCachedProvider();
                cb(null);
            } else {
                cb(provider);
            }
        });
        connection.on('chainChanged', (chainId: number) => {
            console.log('chain changed:', chainId);
            cb(provider);
        });
        connection.on('connect', (info: { chainId: number }) => {
            console.log('connect');
            console.log(info);
            cb(provider);
        });
        connection.on('disconnect', (error: { code: number; message: string }) => {
            console.log('disconnect');
            cb(null);
            if (error) console.error(error);
        });

        return provider;
    } catch (error) {
        console.log(error);
    }
    return null;
}

export default connectWallet;
