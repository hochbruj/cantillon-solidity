// migrations/2_deploy.js
const PortfolioBalancerV2 = artifacts.require("PortfolioBalancerMainV2");

const WETH_KOVAN = "0xd0A1E359811322d97991E03f863a0C30C2cF029C";
const WETH_MAIN = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const USDC_KOVAN = "0xe22da380ee6B445bb8273C81944ADEB6E8450422";
const USDC_MAIN = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

module.exports = async function (deployer, network) {
  //await deployer.deploy(PMGTToken, 100000000000);
  await deployer.deploy(PortfolioBalancerV2);
};
