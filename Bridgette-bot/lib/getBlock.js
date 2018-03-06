module.exports = (channelID, funcs, rawBlk) => {

return{
  to: channelID,
  message : "```"
  + "Block number :" + rawBlk.number + "\n"
  + "hash : " + rawBlk.hash + "\n"
  + "parentHash : " + rawBlk.parentHash + "\n"
  + "nonce : " + rawBlk.nonce + "\n"
  + "sha3Uncles : " + rawBlk.sha3Uncles + "\n"
  + "logsBloom : " + rawBlk.logsBloom + "\n"
  + "transactionsRoot : " + rawBlk.transactionsRoot + "\n"
  + "stateRoot : " + rawBlk.stateRoot + "\n"
  + "miner : " + rawBlk.miner + "\n"
  + "difficulty : " + rawBlk.difficulty + "\n"
  + "totalDifficulty : " + rawBlk.totalDifficulty + "\n"
  + "size : " + rawBlk.size + "\n"
  + "extraData : " + rawBlk.extraData + "\n"
  + "gasLimit : " + rawBlk.gasLimit + "\n"
  + "gasUsed : " + rawBlk.gasUsed + "\n"
  + "timestamp : " + rawBlk.timestamp
  + "```"
  };
};
