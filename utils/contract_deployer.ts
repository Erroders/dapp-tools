import { ethers } from 'ethers';
import { ERC1155Data } from '../pages/api/erc1155';
import { ERC20Data } from '../pages/api/erc20';
import { ERC721Data } from '../pages/api/erc721';
import { NFTCollectionData } from './nft_collection';
import { SingleNFTData } from './single_nft';
import { compiledContract, ERCs } from './types';
import networks from '../data/networks.json';

// requires only option and token kind (ERC20/721/1155)
// returns compiled contract ABI, BYTECODE and contract itself
// source
// - https://www.topcoder.com/thrive/articles/api-routes-for-next-js?utm_source=thrive&utm_campaign=thrive-feed&utm_medium=rss-feed
// - https://www.delftstack.com/howto/javascript/javascript-fetch-post/#:~:text=We%20can't%20directly%20send,stringify()%20method.
async function compileContract(
    opts: ERC20Data | ERC721Data | ERC1155Data | SingleNFTData | NFTCollectionData,
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
// source
// - https://cutt.ly/3JGawEa
// - https://docs.ethers.io/v5/api/contract/contract-factory/
export async function deployContract(
    opts: ERC20Data | ERC721Data | ERC1155Data | SingleNFTData | NFTCollectionData,
    kind: ERCs,
    provider: ethers.providers.Web3Provider | null,
    chainId: keyof typeof networks,
): Promise<{ contractAddress: string; confirmationLink: string } | void> {
    // will compile the contract and return the abi and bytecode
    const data = await compileContract(opts, kind);

    if (provider && data && chainId) {
        // get the signer object from the provider
        const signer = provider.getSigner();
        const networkExplorerLink = networks[chainId];

        // Set gas limit and gas price, using the provider
        const price = ethers.utils.formatUnits(await signer.getGasPrice(), 'gwei');
        const options = { gasPrice: ethers.utils.parseUnits(price, 'gwei') };

        // Deploy the contract
        const factory = new ethers.ContractFactory(data.abi, data.bytecode.object, signer);
        const contract = await factory.deploy(options);

        // get transaction details
        const receipt = await contract.deployTransaction.wait();
        const txHash = receipt.transactionHash;
        await contract.deployed();

        console.log(
            `Deployment successful !... \nContract Address: ${contract.address} \nExplorerLink : ${networkExplorerLink}tx/${txHash}`,
        );

        return { contractAddress: contract.address, confirmationLink: `${networkExplorerLink}tx/${txHash}` };
    }
}
