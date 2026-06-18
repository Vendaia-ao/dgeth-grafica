import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Mail, Phone, Calendar, Download, FileText, CheckCircle, Clock, Archive, MoreVertical } from 'lucide-react';

interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  deadline: string | null;
  message: string;
  file_url: string | null;
  status: 'novo' | 'em_contacto' | 'convertido' | 'arquivado';
  notes: string | null;
}

const LeadsSettings = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao carregar leads: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success('Estado atualizado!');
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch (err: any) {
      console.error(err);
      toast.error('Erro ao atualizar estado: ' + err.message);
    }
  };

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'novo':
        return <Badge variant="default" className="bg-ns-blue">Novo</Badge>;
      case 'em_contacto':
        return <Badge variant="secondary" className="bg-ns-yellow text-slate-900">Em Contacto</Badge>;
      case 'convertido':
        return <Badge variant="default" className="bg-green-600">Convertido</Badge>;
      case 'arquivado':
        return <Badge variant="outline" className="text-slate-400 border-slate-700">Arquivado</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-ns-blue" />
        <span className="ml-3 text-slate-400 font-medium">A carregar leads...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Leads e Orçamentos</h1>
        <p className="text-slate-400 text-sm">Gira os pedidos de orçamento recebidos através do site.</p>
      </div>

      <div className="grid gap-6">
        {leads.length === 0 ? (
          <div className="text-center p-12 bg-slate-900 rounded-lg border border-slate-800">
            <p className="text-slate-400">Nenhum pedido de orçamento encontrado.</p>
          </div>
        ) : (
          leads.map((lead) => (
            <Card key={lead.id} className={`bg-slate-900 border-slate-800 text-white ${lead.status === 'novo' ? 'border-ns-blue/50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-3">
                      {lead.name}
                      {getStatusBadge(lead.status)}
                    </CardTitle>
                    <CardDescription className="text-slate-400 mt-1 flex items-center gap-2 text-xs">
                      <Calendar className="w-3 h-3" />
                      {new Date(lead.created_at).toLocaleString('pt-PT')}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {lead.status === 'novo' && (
                      <Button size="sm" onClick={() => handleStatusChange(lead.id, 'em_contacto')} className="bg-ns-yellow text-slate-900 hover:bg-ns-yellow/80">
                        <Clock className="w-4 h-4 mr-2" />
                        Em Contacto
                      </Button>
                    )}
                    {lead.status !== 'convertido' && lead.status !== 'arquivado' && (
                      <Button size="sm" onClick={() => handleStatusChange(lead.id, 'convertido')} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Converter
                      </Button>
                    )}
                    {lead.status !== 'arquivado' && (
                      <Button size="sm" variant="outline" onClick={() => handleStatusChange(lead.id, 'arquivado')} className="border-slate-700 text-slate-300 hover:text-white">
                        <Archive className="w-4 h-4 mr-2" />
                        Arquivar
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-ns-blue" />
                    <a href={`tel:${lead.phone}`} className="hover:text-white hover:underline">{lead.phone}</a>
                  </div>
                  {lead.email && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-ns-blue" />
                      <a href={`mailto:${lead.email}`} className="hover:text-white hover:underline">{lead.email}</a>
                    </div>
                  )}
                  {lead.service && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <FileText className="w-4 h-4 text-ns-blue" />
                      <span className="font-medium text-white">{lead.service}</span>
                    </div>
                  )}
                  {lead.deadline && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-ns-blue" />
                      <span>Prazo: {lead.deadline}</span>
                    </div>
                  )}
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                  <p className="text-sm text-slate-300 whitespace-pre-wrap">{lead.message}</p>
                </div>

                {lead.file_url && (
                  <div>
                    <a href={lead.file_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="border-ns-blue text-ns-blue hover:bg-ns-blue hover:text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Ver Anexo
                      </Button>
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default LeadsSettings;
