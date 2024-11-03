// Exemplo de como interagir com o contrato VotingSystem
const hre = require("hardhat");

async function main() {
    // Endereço do contrato deployado
    const contractAddress = "0x7DE2bdbb21409D50C79c9fDB9F653Fc217722b8B";

    // Conecta ao contrato
    const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
    const votingSystem = await VotingSystem.attach(contractAddress);

    // Exemplo de interações

    // Registrar um candidato
    console.log("Registrando um candidato...");
    const tx1 = await votingSystem.registerCandidate("Candidato 1");
    await tx1.wait();

    // Votar em um candidato (índice 0)
    console.log("Votando no primeiro candidato...");
    const tx2 = await votingSystem.vote(0);
    await tx2.wait();

    // Obter resultados da votação
    const [winner, voteCount] = await votingSystem.results();
    console.log("Vencedor:", winner);
    console.log("Número de votos:", voteCount.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
