/* eslint-disable @next/next/no-img-element */
import { NFT, NFTTransaction } from '../../../utils/types';
import Collection from './Collection';
import Description from './Description';
import Details from './Details';
import NameDetails from './NameDetails';
import NftMetadataProps from './NftMetadataProps';
import Properties from './Properties';
import Transactions from './Transactions';
import Image from 'next/image';

export interface NftPageProps {
    nft: NFT;
    nftTransactions: NFTTransaction[];
    tokenIds: string[];
    chainId: string;
}

const NftPage = ({ nft, nftTransactions, tokenIds, chainId }: NftPageProps) => {
    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2">
                    <div className="border-2 border-black relative">
                        <img
                            src={nft.metadata.image ? nft.metadata.image : '/logo.svg'}
                            alt={nft.contract_name}
                            className="w-full object-cover"
                        />
                    </div>

                    <Description description={nft.metadata.description} />
                    <Properties data={nft.attributes} />
                    {/* TODO: blockchain */}
                    <Details
                        blockchain={'Ethereum'}
                        contractAddress={nft.contract_address}
                        contractTickerSymbol={nft.contract_ticker_symbol}
                        metadata={{ burned: nft.burned }}
                        tokenId={nft.token_id ? nft.token_id : 'unavailable'}
                        tokenStandard={nft.supports_erc!}
                        tokenBalance={nft.token_balance ? nft.token_balance : 'unavailable'}
                    />
                </div>
                <div className="col-span-3">
                    <NameDetails
                        chainId={chainId}
                        contractAddress={nft.contract_address}
                        contractName={nft.contract_name}
                        tokenId={nft.token_id ? nft.token_id : 'unavailable'}
                        owner={nft.owner ? nft.owner : 'unavailable'}
                    />
                    <Transactions data={nftTransactions} />
                    <Collection data={tokenIds} chainId={chainId} contractAddress={nft.contract_address} />
                </div>
            </div>
        </div>
    );
};

export default NftPage;
export type { NftMetadataProps as NftDataProps };
