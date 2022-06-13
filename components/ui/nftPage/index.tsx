import Description from './Description';
import Details from './Details';
import NameDetails from './NameDetails';
import NftMetadataProps from './NftMetadataProps';
import NftTransactionsProps from './NftTransactionsProps';
import Properties from './Properties';

interface NftPageProps {
    nftMetadata: NftMetadataProps;
    nftTransactions: NftTransactionsProps;
}

const NftPage = ({ nftMetadata, nftTransactions }: NftPageProps) => {
    // console.log(data);

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2">
                    <div className="border-2 border-black relative">
                        <img src={'https://ipfs.io/ipfs/QmVDedcUBNGcHZ2NydBp6y5StDPcEYYC7bwzx4EVZKze32'} />
                    </div>

                    <Description description={nftMetadata.nft_data[0].external_data.description} />
                    <Properties data={nftMetadata.nft_data[0].external_data.attributes} />
                    <Details
                        blockchain={'Ethereum'}
                        contractAddress={nftMetadata.contract_address}
                        contractTickerSymbol={nftMetadata.contract_ticker_symbol}
                        metadata={{ burned: nftMetadata.nft_data[0].burned }}
                        tokenId={nftMetadata.nft_data[0].token_id}
                        tokenStandard={nftMetadata.nft_data[0].supports_erc}
                        tokenBalance={nftMetadata.nft_data[0].token_balance}
                    />
                </div>
                <div className="col-span-3">
                    <NameDetails
                        contractName={nftMetadata.contract_name}
                        tokenId={nftMetadata.nft_data[0].token_id}
                        owner={nftMetadata.nft_data[0].owner}
                    />
                </div>
            </div>
        </div>
    );
};

export default NftPage;
export type { NftMetadataProps as NftDataProps };