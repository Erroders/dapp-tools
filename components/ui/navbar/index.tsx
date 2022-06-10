import React from 'react';

interface NavbarProps {
    title?: string;
    walletAddressText?: string;
}

const Navbar = ({ title = 'Dapp Tools', walletAddressText = 'Connect Wallet' }: NavbarProps) => {
    return (
        <header className="shadow-md sticky top-0 w-full bg-white">
            <div className="max-w-screen-xl p-4 mx-auto">
                <div className="flex items-center justify-between space-x-4 lg:space-x-10">
                    <div className="flex lg:w-0 lg:flex-1 text-lg font-medium">{title}</div>

                    <div className="items-center justify-end flex space-x-4">
                        <button className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg">
                            {walletAddressText}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
