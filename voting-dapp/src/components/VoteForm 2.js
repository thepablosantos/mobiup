import React, { useState } from 'react';
import Web3 from 'web3';
import VotingSystem from '../VotingSystem.json'; // ABI do seu contrato

const VoteForm = ({ candidates }) => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const loadBlockchainData = async () => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingSystem.networks[networkId]; // Certifique-se de que esta linha está correta

        if (!deployedNetwork) {
            console.error("Contrato não encontrado na rede:", networkId);
            return;
        }

        const contract = new web3.eth.Contract(VotingSystem.abi, deployedNetwork.address);

        return contract;
    };

    const handleVote = async () => {
        const contract = await loadBlockchainData();
        const accounts = await contract.methods.getAccounts();

        await contract.methods.vote(selectedCandidate).send({ from: accounts[0] });
        alert('Voto registrado!');
    };

    return (
        <div className="vote-form">
            <h2>Vote em um Candidato</h2>
            <select onChange={(e) => setSelectedCandidate(e.target.value)}>
                <option value="">Selecione um candidato</option>
                {candidates.map((candidate, index) => (
                    <option key={index} value={index}>{candidate.name}</option>
                ))}
            </select>
            <button onClick={handleVote}>Votar</button>
        </div>
    );
};

export default VoteForm;