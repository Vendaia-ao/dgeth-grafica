import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface DifferentialItem {
  title: string;
  desc: string;
  icon?: string;
  iconPath?: string;
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  logo_url: string;
  logo_branco_url: string;
  hero_title: string;
  hero_tagline: string;
  cta_title: string;
  why_choose_title: string;
  why_choose_image: string;
  why_choose_items: DifferentialItem[];
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
export const defaultDifferentials: DifferentialItem[] = [
  {
    title: 'Tudo num só lugar',
    desc: 'Do design à entrega final, centralizamos o processo para garantir consistência.',
    icon: 'package',
    iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
  {
    title: 'Acabamento profissional',
    desc: 'Verniz, corte especial, hot stamping. Detalhes que elevam o valor percebido.',
    icon: 'sparkles',
    iconPath: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    title: 'Prazos cumpridos',
    desc: 'Respeitamos o seu cronograma. Sabemos que em negócios, tempo é dinheiro.',
    icon: 'clock',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Atendimento próximo',
    desc: 'Consultores reais prontos para resolver, no WhatsApp ou presencialmente.',
    icon: 'users',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
];

const defaultCompany: CompanyInfo = {
  name: 'Dgeth Gráfica',
  slogan: 'A gráfica que te move.',
  logo_url: '/imgs/logotipos/logo-azul.png',
  logo_branco_url: '/imgs/logotipos/logo-branco.png',
  hero_title: 'IDEIAS que GANHAM FORMA',
  hero_tagline: 'A solução completa para a comunicação e imagem do seu negócio. Design gráfico, impressão digital e brindes corporativos em Luanda.',
  cta_title: 'Pronto para dar forma à sua próxima ideia?',
  why_choose_title: 'Porquê escolher a Dgeth Gráfica?',
  why_choose_image: '/imgs/portifolio/port (9).jpg',
  why_choose_items: defaultDifferentials,
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
          supabase.from('company_info').select('*').eq('id', 1).maybeSingle(),
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
            why_choose_title: companyRes.data.why_choose_title || defaultCompany.why_choose_title,
            why_choose_image: companyRes.data.why_choose_image || defaultCompany.why_choose_image,
            why_choose_items: (Array.isArray(companyRes.data.why_choose_items) && companyRes.data.why_choose_items.length > 0)
              ? companyRes.data.why_choose_items
              : defaultCompany.why_choose_items,
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
