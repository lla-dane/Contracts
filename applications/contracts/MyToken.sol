// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "./ERC20.sol";

contract MyToken is ERC20 {

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals
    ) ERC20(name, symbol, decimals) {
        // Mint 100 tokens to msg.sender
        _mint(msg.sender, 100 * 10 ** uint256(decimals));
    }
}
