import React, { useState } from "react";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidateName, setCandidateName] = useState("");

  // Função para conectar a carteira MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        console.log("Connected:", accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this dApp!");
    }
  };

  // Função para configurar o contrato
  const setupContract = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to use this dApp!");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const contractAddress = "0x7DE2bdbb21409D50C79c9fDB9F653Fc217722b8B";
      const contractABI = [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_votingStart",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_votingEnd",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "candidates",
          "outputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "votes",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "hasVoted",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            }
          ],
          "name": "registerCandidate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "results",
          "outputs": [
            {
              "internalType": "string",
              "name": "winner",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_index",
              "type": "uint256"
            }
          ],
          "name": "vote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "votingEnd",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "votingStart",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];

      const votingSystem = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(votingSystem);
      console.log("Contract setup successfully!");
      console.log("Funções disponíveis:", Object.keys(votingSystem.functions));
    } catch (error) {
      console.error("Error setting up contract:", error);
    }
  };

  // Função para registrar um candidato
  const registerCandidate = async () => {
    if (contract) {
      try {
        const tx = await contract.registerCandidate(candidateName);
        await tx.wait(); // Espera a transação ser confirmada
        alert(`Candidate "${candidateName}" registered successfully!`);
        setCandidateName(""); // Limpa o campo de entrada após o registro
      } catch (error) {
        console.error("Error registering candidate:", error);
        alert("Failed to register candidate.");
      }
    } else {
      alert("Contract is not set up. Please click on 'Setup Contract'.");
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Voting dApp</h1>
      {!currentAccount ? (
        <button className="btn btn-primary" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected Account: {currentAccount}</p>
          <button className="btn btn-success" onClick={setupContract}>
            Setup Contract
          </button>

          {/* Formulário para registrar um candidato */}
          <div className="mt-4">
            <h3>Register a Candidate</h3>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter candidate name"
              className="form-control mb-2"
            />
            <button className="btn btn-primary" onClick={registerCandidate}>
              Register Candidate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
