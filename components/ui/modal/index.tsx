import { ethers } from 'ethers';
import React, { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { WalletContext } from '../../../pages/_app';
import connectWallet from '../../wallet/connectWallet';
import { wallets } from '../../wallet/connectWallet/enums';
import { Button } from '../generalComponents';

const WalletModal = () => {
    const { updateSigner, modalVisibility, setModalVisibility } = useContext(WalletContext);

    const connect = (wallet: wallets) => {
        connectWallet(wallet, updateSigner).then((provider) => {
            updateSigner(provider);
        });
    };

    return (
        <div
            className={
                'fixed z-40 pt-24 p-4 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40 shadow-lg' +
                (modalVisibility ? ' block ' : ' hidden ')
            }
        >
            <div className="p-12 max-w-xl mx-auto bg-white border-2">
                <div className="flex justify-end">
                    <span
                        className="text-4xl cursor-pointer"
                        onClick={() => {
                            setModalVisibility(false);
                        }}
                    >
                        &times;
                    </span>
                </div>
                <h2 className="pb-12 pt-4 text-2xl font-bold text-center">Connect With</h2>

                <ul className="grid w-full gap-4">
                    <li className="w-full">
                        <Button
                            title="Metamask"
                            onClick={() => {
                                connect(wallets.METAMASK);
                            }}
                        />
                    </li>
                    <li className="w-full">
                        <Button
                            title="Wallet Connect"
                            onClick={() => {
                                connect(wallets.WALLETCONNECT);
                            }}
                        />
                    </li>
                    <li className="w-full">
                        <Button title="Unstopabble Domain" />
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default WalletModal;
