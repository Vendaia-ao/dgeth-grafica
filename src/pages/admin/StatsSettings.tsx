import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

interface Stat {
  id: string;
  prefix: string;
  value: number;
  label: string;
  sublabel: string;
  sort_order: number;
}

const StatsSettings = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setStats(data || []);
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao carregar estatísticas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatChange = (index: number, field: keyof Stat, val: string | number) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: val };
    setStats(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Gravar todas as estatísticas na base de dados
      const updates = stats.map((stat) => 
        supabase
          .from('stats')
          .upsert({
            id: stat.id,
            prefix: stat.prefix,
            value: stat.value,
            label: stat.label,
            sublabel: stat.sublabel,
            sort_order: stat.sort_order
          })
      );

      await Promise.all(updates);
      toast.success('Estatísticas guardadas com sucesso!');
      fetchStats();
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao guardar alterações: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-ns-blue" />
        <span className="ml-3 text-slate-400 font-medium">A carregar estatísticas...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Estatísticas</h1>
        <p className="text-slate-400 text-sm">Gira os números em destaque na secção "Em Números" da Home Page.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {stats.map((stat, idx) => (
            <Card key={stat.id || idx} className="bg-slate-900 border-slate-800 text-white">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="text-xs font-bold text-ns-blue uppercase tracking-wider">Contador #{idx + 1}</span>
                  <span className="text-2xl font-display font-black text-slate-500">
                    {stat.prefix}{stat.value}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1 space-y-2">
                    <Label className="text-slate-300">Prefixo</Label>
                    <Input
                      value={stat.prefix}
                      onChange={(e) => handleStatChange(idx, 'prefix', e.target.value)}
                      placeholder="Ex: +"
                      className="bg-slate-950 border-slate-800 focus:border-ns-blue text-center font-bold"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-slate-300">Valor Final</Label>
                    <Input
                      type="number"
                      value={stat.value}
                      onChange={(e) => handleStatChange(idx, 'value', parseInt(e.target.value, 10) || 0)}
                      required
                      placeholder="Ex: 300"
                      className="bg-slate-950 border-slate-800 focus:border-ns-blue text-center font-bold"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Etiqueta</Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                      required
                      placeholder="Ex: Clientes"
                      className="bg-slate-950 border-slate-800 focus:border-ns-blue font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Sublabel</Label>
                    <Input
                      value={stat.sublabel}
                      onChange={(e) => handleStatChange(idx, 'sublabel', e.target.value)}
                      placeholder="Ex: Satisfeitos"
                      className="bg-slate-950 border-slate-800 focus:border-ns-blue text-slate-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botão de gravação */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="bg-ns-blue hover:bg-ns-dark text-white font-bold px-6 py-5 flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Guardar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StatsSettings;
