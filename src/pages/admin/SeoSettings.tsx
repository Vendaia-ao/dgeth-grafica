import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

interface SeoPage {
  page_path: string;
  meta_title: string;
  meta_description: string;
}

const PAGES = [
  { path: '/', name: 'Página Inicial (Home)' },
  { path: '/servicos', name: 'Serviços' },
  { path: '/portfolio', name: 'Portfólio' },
  { path: '/sobre-nos', name: 'Sobre Nós' },
  { path: '/contacto', name: 'Contacto' }
];

const SeoSettings = () => {
  const [seoList, setSeoList] = useState<SeoPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSeo();
  }, []);

  const fetchSeo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('seo_pages')
        .select('*');

      if (error) throw error;

      // Garantir que todas as páginas definidas no array PAGES existam na lista
      const fullList = PAGES.map((p) => {
        const match = data?.find((d) => d.page_path === p.path);
        return {
          page_path: p.path,
          meta_title: match?.meta_title || '',
          meta_description: match?.meta_description || ''
        };
      });

      setSeoList(fullList);
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao carregar SEO: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeoChange = (index: number, field: keyof SeoPage, val: string) => {
    const updated = [...seoList];
    updated[index] = { ...updated[index], [field]: val };
    setSeoList(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updates = seoList.map((item) =>
        supabase
          .from('seo_pages')
          .upsert({
            page_path: item.page_path,
            meta_title: item.meta_title,
            meta_description: item.meta_description
          })
      );

      await Promise.all(updates);
      toast.success('SEO atualizado com sucesso!');
      fetchSeo();
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao salvar metatags: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-ns-blue" />
        <span className="ml-3 text-slate-400 font-medium">A carregar SEO...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">SEO (Otimização para Motores de Busca)</h1>
        <p className="text-slate-400 text-sm">Controle como as páginas do website aparecem nas pesquisas do Google.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-4">
          {seoList.map((seo, idx) => {
            const pageName = PAGES.find((p) => p.path === seo.page_path)?.name || seo.page_path;
            return (
              <Card key={seo.page_path} className="bg-slate-900 border-slate-800 text-white">
                <CardContent className="pt-6 space-y-4">
                  <div className="border-b border-slate-800 pb-2 mb-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-ns-blue">{pageName}</span>
                    <span className="text-xs text-slate-500 font-bold">{seo.page_path}</span>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Meta Title (Título da Página)</Label>
                    <Input
                      value={seo.meta_title}
                      onChange={(e) => handleSeoChange(idx, 'meta_title', e.target.value)}
                      required
                      placeholder="Ex: Dgeth Gráfica — Impressão e Brindes em Luanda"
                      className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                    />
                    <p className="text-[10px] text-slate-500">Recomendado: 50-60 caracteres.</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Meta Description (Descrição)</Label>
                    <Textarea
                      value={seo.meta_description}
                      onChange={(e) => handleSeoChange(idx, 'meta_description', e.target.value)}
                      required
                      placeholder="Breve resumo sobre o conteúdo exibido nesta página..."
                      rows={2}
                      className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                    />
                    <p className="text-[10px] text-slate-500">Recomendado: 150-160 caracteres.</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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

export default SeoSettings;
