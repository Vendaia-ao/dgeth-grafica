import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import useGSAP from '@/hooks/useGSAP';
import { animateTitleReveal } from '@/lib/gsapAnimations';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import SEO from '@/components/SEO';

const FALLBACK_COMPANY = {
  slogan: 'A gráfica que te move.',
  about_text: 'Empresa privada de direito angolano, constituída aos 22 de Maio de 2023 em Luanda, matriculada na Conservatória de Registro Comercial da 2ª Seção do Guichê Único de Empresas, contribuinte fiscal nº 5001496662. A Dgeth Gráfica é uma empresa especializada em oferecer soluções de impressão de alta qualidade para empresas e indivíduos. Com 3 anos de experiência, contamos com uma equipe jovem e dinâmica, tecnologia de ponta e um compromisso inabelável com a excelência e inovação.',
  about_quote: 'Transformar ideias em materiais impressos impactantes, atendendo desde pequenas até grandes produções.',
  about_details: 'O objectivo específico da nossa empresa é oferecer soluções completas e inovadoras em comunicação visual e brindes corporativos, focadas no fortalecimento da marca dos nossos clientes.',
  mission: 'Oferecer serviços gráficos de alta qualidade, atendendo às necessidades dos clientes com excelência, criatividade e compromisso garantindo sempre o melhor resultado.',
  vision: 'Ser referência em soluções gráficas na região, trazendo inovação e tecnologia para transformar a comunicação visual dos nossos clientes.',
  values: [
    { title: 'Qualidade', desc: 'Compromisso com um serviço impecável.' },
    { title: 'Inovação', desc: 'Buscar constantemente novas tecnologias e tendências.' },
    { title: 'Compromisso com o cliente', desc: 'Atendimento personalizado e eficaz.' },
    { title: 'Sustentabilidade', desc: 'Uso responsável de materiais e processos ecológicos.' },
    { title: 'Ética e transparência', desc: 'Relações baseadas na confiança e respeito.' },
  ],
};

