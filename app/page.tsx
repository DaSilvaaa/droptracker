export const dynamic = "force-dynamic";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsletterForm } from "@/components/NewsletterForm";
import { HeroSection } from "@/components/HeroSection";
import { RadarSection } from "@/components/RadarSection";
import { HistorySection } from "@/components/HistorySection";
import { PatternSection } from "@/components/PatternSection";
import { supabase } from "@/lib/supabase";
import type { Brand, Drop, DropHistory } from "@/lib/types";
import { BRANDS_DATA } from "@/lib/brands-data";

async function getBrandsWithDrops(): Promise<Brand[]> {
  try {
    const { data: dbBrands } = await supabase
      .from("brands")
      .select("id, slug");

    const { data: drops } = await supabase
      .from("drops")
      .select("*")
      .in("status", ["predicted", "confirmed", "live"]);

    const slugToId: Record<string, string> = {};
    if (dbBrands) {
      for (const b of dbBrands as { id: string; slug: string }[]) {
        slugToId[b.slug] = b.id;
      }
    }

    return BRANDS_DATA.map((b) => {
      const brandId = slugToId[b.slug];
      const currentDrop =
        brandId && drops
          ? ((drops as Drop[]).find((d) => d.brand_id === brandId) ?? null)
          : null;

      return {
        ...b,
        id: brandId ?? b.slug,
        created_at: new Date().toISOString(),
        current_drop: currentDrop,
      };
    });
  } catch {
    return BRANDS_DATA.map((b) => ({
      ...b,
      id: b.slug,
      created_at: new Date().toISOString(),
      current_drop: null,
    }));
  }
}

async function getRecentHistory(): Promise<DropHistory[]> {
  try {
    const { data } = await supabase
      .from("drop_history")
      .select("*")
      .order("happened_at", { ascending: false })
      .limit(10);
    return (data as DropHistory[]) ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [brands, history] = await Promise.all([
    getBrandsWithDrops(),
    getRecentHistory(),
  ]);

  return (
    <main className="min-h-screen bg-obsidian">
      <Navbar />
      <HeroSection />
      <RadarSection brands={brands} />
      <PatternSection />
      <HistorySection history={history} />
      <NewsletterForm />
      <Footer />
    </main>
  );
}
