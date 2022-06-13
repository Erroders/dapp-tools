import Image from 'next/image';
import getNftImage from '../../../utils/nft/getNftImage';
import NftDataProps from './NftDataProps';

interface NftPageProps {
    nftData: NftDataProps;
}

const NftPage = async ({ nftData: data }: NftPageProps) => {
    console.log(JSON.stringify(data));

    const imageUrl = await getNftImage(data.nft_data[0].token_url);

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2">
                    <Image src={imageUrl} />
                </div>
                <div className="col-span-3">bb</div>
            </div>
        </div>
    );
};

export default NftPage;
export type { NftDataProps };
