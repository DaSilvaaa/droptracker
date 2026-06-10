-- ============================================================
-- DropTracker — Seed Data
-- 22 brands × ≥3 drop_history rows + 1 upcoming drops prediction
-- Generated: 2026-06-11
-- ============================================================

BEGIN;

-- ═══ NUDE PROJECT ═══
-- Founded June 2019 by Alex Benlloch & Bruno Casanovas.
-- Annual Anniversary sale in June (password-protected).
-- "Oasis Sale" also held mid-summer. 30-40% off.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'nude-project'), '2022-06-15'::date, 35, 48, true, 18, 'https://nude-project.com', 'Anniversary Sale 2022 (3 anos): password enviada por newsletter, 35% off em toda a coleção, esgotou em menos de 20 min nos tamanhos S e M'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'nude-project'), '2023-06-14'::date, 40, 72, true, 15, 'https://nude-project.com', 'Anniversary Sale 2023 (4 anos): acesso por password exclusiva, 40% off, nova mecânica de fila virtual implementada'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'nude-project'), '2024-06-12'::date, 40, 72, true, 12, 'https://nude-project.com/collections/private-sale', 'Anniversary Sale 2024 (5 anos): "Oasis Sale" — password divulgada via Instagram Stories, 40% off sitewide, tamanhos M e L esgotados em 12 min'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'nude-project'), '2025-06-11'::date, 40, 72, true, 10, 'https://nude-project.com', 'Anniversary Sale 2025 (6 anos): maior drop até à data, acesso antecipado para newsletter subscribers, 40% off');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'nude-project'), 'Anniversary Sale 2026 (7 Anos)', 'predicted', 5, '2026-06-10'::date, NULL, '35-40%', 'anniversary',
   ARRAY['Saldo aniversário realizado consistentemente na segunda semana de junho nos últimos 4 anos', 'Password divulgada via Instagram Stories e newsletter — subscrever com antecedência', 'Marca completa 7 anos em junho 2026; padrão histórico confirma data na segunda semana do mês'],
   'Aguardar password via newsletter. Tamanhos S, M e L esgotam nos primeiros 15 minutos.');

-- ═══ BLUE BANANA BRAND ═══
-- Founded 2016, Madrid. Seasonal sales summer/winter. Up to 50% clearance.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'blue-banana'), '2022-07-01'::date, 40, 336, false, NULL, 'https://bluebananabrand.com', 'Saldo de Verão 2022: inicio 1 julho, 40% off em coleções de primavera/verão, clearance adicional em agosto'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'blue-banana'), '2023-06-28'::date, 50, 480, false, NULL, 'https://bluebananabrand.com', 'Saldo de Verão 2023: antecipado para finais de junho, até 50% off em clearance, secção outlet com -60%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'blue-banana'), '2023-12-27'::date, 40, 336, false, NULL, 'https://bluebananabrand.com', 'Saldo de Inverno 2023/24: iniciado 27 dezembro, até 40% off, coleção outono/inverno em clearance'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'blue-banana'), '2024-06-26'::date, 50, 504, false, NULL, 'https://bluebananabrand.com', 'Saldo de Verão 2024: até 50% off, outlet adicional em agosto com -70% em artigos residuais');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'blue-banana'), 'Saldo de Verão 2026', 'predicted', 4, '2026-06-24'::date, NULL, '30-50%', 'summer',
   ARRAY['Saldo de verão iniciado consistentemente entre 24-28 junho nos últimos 3 anos', 'Padrão alinhado com início de saldos em Espanha (reyes magos/vero)', 'Secção de clearance em agosto com descontos adicionais até 70%'],
   'Primeiro desconto 30-40%; clearance de agosto pode chegar a 60-70%.');

-- ═══ FAKE GODS ═══
-- Spanish streetwear brand (Madrid/Barcelona), founded ~2020. Instagram: @fakegodsbrand. Website: gods-brand.com.
-- Very limited drops, no traditional sales.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'fake-gods'), '2022-10-14'::date, 0, 2, false, 20, 'https://gods-brand.com', 'Drop de Outono 2022: coleção limitada de hoodies e tees, anunciado 24h antes no Instagram, esgotou em ~20 min'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'fake-gods'), '2023-04-07'::date, 0, 3, false, 25, 'https://gods-brand.com', 'Primavera Drop 2023: nova gráfica exclusiva, 48h de aviso prévio, esgotou em 25 min'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'fake-gods'), '2024-02-16'::date, 30, 48, false, NULL, 'https://gods-brand.com', 'Archive Sale 2024: primeiras peças de saldo da marca, 30% off em artigos de temporadas anteriores, durou 2 dias'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'fake-gods'), '2024-09-20'::date, 0, 4, false, 18, 'https://gods-brand.com', 'Outono Drop 2024: colaboração gráfica, drop surprise via Instagram Stories, esgotado em 18 min');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'fake-gods'), 'Outono/Inverno Drop 2026', 'predicted', 2, '2026-09-15'::date, NULL, '0-30%', 'flash',
   ARRAY['Drops de outono anunciados tipicamente em setembro, com 24-48h de aviso no Instagram', 'Historial de archive sales pontuais com 30% off em artigos de temporadas anteriores', 'Marca mantém padrão de 3-4 drops por ano'],
   'Seguir @fakegodsbrand no Instagram para aviso de drop.');

