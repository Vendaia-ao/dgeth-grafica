import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// Use images from /dgueth
const materialCorporativo = "/dgueth/img1.jpeg";
const cadernosTpa = "/dgueth/img2.png";
const kitAgt = "/dgueth/img3.png";

const values = [
  {
    title: 'Rapidez',
    desc: 'Cumprimos prazos porque sabemos que o tempo do seu negócio é valioso.',
  },
  {
    title: 'Qualidade',
    desc: 'Utilizamos os melhores materiais e equipamentos de impressão do mercado.',
  },
  {
    title: 'Durabilidade',
    desc: 'Produtos e aplicações feitas para resistir ao tempo e ao uso diário.',
  },
];

const steps = [
  {
    id: 1,
    title: 'Entendimento',
    desc: 'Ouvimos sua necessidade e analisamos os arquivos técnicos para garantir viabilidade.',
  },
  {
    id: 2,
    title: 'Criação & Pré-impressão',
    desc: 'Ajustes finos, provas de cor e preparação de matrizes para garantir fidelidade.',
  },
  {
    id: 3,
    title: 'Produção Premium',
    desc: 'Execução em maquinário de ponta com supervisão constante de qualidade.',
  },
  {
    id: 4,
    title: 'Entrega Técnica',
    desc: 'Acabamento, embalagem segura e logística para chegar perfeito até você.',
  },
];

