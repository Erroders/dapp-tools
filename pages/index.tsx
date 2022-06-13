import type { NextPage } from 'next';
import Homepage from '../components/ui/homepage';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';

const Home: NextPage = () => {
    return (
        <>
            <Navbar />
            <main>
                <Homepage />
            </main>
            <WalletModal />
        </>
    );
};

export default Home;
