import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import useGSAP from '@/hooks/useGSAP';
import { animateTitleReveal } from '@/lib/gsapAnimations';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import SEO from '@/components/SEO';

interface PortfolioItem {
  id: string | number;
  title: string;
  category: string;
  image: string;
  destaque: boolean;
  sort_order?: number;
}

const ALL_CATEGORIES = [
  'Todos',
  'Identidade Visual',
  'Brindes Corporativos',
  'Roll Ups e Backdrops',
  'Viaturas',
  'Equipamentos Desportivos',
  'Sublimação',
  'Outros'
];

const FALLBACK_PROJECTS: PortfolioItem[] = [
  // ── Brindes Corporativos ──────────────────────────────────────────────────
  { id: 1,  title: 'TECSEP Kit Corporativo',    category: 'Brindes Corporativos',      image: "/imgs/portifolio/port%20(1).jpg",  destaque: true  },
  { id: 2,  title: 'Cadernos TPA',              category: 'Brindes Corporativos',      image: "/imgs/portifolio/port%20(2).jpg",  destaque: false },
  { id: 3,  title: 'Kit AGT',                   category: 'Brindes Corporativos',      image: "/imgs/portifolio/port%20(3).jpg",  destaque: true  },
  { id: 6,  title: 'Cordões Continental',       category: 'Brindes Corporativos',      image: "/imgs/portifolio/port%20(6).jpg",  destaque: false },
  { id: 7,  title: 'Cadernos Women',            category: 'Brindes Corporativos',      image: "/imgs/portifolio/port%20(7).jpg",  destaque: false },
  // ── Sublimação ────────────────────────────────────────────────────────────
  { id: 5,  title: 'Camisetas BIC',             category: 'Sublimação',                image: "/imgs/portifolio/port%20(5).jpg",  destaque: true  },
  { id: 8,  title: 'Sublimação Corporativa',    category: 'Sublimação',                image: "/imgs/portifolio/port%20(8).jpg",  destaque: false },
  { id: 10, title: 'Camisetas Personalizadas',  category: 'Sublimação',                image: "/imgs/portifolio/port%20(10).jpg", destaque: false },
  { id: 11, title: 'Kit Desportivo',            category: 'Sublimação',                image: "/imgs/portifolio/port%20(11).jpg", destaque: false },
  // ── Outros ────────────────────────────────────────────────────────────────
  { id: 4,  title: 'Stands Mô Jogos',           category: 'Outros',                    image: "/imgs/portifolio/port%20(4).jpg",  destaque: false },
  { id: 9,  title: 'Produção Gráfica',          category: 'Outros',                    image: "/imgs/portifolio/port%20(9).jpg",  destaque: false },
  { id: 12, title: 'Projecto Gráfico',          category: 'Outros',                    image: "/imgs/portifolio/port%20(12).jpg", destaque: false },
  { id: 14, title: 'Material Publicitário',     category: 'Outros',                    image: "/imgs/portifolio/port%20(14).jpg", destaque: false },
];

