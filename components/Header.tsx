import Link from 'next/link';

function Header() {
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/usluge" className="hover:text-gray-600 transition-colors">
                Usluge
              </Link>
            </li>
            <li>
              <Link href="/projekti" className="hover:text-gray-600 transition-colors">
                Projekti
              </Link>
            </li>
            <li>
              <Link href="/kontakt" className="hover:text-gray-600 transition-colors">
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;