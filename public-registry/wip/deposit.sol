pragma solidity ^0.4.19;

contract Deposit {
    address public tipperAddress;
    uint public owner;

    function Deposit(address _tipper, uint _userID)  public
    {
      owner = _userID;
      tipper = _tipper;
    }

    function() payable public returns(bool success){
    tipper con = tipper(tipperAddress);
    tipper.deposit(owner);
    return true;
    }


}
