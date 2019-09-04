pragma solidity ^0.4.22;

contract owned {
    address owner;
    function constructor() public {owner = msg.sender;}
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
}

contract SafeMath {
    uint256 constant internal MAX_UINT256 =
    0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;

    function safeAdd(uint256 x, uint256 y) pure internal returns (uint256 z) {
        if (x > MAX_UINT256 - y) revert();
        return x + y;
    }

    function safeSub(uint256 x, uint256 y) pure internal returns (uint256 z) {
        if (x < y) revert();
        return x - y;
    }

    function safeMul(uint256 x, uint256 y) pure internal returns (uint256 z) {
        if (y == 0) return 0;
        if (x > MAX_UINT256 / y) revert();
        return x * y;
    }
}

contract Tipper is owned, SafeMath {

  string public name;
  bool isActive;

  mapping (uint => uint256) public balances;
  mapping (address => bool) public contracts;
  mapping (address => uint) public users;


  event Withdrawal(uint from, address to, uint value, bytes indexed data);
  event Transfer(uint from, uint to, uint value, bytes indexed data);

  modifier notLocked(){
    require(isActive);
    _;
  }


  function withdrawToAddress(address _to, uint _from , uint _value, bytes _data) public onlyOwner notLocked returns (bool success) {
    require(balanceOf(_from) < _value);
    balances[_from] = safeSub(balanceOf(_from), _value);
    emit Withdrawal(_from, _to, _value, _data);
    return true;
  }


  function transfer(uint _to, uint _from , uint _value, bytes _data) public onlyOwner notLocked returns (bool success) {
    require(balanceOf(_from) < _value);
    balances[_from] = safeSub(balanceOf(_from), _value);
    balances[_to] = safeAdd(balanceOf(_to), _value);
    emit Transfer(_from, _to, _value, _data);
    return true;
  }

  function addContract(address _contract, uint _owner) public onlyOwner notLocked returns (bool success) {
    contracts[_contract] = true;
    users[_contract] = _owner;
    return true;
  }

  function deposit(uint _owner) public payable notLocked returns (bool success){
      require(contracts[msg.sender]);
      balances[_owner] = safeAdd(balanceOf(_owner), msg.value);
     return true;
  }

  function balanceOf(uint _owner) public view returns (uint balance) {
    return balances[_owner];
  }

  //Safety functions

  function lockDown() public onlyOwner {
    isActive = !isActive;
  }

  function killShot() public onlyOwner{
      selfdestruct(msg.sender);
  }
}
