import type { NextPage } from 'next';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';

const MintNft: NextPage = () => {
    return (
        <>
            <Navbar walletAddressText="0xb8CD57fA4e11987d1e1CBC4E5fB961b5f55e34cc" />
            <main>NFT Mint</main>
            <WalletModal />
        </>
    );
};

export default MintNft;
