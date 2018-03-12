module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!''
networks: {
  development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // match any network
    },
    classic: {
      host: "10.0.0.104",
      port: 8545,
      network_id: "61",
      from: "0x9552ae966A8cA4E0e2a182a2D9378506eB057580"
    }
  }
};
