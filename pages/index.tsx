import type { NextPage } from 'next';
import { deployContract, ERCs } from '../utils/contract_deployer';
import { ERC20Data } from './api/erc20';

const Home: NextPage = () => {
    const erc20Opts: ERC20Data = {
        name: 'TestToken',
        symbol: 'TTK',
    };

    return (
        <>
            <h1>Hello world!</h1>
            <button
                onClick={() => {
                    deployContract(erc20Opts, ERCs.ERC20);
                }}
            >
                Click Me
            </button>
        </>
    );
};

export default Home;
