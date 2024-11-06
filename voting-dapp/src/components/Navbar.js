import React from 'react';

const Navbar = ({ contractAddress }) => {
    return (
        <nav className="navbar">
            <div className="navbar-items">
                <a href="#register">Registrar Candidato</a>
                <a href="#candidates">Mostrar Candidatos</a>
                <a href="#results">Resultados</a>
                <button className="connect-wallet">Conectar Wallet</button>
            </div>
        </nav>
    );
};

export default Navbar;