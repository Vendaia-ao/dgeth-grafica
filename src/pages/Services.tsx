import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Use images from /dgueth
const cadernosTpa = "/dgueth/img2.png";
const camisetasBic = "/dgueth/img4.png";
const standsMojogos = "/dgueth/img5.png";
const kitAgt = "/dgueth/img3.png";

const services = [
  {
    id: 1,
    title: 'Criação e Design Visual',
    description: 'Damos vida às suas ideias. A nossa equipa de design desenvolve a identidade visual perfeita para destacar a sua marca no mercado, tanto no mundo físico como no digital.',
    features: ['Identidade Visual & Logotipos', 'Web Design', 'Design para Redes Sociais (Post Digital)', 'Design de Material Gráfico'],
    image: cadernosTpa,
    highlightTitle: 'Criatividade',
    highlightText: 'Ideias que se transformam em imagens memoráveis.',
  },
  {
    id: 2,
    title: 'Impressão e Comunicação Visual',
    description: 'Qualidade de impressão que impressiona. Produzimos todo o material corporativo e publicitário que a sua empresa necessita para se comunicar com eficácia.',
    features: ['Pequeno Formato (Flyers, Cartões, Envelopes)', 'Grande Formato & Displays (Roll-Ups, Balcões)', 'Identificação & Decoração (Passes PVC)', 'Impressão em Vinil para eventos'],
    image: standsMojogos,
    highlightTitle: 'Qualidade',
    highlightText: 'Utilizamos os melhores materiais e equipamentos.',
  },
  {
    id: 3,
    title: 'Brindes e Artigos Personalizados',
    description: 'Fortaleça a cultura da sua empresa e fidelize clientes com produtos exclusivos. Vestimos a sua equipa e personalizamos os melhores brindes com a sua marca.',
    features: ['Fardamento e Têxteis (Uniformes, T-shirts)', 'Brindes Corporativos (Chávenas, Canetas)', 'Blocos de Notas Personalizados', 'Diversos artigos promocionais'],
    image: kitAgt,
    highlightTitle: 'Personalização',
    highlightText: 'Produtos exclusivos com a sua marca.',
  },
  {
    id: 4,
    title: 'Personalização de Viaturas (Frota)',
    description: 'Transforme os veículos da sua empresa em painéis publicitários móveis. Aumente a visibilidade do seu negócio em cada deslocação com as nossas soluções de rotulagem automóvel.',
    features: ['Envelopamento Total', 'Envelopamento Parcial', 'Micro Perfurados para Vidros', 'Aplicação de Logotipo e Contactos'],
    image: camisetasBic,
    highlightTitle: 'Mobilidade',
    highlightText: 'A sua frota trabalha como publicidade móvel.',
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation();
  const isEven = index % 2 === 0;
  const isDarkSection = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`group relative py-20 md:py-32 scroll-animate-init reveal-up ${isVisible ? 'animate-active' : ''} ${
        isDarkSection ? 'bg-slate-900' : 'bg-background'
      }`}
    >
      {/* Section Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: isDarkSection 
            ? 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)'
            : 'radial-gradient(hsl(var(--muted-foreground) / 0.3) 1.5px, transparent 1.5px)',
          backgroundSize: isDarkSection ? '40px 40px' : '24px 24px',
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Number Watermark */}
          <div
            className={`hidden md:block absolute -top-20 font-display font-black text-[12rem] opacity-10 select-none z-0 transition-transform duration-700 group-hover:translate-x-4 ${
              isEven ? 'left-6' : 'right-6'
            } ${isDarkSection ? 'text-white' : 'text-foreground'}`}
            style={{ WebkitTextStroke: isDarkSection ? '2px rgba(255,255,255,0.2)' : '2px rgba(0,0,0,0.1)', color: 'transparent' }}
          >
            0{index + 1}
          </div>

          {/* Content Column - appears first on even, second on odd */}
          <div
            className={`relative z-10 md:col-span-5 ${isEven ? 'md:col-start-1 md:order-1' : 'md:col-start-8 md:order-2'}`}
          >
            <h3 className={`text-3xl md:text-5xl font-display font-bold mb-6 group-hover:text-ns-cyan transition-colors ${
              isDarkSection ? 'text-white' : 'text-foreground'
            }`}>
              {service.title}
            </h3>

            <div className="h-1 w-20 bg-ns-yellow mb-8 transform origin-left group-hover:scale-x-150 transition-transform duration-500 ease-out-expo" />

            <p className={`text-lg mb-8 leading-relaxed font-light ${
              isDarkSection ? 'text-slate-300' : 'text-muted-foreground'
            }`}>
              {service.description}
            </p>

            <ul className="space-y-3 mb-10">
              {service.features.map((feature, idx) => (
                <li
                  key={idx}
                  className={`flex items-center gap-3 text-sm font-semibold tracking-wide ${
                    isDarkSection ? 'text-slate-400' : 'text-muted-foreground'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ns-cyan animate-pulse" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              to="/contacto"
              className="inline-flex items-center gap-3 text-ns-cyan font-bold uppercase tracking-wider text-sm hover:gap-5 transition-all duration-300"
            >
              Solicitar Orçamento
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Image Column - appears second on even, first on odd */}
          <div
            className={`relative z-10 md:col-span-6 ${isEven ? 'md:col-start-7 md:order-2' : 'md:col-start-1 md:order-1'}`}
          >
            <div className="relative aspect-[4/5] md:aspect-[3/4] group-hover:z-20 transition-all duration-500">
              {/* Decorative Shape */}
              <div
                className={`absolute inset-0 bg-ns-cyan/20 transform transition-transform duration-700 ease-out ${
                  isEven
                    ? 'translate-x-4 translate-y-4 group-hover:translate-x-8'
                    : '-translate-x-4 translate-y-4 group-hover:-translate-x-8'
                }`}
              />

              {/* Main Image */}
              <div
                className={`absolute inset-0 overflow-hidden rounded shadow-2xl transform transition-transform duration-700 ease-out-expo group-hover:scale-[1.02] border ${
                  isDarkSection ? 'border-white/10' : 'border-border'
                } ${isEven ? 'rotate-2 group-hover:rotate-0' : '-rotate-2 group-hover:rotate-0'}`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover filter grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t opacity-60 group-hover:opacity-30 transition-opacity duration-500 ${
                  isDarkSection ? 'from-slate-900/80' : 'from-background/80'
                } to-transparent`} />
              </div>

              {/* Floating Detail Card */}
              <div
                className={`absolute backdrop-blur p-4 rounded shadow-xl max-w-[180px] hidden md:block transform transition-transform duration-500 group-hover:-translate-y-2 bottom-8 ${
                  isEven ? '-left-8' : '-right-8'
                } ${isDarkSection ? 'bg-slate-800/90 border border-white/10' : 'bg-card border border-border'}`}
              >
                <span className="block text-ns-cyan text-xs font-bold uppercase mb-1">
                  {service.highlightTitle}
                </span>
                <span className={`block text-xs leading-tight ${isDarkSection ? 'text-slate-200' : 'text-muted-foreground'}`}>
                  {service.highlightText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation();

  return (
    <section id="services" className="relative min-h-screen z-20">
      {/* Header Section */}
      <div className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-ns-blue opacity-20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div
            ref={headerRef}
            className={`max-w-4xl scroll-animate-init reveal-up ${headerVisible ? 'animate-active' : ''}`}
          >
            <span className="block text-ns-cyan font-bold tracking-[0.2em] text-sm mb-4 uppercase">
              A Solução Completa
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-white leading-[0.9] mb-8">
              A solução completa para<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ns-cyan to-white italic font-serif font-light pr-4">
                a sua comunicação.
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
              Unimos design criativo e tecnologia de impressão para entregar produtos que elevam a imagem do seu negócio.
            </p>
          </div>
        </div>
      </div>

      {/* Services List - Each service has its own background */}
      <div className="flex flex-col">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Final CTA Block */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div
            ref={ctaRef}
            className={`relative bg-gradient-to-br from-ns-blue to-ns-dark rounded-3xl p-12 md:p-24 overflow-hidden text-center border border-white/10 scroll-animate-init reveal-scale ${ctaVisible ? 'animate-active' : ''}`}
          >
            <div
              className="absolute inset-0 opacity-20 animate-float"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
            />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                Pronto para transformar o seu negócio?
              </h3>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Na Dgeth Gráfica, trabalhamos com rapidez, qualidade e durabilidade. Peça o seu orçamento!
              </p>
              <Link
                to="/contacto"
                className="inline-block px-10 py-4 bg-ns-yellow text-slate-900 font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-lg animate-pulse-slow"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
