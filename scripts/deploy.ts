import { ethers } from "hardhat";

async function main() {
  console.log("Deploying LockAndLoadSponsors contract...");

  // Get the contract factory
  const LockAndLoadSponsors = await ethers.getContractFactory("LockAndLoadSponsors");

  // Deploy the contract with a verifier address (you can change this to your verifier address)
  const verifierAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual verifier address
  
  const lockAndLoadSponsors = await LockAndLoadSponsors.deploy(verifierAddress);

  await lockAndLoadSponsors.waitForDeployment();

  const contractAddress = await lockAndLoadSponsors.getAddress();
  
  console.log("LockAndLoadSponsors deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    network: "sepolia",
    timestamp: new Date().toISOString(),
    deployer: await ethers.getSigners().then(signers => signers[0].address)
  };
  
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
