import { NavLink } from "@remix-run/react"
import { Link } from 'react-aria-components';

import { useState } from 'react';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

function NavItem({ href, children }: NavItemProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) => `text-sm font-semibold relative inline-block group
        ${isActive
          ? "text-blue-600"
          : "text-gray-600"
        }`
      }
    >
      {children}
      <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-600 scale-x-0 transition-transform duration-200 ease-in-out group-hover:scale-x-100" />
    </NavLink>
  )
}

export default function NavBar() {
  const [hasAccess, setHasAccess] = useState<boolean>(false);

  return (
    <header className="bg-white border-b border-gray-300">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-sm font-semibold leading-6 text-gray-900">
            SomeoneNow
          </Link>
        </div>

        {/* Menu principal para telas grandes */}
        <div className="hidden lg:flex lg:gap-x-12">
          <NavItem href='/'>Encontrar alguém</NavItem>
          <NavItem href='/posts/new'>Anunciar</NavItem>
          <NavItem href='/notifications'>Notificações</NavItem>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavItem href={!hasAccess ? '/login' : '/logout'}>
            {!hasAccess ? 'Log in' : 'Logout'}
            <span aria-hidden="true">&rarr;</span>
          </NavItem>
        </div>
      </nav>
    </header>
  )
}
