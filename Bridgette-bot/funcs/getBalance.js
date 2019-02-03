module.exports = (channelID, payload, balance) => {
return{
  to: channelID,
  message :"The balance at account " + payload.substring(0,10) + "... is: ` ⟠" + balance * .000000000000000001 + " `"
  };
};
