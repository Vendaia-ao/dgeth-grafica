import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Import portfolio images
import coposPersonalizados from '@/assets/portfolio/copos-personalizados.jpg';
import materialCorporativo from '@/assets/portfolio/material-corporativo.jpg';
import cadernosTpa from '@/assets/portfolio/cadernos-tpa.jpg';
import kitAgt from '@/assets/portfolio/kit-agt.jpg';
import camisetasBic from '@/assets/portfolio/camisetas-bic.jpg';
import cordoesContinental from '@/assets/portfolio/cordoes-continental.jpg';
import cadernosWomen from '@/assets/portfolio/cadernos-women.jpg';
import standsMojogos from '@/assets/portfolio/stands-mojogos.jpg';

const projects = [
  {
    id: 1,
    title: 'Material Corporativo',
    category: 'Branding',
    image: materialCorporativo,
    client: 'TECSEP',
  },
  {
    id: 2,
    title: 'Cadernos Personalizados',
    category: 'Editorial',
    image: cadernosTpa,
    client: 'TPA',
  },
  {
    id: 3,
    title: 'Kit Corporativo',
    category: 'Embalagem',
    image: kitAgt,
    client: 'AGT',
  },
  {
    id: 4,
    title: 'Camisetas Personalizadas',
    category: 'Branding',
    image: camisetasBic,
    client: 'BIC',
  },
  {
    id: 5,
    title: 'Stands Promocionais',
    category: 'Sinalização',
    image: standsMojogos,
    client: 'Mô Jogos',
  },
  {
    id: 6,
    title: 'Cordões Personalizados',
    category: 'Branding',
    image: cordoesContinental,
    client: 'Continental',
  },
  {
    id: 7,
    title: 'Cadernos Premium',
    category: 'Editorial',
    image: cadernosWomen,
    client: 'Women',
  },
  {
    id: 8,
    title: 'Copos Personalizados',
    category: 'Embalagem',
    image: coposPersonalizados,
    client: 'Cliente Premium',
  },
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
