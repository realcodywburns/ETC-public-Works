pragma solidity ^0.4.11;

contract owned{
  function owned () {owner = msg.sender;}
  address owner;
  modifier onlyOwner {
          if (msg.sender != owner)
              throw;
          _;
          }
  function setOwner(address newOwner) onlyOwner{owner = newOwner;}
  }

contract SafeMath {
      uint256 constant public MAX_UINT256 =
      0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;

      function safeAdd(uint256 x, uint256 y) constant internal returns (uint256 z) {
          if (x > MAX_UINT256 - y) throw;
          return x + y;
      }

      function safeSub(uint256 x, uint256 y) constant internal returns (uint256 z) {
          if (x < y) throw;
          return x - y;
      }

      function safeMul(uint256 x, uint256 y) constant internal returns (uint256 z) {
          if (y == 0) return 0;
          if (x > MAX_UINT256 / y) throw;
          return x * y;
      }
  }


contract Announcer is owned, SafeMath {

    /* Contract Variables and events */
    uint16 public minimumQuorum;
    uint32 public debatingPeriodInMinutes;
    uint16 public majorityMargin;
    Announcement[] public Announcements;
    uint public numAnnouncements;
    uint32 public officailAnnCount;
    Member[] public members;

//structures

    struct Announcement {
        string announcementType;
        string message;
        uint votingDeadline;
        bool executed;
        bool AnnouncementPassed;
        uint16 numberOfVotes;
        uint16 currentResult;
        bytes32 AnnouncementHash;
        Vote[] votes;
        mapping (address => bool) voted;
    }

    struct Member {
        address member;
        string name;
        uint memberSince;
    }

    struct Vote {
        bool inSupport;
        address voter;
        string justification;
    }
    
    mapping (uint => Announcement) public officialAnnouncements;
//mapping
    mapping (address => uint) public memberId;

//events
    event AnnouncementAdded(uint AnnouncementID, string annType);
    event Voted(uint AnnouncementID, bool position, address voter, string justification);
    event AnnouncementTallied(uint AnnouncementID, uint result, uint quorum, bool active);
    event MembershipChanged(address member, bool isMember);
    event ChangeOfRules(uint16 minimumQuorum, uint32 debatingPeriodInMinutes, uint16 majorityMargin);
    event officialAnnouncement(string annType, string message);
    
//modifiers
    /* modifier that allows only shareholders to vote and create new Announcements */
    modifier onlyMembers {
        if (memberId[msg.sender] == 0)
        throw;
        _;
    }

    modifier noBot(address _addr){
        uint length;
        assembly {length := extcodesize(_addr) }
        require(length <= 0);
        _;
      }

// functions

    /* First time setup */
    function Announcer(
        uint16 minimumQuorumForAnnouncements,
        uint32 minutesForDebate,
        uint16 marginOfVotesForMajority,
        address AnnouncerLeader
    ) onlyOwner{
        changeVotingRules(minimumQuorumForAnnouncements, minutesForDebate, marginOfVotesForMajority);
        if (AnnouncerLeader != 0) owner = AnnouncerLeader;
        addMember(owner, 'President');
    }

// only Owner Functions
    /*make someone a member, no bots allowed */
    function addMember(address targetMember, string memberName) onlyOwner noBot(targetMember){
        uint id;
        if (memberId[targetMember] == 0) {
           memberId[targetMember] = 1;
           id = members.length++;
           Member n = members[id];
           n.member=targetMember;
           n.memberSince= now;
           n.name= memberName;
        } else {
            //just change info
            id= memberId[targetMember];
            Member m = members[id];
            m.member = targetMember;
            m.memberSince= now;
            m.name= memberName;
        }


        MembershipChanged(targetMember, true);
    }

    /*remove a member*/
    function removeMember(address targetMember) onlyOwner {
        if (memberId[targetMember] == 0) throw;

        for (uint i = memberId[targetMember]; i< members.length-1; i++){
            members[i] = members[i+1];
        }
        delete members[members.length-1];
        members.length = safeSub(members.length, 1);
    }

    /*change rules*/
    function changeVotingRules(
        uint16 minimumQuorumForAnnouncements,
        uint32 minutesForDebate,
        uint16 marginOfVotesForMajority
    ) onlyOwner {
        minimumQuorum = minimumQuorumForAnnouncements;
        debatingPeriodInMinutes = minutesForDebate;
        majorityMargin = marginOfVotesForMajority;
        ChangeOfRules(minimumQuorum, debatingPeriodInMinutes, majorityMargin);
    }

// onlyMember Functions
    /* Function to create a new Announcement */
    function newAnnouncement(
        string _announcementType,
        string _message,
        bytes _transactionBytecode
    )
        onlyMembers
        returns (uint AnnouncementID)
    {
        AnnouncementID = Announcements.length++;
        Announcement p = Announcements[AnnouncementID];
        p.announcementType = _announcementType; 
        p.message = _message;
        p.AnnouncementHash = sha3(_announcementType, _message, _transactionBytecode);
        p.votingDeadline = safeAdd(now,safeMul(debatingPeriodInMinutes, 1 minutes));
        p.executed = false;
        p.AnnouncementPassed = false;
        p.numberOfVotes = 0;
        AnnouncementAdded(AnnouncementID, _announcementType);
        numAnnouncements = AnnouncementID++;

        return AnnouncementID;
    }

    function vote(
        uint AnnouncementNumber,
        bool supportsAnnouncement,
        string justificationText
    )
        onlyMembers
        returns (uint voteID)
    {
        Announcement p = Announcements[AnnouncementNumber];         // Get the Announcement
        if (p.voted[msg.sender] == true) throw;                     // If has already voted, cancel
        p.voted[msg.sender] = true;                                 // Set this voter as having voted
        p.numberOfVotes++;                                          // Increase the number of votes
        if (supportsAnnouncement) {                                 // If they support the Announcement
            p.currentResult++;                                      // Increase score
        } else {                                                    // If they don't
            p.currentResult--;                                       // Decrease the score
        }
        // Create a log of this event
        Voted(AnnouncementNumber,  supportsAnnouncement, msg.sender, justificationText);
        return p.numberOfVotes;
    }

//public
  /* default function allow anyone to send funds */
    function() payable{
        if(msg.value >= 1 ether) throw;
    }

    /* function to check if a Announcement code matches */
    function checkAnnouncementCode(
        uint AnnouncementNumber,
        string _announcementType,
        string _message,
        bytes _transactionBytecode
    )
        constant
        returns (bool codeChecksOut)
    {
        Announcement p = Announcements[AnnouncementNumber];
        return p.AnnouncementHash == sha3(_announcementType, _message, _transactionBytecode);
    }

    function executeAnnouncement(uint AnnouncementNumber, bytes _transactionBytecode) {
        Announcement p = Announcements[AnnouncementNumber];
        /* Check if the Announcement can be broadcast:
           - Has the voting deadline arrived?
           - Has it been already broadcast or is it being executed?
           - Does the transaction code match the Announcement?
           - Has a minimum quorum?
        */

        if (now < p.votingDeadline
            || p.executed
            || p.AnnouncementHash != sha3(p.announcementType, p.message, _transactionBytecode)
            || p.numberOfVotes < minimumQuorum)
            throw;

        /* Broadcast announcement */
        /* If difference between support and opposition is larger than margin */
        if (p.currentResult > majorityMargin) {
            // Avoid recursive calling

            p.executed = true;
            officailAnnCount= officailAnnCount++; 
            officialAnnouncements[officailAnnCount] = p;
            officialAnnouncement(p.announcementType, p.message);
            
            p.AnnouncementPassed = true;
        } else {
            p.AnnouncementPassed = false;
        }
        // Fire Events
        AnnouncementTallied(AnnouncementNumber, p.currentResult, p.numberOfVotes, p.AnnouncementPassed);
    }
//safety switches consider removing for production
//clean up after contract is no longer needed
    function kill(address beneficiary) public onlyOwner {selfdestruct(beneficiary);}
}
