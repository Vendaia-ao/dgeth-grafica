import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import useGSAP from '@/hooks/useGSAP';
import { animateTitleReveal, animateCardReveal, animateStatCounters } from '@/lib/gsapAnimations';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import SEO from '@/components/SEO';
import { useSiteData } from '@/context/SiteDataContext';

// Images are now referenced directly in the components

// Floating animated shapes component
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Geometric shapes */}
      <div className="absolute top-[15%] left-[8%] w-16 h-16 md:w-24 md:h-24 animate-float-slow">
        <div className="w-full h-full border-2 border-ns-blue/30 rotate-45 animate-spin-very-slow" />
      </div>
      
      <div className="absolute top-[25%] right-[12%] w-12 h-12 md:w-20 md:h-20 animate-float-delayed">
        <div className="w-full h-full rounded-full border-2 border-ns-cyan/40 animate-pulse-slow" />
      </div>
      
      <div className="absolute bottom-[30%] left-[15%] w-8 h-8 md:w-14 md:h-14 animate-float">
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-ns-yellow/50">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
        </svg>
      </div>
      
      <div className="absolute top-[60%] right-[8%] w-6 h-6 md:w-10 md:h-10 animate-float-slow">
        <div className="w-full h-full bg-ns-magenta/20 rounded-sm rotate-12 animate-pulse-slow" />
      </div>
      
      <div className="absolute bottom-[20%] right-[25%] w-4 h-4 md:w-8 md:h-8 animate-bounce-slow">
        <div className="w-full h-full rounded-full bg-ns-blue/30" />
      </div>
      
      {/* Decorative lines */}
      <svg className="absolute top-[40%] left-[5%] w-32 h-32 md:w-48 md:h-48 opacity-20 animate-draw-line" viewBox="0 0 100 100">
        <path d="M10 50 Q 50 10, 90 50" stroke="currentColor" strokeWidth="1" fill="none" className="text-ns-blue" />
      </svg>
      
      <svg className="absolute bottom-[15%] right-[10%] w-24 h-24 md:w-36 md:h-36 opacity-15 animate-draw-line-delayed" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" className="text-ns-cyan" />
      </svg>
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const { company } = useSiteData();

  // Parse the hero_title: first word is the big top word, rest become secondary lines
  // Format expected: "WORD1 que WORD2 WORD3" — we keep the layout but use dynamic tagline
  const heroTitle = company.hero_title || 'IDEIAS que GANHAM FORMA';
  const titleParts = heroTitle.split(' ');
  const word1 = titleParts[0] || 'IDEIAS';
  const word2 = titleParts.slice(1).join(' ') || 'que GANHAM FORMA';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      setMouseX(x);
      setMouseY(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Efeito 1: title reveal no hero (apenas na palavra principal)
  useGSAP(() => {
    animateTitleReveal(heroH1Ref.current);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-ns-blue/15 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-10 w-48 h-48 bg-ns-cyan/20 rounded-full blur-[80px] animate-float" />
      
      {/* Background Image Hero */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="/imgs/portifolio/port (11).jpg" 
          alt="Dgeth Gráfica Background" 
          className="w-full h-full object-cover grayscale blur-sm"
        />
      </div>
      
      {/* Floating animated shapes */}
      <FloatingShapes />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-4 md:gap-x-6 gap-y-4 items-center">
           
          {/* Word 1 */}
          <div className="col-span-1 lg:col-span-6 flex items-end justify-start">
            <h1
              ref={heroH1Ref}
              className="font-display font-black text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] text-foreground tracking-tighter leading-[0.8] opacity-0 animate-slide-up"
              style={{ transform: `translate(${mouseX * 0.1}px, ${mouseY * 0.1}px)` }}
            >
              {word1}
            </h1>
          </div>

          {/* Tagline */}
          <div className="col-span-1 lg:col-span-3 flex items-center opacity-0 animate-slide-up-delay-1">
            <div className="flex flex-col gap-4">
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-xs pl-4 border-l-2 border-ns-blue">
                {company.hero_tagline || 'A solução completa para a comunicação e imagem do seu negócio. Design gráfico, impressão digital e brindes corporativos em Luanda.'}
              </p>
            </div>
          </div>

          {/* Word 2: remaining words */}
          <div className="col-span-1 lg:col-span-7 flex items-start justify-start">
            <h1
              className="font-display font-black text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] tracking-tighter leading-[0.8] opacity-0 animate-slide-up-delay-2 text-ns-blue/30"
              style={{ 
                transform: `translate(${mouseX * 0.15}px, ${mouseY * 0.15}px)`,
                WebkitTextStroke: '2px hsl(210 100% 35% / 0.6)',
              }}
            >
              {word2.split(' ').length > 1 ? (
                <><span className="gradient-text italic font-serif text-[0.6em] mr-2">{word2.split(' ')[0]}</span>{word2.split(' ').slice(1, -1).join(' ')}</>
              ) : word2}
            </h1>
          </div>

          {/* Word 3: last word */}
          <div className="col-span-1 lg:col-start-3 lg:col-span-6 flex items-start justify-start lg:justify-center">
            <h1
              className="font-display font-black text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] text-ns-blue tracking-tighter leading-[0.8] relative opacity-0 animate-slide-up-delay-3"
              style={{ transform: `translate(${mouseX * 0.3}px, ${mouseY * 0.3}px)` }}
            >
              {word2.split(' ').slice(-1)[0] || 'FORMA'}
            </h1>
          </div>
           
          {/* Badge Spinning */}
          <div className="col-span-1 lg:col-span-2 flex items-center justify-center lg:justify-start opacity-0 animate-slide-up-delay-2">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-foreground">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text fontSize="11.5" fontWeight="bold" letterSpacing="1.2">
                    <textPath href="#circlePath" startOffset="0%">
                      DGETH GRÁFICA • COMUNICAÇÃO &amp; IMAGEM • 
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-ns-blue rounded-full flex items-center justify-center text-white shadow-lg z-10 hover:bg-ns-yellow hover:text-foreground transition-colors duration-300">
                <Check className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </div>
          </div>

       

          {/* CTA Section */}
          <div className="col-span-1 lg:col-start-1 lg:col-span-8 flex items-center justify-start opacity-0 animate-slide-up-delay-4 pointer-events-auto mt-4 md:mt-0">
            <Link to="/contacto" className="group cursor-pointer flex items-center gap-4 sm:gap-6 text-foreground">
              <div className="flex flex-col items-start md:items-end">
                <span className="relative font-bold text-lg sm:text-xl md:text-2xl tracking-tight">
                  Solicitar Orçamento
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-ns-blue transition-all duration-300 ease-out group-hover:w-full" />
                </span>
                <span className="text-xs text-muted-foreground font-semibold mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  Comece seu projeto hoje
                </span>
              </div>

              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-border bg-card flex items-center justify-center group-hover:border-ns-blue group-hover:bg-ns-blue group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-110 group-hover:animate-vibrate">
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 transform transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};


// Hook para animar o contador de 0 até ao valor final
const useCounterUp = (target: number, duration: number, isActive: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isActive, target, duration]);
  return count;
};

// Componente individual de um counter com animação
const CounterItem = ({
  prefix = '', suffix = '', target, label, sublabel, isActive, delay
}: {
  prefix?: string; suffix?: string; target: number; label: string; sublabel?: string; isActive: boolean; delay: number;
}) => {
  const count = useCounterUp(target, 1600, isActive);
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6 py-8 relative group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Número principal */}
      <div className="relative mb-3">
        <span className="text-6xl sm:text-7xl md:text-8xl font-display font-black leading-none tracking-tight text-foreground">
          {prefix}{count}{suffix}
        </span>
        {/* Linha decorativa animada sob o número */}
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] bg-ns-blue transition-all duration-700 ${isActive ? 'w-full' : 'w-0'}`}
          style={{ transitionDelay: `${delay + 400}ms` }}
        />
      </div>
      {/* Label */}
      <span className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-foreground/80 mt-4 block">
        {label}
      </span>
      {/* Sublabel opcional */}
      {sublabel && (
        <span className="text-xs text-muted-foreground mt-1 font-medium">{sublabel}</span>
      )}
    </div>
  );
};

interface StatItem {
  id: string | number;
  prefix: string;
  value: number;
  label: string;
  sublabel: string;
  sort_order?: number;
}

// Counters Section — layout artístico com GSAP Efeito 5
const CountersSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  // Buscar estatísticas no Supabase
  const { data: dbStats } = useQuery<StatItem[]>({
    queryKey: ['stats_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const FALLBACK_STATS: StatItem[] = [
    { id: 1, prefix: '+', value: 300, label: 'Clientes', sublabel: 'Satisfeitos' },
    { id: 2, prefix: '+', value: 3,   label: 'Anos',     sublabel: 'De experiência' },
    { id: 3, prefix: '',  value: 7,   label: 'Soluções', sublabel: 'Disponíveis' },
    { id: 4, prefix: '',  value: 1,   label: 'Localização', sublabel: 'Luanda, Angola' },
  ];

  const displayStats = dbStats && dbStats.length > 0 ? dbStats : FALLBACK_STATS;

  // Efeito 5: stat counters com clip-path reveal + count-up GSAP
  useGSAP(() => {
    animateStatCounters();
  }, [displayStats]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background border-b border-border">
      {/* Faixa de gradiente decorativa no topo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ns-blue to-transparent" />

      {/* Marca d'água tipográfica ao fundo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[10rem] sm:text-[14rem] md:text-[18rem] font-display font-black text-foreground/[0.025] leading-none tracking-tighter whitespace-nowrap">
          DGETH
        </span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Label de secção */}
        <div className={`pt-10 pb-2 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-ns-blue">
            Em números
          </span>
        </div>

        {/* Grid de contadores — Efeito 5: cada item tem stat-card, stat-number e data-value */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {displayStats.map((item, idx) => (
            <div key={idx} className="stat-card flex flex-col items-center justify-center text-center px-6 py-8 relative">
              {/* Linha decorativa animada */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-0 bg-ns-blue transition-all duration-700 ${isVisible ? 'h-8' : 'h-0'}`}
                style={{ transitionDelay: `${idx * 150 + 400}ms` }}
              />
              <div className="relative mb-3">
                <span className="text-6xl sm:text-7xl md:text-8xl font-display font-black leading-none tracking-tight text-foreground">
                  {item.prefix}<span
                    className="stat-number"
                    data-value={item.value}
                  >0</span>
                </span>
                {/* Linha decorativa sob o número */}
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] bg-ns-blue transition-all duration-700 ${isVisible ? 'w-full' : 'w-0'}`}
                  style={{ transitionDelay: `${idx * 150 + 400}ms` }}
                />
              </div>
              <span className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-foreground/80 mt-4 block">
                {item.label}
              </span>
              <span className="text-xs text-muted-foreground mt-1 font-medium">{item.sublabel}</span>
            </div>
          ))}
        </div>

        {/* Faixa inferior decorativa */}
        <div className={`flex items-center gap-4 pb-10 pt-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '600ms' }}>
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap">
            Dgeth Gráfica — Luanda
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* Faixa de gradiente decorativa no fundo */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ns-blue/40 to-transparent" />
    </section>
  );
};



// Brands Marquee Section - Fixed visibility
const BrandsMarquee = () => {
  const brands = [
    'Base Sólida', 'DECISIVO', 'AMPÈRE', 'FAST CARRO', 'CWB AÇO',
    'GREEN LAR', 'BRAINS', 'Brasfalto', 'VAPTY', 'MIM'
  ];
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-12 bg-card/50 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-6">
        <p className={`text-center text-muted-foreground text-xs sm:text-sm font-bold uppercase tracking-widest scroll-animate-init reveal-up ${isVisible ? 'animate-active' : ''}`}>
          Empresas que confiam na Dgeth Gráfica
        </p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, groupIdx) => (
            <div key={groupIdx} className="flex items-center gap-8 sm:gap-16 mx-4 sm:mx-8">
              {brands.map((brand, idx) => (
                <span
                  key={`${groupIdx}-${idx}`}
                  className="text-xl sm:text-2xl md:text-3xl font-display font-black text-foreground/20 uppercase hover:text-ns-blue transition-colors cursor-default select-none"
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      </section>
    );
  };

  // Imagens em Destaque Section
  const ImagensDestaque = () => {
    const { ref, isVisible } = useScrollAnimation();
    return (
      <section ref={ref} className="py-20 md:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`mb-12 scroll-animate-init reveal-up ${isVisible ? 'animate-active' : ''}`}>
            <span className="block text-ns-blue font-bold tracking-[0.2em] text-xs sm:text-sm mb-4 uppercase">Trabalhos Recentes</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Imagens em Destaque</h2>
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stagger-parent ${isVisible ? 'animate-active' : ''}`}>
            {[
              "/imgs/portifolio/port (1).jpg", 
              "/imgs/portifolio/port (2).jpg", 
              "/imgs/portifolio/port (3).jpg", 
              "/imgs/portifolio/port (4).jpg", 
              "/imgs/portifolio/port (5).jpg", 
              "/imgs/portifolio/port (6).jpg",
              "/imgs/portifolio/port (7).jpg",
              "/imgs/portifolio/port (8).jpg"
            ].map((img, idx) => (
              <div 
                key={idx} 
                className="stagger-item group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <img 
                  src={img} 
                  alt={`Trabalho ${idx + 1}`}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

interface ServiceItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
  destaque: boolean;
  sort_order?: number;
  tags?: string[];
  rotateClass?: string;
}

interface TeaserPortfolioItem {
  id: string | number;
  title: string;
  category: string;
  image: string;
  destaque: boolean;
  sort_order?: number;
}

const getServiceTags = (service: any) => {
  if (service.tags) return service.tags;
  const title = service.title.toLowerCase();
  if (title.includes('brinde')) return ['Canecas', 'T-shirts', 'Kits'];
  if (title.includes('envelopamento') || title.includes('visual')) return ['Viaturas', 'Montras', 'Paredes'];
  if (title.includes('vinil') || title.includes('banner')) return ['Lonas', 'Roll ups', 'Adesivos'];
  if (title.includes('identidade')) return ['Logotipos', 'Cores', 'Branding'];
  if (title.includes('post') || title.includes('digital')) return ['Social Media', 'Campanhas', 'Anúncios'];
  if (title.includes('impressão')) return ['Cartões', 'Flyers', 'Catálogos'];
  if (title.includes('fachada')) return ['Acrílico', 'LED', 'Letreiros'];
  return ['Qualidade', 'Design', 'Inovação'];
};

const getRotateClass = (index: number) => {
  const rotations = ['rotate-0', 'rotate-12', '-rotate-6'];
  return rotations[index % rotations.length];
};

// Services Section
const ServicesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  // Buscar serviços no Supabase
  const { data: dbServices } = useQuery<ServiceItem[]>({
    queryKey: ['services_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  const FALLBACK_SERVICES = [
    {
      id: 1,
      title: 'Brindes Corporativos',
      description: 'Produção e personalização de brindes exclusivos para a sua marca.',
      tags: ['Canecas', 'T-shirts', 'Kits'],
      rotateClass: 'rotate-0',
      destaque: true,
      image: '',
    },
    {
      id: 2,
      title: 'Envelopamento e Comunicação Visual',
      description: 'Serviços de envelopamento de viaturas e espaços corporativos.',
      tags: ['Viaturas', 'Montras', 'Paredes'],
      rotateClass: 'rotate-12',
      destaque: true,
      image: '',
    },
    {
      id: 3,
      title: 'Vinil, Banners e Displays',
      description: 'Produção de materiais publicitários em grande formato.',
      tags: ['Lonas', 'Roll ups', 'Adesivos'],
      rotateClass: '-rotate-6',
      destaque: true,
      image: '',
    },
  ];

  // Filtrar serviços em destaque
  const featuredDbServices = dbServices ? dbServices.filter(s => s.destaque) : [];
  const displayServices = featuredDbServices.length > 0
    ? featuredDbServices
    : (dbServices && dbServices.length > 0 ? dbServices.slice(0, 3) : FALLBACK_SERVICES);

  // Efeito 2: card overlay reveal nos service-cards
  useGSAP(() => {
    animateCardReveal('.service-card');
  }, [displayServices]);

  return (
    <section ref={ref} className="py-20 md:py-32 relative bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-12 md:mb-16">
          <div className={`flex flex-col justify-center scroll-animate-init reveal-mask-left ${isVisible ? 'animate-active' : ''}`}>
            <span className="text-ns-blue font-bold tracking-[0.2em] text-xs sm:text-sm mb-4 uppercase">O Que Fazemos</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black text-foreground leading-[0.9] mb-8">
              Soluções visuais que <span className="gradient-text italic font-serif">impulsionam</span>
            </h2>
          </div>
          <div className={`flex items-end lg:justify-end scroll-animate-init reveal-up ${isVisible ? 'animate-active' : ''}`} style={{ transitionDelay: '200ms' }}>
            <Link to="/portfolio" className="group flex items-center gap-2 text-muted-foreground hover:text-ns-blue transition-colors font-bold uppercase tracking-wider text-xs sm:text-sm cursor-pointer">
              Ver exemplos no portfólio
              <span className="block w-8 h-[1px] bg-current group-hover:w-16 transition-all duration-300" />
            </Link>
          </div>
        </div>

        <div className={`grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 stagger-parent ${isVisible ? 'animate-active' : ''}`}>
          {displayServices.map((service, idx) => (
            <div
              key={service.id || idx}
              className="service-card stagger-item group relative bg-card p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out-expo border border-border overflow-hidden hover:-translate-y-2"
            >
              {/* Overlay GSAP Efeito 2 */}
              <div className="card-overlay" />

              {/* Conteúdo do card */}
              <div className="card-content">
                {/* Animated BG Shape */}
                <div className={`absolute top-0 right-0 p-4 sm:p-6 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out-expo transform origin-top-right`}>
                  <svg className={`w-24 sm:w-32 h-24 sm:h-32 text-ns-blue ${service.rotateClass || getRotateClass(idx)}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                  </svg>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-4 relative z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {service.title}
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-serif italic mb-6 relative z-10">
                  {service.description}
                </p>

                <div className="w-full h-[1px] bg-border mb-6 group-hover:bg-ns-blue/20 transition-colors" />

                <ul className="space-y-2 relative z-10">
                  {getServiceTags(service).map((tag: string, tagIdx: number) => (
                    <li
                      key={tagIdx}
                      className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider group-hover:text-ns-blue transition-all translate-x-0 group-hover:translate-x-2 duration-300"
                      style={{ transitionDelay: `${tagIdx * 50}ms` }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Teaser Section
const PortfolioTeaser = () => {
  const { ref, isVisible } = useScrollAnimation();
  const portfolioH2Ref = useRef<HTMLHeadingElement>(null);

  // Buscar itens do portfólio no Supabase
  const { data: dbPortfolio } = useQuery<TeaserPortfolioItem[]>({
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

  const FALLBACK_PORTFOLIO = [
    { id: 1, title: 'TECSEP Kit Corporativo', category: 'Brindes Corporativos', image: "/imgs/portifolio/port%20(1).jpg", destaque: true },
    { id: 2, title: 'Cadernos TPA', category: 'Brindes Corporativos', image: "/imgs/portifolio/port%20(2).jpg", destaque: false },
    { id: 3, title: 'Kit AGT', category: 'Brindes Corporativos', image: "/imgs/portifolio/port%20(3).jpg", destaque: true }
  ];

  // Filtrar em destaque
  const featuredDbPortfolio = dbPortfolio ? dbPortfolio.filter(p => p.destaque) : [];
  const displayPortfolio = featuredDbPortfolio.length > 0
    ? featuredDbPortfolio.slice(0, 3)
    : (dbPortfolio && dbPortfolio.length > 0 ? dbPortfolio.slice(0, 3) : FALLBACK_PORTFOLIO);

  // Efeito 1 no título + Efeito 2 nos portfolio cards
  useGSAP(() => {
    animateTitleReveal(portfolioH2Ref.current);
    animateCardReveal('.portfolio-card');
  }, [displayPortfolio]);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8 scroll-animate-init reveal-up ${isVisible ? 'animate-active' : ''}`}>
          <div>
            <span className="text-ns-cyan font-bold tracking-[0.2em] text-xs sm:text-sm mb-4 uppercase block">Prova Visual</span>
            <h2 ref={portfolioH2Ref} className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white">
              Qualidade que não <br className="hidden sm:block" />precisa de legendas.
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="btn-bold px-6 sm:px-8 py-3 border border-white/20 rounded-full hover:text-slate-900 transition-colors font-bold text-xs sm:text-sm uppercase tracking-wide cursor-pointer active:scale-95 duration-300"
          >
            Ver Portfólio Completo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 auto-rows-[300px]">
          {displayPortfolio.map((item, i) => (
            <div
              key={item.id || i}
              className={`portfolio-card group relative overflow-hidden rounded-xl cursor-pointer bg-slate-800 scroll-animate-init reveal-mask-up ${isVisible ? 'animate-active' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Overlay GSAP Efeito 2 */}
              <div className="card-overlay" />
              <div className="card-content h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out-expo group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out-back">
                  <span className="text-ns-cyan text-xs font-bold uppercase tracking-widest mb-1 block">{item.category}</span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-ns-yellow transition-colors leading-tight">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section
const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const steps = [
    { id: 1, title: 'Ideia', desc: 'Entendemos a sua necessidade.' },
    { id: 2, title: 'Criação', desc: 'Design estratégico e aprovado.' },
    { id: 3, title: 'Produção', desc: 'Impressão com tecnologia de ponta.' },
    { id: 4, title: 'Entrega', desc: 'No prazo combinado, onde estiver.' },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-card border-b border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className={`text-center mb-12 md:mb-16 max-w-2xl mx-auto scroll-animate-init reveal-scale ${isVisible ? 'animate-active' : ''}`}>
          <span className="text-ns-blue font-bold tracking-[0.2em] text-xs sm:text-sm mb-4 uppercase block">Processo</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Do rascunho à realidade</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Simplificamos o complexo para entregar excelência sem dor de cabeça.</p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative stagger-parent ${isVisible ? 'animate-active' : ''}`}>
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-border -z-0" />

          {steps.map((step) => (
            <div key={step.id} className="stagger-item relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-card border-4 border-secondary flex items-center justify-center mb-4 sm:mb-6 group-hover:border-ns-blue transition-colors duration-500 shadow-sm group-hover:scale-110 ease-out-back">
                <span className="font-display font-black text-xl sm:text-2xl md:text-3xl text-muted-foreground group-hover:text-ns-blue transition-colors">{step.id}</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Differentials Section
const DifferentialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const differentials = [
    {
      title: 'Tudo num só lugar',
      desc: 'Do design à entrega final, centralizamos o processo para garantir consistência.',
      iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    },
    {
      title: 'Acabamento profissional',
      desc: 'Verniz, corte especial, hot stamping. Detalhes que elevam o valor percebido.',
      iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    },
    {
      title: 'Prazos cumpridos',
      desc: 'Respeitamos o seu cronograma. Sabemos que em negócios, tempo é dinheiro.',
      iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Atendimento próximo',
      desc: 'Consultores reais prontos para resolver, no WhatsApp ou presencialmente.',
      iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className={`scroll-animate-init reveal-mask-left ${isVisible ? 'animate-active' : ''}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-8">Porquê escolher a Dgeth Gráfica?</h2>
            <div className={`space-y-6 sm:space-y-8 stagger-parent ${isVisible ? 'animate-active' : ''}`}>
              {differentials.map((diff, idx) => (
                <div key={idx} className="stagger-item flex gap-4 sm:gap-5 group">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-ns-blue/10 flex items-center justify-center text-ns-blue group-hover:bg-ns-blue group-hover:text-white transition-colors duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={diff.iconPath} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-foreground mb-1 group-hover:text-ns-blue transition-colors">{diff.title}</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{diff.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative h-[300px] sm:h-[350px] md:h-[400px] scroll-animate-init reveal-scale ${isVisible ? 'animate-active' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-ns-blue rounded-2xl transform rotate-3 animate-float-random opacity-20" />
            <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-slate-900 rounded-2xl transform -rotate-2 overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-0 hover:scale-105">
              <img
                src="/imgs/portifolio/port (9).jpg"
                className="w-full h-full object-cover opacity-80"
                alt="Qualidade NS"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { company } = useSiteData();

  return (
    <section ref={ref} className="py-20 md:py-32 bg-ns-blue text-white text-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 animate-pulse-slow"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
      />
      <div className={`container mx-auto px-4 sm:px-6 relative z-10 scroll-animate-init reveal-scale ${isVisible ? 'animate-active' : ''}`}>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black mb-6 sm:mb-8 leading-tight">
          {company.cta_title || 'Pronto para dar forma à sua próxima ideia?'}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <Link
            to="/contacto"
            className="px-8 sm:px-10 py-4 sm:py-5 bg-ns-yellow text-slate-900 font-bold text-base sm:text-lg rounded-full shadow-2xl hover:bg-white transition-all transform hover:scale-105 hover:rotate-1 cursor-pointer active:scale-95 animate-bounce w-full sm:w-auto text-center"
            style={{ animationDuration: '3s' }}
          >
            Solicitar Orçamento
          </Link>
          <span className="text-blue-200 text-xs sm:text-sm font-semibold tracking-wide">Sem compromisso. Resposta rápida.</span>
        </div>
      </div>
    </section>
  );
};

// Main Home Page
const Home = () => {
  return (
    <>
      <SEO
        pagePath="/"
        defaultTitle="Dgeth Gráfica — Comunicação & Imagem"
        defaultDescription="A solução completa para a comunicação e imagem do seu negócio em Luanda. Design gráfico, impressão e brindes corporativos."
      />
      <HeroSection />
      <CountersSection />
      <ServicesSection />
      <PortfolioTeaser />
      {/* <BrandsMarquee />  - Removido a pedido do cliente (sem destaques a clientes/parceiros) */}
      <ProcessSection />        
      <DifferentialsSection />
      <CTASection />
    </>
  );
};

export default Home;
