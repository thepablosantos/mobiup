import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { VoteIcon, CandidateIcon, UserIcon } from './Icons';

const Hero = () => {
  const [votantes, setVotantes] = useState<string[]>([]);

  useEffect(() => {
    const fetchVotantes = async () => {
      try {
        const wallets = await getVotantes();
        console.log(wallets); // Verifique o que está sendo retornado
        setVotantes(wallets);
      } catch (error) {
        console.error("Erro ao buscar votantes:", error);
      }
    };

    fetchVotantes();
  }, []);

  const getVotantes = async () => {
    // Lógica para interagir com o contrato inteligente e obter as wallets
    // Isso é apenas um exemplo; você precisará implementar a lógica real
    return ["0x123...", "0x456...", "0x789..."]; // Exemplo de wallets
  };

  return (
    <section className="min-h-screen pt-20 bg-neutral-900" role="region">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Votação <span className="text-bitcoin">Descentralizada</span>
          </h1>
          
          <p className="text-neutral-300 text-xl mb-8 max-w-2xl mx-auto">
            Participe do futuro da democracia com votação segura e transparente através da blockchain
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-bitcoin rounded-full text-white font-semibold hover:opacity-90 transition duration-300 shadow-bitcoin">
              Começar a Votar
            </button>
            
            <button className="px-8 py-3 border-2 border-bitcoin text-bitcoin rounded-full font-semibold hover:bg-bitcoin/10 transition duration-300">
              Saiba Mais
            </button>
          </div>
        </div>

        {/* Seção de Votantes */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">Votantes</h2>
          <ul className="text-neutral-300">
            {votantes.map((votante, index) => (
              <li key={index}>{votante}</li>
            ))}
          </ul>
        </div>

        {/* Seção de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <StatCard 
            title="Votos Realizados" 
            value="10,234" 
            icon={<VoteIcon />} 
          />
          <StatCard 
            title="Candidatos" 
            value="42" 
            icon={<CandidateIcon />} 
          />
          <StatCard 
            title="Eleitores Ativos" 
            value="15,742" 
            icon={<UserIcon />} 
          />
        </div>
      </div>
    </section>
  )
}

export default Hero; 