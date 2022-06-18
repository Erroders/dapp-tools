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
