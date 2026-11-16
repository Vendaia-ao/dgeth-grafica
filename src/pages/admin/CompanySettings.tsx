import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/upload';
import { DifferentialItem, defaultDifferentials } from '@/context/SiteDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Save, 
  Upload, 
  Loader2, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw,
  Sparkles,
  Package,
  Clock,
  Users,
  Shield,
  Printer,
  Award,
  Heart,
  Check,
  AlertTriangle,
  Copy
} from 'lucide-react';

interface CompanyValue {
  title: string;
  desc: string;
}

const AVAILABLE_ICONS = [
  { value: 'package', label: 'Tudo num só lugar / Pacote', Icon: Package },
  { value: 'sparkles', label: 'Acabamento Profissional / Detalhes', Icon: Sparkles },
  { value: 'clock', label: 'Prazos Cumpridos / Rapidez', Icon: Clock },
  { value: 'users', label: 'Atendimento Próximo / Consultores', Icon: Users },
  { value: 'shield', label: 'Garantia e Confiança', Icon: Shield },
  { value: 'printer', label: 'Impressão e Produção Gráfica', Icon: Printer },
  { value: 'award', label: 'Qualidade e Excelência', Icon: Award },
  { value: 'heart', label: 'Dedicação e Parceria', Icon: Heart },
  { value: 'check', label: 'Vantagem Geral', Icon: Check },
];

const SQL_MIGRATION_SCRIPT = `ALTER TABLE public.company_info 
ADD COLUMN IF NOT EXISTS why_choose_title text DEFAULT 'Porquê escolher a Dgeth Gráfica?',
ADD COLUMN IF NOT EXISTS why_choose_image text DEFAULT '/imgs/portifolio/port (9).jpg',
ADD COLUMN IF NOT EXISTS why_choose_items jsonb DEFAULT '[]'::jsonb;`;

const CompanySettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Informações gerais e Sobre Nós
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

  // Home: Hero & CTA
  const [heroTitle, setHeroTitle] = useState('IDEIAS que GANHAM FORMA');
  const [heroTagline, setHeroTagline] = useState('');
  const [ctaTitle, setCtaTitle] = useState('');

  // Home: Secção "Porquê escolher a Dgeth Gráfica"
  const [whyChooseTitle, setWhyChooseTitle] = useState('Porquê escolher a Dgeth Gráfica?');
  const [whyChooseImage, setWhyChooseImage] = useState('/imgs/portifolio/port (9).jpg');
  const [whyChooseItems, setWhyChooseItems] = useState<DifferentialItem[]>(defaultDifferentials);
  const [uploadingWhyChooseImg, setUploadingWhyChooseImg] = useState(false);
  const [dbNeedsMigration, setDbNeedsMigration] = useState(false);

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

        setWhyChooseTitle(data.why_choose_title || 'Porquê escolher a Dgeth Gráfica?');
        setWhyChooseImage(data.why_choose_image || '/imgs/portifolio/port (9).jpg');
        setWhyChooseItems(
          Array.isArray(data.why_choose_items) && data.why_choose_items.length > 0
            ? data.why_choose_items
            : defaultDifferentials
        );
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

  const handleWhyChooseImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    const toastId = toast.loading('A carregar imagem para a secção...');
    setUploadingWhyChooseImg(true);
    try {
      const url = await uploadImage(file, 'portfolio');
      setWhyChooseImage(url);
      toast.success('Imagem carregada com sucesso!', { id: toastId });
    } catch (err: any) {
      console.error(err);
      toast.error('Erro no upload da imagem: ' + err.message, { id: toastId });
    } finally {
      setUploadingWhyChooseImg(false);
    }
  };

  const handleDifferentialChange = (index: number, field: keyof DifferentialItem, val: string) => {
    const updated = [...whyChooseItems];
    updated[index] = { ...updated[index], [field]: val };
    setWhyChooseItems(updated);
  };

  const handleAddDifferential = () => {
    setWhyChooseItems([
      ...whyChooseItems,
      {
        title: 'Novo Diferencial',
        desc: 'Descreva aqui o diferencial e o valor que este ponto agrega ao cliente.',
        icon: 'check',
      },
    ]);
  };

  const handleRemoveDifferential = (index: number) => {
    if (whyChooseItems.length <= 1) {
      toast.error('Deve manter pelo menos um diferencial na secção.');
      return;
    }
    setWhyChooseItems(whyChooseItems.filter((_, i) => i !== index));
  };

  const handleMoveDifferential = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= whyChooseItems.length) return;
    const updated = [...whyChooseItems];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setWhyChooseItems(updated);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_MIGRATION_SCRIPT);
    toast.success('Script SQL copiado para a área de transferência!');
  };

  const handleValueChange = (index: number, field: 'title' | 'desc', val: string) => {
    const updated = [...values];
    updated[index] = { ...updated[index], [field]: val };
    setValues(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const fullPayload: any = {
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
      why_choose_title: whyChooseTitle,
      why_choose_image: whyChooseImage,
      why_choose_items: whyChooseItems,
    };

    try {
      const { error } = await supabase
        .from('company_info')
        .upsert(fullPayload);

      if (error) {
        // Verificar se a coluna ainda não existe na base de dados do Supabase
        if (error.message?.includes('why_choose') || error.code === 'PGRST204') {
          setDbNeedsMigration(true);
          
          // Tentar guardar os outros campos da empresa para não perder alterações
          const fallbackPayload = { ...fullPayload };
          delete fallbackPayload.why_choose_title;
          delete fallbackPayload.why_choose_image;
          delete fallbackPayload.why_choose_items;
          
          const { error: fallbackError } = await supabase
            .from('company_info')
            .upsert(fallbackPayload);
            
          if (fallbackError) throw fallbackError;
          
          toast.warning('Dados base guardados. As colunas da secção "Porquê Escolher" ainda não foram criadas no Supabase.');
          return;
        }
        throw error;
      }

      setDbNeedsMigration(false);
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
    <div className="space-y-6 max-w-4xl pb-16">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Empresa & Página Inicial</h1>
        <p className="text-slate-400 text-sm">Gira a identidade visual, as secções da página inicial e os textos institucionais.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Identidade Visual */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Identidade Visual (Logótipos)</CardTitle>
            <CardDescription className="text-slate-400">
              Estes logótipos são utilizados na barra de navegação, rodapé e em todo o website.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-slate-300">Logótipo Principal (Fundo Claro / Azul)</Label>
              <div className="border border-slate-800 rounded-lg p-4 bg-slate-950 flex flex-col items-center justify-center gap-4">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo Colorido" className="h-16 object-contain" />
                ) : (
                  <div className="h-16 flex items-center justify-center text-slate-500 text-sm">Sem logótipo</div>
                )}
                <input
                  type="file"
                  id="logo-color"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, 'color')}
                />
                <Button
                  type="button"
                  onClick={() => document.getElementById('logo-color')?.click()}
                  variant="outline"
                  className="w-full border-slate-700 text-slate-300 hover:text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Carregar Logótipo Azul
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">Logótipo Branco (Fundo Escuro)</Label>
              <div className="border border-slate-800 rounded-lg p-4 bg-slate-950 flex flex-col items-center justify-center gap-4">
                {logoBrancoUrl ? (
                  <div className="bg-slate-900 p-2 rounded w-full flex justify-center">
                    <img src={logoBrancoUrl} alt="Logo Branco" className="h-12 object-contain" />
                  </div>
                ) : (
                  <div className="h-16 flex items-center justify-center text-slate-500 text-sm">Sem logótipo</div>
                )}
                <input
                  type="file"
                  id="logo-white"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleLogoUpload(e, 'white')}
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
            <CardTitle className="text-lg">Página Principal: Hero & CTA</CardTitle>
            <CardDescription className="text-slate-400">Textos do topo (Hero) e do botão final de chamada para ação (CTA).</CardDescription>
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
              <p className="text-xs text-slate-500">A primeira palavra será o texto principal em destaque.</p>
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

        {/* SECÇÃO "PORQUÊ ESCOLHER A DGETH GRÁFICA" (HOME) */}
        <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <span>Secção "Porquê escolher a Dgeth Gráfica?"</span>
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Edite o título, a imagem de destaque e a lista de diferenciais exibidos na Home Page.
                </CardDescription>
              </div>
              <span className="self-start sm:self-auto text-xs font-semibold text-ns-blue bg-ns-blue/10 px-3 py-1 rounded-full border border-ns-blue/30">
                Home Page
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Alerta de migração caso as colunas ainda não existam no Supabase */}
            {dbNeedsMigration && (
              <div className="p-4 rounded-lg bg-amber-950/40 border border-amber-600/40 text-amber-200 text-sm space-y-3">
                <div className="flex items-center gap-2 font-semibold text-amber-300">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400" />
                  <span>Configuração da Base de Dados necessária no Supabase</span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  Para guardar permanentemente os novos campos da secção "Porquê Escolher", execute este comando no <strong>SQL Editor</strong> do painel do Supabase:
                </p>
                <div className="relative">
                  <pre className="p-3 rounded bg-slate-950 text-xs font-mono text-slate-300 overflow-x-auto border border-amber-800/30">
                    {SQL_MIGRATION_SCRIPT}
                  </pre>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={handleCopySql}
                    className="absolute top-2 right-2 border-slate-700 bg-slate-900 text-slate-200 hover:text-white text-xs h-7 gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copiar SQL
                  </Button>
                </div>
              </div>
            )}

            {/* Título da Secção */}
            <div className="space-y-2">
              <Label htmlFor="whyChooseTitle" className="text-slate-300 font-semibold">
                Título Principal da Secção
              </Label>
              <Input
                id="whyChooseTitle"
                value={whyChooseTitle}
                onChange={(e) => setWhyChooseTitle(e.target.value)}
                placeholder="Porquê escolher a Dgeth Gráfica?"
                className="bg-slate-950 border-slate-800 focus:border-ns-blue font-bold text-base"
              />
              <p className="text-xs text-slate-500">
                Texto exibido no cabeçalho da secção na página principal.
              </p>
            </div>

            {/* Imagem de Destaque da Secção */}
            <div className="space-y-3">
              <Label className="text-slate-300 font-semibold">
                Imagem Ilustrativa da Secção
              </Label>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 grid md:grid-cols-12 gap-6 items-center">
                
                {/* Preview */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-fit max-w-full rounded-lg overflow-hidden border border-slate-800 bg-slate-900 shadow-inner group p-1 flex flex-col items-center justify-center">
                    <img
                      src={whyChooseImage || '/imgs/portifolio/port (9).jpg'}
                      alt="Pré-visualização"
                      className="w-auto h-auto max-h-48 max-w-full object-contain rounded block"
                      onError={(e) => {
                        // fallback se a imagem falhar
                        (e.target as HTMLImageElement).src = '/imgs/portifolio/port (9).jpg';
                      }}
                    />
                    <span className="mt-1 text-[11px] font-medium text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800/80">
                      Pré-visualização
                    </span>
                  </div>
                </div>

                {/* Controlos de Imagem */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <Label htmlFor="whyChooseImgInput" className="text-xs text-slate-400">
                      URL ou Caminho da Imagem
                    </Label>
                    <Input
                      id="whyChooseImgInput"
                      value={whyChooseImage}
                      onChange={(e) => setWhyChooseImage(e.target.value)}
                      placeholder="/imgs/portifolio/port (9).jpg ou https://..."
                      className="bg-slate-900 border-slate-800 focus:border-ns-blue mt-1 font-mono text-xs"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="file"
                      id="why-choose-file-input"
                      className="hidden"
                      accept="image/*"
                      onChange={handleWhyChooseImageUpload}
                    />
                    <Button
                      type="button"
                      disabled={uploadingWhyChooseImg}
                      onClick={() => document.getElementById('why-choose-file-input')?.click()}
                      className="bg-ns-blue hover:bg-ns-dark text-white font-medium text-sm flex items-center gap-2"
                    >
                      {uploadingWhyChooseImg ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      Carregar Nova Imagem
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setWhyChooseImage('/imgs/portifolio/port (9).jpg')}
                      className="border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 text-xs gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Repor Imagem Padrão
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Diferenciais / Pontos Fortes */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300 font-semibold text-base">
                    Diferenciais e Pontos Fortes
                  </Label>
                  <p className="text-xs text-slate-400">
                    Configure cada um dos itens apresentados ao lado da imagem ({whyChooseItems.length} diferenciais ativos).
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={handleAddDifferential}
                  size="sm"
                  className="bg-ns-blue/20 hover:bg-ns-blue text-ns-blue hover:text-white border border-ns-blue/40 font-semibold gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Ponto Forte
                </Button>
              </div>

              <div className="space-y-4">
                {whyChooseItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-4 transition-all hover:border-slate-700"
                  >
                    {/* Cabeçalho do item com botões de ordenação e eliminação */}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-ns-blue/20 text-ns-blue text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-slate-200">
                          {item.title || `Diferencial #${idx + 1}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={idx === 0}
                          onClick={() => handleMoveDifferential(idx, 'up')}
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30"
                          title="Mover para cima"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={idx === whyChooseItems.length - 1}
                          onClick={() => handleMoveDifferential(idx, 'down')}
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30"
                          title="Mover para baixo"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveDifferential(idx)}
                          className="h-8 w-8 text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 ml-1"
                          title="Remover este diferencial"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Conteúdo do diferencial */}
                    <div className="grid md:grid-cols-12 gap-4">
                      
                      {/* Ícone */}
                      <div className="md:col-span-4 space-y-1.5">
                        <Label className="text-xs text-slate-400 uppercase font-semibold">
                          Ícone
                        </Label>
                        <Select
                          value={item.icon || 'check'}
                          onValueChange={(val) => handleDifferentialChange(idx, 'icon', val)}
                        >
                          <SelectTrigger className="bg-slate-900 border-slate-800 focus:border-ns-blue text-xs">
                            <SelectValue placeholder="Selecione o ícone" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900 border-slate-800 text-white">
                            {AVAILABLE_ICONS.map((ico) => {
                              const IconComponent = ico.Icon;
                              return (
                                <SelectItem key={ico.value} value={ico.value} className="text-xs flex items-center gap-2 focus:bg-slate-800">
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="w-3.5 h-3.5 text-ns-blue" />
                                    <span>{ico.label}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Título */}
                      <div className="md:col-span-8 space-y-1.5">
                        <Label className="text-xs text-slate-400 uppercase font-semibold">
                          Título do Ponto Forte
                        </Label>
                        <Input
                          value={item.title}
                          onChange={(e) => handleDifferentialChange(idx, 'title', e.target.value)}
                          placeholder="Ex: Tudo num só lugar"
                          className="bg-slate-900 border-slate-800 focus:border-ns-blue font-bold text-sm"
                        />
                      </div>

                      {/* Descrição */}
                      <div className="md:col-span-12 space-y-1.5">
                        <Label className="text-xs text-slate-400 uppercase font-semibold">
                          Descrição Detalhada
                        </Label>
                        <Textarea
                          value={item.desc}
                          onChange={(e) => handleDifferentialChange(idx, 'desc', e.target.value)}
                          placeholder="Ex: Do design à entrega final, centralizamos o processo..."
                          rows={2}
                          className="bg-slate-900 border-slate-800 focus:border-ns-blue text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Básicas da Empresa */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Informações Gerais da Empresa</CardTitle>
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
                <Label htmlFor="slogan" className="text-slate-300">Slogan Institucional</Label>
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

        {/* Textos da Empresa (Página Sobre Nós) */}
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

        {/* Botão Salvar Fixo / Final */}
        <div className="sticky bottom-4 z-20 flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="bg-ns-blue hover:bg-ns-dark text-white font-bold px-8 py-6 shadow-2xl flex items-center gap-2 text-base transition-all transform hover:scale-[1.02] active:scale-95"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Guardar Todas as Alterações
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanySettings;
