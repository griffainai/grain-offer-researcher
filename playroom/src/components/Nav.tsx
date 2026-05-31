"use client";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Wordmark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";
  return (
    <Link href="/" className="inline-flex items-center gap-2 group no-underline">
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-ink text-bg-surface float shrink-0" aria-hidden>
        <span className="text-sm font-bold tracking-tight">G</span>
      </span>
      <span className={`font-semibold tracking-tight text-ink ${sz} group-hover:text-ink-secondary transition-colors`}>
        {BRAND.wordmark}
      </span>
    </Link>
  );
}

export function Nav({ active }: { active?: "home" | "try" }) {
  return (
    <header className="sticky top-0 z-30 bg-bg/80 backdrop-blur-md border-b border-line">
      <div className="container-grain h-14 flex items-center justify-between">
        <Wordmark />
        <nav className="flex items-center gap-1">
          <Link href="/" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors no-underline ${active === "home" ? "text-ink bg-bg-hover" : "text-ink-secondary hover:text-ink hover:bg-bg-hover"}`}>
            Demo
          </Link>
          <Link href="/try" className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all no-underline ${active === "try" ? "bg-ink text-bg-surface" : "bg-ink text-bg-surface hover:opacity-85"}`}
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>
            Try it →
          </Link>
        </nav>
      </div>
    </header>
  );
}
