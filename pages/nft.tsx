import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import path from 'path';
import WalletModal from '../components/ui/modal';
import Navbar from '../components/ui/navbar';
import NftPage, { NftDataProps } from '../components/ui/nftPage';
import NftTransactionsProps from '../components/ui/nftPage/NftTransactionsProps';

interface NFTProps {
    nftMetadata: NftDataProps;
    nftTransactions: NftTransactionsProps;
}

const NFT: NextPage<NFTProps> = ({ nftMetadata, nftTransactions }) => {
    if (!nftMetadata) {
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
            <main>
                <NftPage nftMetadata={nftMetadata} nftTransactions={nftTransactions} />
            </main>
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

    const metadataApiUrl =
        new URL(
            path.join('v1', chainid, 'tokens', contract, 'nft_metadata', tokenid),
            process.env.NEXT_PUBLIC_COVALENT_BASEURL,
        ).toString() + '/';
    const transactionsApiUrl =
        new URL(
            path.join('v1', chainid, 'tokens', contract, 'nft_transactions', tokenid),
            process.env.NEXT_PUBLIC_COVALENT_BASEURL,
        ).toString() + '/';

    const metadataRes = await axios.get(metadataApiUrl, {
        params: {
            key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
        },
    });
    const transactionsRes = await axios.get(transactionsApiUrl, {
        params: {
            key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
        },
    });

    return {
        props: {
            nftMetadata: metadataRes.data.data.items[0],
            nftTransactions: transactionsRes.data.data.items[0],
        },
    };
};

export default NFT;
