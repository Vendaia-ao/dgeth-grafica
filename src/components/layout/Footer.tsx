import { Link } from 'react-router-dom';
import { MapPin, Mail, Clock } from 'lucide-react';
import { useSiteData } from '@/context/SiteDataContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { company, contacts } = useSiteData();

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden z-20">
      {/* Subtle Background Animation */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ns-blue blur-[150px] rounded-full animate-pulse-slow mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ns-cyan blur-[150px] rounded-full mix-blend-screen opacity-50" />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 bg-slate-950/50 backdrop-blur-sm pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
            {/* Coluna 1: Marca + Redes Sociais */}
            <div className="lg:col-span-5 space-y-6">
              <Link to="/" className="flex items-center gap-3 group w-fit">
                <img 
                  src={company.logo_branco_url || '/imgs/logotipos/logo-branco.png'} 
                  alt={company.name || 'Dgeth Gráfica'} 
                  className="h-20 w-auto object-contain"
                />
              </Link>
              <p className="text-xl text-slate-400 font-light max-w-sm leading-relaxed">
                {company.slogan || 'A solução completa para a comunicação e imagem do seu negócio.'}
              </p>

              {/* Redes Sociais */}
              <div className="flex gap-3 pt-2">
                {/* Facebook */}
                <a
                  href={contacts.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                {/* Instagram — ícone oficial */}
                <a
                  href={contacts.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:via-[#dc2743] hover:via-[#cc2366] hover:to-[#bc1888] hover:text-white transition-all duration-300 hover:scale-110"
                  style={{ background: undefined }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';
                    (e.currentTarget as HTMLElement).style.color = 'white';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = '';
                    (e.currentTarget as HTMLElement).style.color = '';
                  }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href={contacts.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-black hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.39-3.16-3.8-5.46-.4-2.08-.06-4.24 1.12-5.95 1.15-1.7 3.16-2.82 5.03-3.1 1.25-.19 2.53-.16 3.75.2v4.02c-.89-.25-1.84-.31-2.73-.09-1.25.32-2.31 1.28-2.61 2.59-.28 1.25.12 2.58.98 3.51 1.07 1.15 2.85 1.58 4.29.98 1.3-.54 2.21-1.78 2.37-3.18.06-.52.05-1.04.05-1.56V.02z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Coluna 2: Navegação */}
            <div className="lg:col-span-3 lg:pl-8">
              <h4 className="text-ns-blue font-bold uppercase tracking-widest text-xs mb-8">Menu</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-lg text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/servicos" className="text-lg text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                    O Que Fazemos
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="text-lg text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                    Portfólio
                  </Link>
                </li>
                <li>
                  <Link to="/sobre-nos" className="text-lg text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                    A Empresa
                  </Link>
                </li>
                <li>
                  <Link to="/contacto" className="text-lg text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
                    Contactos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Contactos */}
            <div className="lg:col-span-4">
              <h4 className="text-ns-blue font-bold uppercase tracking-widest text-xs mb-8">Fale Connosco</h4>
              <ul className="space-y-6">
                <li>
                  <a
                    href={contacts.whatsapp_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">WhatsApp</p>
                      <p className="text-white font-bold group-hover:text-ns-blue transition-colors">{contacts.phone}</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                    <p className="text-white font-bold">{contacts.email}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Localização</p>
                    <p className="text-white font-bold">{contacts.address}</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Horário</p>
                    <p className="text-white font-bold">{contacts.working_hours}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="relative z-10 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-sm font-medium flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
            <span>© {currentYear} Dgeth Gráfica. Todos os direitos reservados.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <Link to="/politica-de-privacidade" className="hover:text-ns-blue transition-colors duration-300 font-semibold">
              Política de Privacidade
            </Link>
          </p>
          <p className="text-slate-600 text-xs font-medium">
            Desenvolvido por{' '}
            <a
              href="https://vendaia.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-ns-blue transition-colors duration-300 font-semibold"
            >
              Vendaia Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