const Portfolio = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const portfolioTitleRef = useRef<HTMLHeadingElement>(null);

  // Buscar itens do portfólio no Supabase
  const { data: dbProjects } = useQuery<PortfolioItem[]>({
    queryKey: ['portfolio_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const displayProjects = dbProjects && dbProjects.length > 0 ? dbProjects : FALLBACK_PROJECTS;

  // Efeito 1: title reveal
  useGSAP(() => {
    animateTitleReveal(portfolioTitleRef.current);
  }, []);

  // Calcular quais categorias têm 4 ou mais items
  const categoryCounts = displayProjects.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const visibleCategories = ALL_CATEGORIES.filter(
    cat => cat === 'Todos' || (categoryCounts[cat] && categoryCounts[cat] >= 4)
  );

  const filteredProjects = activeCategory === 'Todos' 
    ? displayProjects 
    : displayProjects.filter(p => p.category === activeCategory);

  // Fechar lightbox no ESC e navegar com setas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (e.key === 'Escape') setSelectedIndex(null);
        if (e.key === 'ArrowRight') setSelectedIndex((prev) => prev !== null && prev < filteredProjects.length - 1 ? prev + 1 : prev);
        if (e.key === 'ArrowLeft') setSelectedIndex((prev) => prev !== null && prev > 0 ? prev - 1 : prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredProjects.length]);

  return (
    <>
      <SEO
        pagePath="/portfolio"
        defaultTitle="Portfólio — Dgeth Gráfica"
        defaultDescription="Explore os nossos projetos de design, brindes corporativos e comunicação visual."
      />
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
            className={`mb-12 scroll-animate-init reveal-up ${headerVisible ? 'animate-active' : ''}`}
          >
            <span className="block text-ns-blue font-bold tracking-[0.2em] text-sm mb-4 uppercase">
              Nosso Portfólio
            </span>
            <h2
              ref={portfolioTitleRef}
              className="text-5xl md:text-7xl font-display font-black text-foreground leading-[0.9]"
            >
              Conheça o nosso <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ns-blue to-ns-cyan italic font-serif font-light pr-4">
                trabalho.
              </span>
            </h2>
          </div>

          {/* Filters and Count */}
          <div className="mb-12">
            {/* Scrollable Filters */}
            <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-6 w-full">
              {visibleCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-ns-blue border-ns-blue text-white shadow-md'
                      : 'bg-transparent border-border/60 text-muted-foreground hover:bg-ns-blue/10 hover:text-ns-blue hover:border-ns-blue/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dynamic Count */}
            <p className="text-muted-foreground font-medium text-sm md:text-base border-b border-border/50 pb-4">
              {activeCategory === 'Todos' ? (
                <>{filteredProjects.length} projectos</>
              ) : (
                <><span className="text-foreground font-bold">{activeCategory}</span> — {filteredProjects.length} projectos</>
              )}
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {filteredProjects.length === 0 ? (
               <div className="py-20 text-center text-muted-foreground break-inside-avoid">
                 <p>Imagens para esta categoria serão adicionadas brevemente.</p>
               </div>
            ) : (
              filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedIndex(index)}
                  className={`portfolio-item-card group relative overflow-hidden bg-muted cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1 break-inside-avoid scroll-animate-init reveal-up ${headerVisible ? 'animate-active' : ''}`}
                  style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                >
                  <div className="card-content">
                    {/* Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 block"
                      loading="lazy"
                    />

                    {/* Badge Destaque */}
                    {project.destaque && (
                      <div className="absolute top-4 left-4 bg-ns-blue text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 shadow-md z-10">
                        Destaque
                      </div>
                    )}

                    {/* Overlay Hover (Desktop) / Always visible (Mobile) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 pointer-events-none">
                      <h4 className="text-white drop-shadow-md font-display font-bold text-lg sm:text-xl">
                        {project.title}
                      </h4>
                      <span className="text-white/80 text-xs sm:text-sm font-medium mt-1">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
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

        {/* Lightbox Modal */}
        {selectedIndex !== null && (
          <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Botão Fechar */}
            <button 
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/50 hover:text-white transition-colors z-50 p-2 bg-black/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Botão Anterior */}
            {selectedIndex > 0 && (
              <button 
                className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2 sm:p-4 bg-black/20 hover:bg-black/40 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(selectedIndex - 1);
                }}
              >
                <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" />
              </button>
            )}

            {/* Imagem */}
            <div className="relative max-w-[95vw] max-h-[90vh] flex items-center justify-center pointer-events-none" onClick={(e) => e.stopPropagation()}>
              <img 
                src={filteredProjects[selectedIndex].image} 
                alt={filteredProjects[selectedIndex].title} 
                className="max-w-full max-h-[85vh] object-contain shadow-2xl animate-in zoom-in-95 duration-300 pointer-events-auto"
              />
              <div className="absolute -bottom-10 left-0 right-0 text-center pointer-events-none">
                 <p className="text-white/80 text-sm">
                   {filteredProjects[selectedIndex].title} <span className="opacity-50 mx-2">|</span> {filteredProjects[selectedIndex].category}
                 </p>
              </div>
            </div>

            {/* Botão Seguinte */}
            {selectedIndex < filteredProjects.length - 1 && (
              <button 
                className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-50 p-2 sm:p-4 bg-black/20 hover:bg-black/40 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(selectedIndex + 1);
                }}
              >
                <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12" />
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Portfolio;