const About = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: historyRef, isVisible: historyVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation();
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  return (
    <>
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
            <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] mb-10 tracking-tight">
              A solução completa para<br />
              a sua <span className="font-serif italic font-light text-muted-foreground">comunicação</span>.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light border-l-2 border-ns-yellow pl-6">
              Trabalhamos baseados em três pilares fundamentais: Rapidez, Qualidade e Durabilidade.
            </p>
          </div>
        </div>
      </section>

      {/* 2. HISTÓRIA (NARRATIVA) - COM IMAGEM */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Abstract Line Visual */}
            <div
              ref={historyRef}
              className={`hidden md:block md:col-span-3 lg:col-span-4 relative h-full min-h-[200px] scroll-animate-init reveal-mask-up ${historyVisible ? 'animate-active' : ''}`}
            >
              <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-ns-blue to-transparent" />
              <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-ns-blue" />
            </div>

            <div
              className={`md:col-span-9 lg:col-span-8 scroll-animate-init reveal-up ${historyVisible ? 'animate-active' : ''}`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground mb-8">Nossa Trajetória</h2>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      A Dgeth Gráfica nasceu com o propósito de oferecer a solução completa para a comunicação e imagem do seu negócio em Luanda.
                    </p>
                    <p>
                      Ao longo dos anos, investimos em equipamentos modernos e numa equipa especializada que domina as mais diversas técnicas de design e impressão.
                    </p>
                    <p className="font-semibold text-foreground">
                      Hoje, somos a escolha de quem procura rapidez, qualidade e durabilidade.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src={materialCorporativo} 
                    alt="Material Corporativo" 
                    className="rounded-2xl shadow-xl w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HISTÓRIA (NARRATIVA) */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Abstract Line Visual */}
            <div
              ref={historyRef}
              className={`hidden md:block md:col-span-3 lg:col-span-4 relative h-full min-h-[200px] scroll-animate-init reveal-mask-up ${historyVisible ? 'animate-active' : ''}`}
            >
              <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-ns-blue to-transparent" />
              <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-ns-blue" />
            </div>

            <div
              className={`md:col-span-9 lg:col-span-6 scroll-animate-init reveal-up ${historyVisible ? 'animate-active' : ''}`}
              style={{ transitionDelay: '100ms' }}
            >
              <h2 className="text-3xl font-display font-bold text-foreground mb-8">Nossa Trajetória</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  A Dgeth Gráfica nasceu com o propósito de oferecer a solução completa para a comunicação e imagem do seu negócio em Luanda. Percebemos que as empresas precisavam de um parceiro que unisse criatividade, tecnologia e agilidade.
                </p>
                <p>
                  Ao longo dos anos, investimos em equipamentos modernos e numa equipa especializada que domina as mais diversas técnicas de design e impressão. Da criação à personalização de viaturas, entregamos excelência.
                </p>
                <p className="font-semibold text-foreground">
                  Hoje, somos a escolha de quem procura rapidez, qualidade e durabilidade. Somos a casa das marcas que exigem o melhor em comunicação visual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALORES (O QUE NOS MOVE) - COM IMAGEM */}
      <section className="py-32 bg-card relative z-10 border-y border-border">
        <div className="container mx-auto px-6">
          <div
            ref={valuesRef}
            className={`mb-16 scroll-animate-init reveal-scale ${valuesVisible ? 'animate-active' : ''}`}
          >
            <span className="text-ns-blue font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Porquê Escolher-nos</span>
            <h2 className="text-4xl font-display font-bold text-foreground">O que é inegociável</h2>
          </div>

          <div className={`grid md:grid-cols-3 gap-8 stagger-parent ${valuesVisible ? 'animate-active' : ''}`}>
            {values.map((val, idx) => (
              <div
                key={idx}
                className="stagger-item group p-8 border border-border hover:border-ns-blue/30 transition-all duration-500 bg-background rounded-xl hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4">
                  <img 
                    src={idx === 0 ? cadernosTpa : idx === 1 ? kitAgt : kitAgt} 
                    alt={val.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-ns-blue transition-colors">
                  {val.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESSO (COMO TRABALHAMOS) - COM IMAGEM */}
      <section ref={processRef} className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <div
              className={`lg:col-span-4 scroll-animate-init reveal-mask-left ${processVisible ? 'animate-active' : ''}`}
            >
              <h2 className="text-4xl font-display font-bold text-foreground mb-6">Processo Fluido</h2>
              <p className="text-muted-foreground mb-8">
                Eliminamos a burocracia desnecessária. Nosso fluxo é desenhado para garantir precisão técnica sem travar o seu cronograma.
              </p>
              <div className="hidden lg:block w-16 h-1 bg-ns-yellow" />
            </div>

            <div className="lg:col-span-8">
              <div className={`grid md:grid-cols-2 gap-x-12 gap-y-16 stagger-parent ${processVisible ? 'animate-active' : ''}`}>
                {steps.map((step) => (
                  <div key={step.id} className="stagger-item relative pl-8 border-l border-border">
                    <span className="absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full bg-background border-4 border-ns-blue" />
                    <span className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                      Passo 0{step.id}
                    </span>
                    <h4 className="text-2xl font-bold text-foreground mb-3">{step.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIFERENCIAL HUMANO (QUOTE) */}
      <section
        ref={quoteRef}
        className={`py-24 bg-slate-900 text-white relative overflow-hidden scroll-animate-init reveal-scale ${quoteVisible ? 'animate-active' : ''}`}
      >
        {/* Texture overlay */}
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
              "Na Dgeth Gráfica, trabalhamos baseados na <span className="text-ns-cyan italic font-serif">rapidez, qualidade e durabilidade</span>. Transformamos a imagem do seu negócio com excelência."
            </p>
            <div className="w-20 h-[1px] bg-slate-700 mx-auto" />
          </div>
        </div>
      </section>

      {/* 6. CTA FINAL */}
      <section className="py-32 relative z-10 text-center">
        <div
          ref={ctaRef}
          className={`container mx-auto px-6 scroll-animate-init reveal-up ${ctaVisible ? 'animate-active' : ''}`}
        >
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground mb-8">
              Vamos transformar o seu <br />negócio agora?
            </h2>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-3 px-10 py-4 bg-ns-blue text-white font-bold rounded-full hover:bg-ns-dark transition-all transform hover:scale-105 shadow-xl shadow-ns-blue/20"
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
