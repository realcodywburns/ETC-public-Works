module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!''
  networks: {
    //ganache
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // match any network
      from: "0x5dF260671fE39CcFdAB0a84240a4C8a758267Fa3" //dev account
    },
    kotti:{
      host: "127.0.0.1",
      port: 8556,
      network_id: "6", // match any network
      from: "0x5dF260671fE39CcFdAB0a84240a4C8a758267Fa3" //dev account
    },
    classic: {
      host: "10.0.0.104",
      port: 8545,
      network_id: "61",
      from: "0x9552ae966A8cA4E0e2a182a2D9378506eB057580"
    },
  },
  compilers: {
    solc: {
      version: "0.4.20"
    }
  }
};
