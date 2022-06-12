// https://mirror.xyz/woj.eth/bFdyI5_3f0MoKSRIQ0piYdSOFJWQqbo-r8oTqjSQ9hI
// https://www.npmjs.com/package/web3modal

import { ethers } from 'ethers';
import connectWalletInternal, { ConnectWalletCallbackFunctionsProps } from './connectWalletInternal';
import { wallets, networks } from './enums';

async function connectWallet(
    wallet: wallets,
    callbackFunc: ConnectWalletCallbackFunctionsProps,
): Promise<ethers.providers.Web3Provider | null> {
    const provider = await connectWalletInternal(wallet, callbackFunc);

    const network = await provider?.getNetwork();

    if (provider && network?.chainId == process.env.NEXT_PUBLIC_CHAIN_ID) {
        return provider;
    }

    // TODO: Show a Modal to connect to correct network

    return null;
}

export default connectWallet;
export { wallets, networks };
