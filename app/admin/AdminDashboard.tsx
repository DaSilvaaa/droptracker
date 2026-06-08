"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, Send, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Drop, DropHistory, Subscriber } from "@/lib/types";
import { BRANDS_DATA } from "@/lib/brands-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertBadge } from "@/components/AlertBadge";
import { formatDate } from "@/lib/utils";

const STATUS_OPTIONS = ["predicted", "confirmed", "live", "ended", "watching"] as const;

function DropsTab() {
  const [drops, setDrops] = useState<(Drop & { brand_slug?: string })[]>([]);
  const [search, setSearch] = useState("");
  const [sending, setSending] = useState<string | null>(null);

  const fetchDrops = useCallback(async () => {
    const { data } = await supabase
      .from("drops")
      .select("*, brands(slug, name)")
      .order("created_at", { ascending: false });
    setDrops(
      (data ?? []).map((d: Drop & { brands?: { slug: string; name: string } }) => ({
        ...d,
        brand_slug: d.brands?.slug,
      }))
    );
  }, []);

  useEffect(() => { fetchDrops(); }, [fetchDrops]);

  const updateStatus = async (id: string, status: Drop["status"]) => {
    await supabase.from("drops").update({ status }).eq("id", id);
    fetchDrops();
  };

  const sendAlert = async (drop: Drop & { brand_slug?: string }) => {
    setSending(drop.id);
    try {
      await fetch("/api/send-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dropId: drop.id }),
      });
    } finally {
      setSending(null);
    }
  };

  const filtered = drops.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      (d.brand_slug ?? "").includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600" />
          <Input
            placeholder="Pesquisar drops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <p className="text-xs font-mono text-zinc-600">{filtered.length} drops</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Marca</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Nível</TableHead>
            <TableHead>Data Prevista</TableHead>
            <TableHead>Desconto</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((drop) => (
            <TableRow key={drop.id}>
              <TableCell className="font-mono text-xs">{drop.brand_slug ?? "—"}</TableCell>
              <TableCell className="max-w-[200px] truncate">{drop.title}</TableCell>
              <TableCell>
                <select
                  value={drop.status}
                  onChange={(e) => updateStatus(drop.id, e.target.value as Drop["status"])}
                  className="bg-carbon border border-zinc text-xs font-mono text-zinc-300 px-2 py-1 focus:outline-none focus:border-acid"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </TableCell>
              <TableCell className="font-mono text-acid">{drop.alert_level}/5</TableCell>
              <TableCell className="font-mono text-xs text-zinc-500">
                {drop.predicted_date ? formatDate(drop.predicted_date) : "—"}
              </TableCell>
              <TableCell className="font-mono text-xs">{drop.discount_range ?? "—"}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => sendAlert(drop)}
                  disabled={sending === drop.id}
                  className="text-[10px] gap-1.5"
                >
                  <Send className="h-3 w-3" />
                  {sending === drop.id ? "A enviar..." : "Publicar"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function HistoricoTab() {
  const [entries, setEntries] = useState<DropHistory[]>([]);
  const [brandSlug, setBrandSlug] = useState("");
  const [happenedAt, setHappenedAt] = useState("");
  const [discountPeak, setDiscountPeak] = useState("");
  const [durationHours, setDurationHours] = useState("");
  const [soldOutMinutes, setSoldOutMinutes] = useState("");
  const [hadPassword, setHadPassword] = useState(false);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchHistory = useCallback(async () => {
    const { data } = await supabase
      .from("drop_history")
      .select("*, brands(slug)")
      .order("happened_at", { ascending: false })
      .limit(20);
    setEntries((data as DropHistory[]) ?? []);
  }, []);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: brand } = await supabase
        .from("brands")
        .select("id")
        .eq("slug", brandSlug)
        .single();

      if (!brand) { alert("Marca não encontrada"); return; }

      await supabase.from("drop_history").insert({
        brand_id: brand.id,
        happened_at: happenedAt,
        discount_peak: parseInt(discountPeak),
        duration_hours: parseInt(durationHours),
        sold_out_minutes: soldOutMinutes ? parseInt(soldOutMinutes) : null,
        had_password: hadPassword,
        notes: notes || null,
      });

      setBrandSlug(""); setHappenedAt(""); setDiscountPeak("");
      setDurationHours(""); setSoldOutMinutes(""); setHadPassword(false); setNotes("");
      fetchHistory();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-4">
          Adicionar Entrada
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label>Marca (slug)</Label>
            <select
              value={brandSlug}
              onChange={(e) => setBrandSlug(e.target.value)}
              required
              className="bg-carbon border border-zinc text-sm font-mono text-zinc-300 px-3 py-2 focus:outline-none focus:border-acid"
            >
              <option value="">Seleciona...</option>
              {BRANDS_DATA.map((b) => (
                <option key={b.slug} value={b.slug}>{b.name}</option>
              ))}
            </select>
          </div>

          {[
            { label: "Data", type: "date", value: happenedAt, set: setHappenedAt },
            { label: "Desconto máximo (%)", type: "number", value: discountPeak, set: setDiscountPeak },
            { label: "Duração (horas)", type: "number", value: durationHours, set: setDurationHours },
            { label: "Esgotou em (minutos)", type: "number", value: soldOutMinutes, set: setSoldOutMinutes },
          ].map((field) => (
            <div key={field.label} className="flex flex-col gap-1.5">
              <Label>{field.label}</Label>
              <Input
                type={field.type}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                required={field.label !== "Esgotou em (minutos)"}
              />
            </div>
          ))}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="had-password"
              checked={hadPassword}
              onChange={(e) => setHadPassword(e.target.checked)}
              className="accent-acid"
            />
            <Label htmlFor="had-password">Tinha senha de acesso</Label>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Notas</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="bg-carbon border border-zinc text-sm font-display text-zinc-300 px-3 py-2 focus:outline-none focus:border-acid resize-none"
            />
          </div>

          <Button type="submit" disabled={saving} className="gap-2">
            <Plus className="h-4 w-4" />
            {saving ? "A guardar..." : "Adicionar"}
          </Button>
        </form>
      </div>

      <div className="lg:col-span-2">
        <p className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-4">
          Entradas Recentes
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Desconto</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Esgotou</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-mono text-xs">{formatDate(e.happened_at)}</TableCell>
                <TableCell className="font-mono text-xs">{(e as DropHistory & { brands?: { slug: string } }).brands?.slug ?? "—"}</TableCell>
                <TableCell className="font-mono text-acid font-bold">-{e.discount_peak}%</TableCell>
                <TableCell className="font-mono text-xs text-zinc-500">{e.duration_hours}h</TableCell>
                <TableCell className="font-mono text-xs text-zinc-500">
                  {e.sold_out_minutes ? `${e.sold_out_minutes}min` : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function SubscribersTab() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [search, setSearch] = useState("");

  const fetchSubs = useCallback(async () => {
    const { data } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    setSubscribers((data as Subscriber[]) ?? []);
  }, []);

  useEffect(() => { fetchSubs(); }, [fetchSubs]);

  const unsubscribe = async (id: string) => {
    await supabase.from("subscribers").delete().eq("id", id);
    fetchSubs();
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600" />
          <Input
            placeholder="Pesquisar email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <p className="text-xs font-mono text-zinc-600">{filtered.length} subscritores</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Marcas</TableHead>
            <TableHead>Confirmado</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell className="font-mono text-xs">{sub.email}</TableCell>
              <TableCell className="text-xs text-zinc-500">
                {sub.brands.length > 0 ? sub.brands.join(", ") : "—"}
              </TableCell>
              <TableCell>
                <span className={`text-[10px] font-mono ${sub.confirmed ? "text-[#00ff88]" : "text-zinc-600"}`}>
                  {sub.confirmed ? "✓ SIM" : "PENDENTE"}
                </span>
              </TableCell>
              <TableCell className="font-mono text-xs text-zinc-500">
                {formatDate(sub.created_at)}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => unsubscribe(sub.id)}
                  className="text-[10px] font-mono text-red-500 hover:text-red-400 transition-colors"
                >
                  REMOVER
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function AdminDashboard() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
      } else {
        setAuthChecked(true);
      }
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-obsidian flex items-center justify-center">
        <span className="font-mono text-xs text-zinc-600 tracking-widest animate-pulse">A VERIFICAR ACESSO...</span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-obsidian">
      {/* Header */}
      <header className="border-b border-zinc px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-display font-extrabold text-lg tracking-tighter text-white">
            DROP<span className="text-acid">{"/"+"/"}</span>TRACKER
          </p>
          <p className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
            Admin Dashboard
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 text-xs">
          <LogOut className="h-3.5 w-3.5" />
          SAIR
        </Button>
      </header>

      <div className="p-6 max-w-7xl mx-auto">
        <Tabs defaultValue="drops">
          <TabsList className="mb-6">
            <TabsTrigger value="drops">DROPS</TabsTrigger>
            <TabsTrigger value="historico">HISTÓRICO</TabsTrigger>
            <TabsTrigger value="subscribers">SUBSCRITORES</TabsTrigger>
          </TabsList>

          <TabsContent value="drops">
            <DropsTab />
          </TabsContent>

          <TabsContent value="historico">
            <HistoricoTab />
          </TabsContent>

          <TabsContent value="subscribers">
            <SubscribersTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
