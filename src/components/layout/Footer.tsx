import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
            {/* Coluna 1: Marca */}
            <div className="lg:col-span-5 space-y-6">
              <Link to="/" className="flex items-center gap-3 group w-fit">
                <img 
                  src="/dgeth-favicon.png" 
                  alt="Dgeth Gráfica" 
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-xl text-slate-400 font-light max-w-sm leading-relaxed">
                A solução completa para a comunicação e imagem do seu negócio. Design, impressão e personalização com qualidade.
              </p>
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
                  <Link to="/a-empresa" className="text-lg text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block">
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
                    href="https://wa.me/244944974378"
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
                      <p className="text-white font-bold group-hover:text-ns-blue transition-colors">944 974 378</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                    <p className="text-white font-bold">gdethgrafica@gmail.com</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Localização</p>
                    <p className="text-white font-bold">Luanda, Angola</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Social */}
      <div className="relative z-10 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-medium">
            © {currentYear} Dgeth Gráfica. Todos os direitos reservados.
          </p>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/dgeth_grafica/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-slate-400 hover:bg-ns-pink hover:text-white transition-all duration-300"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.03 2 12.48 2h-.165zm-2.34 3a2 2 0 110 4 2 2 0 010-4zm4.965 2a4.965 4.965 0 01-4.965 4.965A4.965 4.965 0 015 12a4.965 4.965 0 014.965-4.965A4.965 4.965 0 0114.94 7z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
