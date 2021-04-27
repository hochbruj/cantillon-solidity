// const {
//   balance,
//   BN, // Big Number support
//   constants, // Common constants, like the zero address and largest integers
//   expectEvent, // Assertions for emitted events
//   expectRevert, // Assertions for transactions that should fail
// } = require("@openzeppelin/test-helpers");

// const { accounts, contract, web3 } = require("@openzeppelin/test-environment");

// const { expect } = require("chai");

// const PortfolioBalancerV2 = contract.fromArtifact("PortfolioBalancerV2");

// const user1 = "0xd55Cb79D6242dE896bbd9526e57A66f72Aa45Ea4";

// let minABI = [
//   // balanceOf
//   {
//     constant: true,
//     inputs: [{ name: "_owner", type: "address" }],
//     name: "balanceOf",
//     outputs: [{ name: "balance", type: "uint256" }],
//     type: "function",
//   },
//   // decimals
//   {
//     constant: true,
//     inputs: [],
//     name: "decimals",
//     outputs: [{ name: "", type: "uint8" }],
//     type: "function",
//   },
// ];

// const PAXGAddress = "0x45804880De22913dAFE09f4980848ECE6EcbAf78";
// const aUSDCAddress = "0xBcca60bB61934080951369a648Fb03DF4F96263C";
// const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
// const WBTCAddress = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
// const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
// const aaveAddressProvider = "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5";

// let owner;

// describe("PortfolioBalancer", function () {
//   [owner] = accounts;

//   beforeEach(async function () {
//     try {
//       this.PortfolioBalancer = await PortfolioBalancerV2.new(
//         WETHAddress,
//         USDCAddress,
//         aaveAddressProvider,
//         {
//           from: owner,
//         }
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   it("should set the owner", async function () {
//     expect(await this.PortfolioBalancer.owner()).to.equal(owner);
//   });

//   it("should exchange some WBTC, USDC and PAXG for ETH", async function () {
//     const balBefore = await balance.current(user1);
//     console.log("ETH balance before", balBefore.toString(10));

//     let WBTC = new web3.eth.Contract(minABI, WBTCAddress);
//     let balWBTCBefore = await WBTC.methods.balanceOf(user1).call();
//     console.log("WBTC balance before", balWBTCBefore);

//     let USDC = new web3.eth.Contract(minABI, aUSDCAddress);
//     let balUSDCBefore = await USDC.methods.balanceOf(user1).call();
//     console.log("aUSDC balance before", balUSDCBefore);

//     let PAXG = new web3.eth.Contract(minABI, PAXGAddress);
//     let balPAXGBefore = await PAXG.methods.balanceOf(user1).call();
//     console.log("PAXG balance before", balPAXGBefore);
//     try {
//       const receipt = await this.PortfolioBalancer.rebalance(
//         [PAXGAddress, WBTCAddress, USDCAddress],
//         ["10000000000000000", "10000000000000000", "10000000000000000"],
//         ["0", "0", "0"],
//         { from: user1, value: 30000000000000000 }
//       );
//       console.log(`GasUsed: ${receipt.receipt.gasUsed}`);
//     } catch (err) {
//       console.log("error", err);
//     }
//     let balAfter = await web3.eth.getBalance(user1);
//     console.log("ETH balance after", balAfter);

//     balUSDCAfter = await USDC.methods.balanceOf(user1).call();
//     console.log("aUSDC balance after", balUSDCAfter);

//     balPAXGAfter = await PAXG.methods.balanceOf(user1).call();
//     console.log("PAXG balance after", balPAXGAfter);

//     balWBTCAfter = await WBTC.methods.balanceOf(user1).call();
//     console.log("WBTC balance after", balWBTCAfter);

//     expect(balBefore).to.be.bignumber.above(
//       new BN(balAfter),
//       "ETH amount not less"
//     );
//     expect(balUSDCAfter).to.be.bignumber.above(
//       new BN(balUSDCBefore),
//       "aUSDC amount not more"
//     );
//   });
// });
