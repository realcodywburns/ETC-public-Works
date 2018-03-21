module.exports = (channelID) => {
  return {
    to: channelID,
    message: "``` Bridgette address to address mail service." + "\n"
    + "    This will send a message to an address using the commonwealth messaging contract" + "\n"
    + "       " +"\n"
    + " SENDING MAIL" +"\n"
    + "  Simple plaintext message:" +"\n"
    + "   !etcMail send <addr> <\" your message \"> " +"\n"
    + " " +"\n"
    + "  Encrypted message: " + "\n"
    + "   !etcMail encrypt <addr> <\" your message \"> " +"\n"
    + "       " +"\n"
    + "  CHECKING MAIL: " +"\n"
    + "   ;     !etcMail count <addr> : returns the number of the last message      " +"\n"
    + "  [\"]   !etcMail fetch <number> <addr> : returns the message for the number " +"\n"
    + " /[_]\\  !etcMail new <addr> : get latest message " +"\n"
    + "  ] [    !etcMail all <addr> : get all messages        " +"\n"
    + "                 " +"\n"
    + "```"

  };
};
