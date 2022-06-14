import axios from 'axios';
import path from 'path';
import { NftDataProps } from '../../components/ui/nftPage';

export default async function getNftImage({
    chainId,
    contractAddress,
    tokenId,
}: {
    tokenId: string;
    contractAddress: string;
    chainId: string;
}): Promise<string> {
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

    const nftMetadata: NftDataProps = metadataRes.data.data.items[0];

    return nftMetadata.nft_data[0].external_data.image;
}
