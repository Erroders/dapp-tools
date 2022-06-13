import Image from 'next/image';
import { getIPFSUrl } from '../../../utils/getIPFSUrl';
import CustomNftDataProps from './CustomNftDataProps';
import NftDataProps from './NftDataProps';
import Properties from './Properties';
import PropertiesCard from './PropertiesCard';

interface NftPageProps {
    nftData: NftDataProps;
}

const NftPage = ({ nftData: data }: NftPageProps) => {
    // console.log(JSON.stringify(data));
    console.log('first');
    console.log(data);

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2">
                    <div className="border-2 border-black relative">
                        <img src={'https://ipfs.io/ipfs/QmVDedcUBNGcHZ2NydBp6y5StDPcEYYC7bwzx4EVZKze32'} />
                    </div>
                    {/* <h1 className="py-2">
                        <span className="text-3xl font-medium py-4 tracking-wider">{data.contract_name}</span>
                        <span className="p-4"></span>
                        <span className="text-3xl font-bold py-4 tracking-wider">#{data.nft_data[0].token_id}</span>
                    </h1> */}
                    {/* <h2 className="text-sm">Owned By: {data.nft_data[0].owner}</h2> */}
                    {/* <h2 className="text-sm">Supported ERCs: {data.nft_data[0].supports_erc.map((v) => v + ' ')}</h2> */}

                    <Properties data={data.nft_data[0].external_data.attributes} />
                </div>
                <div className="col-span-3"></div>
            </div>
        </div>
    );
};

export default NftPage;
export type { NftDataProps };
