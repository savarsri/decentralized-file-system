const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.deployed();

  console.log("Upload contract deployed to:", upload.address);
}

// Run the main function and handle errors
main()
  .then(() => {
    console.log("Deployment successful!");
  })
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
  });
