import React, { useContext } from 'react';
import { WalletContext } from '../../../pages/_app';

interface NavbarProps {
    title?: string;
    walletAddressText?: string;
}

const Navbar = ({ title = 'Dapp Tools', walletAddressText = 'Connect Wallet' }: NavbarProps) => {
    const walletContext = useContext(WalletContext);

    return (
        <header className="shadow-md sticky top-0 w-full bg-white z-30">
            <div className="max-w-screen-xl p-4 mx-auto">
                <div className="flex items-center justify-between space-x-4 lg:space-x-10">
                    <div className="flex lg:w-0 lg:flex-1 text-xl font-medium">{title}</div>

                    <div className="items-center justify-end flex space-x-4">
                        <div className="relative block group">
                            {/* <button className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg">
                                <span className="absolute inset-0 border-2 border-black border-dashed"></span>
                                {walletAddressText}
                            </button> */}

                            <span className="absolute inset-0 border-2 border-black border-dashed"></span>
                            <button
                                className="relative p-2 text-xs flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2"
                                // onClick={() => {
                                //     walletContext.updateConnectWalletModalVisibility(true);
                                // }}
                            >
                                {walletContext.chainId || 'Not Connected'}
                            </button>
                        </div>

                        <div className="relative block group">
                            {/* <button className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg">
                                <span className="absolute inset-0 border-2 border-black border-dashed"></span>
                                {walletAddressText}
                            </button> */}

                            <span className="absolute inset-0 border-2 border-black border-dashed"></span>
                            <button
                                className="relative p-2 text-xs flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2"
                                onClick={() => {
                                    walletContext.updateConnectWalletModalVisibility(true);
                                }}
                            >
                                {walletContext.walletAddress || 'Connect Wallet'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
