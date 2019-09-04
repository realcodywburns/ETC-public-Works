module.exports = (channelID) => {
  return {
    to: channelID,
    message: "``` Bridgette donation address creater." + "\n"
    + "    This will create a contract address that will split any funds sent to it between your real address and one of our teams! You can use it when withdrawing from exchanges or when mining" + "\n"
    + " " +"\n"
    + "  !donate <team> <percent(whole number)> <your address>" +"\n"
    + " " +"\n"
    + "    Teams: " + "\n"
    + "   ;    Community : The community multisig" +"\n"
    + "  [\"]   Coop : the etc cooporative (soon)" +"\n"
    + " /[_]\\  ETCdev : ETCdev team  " +"\n"
    + "  ] [   dex : the ETC Commonwealth team " +"\n"
    + "        epool : the public API point" +"\n"
    + "        BCRD : Burns Capital: R & D. Dont Panic's ETC-public-works" +"\n"
    + "```"

  };
};