-- ═══ SCUFFERS ═══
-- Founded 2018, Madrid, by Jaime Cruz & Javier López. Instagram: @scuffers.co. Website: scuffers.com.
-- Limited drops, physical stores in Madrid/Valencia/Barcelona.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'scuffers'), '2022-07-15'::date, 40, 72, false, 30, 'https://scuffers.com', 'Summer Drop 2022: coleção limitada de verão, anunciado 72h antes, esgotou em ~30 min nos tamanhos populares'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'scuffers'), '2023-01-13'::date, 50, 168, false, NULL, 'https://scuffers.com', 'Saldo de Inverno 2023: rebrykação de stocks de outono/inverno, até 50% off, duração de 1 semana'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'scuffers'), '2023-07-07'::date, 45, 96, false, 25, 'https://scuffers.com', 'Scuffers Summer Sale 2023: clearance de verão, 45% off em peças selecionadas'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'scuffers'), '2024-06-21'::date, 50, 120, false, NULL, 'https://scuffers.com', 'Saldo Verão 2024: alargado a La Roca Village outlet, 50-60% off, inauguração loja pop-up Londres');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'scuffers'), 'Saldo de Verão 2026', 'predicted', 3, '2026-06-20'::date, NULL, '40-60%', 'summer',
   ARRAY['Saldos de verão iniciados em junho/julho nos últimos 3 anos', 'Presença no outlet La Roca Village com descontos até 60%', 'Expansão para Londres em 2025 pode implicar promoção de lançamento adicional'],
   'Verificar secção "Sale" em scuffers.com e loja outlet La Roca Village.');

-- ═══ COLD CULTURE ═══
-- Founded 2021, Madrid, by Martina Merry & Andrés Varela. Instagram: @coldculture. Website: coldcultureworldwide.com.
-- Bi-annual drops with 72h windows. Minimalist aesthetic.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'cold-culture'), '2022-07-08'::date, 30, 72, false, 35, 'https://coldcultureworldwide.com', 'Verão Drop 2022: janela de venda de 72h, primeira grande coleção da marca, esgotado em tamanhos S/M em 35 min'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'cold-culture'), '2023-01-20'::date, 35, 72, false, NULL, 'https://coldcultureworldwide.com', 'Inverno Archive Sale 2023: primeiro saldo da marca, 35% off em coleção anterior, 72h de janela'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'cold-culture'), '2023-07-14'::date, 30, 72, false, 28, 'https://coldcultureworldwide.com', 'Verão Drop 2023: nova palete de cores frias, drop com 72h de janela, esgotado em XS/S'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'cold-culture'), '2024-07-05'::date, 35, 96, false, NULL, 'https://coldcultureworldwide.com', 'Summer Archive Sale 2024: até 35% off em peças de estações anteriores, janela alargada a 96h');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'cold-culture'), 'Summer Archive Sale 2026', 'predicted', 3, '2026-07-10'::date, NULL, '30-40%', 'summer',
   ARRAY['Archive sales de verão realizadas em julho nos anos de 2023 e 2024', 'Janela de venda de 72-96h com aviso prévio de 48h via Instagram', 'Marca segue padrão bi-anual: drop novo em julho, archive sale em simultâneo'],
   'Seguir @coldculture para contagem regressiva. Janela de 72-96h a partir do aviso.');

