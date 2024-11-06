import React from 'react';

const Results = ({ candidates }) => {
    const winner = candidates.reduce((prev, current) => (prev.votes > current.votes) ? prev : current);

    return (
        <div className="results">
            <h2>Resultados</h2>
            <p>Vencedor: {winner.name} com {winner.votes} votos</p>
        </div>
    );
};

export default Results;