import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, Save, Loader2, GripVertical, Image as ImageIcon, Upload } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  destaque: boolean;
  sort_order: number;
}

const ServicesSettings = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [destaque, setDestaque] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Drag state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao carregar serviços: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setTitle('');
    setDescription('');
    setImage('');
    setDestaque(false);
    setModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description);
    setImage(service.image);
    setDestaque(service.destaque);
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingImage(true);
    const toastId = toast.loading('A carregar imagem...');

    try {
      const url = await uploadImage(file, 'services');
      setImage(url);
      toast.success('Imagem carregada!', { id: toastId });
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao carregar imagem: ' + err.message, { id: toastId });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingService) {
        // Update
        const { error } = await supabase
          .from('services')
          .update({
            title,
            description,
            image,
            destaque
          })
          .eq('id', editingService.id);

        if (error) throw error;
        toast.success('Serviço atualizado com sucesso!');
      } else {
        // Create
        const maxOrder = services.reduce((max, s) => s.sort_order > max ? s.sort_order : max, 0);
        const { error } = await supabase
          .from('services')
          .insert({
            title,
            description,
            image,
            destaque,
            sort_order: maxOrder + 1
          });

        if (error) throw error;
        toast.success('Serviço criado com sucesso!');
      }
      setModalOpen(false);
      fetchServices();
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao guardar: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem a certeza que deseja eliminar este serviço?')) return;

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Serviço eliminado!');
      fetchServices();
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao eliminar serviço: ' + err.message);
    }
  };

  // HTML5 Drag-and-Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedIndex(index);
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    setDraggedIndex(null);
    if (sourceIndex === targetIndex) return;

    const items = [...services];
    const [removed] = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, removed);

    const reordered = items.map((item, idx) => ({
      ...item,
      sort_order: idx + 1
    }));

    setServices(reordered);

    // Salvar no Supabase
    const updates = reordered.map(item => supabase
      .from('services')
      .update({ sort_order: item.sort_order })
      .eq('id', item.id)
    );

    try {
      await Promise.all(updates);
      toast.success('Ordenação atualizada com sucesso!');
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao salvar nova ordenação: ' + err.message);
      fetchServices();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-ns-blue" />
        <span className="ml-3 text-slate-400 font-medium">A carregar serviços...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Serviços</h1>
          <p className="text-slate-400 text-sm">Gira os serviços listados no site e reordene por arrastamento.</p>
        </div>
        <Button onClick={openAddModal} className="bg-ns-blue hover:bg-ns-dark text-white font-bold">
          <Plus className="w-4 h-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      {/* Lista de Serviços */}
      <div className="space-y-3">
        {services.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl text-slate-500">
            Nenhum serviço registado. Clique em "Novo Serviço" para começar.
          </div>
        ) : (
          services.map((service, idx) => (
            <div
              key={service.id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, idx)}
              className={`flex items-center justify-between p-4 bg-slate-900 border ${
                draggedIndex === idx ? 'border-ns-blue opacity-50' : 'border-slate-800'
              } rounded-xl text-white hover:border-slate-700 transition-all cursor-move`}
            >
              <div className="flex items-center gap-4">
                <GripVertical className="text-slate-500 cursor-grab active:cursor-grabbing" />
                <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {service.image ? (
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-slate-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    {service.title}
                    {service.destaque && (
                      <span className="text-[10px] bg-ns-yellow text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Destaque
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 max-w-xl">{service.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => openEditModal(service)} size="icon" variant="ghost" className="text-slate-400 hover:text-white hover:bg-slate-800">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button onClick={() => handleDelete(service.id)} size="icon" variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-950/20">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Criar / Editar */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Editar Serviço' : 'Novo Serviço'}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Preencha os detalhes do serviço. Campos em destaque aparecem na Home Page.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300 font-medium">Nome do Serviço</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Ex: Impressão Digital"
                className="bg-slate-950 border-slate-800 focus:border-ns-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300 font-medium">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Explicite o que oferece no serviço..."
                rows={4}
                className="bg-slate-950 border-slate-800 focus:border-ns-blue"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 font-medium">Imagem Ilustrativa</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {image ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-slate-600" />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    id="service-image-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    disabled={uploadingImage}
                    onClick={() => document.getElementById('service-image-file')?.click()}
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Fazer Upload
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="space-y-0.5">
                <Label htmlFor="destaque" className="text-slate-300">Marcar como Destaque</Label>
                <p className="text-xs text-slate-500">Exibir este serviço na secção especial da Home Page.</p>
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

export default ServicesSettings;
