import type { NextPage } from 'next';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';

const MintNft: NextPage = () => {
    return (
        <>
            <Navbar />
            <main>NFT Mint</main>
            <WalletModal />
        </>
    );
};

export default MintNft;
