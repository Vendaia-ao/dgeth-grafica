import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const projects = [
  { id: 1, title: 'Material Corporativo', category: 'Branding', image: "/dgueth/img1.jpeg", client: 'TECSEP' },
  { id: 2, title: 'Cadernos Personalizados', category: 'Editorial', image: "/dgueth/img2.png", client: 'TPA' },
  { id: 3, title: 'Kit Corporativo', category: 'Embalagem', image: "/dgueth/img3.png", client: 'AGT' },
  { id: 4, title: 'Camisetas Personalizadas', category: 'Branding', image: "/dgueth/img4.png", client: 'BIC' },
  { id: 5, title: 'Stands Promocionais', category: 'Sinalização', image: "/dgueth/img5.png", client: 'Mô Jogos' },
  { id: 6, title: 'Cordões Personalizados', category: 'Branding', image: "/dgueth/img7.png", client: 'Continental' },
  { id: 7, title: 'Cadernos Premium', category: 'Editorial', image: "/dgueth/img8.png", client: 'Women' },
  { id: 8, title: 'Copos Personalizados', category: 'Embalagem', image: "/dgueth/img6.png", client: 'Cliente Premium' },
  { id: 9, title: 'Design de Identidade', category: 'Design', image: "/dgueth/img9.png", client: 'Novo Cliente' },
  { id: 10, title: 'Material Publicitário', category: 'Branding', image: "/dgueth/img10.png", client: 'Luanda Corp' },
  { id: 11, title: 'Brindes Exclusivos', category: 'Brindes', image: "/dgueth/img11.png", client: 'Eventos Pro' },
  { id: 12, title: 'Comunicação Visual', category: 'Sinalização', image: "/dgueth/img12.png", client: 'Shopping Center' },
  { id: 13, title: 'Frota Personalizada', category: 'Frota', image: "/dgueth/img13.png", client: 'Logística SA' },
];

const Portfolio = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="portfolio" className="pt-40 pb-32 relative min-h-screen">
      {/* Dot Texture Background */}
      <div
        className="absolute inset-0 bg-transparent opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(hsl(var(--muted-foreground) / 0.3) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 scroll-animate-init reveal-up ${headerVisible ? 'animate-active' : ''}`}
        >
          <span className="block text-ns-blue font-bold tracking-[0.2em] text-sm mb-4 uppercase">
            Nossa Curadoria
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-black text-foreground leading-[0.9]">
            Onde a técnica <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ns-blue to-ns-cyan italic font-serif font-light pr-4">
              encontra a arte.
            </span>
          </h2>
        </div>

        {/* Simple Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                index === 0 || index === 4 ? 'sm:col-span-2 lg:col-span-2' : ''
              } scroll-animate-init reveal-mask-up ${headerVisible ? 'animate-active' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                <span className="text-xs font-bold uppercase tracking-wider text-ns-cyan mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-sm">
                  {project.client}
                </p>
              </div>

              {/* Default State */}
              <div className="absolute bottom-4 left-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <h4 className="text-white drop-shadow-md font-display font-bold text-lg">
                  {project.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-6">Mostrando seleção de trabalhos recentes</p>
          <Link
            to="/contacto"
            className="inline-block border-b-2 border-foreground text-foreground font-black text-2xl hover:text-ns-blue hover:border-ns-blue transition-colors pb-1"
          >
            Iniciar um projeto similar
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
