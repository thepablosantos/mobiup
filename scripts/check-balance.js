const { ethers } = require("hardhat");

async function main() {
  // Substitua pelo seu endereço da carteira
  const address = "0x53bf7cf96a431d23B974F2884c5AC97F88c6785B";

  // Obtém o saldo em Wei
  const balance = await ethers.provider.getBalance(address);

  // Converte o saldo de Wei para Ether
  console.log(`Saldo de ${address}:`, ethers.utils.formatEther(balance), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
