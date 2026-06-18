import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// ─── Types ───────────────────────────────────────────────────────────────────
interface CompanyInfo {
  name: string;
  slogan: string;
  logo_url: string;
  logo_branco_url: string;
  hero_title: string;
  hero_tagline: string;
  cta_title: string;
}

interface Contacts {
  phone: string;
  email: string;
  address: string;
  working_hours: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
  whatsapp_url: string;
}

interface SiteDataContextType {
  company: CompanyInfo;
  contacts: Contacts;
  loading: boolean;
}

// ─── Defaults (fallback local) ────────────────────────────────────────────────
const defaultCompany: CompanyInfo = {
  name: 'Dgeth Gráfica',
  slogan: 'A gráfica que te move.',
  logo_url: '/imgs/logotipos/logo-azul.png',
  logo_branco_url: '/imgs/logotipos/logo-branco.png',
  hero_title: 'IDEIAS que GANHAM FORMA',
  hero_tagline: 'A solução completa para a comunicação e imagem do seu negócio. Design gráfico, impressão digital e brindes corporativos em Luanda.',
  cta_title: 'Pronto para dar forma à sua próxima ideia?',
};

const defaultContacts: Contacts = {
  phone: '+244 944 974 378',
  email: 'dgethgrafica@gmail.com',
  address: 'Rua da Missão, Kinaxixi, Ingombotas, Luanda — Angola',
  working_hours: 'Seg - Sáb: 08h00 – 16h00',
  facebook_url: 'https://www.facebook.com/Dgeth-Grafica',
  instagram_url: 'https://www.instagram.com/dgeth_grafica/',
  tiktok_url: 'https://www.tiktok.com/@dgeth_grafica',
  whatsapp_url: 'https://wa.me/244944974378',
};

// ─── Context ──────────────────────────────────────────────────────────────────
const SiteDataContext = createContext<SiteDataContextType>({
  company: defaultCompany,
  contacts: defaultContacts,
  loading: true,
});

export const useSiteData = () => useContext(SiteDataContext);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const SiteDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [company, setCompany] = useState<CompanyInfo>(defaultCompany);
  const [contacts, setContacts] = useState<Contacts>(defaultContacts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [companyRes, contactsRes] = await Promise.all([
          supabase.from('company_info').select('name,slogan,logo_url,logo_branco_url,hero_title,hero_tagline,cta_title').eq('id', 1).maybeSingle(),
          supabase.from('contacts').select('*').eq('id', 1).maybeSingle(),
        ]);

        if (companyRes.data) {
          setCompany({
            name: companyRes.data.name || defaultCompany.name,
            slogan: companyRes.data.slogan || defaultCompany.slogan,
            logo_url: companyRes.data.logo_url || defaultCompany.logo_url,
            logo_branco_url: companyRes.data.logo_branco_url || defaultCompany.logo_branco_url,
            hero_title: companyRes.data.hero_title || defaultCompany.hero_title,
            hero_tagline: companyRes.data.hero_tagline || defaultCompany.hero_tagline,
            cta_title: companyRes.data.cta_title || defaultCompany.cta_title,
          });
        }

        if (contactsRes.data) {
          setContacts({
            phone: contactsRes.data.phone || defaultContacts.phone,
            email: contactsRes.data.email || defaultContacts.email,
            address: contactsRes.data.address || defaultContacts.address,
            working_hours: contactsRes.data.working_hours || defaultContacts.working_hours,
            facebook_url: contactsRes.data.facebook_url || defaultContacts.facebook_url,
            instagram_url: contactsRes.data.instagram_url || defaultContacts.instagram_url,
            tiktok_url: contactsRes.data.tiktok_url || defaultContacts.tiktok_url,
            whatsapp_url: contactsRes.data.whatsapp_url || defaultContacts.whatsapp_url,
          });
        }
      } catch (err) {
        console.warn('Erro ao carregar dados globais do site, usando fallback local:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <SiteDataContext.Provider value={{ company, contacts, loading }}>
      {children}
    </SiteDataContext.Provider>
  );
};
