import type { NextPage } from 'next';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';
import MintMultipleNft from '../components/ui/mintMultipleNft';

const MintNftCollection: NextPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <MintMultipleNft />
            </main>
            <WalletModal />
        </>
    );
};

export default MintNftCollection;
