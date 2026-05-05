import { useState } from 'react';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
// Use image from /dgueth
const contactImage = "/dgueth/img10.png";

const Contact = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="min-h-screen pt-40 pb-24 relative z-10">
      {/* Page Header */}
      <div
        ref={headerRef}
        className={`container mx-auto px-6 mb-16 scroll-animate-init reveal-up ${headerVisible ? 'animate-active' : ''}`}
      >
        <div className="max-w-4xl">
            <span className="block text-ns-blue font-bold tracking-[0.2em] text-sm mb-6 uppercase">
              Fale Connosco
            </span>
            <h1 className="font-display font-black text-5xl md:text-7xl text-foreground leading-[0.9] mb-8 tracking-tight">
              Vamos iniciar o seu <br />
              <span className="gradient-text font-serif italic font-light">projeto agora?</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed font-light border-l-2 border-ns-yellow pl-6">
              Estamos prontos para ouvir as suas necessidades. Rapidez, qualidade e durabilidade na comunicação do seu negócio.
            </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Info Column */}
          <div
            ref={infoRef}
            className={`lg:w-1/3 space-y-6 stagger-parent ${infoVisible ? 'animate-active' : ''}`}
          >
            {/* WhatsApp Card */}
              <a
                href="https://wa.me/244944974378"
                target="_blank"
                rel="noopener noreferrer"
                className="stagger-item flex items-center gap-4 group cursor-pointer p-6 rounded-2xl bg-card shadow-sm hover:shadow-xl transition-all border border-border hover:border-ns-blue/20 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                    WhatsApp (Prioritário)
                  </p>
                  <p className="text-xl font-bold text-foreground">944 974 378</p>
                </div>
              </a>

            {/* Email Card */}
              <div className="stagger-item flex items-center gap-4 group p-6 rounded-2xl bg-card shadow-sm border border-border">
                <div className="w-14 h-14 rounded-full bg-ns-blue/10 flex items-center justify-center text-ns-blue">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Email</p>
                  <p className="text-lg font-semibold text-foreground break-all">gdethgrafica@gmail.com</p>
                </div>
              </div>

            {/* Location Card */}
              <div className="stagger-item flex items-center gap-4 group p-6 rounded-2xl bg-card shadow-sm border border-border">
                <div className="w-14 h-14 rounded-full bg-ns-blue/10 flex items-center justify-center text-ns-blue">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Localização</p>
                  <p className="text-lg font-semibold text-foreground">
                    Luanda, Angola
                  </p>
                </div>
              </div>

            {/* Phone Card */}
              <div className="stagger-item flex items-center gap-4 group p-6 rounded-2xl bg-card shadow-sm border border-border">
                <div className="w-14 h-14 rounded-full bg-ns-blue/10 flex items-center justify-center text-ns-blue">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Telefone / WhatsApp</p>
                  <p className="text-lg font-semibold text-foreground">
                    +244 944 974 378
                  </p>
                </div>
              </div>
            </div>

          {/* Image + Contact Form */}
          <div
            ref={formRef}
            className={`lg:w-2/3 scroll-animate-init reveal-scale ${formVisible ? 'animate-active' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Side */}
              <div className="hidden md:block relative rounded-3xl overflow-hidden">
                <img 
                  src={contactImage} 
                  alt="Contacte-nos" 
                  className="w-full h-full object-cover min-h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>

              {/* Form Side */}
              <div className="bg-card p-8 md:p-12 rounded-3xl shadow-xl border border-border hover:shadow-2xl transition-shadow duration-500">
                <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                  Envie um pedido de orçamento
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-muted-foreground text-xs font-bold uppercase tracking-wider ml-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-ns-blue focus:border-transparent outline-none transition-all text-foreground font-medium focus:scale-[1.01] duration-300"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-muted-foreground text-xs font-bold uppercase tracking-wider ml-1">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-4 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-ns-blue focus:border-transparent outline-none transition-all text-foreground font-medium focus:scale-[1.01] duration-300"
                        placeholder="Seu contacto"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-muted-foreground text-xs font-bold uppercase tracking-wider ml-1">
                      Email (Opcional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-ns-blue focus:border-transparent outline-none transition-all text-foreground font-medium focus:scale-[1.01] duration-300"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-muted-foreground text-xs font-bold uppercase tracking-wider ml-1">
                      Mensagem ou Detalhes do Projeto
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-4 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-ns-blue focus:border-transparent outline-none transition-all text-foreground font-medium resize-none focus:scale-[1.01] duration-300"
                      placeholder="Conte-nos sobre o que precisa imprimir, quantidades ou ideias..."
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-10 py-5 bg-ns-blue hover:bg-ns-dark text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-ns-blue/30 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                    >
                      <span>Enviar Pedido</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
