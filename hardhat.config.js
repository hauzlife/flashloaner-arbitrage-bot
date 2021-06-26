require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const {
  infuraProjectId,
  mnemonic,
  privateKey,
  etherscanApiKey
} = require('./secrets.json');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.5.9",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    local: {
      url: 'http://127.0.0.1:8545',
      accounts: [privateKey]
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraProjectId}`,
      accounts: [privateKey]
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${infuraProjectId}`,
      accounts: [privateKey]
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${infuraProjectId}`,
      accounts: [privateKey]
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraProjectId}`,
      accounts: [privateKey]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${infuraProjectId}`,
      accounts: [privateKey]
    }
  },

  etherscan: {
    apiKey: etherscanApiKey
  },
};