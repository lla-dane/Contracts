// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract Counter {
    uint256 public count = 0;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "NOT OWNER");
        _;
    }

    function get() public view returns (uint256) {
        return count;
    }

    function inc() public onlyOwner {
        count += 1;
    }

    function dec() public {
        count -= 1;
    }
}
