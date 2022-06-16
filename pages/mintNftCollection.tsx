import type { NextPage } from 'next';
import CollectionMint from '../components/ui/collectionMint';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';

const MintNftCollection: NextPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <CollectionMint />
            </main>
            <WalletModal />
        </>
    );
};

export default MintNftCollection;
