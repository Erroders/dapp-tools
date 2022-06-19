import axios from 'axios';
import path from 'path';
import { getIPFSUrl } from '../getIPFSUrl';
import { NFT } from '../types';
import { tokenAsNFT } from '../type_functions';

export default async function getNFT({
    chainId,
    contractAddress,
    tokenId,
}: {
    tokenId: string;
    contractAddress: string;
    chainId: string;
}): Promise<NFT | null> {
    let imageLink: string | void = '';
    const metadataApiUrl =
        new URL(
            path.join('v1', chainId, 'tokens', contractAddress, 'nft_metadata', tokenId),
            process.env.NEXT_PUBLIC_COVALENT_BASEURL,
        ).toString() + '/';

    const metadataRes = await axios.get(metadataApiUrl, {
        params: {
            key: process.env.NEXT_PUBLIC_COVALENT_API_KEY,
        },
    });
    const nft = await tokenAsNFT(metadataRes.data.data.items[0]);
    // if (nft.nft_data[0].token_url) {
    //     const tempLink = await getIPFSImageURl(nft.nft_data[0].token_url);
    //     tempLink && tempLink.length > 0 && (imageLink = tempLink);
    // }
    // return imageLink;
    return nft;
}

// function that returns IPFS url
export async function getIPFSImageURl(tokenURL: string): Promise<string | void> {
    let imageLink = '';
    const tokenIPFSlink = await getIPFSUrl(tokenURL);
    const tokenIPFSresponse = await fetch(tokenIPFSlink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });
    const tokenIPFSdata = await tokenIPFSresponse.json();
    if (tokenIPFSdata && tokenIPFSdata.image) {
        imageLink = await getIPFSUrl(tokenIPFSdata.image);
    }
    return imageLink;
}
