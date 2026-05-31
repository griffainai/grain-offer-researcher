"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Chat } from "@/components/Chat";
import { LiveDuel } from "@/components/LiveDuel";
import { MarketAudit } from "@/components/MarketAudit";
import { BRAND } from "@/lib/brand";

type Tab = "audit" | "chat" | "duel";

const TABS: { id: Tab; label: string; sub: string }[] = [
  { id: "audit", label: "⊛ Market Audit", sub: "Live competitor research" },
  { id: "chat",  label: "✦ Investigate",  sub: "Build or sharpen an offer" },
  { id: "duel",  label: "⚡ Comparison",   sub: "Generic AI vs Grain" },
];

export default function TryPage() {
  const [tab, setTab] = useState<Tab>("audit");

  return (
    <div className="min-h-screen flex flex-col">
      <Nav active="try" />
      <main className="flex-1 container-grain py-8">
        <div className="mb-7">
          <h1 className="text-3xl font-semibold text-ink tracking-tight mb-2">The workspace</h1>
          <p className="text-ink-secondary max-w-2xl">{BRAND.tagline}</p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 mb-6 border-b border-line pb-4">
          {TABS.map((t) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 rounded-xl text-left transition-all ${on ? "bg-ink text-bg-surface" : "bg-bg-surface border border-line text-ink-secondary hover:text-ink hover:border-ink-secondary"}`}
                style={{ boxShadow: on ? "0 1px 3px rgba(0,0,0,0.15)" : "none" }}
              >
                <p className="text-sm font-semibold">{t.label}</p>
                <p className="text-[10px] opacity-70">{t.sub}</p>
              </button>
            );
          })}
        </div>

        {tab === "audit" && <MarketAudit />}
        {tab === "chat"  && <Chat />}
        {tab === "duel"  && <LiveDuel />}

        <footer className="mt-12 pt-6 border-t border-line text-xs text-ink-tertiary space-y-1">
          <p>Public demo — live market audit uses Brave Search (2000 free searches/month). Chat + diagnose use a fast model.</p>
          <p>Built on Interpretable Context Methodology — the folder is the agent, this is the surface.</p>
        </footer>
      </main>
    </div>
  );
}
