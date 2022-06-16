// https://mirror.xyz/woj.eth/bFdyI5_3f0MoKSRIQ0piYdSOFJWQqbo-r8oTqjSQ9hI
// https://www.npmjs.com/package/web3modal

import { ethers } from 'ethers';
import connectWalletInternal, { ConnectWalletCallbackFunctionsProps } from './connectWalletInternal';
import { wallets } from './enums';

async function connectWallet(
    wallet: wallets,
    callbackFunc: ConnectWalletCallbackFunctionsProps,
): Promise<ethers.providers.Web3Provider | null> {
    const provider = await connectWalletInternal(wallet, callbackFunc);
    return provider;

    // const network = await provider?.getNetwork();

    // if (provider && network?.chainId == process.env.NEXT_PUBLIC_CHAIN_ID) {
    //     return provider;
    // }

    // return null;
}

export default connectWallet;
export { wallets };
