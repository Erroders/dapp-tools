import { ethers } from 'ethers';
import { ERC1155Data } from '../pages/api/erc1155';
import { ERC20Data } from '../pages/api/erc20';
import { ERC721Data } from '../pages/api/erc721';

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

// requires only option and token kind (ERC20/721/1155)
// returns compiled contract ABI, BYTECODE and contract itself
async function compileContract(
    opts: ERC20Data | ERC721Data | ERC1155Data,
    kind: ERCs,
): Promise<compiledContract | void> {
    const res = await fetch(`/api/${kind}`, {
        method: 'POST',
        body: JSON.stringify(opts),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();
    return data;
}

// requires only option and token kind (ERC20/721/1155)
// returns deployed contract address
export async function deployContract(opts: ERC20Data | ERC721Data | ERC1155Data, kind: ERCs): Promise<string | void> {
    // Deploy the contract to Ethereum test network - Ropsten
    const provider = new ethers.providers.InfuraProvider('maticmum');

    // Use your wallet's private key to deploy the contract
    const privateKey = '';
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(wallet);

    const data = await compileContract(opts, kind);
    console.log(data);

    // Set gas limit and gas price, using the default Ropsten provider
    const price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei');
    const options = { gasPrice: ethers.utils.parseUnits(price, 'gwei') };

    // // Deploy the contract
    if (data) {
        const factory = new ethers.ContractFactory(data.abi, data.bytecode.object, wallet);
        const contract = await factory.deploy(options);
        await contract.deployTransaction.wait();
        console.log(`Deployment successful! Contract Address: ${contract.address}`);

        return contract.address;
    }
}