const About = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  // Buscar dados dinâmicos da empresa no Supabase (com fallback local)
  const { data: companyData } = useQuery({
    queryKey: ['company_info_sobre'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_info')
        .select('slogan,about_text,about_quote,about_details,mission,vision,values')
        .eq('id', 1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const company = companyData || FALLBACK_COMPANY;
  const values = (company.values && company.values.length > 0) ? company.values : FALLBACK_COMPANY.values;

  // Refs para GSAP Efeito 1 (clip-path title reveal)
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const missionH2Ref = useRef<HTMLHeadingElement>(null);
  const visionH2Ref = useRef<HTMLHeadingElement>(null);
  const valuesH2Ref = useRef<HTMLHeadingElement>(null);
  const ctaH2Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    animateTitleReveal(heroTitleRef.current);
    animateTitleReveal(missionH2Ref.current);
    animateTitleReveal(visionH2Ref.current);
    animateTitleReveal(valuesH2Ref.current);
    animateTitleReveal(ctaH2Ref.current);
  }, []);

  return (
    <>
      <SEO
        pagePath="/sobre-nos"
        defaultTitle="Sobre Nós — Dgeth Gráfica"
        defaultDescription="Conheça a nossa missão, visão, valores e o percurso da Dgeth Gráfica no mercado de impressão em Angola."
      />
      {/* 1. HERO EDITORIAL */}
      <section className="pt-48 pb-32 relative z-10 min-h-[60vh] flex flex-col justify-center">
        <div className="container mx-auto px-6">
          <div
            ref={heroRef}
            className={`max-w-4xl scroll-animate-init reveal-up ${heroVisible ? 'animate-active' : ''}`}
          >
            <span className="block text-ns-blue font-bold tracking-[0.2em] text-xs md:text-sm mb-6 uppercase">
              Dgeth Gráfica
            </span>
            <h1
              ref={heroTitleRef}
              className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] mb-10 tracking-tight"
            >
              A gráfica que te <span className="font-serif italic font-light text-muted-foreground">move</span>.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light border-l-2 border-ns-yellow pl-6">
              Soluções completas e inovadoras em comunicação visual e brindes corporativos.
            </p>
          </div>
        </div>
      </section>

      {/* 2. QUEM SOMOS */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-12 lg:col-span-10">
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">Quem Somos</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>{company.about_text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOSSO OBJECTIVO — Destaque editorial */}
      <section className="relative z-10 overflow-hidden bg-ns-dark py-20 md:py-28">
        {/* Grade tipográfica decorativa */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Marca d'água */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[14rem] font-display font-black text-white/[0.03] leading-none pointer-events-none select-none whitespace-nowrap pr-4">
          OBJ.
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            {/* Etiqueta */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-ns-blue" />
              <span className="text-ns-blue text-xs font-bold uppercase tracking-[0.3em]">
                Nosso Objectivo
              </span>
            </div>

            {/* Texto de destaque */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white leading-snug mb-10">
              "{company.about_quote}"
            </blockquote>

            {/* Linha divisória */}
            <div className="h-px w-full bg-white/10 mb-10" />

            {/* Detalhe expandido */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl">
              {company.about_details}
            </p>
          </div>
        </div>
      </section>

      {/* 4. MISSÃO E VISÃO */}
      <section className="py-24 relative z-10 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 ref={missionH2Ref} className="text-3xl font-display font-bold text-foreground mb-6">Missão</h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-serif italic border-l-4 border-ns-blue pl-4">
                "{company.mission}"
              </p>
            </div>
            <div>
              <h2 ref={visionH2Ref} className="text-3xl font-display font-bold text-foreground mb-6">Visão</h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-serif italic border-l-4 border-ns-yellow pl-4">
                "{company.vision}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VALORES */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div
            ref={valuesRef}
            className={`mb-16 scroll-animate-init reveal-scale ${valuesVisible ? 'animate-active' : ''}`}
          >
            <span className="text-ns-blue font-bold tracking-[0.2em] text-xs uppercase mb-2 block">O nosso compromisso</span>
            <h2 ref={valuesH2Ref} className="text-4xl font-display font-bold text-foreground">Valores</h2>
          </div>

          <div className={`grid md:grid-cols-3 lg:grid-cols-5 gap-6 stagger-parent ${valuesVisible ? 'animate-active' : ''}`}>
            {values.map((val, idx) => (
              <div
                key={idx}
                className="stagger-item group p-6 border border-border hover:border-ns-blue/30 transition-all duration-500 bg-background rounded-xl hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-ns-blue transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DIFERENCIAL HUMANO (QUOTE) */}
      <section
        ref={quoteRef}
        className={`py-24 bg-slate-900 text-white relative overflow-hidden scroll-animate-init reveal-scale ${quoteVisible ? 'animate-active' : ''}`}
      >
        <div
          className="absolute inset-0 opacity-10 animate-pulse-slow"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <svg className="w-12 h-12 text-ns-cyan mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9L9.00003 12.3789C15.025 12.3789 15.025 3 9.00003 3H3V12.3789H6.28998C6.67069 13.7144 7.69165 14.7354 9.02717 15.1161V21H14.017ZM21 21L21 18C21 16.8954 20.1046 16 19 16H15.983L15.983 12.3789C22.008 12.3789 22.008 3 15.983 3H9.98297V12.3789H13.273C13.6537 13.7144 14.6747 14.7354 16.0102 15.1161V21H21Z" />
            </svg>
            <p className="text-2xl md:text-4xl font-display font-medium leading-tight mb-8">
              "A Dgeth Gráfica é uma empresa especializada em oferecer soluções de impressão de alta qualidade para empresas e indivíduos."
            </p>
            <div className="w-20 h-[1px] bg-slate-700 mx-auto" />
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="py-32 relative z-10 text-center">
        <div
          ref={ctaRef}
          className={`container mx-auto px-6 scroll-animate-init reveal-up ${ctaVisible ? 'animate-active' : ''}`}
        >
          <h2 ref={ctaH2Ref} className="text-4xl md:text-5xl font-display font-black text-foreground mb-8">
            Vamos transformar o seu <br />negócio agora?
          </h2>
          <Link
            to="/contacto"
            className="btn-bold inline-flex items-center gap-3 px-10 py-4 bg-ns-blue text-white font-bold rounded-full hover:bg-ns-dark transition-colors shadow-xl shadow-ns-blue/20"
          >
            Solicitar Orçamento
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
