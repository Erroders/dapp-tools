// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

enum Token {
    ERC20,
    ERC721,
    ERC1155,
    ERC20x
}

/**
 * @dev Interface of the DappTools contract.
 */
interface IDappTools {
    /**
     * @dev Emitted when a deployer registers a deployed token contract with DappTools
     *
     * Note that `contract_address` and `deployer` cannot be zero address. Value of
     * kind is derived from the enum `Token`.
     */
    event RegisterToken(address indexed contract_address, address indexed deployer, Token kind);

    /**
     * @dev Registers the token for DappTools services
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {RegisterToken} event.
     */
    function register(
        address contract_address,
        address deployer,
        Token kind
    ) external payable returns (bool);
}
