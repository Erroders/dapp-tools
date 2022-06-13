import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import path from 'path';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';
import NftPage, { NftDataProps } from '../components/ui/nftPage';
import tranformNftData from '../utils/nft/tranformNftData';

interface NFTProps {
    data: NftDataProps;
}

const NFT: NextPage<NFTProps> = ({ data }) => {
    if (!data) {
        return (
            <>
                <Navbar walletAddressText="0xb8CD57fA4e11987d1e1CBC4E5fB961b5f55e34cc" />
                <main>Invalid</main>
                <WalletModal />
            </>
        );
    }

    return (
        <>
            <Navbar walletAddressText="0xb8CD57fA4e11987d1e1CBC4E5fB961b5f55e34cc" />
            <main>{/* <NftPage nftData={data} /> */}</main>
            <WalletModal />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { contract, tokenid, chainid } = ctx.query;

    if (
        !contract ||
        !tokenid ||
        !chainid ||
        typeof contract != 'string' ||
        typeof tokenid != 'string' ||
        typeof chainid != 'string'
    ) {
        return {
            props: {
                data: null,
            },
        };
    }

    const apiUrl =
        new URL(
            path.join('v1', chainid, 'tokens', contract, 'nft_metadata', tokenid),
            process.env.NEXT_PUBLIC_COVALENT_BASEURL,
        ).toString() + '/';

    const res = await axios.get(apiUrl, {
        params: {
            key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
        },
    });

    const dataToSend = tranformNftData(res.data.data.items[0]);

    return {
        props: {
            data: dataToSend,
        },
    };
};

export default NFT;
