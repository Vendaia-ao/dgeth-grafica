import { useRef } from 'react';
import { useSiteData } from '@/context/SiteDataContext';
import useGSAP from '@/hooks/useGSAP';
import { animateTitleReveal } from '@/lib/gsapAnimations';
import SEO from '@/components/SEO';
import { Shield, Lock, FileText, CheckCircle, HelpCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const { company, contacts } = useSiteData();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    animateTitleReveal(titleRef.current);
  }, []);

  const sections = [
    { id: 'introducao', label: '1. Introdução', icon: FileText },
    { id: 'recolha', label: '2. Recolha de Dados', icon: Shield },
    { id: 'utilizacao', label: '3. Utilização dos Dados', icon: CheckCircle },
    { id: 'seguranca', label: '4. Segurança e Armazenamento', icon: Lock },
    { id: 'direitos', label: '5. Os Seus Direitos', icon: HelpCircle },
  ];

  return (
    <>
      <SEO
        pagePath="/politica-de-privacidade"
        defaultTitle="Política de Privacidade — Dgeth Gráfica"
        defaultDescription="Saiba como a Dgeth Gráfica protege, recolhe e processa os seus dados pessoais em conformidade com a legislação."
      />

      {/* Hero Section */}
      <section className="pt-48 pb-16 relative z-10 min-h-[40vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-ns-blue blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="block text-ns-blue font-bold tracking-[0.2em] text-xs md:text-sm mb-4 uppercase">
              Termos Legais
            </span>
            <h1
              ref={titleRef}
              className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1] mb-6 tracking-tight"
            >
              Política de <span className="font-serif italic font-light text-muted-foreground">Privacidade</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-light border-l-2 border-ns-yellow pl-4">
              A transparência no tratamento dos seus dados é o nosso compromisso. Saiba como recolhemos, guardamos e processamos a sua informação.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-4 sticky top-32 bg-card/50 backdrop-blur-md border border-border p-6 rounded-2xl hidden lg:block">
              <h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider mb-4">Índice da Política</h3>
              <nav className="flex flex-col gap-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all text-sm font-medium"
                    >
                      <Icon className="w-4 h-4 text-ns-blue" />
                      {sec.label}
                    </a>
                  );
                })}
              </nav>
            </aside>

            {/* Privacy Document Body */}
            <div className="lg:col-span-8 bg-card/30 backdrop-blur-sm border border-border p-8 md:p-12 rounded-3xl space-y-12">
              
              {/* Secção 1 */}
              <section id="introducao" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-ns-blue" />
                  <h2 className="text-2xl font-display font-bold text-foreground">1. Introdução</h2>
                </div>
                <div className="text-muted-foreground font-light leading-relaxed space-y-4">
                  <p>
                    A <strong className="text-foreground font-semibold">{company.name || 'Dgeth Gráfica'}</strong> está empenhada em proteger a privacidade e os dados pessoais dos utilizadores do seu website. 
                    Esta política de privacidade descreve como recolhemos, utilizamos, processamos e protegemos as informações que nos fornece ao aceder e utilizar o nosso site.
                  </p>
                  <p>
                    Em Angola, o tratamento de dados pessoais é regulado pela <strong className="text-foreground font-semibold">Lei n.º 22/11, de 17 de Junho — Lei da Proteção de Dados Pessoais (LPDP)</strong>. 
                    Garantimos que todas as operações de recolha de dados respeitam integralmente os princípios da legalidade, transparência e confidencialidade estipulados por lei.
                  </p>
                </div>
              </section>

              <hr className="border-border" />

              {/* Secção 2 */}
              <section id="recolha" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-ns-blue" />
                  <h2 className="text-2xl font-display font-bold text-foreground">2. Recolha de Dados</h2>
                </div>
                <div className="text-muted-foreground font-light leading-relaxed space-y-4">
                  <p>
                    A {company.name || 'Dgeth Gráfica'} recolhe dados pessoais dos utilizadores de forma voluntária e legítima através de canais específicos:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong className="text-foreground font-semibold">Formulário de Pedido de Orçamento:</strong> Recolhemos informações como nome completo, endereço de correio eletrónico (email), contacto telefónico (telefone), descrição do pedido, e quaisquer ficheiros/anexos de imagem ou documento carregados pelo utilizador.
                    </li>
                    <li>
                      <strong className="text-foreground font-semibold">Formulário de Contacto Simples:</strong> Ao utilizar a nossa funcionalidade de envio para o WhatsApp, processamos a sua intenção de nos contactar, enviando os dados preenchidos diretamente para a aplicação de mensagens oficial da empresa.
                    </li>
                    <li>
                      <strong className="text-foreground font-semibold">Cookies e Dados de Navegação:</strong> Armazenamos cookies técnicos estritamente necessários para gerir a sessão (como no painel administrativo do back office) e manter as suas preferências. Não realizamos rastreio invasivo ou partilha comercial de dados de navegação.
                    </li>
                  </ul>
                </div>
              </section>

              <hr className="border-border" />

              {/* Secção 3 */}
              <section id="utilizacao" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-ns-blue" />
                  <h2 className="text-2xl font-display font-bold text-foreground">3. Utilização dos Dados</h2>
                </div>
                <div className="text-muted-foreground font-light leading-relaxed space-y-4">
                  <p>
                    Os dados recolhidos são utilizados exclusivamente para as seguintes finalidades legítimas:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Elaboração e envio de orçamentos e propostas comerciais personalizadas a pedido do utilizador.</li>
                    <li>Resposta a dúvidas, informações ou reclamações através dos contactos fornecidos (email ou telefone/WhatsApp).</li>
                    <li>Gestão interna de leads no nosso painel administrativo (back office) para controlo e acompanhamento de clientes.</li>
                    <li>Manutenção de segurança do website e prevenção de abusos em formulários.</li>
                  </ul>
                  <p>
                    <strong className="text-foreground font-semibold">Nota:</strong> Nunca vendemos, alugamos ou comercializamos os seus dados pessoais a terceiros. Os seus dados permanecem estritamente na posse da {company.name || 'Dgeth Gráfica'}.
                  </p>
                </div>
              </section>

              <hr className="border-border" />

              {/* Secção 4 */}
              <section id="seguranca" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-ns-blue" />
                  <h2 className="text-2xl font-display font-bold text-foreground">4. Segurança e Armazenamento</h2>
                </div>
                <div className="text-muted-foreground font-light leading-relaxed space-y-4">
                  <p>
                    Garantimos a segurança dos seus dados pessoais através da implementação de medidas técnicas de proteção. 
                    Toda a recolha de pedidos de orçamento é armazenada em bases de dados geridas pelo <strong className="text-foreground font-semibold">Supabase</strong>, 
                    com ligações encriptadas por SSL/TLS e políticas de segurança rigorosas ao nível da base de dados (RLS - Row Level Security).
                  </p>
                  <p>
                    Os ficheiros anexados para orçamentos são alojados de forma segura em buckets dedicados no Supabase Storage.
                    Os dados serão mantidos apenas durante o período estritamente necessário para cumprir as finalidades para as quais foram recolhidos ou para cumprimento de obrigações legais de arquivo.
                  </p>
                </div>
              </section>

              <hr className="border-border" />

              {/* Secção 5 */}
              <section id="direitos" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-ns-blue" />
                  <h2 className="text-2xl font-display font-bold text-foreground">5. Os Seus Direitos</h2>
                </div>
                <div className="text-muted-foreground font-light leading-relaxed space-y-4">
                  <p>
                    Ao abrigo da LPDP (Lei n.º 22/11 de Angola), assistem-lhe os seguintes direitos fundamentais relativamente aos seus dados pessoais:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-foreground font-semibold">Direito de Acesso:</strong> Confirmar se estamos a tratar os seus dados e receber informações sobre esse tratamento.</li>
                    <li><strong className="text-foreground font-semibold">Direito de Retificação:</strong> Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
                    <li><strong className="text-foreground font-semibold">Direito de Eliminação (Esquecimento):</strong> Solicitar que os seus dados sejam apagados das nossas bases de dados, exceto se houver obrigação legal ou interesse legítimo para a sua conservação.</li>
                    <li><strong className="text-foreground font-semibold">Direito de Oposição:</strong> Recusar o tratamento de dados para finalidades não essenciais ou para marketing.</li>
                  </ul>
                  <p>
                    Para exercer os seus direitos ou esclarecer qualquer dúvida sobre a nossa política de privacidade, pode contactar-nos diretamente através de:
                  </p>
                  <div className="bg-card border border-border p-5 rounded-xl space-y-2 mt-4 font-normal">
                    <p className="text-sm text-foreground"><span className="text-muted-foreground font-bold uppercase tracking-wider text-xs block">Email</span> {contacts.email || 'geral@dgeth.com'}</p>
                    <p className="text-sm text-foreground"><span className="text-muted-foreground font-bold uppercase tracking-wider text-xs block">Telefone</span> {contacts.phone || 'Angola'}</p>
                    <p className="text-sm text-foreground"><span className="text-muted-foreground font-bold uppercase tracking-wider text-xs block">Endereço</span> {contacts.address || 'Luanda, Angola'}</p>
                  </div>
                </div>
              </section>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
