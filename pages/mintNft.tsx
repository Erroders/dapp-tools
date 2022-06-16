import type { NextPage } from 'next';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';
import MintSingleNft from '../components/ui/mintSingleNft';

const MintNft: NextPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <MintSingleNft />
            </main>
            <WalletModal />
        </>
    );
};

export default MintNft;
