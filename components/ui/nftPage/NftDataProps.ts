export default interface NftDataProps {
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    supports_erc: Array<string>;
    logo_url: string;
    type: string;
    nft_data: Array<{
        token_id: string;
        token_balance: string;
        token_url: string;
        supports_erc: Array<string>;
        token_price_wei: any;
        token_quote_rate_eth: any;
        original_owner: string;
        external_data: {
            name: any;
            description: any;
            image: string;
            image_256: string;
            image_512: string;
            image_1024: string;
            animation_url: any;
            external_url: any;
            attributes: Array<{
                trait_type: string;
                value: string;
            }>;
            owner: any;
        };
        owner: string;
        owner_address: string;
        burned: boolean;
    }>;
}
