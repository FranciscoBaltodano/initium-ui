import Link from 'next/link';
import { ModeToggle } from '../theme/ModeToggle';
import { GitCompare } from 'lucide-react';

export default function Navbar({ isProtected = false }) {
  // Definir rutas no protegidas y protegidas
  const nonProtectedRoutes = [
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign Up' }
  ];

  const protectedRoutes = [
    { href: '/home', label: 'Home' },
    { href: '/login', label: 'Logout', onClick: () => { /* Lógica de logout */ } }
  ];

  return (
    <nav className={`z-50 absolute w-full px-10`}>
      <div className="relative flex justify-between md:text-2xl md:mt-7 h-16 items-center">
        <div>
          <Link className='text-2xl flex gap-5 items-center text-gray-600 dark:text-gray-400' 
            href={isProtected ? '/home' : '/'}>
            <p className='md:block hidden'>INITIUM</p>
            <GitCompare size={30} className="text-4xl" />
          </Link>
        </div>

        <div className='flex gap-10'>
          {/* Renderiza rutas no protegidas */}
          {!isProtected && nonProtectedRoutes.map((route) => (
            <Link key={route.href} href={route.href} className="relative p-1 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              {route.label}
            </Link>
          ))}

          {/* Renderiza rutas protegidas */}
          {isProtected && protectedRoutes.map((route) => (
            <Link 
              key={route.href} 
              href={route.href} 
              onClick={route.onClick} 
              className="relative p-1 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              {route.label}
            </Link>
          ))}

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
