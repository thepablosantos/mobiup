import React, { useState } from "react";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);

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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    const contractAddress = "0x7DE2bdbb21409D50C79c9fDB9F653Fc217722b8B";
    const contractABI = [ /* ABI do contrato */ ];

    const votingSystem = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(votingSystem);
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
        </div>
      )}
    </div>
  );
}

export default App;