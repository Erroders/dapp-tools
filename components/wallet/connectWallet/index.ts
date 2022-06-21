// https://mirror.xyz/woj.eth/bFdyI5_3f0MoKSRIQ0piYdSOFJWQqbo-r8oTqjSQ9hI
// https://www.npmjs.com/package/web3modal

import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import UAuthSPA from '@uauth/js';
import type { IUAuthOptions } from '@uauth/web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import * as UAuthWeb3Modal from '../../../utils/wallet/ud-web3modal';
import { wallets } from './enums';

export const uauthOptions: IUAuthOptions = {
    clientID: 'fa0005a1-7200-4d4b-bd7a-9f50662127fd',
    redirectUri: 'https://475a-2405-201-5c0d-709e-8a7-9419-3171-40d3.in.ngrok.io/',
    scope: 'openid wallet',
};

const providerOptions = {
    'custom-uauth': {
        display: UAuthWeb3Modal.display,
        connector: UAuthWeb3Modal.connector,
        package: UAuthSPA,
        options: uauthOptions,
    },
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

    coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
            appName: 'Dapp Tools',
            infuraId: process.env.NEXT_PUBLIC_WALLET_CONNECT_INFURA_ID,
            rpc: {
                137: 'https://rpc-mainnet.maticvigil.com/',
            },
            chainId: 137,
            darkMode: false,
        },
    },
};

async function connectWallet(
    wallet: wallets,
    cb: (provider: ethers.providers.Web3Provider | null) => void,
): Promise<ethers.providers.Web3Provider | null> {
    const web3Modal = new Web3Modal({
        network: 'matic', // optional
        cacheProvider: false, // optional
        providerOptions, // required
    });

    UAuthWeb3Modal.registerWeb3Modal(web3Modal);

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

            // TODO: Call when disconnected

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
