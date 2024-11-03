import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [votingResults, setVotingResults] = useState(null);
  const [loading, setLoading] = useState(false);

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
      console.log("Available functions:", Object.keys(votingSystem.functions));
    } catch (error) {
      console.error("Error setting up contract:", error);
    }
  };

  // Função para registrar um candidato
  const registerCandidate = async () => {
    if (contract) {
      try {
        const tx = await contract.registerCandidate(candidateName);
        await tx.wait();
        alert(`Candidate "${candidateName}" registered successfully!`);
        setCandidateName("");
      } catch (error) {
        console.error("Error registering candidate:", error);
        alert("Failed to register candidate.");
      }
    } else {
      alert("Contract is not set up. Please click on 'Setup Contract'.");
    }
  };

  // Função para buscar candidatos
  const fetchCandidates = async () => {
    if (contract) {
      try {
        setLoading(true);
        let candidatesList = [];
        let index = 0;
        
        while (true) {
          try {
            const candidate = await contract.candidates(index);
            candidatesList.push({
              name: candidate.name,
              votes: candidate.votes.toString(),
              index: index
            });
            index++;
          } catch (error) {
            break;
          }
        }
        
        setCandidates(candidatesList);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Função para votar em um candidato
  const voteForCandidate = async (candidateIndex) => {
    if (contract) {
      try {
        setLoading(true);
        const tx = await contract.vote(candidateIndex);
        await tx.wait();
        alert("Vote registered successfully!");
        await fetchCandidates();
      } catch (error) {
        console.error("Error voting:", error);
        alert("Error voting: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Função para buscar resultados
  const fetchResults = async () => {
    if (contract) {
      try {
        const results = await contract.results();
        setVotingResults({
          winner: results.winner,
          voteCount: results.voteCount.toString()
        });
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    }
  };

  // Função para buscar tempo restante
  const fetchTimeRemaining = async () => {
    if (contract) {
      try {
        const votingEnd = await contract.votingEnd();
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = votingEnd - currentTime;
        
        if (timeLeft > 0) {
          const days = Math.floor(timeLeft / 86400);
          const hours = Math.floor((timeLeft % 86400) / 3600);
          const minutes = Math.floor((timeLeft % 3600) / 60);
          setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
        } else {
          setTimeRemaining("Voting ended");
        }
      } catch (error) {
        console.error("Error fetching remaining time:", error);
      }
    }
  };

  // Efeito para atualizar dados periodicamente
  useEffect(() => {
    if (contract) {
      fetchCandidates();
      fetchTimeRemaining();
      
      const interval = setInterval(() => {
        fetchTimeRemaining();
      }, 60000); // Atualiza a cada minuto

      return () => clearInterval(interval);
    }
  }, [contract]);

  return (
    <div className="voting-container">
      <div className="container">
        <div className="header">
          <h1>Decentralized Voting System</h1>
        </div>
        
        <div className="wallet-section">
          {!currentAccount ? (
            <button className="btn btn-primary connect-button" onClick={connectWallet}>
              <i className="fas fa-wallet me-2"></i>Connect Wallet
            </button>
          ) : (
            <div>
              <div className="account-info">
                <i className="fas fa-user-circle me-2"></i>
                Connected Account: {currentAccount}
              </div>
              <button className="btn btn-success mb-4 connect-button" onClick={setupContract}>
                <i className="fas fa-plug me-2"></i>Setup Contract
              </button>
            </div>
          )}
        </div>

        {timeRemaining && (
          <div className="time-remaining">
            <i className="fas fa-clock me-2"></i>
            Time remaining: {timeRemaining}
          </div>
        )}

        {/* Register Candidates Card */}
        <div className="card">
          <div className="card-header">
            <h3><i className="fas fa-user-plus me-2"></i>Register Candidate</h3>
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control candidate-input"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter candidate name"
              />
              <button 
                className="btn btn-primary"
                onClick={registerCandidate}
                disabled={loading}
              >
                <i className="fas fa-plus-circle me-2"></i>Register
              </button>
            </div>
          </div>
        </div>

        {/* Candidates List Card */}
        <div className="card">
          <div className="card-header">
            <h3><i className="fas fa-list me-2"></i>Candidates</h3>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border loading-spinner" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="list-group">
                {candidates.map((candidate, index) => (
                  <div key={index} className="candidate-list-item list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h5><i className="fas fa-user me-2"></i>{candidate.name}</h5>
                      <small className="text-muted">
                        <i className="fas fa-vote-yea me-2"></i>Votes: {candidate.votes}
                      </small>
                    </div>
                    <button 
                      className="btn btn-outline-primary vote-button"
                      onClick={() => voteForCandidate(index)}
                      disabled={loading}
                    >
                      <i className="fas fa-check-circle me-2"></i>Vote
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Card */}
        <div className="card">
          <div className="card-header">
            <h3><i className="fas fa-trophy me-2"></i>Results</h3>
          </div>
          <div className="card-body results-section">
            <button 
              className="btn btn-info mb-3"
              onClick={fetchResults}
              disabled={loading}
            >
              <i className="fas fa-poll me-2"></i>Check Results
            </button>
            
            {votingResults && (
              <div className="winner-info">
                <h4><i className="fas fa-crown me-2"></i>Winner: {votingResults.winner}</h4>
                <p><i className="fas fa-chart-bar me-2"></i>Total votes: {votingResults.voteCount}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
