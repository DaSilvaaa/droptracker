"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-acid font-display font-extrabold text-xl tracking-tighter">
            DROP<span className="text-white">{"/"+"/"}</span>TRACKER
          </p>
          <h1 className="text-2xl font-display font-bold text-white mt-2">
            Acesso Restrito
          </h1>
          <p className="text-xs font-mono text-zinc-600 mt-1 tracking-wider">
            PAINEL DE ADMINISTRAÇÃO
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">EMAIL</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@droptracker.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">PASSWORD</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-xs font-mono text-red-400 border border-red-900 px-3 py-2">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="h-11 font-bold tracking-widest mt-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "ENTRAR →"}
          </Button>
        </form>
      </div>
    </main>
  );
}
