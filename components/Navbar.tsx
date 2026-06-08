"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-obsidian/80 transition-all duration-300 ${
        scrolled ? "border-b border-zinc" : ""
      }`}
    >
      {/* Logo */}
      <Link href="/" className="font-display font-extrabold text-lg tracking-tighter text-white">
        DROP<span className="text-acid">{"/"+"/"}</span>TRACKER
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1 border border-zinc px-1 py-1">
        {[
          { label: "RADAR", href: "#radar" },
          { label: "MARCAS", href: "#marcas" },
          { label: "HISTÓRICO", href: "#historico" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-4 py-1.5 text-xs font-display font-medium tracking-widest text-zinc-500 hover:text-white transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a href="#alertas">
        <Button size="sm" className="text-xs tracking-widest font-bold hover:bg-obsidian hover:text-acid hover:border-acid border border-acid">
          ATIVAR ALERTAS →
        </Button>
      </a>
    </nav>
  );
}
