// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract VotingSystem {

    // Structure to store information about candidates
    struct Candidate {
        string name;
        uint votes;
    }

    // Array of candidates
    Candidate[] public candidates;

    // Mapping to track if an address has already voted
    mapping(address => bool) public hasVoted;

    // Address of the contract owner
    address public owner;

    // Variables to define the voting period
    uint public votingStart;
    uint public votingEnd;

    // Constructor to set the owner and the voting period
    constructor(uint _votingStart, uint _votingEnd) {
        require(_votingEnd > _votingStart, "Invalid voting period");
        owner = msg.sender;
        votingStart = _votingStart;
        votingEnd = _votingEnd;
    }

    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can register candidates");
        _;
    }

    // Modifier to allow voting only during the voting period
    modifier duringVotingPeriod() {
        require(block.timestamp >= votingStart && block.timestamp <= votingEnd, "Voting is not allowed outside the voting period");
        _;
    }

    // Function to register a new candidate
    function registerCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate(_name, 0));
    }

    // Function to vote for a candidate, allowed only during the voting period
    function vote(uint _index) public duringVotingPeriod {
        require(!hasVoted[msg.sender], "You have already voted");
        require(_index < candidates.length, "Invalid candidate");

        hasVoted[msg.sender] = true; // Marks that the voter has voted
        candidates[_index].votes++; // Adds a vote to the candidate
    }

    // Function to view the voting results, allowed only after the voting period has ended
    function results() public view returns (string memory winner, uint voteCount) {
        require(block.timestamp > votingEnd, "Results are available only after the voting period has ended");

        uint highestVotes = 0;
        uint winningIndex;

        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].votes > highestVotes) {
                highestVotes = candidates[i].votes;
                winningIndex = i;
            }
        }

        return (candidates[winningIndex].name, highestVotes);
    }

    // Function to remove a candidate by index
    function removeCandidate(uint _index) public onlyOwner {
        require(_index < candidates.length, "Invalid candidate index");

        // Replace the candidate to be removed with the last candidate
        candidates[_index] = candidates[candidates.length - 1];
        candidates.pop(); // Remove the last candidate (which is now a duplicate)
    }
} // ola