module.exports = (channelID) => {
  return {
    to: channelID,
    message: "``` Bridgette address to address mail service." + "\n"
    + "    This will send a message to an address using the commonwealth messaging contract" + "\n"
    + "       " +"\n"
    + " SENDING MAIL" +"\n"
    + "  Simple plaintext message:" +"\n"
    + "   !mail send <addr> <\" your message \"> " +"\n"
    + " " +"\n"
    + "  Encrypted message: {disabled}" + "\n"
    + "   !mail encrypt <addr> <\" your message \"> " +"\n"
    + "       " +"\n"
    + "  CHECKING MAIL: " +"\n"
    + "   ;    !mail count <addr> : returns the number of the last message      " +"\n"
    + "  [\"]   !mail fetch <number> <addr> : returns the message for the number " +"\n"
    + " /[_]\\  !mail new <addr> : get latest message  " +"\n"
    + "  ] [                                              " +"\n"
    + "                                                   " +"\n"
    + "```"
  };
};
