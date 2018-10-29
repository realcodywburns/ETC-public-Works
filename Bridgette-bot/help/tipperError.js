module.exports = (channelID) => {
  return {
    to: channelID,
    message: "``` (EXPERIMENTAL) Bridgette coin service." + "\n"
    + "    Bridgette can send and manage you bridgette tokens" + "\n"
    + "    Tokens are pegged 100:1 with ETC and have no decimals   " +"\n"
    + "    YOUR DISCORD ACCOUNT IS YOUR UNIQUE ID, IF YOU LOSE ACCESS TO DISCORD YOU LOSE YOUR COINS!   " +"\n"
    + "  \n"
    + "  Send to a friend:" +"\n"
    + "   !tipper send <amount> <@theUser#somenumber> " +"\n"
    + "  \n"
    + "  Withdraw ETC(disabled for now):" +"\n"
    + "   !tipper withdraw <amount> <0xyouraddress> " +"\n"
    + "  \n"
    + "  Deposit ETC(disabled for now):" +"\n"
    + "   !tipper newdeposit " +"\n"
    + "  Bridgette will generate a deposit address. Send ETC to this address to get tokens. \n"
    + "  \n"
    + "  CHECKING a Balance: " +"\n"
    + "   ;          " +"\n"
    + "  [\"]   !tipper balance (@theUser#somenumber) " +"\n"
    + " /[_]\\   get your balance or optionally someone elses\n"
    + "  ] [                                              " +"\n"
    + "                                                   " +"\n"
    + "```"
  };
};
