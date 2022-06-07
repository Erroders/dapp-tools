function isMetamaskConnected(): boolean {
    if (typeof window == 'undefined') {
        return false;
    }

    const { ethereum } = window;

    // Check if Metamask is installed
    if (ethereum && ethereum.isMetaMask) {
        return true;
    }

    return false;
}

export default isMetamaskConnected;
