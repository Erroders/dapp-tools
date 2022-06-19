import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { WalletContext } from '../../../pages/_app';
import connectWallet from '../../wallet/connectWallet';
import { wallets } from '../../wallet/connectWallet/enums';

interface NavbarProps {
    title?: string;
    walletAddressText?: string;
}

const Navbar = ({}: NavbarProps) => {
    const { signer, walletAddress, setModalVisibility, updateSigner } = useContext(WalletContext);
    const [networkName, setNetworkName] = useState('Not Connected');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (signer) {
            signer.provider?.getNetwork().then((v) => {
                setNetworkName(v.name);
            });
        } else {
            setNetworkName('Not Connected');
        }
    }, [signer]);

    const handleWalletBtnClick = () => {
        if (signer) {
            setDropdownOpen(!dropdownOpen);
        } else {
            // setModalVisibility(true);
            connectWallet(wallets.ANY, updateSigner).then((provider) => {
                updateSigner(provider);
            });
        }
    };

    return (
        <nav className="sticky top-0 w-full bg-white z-30 py-5 backdrop-blur-md bg-white/60">
            <div className="max-w-screen-xl p-4 mx-auto">
                <div className="flex items-center justify-between space-x-4 lg:space-x-10">
                    <div className="flex lg:w-0 lg:flex-1 text-xl font-medium cursor-pointer">
                        <Link href={'/'} passHref>
                            <a
                                onClick={() => {
                                    setDropdownOpen(false);
                                }}
                            >
                                <Image src={'/logo.svg'} width="100" height="60" layout="fixed" alt="dapp tools logo" />
                            </a>
                        </Link>
                    </div>

                    <div className="items-center justify-end flex space-x-4">
                        <div className="relative block group">
                            <button className="relative p-2 text-xs cursor-default flex items-end h-full transition-transform transform bg-white border-2 border-black">
                                {networkName || 'Not Connected'}
                            </button>
                        </div>

                        <div className="relative block group">
                            <span className="absolute inset-0 border-2 border-black border-dashed"></span>
                            <button
                                className={`relative p-2 text-xs flex items-end h-full transition-transform transform bg-white border-2 border-black group-hover:-translate-x-2 group-hover:-translate-y-2 ${
                                    dropdownOpen && '-translate-x-1.5 -translate-y-1.5'
                                }`}
                                onClick={handleWalletBtnClick}
                            >
                                {walletAddress || 'Connect Wallet'}
                            </button>

                            {dropdownOpen && (
                                <div className="h-auto w-full absolute bg-white mt-2">
                                    {/* <span className="absolute inset-0 border-2 border-black border-dashed"></span> */}
                                    {/* <ul className="text-right px-3 py-1.5 bg-white border-2 border-black group-hover:-translate-x-1 group-hover:-translate-y-1"> */}
                                    <ul className="text-right px-3 py-1.5 bg-white border-2 border-black">
                                        <Link href={'/profile'}>
                                            <li
                                                className="hover:font-semibold cursor-pointer"
                                                onClick={() => {
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                Profile
                                            </li>
                                        </Link>
                                        <li
                                            className="hover:font-semibold cursor-pointer"
                                            onClick={() => {
                                                updateSigner(null);
                                                setDropdownOpen(false);
                                                // TODO: Call disconnect
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
        </nav>
    );
};

export default Navbar;
