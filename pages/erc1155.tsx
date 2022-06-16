import type { NextPage } from 'next';
import MintErc1155 from '../components/ui/mintErc1155';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';

const Erc1155: NextPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <MintErc1155 />
            </main>
            <WalletModal />
        </>
    );
};

export default Erc1155;
