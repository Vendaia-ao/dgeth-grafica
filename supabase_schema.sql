-- Script de Base de Dados para o Supabase (Dgeth Gráfica)
-- Cole e execute este script no "SQL Editor" do seu painel do Supabase.

-- =========================================================================
-- 1. Criação das Tabelas
-- =========================================================================

-- Tabela de informações da empresa (Apenas 1 linha permitida)
create table if not exists public.company_info (
    id int primary key default 1,
    name text not null default 'Dgeth Gráfica',
    slogan text default 'A gráfica que te move.',
    about_text text,
    about_quote text,
    about_details text,
    mission text,
    vision text,
    logo_url text default '/imgs/logotipos/logo-azul.png',
    logo_branco_url text default '/imgs/logotipos/logo-branco.png',
    values jsonb default '[]'::jsonb,
    constraint only_one_row check (id = 1)
);

-- Tabela de serviços
create table if not exists public.services (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    image text not null,
    destaque boolean default false,
    sort_order int default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de portfólio
create table if not exists public.portfolio (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    category text not null,
    image text not null,
    destaque boolean default false,
    sort_order int default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela de contactos (Apenas 1 linha permitida)
create table if not exists public.contacts (
    id int primary key default 1,
    phone text default '+244 944 974 378',
    email text default 'dgethgrafica@gmail.com',
    address text default 'Rua da Missão, Kinaxixi, Ingombotas, Luanda — Angola',
    working_hours text default 'Seg - Sáb: 08h00 – 16h00',
    facebook_url text default 'https://www.facebook.com/Dgeth-Grafica',
    instagram_url text default 'https://www.instagram.com/dgeth_grafica/',
    tiktok_url text default 'https://www.tiktok.com/@dgeth_grafica',
    whatsapp_url text default 'https://wa.me/244944974378',
    constraint only_one_row check (id = 1)
);

-- Tabela de estatísticas (stats)
create table if not exists public.stats (
    id uuid default gen_random_uuid() primary key,
    prefix text default '',
    value int not null default 0,
    label text not null,
    sublabel text,
    sort_order int default 0
);

-- Tabela de SEO por página
create table if not exists public.seo_pages (
    page_path text primary key, -- ex: '/', '/servicos', '/portfolio', '/sobre-nos', '/contacto'
    meta_title text not null,
    meta_description text not null
);

-- =========================================================================
-- 2. Habilitar RLS (Row Level Security)
-- =========================================================================
alter table public.company_info enable row level security;
alter table public.services enable row level security;
alter table public.portfolio enable row level security;
alter table public.contacts enable row level security;
alter table public.stats enable row level security;
alter table public.seo_pages enable row level security;

-- =========================================================================
-- 3. Políticas de Acesso Público (Leitura Livre)
-- =========================================================================
create policy "Allow public read on company_info" on public.company_info for select using (true);
create policy "Allow public read on services" on public.services for select using (true);
create policy "Allow public read on portfolio" on public.portfolio for select using (true);
create policy "Allow public read on contacts" on public.contacts for select using (true);
create policy "Allow public read on stats" on public.stats for select using (true);
create policy "Allow public read on seo_pages" on public.seo_pages for select using (true);

-- =========================================================================
-- 4. Políticas de Escrita Segura (Apenas Autenticados)
-- =========================================================================
create policy "Allow write access to company_info for admin" on public.company_info for all using (auth.role() = 'authenticated');
create policy "Allow write access to services for admin" on public.services for all using (auth.role() = 'authenticated');
create policy "Allow write access to portfolio for admin" on public.portfolio for all using (auth.role() = 'authenticated');
create policy "Allow write access to contacts for admin" on public.contacts for all using (auth.role() = 'authenticated');
create policy "Allow write access to stats for admin" on public.stats for all using (auth.role() = 'authenticated');
create policy "Allow write access to seo_pages for admin" on public.seo_pages for all using (auth.role() = 'authenticated');

-- =========================================================================
-- 5. Inserção de Dados Iniciais (Defaults do Site)
-- =========================================================================

-- Empresa
insert into public.company_info (id, name, slogan, about_text, about_quote, about_details, mission, vision, logo_url, logo_branco_url, values)
values (
    1,
    'Dgeth Gráfica',
    'A gráfica que te move.',
    'Empresa privada de direito angolano, constituída aos 22 de Maio de 2023 em Luanda, matriculada na Conservatória de Registro Comercial da 2ª Seção do Guiché Único de Empresas, contribuinte fiscal nº 5001496662. A Dgeth Gráfica é uma empresa especializada em oferecer soluções de impressão de alta qualidade para empresas e indivíduos. Com 3 anos de experiência, contamos com uma equipe jovem e dinâmica, tecnologia de ponta e um compromisso inabalável com a excelência e inovação.',
    'Transformar ideias em materiais impressos impactantes, atendendo desde pequenas até grandes produções.',
    'O objectivo específico da nossa empresa é oferecer soluções completas e inovadoras em comunicação visual e brindes corporativos, focadas no fortalecimento da marca dos nossos clientes. Também disponibilizamos serviços de design gráfico e identidade visual, produção de materiais publicitários em vinil, banners, roll ups, lonas, backdrops e muito mais.',
    'Oferecer serviços gráficos de alta qualidade, atendendo às necessidades dos clientes com excelência, criatividade e compromisso garantindo sempre o melhor resultado.',
    'Ser referência em soluções gráficas na região, trazendo inovação e tecnologia para transformar a comunicação visual dos nossos clientes.',
    '/imgs/logotipos/logo-azul.png',
    '/imgs/logotipos/logo-branco.png',
    '[
      {"title": "Qualidade", "desc": "Compromisso com um serviço impecável."},
      {"title": "Inovação", "desc": "Buscar constantemente novas tecnologias e tendências."},
      {"title": "Compromisso com o cliente", "desc": "Atendimento personalizado e eficaz."},
      {"title": "Sustentabilidade", "desc": "Uso responsável de materiais e processos ecológicos."},
      {"title": "Ética e transparência", "desc": "Relações baseadas na confiança e respeito."}
    ]'::jsonb
) on conflict (id) do update set
    name = excluded.name,
    slogan = excluded.slogan,
    about_text = excluded.about_text,
    about_quote = excluded.about_quote,
    about_details = excluded.about_details,
    mission = excluded.mission,
    vision = excluded.vision;

-- Contactos
insert into public.contacts (id, phone, email, address, working_hours, facebook_url, instagram_url, tiktok_url, whatsapp_url)
values (
    1,
    '+244 944 974 378',
    'dgethgrafica@gmail.com',
    'Rua da Missão, Kinaxixi, Ingombotas, Luanda — Angola',
    'Seg - Sáb: 08h00 – 16h00',
    'https://www.facebook.com/Dgeth-Grafica',
    'https://www.instagram.com/dgeth_grafica/',
    'https://www.tiktok.com/@dgeth_grafica',
    'https://wa.me/244944974378'
) on conflict (id) do update set
    phone = excluded.phone,
    email = excluded.email,
    address = excluded.address,
    working_hours = excluded.working_hours,
    facebook_url = excluded.facebook_url,
    instagram_url = excluded.instagram_url,
    tiktok_url = excluded.tiktok_url,
    whatsapp_url = excluded.whatsapp_url;

-- Estatísticas (Stats)
insert into public.stats (prefix, value, label, sublabel, sort_order)
values 
    ('+', 300, 'Clientes', 'Satisfeitos', 1),
    ('+', 3, 'Anos', 'De experiência', 2),
    ('', 7, 'Soluções', 'Disponíveis', 3),
    ('', 1, 'Localização', 'Luanda, Angola', 4);

-- SEO Páginas
insert into public.seo_pages (page_path, meta_title, meta_description)
values 
    ('/', 'Dgeth Gráfica — Comunicação & Imagem', 'Soluções completas e inovadoras em comunicação visual, brindes corporativos e impressão gráfica em Luanda, Angola.'),
    ('/servicos', 'Serviços — Dgeth Gráfica', 'Consulte os nossos serviços de design de identidade visual, brindes corporativos, envelopamento, fachadas luminosas, banners e vinil publicitário.'),
    ('/portfolio', 'Portfólio — Dgeth Gráfica', 'Veja os projetos e trabalhos realizados pela Dgeth Gráfica em Luanda.'),
    ('/sobre-nos', 'Sobre Nós — Dgeth Gráfica', 'Conheça a nossa missão, visão, valores e o percurso da Dgeth Gráfica no mercado de impressão em Angola.'),
    ('/contacto', 'Contacto — Dgeth Gráfica', 'Fale connosco e solicite um orçamento gratuito para os seus projetos gráficos.')
on conflict (page_path) do update set
    meta_title = excluded.meta_title,
    meta_description = excluded.meta_description;

-- Serviços
insert into public.services (title, description, image, destaque, sort_order)
values 
    ('Identidade Visual', 'Transformamos a identidade da sua marca em algo único, profissional e memorável. Desenvolvemos logotipos, paletas de cores, tipografias e materiais gráficos estratégicos que fortalecem a presença da sua empresa no mercado.', '/imgs/portifolio/port%20(1).jpg', false, 1),
    ('Post Digital', 'Desenvolvimento de artes personalizadas para redes sociais, campanhas promocionais, anúncios digitais e comunicação online, com foco em impacto visual, engajamento e fortalecimento da presença digital da sua marca.', '/imgs/portifolio/port%20(2).jpg', false, 2),
    ('Impressão Gráfica em Diversos Formatos', 'Serviços completos de impressão em diferentes tipos de papel e acabamentos, incluindo cartões de visita, flyers, brochuras, catálogos, agendas, envelopes, blocos, pastas, convites, menus, certificados e materiais promocionais.', '/imgs/portifolio/port%20(3).jpg', false, 3),
    ('Brindes Corporativos', 'Produção e personalização de brindes corporativos exclusivos para promoção, fidelização e valorização da marca. Trabalhamos com canecas, canetas, cadernos, garrafas térmicas, t-shirts, bonés, bolsas, porta-chaves, kits empresariais.', '/imgs/portifolio/port%20(4).jpg', true, 4),
    ('Envelopamento e Comunicação Visual', 'Serviços de envelopamento de viaturas, montras comerciais, paredes, vitrines e espaços corporativos, utilizando materiais de alta qualidade para promover maior visibilidade, profissionalismo e impacto visual à marca.', '/imgs/portifolio/port%20(5).jpg', true, 5),
    ('Fachadas Luminosas', 'Desenvolvimento e instalação de fachadas luminosas modernas e personalizadas para empresas, lojas e estabelecimentos comerciais. Criamos soluções em acrílico, LED, caixas luminosas e letreiros que destacam a identidade da marca.', '/imgs/portifolio/port%20(6).jpg', false, 6),
    ('Vinil, Banners e Displays Publicitários', 'Produção de materiais publicitários em vinil e grande formato, incluindo banners, roll ups, lonas, adesivos, painéis promocionais e displays para campanhas, feiras, eventos e exposições.', '/imgs/portifolio/port%20(7).jpg', true, 7);

-- Portfólio
insert into public.portfolio (title, category, image, destaque, sort_order)
values 
    ('TECSEP Kit Corporativo', 'Brindes Corporativos', '/imgs/portifolio/port%20(1).jpg', true, 1),
    ('Cadernos TPA', 'Brindes Corporativos', '/imgs/portifolio/port%20(2).jpg', false, 2),
    ('Kit AGT', 'Brindes Corporativos', '/imgs/portifolio/port%20(3).jpg', true, 3),
    ('Stands Mô Jogos', 'Outros', '/imgs/portifolio/port%20(4).jpg', false, 4),
    ('Camisetas BIC', 'Sublimação', '/imgs/portifolio/port%20(5).jpg', true, 5),
    ('Cordões Continental', 'Brindes Corporativos', '/imgs/portifolio/port%20(6).jpg', false, 6),
    ('Cadernos Women', 'Brindes Corporativos', '/imgs/portifolio/port%20(7).jpg', false, 7),
    ('Sublimação Corporativa', 'Sublimação', '/imgs/portifolio/port%20(8).jpg', false, 8),
    ('Produção Gráfica', 'Outros', '/imgs/portifolio/port%20(9).jpg', false, 9),
    ('Camisetas Personalizadas', 'Sublimação', '/imgs/portifolio/port%20(10).jpg', false, 10),
    ('Kit Desportivo', 'Sublimação', '/imgs/portifolio/port%20(11).jpg', false, 11),
    ('Projecto Gráfico', 'Outros', '/imgs/portifolio/port%20(12).jpg', false, 12),
    ('Peça Corporativa', 'Outros', '/imgs/portifolio/port%20(13).jpg', false, 13),
    ('Material Publicitário', 'Outros', '/imgs/portifolio/port%20(14).jpg', false, 14);

-- =========================================================================
-- 6. Criação de Storage Buckets e Políticas RLS de Storage
-- =========================================================================

-- Inserir buckets de storage na base de dados
insert into storage.buckets (id, name, public) values ('logos', 'logos', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('services', 'services', true) on conflict (id) do nothing;

-- Adicionar políticas para o storage
create policy "Allow public read access on logos" on storage.objects for select using (bucket_id = 'logos');
create policy "Allow public read access on portfolio" on storage.objects for select using (bucket_id = 'portfolio');
create policy "Allow public read access on services" on storage.objects for select using (bucket_id = 'services');

create policy "Allow authenticated insert on logos" on storage.objects for insert with check (bucket_id = 'logos' and auth.role() = 'authenticated');
create policy "Allow authenticated insert on portfolio" on storage.objects for insert with check (bucket_id = 'portfolio' and auth.role() = 'authenticated');
create policy "Allow authenticated insert on services" on storage.objects for insert with check (bucket_id = 'services' and auth.role() = 'authenticated');

create policy "Allow authenticated update on logos" on storage.objects for update using (bucket_id = 'logos' and auth.role() = 'authenticated');
create policy "Allow authenticated update on portfolio" on storage.objects for update using (bucket_id = 'portfolio' and auth.role() = 'authenticated');
create policy "Allow authenticated update on services" on storage.objects for update using (bucket_id = 'services' and auth.role() = 'authenticated');

create policy "Allow authenticated delete on logos" on storage.objects for delete using (bucket_id = 'logos' and auth.role() = 'authenticated');
create policy "Allow authenticated delete on portfolio" on storage.objects for delete using (bucket_id = 'portfolio' and auth.role() = 'authenticated');
create policy "Allow authenticated delete on services" on storage.objects for delete using (bucket_id = 'services' and auth.role() = 'authenticated');

-- =========================================================================
-- 7. Campos Hero e CTA na tabela company_info (EXECUTAR SE TABELA JÁ EXISTIR)
-- =========================================================================

alter table public.company_info
  add column if not exists hero_title text default 'IDEIAS que GANHAM FORMA',
  add column if not exists hero_tagline text default 'A solução completa para a comunicação e imagem do seu negócio. Design gráfico, impressão digital e brindes corporativos em Luanda.',
  add column if not exists cta_title text default 'Pronto para dar forma à sua próxima ideia?';

-- =========================================================================
-- 8. Tabela de Leads / Pedidos de Orçamento
-- =========================================================================

create table if not exists public.leads (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    phone text not null,
    email text,
    service text,
    deadline text,
    message text not null,
    file_url text,
    status text not null default 'novo'
        check (status in ('novo', 'em_contacto', 'convertido', 'arquivado')),
    notes text
);

-- RLS na tabela leads
alter table public.leads enable row level security;

-- Qualquer pessoa pode inserir (submeter formulário)
create policy "Allow public insert on leads" on public.leads
  for insert with check (true);

-- Apenas autenticados (admin) podem ler e atualizar
create policy "Allow admin read on leads" on public.leads
  for select using (auth.role() = 'authenticated');

create policy "Allow admin update on leads" on public.leads
  for update using (auth.role() = 'authenticated');

create policy "Allow admin delete on leads" on public.leads
  for delete using (auth.role() = 'authenticated');

-- =========================================================================
-- 9. Bucket de uploads para ficheiros dos pedidos de orçamento
-- =========================================================================

insert into storage.buckets (id, name, public) values ('uploads', 'uploads', true) on conflict (id) do nothing;

create policy "Allow public read access on uploads" on storage.objects
  for select using (bucket_id = 'uploads');

create policy "Allow public insert on uploads" on storage.objects
  for insert with check (bucket_id = 'uploads');

create policy "Allow authenticated delete on uploads" on storage.objects
  for delete using (bucket_id = 'uploads' and auth.role() = 'authenticated');
