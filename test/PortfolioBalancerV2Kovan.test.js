const {
  balance,
  BN, // Big Number support
  constants, // Common constants, like the zero address and largest integers
  expectEvent, // Assertions for emitted events
  expectRevert, // Assertions for transactions that should fail
} = require("@openzeppelin/test-helpers");

const { accounts, contract, web3 } = require("@openzeppelin/test-environment");

const { expect } = require("chai");

const PortfolioBalancerV2 = contract.fromArtifact("PortfolioBalancerV2");

const user1 = "0xd55Cb79D6242dE896bbd9526e57A66f72Aa45Ea4";

let minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // decimals
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];
const PMGTAddress = "0x7Ac060f34f52299f793E6B04B26cCCBEeB01a6dD";
const aUSDCAddress = "0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0";
const USDCAddress = "0xe22da380ee6B445bb8273C81944ADEB6E8450422";
const WBTCAddress = "0x967461bf547Cc7Faa454c3b817227dc68bf4EDBe";
const WETHAddress = "0xd0a1e359811322d97991e03f863a0c30c2cf029c";
const aaveAddressProvider = "0x88757f2f99175387aB4C6a4b3067c77A695b0349";

let owner;

describe("PortfolioBalancer", function () {
  [owner] = accounts;

  beforeEach(async function () {
    try {
      this.PortfolioBalancer = await PortfolioBalancerV2.new(
        WETHAddress,
        USDCAddress,
        aaveAddressProvider,
        {
          from: owner,
        }
      );
    } catch (err) {
      console.log(err);
    }
  });

  it("should set the owner", async function () {
    expect(await this.PortfolioBalancer.owner()).to.equal(owner);
  });

  it("should exchange some WBTC, USDC and PMGT for ETH", async function () {
    const balBefore = await balance.current(user1);
    console.log("ETH balance before", balBefore.toString(10));

    let WBTC = new web3.eth.Contract(minABI, WBTCAddress);
    let balWBTCBefore = await WBTC.methods.balanceOf(user1).call();
    console.log("WBTC balance before", balWBTCBefore);

    let USDC = new web3.eth.Contract(minABI, aUSDCAddress);
    let balUSDCBefore = await USDC.methods.balanceOf(user1).call();
    console.log("aUSDC balance before", balUSDCBefore);

    let PMGT = new web3.eth.Contract(minABI, PMGTAddress);
    let balPMGTBefore = await PMGT.methods.balanceOf(user1).call();
    console.log("PMGT balance before", balPMGTBefore);
    try {
      const receipt = await this.PortfolioBalancer.rebalance(
        [PMGTAddress, WBTCAddress, USDCAddress],
        ["10000000000000000", "10000000000000000", "10000000000000000"],
        ["0", "0", "0"],
        { from: user1, value: 30000000000000000 }
      );
      console.log(`GasUsed: ${receipt.receipt.gasUsed}`);
    } catch (err) {
      console.log("error", err);
    }
    let balAfter = await web3.eth.getBalance(user1);
    console.log("ETH balance after", balAfter);

    balUSDCAfter = await USDC.methods.balanceOf(user1).call();
    console.log("aUSDC balance after", balUSDCAfter);

    balPMGTAfter = await PMGT.methods.balanceOf(user1).call();
    console.log("PMGT balance after", balPMGTAfter);

    balWBTCAfter = await WBTC.methods.balanceOf(user1).call();
    console.log("WBTC balance after", balWBTCAfter);

    expect(balBefore).to.be.bignumber.above(
      new BN(balAfter),
      "ETH amount not less"
    );
    expect(balUSDCAfter).to.be.bignumber.above(
      new BN(balUSDCBefore),
      "aUSDC amount not more"
    );
  });
});
