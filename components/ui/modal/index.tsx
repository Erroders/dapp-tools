import { ethers } from 'ethers';
import React, { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { WalletContext } from '../../../pages/_app';
import connectWallet, { wallets } from '../../wallet/connectWallet';
import { ConnectWalletCallbackFunctionsProps } from '../../wallet/connectWallet/connectWalletInternal';
import { Button } from '../generalComponents';

const WalletModal = () => {
    const walletContext = useContext(WalletContext);

    useEffect(() => {
        connectWallet(wallets.ANY, callbackFunctions).then((provider) => {
            updateProvider(provider);
        });
    }, []);

    function closeModal() {
        walletContext.updateConnectWalletModalVisibility(false);
    }

    function updateProvider(provider: ethers.providers.Web3Provider | null) {
        if (provider) {
            walletContext.updateWeb3Provider(provider);

            const signer = provider.getSigner();

            signer.getAddress().then((address) => {
                walletContext.updateWalletAddress(address);
            });

            signer.getChainId().then((chainId) => {
                walletContext.updateChainid(chainId);
            });

            closeModal();
        }
    }

    const callbackFunctions: ConnectWalletCallbackFunctionsProps = {
        accountsChanged(accounts) {
            walletContext.updateWalletAddress(accounts[0]);
        },
        chainChanged(chainId) {
            console.log('chainChanged -> ' + chainId);
            walletContext.updateChainid(parseInt(chainId + '', 16));
        },
        connect(info) {
            console.log('connect');
            console.log(info);
        },
        disconnect(error) {
            console.log('disconnect');
            console.log(error);
        },
    };

    return (
        <div
            className={
                'fixed z-40 pt-24 p-4 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40 shadow-lg' +
                (walletContext.connectWalletModalVisibility ? ' block ' : ' hidden ')
            }
        >
            <div className="p-12 max-w-xl mx-auto bg-white border-2">
                <div className="flex justify-end">
                    <span className="text-4xl cursor-pointer" onClick={closeModal}>
                        &times;
                    </span>
                </div>
                <h2 className="pb-12 pt-4 text-2xl font-bold text-center">Connect With</h2>

                <ul className="grid w-full gap-4">
                    <li className="w-full">
                        <Button
                            title="Metamask"
                            onClick={() => {
                                connectWallet(wallets.METAMASK, callbackFunctions).then((provider) => {
                                    updateProvider(provider);
                                });
                            }}
                        />
                    </li>
                    <li className="w-full">
                        <Button
                            title="Wallet Connect"
                            onClick={() => {
                                connectWallet(wallets.WALLETCONNECT, callbackFunctions).then((provider) => {
                                    updateProvider(provider);
                                });
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
