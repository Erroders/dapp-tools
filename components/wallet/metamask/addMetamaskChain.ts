import isMetamaskConnected from './isMetamaskConnected';

interface AddEthereumChainParameter {
    chainId: number;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[];
}

async function addMetamaskChain({
    chainId,
    chainName,
    rpcUrls,
    blockExplorerUrls,
    iconUrls,
}: AddEthereumChainParameter) {
    const { ethereum } = window;

    if (!isMetamaskConnected()) {
        console.log('MetaMask is not installed!');
        return null;
    }

    const hexChainId = '0x' + chainId.toString(16);
    try {
        await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: hexChainId,
                    chainName: chainName,
                    rpcUrls: rpcUrls,
                },
            ],
        });
    } catch (addError) {
        console.error(addError);
    }
}

export default addMetamaskChain;
