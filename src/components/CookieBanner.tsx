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
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[999] animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out">
      <div className="relative overflow-hidden rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-white/10 text-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4">
        {/* Glow Decorativo */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-ns-blue/20 blur-2xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-ns-cyan/20 blur-2xl rounded-full pointer-events-none" />

        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ns-blue/10 border border-ns-blue/20 flex items-center justify-center text-ns-blue">
              <Cookie className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base tracking-wide text-white">
                Valorizamos a sua privacidade
              </h3>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Cookies & Dados</p>
            </div>
          </div>
          <button 
            onClick={handleDecline}
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 text-sm text-slate-300 leading-relaxed font-light">
          Utilizamos cookies essenciais para o funcionamento do site e para melhorar a sua experiência. 
          Ao continuar, aceita o uso destes cookies. Pode ler mais na nossa{' '}
          <Link 
            to="/politica-de-privacidade" 
            className="text-ns-blue hover:text-ns-cyan underline underline-offset-4 font-medium transition-colors"
          >
            Política de Privacidade
          </Link>.
        </div>

        {/* Ações */}
        <div className="relative z-10 flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handleDecline}
            className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5"
          >
            Recusar
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-ns-blue hover:bg-ns-blue/80 text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,180,216,0.3)]"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
