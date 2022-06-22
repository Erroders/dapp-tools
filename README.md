<div align="center">
    <img src="./public/logo-white.svg" height="150" style="margin:50px;"/>
</div>
<br>

Dapp Tools is a no-code launchpad for deploying ERC Standard Token Contracts on EVM-compatible chains. There are no extra fees or hidden charges to use the platform. Using [**OpenZeppelin**][openzeppelin]'s battle-tested smart contracts (version 4. x), all the services by default inherit its security advantages and have reduced the risk of vulnerabilities. So whether you are an experienced developer or heard about web3 an hour ago, we've got you covered.

<br>

## **What's new in it?**

Our team firmly believes in the bright future of web, is well versed in its objectives, and determined to exploit its potential for the coming revolution. Therefore, Dapp Tools offers fully transparent, secure, user-friendly, and privacy-preserved services. It does not collect or rely on users' personal and sensitive information like email, phone number, or residential address. All you need is a cryptocurrency wallet, which is solely owned, managed, and controlled by the user himself. Dapp Tools supports Metamask, WalletConnect, Coinbase, and [Unstoppable Domains][unstoppable-domains] as of now. It might have struck you that, even if a user owns two different wallets(or public keys specifically), we can't draw this fact!

Inspired by OpenZeppelin's contract wizard, it offers you to bootstrap your contracts by optionally selecting to include various functionalities specific to the used standard. After deployment, the user becomes the creator, deployer, and owner of the smart contract, thus it can be scaled or built upon independently at any time in the future. In the whole process, Dapp Tools is just like a swiss army knife, it does not keep or require any privileges to operate or interact with the user-owned contracts.

The data used to hydrate the application is sourced from [Covalent API][covalent-api], which is a trusted and reliable source for unified on-chain data. Currently, we offer to deploy on Polygon Mainnet and Mumbai Testnet only. Options for other chains are being tested internally and will be opened soon.

> It's just the beginning, checkout our [Roadmap](#roadmap) to get a glance of what Dapp Tools is striving to become.

<br>

## **Services offered**

### **Deploy ERC20 standard contracts**

A token is a representation of something in the blockchain. This something can be money, time, services, shares in a company, a virtual pet, anything. By representing things as tokens, we can allow smart contracts to interact with them, exchange them, and create or destroy them.

An ERC20 token contract keeps track of fungible tokens: any one token is exactly equal to any other token; no tokens have special rights or behavior associated with them. This makes ERC20 tokens useful for things like a medium of exchange currency, voting rights, staking, and more.

This contract is customizable and requires the following inputs from the user.

```yaml
# Required(*)
name: Token Name
symbol: Token Symbol
access:
    ownable: Contract deployer is the sole owner and one with a single account authorized for all privileged actions.
    role-based: Flexible mechanism with a separate role for each privileged action. Contract deployer by default have all the roles. A role can have many authorized accounts and can be granted by the contract deployer only.
license: LICENSE

# Optional
premint: Create an initial amount of tokens for the deployer.
mintable: Privileged accounts will be able to create more supply.
burnable: Token holders will be able to destroy their tokens.
pausable: Privileged accounts will be able to pause the token transfers, applicable for all or none.
security-contact: Where people can contact you to report security issues. Will only be visible if contract metadata is verified.
```

### **Deploy ERC721 standard contracts**

As discussed above, how you can make a fungible token using ERC20, but what if not all tokens are alike? This comes up in situations like real estate, voting rights, or collectibles, where some items are valued more than others, due to their usefulness, rarity, etc. ERC721 is a standard for representing ownership of non-fungible tokens, that is, where each token is unique.

This contract is customizable and requires the following inputs from the user.

```yaml
# Required(*)
name: Token Name
symbol: Token Symbol
access:
    ownable: Contract deployer is the sole owner and one with a single account authorized for all privileged actions.
    role-based: Flexible mechanism with a separate role for each privileged action. Contract deployer by default have all the roles. A role can have many authorized accounts and can be granted by the contract deployer only.
license: LICENSE

# Optional
base-uri: Will be concatenated with token IDs to generate the token URIs.
mintable: Privileged accounts will be able to emit new tokens.
    - increment: New tokens will be automatically assigned an incremental id.
burnable: Token holders will be able to destroy their tokens.
pausable: Privileged accounts will be able to pause the token transfers, applicable for all or none.
security-contact: Where people can contact you to report security issues. Will only be visible if contract metadata is verified.
uri-storage: Allows updating token URIs for individual token IDs (given at the time of minting). Note that if base-uri is provided, then tokenUri will be a concatenated result of both ("[base-uri][uri]").
```

