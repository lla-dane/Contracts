// SPDX-License-Identifier: MIT

pragma solidity ^0.8.22;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {OApp, MessagingFee, Origin} from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import {MessagingReceipt} from "@layerzerolabs/oapp-evm/contracts/oapp/OAppSender.sol";

contract Counter is OApp {

    constructor(
        address _endpoint,
        address _owner
    ) OApp(_endpoint, _owner) Ownable(_owner) {}

    uint public data = 0;
    uint public counter = 0;

    function send_increment(
        uint32 _dstEid,
        uint _message,
        bytes calldata _options
    ) external payable returns (MessagingReceipt memory receipt) {
        bytes memory _payload = abi.encode(_message);
        receipt = _lzSend(
            _dstEid,
            _payload,
            _options,
            MessagingFee(msg.value, 0),
            payable(msg.sender)
        );
        counter += 1;
        data = _message;
    }

    function quote(
        uint32 _dstEid,
        uint _message,
        bytes memory _options,
        bool
    ) external view returns (MessagingFee memory fee) {
        bytes memory payload = abi.encode(_message);
        fee = _quote(_dstEid, payload, _options, false);
    }

    function _lzReceive(
        Origin calldata,
        bytes32,
        bytes calldata payload,
        address,
        bytes calldata
    ) internal override {
        data = abi.decode(payload, (uint));
        counter += 1;
    }

    function retrieve() external view returns (uint) {
        return counter;
    }
}
