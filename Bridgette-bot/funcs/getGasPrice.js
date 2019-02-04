module.exports = (channelID, gas) => {
return{
  to: channelID,
  message : "The current median gas price is `" + gas.toString(5)  +" Mwei.` \n"
     + "The a normal p2p transfer would cost: ` ⟠" + gas.toString() * 21000 / 1000000000000000000  + "`"
  };
};
