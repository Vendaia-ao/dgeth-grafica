import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface SEOProps {
  pagePath: string;
  defaultTitle: string;
  defaultDescription: string;
}

const SEO = ({ pagePath, defaultTitle, defaultDescription }: SEOProps) => {
  const { data: seo } = useQuery({
    queryKey: ['seo', pagePath],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_pages')
        .select('*')
        .eq('page_path', pagePath)
        .maybeSingle();
      if (error) {
        console.warn('Erro ao carregar SEO:', error);
        return null;
      }
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });

  useEffect(() => {
    const title = seo?.meta_title || defaultTitle;
    const description = seo?.meta_description || defaultDescription;

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }, [seo, defaultTitle, defaultDescription]);

  return null;
};

export default SEO;
