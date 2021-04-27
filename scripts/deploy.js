// scripts/deploy.js
async function main() {
    // We get the contract to deploy
    const PMGTToken = await ethers.getContractFactory("PMGTToken");
    console.log("Deploying PMGTToken...");
    const pmgt = await PMGTToken.deploy();
    await pmgt.deployed();
    console.log("MGTToken deployed to:", pmgt.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });