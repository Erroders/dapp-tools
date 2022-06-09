// enum for ERC tokens
export enum ERCs {
    ERC20 = 'erc20',
    ERC721 = 'erc721',
    ERC1155 = 'erc1155',
}

// type for compiled contract
export type compiledContract = {
    contract: string;
    abi: any;
    bytecode: any;
};

// different chains details
// source : https://docs.polygon.technology/docs/develop/network-details/network/
export const chainDetails = {
    chains: [
        {
            networkName: 'Mumbai',
            chainId: 80001,
            tokenName: 'MATIC',
            rpcURL: 'https://matic-mumbai.chainstacklabs.com/',
            blockExplorerURL: 'https://mumbai.polygonscan.com/',
        },
        {
            networkName: 'Polygon',
            chainId: 137,
            tokenName: 'MATIC',
            rpcURL: 'https://rpc-mainnet.maticvigil.com/',
            blockExplorerURL: 'https://polygonscan.com/',
        },
    ],
};
