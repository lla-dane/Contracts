// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract Bank {
    uint bal = 0;
    function deposit(uint amt) external {
        bal += amt;
    }

    function withdraw(uint amt) external {
        bal -= amt;
    }

    function get_balance() external view returns (uint) {
        return bal;
    }
}