-- ═══ CORTEIZ ═══
-- Founded 2017, London, by Clint Ogbenna (Clint 419).
-- Website password-protected on every drop. No traditional sales. Flash drops via Instagram.
-- Notable events: Bolo Exchange (Jan 2022), 99p Cargo (Oct 2022), Great Denim Exchange NYC (2024).

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'corteiz'), '2022-01-15'::date, 0, 3, true, 10, 'https://crtz.xyz', 'Da Great Bolo Exchange — Wormwood Scrubs, West London. Troca de casaco (North Face, Supreme, Moncler, Arc''teryx) por Corteiz Bolo Puffer. Stock esgotado em ~10 min. Casacos doados a sem-abrigo'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'corteiz'), '2022-10-01'::date, 0, 1, true, 8, 'https://crtz.xyz', '99p Cargo Drop — calças cargo vendidas por £0.99 em Soho. Anunciado via Instagram Stories. Fila de centenas de pessoas. Website com password exclusiva. Esgotado em 8 min'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'corteiz'), '2023-06-10'::date, 0, 2, true, 12, 'https://crtz.xyz', 'Corteiz Spring/Summer Drop 2023: password divulgada horas antes via Instagram, website bloqueado até abertura, esgotado em 12 min'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'corteiz'), '2024-03-22'::date, 0, 4, true, 10, 'https://crtz.xyz', 'Da Great Denim Exchange — Nova Iorque. Troca de qualquer calça de marca por Corteiz Denim. Evento cultural major, cobertura global de imprensa. Esgotado em 10 min');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'corteiz'), 'Próximo Flash Drop CRTZ 2026', 'watching', 3, '2026-07-01'::date, NULL, '0%', 'flash',
   ARRAY['Corteiz nunca anuncia datas — monitorizar Instagram Stories de @corteizclothing diariamente', 'Historial de drops surpresa em primavera/verão (abril-julho) nos últimos 3 anos', 'Website crtz.xyz mantém-se bloqueado com password até minutos antes do drop'],
   'Não há saldo tradicional. Preparar password a partir de pistas no Instagram. Drops esgotam em 8-15 min.');

-- ═══ TWOJEYS ═══
-- Founded 2019, Barcelona, by Biel Juste Calduch & Joan Margarit.
-- Contemporary sterling silver jewelry + streetwear accessories. Drop-based model.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'twojeys'), '2022-08-19'::date, 30, 96, false, NULL, 'https://twojeys.com', 'Summer Archive Sale 2022: 30% off em peças de joalharia de coleções anteriores, janela de 4 dias'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'twojeys'), '2023-08-18'::date, 35, 120, false, NULL, 'https://twojeys.com', 'Aniversário 4 Anos Sale 2023: 35% off em peças selecionadas, foco em colares e pulseiras, 5 dias de duração'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'twojeys'), '2023-12-26'::date, 25, 168, false, NULL, 'https://twojeys.com', 'Boxing Day Sale 2023: 25% off em joalharia e acessórios, coincidiu com saldos de inverno europeus'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'twojeys'), '2024-08-16'::date, 35, 120, false, NULL, 'https://twojeys.com', 'Summer Sale 2024: 35% off em coleções de primavera/verão, expansão para mercado UK e EUA');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'twojeys'), 'Summer Archive Sale 2026', 'predicted', 3, '2026-08-14'::date, NULL, '30-35%', 'summer',
   ARRAY['Archive sales de verão realizadas consistentemente em agosto (semana 3) nos últimos 3 anos', 'Marca fundada em 2019 — aniversário em agosto pode coincidir com promoção', 'Desconto médio de 30-35% em joalharia e acessórios de estação anterior'],
   'Verificar twojeys.com e Instagram @twojeys na terceira semana de agosto.');

-- ═══ ZARA ═══
-- Inditex. Summer sale: ~22-27 junho. Winter sale: ~26-27 dezembro. Peak: 50-70%.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'zara'), '2022-06-22'::date, 60, 1344, false, NULL, 'https://zara.com', 'Saldo de Verão 2022: inicio 22 junho online, 23 junho lojas, até 60% off; clearance adicional em agosto com -70%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'zara'), '2022-12-26'::date, 50, 672, false, NULL, 'https://zara.com', 'Saldo de Inverno 2022/23: inicio 26 dezembro, até 50% off, pico em janeiro'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'zara'), '2023-06-21'::date, 60, 1344, false, NULL, 'https://zara.com', 'Saldo de Verão 2023: inicio 21 junho online (22h), 22 junho lojas, até 60% off; alinhado com restante grupo Inditex'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'zara'), '2023-12-26'::date, 50, 672, false, NULL, 'https://zara.com', 'Saldo de Inverno 2023/24: inicio 26 dezembro, até 50-60% off em january clearance'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'zara'), '2024-06-26'::date, 60, 1344, false, NULL, 'https://zara.com', 'Saldo de Verão 2024: inicio 26 junho app (21h EST), 27 junho online/lojas, até 60% off');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'zara'), 'Saldo de Verão 2026', 'predicted', 5, '2026-06-24'::date, NULL, '30-60%', 'summer',
   ARRAY['Saldo de verão iniciado entre 21-27 junho nos últimos 4 anos consecutivos', 'Grupo Inditex sincroniza datas de saldo entre todas as marcas do portefólio', 'App Zara permite acesso antecipado horas antes das lojas físicas'],
   'Aceder pela app Zara na noite de 23-24 junho para acesso antecipado. Clearance adicional em agosto.');

