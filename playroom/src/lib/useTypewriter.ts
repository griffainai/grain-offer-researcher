"use client";
import { useEffect, useState } from "react";
export function useTypewriter(text: string, { speed = 28, startDelay = 0 }: { speed?: number; startDelay?: number } = {}) {
  const [out, setOut] = useState(""); const [done, setDone] = useState(false);
  useEffect(() => {
    setOut(""); setDone(false); let i = 0, raf = 0;
    const t = setTimeout(() => { const tick = () => { i++; setOut(text.slice(0, i)); if (i >= text.length) { setDone(true); return; } raf = window.setTimeout(tick, speed); }; tick(); }, startDelay);
    return () => { clearTimeout(t); clearTimeout(raf); };
  }, [text, speed, startDelay]);
  return { out, done };
}
