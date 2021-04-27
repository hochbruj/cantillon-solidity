// test-environment.config.js
const { infuraApiKey } = require("./secrets.json");

module.exports = {
  node: {
    // Options passed directly to Ganache client
    fork: `https://kovan.infura.io/v3/${infuraApiKey}`, // An url to Ethereum node to use as a source for a fork
    unlocked_accounts: ["0xd55Cb79D6242dE896bbd9526e57A66f72Aa45Ea4"],
    id: 999, // Array of addresses specifying which accounts should be unlocked.
  },
  // node: {
  //   // Options passed directly to Ganache client
  //   fork: `https://mainnet.infura.io/v3/${infuraApiKey}`, // An url to Ethereum node to use as a source for a fork
  //   unlocked_accounts: ["0xd55Cb79D6242dE896bbd9526e57A66f72Aa45Ea4"],
  //   id: 999, // Array of addresses specifying which accounts should be unlocked.
  // },
};
