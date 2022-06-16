import type { NextPage } from 'next';
import MintErc20 from '../components/ui/erc20';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';

const Erc20: NextPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <MintErc20 />
            </main>
            <WalletModal />
        </>
    );
};

export default Erc20;