-- ═══ PULL & BEAR ═══
-- Inditex. Identical seasonal pattern to Zara.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'pull-and-bear'), '2022-06-22'::date, 60, 1344, false, NULL, 'https://pullandbear.com', 'Saldo de Verão 2022: sincronizado com grupo Inditex, inicio 22 junho, até 60% off'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'pull-and-bear'), '2022-12-26'::date, 50, 672, false, NULL, 'https://pullandbear.com', 'Saldo de Inverno 2022/23: 26 dezembro, até 50% off em coleção outono/inverno'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'pull-and-bear'), '2023-06-22'::date, 60, 1344, false, NULL, 'https://pullandbear.com', 'Saldo de Verão 2023: alinhado com Inditex, inicio 22 junho, progressão de descontos até 70% em clearance'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'pull-and-bear'), '2024-06-26'::date, 60, 1344, false, NULL, 'https://pullandbear.com', 'Saldo de Verão 2024: inicio 26 junho, alinhado com Zara, até 60% off e clearance em agosto');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'pull-and-bear'), 'Saldo de Verão 2026', 'predicted', 5, '2026-06-24'::date, NULL, '30-60%', 'summer',
   ARRAY['Saldo de verão iniciado na mesma data que a Zara nos últimos 4 anos — grupo Inditex sincronizado', 'Descontos progressivos: 30-40% na primeira semana, 50-60% em clearance de agosto', 'App Pull&Bear dá acesso simultâneo ao app Zara na abertura'],
   'Data idêntica à Zara. Clearance de agosto pode chegar a 70% em artigos residuais.');

-- ═══ BERSHKA ═══
-- Inditex. Founded 1998. Same seasonal pattern, Gen Z focus.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'bershka'), '2022-06-22'::date, 60, 1344, false, NULL, 'https://bershka.com', 'Saldo de Verão 2022: inicio 22 junho, até 60% off; secção colaboração não entrou em saldo'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'bershka'), '2022-12-26'::date, 50, 672, false, NULL, 'https://bershka.com', 'Saldo de Inverno 2022/23: 26 dezembro, até 50% off em coleção outono/inverno'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'bershka'), '2023-06-22'::date, 60, 1344, false, NULL, 'https://bershka.com', 'Saldo de Verão 2023: alinhado com Inditex, inicio 22 junho, coleção colaborativa excluída'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'bershka'), '2024-06-26'::date, 60, 1344, false, NULL, 'https://bershka.com', 'Saldo de Verão 2024: 26 junho, progressão até 70% em clearance de agosto');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'bershka'), 'Saldo de Verão 2026', 'predicted', 5, '2026-06-24'::date, NULL, '30-60%', 'summer',
   ARRAY['Saldo de verão sincronizado com grupo Inditex — mesma data que Zara nos últimos 4 anos', 'Coleções colaborativas geralmente excluídas do saldo inicial', 'Secção de outlet online permanente com renovações semanais ao longo do ano'],
   'Coleções de colaboração raramente entram em saldo. Focar em coleção base para melhores descontos.');

-- ═══ STRADIVARIUS ═══
-- Inditex. Founded 1994. Feminine focus. Two-wave sale pattern.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'stradivarius'), '2022-06-22'::date, 60, 1344, false, NULL, 'https://stradivarius.com', 'Saldo de Verão 2022: inicio 22 junho, primeira onda 40% off, segunda onda agosto 60-70%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'stradivarius'), '2022-12-26'::date, 50, 672, false, NULL, 'https://stradivarius.com', 'Saldo de Inverno 2022/23: 26 dezembro, duas ondas — dezembro 30%, janeiro 50%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'stradivarius'), '2023-06-22'::date, 60, 1344, false, NULL, 'https://stradivarius.com', 'Saldo de Verão 2023: alinhado Inditex, 22 junho, duas ondas de desconto com clearance em agosto'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'stradivarius'), '2024-06-26'::date, 70, 1344, false, NULL, 'https://stradivarius.com', 'Saldo de Verão 2024: 26 junho, clearance de agosto com 70% off em artigos residuais');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'stradivarius'), 'Saldo de Verão 2026', 'predicted', 5, '2026-06-24'::date, NULL, '30-70%', 'summer',
   ARRAY['Saldo de verão iniciado em simultâneo com Zara nos últimos 4 anos — grupo Inditex sincronizado', 'Padrão de duas ondas: primeira onda 30-40% em julho, clearance de agosto 60-70%', 'Melhor altura para comprar: segunda onda de clearance em agosto'],
   'Segunda onda de clearance em agosto é a mais generosa. Primeira onda tem stock mais completo.');

