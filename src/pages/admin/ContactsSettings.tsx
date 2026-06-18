import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Loader2 } from 'lucide-react';

const ContactsSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Contact States
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', 1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPhone(data.phone || '');
        setEmail(data.email || '');
        setAddress(data.address || '');
        setWorkingHours(data.working_hours || '');
        setFacebookUrl(data.facebook_url || '');
        setInstagramUrl(data.instagram_url || '');
        setTiktokUrl(data.tiktok_url || '');
        setWhatsappUrl(data.whatsapp_url || '');
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao carregar contactos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .upsert({
          id: 1,
          phone,
          email,
          address,
          working_hours: workingHours,
          facebook_url: facebookUrl,
          instagram_url: instagramUrl,
          tiktok_url: tiktokUrl,
          whatsapp_url: whatsappUrl
        });

      if (error) throw error;
      toast.success('Contactos guardados com sucesso!');
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao guardar contactos: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-ns-blue" />
        <span className="ml-3 text-slate-400 font-medium">A carregar contactos...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Contactos e Redes Sociais</h1>
        <p className="text-slate-400 text-sm">Atualize os dados de comunicação do website.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-300">Telefone</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+244 944 974 378"
                  className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="dgethgrafica@gmail.com"
                  className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-slate-300">Localização / Morada</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Rua da Missão, Luanda — Angola"
                className="bg-slate-950 border-slate-800 focus:border-ns-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workingHours" className="text-slate-300">Horário de Funcionamento</Label>
              <Input
                id="workingHours"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                required
                placeholder="Seg - Sáb: 08h00 – 16h00"
                className="bg-slate-950 border-slate-800 focus:border-ns-blue"
              />
            </div>
          </CardContent>
        </Card>

        {/* Links de Redes Sociais */}
        <Card className="bg-slate-900 border-slate-800 text-white">
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-md font-bold text-white mb-2">Links das Redes Sociais</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl" className="text-slate-300">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  type="url"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagramUrl" className="text-slate-300">Instagram URL</Label>
                <Input
                  id="instagramUrl"
                  type="url"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiktokUrl" className="text-slate-300">TikTok URL</Label>
                <Input
                  id="tiktokUrl"
                  type="url"
                  value={tiktokUrl}
                  onChange={(e) => setTiktokUrl(e.target.value)}
                  placeholder="https://tiktok.com/@..."
                  className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappUrl" className="text-slate-300">WhatsApp Link Direto</Label>
                <Input
                  id="whatsappUrl"
                  type="url"
                  value={whatsappUrl}
                  onChange={(e) => setWhatsappUrl(e.target.value)}
                  placeholder="https://wa.me/244..."
                  className="bg-slate-950 border-slate-800 focus:border-ns-blue"
                />
              </div>
            </div>
          </CardContent>
        </Card>

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

export default ContactsSettings;
