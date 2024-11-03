const hre = require("hardhat");

async function main() {
  // Endereço do contrato deployado
  const contractAddress = "0x7DE2bdbb21409D50C79c9fDB9F653Fc217722b8B";
  
  // Conecta ao contrato
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(contractAddress);

  // Exemplos de interações
  
  // 1. Adicionar uma proposta
  console.log("Adicionando uma proposta...");
  const tx1 = await votingSystem.addProposal("Proposta 1: Implementar novo recurso");
  await tx1.wait();
  
  // 2. Obter o número total de propostas
  const totalProposals = await votingSystem.getProposalsCount();
  console.log("Número total de propostas:", totalProposals.toString());
  
  // 3. Votar em uma proposta (índice 0)
  console.log("Votando na primeira proposta...");
  const tx2 = await votingSystem.vote(0, true); // true para aprovar, false para rejeitar
  await tx2.wait();
  
  // 4. Obter resultado da votação
  const proposal = await votingSystem.proposals(0);
  console.log("Votos a favor:", proposal.votesFor.toString());
  console.log("Votos contra:", proposal.votesAgainst.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });