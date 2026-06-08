import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-obsidian border-t border-zinc">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="font-display font-extrabold text-lg tracking-tighter text-white">
              DROP<span className="text-acid">{"/"+"/"}</span>TRACKER
            </Link>
            <p className="text-xs font-display text-zinc-600">Feito pela comunidade.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-mono tracking-widest text-zinc-700 uppercase mb-2">
              Navegação
            </p>
            {[
              { label: "Radar", href: "/#radar" },
              { label: "Marcas", href: "/#marcas" },
              { label: "Histórico", href: "/#historico" },
              { label: "Admin", href: "/admin" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-display text-zinc-600 hover:text-acid transition-colors duration-200 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-mono tracking-widest text-zinc-700 uppercase mb-2">
              Social
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center border border-zinc-800 text-zinc-600 hover:border-acid hover:text-acid transition-all duration-200"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="flex h-8 w-8 items-center justify-center border border-zinc-800 text-zinc-600 hover:border-acid hover:text-acid transition-all duration-200"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc pt-6">
          <p className="text-[11px] font-mono text-zinc-700 text-center">
            © 2025 — Não somos afiliados a nenhuma marca. Informação com base em padrões históricos.
          </p>
        </div>
      </div>
    </footer>
  );
}
