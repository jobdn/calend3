// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calend3 {
    uint256 rate;
    address owner;
    struct Appointment {
        string title;
        address attendee;
        uint256 startTime;
        uint256 endTime;
        uint256 amountPaid;
    }
    Appointment[] appointments;

    constructor() {
        owner = msg.sender;
    }

    function getRate() public view returns (uint256) {
        return rate;
    }

    function getAppoinments()
        public
        view
        returns (Appointment[] memory _appointments)
    {
        _appointments = appointments;
    }

    function setRate(uint256 _rate) public {
        // TODO: use the openzeppelin access control
        require(msg.sender == owner, "Calend3: not owner");
        rate = _rate;
    }

    function addAppointment(
        string memory _title,
        uint256 _startTime,
        uint256 _endTime
    ) public {
        require((_endTime - _startTime) / 60 > 0, "Calend3: invalid time");
        appointments.push(
            Appointment({
                title: _title,
                attendee: msg.sender,
                startTime: _startTime,
                endTime: _endTime,
                amountPaid: ((_endTime - _startTime) / 60) * rate
            })
        );
    }
}
