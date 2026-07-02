import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, UserPlus, Trash2, Mail, Clock, ShieldAlert } from 'lucide-react';

interface Profile {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  permissions?: string[];
}

const AVAILABLE_PERMISSIONS = [
  { id: 'company', label: 'Empresa' },
  { id: 'services', label: 'Serviços' },
  { id: 'portfolio', label: 'Portfólio' },
  { id: 'contacts', label: 'Contactos' },
  { id: 'stats', label: 'Estatísticas' },
  { id: 'leads', label: 'Leads / Pedidos' },
  { id: 'users', label: 'Utilizadores' }
];

const UsersSettings = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newPermissions, setNewPermissions] = useState<string[]>(AVAILABLE_PERMISSIONS.map(p => p.id));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === '42P01') {
          toast.error('A vista public.profiles não existe. Execute o script SQL no Supabase.');
        } else {
          throw error;
        }
      } else {
        setUsers(data || []);
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao carregar utilizadores: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail || newUserPassword.length < 6) {
      toast.error('O email é obrigatório e a palavra-passe deve ter pelo menos 6 caracteres.');
      return;
    }

    setCreating(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
      });

      if (error) throw error;
      
      if (data.user) {
        // Gravar as permissões escolhidas
        const { error: permError } = await supabase
          .from('user_permissions')
          .insert({
            user_id: data.user.id,
            permissions: newPermissions
          });
        
        if (permError) {
          console.error(permError);
          toast.error('Utilizador criado, mas falhou ao definir as permissões.');
        } else {
          toast.success('Utilizador criado com sucesso!');
        }
      }

      setNewUserEmail('');
      setNewUserPassword('');
      setNewPermissions(AVAILABLE_PERMISSIONS.map(p => p.id)); // Reset
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao criar utilizador: ' + err.message);
    } finally {
      setCreating(false);
    }
  };

  const togglePermission = (id: string) => {
    setNewPermissions(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Tem a certeza que deseja eliminar permanentemente este utilizador? Esta ação não pode ser desfeita e o utilizador perderá o acesso ao painel.')) return;

    try {
      const { error } = await supabase.rpc('delete_user', { user_id: id });

      if (error) {
        if (error.code === '42883') {
           toast.error('A função delete_user não existe. Execute o script SQL no Supabase.');
        } else {
           throw error;
        }
      } else {
        toast.success('Utilizador eliminado com sucesso!');
        setUsers(prev => prev.filter(u => u.id !== id));
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao eliminar utilizador: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-ns-blue" />
        <span className="ml-3 text-slate-400 font-medium">A carregar utilizadores...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Gestão de Utilizadores</h1>
        <p className="text-slate-400 text-sm">Gira quem tem acesso a este painel de administração e as suas permissões.</p>
      </div>



      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg text-white">Adicionar Novo Utilizador</CardTitle>
          <CardDescription className="text-slate-400">Crie uma nova conta e defina os níveis de acesso.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateUser} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <Input 
                  type="email" 
                  placeholder="email@exemplo.com" 
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-white"
                  required
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-slate-300">Palavra-passe</label>
                <Input 
                  type="password" 
                  placeholder="Mínimo 6 caracteres" 
                  value={newUserPassword}
                  onChange={e => setNewUserPassword(e.target.value)}
                  className="bg-slate-950 border-slate-800 text-white"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">Permissões de Acesso</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                {AVAILABLE_PERMISSIONS.map(perm => (
                  <div key={perm.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`perm-${perm.id}`} 
                      checked={newPermissions.includes(perm.id)}
                      onCheckedChange={() => togglePermission(perm.id)}
                      className="border-slate-700 data-[state=checked]:bg-ns-blue data-[state=checked]:border-ns-blue"
                    />
                    <label 
                      htmlFor={`perm-${perm.id}`}
                      className="text-sm font-medium leading-none text-slate-300 cursor-pointer"
                    >
                      {perm.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" disabled={creating} className="bg-ns-blue hover:bg-ns-dark text-white w-full sm:w-auto">
              {creating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UserPlus className="w-4 h-4 mr-2" />}
              Adicionar Utilizador
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {users.length === 0 ? (
          <div className="text-center p-12 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-slate-400">Nenhum utilizador encontrado ou view inexistente.</p>
          </div>
        ) : (
          users.map((user) => (
            <Card key={user.id} className="bg-slate-900 border-slate-800">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Mail className="w-4 h-4 text-slate-400" />
                    {user.email}
                  </div>
                  
                  {/* Badges de Permissões */}
                  <div className="flex flex-wrap gap-2">
                    {user.permissions && user.permissions.length > 0 ? (
                      AVAILABLE_PERMISSIONS.filter(p => user.permissions?.includes(p.id)).map(perm => (
                        <Badge key={perm.id} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                          {perm.label}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline" className="border-red-900/50 text-red-400">Sem Acessos</Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Criado a: {new Date(user.created_at).toLocaleDateString('pt-PT')}
                    </span>
                    {user.last_sign_in_at && (
                      <span className="flex items-center gap-1">
                        Último acesso: {new Date(user.last_sign_in_at).toLocaleDateString('pt-PT')}
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => handleDeleteUser(user.id)} 
                  className="text-red-400 hover:text-red-300 hover:bg-red-950/20 shrink-0 self-start mt-2 sm:mt-0"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar Conta
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersSettings;
