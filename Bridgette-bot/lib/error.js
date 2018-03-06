module.exports = (channelID, err) => {
  return {
    to: channelID,
    message: "Oops: " + err
  };
};
