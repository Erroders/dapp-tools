import axios from 'axios';
import { NftDataProps } from '../../components/ui/nftPage';
import CustomNftMetadataProps from '../../components/ui/nftPage/CustomNftMetadataProps';
import { getIPFSUrl } from '../getIPFSUrl';

export default async function tranformNftData(data: NftDataProps): Promise<CustomNftMetadataProps> {
    let nftImage = await getIPFSUrl(data.nft_data[0].token_url);

    nftImage = await axios.get(JSON.parse(nftImage).image);

    let newData: CustomNftMetadataProps = {
        nft_data: {
            image: nftImage,
        },
    } as CustomNftMetadataProps;

    console.log('aaaaaaaaaa');
    console.log(newData);

    return newData;
}
