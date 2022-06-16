import type { NextPage } from 'next';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';
import MintErc721 from '../components/ui/mintErc721';

const Erc721: NextPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <MintErc721 />
            </main>
            <WalletModal />
        </>
    );
};

export default Erc721;
