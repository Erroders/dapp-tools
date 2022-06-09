# Dapp Tools

## Connect Wallet

```tsx
import connectWallet, { wallets } from '../components/wallet/connectWallet';

connectWallet(wallets.WALLETCONNECT).then((provider) => {
    console.log(provider);
});
```

**Options (more to be added)**:

-   wallets.WALLETCONNECT
-   wallets.METAMASK

---

## Contract Deployment

-   Include the following code to deploy ERC20/721/1155 contract.
-   For this, must include the contract creation **options** as shown below for different ERCs and **kind** in the deploy function.
-   enum for **kind** are : `**ERC20, ERC721, ERC1155**`

#### options format in JSON for **erc20** contract

```json
{
    "name": "TestToken",
    "symbol": "TST",
    "burnable": true,
    "pausable": true,
    "premint": "", # any interger value as string
    "mintable": true,
    "permit": false,
    "access": "ownable",
    "info": {
      "securityContact": "rg@email.com",
      "license": "MIT"
    }
}
```

#### options format in JSON for **erc721** contract

```json
{
    "name": "TestNFT",
    "symbol": "TNFT",
    "baseUri": "https://dvsfdg.com/samplenft.png",
    "enumerable": false,
    "uriStorage": true,
    "burnable": false,
    "pausable": false,
    "mintable": true,
    "incremental": false,
    "accesss": "ownable",
    "info": {
        "securityContact": "rg@email.com",
        "license": "MIT"
    }
}
```

#### options format in JSON for **erc1155** contract

```json
{
    "name": "TestNFTCollection",
    "uri": "dhsgfdshgvjaghvdf",
    "burnable": false,
    "pausable": false,
    "mintable": false,
    "supply": true,
    "accesss": "ownable",
    "info": {
        "securityContact": "rg@email.com",
        "license": "MIT"
    }
}
```

### Actual code (to be included)

```tsx
import { deployContract } from '../utils/contract_deployer';
import { ERCs } from '../utils/types';
import { ERC20Data } from './api/erc20';

const erc20Opts: ERC20Data = {
    name: 'TestToken',
    symbol: 'TTK',
    burnable: false,
    pausable: false,
    premint: '0',
    mintable: true,
    permit: false,
    accesss: 'ownable',
    info: {
        securityContact: 'abcg@email.com',
        license: 'MIT',
    },
};

const contractDetails = await deployContract(erc20Opts, ERCs.ERC20, provider);
console.log(contractDetails);

// prints (contractDetails):
/*  {
      contractAddress: '0x834a27aba12F5490c0F54e8228C7fC939f16863e', 
      confirmationLink: 'https://mumbai.polygonscan.com/tx/0x0cdd1eec4ad7471d5cf87455ea30b22c56425e1625f6ca1278a4404f668e4711'
    }*/
```