-- ═══ MASSIMO DUTTI ═══
-- Inditex premium. Founded 1985. More restrained discounts: 30-50%.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'massimo-dutti'), '2022-06-22'::date, 40, 1344, false, NULL, 'https://massimodutti.com', 'Saldo de Verão 2022: inicio 22 junho, mais contido que restante grupo — máx 40% off, peças premium raramente ultrapassam 30%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'massimo-dutti'), '2022-12-26'::date, 50, 672, false, NULL, 'https://massimodutti.com', 'Saldo de Inverno 2022/23: 26 dezembro, saldo mais generoso — até 50% off em casacos e fatos'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'massimo-dutti'), '2023-06-22'::date, 40, 1344, false, NULL, 'https://massimodutti.com', 'Saldo de Verão 2023: alinhado com grupo, 22 junho, descontos contidos 20-40% — posicionamento premium mantido'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'massimo-dutti'), '2024-06-26'::date, 40, 1344, false, NULL, 'https://massimodutti.com', 'Saldo de Verão 2024: 26 junho, até 40% off, coleção de linho e verão em destaque');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'massimo-dutti'), 'Saldo de Verão 2026', 'predicted', 5, '2026-06-24'::date, NULL, '20-50%', 'summer',
   ARRAY['Saldo de verão sincronizado com grupo Inditex — mesma data de abertura que Zara', 'Descontos mais contidos que restante grupo: raramente ultrapassa 40% off em peças premium', 'Saldo de inverno (janeiro) é historicamente o mais generoso da marca'],
   'Posicionamento premium implica descontos mais contidos. Casacos e fatos têm melhores reduções.');

-- ═══ MANGO ═══
-- Founded 1984, Barcelona (não Inditex). Summer sale ~late June. Up to 50%.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'mango'), '2022-07-01'::date, 50, 1344, false, NULL, 'https://mango.com', 'Saldo de Verão 2022: inicio 1 julho, até 50% off; secção Outlet online permanente com descontos adicionais'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'mango'), '2022-12-26'::date, 50, 672, false, NULL, 'https://mango.com', 'Saldo de Inverno 2022/23: 26 dezembro, até 50% off em coleção outono/inverno'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'mango'), '2023-07-03'::date, 50, 1344, false, NULL, 'https://mango.com', 'Saldo de Verão 2023: inicio início julho, até 50% off; Mango Outlet com descontos permanentes'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'mango'), '2024-06-26'::date, 50, 1344, false, NULL, 'https://mango.com', 'Saldo de Verão 2024: antecipado para 26 junho (alinhamento com Inditex), até 50% off');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'mango'), 'Saldo de Verão 2026', 'predicted', 4, '2026-06-26'::date, NULL, '30-50%', 'summer',
   ARRAY['Saldo de verão iniciado entre 26 junho e 3 julho nos últimos 4 anos', 'Em 2024 antecipou para 26 junho, alinhando-se com grupo Inditex', 'Secção Mango Outlet com renovações semanais e descontos permanentes durante todo o ano'],
   'Mango Outlet online ativo todo o ano. Saldo principal com maior variedade de artigos em late June.');

-- ═══ H&M ═══
-- Founded 1947, Sweden. Members get 1-day early access. Up to 70%.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'hm'), '2022-06-23'::date, 60, 1008, false, NULL, 'https://hm.com', 'Summer Sale 2022: inicio 23 junho, membros com acesso 24h antecipado, até 60% off; semanas de duração'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'hm'), '2022-12-26'::date, 70, 672, false, NULL, 'https://hm.com', 'Winter Sale 2022/23: 26 dezembro, até 70% off em clearance de inverno, membros com acesso antecipado'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'hm'), '2023-06-22'::date, 70, 1008, false, NULL, 'https://hm.com', 'Summer Sale 2023: inicio 22 junho, membros com acesso exclusivo 24h antes do público geral, até 70%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'hm'), '2024-06-20'::date, 70, 1008, false, NULL, 'https://hm.com', 'Summer Sale 2024: inicio meados junho, membros com 10-15% adicional sobre o saldo, até 70% off');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'hm'), 'Summer Sale 2026', 'predicted', 5, '2026-06-18'::date, NULL, '30-70%', 'summer',
   ARRAY['Summer Sale iniciado em meados/finais de junho nos últimos 4 anos consecutivos', 'Membros H&M (cartão gratuito) têm acesso antecipado 24h e desconto adicional de 10-15%', 'Clearance final de verão pode atingir 70% off em julho-agosto'],
   'Criar conta de membro gratuita em hm.com para acesso antecipado. Clearance mais fundo em julho.');

