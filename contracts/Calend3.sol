// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calend3 {
    uint256 _rate;
    address _owner;

    constructor() {
        _owner = msg.sender;
    }

    function getRate() public view returns (uint256) {
        return _rate;
    }

    function setRate(uint256 rate) public {
        // TODO: use the openzeppelin access control
        require(msg.sender == _owner, "Calend3: not owner");
        _rate = rate;
    }
}
