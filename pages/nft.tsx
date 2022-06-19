import axios from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import path from 'path';
import NftPage, { NftPageProps } from '../components/ui/nftPage';
import getNFT from '../utils/nft/getNftImage';
import { tokenAsNFT, asNFTTransaction } from '../utils/type_functions';

const NFTPage: NextPage<NftPageProps> = ({ nft, nftTransactions, tokenIds, chainId }) => {
    if (!nft) {
        return <main>Invalid</main>;
    }

    return (
        <main>
            <NftPage nft={nft} nftTransactions={nftTransactions} tokenIds={tokenIds} chainId={chainId} />
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { contract, tokenid, chainid, nft } = ctx.query;
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

    // -------------------------------------------------------------------------------------
    let nftData;
    if (nft && typeof nft == 'string') {
        nftData = JSON.parse(nft);
    } else {
        const metadataApiUrl =
            new URL(
                path.join('v1', chainid, 'tokens', contract, 'nft_metadata', tokenid),
                process.env.NEXT_PUBLIC_COVALENT_BASEURL,
            ).toString() + '/';
        const res = await axios.get(metadataApiUrl, {
            params: {
                key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
            },
        });
        nftData = await tokenAsNFT(res.data.data.items[0]);
    }
    // --------------------------------------------------------------------------------------
    const transactionsApiUrl =
        new URL(
            path.join('v1', chainid, 'tokens', contract, 'nft_transactions', tokenid),
            process.env.NEXT_PUBLIC_COVALENT_BASEURL,
        ).toString() + '/';
    const transactionsRes = await axios.get(transactionsApiUrl, {
        params: {
            key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
        },
    });
    const nftTransactions = [];
    for (const tx of transactionsRes.data.data.items[0].nft_transactions) {
        nftTransactions.push(await asNFTTransaction(tx));
    }
    // --------------------------------------------------------------------------------------
    const tokenIdsApiUrl =
        new URL(
            path.join('v1', chainid, 'tokens', contract, 'nft_token_ids'),
            process.env.NEXT_PUBLIC_COVALENT_BASEURL,
        ).toString() + '/';
    const tokenIdsRes = await axios.get(tokenIdsApiUrl, {
        params: {
            'page-number': 0,
            'page-size': 10,
            key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
        },
    });
    const tokenIds = [];
    for (const token of tokenIdsRes.data.data.items.slice(0, 10)) {
        tokenIds.push(
            token.token_id,
            // await getNFT({ tokenId: token.token_id, contractAddress: token.contract_address, chainId: chainid }),
        );
    }
    // --------------------------------------------------------------------------------------
    return {
        props: {
            nft: nftData,
            nftTransactions: nftTransactions,
            tokenIds: tokenIds,
            chainId: chainid,
        },
    };
};

export default NFTPage;
