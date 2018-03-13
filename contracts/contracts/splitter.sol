pragma solidity ^0.4.19;

contract Split {
    address public donate;
    address public owner;
    uint public percent;

    modifier validPercent(uint _percent) {
        require(_percent >= 1 && _percent <= 99);
        _;
    }

    function Split(address _owner, address _donate, uint _percent)
        public
        validPercent(_percent)
    {
      owner = _owner;
      donate = _donate;
      percent = _percent;
    }

    function() payable public {
        if (msg.value > 0) {
            uint toDonate = msg.value * percent / 100;
            uint toOwner = msg.value - toDonate;

            owner.transfer(toOwner);
            donate.transfer(toDonate);
        }
    }
}
