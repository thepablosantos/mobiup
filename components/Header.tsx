import Image from 'next/image';
import Link from 'next/link';
import ConnectButton from './ConnectButton';
import NavLink from './NavLink';

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={40} 
            height={40} 
          />
          <span className="ml-2 text-xl font-bold text-white">CryptoVote</span>
        </div>
        
        {/* Menu central */}
        <div className="hidden md:flex space-x-6">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/candidates">Candidatos</NavLink>
          <NavLink href="/vote">Votar</NavLink>
        </div>

        {/* Botão Connect Wallet */}
        <ConnectButton 
          className="bg-gradient-bitcoin hover:opacity-90
                     text-white px-6 py-2 rounded-full
                     transition duration-300 shadow-bitcoin"
        />
      </nav>
    </header>
  )
}

export default Header; //