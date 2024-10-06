// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract EtherWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function withdraw(uint256 _amount) external {
        require(msg.sender == owner, "CALLER NOT AUTHORISED");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
