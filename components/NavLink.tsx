import Link from 'next/link'

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link 
      href={href}
      className="text-neutral-300 hover:text-white hover:text-bitcoin transition duration-300"
    >
      {children}
    </Link>
  )
}

export default NavLink;