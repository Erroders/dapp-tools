import isMetamaskConnected from './isMetamaskConnected';

async function switchMetamaskNetwork(chainId: number) {
    const { ethereum } = window;

    const hexChainId = '0x' + chainId.toString(16);

    console.log(hexChainId);

    // Check if Metamask is installed
    if (!isMetamaskConnected()) {
        console.log('MetaMask is not installed!');
        return null;
    }

    try {
        const walletPublicAddress = await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [
                {
                    chainId: hexChainId,
                },
            ],
        });
    } catch (switchError) {
        console.error(switchError);
    }
}

export default switchMetamaskNetwork;
