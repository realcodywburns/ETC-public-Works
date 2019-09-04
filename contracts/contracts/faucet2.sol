// simple faucet
//
// @authors:
// Cody Burns <dontpanic@codywburns.com>
// license: Apache 2.0
// version: 0.3.0

pragma solidity ^0.4.19;


contract owned{
  function owned () public {
      owner = msg.sender;
      
  }
  address owner;
  
  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }
}

contract faucet is owned {

////////////////
//Global VARS//////////////////////////////////////////////////////////////////////////
//////////////

/* int */

  uint public lastDrip;
  uint public dropValue;
  uint public runningCount;
  uint public blockTarget;
  
  int public difficulty;
  int parentDiff;
  

  modifier PoWcheck( address value, bytes32 nonce ){
    require(sha256( value , block.number, nonce ) <= bytes32(difficulty));
    _;
  
  }   

  ///////////
  //EVENTS////////////////////////////////////////////////////////////////////////////
  //////////

  event Payouts(address rewarded, uint drip);
  event DripSet(uint dripset);
  event Donation(address coolperson, uint paid);
  event NewDiff(int _foo, int _bar, int pd,  bytes32 difficulty);
 
  ////////////// 
  //Operations////////////////////////////////////////////////////////////////////////
  //////////////

  /* init */
  function faucet(uint _dropValue) public {
    dropValue = _dropValue;
    runningCount = 0;
    lastDrip = now;
    owner = msg.sender;
    difficulty = int256(21258703883413520253546235528938795582436286247207447304119165813952801144832) ;
    blockTarget = 300;
  }
  
  function max(int a, int b) private pure returns (int) {
        return a > b ? a : b;
  }
  
  /* public */
  function () public payable{
    Donation(msg.sender, msg.value);
  }

  function getETC( address _payout, bytes32 nonce ) public PoWcheck( _payout, nonce ) {
    
    require(newDiff());
    
    _payout.transfer( dropValue );
    runningCount += dropValue;
    Payouts(_payout, dropValue);
  }

  /* onlyOwner */

  function dripSet ( uint _dropValue, int _difficulty, uint _blockTarget ) public onlyOwner{
    dropValue = _dropValue;
    difficulty = _difficulty;
    blockTarget = _blockTarget;
    DripSet(dropValue);
  }

  function newDiff() internal returns( bool ) {
    // adjust PoW to target the blocktarget
    parentDiff = difficulty;
    int foo = max( (1 - ( int(now) - int(lastDrip) ) % int(blockTarget)), -99 );
    int bar =  2048 * foo;
    int pd = parentDiff % bar;
    difficulty = parentDiff + bar;
    lastDrip = now;
    NewDiff(foo, bar, pd, bytes32(difficulty));
    return(true);
  } 
  function selfTest( address value, bytes32 nonce ) 
    public
    view
    returns ( byte status , bool isPoW, bytes32 hash, bytes32 diff ){
      hash = sha256( value , block.number, nonce );
      isPoW = hash < bytes32(difficulty);    
      diff = bytes32(difficulty);
      return ( hex'01', isPoW, hash, diff ) ;  
  }

  ////////////
  //SAFETY ////////////////////////////////////////////////////////////////////
  //////////
  //safety switches consider removing for production
  //clean up after contract is no longer needed

  function killshot() onlyOwner public {
    selfdestruct( owner );
  }
}