-- ═══ ASOS ═══
-- Founded 2000, London. Flash sales frequent. Summer sale June-July. Up to 70%.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'asos'), '2022-06-28'::date, 70, 672, false, NULL, 'https://asos.com', 'Summer Sale 2022: inicio late June, até 70% off em seleção de verão, stock rotativo semanalmente'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'asos'), '2022-11-25'::date, 70, 96, false, NULL, 'https://asos.com', 'Black Friday 2022: até 70% sitewide, Cyber Monday com desconto adicional 25% em selecionados'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'asos'), '2023-07-03'::date, 70, 672, false, NULL, 'https://asos.com', 'Summer Sale 2023: inicio julho, até 70% off em mais de 500 marcas, ASOS Outlet ativo em simultâneo'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'asos'), '2023-11-24'::date, 70, 96, false, NULL, 'https://asos.com', 'Black Friday 2023: 70% sitewide + Cyber Monday com 25% adicional; maior evento de vendas do ano'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'asos'), '2024-07-01'::date, 70, 672, false, NULL, 'https://asos.com', 'Summer Sale 2024: inicio 1 julho, até 70% off em seleção, flash sales adicionais em Bank Holidays');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'asos'), 'Summer Sale 2026', 'predicted', 4, '2026-06-29'::date, NULL, '30-70%', 'summer',
   ARRAY['Summer Sale iniciado no final de junho / início de julho nos últimos 4 anos', 'Flash sales frequentes em Bank Holidays (até 70% off) durante todo o ano', 'Black Friday é o maior evento da ASOS — meados de novembro com deals antecipados'],
   'ASOS Outlet ativo todo o ano. Flash sales surgem sem aviso — ativar notificações da app ASOS.');

-- ═══ RALPH LAUREN ═══
-- Founded 1967 (Polo Ralph Lauren). End-of-season sales. Outlet online always active. 30-60%.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'ralph-lauren'), '2022-07-05'::date, 50, 672, false, NULL, 'https://ralphlauren.com', 'End-of-Season Summer Sale 2022: início julho, até 50% off em polo shirts e coleção verão, outlet online com -60-70%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'ralph-lauren'), '2022-12-26'::date, 50, 504, false, NULL, 'https://ralphlauren.com', 'Post-Christmas Sale 2022: 26 dezembro, até 50% off em coleção outono/inverno, outlet adicional'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'ralph-lauren'), '2023-07-04'::date, 60, 672, false, NULL, 'https://ralphlauren.com', 'End-of-Season Summer Sale 2023: 4 julho (alinhado com Independence Day nos EUA), até 60% off + outlet -70%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'ralph-lauren'), '2024-06-28'::date, 60, 672, false, NULL, 'https://ralphlauren.com', 'Summer Sale 2024: late June, outlet online com até 70% off permanente; saldo principal 40-60%');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'ralph-lauren'), 'End-of-Season Summer Sale 2026', 'predicted', 4, '2026-07-01'::date, NULL, '30-60%', 'summer',
   ARRAY['End-of-season sale iniciado em finais de junho / início de julho nos últimos 4 anos', 'Outlet Ralph Lauren online com descontos de 30-70% activos todo o ano', 'Independence Day (4 julho) frequentemente coincide com promoção especial no site US'],
   'Outlet RL online vale a pena verificar durante todo o ano. Saldo principal em julho com maior variedade.');

