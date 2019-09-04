pragma solidity ^0.4.19;

contract owned{
  address owner;
  function owned () public {owner = msg.sender;}
  modifier onlyOwner {
          require(msg.sender == owner);
          _;
          }
}

contract eventTracker is owned{

////////////////
//Global VARS//////////////////////////////////////////////////////////////////////////
//////////////

/* int */

    uint public totalEvents;

    struct eventInfo {
        string team;
        string eventTitle;
        string eventUrl;
        uint eventBlock;
        string eventDate;
        uint dateAdded;
    }

///////////
//MAPPING/////////////////////////////////////////////////////////////////////////////
///////////

    mapping (uint=>eventInfo) eventLog;
    mapping (address=>bool) admins;
///////////
//EVENTS////////////////////////////////////////////////////////////////////////////
//////////

    event eventAdded(string _team, string _eventTitle);
    event eventDel(string _team, string _eventTitle);

/////////////
//MODIFIERS////////////////////////////////////////////////////////////////////
////////////

modifier onlyAdmin() {
    require(admins[msg.sender]);
    _;


}

//////////////
//Operations////////////////////////////////////////////////////////////////////////
//////////////

/* init */
function eventTracker() public {
    totalEvents = 0;
    admins[msg.sender] = true;
}

/* public */
function () public {
    assert(0 == 1);
}


/* only admins */

function addAdmin(address _newAdmin) public onlyOwner returns (bool success){
    admins[_newAdmin] = true;
    return true;
}

function removeAdmin(address _oldAdmin) public onlyOwner returns (bool success){
    admins[_oldAdmin] = false;
    return true;
}


function addEvent(string _team, string _eventTitle, string _eventUrl, uint _eventBlock,string _eventDate) public onlyAdmin returns (bool success){
    eventInfo storage EI = eventLog[totalEvents + 1];
    EI.team = _team;
    EI.eventTitle = _eventTitle;
    EI.eventUrl = _eventUrl;
    EI.eventBlock = _eventBlock;
    EI.eventDate = _eventDate;
    EI.dateAdded = now;
    totalEvents = totalEvents + 1;
    eventAdded( _team, _eventTitle);
    return true;
}

function delEvent(uint _eventNumber) public onlyAdmin returns (bool success){
    eventInfo storage EI = eventLog[_eventNumber];
    eventDel( EI.team, EI.eventTitle);
    EI.team = "";
    EI.eventTitle = "";
    EI.eventUrl = "";
    EI.eventBlock = 0;
    EI.eventDate = "";
    return true;
}


////////////
//OUTPUTS///////////////////////////////////////////////////////////////////////
//////////

/* public */

function getEvent(uint _eventNumber) public view returns (string _team, string _title, string _url, uint _block, string _date){
    eventInfo memory EI = eventLog[_eventNumber];
    return (EI.team, EI.eventTitle, EI.eventUrl, EI.eventBlock, EI.eventDate);
}

////////////
//SAFETY ////////////////////////////////////////////////////////////////////
//////////
//safety switches consider removing for production
//clean up after contract is no longer needed

function killshot() onlyOwner public {selfdestruct(owner);}
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
