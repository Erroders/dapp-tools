import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import getNftImage from '../../../utils/nft/getNftImage';
import NftCollectionTokenProps from './NftCollectionTokenProps';

interface NFTCardProps extends NftCollectionTokenProps {
    chainId: string;
}

const NftCard = ({ token_id, contract_address, contract_name, logo_url, chainId }: NFTCardProps) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        getNftImage({
            chainId: chainId,
            contractAddress: contract_address,
            tokenId: token_id,
        }).then((value) => {
            setImageUrl(value);
        });
    }, []);

    return (
        <div className="relative block w-72 cursor-pointer">
            <span className="absolute inset-0 border-2 border-black border-dashed"></span>

            <Link href={`/nft?contract=${contract_address}&chainid=${chainId}&tokenid=${token_id}`}>
                <div className="relative flex items-end h-full transition-transform transform bg-white border-2 border-black hover:-translate-x-2 hover:-translate-y-2">
                    <div className="transition-opacity ">
                        <img src={imageUrl} alt={contract_name + ' #' + token_id} />

                        <h4 className="px-2 py-2">
                            <span className="text-sm font-medium">{contract_name}</span>
                            <span> </span>
                            <br />
                            <span className="text-base font-semibold">#{token_id}</span>
                        </h4>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default NftCard;
