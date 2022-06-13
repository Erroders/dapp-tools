import axios from 'axios';
import { NftDataProps } from '../../components/ui/nftPage';
import CustomNftDataProps from '../../components/ui/nftPage/CustomNftDataProps';
import { getIPFSUrl } from '../getIPFSUrl';

export default async function tranformNftData(data: NftDataProps): Promise<CustomNftDataProps> {
    let nftImage = await getIPFSUrl(data.nft_data[0].token_url);

    nftImage = await axios.get(JSON.parse(nftImage).image);

    let newData: CustomNftDataProps = {
        nft_data: {
            image: nftImage,
        },
    } as CustomNftDataProps;

    console.log('aaaaaaaaaa');
    console.log(newData);

    return newData;
}
