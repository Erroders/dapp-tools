// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Token, IDappTools} from './IDappTools.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract DappTools is IDappTools, Ownable {
    uint256 private _fees;

    constructor(uint256 fees_) {
        _fees = fees_;
    }

    function register(
        address contract_address,
        address deployer,
        Token kind
    ) public payable virtual override returns (bool) {
        require(msg.value >= _fees, 'DappTools: insufficient funds provided');
        _register(contract_address, deployer, kind);
        return true;
    }

    function fees() public view returns (uint256) {
        return _fees;
    }

    function updateFees(uint256 fees_) public onlyOwner {
        _fees = fees_;
    }

    function _register(
        address contract_address,
        address deployer,
        Token kind
    ) internal virtual {
        require(contract_address != address(0), 'DappTools: token contract cannot have a zero address');
        require(deployer != address(0), 'DappTools: deployer cannot be a zero address');

        // IMPORTANT: check here that if contract with address `contract_address` is actually of Token `kind`.

        emit RegisterToken(contract_address, deployer, kind);
    }
}
