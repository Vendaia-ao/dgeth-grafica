import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Upload, Loader2 } from 'lucide-react';

interface CompanyValue {
  title: string;
  desc: string;
}

const CompanySettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [aboutQuote, setAboutQuote] = useState('');
  const [aboutDetails, setAboutDetails] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [logoBrancoUrl, setLogoBrancoUrl] = useState('');
  const [values, setValues] = useState<CompanyValue[]>([]);
  const [heroTitle, setHeroTitle] = useState('IDEIAS que GANHAM FORMA');
  const [heroTagline, setHeroTagline] = useState('');
  const [ctaTitle, setCtaTitle] = useState('');

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('company_info')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setName(data.name || '');
        setSlogan(data.slogan || '');
        setAboutText(data.about_text || '');
        setAboutQuote(data.about_quote || '');
        setAboutDetails(data.about_details || '');
        setMission(data.mission || '');
        setVision(data.vision || '');
        setLogoUrl(data.logo_url || '');
        setLogoBrancoUrl(data.logo_branco_url || '');
        setValues(data.values || []);
        setHeroTitle(data.hero_title || 'IDEIAS que GANHAM FORMA');
        setHeroTagline(data.hero_tagline || '');
        setCtaTitle(data.cta_title || '');
      }
    } catch (error: any) {
      console.error(error);
      toast.error('Erro ao carregar dados da empresa: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'color' | 'white') => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    const toastId = toast.loading('A carregar imagem...');
    try {
      const url = await uploadImage(file, 'logos');
      if (type === 'color') {
        setLogoUrl(url);
      } else {
        setLogoBrancoUrl(url);
      }
      toast.success('Imagem carregada com sucesso!', { id: toastId });
    } catch (err: any) {
      console.error(err);
      toast.error('Erro no upload: ' + err.message, { id: toastId });
    }
  };

  const handleValueChange = (index: number, field: 'title' | 'desc', val: string) => {
    const updated = [...values];
    updated[index] = { ...updated[index], [field]: val };
    setValues(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('company_info')
        .upsert({
          id: 1,
          name,
          slogan,
          about_text: aboutText,
          about_quote: aboutQuote,
          about_details: aboutDetails,
          mission,
          vision,
          logo_url: logoUrl,
          logo_branco_url: logoBrancoUrl,
          values,
          hero_title: heroTitle,
          hero_tagline: heroTagline,
          cta_title: ctaTitle,
        });

      if (error) throw error;
      toast.success('Dados salvos com sucesso!');
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
        <span className="ml-3 text-slate-400 font-medium">A carregar dados da empresa...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Empresa</h1>
        <p className="text-slate-400 text-sm">Gira a identidade visual, textos da empresa e os valores institucionais.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Identidade Visual */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Identidade Visual</CardTitle>
            <CardDescription className="text-slate-400">Logótipos oficiais exibidos no cabeçalho e rodapé.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-slate-300">Logótipo Colorido (Fundo Claro)</Label>
              {logoUrl && (
                <div className="h-24 p-4 rounded-lg bg-white/5 border border-slate-800 flex items-center justify-center">
                  <img src={logoUrl} alt="Logo Colorido Preview" className="h-full object-contain" />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Input
                  id="logo-color"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, 'color')}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById('logo-color')?.click()}
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Carregar Logótipo
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-slate-300">Logótipo Branco (Fundo Escuro)</Label>
              {logoBrancoUrl && (
                <div className="h-24 p-4 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <img src={logoBrancoUrl} alt="Logo Branco Preview" className="h-full object-contain" />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Input
                  id="logo-white"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, 'white')}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById('logo-white')?.click()}
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Carregar Logótipo Branco
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hero e CTA da Página Principal */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Página Principal (Home)</CardTitle>
            <CardDescription className="text-slate-400">Textos do hero e do botão CTA na página inicial.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroTitle" className="text-slate-300">Título Hero (ex: "IDEIAS que GANHAM FORMA")</Label>
              <Input
                id="heroTitle"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="IDEIAS que GANHAM FORMA"
                className="bg-slate-950 border-slate-800 focus:border-ns-blue font-bold uppercase"
              />
              <p className="text-xs text-slate-500">A primeira palavra será o texto principal (grande). Mantém o formato: PALAVRA1 que PALAVRA2 PALAVRA3</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroTagline" className="text-slate-300">Tagline / Descrição Hero</Label>
              <Textarea
                id="heroTagline"
                value={heroTagline}
                onChange={(e) => setHeroTagline(e.target.value)}
                rows={3}
                placeholder="A solução completa para a comunicação e imagem do seu negócio..."
                className="bg-slate-950 border-slate-800 focus:border-ns-blue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaTitle" className="text-slate-300">Texto CTA Final</Label>
              <Input
                id="ctaTitle"
                value={ctaTitle}
                onChange={(e) => setCtaTitle(e.target.value)}
                placeholder="Pronto para dar forma à sua próxima ideia?"
                className="bg-slate-950 border-slate-800 focus:border-ns-blue"
              />
            </div>
          </CardContent>
        </Card>

        {/* Informações Básicas */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">Nome da Empresa</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slogan" className="text-slate-300">Slogan / Título Hero</Label>
                <Input
                  id="slogan"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  required
                  className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Textos da Empresa */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Quem Somos e Objetivos (Página Sobre Nós)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aboutText" className="text-slate-300">Texto principal "Quem Somos"</Label>
              <Textarea
                id="aboutText"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                rows={4}
                className="bg-slate-950 border-slate-800 focus:border-ns-blue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutQuote" className="text-slate-300">Citação de Destaque ("Nosso Objectivo")</Label>
              <Input
                id="aboutQuote"
                value={aboutQuote}
                onChange={(e) => setAboutQuote(e.target.value)}
                className="bg-slate-950 border-slate-800 focus:border-ns-blue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutDetails" className="text-slate-300">Detalhes Expandidos do Objectivo</Label>
              <Textarea
                id="aboutDetails"
                value={aboutDetails}
                onChange={(e) => setAboutDetails(e.target.value)}
                rows={3}
                className="bg-slate-950 border-slate-800 focus:border-ns-blue"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mission" className="text-slate-300">Missão</Label>
                <Textarea
                  id="mission"
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  rows={3}
                  className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision" className="text-slate-300">Visão</Label>
                <Textarea
                  id="vision"
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                  rows={3}
                  className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Valores */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Valores da Empresa</CardTitle>
            <CardDescription className="text-slate-400">Edite os valores institucionais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {values.map((val, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-slate-400 font-bold uppercase">Valor #{idx + 1}</Label>
                  <Input
                    value={val.title}
                    onChange={(e) => handleValueChange(idx, 'title', e.target.value)}
                    placeholder="Título do Valor"
                    className="bg-slate-900 border-slate-800 focus:border-ns-blue font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-slate-400 uppercase">Descrição</Label>
                  <Textarea
                    value={val.desc}
                    onChange={(e) => handleValueChange(idx, 'desc', e.target.value)}
                    placeholder="Descrição do valor"
                    rows={2}
                    className="bg-slate-900 border-slate-800 focus:border-ns-blue"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Botão Salvar */}
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

export default CompanySettings;