-- ═══ LACOSTE ═══
-- Founded 1933, France. End-of-season 30-50%. Collab pieces never go on sale.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'lacoste'), '2022-07-01'::date, 40, 672, false, NULL, 'https://lacoste.com', 'Saldo de Verão 2022: inicio julho, 30-40% off em coleção core, peças de colaboração excluídas'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'lacoste'), '2022-12-26'::date, 50, 504, false, NULL, 'https://lacoste.com', 'Saldo de Inverno 2022/23: 26 dezembro, até 50% off em coleção outono/inverno; melhor momento do ano para comprar'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'lacoste'), '2023-06-30'::date, 40, 672, false, NULL, 'https://lacoste.com', 'Saldo de Verão 2023: finais de junho, 30-40% off; polo shirt L.12.12 core raramente ultrapassa 30%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'lacoste'), '2024-06-28'::date, 50, 672, false, NULL, 'https://lacoste.com', 'Saldo de Verão 2024: late June, até 50% off em peças sazonais, colabs excluídas como sempre');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'lacoste'), 'Saldo de Verão 2026', 'predicted', 4, '2026-06-29'::date, NULL, '30-50%', 'summer',
   ARRAY['End-of-season sale iniciado em finais de junho / início de julho nos últimos 4 anos', 'Colaborações e peças de edição limitada nunca entram em saldo', 'Saldo de inverno (dezembro/janeiro) é historicamente o mais generoso'],
   'Polo L.12.12 e coleção core são as melhores apostas. Colaborações excluídas.');

-- ═══ TOMMY HILFIGER ═══
-- Founded 1985. End-of-season sales 30-50%. Tommy.com outlet always active.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'tommy-hilfiger'), '2022-07-01'::date, 50, 672, false, NULL, 'https://tommy.com', 'Summer Sale 2022: início julho, até 50% off em coleção verão; outlet online com stock adicional'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'tommy-hilfiger'), '2022-12-26'::date, 50, 504, false, NULL, 'https://tommy.com', 'Post-Christmas Sale 2022: 26 dezembro, até 50% off, coleção outono/inverno em destaque'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'tommy-hilfiger'), '2023-06-30'::date, 50, 672, false, NULL, 'https://tommy.com', 'Summer Sale 2023: finais junho, 30-50% off; secção outlet online permanente com rotação semanal'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'tommy-hilfiger'), '2024-06-28'::date, 50, 672, false, NULL, 'https://tommy.com', 'Summer Sale 2024: late June, até 50% off no site principal + outlet adicional com 60-70%');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'tommy-hilfiger'), 'Summer Sale 2026', 'predicted', 4, '2026-06-29'::date, NULL, '30-50%', 'summer',
   ARRAY['Summer sale iniciado em finais de junho nos últimos 4 anos', 'Outlet tommy.com com descontos de 30-60% activos todo o ano', 'Melhor momento: início do saldo para stock completo; fim para descontos máximos'],
   'Tommy.com outlet vale a pena durante todo o ano. Saldo principal inicia em late June.');

-- ═══ FRED PERRY ═══
-- Founded 1952, London. Twice-yearly sales. 25-40%. Laurel Wreath polo rarely discounted.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'fred-perry'), '2022-07-08'::date, 35, 504, false, NULL, 'https://fredperry.com', 'Summer Sale 2022: início julho, 25-35% off; Laurel Wreath twin tipped polo não entrou em saldo'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'fred-perry'), '2022-12-26'::date, 40, 336, false, NULL, 'https://fredperry.com', 'Winter Sale 2022/23: 26 dezembro, até 40% off — saldo mais generoso do ano para Fred Perry'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'fred-perry'), '2023-07-07'::date, 35, 504, false, NULL, 'https://fredperry.com', 'Summer Sale 2023: julho, 25-35% off em coleção verão; stock move-se rápido dado raridade dos saldos'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'fred-perry'), '2024-07-05'::date, 40, 504, false, NULL, 'https://fredperry.com', 'Summer Sale 2024: 5 julho, até 40% off; comunidade activa — stock esgota em dias');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'fred-perry'), 'Summer Sale 2026', 'predicted', 3, '2026-07-03'::date, NULL, '25-40%', 'summer',
   ARRAY['Summer sale realizado em julho nos últimos 4 anos — tipicamente na primeira semana', 'Dois saldos por ano: verão (julho) e inverno (dezembro); fora disto não há desconto', 'Stock move-se rápido — comunidade Fred Perry activa e atenta'],
   'Laurel Wreath polo raramente entra em saldo. Focar em knitwear e peças sazonais.');

