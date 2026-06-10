import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BRANDS_DATA, BRAND_SLUGS, getBrandBySlug } from "@/lib/brands-data";
import { supabase } from "@/lib/supabase";
import type { Drop, DropHistory } from "@/lib/types";
import { BrandPageClient } from "./BrandPageClient";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return BRAND_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const brand = getBrandBySlug(params.slug);
  if (!brand) return { title: "Marca não encontrada" };
  return {
    title: `${brand.name} — DropTracker`,
    description: `Acompanha os saldos e drops da ${brand.name}. ${brand.description}`,
    openGraph: {
      title: `${brand.name} — DropTracker`,
      description: brand.description,
    },
  };
}

async function getBrandDrop(slug: string): Promise<Drop | null> {
  try {
    const brandData = getBrandBySlug(slug);
    if (!brandData) return null;

    const { data: brands } = await supabase
      .from("brands")
      .select("id")
      .eq("slug", slug)
      .single();

    if (!brands) return null;

    const { data: drop } = await supabase
      .from("drops")
      .select("*")
      .eq("brand_id", brands.id)
      .not("status", "eq", "ended")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    return (drop as Drop) ?? null;
  } catch {
    return null;
  }
}

async function getBrandHistory(slug: string): Promise<DropHistory[]> {
  try {
    const { data: brands } = await supabase
      .from("brands")
      .select("id")
      .eq("slug", slug)
      .single();

    if (!brands) return [];

    const { data } = await supabase
      .from("drop_history")
      .select("*")
      .eq("brand_id", brands.id)
      .order("happened_at", { ascending: false });

    return (data as DropHistory[]) ?? [];
  } catch {
    return [];
  }
}

export default async function BrandPage({
  params,
}: {
  params: { slug: string };
}) {
  const brandStatic = getBrandBySlug(params.slug);
  if (!brandStatic) notFound();

  const [drop, history] = await Promise.all([
    getBrandDrop(params.slug),
    getBrandHistory(params.slug),
  ]);

  const relatedBrands = BRANDS_DATA.filter(
    (b) => b.category === brandStatic.category && b.slug !== brandStatic.slug
  ).slice(0, 3);

  return (
    <BrandPageClient
      brand={{ ...brandStatic, id: brandStatic.slug, created_at: new Date().toISOString(), current_drop: drop }}
      history={history}
      relatedBrands={relatedBrands.map((b) => ({
        ...b,
        id: b.slug,
        created_at: new Date().toISOString(),
        current_drop: null,
      }))}
    />
  );
}
