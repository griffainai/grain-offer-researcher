import { Nav } from "@/components/Nav";
import { Chat } from "@/components/Chat";
import { LiveDuel } from "@/components/LiveDuel";
import { BRAND } from "@/lib/brand";

export default function TryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav active="try" />
      <main className="flex-1 container-grain py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-ink tracking-tight mb-2">The workspace</h1>
          <p className="text-ink-secondary max-w-2xl">{BRAND.tagline} — choose your mode and start the investigation, or run the live comparison first.</p>
        </div>

        <div className="space-y-10">
          {/* Live duel */}
          <div>
            <h2 className="text-xl font-semibold text-ink mb-1">Same offer, two approaches</h2>
            <p className="text-sm text-ink-secondary mb-4">Watch generic advice and Grain answer the same prompt side by side.</p>
            <LiveDuel />
          </div>

          <hr className="border-line" />

          {/* Chat */}
          <div>
            <h2 className="text-xl font-semibold text-ink mb-1">Your investigation</h2>
            <p className="text-sm text-ink-secondary mb-4">Pick your mode, describe your market, and get a falsifiable offer thesis — not a framework.</p>
            <Chat />
          </div>
        </div>

        <footer className="mt-12 pt-6 border-t border-line text-xs text-ink-tertiary">
          <p>Public demo on a shared key — runs on a fast model with token limits. Fork the repo for the full-power version.</p>
          <p className="mt-1">Built on Interpretable Context Methodology — the folder is the agent, this is the surface.</p>
        </footer>
      </main>
    </div>
  );
}