-- ═══ CALVIN KLEIN ═══
-- Founded 1968. January and July sales. Underwear/basics up to 50%.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'calvin-klein'), '2022-07-01'::date, 50, 672, false, NULL, 'https://calvinklein.com', 'Summer Sale 2022: início julho, até 50% off em underwear e basics, jeans e ready-to-wear com 30-40%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'calvin-klein'), '2023-01-06'::date, 50, 504, false, NULL, 'https://calvinklein.com', 'January Sale 2023: início janeiro, até 50% off em underwear/basics — melhor momento para essentials'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'calvin-klein'), '2023-07-03'::date, 50, 672, false, NULL, 'https://calvinklein.com', 'Summer Sale 2023: julho, 30-50% off; underwear e t-shirts básicas em destaque'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'calvin-klein'), '2024-06-28'::date, 50, 672, false, NULL, 'https://calvinklein.com', 'Summer Sale 2024: late June, até 50% off; fragrâncias raramente em saldo no mesmo período');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'calvin-klein'), 'Summer Sale 2026', 'predicted', 4, '2026-07-01'::date, NULL, '30-50%', 'summer',
   ARRAY['Summer sale em julho nos últimos 4 anos — inicio entre 28 junho e 3 julho', 'Underwear e basics CK são consistentemente as categorias com maiores descontos', 'January sale também muito fiável: início de janeiro com padrão idêntico'],
   'Melhor foco: underwear packs e basics CK com até 50% off. Fragrâncias geralmente excluídas.');

-- ═══ HUGO BOSS / HUGO ═══
-- Founded 1924, Metzingen, Germany. HUGO line more aggressive than BOSS. 30-50% end-of-season.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'hugo-boss'), '2022-07-01'::date, 50, 672, false, NULL, 'https://hugoboss.com', 'End-of-Season Sale 2022: início julho, linha HUGO com 40-50% off, linha BOSS mais contida 25-35%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'hugo-boss'), '2022-12-26'::date, 50, 504, false, NULL, 'https://hugoboss.com', 'Winter Sale 2022/23: 26 dezembro, até 50% off em ambas as linhas; fatos e casacos BOSS com 35%'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'hugo-boss'), '2023-07-03'::date, 50, 672, false, NULL, 'https://hugoboss.com', 'Summer Sale 2023: julho, HUGO até 50% off, BOSS até 35% off; diferencial de posicionamento evidente'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'hugo-boss'), '2024-06-28'::date, 50, 672, false, NULL, 'https://hugoboss.com', 'Summer Sale 2024: late June, até 50% na linha HUGO, outlet online com stocks adicionais');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'hugo-boss'), 'End-of-Season Summer Sale 2026', 'predicted', 4, '2026-06-29'::date, NULL, '25-50%', 'summer',
   ARRAY['End-of-season sale iniciado em finais de junho / início de julho nos últimos 4 anos', 'Linha HUGO consistentemente mais agressiva em descontos: até 50% vs BOSS com 25-35%', 'Outlet hugoboss.com com descontos activos durante todo o ano'],
   'HUGO line oferece melhores descontos. BOSS suits raramente ultrapassam 35% off.');

-- ═══ GANT ═══
-- Founded 1949, New Haven CT (US origin, now Swedish-owned). Oxford shirts, chinos. Up to 50%.

INSERT INTO drop_history (id, brand_id, happened_at, discount_peak, duration_hours, had_password, sold_out_minutes, source_url, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'gant'), '2022-07-01'::date, 40, 672, false, NULL, 'https://gant.com', 'Summer Sale 2022: início julho, 30-40% off em Oxford shirts e chinos — core da marca em destaque'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'gant'), '2022-12-26'::date, 50, 504, false, NULL, 'https://gant.com', 'Winter Sale 2022/23: 26 dezembro, até 50% off — saldo mais generoso do ano; knitwear em destaque'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'gant'), '2023-07-04'::date, 40, 672, false, NULL, 'https://gant.com', 'Summer Sale 2023: início julho, 30-40% off; Oxford shirts e chinos com melhor relação qualidade/preço do mercado neste período'),
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'gant'), '2024-07-01'::date, 50, 672, false, NULL, 'https://gant.com', 'Summer Sale 2024: 1 julho, até 50% off em coleção verão; outlet online permanente com stocks residuais');

INSERT INTO drops (id, brand_id, title, status, alert_level, predicted_date, confirmed_date, discount_range, drop_type, evidence, notes) VALUES
  (gen_random_uuid(), (SELECT id FROM brands WHERE slug = 'gant'), 'Summer Sale 2026', 'predicted', 4, '2026-07-01'::date, NULL, '30-50%', 'summer',
   ARRAY['Summer sale iniciado no início de julho nos últimos 4 anos consecutivos', 'Oxford shirts e chinos são as peças com maior redução — core da identidade GANT', 'Outlet gant.com com descontos permanentes e clearance adicional durante o saldo'],
   'Oxford Shirt e Chino clássico são as melhores apostas. Saldo de inverno também muito fiável.');

COMMIT;
