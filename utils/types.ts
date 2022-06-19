// enum for ERC tokens
export enum ERCs {
    ERC20 = 'erc20',
    ERC721 = 'erc721',
    ERC1155 = 'erc1155',
    SingleNFT = 'single-nft',
    NFTCollection = 'nft-collection',
    // ERC20x = 'erc20x',
}

// type for compiled contract
export type compiledContract = {
    abi: any;
    bytecode: any;
    contract: string;
    metadata: any;
};

// different chains details
// source : https://docs.polygon.technology/docs/develop/network-details/network/
export type Network = {
    network: string;
    networkName: string;
    tokenName: string;
    rpcURL: string;
    blockExplorerURL: string;
    factory?: string;
};

export enum ERCStandards {
    ERC20 = 'erc20',
    ERC721 = 'erc721',
    ERC1155 = 'erc1155',
    ERC777 = 'erc777',
}

export type Attribute = {
    trait_type: string;
    value: string;
};

export type external_data = {
    animation_url: string | null;
    attributes: Attribute[] | null;
    description: string | null;
    external_url: string | null;
    image: string | null;
    image_256: string | null;
    image_512: string | null;
    image_1024: string | null;
    name: string | null;
    owner: string | null;
};

export type nft_data = {
    token_id: string | null; //'18772'
    token_balance: string | null; //'1'
    token_url: string | null;
    supports_erc: ERCStandards[] | null;
    token_price_wei: string | null;
    token_quote_rate_eth: number | null;
    original_owner: string | null; //'0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de';
    external_data: external_data | null;
    owner: string | null; //'0xfc43f5f9dd45258b3aff31bdbe6561d97e8b71de'
    owner_address: string | null;
    burned: boolean | null;
};

export type token = {
    contract_decimals: number; //18
    contract_name: string; //'Ether'
    contract_ticker_symbol: string; //'ETH'
    contract_address: string; //'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    supports_erc: ERCStandards[] | null; // ['erc20']
    logo_url: string | null; //'https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png';
    last_transferred_at: string | null;
    type: 'cryptocurrency' | 'nft' | 'dust' | 'stablecoin' | null;
    balance: string | null; //'2543660422529725';
    balance_24h: string | null; //'2543660422529725';
    quote_rate: number | null; // 993.6847;
    quote_rate_24h: number | null; // 1086.517;
    quote: number | null; //  2.5275965;
    quote_24h: number | null; //  2.7637303;
    nft_data: nft_data[] | null;
};

export type NFTMetadata = {
    name: string | null;
    description: string | null;
    external_url: string | null;
    image: string | null;
};

export type NFT = {
    attributes: Attribute[] | null;
    burned: boolean | null;
    contract_address: string;
    contract_name: string;
    contract_ticker_symbol: string;
    supports_erc: ERCStandards[] | null;
    metadata_url: string | null;
    metadata: NFTMetadata;
    original_owner: string | null;
    owner: string | null;
    token_id: string | null;
    token_balance: string | null;
    token_price_wei: string | null;
};

export type CryptoCurrency = {
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    supports_erc: ERCStandards[] | null;
    logo_url: string;
    balance: string | null;
};

export type NFTTransaction = {
    block_signed_at: string;
    tx_hash: string;
    from_address: string;
    from_address_label: string | null;
    to_address: string;
    to_address_label: string | null;
    value: string;
};
