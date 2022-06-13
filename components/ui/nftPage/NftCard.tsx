import React from 'react';
import NftCollectionTokenProps from './NftCollectionTokenProps';

const NftCard = ({ token_id, contract_address, contract_name, logo_url }: NftCollectionTokenProps) => {
    console.log(logo_url);

    return (
        <div className="relative block w-72">
            <span className="absolute inset-0 border-2 border-black border-dashed"></span>

            <div className="relative flex items-end h-full transition-transform transform bg-white border-2 border-black hover:-translate-x-2 hover:-translate-y-2">
                <div className="transition-opacity ">
                    {/* TODO: covalent logo url :angry_face */}
                    {/* <img src={logo_url} alt="" /> */}

                    <img src={'https://ipfs.io/ipfs/QmVDedcUBNGcHZ2NydBp6y5StDPcEYYC7bwzx4EVZKze32'} />

                    <h4 className="px-2 py-2">
                        <span className="text-sm font-medium">{contract_name}</span>
                        <span> </span>
                        <br />
                        <span className="text-base font-semibold">#{token_id}</span>
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default NftCard;
