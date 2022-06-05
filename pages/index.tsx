import type { NextPage } from 'next';
import { useState } from 'react';
import connectMetamask from '../components/wallet/connectMetamask';
import getWalletAddress from '../components/wallet/getWalletAddress';
import switchMetamaskNetwork from '../components/wallet/switchMetamaskNetwork';

const Home: NextPage = () => {
    const [accountAddress, setAccountAddress] = useState('');

    return (
        <>
            <h1>Hello world!</h1>
            <button id="connectMetamaskBtn" className="border-2 p-4" onClick={connectMetamask}>
                Connect Metamask
            </button>

            <br />

            <button
                id="getMetamaskAccountsBtn"
                className="border-2 p-4"
                onClick={() => {
                    getWalletAddress().then((value) => {
                        value && setAccountAddress(value);
                    });
                }}
            >
                Get Metask Account
            </button>

            <h1>{accountAddress}</h1>

            <br />

            <button
                id="switchMetamaskNetworkBtn"
                className="border-2 p-4"
                onClick={() => {
                    switchMetamaskNetwork(139);
                }}
            >
                Switch Network
            </button>
        </>
    );
};

export default Home;
