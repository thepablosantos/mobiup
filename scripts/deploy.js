const hre = require("hardhat");

async function main() {
  const currentTimestamp = Math.floor(Date.now() / 1000); // timestamp atual em segundos
  const votingStart = currentTimestamp;
  const votingEnd = currentTimestamp + (7 * 24 * 60 * 60); // 7 dias a partir de agora

  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.deploy(votingStart, votingEnd);

  await votingSystem.deployed();

  console.log("VotingSystem deployed to:", votingSystem.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});