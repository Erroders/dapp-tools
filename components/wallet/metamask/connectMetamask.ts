import isMetamaskConnected from './isMetamaskConnected';

async function connectMetamask(): Promise<string | null> {
    const { ethereum } = window;

    // Check if Metamask is installed
    if (!isMetamaskConnected()) {
        console.log('MetaMask is not installed!');
        return null;
    }

    // Request a connection to Metamask Extension -> returns connected wallet's public address in a array
    const walletPublicAddress = await ethereum.request({ method: 'eth_requestAccounts' });

    return walletPublicAddress[0];
}

export default connectMetamask;
