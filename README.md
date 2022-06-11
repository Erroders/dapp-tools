<div align="center">
    <img src="./public/logo-white.svg" height="100" style="margin:auto;"/>
</div>
<br>

Dapp Tools is a *no-code solution* and a launchpad for ERC standard Tokens on EVM compatible chains. We use **OpenZeppelin**'s battle-tested smart contracts library (version `4.x`), thus have reduced risk of vulnerabilities. We also provide TokenScan (just like Etherscan) to answer queries (like total supply, biggest token holders, most recent transfers, all NFTs owned by any account) for any token with provided contract address. These queries are being fulfilled by using **Covalent API**.

ERC Standards provides a bunch of features for each type of token (like mintable, burnable, pausable, access control, ...). Users would be prompted to choose between these options and create different flavoured tokens based on their needs. Further customization is restricted for now to respect the security offered by OZ contracts. In future we may integrate an IDE and other toolings for developers to ease customization of contracts with guidance to maintain security.

Note: Currently we offer to deploy on Polygon Mainnet and Mumbai Testnet only. Options for other chains are being tested internally and will be opened soon.

## About Tokens

A token is a representation of something in the blockchain. This something can be money, time, services, shares in a company, a virtual pet, anything. By representing things as tokens, we can allow smart contracts to interact with them, exchange them, create or destroy them.

### ERC20

An ERC20 token contract keeps track of fungible tokens: any one token is exactly equal to any other token; no tokens have special rights or behavior associated with them. This makes ERC20 tokens useful for things like a medium of exchange currency, voting rights, staking, and more.

```yaml
# Options for ERC20

name: Token Name
symbol: Token Symbol

premint: Create an initial amount of tokens for the deployer.
mintable: Privileged accounts will be able to create more supply.
burnable: Token holders will be able to destroy their tokens.
pausable: Privileged accounts will be able to pause the token transfers, applicable for all or none.

ownable: Contract deployer is the sole owner and one with a single account authorized for all privileged actions.
role-based: Flexible mechanism with a separate role for each privileged action. Contract deployer by default have all the roles. A role can have many authorized accounts and can be granted by the contract deployer only.


securityContact: Where people can contact you to report security issues. Will only be visible if contract metadata is verified.
license: LICENSE
```

### ERC721

As discussed above, how you can make a fungible token using ERC20, but what if not all tokens are alike? This comes up in situations like real estate, voting rights, or collectibles, where some items are valued more than others, due to their usefulness, rarity, etc. ERC721 is a standard for representing ownership of non-fungible tokens, that is, where each token is unique.

```yaml
# Options for ERC721

name: Token Name
symbol: Token Symbol

baseUri: Will be concatenated with token IDs to generate the token URIs.

mintable: Privileged accounts will be able to emit new tokens.
    - increment: New tokens will be automatically assigned an incremental id.
burnable: Token holders will be able to destroy their tokens.
pausable: Privileged accounts will be able to pause the token transfers, applicable for all or none.

ownable: Contract deployer is the sole owner and one with a single account authorized for all privileged actions.
role-based: Flexible mechanism with a separate role for each privileged action. Contract deployer by default have all the roles. A role can have many authorized accounts and can be granted by the contract deployer only.

uriStorage: Allows updating token URIs for individual token IDs (given at the time of minting). Note that if baseUri is provided, then tokenUri will be a concatenated result of both ("[baseUri][uri]").

securityContact: Where people can contact you to report security issues. Will only be visible if contract metadata is verified.
license: LICENSE
```

### ERC1155

A standard interface for contracts that manage multiple token types. A single deployed contract may include any combination of fungible tokens, non-fungible tokens or other configurations (e.g. semi-fungible tokens).

The idea is simple and seeks to create a smart contract interface that can represent and control any number of fungible and non-fungible token types. In this way, the ERC-1155 token can do the same functions as an ERC-20 and ERC-721 token, and even both at the same time. And best of all, improving the functionality of both standards, making it more efficient, and correcting obvious implementation errors on the ERC-20 and ERC-721 standards.
ere each token is unique.

```yaml
# Options for ERC1155

name: Token Name
symbol: Token Symbol

uri: Location of the metadata. Clients will replace any instance of {id} in this string with the tokenId. (Here it is assumed that storage is centralized and using protocols like HTTP instead of IPFS)

mintable: Privileged accounts will be able to emit new tokens.
burnable: Token holders will be able to destroy their tokens.
pausable: Privileged accounts will be able to pause the token transfers, applicable for all or none.
supply: Keeps track of total supply of tokens.

ownable: Contract deployer is the sole owner and one with a single account authorized for all privileged actions.
role-based: Flexible mechanism with a separate role for each privileged action. Contract deployer by default have all the roles. A role can have many authorized accounts and can be granted by the contract deployer only.

securityContact: Where people can contact you to report security issues. Will only be visible if contract metadata is verified.
license: LICENSE
```

<br>
<br>

> These token definitions are referenced from Ethereum and OpenZeppelin documentation.
