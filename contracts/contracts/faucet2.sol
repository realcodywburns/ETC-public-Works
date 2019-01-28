// simple faucet
//
// @authors:
// Cody Burns <dontpanic@codywburns.com>
// license: Apache 2.0
// version: 0.3.0

pragma solidity ^0.4.19;

/* Intended use:
 * Sends a small amount of ether to whomever calls the default function
 * Status: functional
 * still needs:
*/ submit pr and issues to https://github.com/burnscapital/etc-public-works

contract owned{
  function owned () public {owner = msg.sender;}
  address owner;
  modifier onlyOwner {
          require(msg.sender == owner);
          _;
          }
  }

contract faucet is owned{

////////////////
//Global VARS//////////////////////////////////////////////////////////////////////////
//////////////

/* int */

  uint public lastDrip;
  uint public dripRate;
  uint public dropValue;
  uint public runningCount;
  uint public blockTarget;
  
  bytes32 public difficulty;
  bytes32 parentDiff;
  

  modifier PoWcheck( bytes32 value, bytes32 nonce ){
    require(sha256( value , nonce ) <= difficulty);
  
    // adjust PoW to target the blocktarget
    parentDiff = difficulty;
    difficulty = parentDiff + parentDiff % 2048 * max( 1-( now - lastDrip ) % blockTarget, -99 )  
    lastDrip = now;
    _;
  
  }   

  ///////////
  //EVENTS////////////////////////////////////////////////////////////////////////////
  //////////

  event Payouts(address rewarded, uint drip);
  event DripSet(uint dripset);
  event Donation(address coolperson, uint paid);

  ////////////// 
  //Operations////////////////////////////////////////////////////////////////////////
  //////////////

  /* init */
  function faucet(uint _dropValue, uint _dripRate) public {
    dropValue = _dropValue;
    dripRate = _dripRate;
    runningCount = 0;
    lastDrip = now;
    owner = msg.sender;
    difficulty = 0xff00000000000000000000000000000000000000000000000000000000000000;
    blockTarget = 300;
  }

  /* public */
  function () public payable{
    Donation(msg.sender, msg.value);
  }

  function getETC( address _payout, bytes32 nonce ) public PoWcheck( _payout, nonce ) {
    _payout.transfer( dropValue );
    runningCount += dropValue;
    Payouts(_payout, dropValue);
    
  }

  /* onlyOwner */

  function dripSet ( uint _dropValue, uint _difficulty, uint _blocktarget ) public onlyOwner{
    dropValue = _dropValue;
    difficulty = _difficulty;
    blockTarget = _blockTarget;
    DripSet(dropValue);
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


/////////////////////////////////////////////////////////////////////////////
// 88888b   d888b  88b  88 8 888888         _.-----._
// 88   88 88   88 888b 88 P   88   \)|)_ ,'         `. _))|)
// 88   88 88   88 88`8b88     88    );-'/             \`-:(
// 88   88 88   88 88 `888     88   //  :               :  \\   .
// 88888P   T888P  88  `88     88  //_,'; ,.         ,. |___\\
//    .           __,...,--.       `---':(  `-.___.-'  );----'
//              ,' :    |   \            \`. `'-'-'' ,'/
//             :   |    ;   ::            `.`-.,-.-.','
//     |    ,-.|   :  _//`. ;|              ``---\` :
//   -(o)- (   \ .- \  `._// |    *               `.'       *
//     |   |\   :   : _ |.-  :              .        .
//     .   :\: -:  _|\_||  .-(    _..----..
//         :_:  _\\_`.--'  _  \,-'      __ \
//         .` \\_,)--'/ .'    (      ..'--`'          ,-.
//         |.- `-'.-               ,'                (///)
//         :  ,'     .            ;             *     `-'
//   *     :         :           /
//          \      ,'         _,'   88888b   888    88b  88 88  d888b  88
//           `._       `-  ,-'      88   88 88 88   888b 88 88 88   `  88
//            : `--..     :        *88888P 88   88  88`8b88 88 88      88
//        .   |           |         88    d8888888b 88 `888 88 88   ,  `"	.
//            |           |         88    88     8b 88  `88 88  T888P  88
/////////////////////////////////////////////////////////////////////////
