import type { NextPage } from 'next';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';
import SingleMint from '../components/ui/singleMint';

const MintNft: NextPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <SingleMint />
            </main>
            <WalletModal />
        </>
    );
};

export default MintNft;
