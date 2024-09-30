// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OZToken is ERC20 {
    uint dec = 10 ** 18;
    constructor(string memory _name, string memory symbol) ERC20(_name, symbol) {
        _mint(msg.sender, 1000 * dec);
    }

    function mint(address recipient, uint amount) external {
        _mint(recipient, amount * dec);
    }

    function burn(address _addr, uint amount) external {
        _burn(_addr, amount * dec);
    }

    function transferTokens(
        address sender,
        address recipient,
        uint amount
    ) external {
        _transfer(sender, recipient, amount * dec);
    }
}
