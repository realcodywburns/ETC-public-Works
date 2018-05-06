pragma solidity ^0.4.19;

contract artest {
    
    enum ratings{
        G,
        PG,
        PG13,
        R,
        NC17
    }
    
    struct arTarget {
        string logo;
        bool owned;
        address owner;
        bool forSale;
        uint price; 
        ratings rating;
    }
    
    mapping(address => bool) public contentPolice; 
    mapping(uint8 => arTarget) public targets;
    
    modifier onlyOwner(uint8 _tgt) {
        require(msg.sender == targets[_tgt].owner);
        _;
    }
    
    modifier onlyContentPolice(){
        require(contentPolice[msg.sender]);
        _;
    }
    
    event squeal(string action, address officer, string comment);
    
    function artest()public{
        contentPolice[msg.sender]= true;
    }
    
    /* getters */
    
    function getLogo(uint8 _scan) public view returns(string ipfs, ratings rating){
        ipfs = targets[_scan].logo;
        rating = targets[_scan].rating;
        return (ipfs, rating);
    }
    
    
    function updateLogo(uint8 _arID, string _ipfs, bool _forSale, uint _price, ratings _rating) payable public returns(bool success){
        success = false;
        //buy a seat
        if(targets[_arID].owned && msg.sender != targets[_arID].owner && targets[_arID].forSale && msg.value >= targets[_arID].price){
            targets[_arID].owner.transfer(msg.value);
            targets[_arID].owner = msg.sender;
            targets[_arID].logo = _ipfs;
            targets[_arID].forSale = _forSale;
            targets[_arID].price = _price;
            success = true;
        }
        //update a seat
        if(targets[_arID].owned && msg.sender == targets[_arID].owner || !targets[_arID].owned){
            targets[_arID].logo = _ipfs;
            targets[_arID].owned = true;
            targets[_arID].owner = msg.sender;
            targets[_arID].rating = _rating;
            targets[_arID].forSale = _forSale;
            targets[_arID].price = _price;
            success = true;
            
        }
        return success;
    }

    function clearSeat(uint8 _seat, string _comment) public onlyContentPolice returns(bool success){
        targets[_seat].owned = false;
        targets[_seat].logo = "";
        squeal("removed", msg.sender, _comment);
        return true;
    }
}
