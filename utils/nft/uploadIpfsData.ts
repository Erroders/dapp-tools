import { NFTStorage } from 'nft.storage';

export default async function uploadIpfsData(data: any) {
    const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY + '' });
    let metadata = null;
    try {
        metadata = await client.store(data);
    } catch (e) {
        console.log(e);
    }
    return metadata;
}
