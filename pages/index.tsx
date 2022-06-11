import type { NextPage } from 'next';
import Homepage from '../components/ui/homepage';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';
import { ERC20Data } from './api/erc20';

const Home: NextPage = () => {
    const erc20Opts: ERC20Data = {
        name: 'TestToken',
        symbol: 'TTK',
        burnable: false,
        pausable: false,
        premint: '0',
        mintable: true,
        permit: false,
        accesss: 'ownable',
        info: {
            securityContact: 'abcg@email.com',
            license: 'MIT',
        },
    };

    return (
        <>
            <Navbar walletAddressText="0xb8CD57fA4e11987d1e1CBC4E5fB961b5f55e34cc" />
            <main>
                <Homepage />
            </main>
            <WalletModal />
        </>
    );
};

export default Home;
