import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { company } = useSiteData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/sobre-nos', label: 'Sobre Nós' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isHomePage
          ? (isScrolled
              ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-1'
              : 'py-2')
          : 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-1'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo - Dgeth Gráfica logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <img 
            src={company.logo_url || '/imgs/logotipos/logo-azul.png'} 
            alt={company.name || 'Dgeth Gráfica'} 
            className="h-14 sm:h-16 md:h-20 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-bold text-sm transition-colors ${
                isActive(link.path)
                  ? 'text-ns-blue'
                  : 'text-foreground/70 hover:text-ns-blue'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/contacto"
            className={`px-5 lg:px-6 py-2.5 font-bold rounded-full transition-all shadow-lg shadow-ns-blue/30 transform hover:-translate-y-0.5 text-sm ${
              isActive('/contacto')
                ? 'bg-ns-dark text-white'
                : 'bg-ns-blue hover:bg-ns-dark text-white'
            }`}
          >
            Fale Connosco
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-ns-blue focus:outline-none p-2"
        >
          {mobileMenuOpen ? (
            <X className="h-7 w-7 sm:h-8 sm:w-8" />
          ) : (
            <Menu className="h-7 w-7 sm:h-8 sm:w-8" />
          )}
        </button>
      </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border py-4 px-4 sm:px-6 flex flex-col gap-3 animate-in slide-in-from-top-2 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold text-left py-3 px-2 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-ns-blue bg-ns-blue/5'
                    : 'text-foreground/70 hover:text-ns-blue hover:bg-ns-blue/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/contacto"
              className="w-full text-center px-6 py-3 bg-ns-blue text-white font-bold rounded-lg shadow-lg mt-2"
            >
              Fale Connosco
            </Link>
          </div>
        )}
    </nav>
  );
};

export default Navbar;
