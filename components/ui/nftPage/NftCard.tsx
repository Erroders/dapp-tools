import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import getNFT from '../../../utils/nft/getNftImage';
import { NFT } from '../../../utils/types';
import NftCollectionTokenProps from './NftCollectionTokenProps';

interface NFTCardProps {
    chainId: string;
    contractAddress: string;
    tokenId: string;
}

const NftCard = (data: NFTCardProps) => {
    const [nft, setNft] = useState<NFT | null>(null);
    const { chainId, contractAddress, tokenId } = data;

    useEffect(() => {
        getNFT({ tokenId, contractAddress, chainId }).then((nft_) => {
            if (nft_) setNft(nft_);
        });
    }, []);

    if (nft) {
        const { token_id, contract_address, contract_name, metadata } = nft;
        return (
            <div className="relative block w-72 cursor-pointer">
                <span className="absolute inset-0 border-2 border-black border-dashed"></span>

                <Link
                    href={`/nft?nft={JSON.stringify(nft)}&contract=${contract_address}&chainid=${chainId}&tokenid=${token_id}`}
                >
                    <div className="flex items-end h-full transition-transform transform bg-white border-2 border-black hover:-translate-x-2 hover:-translate-y-2">
                        <div className="transition-opacity w-full h-[300px]">
                            <h4 className="px-2 py-2">
                                <span className="text-sm font-medium">{contract_name}</span>
                                <span> </span>
                                <br />
                                <span className="text-base font-semibold">#{token_id}</span>
                            </h4>
                            <Image
                                src={metadata.image ? metadata.image : '/logo.svg'}
                                alt={contract_name + ' #' + token_id}
                                // priority={true}
                                layout="fill"
                            />
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
    return <></>;
};

export default NftCard;
