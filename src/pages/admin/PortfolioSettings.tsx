import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, Save, Loader2, GripVertical, Image as ImageIcon, Upload } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  destaque: boolean;
  sort_order: number;
}

const CATEGORIES = [
  'Identidade Visual',
  'Brindes Corporativos',
  'Roll Ups e Backdrops',
  'Viaturas',
  'Equipamentos Desportivos',
  'Sublimação',
  'Outros'
];

const PortfolioSettings = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [destaque, setDestaque] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Drag state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao carregar portfólio: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory(CATEGORIES[0]);
    setImage('');
    setDestaque(false);
    setModalOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImage(item.image);
    setDestaque(item.destaque);
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingImage(true);
    const toastId = toast.loading('A carregar imagem...');

    try {
      const url = await uploadImage(file, 'portfolio');
      setImage(url);
      toast.success('Imagem carregada com sucesso!', { id: toastId });
    } catch (err: any) {
      console.error(err);
      toast.error('Erro no upload: ' + err.message, { id: toastId });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error('Selecione uma imagem para o item de portfólio.');
      return;
    }
    setSaving(true);

    try {
      if (editingItem) {
        // Update
        const { error } = await supabase
          .from('portfolio')
          .update({
            title,
            category,
            image,
            destaque
          })
          .eq('id', editingItem.id);

        if (error) throw error;
        toast.success('Item de portfólio atualizado!');
      } else {
        // Create
        const maxOrder = items.reduce((max, i) => i.sort_order > max ? i.sort_order : max, 0);
        const { error } = await supabase
          .from('portfolio')
          .insert({
            title,
            category,
            image,
            destaque,
            sort_order: maxOrder + 1
          });

        if (error) throw error;
        toast.success('Item de portfólio criado!');
      }
      setModalOpen(false);
      fetchPortfolio();
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao guardar item: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminar este item do portfólio?')) return;

    try {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Item eliminado!');
      fetchPortfolio();
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao eliminar item: ' + err.message);
    }
  };

  // Drag-and-drop
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedIndex(index);
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    setDraggedIndex(null);
    if (sourceIndex === targetIndex) return;

    const reorderedList = [...items];
    const [removed] = reorderedList.splice(sourceIndex, 1);
    reorderedList.splice(targetIndex, 0, removed);

    const updated = reorderedList.map((item, idx) => ({
      ...item,
      sort_order: idx + 1
    }));
    setItems(updated);

    const updates = updated.map(item => supabase
      .from('portfolio')
      .update({ sort_order: item.sort_order })
      .eq('id', item.id)
    );

    try {
      await Promise.all(updates);
      toast.success('Ordenação guardada!');
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao reordenar: ' + err.message);
      fetchPortfolio();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-ns-blue" />
        <span className="ml-3 text-slate-400 font-medium">A carregar portfólio...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Portfólio</h1>
          <p className="text-slate-400 text-sm">Gira os itens de portfólio exibidos e ordene arrastando.</p>
        </div>
        <Button onClick={openAddModal} className="bg-ns-blue hover:bg-ns-dark text-white font-bold">
          <Plus className="w-4 h-4 mr-2" />
          Novo Item
        </Button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-500">
            Nenhum item no portfólio. Clique em "Novo Item" para adicionar.
          </div>
        ) : (
          items.map((item, idx) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, idx)}
              className={`flex items-center justify-between p-4 bg-slate-900 border ${
                draggedIndex === idx ? 'border-ns-blue opacity-50' : 'border-slate-800'
              } rounded-xl text-white hover:border-slate-700 transition-all cursor-move`}
            >
              <div className="flex items-center gap-4">
                <GripVertical className="text-slate-500" />
                <div className="w-16 h-12 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    {item.title}
                    {item.destaque && (
                      <span className="text-[10px] bg-ns-yellow text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Destaque
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold">{item.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => openEditModal(item)} size="icon" variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button onClick={() => handleDelete(item.id)} size="icon" variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-950/20">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Editar Item do Portfólio' : 'Novo Item do Portfólio'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Adicione fotos e especificações de trabalhos executados pela Dgeth Gráfica.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300 font-medium">Título do Trabalho</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Ex: TECSEP Brinde Executivo"
                className="bg-slate-950 border-slate-800 focus:border-ns-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-300 font-medium">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-slate-950 border-slate-800 text-white focus:border-ns-blue">
                  <SelectValue placeholder="Selecione a Categoria" />
                </SelectTrigger>
                <SelectContent className="bg-slate-950 border-slate-800 text-white">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="focus:bg-slate-800 focus:text-white">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 font-medium">Fotografia / Imagem</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-16 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {image ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-slate-600" />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    id="portfolio-image-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    disabled={uploadingImage}
                    onClick={() => document.getElementById('portfolio-image-file')?.click()}
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Carregar Foto
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="space-y-0.5">
                <Label htmlFor="destaque" className="text-slate-300 font-semibold">Marcar Destaque</Label>
                <p className="text-xs text-slate-500">Exibir na página inicial (Teaser de Portfólio).</p>
              </div>
              <Switch
                id="destaque"
                checked={destaque}
                onCheckedChange={setDestaque}
                className="data-[state=checked]:bg-ns-blue"
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                Cancelar
              </Button>
              <Button type="submit" disabled={saving || uploadingImage} className="bg-ns-blue hover:bg-ns-dark text-white font-bold flex items-center gap-2">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                <Save className="w-4 h-4" />
                Gravar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PortfolioSettings;
