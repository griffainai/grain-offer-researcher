"use client";
import { useCallback, useRef, useState } from "react";
import type { ModeId } from "@/lib/brand";

export type ChatMsg = { role: "user" | "assistant"; content: string };

export function useResearchStream() {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => { abortRef.current?.abort(); setMessages([]); setError(null); setIsStreaming(false); }, []);

  const send = useCallback(async (text: string, mode: ModeId | string, history?: ChatMsg[]) => {
    const clean = text.trim();
    if (!clean || isStreaming) return;
    setError(null);
    const base = history ?? messages;
    const userMsg: ChatMsg = { role: "user", content: clean };
    const updated = [...base, userMsg];
    setMessages([...updated, { role: "assistant", content: "" }]);
    setIsStreaming(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, mode }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) { const e = await res.json().catch(() => ({ error: "Unknown" })); setError(e.error); setMessages(updated); setIsStreaming(false); return; }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let txt = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        txt += dec.decode(value, { stream: true });
        setMessages([...updated, { role: "assistant", content: txt }]);
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(e instanceof Error ? e.message : String(e));
    } finally { setIsStreaming(false); }
  }, [messages, isStreaming]);

  return { messages, isStreaming, error, send, reset, setMessages };
}
