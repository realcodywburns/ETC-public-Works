module.exports = (channelID, payload, transaction) => {
return{
  to: channelID,
  message: "Transaction info: \n"
    + " ```" + "\n"
    + "  hash: " + transaction.hash + "\n"
    + "  nonce: " + transaction.nonce + "\n"
    + "  blockHash: " + transaction.blockHash + "\n"
    + "  blockNumber: " + transaction.blockNumber + "\n"
    + "  transactionIndex: " + transaction.transactionIndex + "\n"
    + "  from: " + transaction.from + "\n"
    + "  to: " + transaction.to + "\n"
    + "  value: " + transaction.value + "\n"
    + "  gasPrice: " + transaction.gasPrice + "\n"
    + "  gas: " + transaction.gas + "\n"
    + "  input: " + transaction.input
    + " ```"
  };
};
