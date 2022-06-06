// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {SuperTokenBase} from "./SuperTokenBase.sol";

/// @title Mintable Super Token implementation with a maximum supply limit.
/// @author jtriley.eth
/// @notice Mint permission set in initializer, transferrable
contract {0} is SuperTokenBase, Ownable {

	/// @notice Thrown when supply limit would be exceeded
	error SupplyCapped();

	/// @notice supply cap
	/// @dev not `immutable` unless set in constructor, which isn't possible
	///      so omitting functions that could write this variable will suffice.
	uint256 public maxSupply;

	// /// @notice Initializes the super token only once IF it does not exceed supply cap
	// /// @param name Name of Super Token
	// /// @param symbol Symbol of Super Token
	// /// @param factory Super Token factory for initialization
	// /// @param _maxSupply Immutable max supply
	// function initialize(
	// 	string memory name,
	// 	string memory symbol,
	// 	address factory,
	// 	uint256 _maxSupply
	// ) external {
	// 	// SuperTokenBase._initialize(string,string)
	// 	_initialize(name, symbol, factory);
	// 	maxSupply = _maxSupply;
	// }
	function initialize() external {
		// SuperTokenBase._initialize(string,string)
		_initialize("{0}", "{1}", address({2}));
		maxSupply = {3};
	}

	/// @notice Mints tokens to recipient if caller is the mitner AND max supply will not be exceeded
	/// @param recipient address to which the tokens are minted
	/// @param amount amount of tokens to mint
	/// @param userData optional user data for IERC777Recipient callbacks
	function mint(
		address recipient,
		uint256 amount,
		bytes memory userData
	) public onlyOwner {
		if (_totalSupply() + amount > maxSupply) revert SupplyCapped();
		// MintableSuperToken._mint(address,uint256,bytes)
		_mint(recipient, amount, userData);
	}
}
