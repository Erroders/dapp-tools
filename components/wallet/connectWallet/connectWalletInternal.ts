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

async function connectWalletInternal(wallet: wallets): Promise<ethers.providers.Web3Provider | null> {
    const web3Modal = new Web3Modal({
        network: 'matic', // optional
        cacheProvider: true, // optional
        providerOptions, // required
    });

    try {
        const instance = await web3Modal.connectTo(wallet);
        const provider = new ethers.providers.Web3Provider(instance);

        return provider;
    } catch (error) {
        console.log(error);
    }

    return null;
}

export default connectWalletInternal;
