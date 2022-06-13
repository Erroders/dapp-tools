import React from 'react';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';
import Profile from '../components/ui/profile';

const profile = () => {
    return (
        <>
            <Navbar />
            <main>
                <Profile />
            </main>
            <WalletModal />
        </>
    );
};

export default profile;
