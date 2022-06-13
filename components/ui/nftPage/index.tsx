import Description from './Description';
import Details from './Details';
import NameDetails from './NameDetails';
import NftDataProps from './NftDataProps';
import Properties from './Properties';

interface NftPageProps {
    nftData: NftDataProps;
}

const NftPage = ({ nftData: data }: NftPageProps) => {
    console.log(data);

    return (
        <div className="p-6 max-w-screen-xl mx-auto">
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2">
                    <div className="border-2 border-black relative">
                        <img src={'https://ipfs.io/ipfs/QmVDedcUBNGcHZ2NydBp6y5StDPcEYYC7bwzx4EVZKze32'} />
                    </div>

                    <Description description={data.nft_data[0].external_data.description} />
                    <Properties data={data.nft_data[0].external_data.attributes} />
                    <Details
                        blockchain={'Ethereum'}
                        contractAddress={data.contract_address}
                        contractTickerSymbol={data.contract_ticker_symbol}
                        metadata={{ burned: data.nft_data[0].burned }}
                        tokenId={data.nft_data[0].token_id}
                        tokenStandard={data.nft_data[0].supports_erc}
                        tokenBalance={data.nft_data[0].token_balance}
                    />
                </div>
                <div className="col-span-3">
                    <NameDetails
                        contractName={data.contract_name}
                        tokenId={data.nft_data[0].token_id}
                        owner={data.nft_data[0].owner}
                    />
                </div>
            </div>
        </div>
    );
};

export default NftPage;
export type { NftDataProps };
