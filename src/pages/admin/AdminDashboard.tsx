import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import CompanySettings from './CompanySettings';
import ServicesSettings from './ServicesSettings';
import PortfolioSettings from './PortfolioSettings';
import ContactsSettings from './ContactsSettings';
import StatsSettings from './StatsSettings';
import LeadsSettings from './LeadsSettings';
import UsersSettings from './UsersSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building, Image, Settings, Phone, BarChart2, LogOut, MessageSquare, Menu, X, Users, KeyRound, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

type AdminTab = 'company' | 'services' | 'portfolio' | 'contacts' | 'stats' | 'leads' | 'users';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('company');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [permissions, setPermissions] = useState<string[]>(['company', 'services', 'portfolio', 'contacts', 'stats', 'leads', 'users']);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const navigate = useNavigate();

  // Carregar permissões do utilizador atual
  useState(() => {
    const fetchPermissions = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('permissions')
            .eq('id', user.id)
            .single();
          
          if (data && data.permissions) {
            setPermissions(data.permissions);
            if (!data.permissions.includes(activeTab) && data.permissions.length > 0) {
              setActiveTab(data.permissions[0] as AdminTab);
            }
          }
        }
      } catch (err) {
        console.error('Erro ao carregar permissões:', err);
      } finally {
        setLoadingPermissions(false);
      }
    };
    fetchPermissions();
  });

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

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error('A palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }
    setUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success('Palavra-passe alterada com sucesso!');
      setIsPasswordModalOpen(false);
      setNewPassword('');
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao alterar palavra-passe: ' + err.message);
    } finally {
      setUpdatingPassword(false);
    }
  };

  const menuItems = [
    { id: 'company', label: 'Empresa', icon: Building },
    { id: 'services', label: 'Serviços', icon: Settings },
    { id: 'portfolio', label: 'Portfólio', icon: Image },
    { id: 'contacts', label: 'Contactos', icon: Phone },
    { id: 'stats', label: 'Estatísticas', icon: BarChart2 },
    { id: 'leads', label: 'Leads / Pedidos', icon: MessageSquare },
    { id: 'users', label: 'Utilizadores', icon: Users }
  ];

  const allowedMenuItems = menuItems.filter(item => permissions.includes(item.id));

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
            {loadingPermissions ? (
              <div className="flex justify-center p-4">
                 <Loader2 className="w-5 h-5 animate-spin text-ns-blue" />
              </div>
            ) : (
              allowedMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as AdminTab);
                      setIsMobileMenuOpen(false);
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
              })
            )}
          </nav>
        </div>

        {/* Logout and Settings */}
        <div className="mt-8 pt-4 border-t border-slate-800 space-y-2">
          <Button
            onClick={() => setIsPasswordModalOpen(true)}
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800/50 font-medium text-sm"
          >
            <KeyRound className="w-4 h-4 mr-2" />
            Alterar Palavra-passe
          </Button>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/20 font-bold text-sm"
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
          {activeTab === 'users' && <UsersSettings />}
        </div>
      </main>
      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-sm shadow-2xl relative">
            <button 
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-ns-blue" />
              Alterar Palavra-passe
            </h3>
            <p className="text-sm text-slate-400 mb-6">Insere uma nova palavra-passe segura para a tua conta.</p>
            
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nova Palavra-passe</label>
                <Input 
                  type="password" 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Mínimo de 6 caracteres"
                  className="bg-slate-950 border-slate-800 text-white"
                  minLength={6}
                  required
                />
              </div>
              <Button type="submit" disabled={updatingPassword} className="w-full bg-ns-blue hover:bg-ns-dark text-white">
                {updatingPassword ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Atualizar Palavra-passe
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
