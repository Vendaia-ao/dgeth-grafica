import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar se o utilizador já respondeu ao consentimento
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Pequeno atraso para uma entrada mais elegante
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full z-[999] animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out">
      <div className="bg-card border-t border-border px-4 py-3 md:px-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-foreground">
        {/* Conteúdo */}
        <div className="flex items-center gap-4 flex-1">
          <Cookie className="w-5 h-5 text-ns-blue flex-shrink-0 hidden sm:block" />
          <div className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Utilizamos cookies para assegurar o funcionamento correto do site e para melhorar a sua experiência. 
            Consulte a nossa{' '}
            <Link 
              to="/politica-de-privacidade" 
              className="text-ns-blue hover:text-ns-cyan underline underline-offset-4 font-medium transition-colors"
            >
              Política de Privacidade
            </Link>.
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors border border-border hover:bg-muted"
          >
            Recusar
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 text-xs font-bold uppercase tracking-wider bg-ns-blue hover:bg-ns-blue/80 text-white transition-all duration-300"
          >
            Aceitar
          </button>
          <button 
            onClick={handleDecline}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5 ml-1 md:ml-4"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
