module.exports = (channelID) => {
  return {
    to: channelID,
    message: "``` I am Bridgette, the minimilst web3 bridge." + "\n"
    + "    Commands: " + "\n"
    + "   ;    getBlockNumber : returns the current block number" +"\n"
    + "  [\"]   getBalance <account>: returns an account\'s balance" +"\n"
    + " /[_]\\  getTransaction <txId>: get info on a transaction" +"\n"
    + "  ] [   sendRawTransaction <txHash>: send a signed transaction" +"\n"
    + "        gasPrice: gets the median gas price" +"\n"
    + "        getBlock <number> returns a block with info" +"\n"
    + " " +"\n"
    + " " +"\n"
    + "```"

  };
};