### **Deploy ERC1155 standard contracts**

A standard interface for contracts that manage multiple token types. A single deployed contract may include any combination of fungible tokens, non-fungible tokens, or other configurations (e.g. semi-fungible tokens).

The idea is simple and seeks to create a smart contract interface that can represent and control any number of fungible and non-fungible token types. In this way, the ERC-1155 token can do the same functions as an ERC-20 and ERC-721 token, and even both at the same time. And best of all, improving the functionality of both standards, making them more efficient, and correcting obvious implementation errors on the ERC-20 and ERC-721 standards.

```yaml
# Required(*)
name: Token Name
symbol: Token Symbol
access:
    ownable: Contract deployer is the sole owner and one with a single account authorized for all privileged actions.
    role-based: Flexible mechanism with a separate role for each privileged action. Contract deployer by default have all the roles. A role can have many authorized accounts and can be granted by the contract deployer only.
license: LICENSE

# Optional
uri: Location of the metadata. Clients will replace any instance of {id} in this string with the tokenId. (Here it is assumed that storage is centralized and using protocols like HTTP instead of IPFS)
mintable: Privileged accounts will be able to emit new tokens.
burnable: Token holders will be able to destroy their tokens.
pausable: Privileged accounts will be able to pause the token transfers, applicable for all or none.
supply: Keeps track of total supply of tokens.
security-contact: Where people can contact you to report security issues. Will only be visible if contract metadata is verified.
```

### **Deploy & Mint only one NFT per contract**

Although this may look like a regular NFT minting service, it's not. As mentioned before, the user becomes a true owner of not just NFT but also the deployed smart contract. Using this service, you can mint anything (image, video, ...) unique, but only one per contract. Also, remember that you won't be able to expand it into a collection later (as an NFT is minted at the time of deployment within the same transaction). The service inherits and modifies the ERC721 standard contract.

Currently have limited features and offers no customization to respect the security offered by OZ contracts.

### **Deploy NFT Collection contracts**

This contract is also an inherited and modified version of the ERC721 standard. You can always add NFTs into your collection from within the application(feature currently hidden until fully tested) or by calling the `safeMint` function externally. Even if each item in the collection is the same image, suppose, it would still have a unique `tokenId` on-chain for distinction.

Currently have limited features and offers no customization to respect the security offered by OZ contracts.

> The above content and token definitions are referenced from Ethereum and OpenZeppelin contracts documentation.

<br>

## **Problems presently facing**

Dapp Tools uses Covalent API to fetch on-chain data, however, the API follows traditional REST architecture and its response time is very slow as of current usage. It does provide an option to paginate data but it kind of doesn't work. Also, the majority of the images(or other media) minted as NFTs are stored onto IPFS which takes ample time to load from. The Interface depends on the combined data from both sources and thus makes users wait for longer intervals.

A workaround for this can be to introduce a robust, scalable, and fast backend service, like Google's Firebase. Now the overhead of fetching data from Covalent's API and IPFS will be shifted to Cloud Functions, which will cache data automatically at regular intervals. At this point you might think, isn't the data will be centralized again? The answer is yes and no. Yes, because we will be storing data in servers under our control. And no, the true source and origin of data is still the blockchain and it is public and decentralized. We'll just aggregate that data beforehand to provide a faster response time to our users.

<br>

## **Roadmap**

### **August 2022**

- [ ] support for upgradable contracts
- [ ] verify contracts post deployment

### **October 2022**

- [ ] an interface to transfer assets and make contract function calls
- [ ] integration with superfluid for creating super tokens

### **February 2023**

- [ ] no code support for creating and managing subgraphs
- [ ] no code support for creating and managing oracles

<br>

## **Help & Support**

This tool is made purely with the intention to strengthen the existing web3 ecosystem and smoothen the onboarding of newcomers. Your genuine feedbacks are always welcome. Feel free to reach out to any of the contributors in case of doubts or bug reports. Also, we may soon release a rule book for those who may wish to contribute.

[Nonit Mittal](https://github.com/nonitmittal)

[Sparsh Agarwal](https://github.com/akathecoder)

[Raghav Goyal](https://github.com/rg12301) ([email](mailto:12301raghavgoyal@gmail.com) preferred)

[openzeppelin]: https://www.openzeppelin.com/contracts
[unstoppable-domains]: https://unstoppabledomains.com/
[covalent-api]: https://www.covalenthq.com/
