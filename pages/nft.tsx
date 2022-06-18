import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import path from 'path';
import NftPage, { NftDataProps } from '../components/ui/nftPage';
import NftCollectionTokenProps from '../components/ui/nftPage/NftCollectionTokenProps';
import NftTransactionsProps from '../components/ui/nftPage/NftTransactionsProps';

interface NFTProps {
    nftMetadata: NftDataProps;
    nftTransactions: NftTransactionsProps;
    nftCollectionTokens: Array<NftCollectionTokenProps>;
    chainId: string;
}

const NFT: NextPage<NFTProps> = ({ nftMetadata, nftTransactions, nftCollectionTokens, chainId }) => {
    if (!nftMetadata) {
        return <main>Invalid</main>;
    }

    return (
        <main>
            <NftPage
                nftMetadata={nftMetadata}
                nftTransactions={nftTransactions}
                nftCollectionTokens={nftCollectionTokens}
                chainId={chainId}
            />
        </main>
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
    const tokenIdsApiUrl =
        new URL(
            path.join('v1', chainid, 'tokens', contract, 'nft_token_ids'),
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
    const tokenIdsRes = await axios.get(tokenIdsApiUrl, {
        params: {
            'page-number': 0,
            'page-size': 10,
            key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
        },
    });

    // console.log(tokenIdsRes.data.data.items.slice(0, 10));
    // console.log(JSON.stringify(tokenIdsRes.data.data.items[0]));

    return {
        props: {
            nftMetadata: metadataRes.data.data.items[0],
            nftTransactions: transactionsRes.data.data.items[0],
            nftCollectionTokens: tokenIdsRes.data.data.items.slice(0, 10),
            chainId: chainid,
        },
    };
};

export default NFT;
