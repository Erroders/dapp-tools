import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../../pages/_app';

interface NavbarProps {
    title?: string;
    walletAddressText?: string;
}

const Navbar = ({ title = 'Dapp Tools' }: NavbarProps) => {
    const walletContext = useContext(WalletContext);
    const [networkName, setNetworkName] = useState('Not Connected');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        walletContext.web3Provider?.getNetwork().then((v) => {
            setNetworkName(v.name);
        });
    }, [walletContext.web3Provider]);

    const handleWalletBtnClick = () => {
        if (walletContext.web3Provider) {
            setDropdownOpen(!dropdownOpen);
        } else {
            walletContext.updateConnectWalletModalVisibility(true);
        }
    };

    return (
        <header className="shadow-md sticky top-0 w-full bg-white z-30">
            <div className="max-w-screen-xl p-4 mx-auto">
                <div className="flex items-center justify-between space-x-4 lg:space-x-10">
                    <div className="flex lg:w-0 lg:flex-1 text-xl font-medium">{title}</div>

                    <div className="items-center justify-end flex space-x-4">
                        <div className="relative block group">
                            <span className="absolute inset-0 border-2 border-black border-dashed"></span>
                            <button className="relative p-2 text-xs cursor-default flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-1 group-hover:-translate-y-1">
                                {networkName || 'Not Connected'}
                            </button>
                        </div>

                        <div className="relative block group">
                            <span className="absolute inset-0 border-2 border-black border-dashed"></span>
                            <button
                                className="relative p-2 text-xs flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
                                onClick={handleWalletBtnClick}
                            >
                                {walletContext.walletAddress || 'Connect Wallet'}
                            </button>

                            {dropdownOpen && (
                                <div className="h-auto w-full absolute bg-white mt-1.5">
                                    <span className="absolute inset-0 border-2 border-black border-dashed"></span>
                                    <ul className="text-right px-3 py-1.5 bg-white border-2 border-black group-hover:-translate-x-1 group-hover:-translate-y-1">
                                        <li className="hover:font-semibold cursor-pointer">
                                            <Link href={'/profile'}>Profile</Link>
                                        </li>
                                        <li
                                            className="hover:font-semibold cursor-pointer"
                                            onClick={() => {
                                                walletContext.updateWalletAddress('');
                                                walletContext.updateChainid(0);
                                                walletContext.updateWeb3Provider(null);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            Disconnect
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
