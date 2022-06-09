import type { NextPage } from 'next';
import connectWallet, { wallets } from '../components/wallet/connectWallet';
import { deployContract } from '../utils/contract_deployer';
import { ERCs } from '../utils/types';
import { getWalletTokenDetails } from '../utils/wallet_token_details';
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
            <h1>Hello world!</h1>
            <button
                onClick={async () => {
                    const provider = await connectWallet(wallets.METAMASK);
                    const contractDetails = await deployContract(erc20Opts, ERCs.ERC20, provider);
                    console.log(contractDetails);

                    const data = await getWalletTokenDetails(provider);
                    console.log(data);
                }}
            >
                Click Me
            </button>
        </>
    );
};

export default Home;
