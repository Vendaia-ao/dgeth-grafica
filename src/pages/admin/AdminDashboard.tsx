import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import CompanySettings from './CompanySettings';
import ServicesSettings from './ServicesSettings';
import PortfolioSettings from './PortfolioSettings';
import ContactsSettings from './ContactsSettings';
import StatsSettings from './StatsSettings';
import LeadsSettings from './LeadsSettings';
import { Button } from '@/components/ui/button';
import { Building, Image, Settings, Phone, BarChart2, LogOut, MessageSquare, Menu, X } from 'lucide-react';
import { toast } from 'sonner';

type AdminTab = 'company' | 'services' | 'portfolio' | 'contacts' | 'stats' | 'leads';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('company');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Terminou a sessão com sucesso.');
      navigate('/admin/login');
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao terminar sessão: ' + err.message);
    }
  };

  const menuItems = [
    { id: 'company', label: 'Empresa', icon: Building },
    { id: 'services', label: 'Serviços', icon: Settings },
    { id: 'portfolio', label: 'Portfólio', icon: Image },
    { id: 'contacts', label: 'Contactos', icon: Phone },
    { id: 'stats', label: 'Estatísticas', icon: BarChart2 },
    { id: 'leads', label: 'Leads / Pedidos', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row relative">
      
      {/* Mobile Header (Hamburger Menu) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img 
            src="/imgs/logotipos/logo-branco.png" 
            alt="Dgeth Logo" 
            className="h-7 w-auto object-contain"
          />
          <span className="font-display font-black text-xs text-ns-blue uppercase tracking-widest">Painel</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-slate-300 focus:outline-none p-1"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Header Desktop*/}
          <div className="hidden md:flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
            <img 
              src="/imgs/logotipos/logo-branco.png" 
              alt="Dgeth Logo" 
              className="h-8 w-auto object-contain"
            />
            <span className="font-display font-black text-sm text-ns-blue uppercase tracking-widest">Painel</span>
          </div>
          
          {/* Mobile Header inside Sidebar */}
          <div className="md:hidden flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
             <span className="font-display font-black text-sm text-white uppercase tracking-widest">Menu</span>
             <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400">
               <X className="w-5 h-5" />
             </button>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    setIsMobileMenuOpen(false); // fecha o menu no mobile ao clicar
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-ns-blue text-white shadow-lg shadow-ns-blue/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="mt-8 pt-4 border-t border-slate-800">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/20 font-bold"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Terminar Sessão
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto max-h-screen">
        <div className="bg-slate-900/40 p-4 md:p-8 rounded-2xl border border-slate-800/80">
          {activeTab === 'company' && <CompanySettings />}
          {activeTab === 'services' && <ServicesSettings />}
          {activeTab === 'portfolio' && <PortfolioSettings />}
          {activeTab === 'contacts' && <ContactsSettings />}
          {activeTab === 'stats' && <StatsSettings />}
          {activeTab === 'leads' && <LeadsSettings />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
