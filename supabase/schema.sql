-- DropTracker v2 — Supabase Schema
-- Run this in your Supabase SQL Editor

-- ──────────────────────────────────────────────
-- TABLES
-- ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS brands (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text UNIQUE NOT NULL,
  name         text NOT NULL,
  country      text CHECK (country IN ('PT','ES','UK','US','SE','FR','DE')),
  category     text CHECK (category IN ('streetwear','fastfashion','luxury','sports')),
  logo_emoji   text,
  description  text,
  founded_year integer,
  instagram_handle text,
  website_url  text,
  created_at   timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS drops (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id       uuid REFERENCES brands(id) ON DELETE CASCADE,
  title          text NOT NULL,
  status         text NOT NULL CHECK (status IN ('predicted','confirmed','live','ended','watching')),
  alert_level    integer CHECK (alert_level BETWEEN 1 AND 5),
  predicted_date date,
  confirmed_date date,
  discount_range text,
  drop_type      text CHECK (drop_type IN ('anniversary','summer','flash','collab','clearance')),
  evidence       text[] DEFAULT '{}',
  notes          text,
  created_at     timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS drop_history (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id         uuid REFERENCES brands(id) ON DELETE CASCADE,
  happened_at      date NOT NULL,
  discount_peak    integer,
  duration_hours   integer,
  had_password     boolean DEFAULT false,
  sold_out_minutes integer,
  source_url       text,
  notes            text
);

CREATE TABLE IF NOT EXISTS subscribers (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email              text UNIQUE NOT NULL,
  brands             text[] DEFAULT '{}',
  confirmed          boolean DEFAULT false,
  confirmation_token text,
  created_at         timestamptz DEFAULT now()
);

-- ──────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ──────────────────────────────────────────────

ALTER TABLE brands       ENABLE ROW LEVEL SECURITY;
ALTER TABLE drops        ENABLE ROW LEVEL SECURITY;
ALTER TABLE drop_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers  ENABLE ROW LEVEL SECURITY;

-- Public read on brands and drops
CREATE POLICY "brands_public_read"
  ON brands FOR SELECT USING (true);

CREATE POLICY "drops_public_read"
  ON drops FOR SELECT USING (true);

CREATE POLICY "drop_history_public_read"
  ON drop_history FOR SELECT USING (true);

-- Authenticated admin write on all tables
CREATE POLICY "brands_admin_write"
  ON brands FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "drops_admin_write"
  ON drops FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "drop_history_admin_write"
  ON drop_history FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Subscribers: service role only (server-side API)
CREATE POLICY "subscribers_service_only"
  ON subscribers FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- ──────────────────────────────────────────────
-- SEED — 22 BRANDS
-- ──────────────────────────────────────────────

INSERT INTO brands (slug, name, country, category, logo_emoji, description, founded_year, instagram_handle, website_url) VALUES
  ('nude-project',    'Nude Project',        'ES', 'streetwear',  '🖤', 'Marca espanhola fundada por dois amigos do YouTube. Drops limitados, comunicação autêntica.', 2019, 'nudeproject',     'https://nudeproject.com'),
  ('blue-banana',     'Blue Banana Brand',   'ES', 'streetwear',  '🍌', 'Streetwear espanhol jovem com identidade visual forte.', 2014, 'bluebanana_brand', 'https://bluebanana.com'),
  ('fake-gods',       'Fake Gods',           'PT', 'streetwear',  '👁️', 'Marca portuguesa de streetwear underground. Drops raros, altamente colecionáveis.', 2020, 'fakegods.official','https://fakegods.pt'),
  ('scuffers',        'Scuffers',            'ES', 'streetwear',  '🔥', 'Streetwear espanhol irreverente. Colecções limitadas que esgotam em minutos.', 2018, 'scuffers_official','https://scuffers.com'),
  ('cold-culture',    'Cold Culture',        'ES', 'streetwear',  '🧊', 'Estética minimalista e paletas frias. Drops bi-anuais com janelas de 72h.', 2017, 'coldculture',      'https://coldculture.es'),
  ('corteiz',         'Corteiz',             'UK', 'streetwear',  '🌍', 'London''s most wanted. Drops surpresa via Instagram Stories.', 2017, 'corteizclothing',  'https://corteiz.com'),
  ('twojeys',         'TwoJeys',             'ES', 'streetwear',  '💎', 'Acessórios e streetwear de lifestyle premium espanhol.', 2020, 'twojeys',          'https://twojeys.com'),
  ('zara',            'Zara',                'ES', 'fastfashion', '⚡', 'O gigante espanhol do fast fashion. Saldos de verão e inverno extremamente previsíveis.', 1975, 'zara',             'https://zara.com'),
  ('pull-and-bear',   'Pull&Bear',           'ES', 'fastfashion', '🐻', 'Fast fashion casual do grupo Inditex.', 1991, 'pullandbear',      'https://pullandbear.com'),
  ('bershka',         'Bershka',             'ES', 'fastfashion', '🏙️', 'O Inditex voltado para Gen Z.', 1998, 'bershka',          'https://bershka.com'),
  ('stradivarius',    'Stradivarius',        'ES', 'fastfashion', '🎵', 'Feminino e lifestyle do grupo Inditex.', 1994, 'stradivarius',     'https://stradivarius.com'),
  ('massimo-dutti',   'Massimo Dutti',       'ES', 'fastfashion', '🏛️', 'Premium do grupo Inditex.', 1985, 'massimodutti',     'https://massimodutti.com'),
  ('mango',           'Mango',               'ES', 'fastfashion', '🥭', 'Fast fashion mediterrânico com apelo premium.', 1984, 'mango',            'https://mango.com'),
  ('hm',              'H&M',                 'SE', 'fastfashion', '🏷️', 'O gigante sueco do fast fashion.', 1947, 'hm',               'https://hm.com'),
  ('asos',            'ASOS',                'UK', 'fastfashion', '🌐', 'Gigante britânico do e-commerce de moda.', 2000, 'asos',             'https://asos.com'),
  ('ralph-lauren',    'Ralph Lauren',        'US', 'luxury',      '🐎', 'O ícone americano do preppy luxury.', 1967, 'ralphlauren',      'https://ralphlauren.com'),
  ('lacoste',         'Lacoste',             'FR', 'luxury',      '🐊', 'O crocodilo francês.', 1933, 'lacoste',          'https://lacoste.com'),
  ('tommy-hilfiger',  'Tommy Hilfiger',      'US', 'luxury',      '⛵', 'Americana clássica com apelo global.', 1985, 'tommyhilfiger',    'https://tommy.com'),
  ('fred-perry',      'Fred Perry',          'UK', 'luxury',      '🎾', 'Britânico icónico.', 1952, 'fredperry',        'https://fredperry.com'),
  ('calvin-klein',    'Calvin Klein',        'US', 'luxury',      '▪️', 'Minimalismo americano de luxo acessível.', 1968, 'calvinklein',      'https://calvinklein.com'),
  ('hugo-boss',       'Hugo Boss / HUGO',    'DE', 'luxury',      '👔', 'Precisão alemã em luxury accessible.', 1924, 'hugoboss',         'https://hugoboss.com'),
  ('gant',            'Gant',                'SE', 'luxury',      '🦅', 'Americana preppy com raízes suecas.', 1949, 'gant',             'https://gant.com')
ON CONFLICT (slug) DO NOTHING;
