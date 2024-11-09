import React from 'react';

const CandidateList = ({ candidates }) => {
    return (
        <div className="candidate-list">
            <h2>Candidatos</h2>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index}>
                        {candidate.name} - Votos: {candidate.votes}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateList;

//