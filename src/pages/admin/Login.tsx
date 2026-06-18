import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Se o utilizador já estiver autenticado, redireciona para o admin
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/admin');
      }
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || 'Credenciais inválidas');
      } else if (data.session) {
        toast.success('Login efetuado com sucesso!');
        navigate('/admin');
      }
    } catch (err) {
      console.error(err);
      toast.error('Ocorreu um erro no processo de login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background radial soft gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ns-blue blur-[120px] rounded-full" />
      </div>

      <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white relative z-10 shadow-2xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <img 
              src="/imgs/logotipos/logo-branco.png" 
              alt="Dgeth Gráfica Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-display font-bold">Painel Administrativo</CardTitle>
          <CardDescription className="text-slate-400">
            Entre com as suas credenciais para aceder ao back office.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@dgeth.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-950 border-slate-800 focus:border-ns-blue text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Palavra-passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-950 border-slate-800 focus:border-ns-blue text-white"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-4 flex flex-col gap-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-ns-blue hover:bg-ns-dark text-white font-bold py-3 transition-colors"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>A entrar...</span>
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
