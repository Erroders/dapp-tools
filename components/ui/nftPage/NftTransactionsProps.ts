export default interface NftTransactionsProps {
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    supports_erc: Array<string>;
    logo_url: string;
    type: string;
    nft_transactions: Array<{
        block_signed_at: string;
        block_height: number;
        tx_hash: string;
        tx_offset: number;
        successful: boolean;
        from_address: string;
        from_address_label: any;
        to_address: string;
        to_address_label?: string;
        value: string;
        value_quote: number;
        gas_offered: number;
        gas_spent: number;
        gas_price: number;
        fees_paid?: string;
        gas_quote: number;
        gas_quote_rate: number;
        log_events: Array<{
            block_signed_at: string;
            block_height: number;
            tx_offset: number;
            log_offset: number;
            tx_hash: string;
            raw_log_topics: Array<string>;
            sender_contract_decimals: any;
            sender_name: any;
            sender_contract_ticker_symbol: any;
            sender_address: string;
            sender_address_label?: string;
            sender_logo_url: any;
            raw_log_data?: string;
            decoded: {
                name: string;
                signature: string;
                params: Array<{
                    name: string;
                    type: string;
                    indexed: boolean;
                    decoded: boolean;
                    value?: string;
                }>;
            };
        }>;
    }>;
}
