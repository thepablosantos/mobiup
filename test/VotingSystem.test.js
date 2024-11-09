const { expect } = require("chai");

describe("VotingSystem", function () {
    let VotingSystem;
    let votingSystem;
    let owner;
    let addr1;

    before(async () => {
        // Obter o contrato e implantar
        VotingSystem = await ethers.getContractFactory("VotingSystem");
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const votingStart = currentTimestamp;
        const votingEnd = currentTimestamp + (7 * 24 * 60 * 60); // 7 dias a partir de agora
        votingSystem = await VotingSystem.deploy(votingStart, votingEnd);
        await votingSystem.deployed();

        // Registrar candidatos
        await votingSystem.registerCandidate("Candidato 1");
        await votingSystem.registerCandidate("Candidato 2");

        // Obter o endereço do proprietário
        [owner, addr1] = await ethers.getSigners();
    });

    it("deve remover um candidato", async () => {
        // Remover o primeiro candidato
        await votingSystem.removeCandidate(0);

        // Verificar se o primeiro candidato foi removido
        const candidatesCount = await votingSystem.candidates.length;
        expect(candidatesCount).to.equal(1); // Deve haver apenas 1 candidato restante

        // Verificar se o candidato restante é o segundo
        const remainingCandidate = await votingSystem.candidates(0);
        expect(remainingCandidate.name).to.equal("Candidato 2");
    });

    it("deve falhar ao remover um candidato com índice inválido", async () => {
        await expect(votingSystem.removeCandidate(5)).to.be.revertedWith("Invalid candidate index");
    });
});
