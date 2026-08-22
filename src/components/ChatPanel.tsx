"use client";

import { useEffect, useRef, useState } from "react";

import EqualizerBars from "./EqualizerBars";
import { audioUrl } from "@/lib/api";

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  emotion?: Record<string, string>;
  prompt?: string;
  lyrics?: string;
  trackUrl?: string;
  trackName?: string;
  coverUrl?: string;
  error?: boolean;
}

const SUGGESTIONS = [
  "a rainy evening walking alone through old city streets",
  "the electric rush of winning against all odds",
  "missing someone across a quiet ocean",
  "a neon night drive — with an album cover of rain-streaked windshield lights",
];

function parseEmotion(block: string): Record<string, string> {
  const map: Record<string, string> = {};
  block.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx > 0) map[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  });
  return map;
}

function EmotionCard({ emotion }: { emotion: Record<string, string> }) {
  const intensity = (emotion["Intensity"] ?? "").toLowerCase();
  const valence = (emotion["Valence"] ?? "").toLowerCase();
  const valenceColor =
    valence === "positive"
      ? "text-emerald-300 border-emerald-300/30 bg-emerald-300/10"
      : valence === "negative"
        ? "text-rose-300 border-rose-300/30 bg-rose-300/10"
        : "text-amber-300 border-amber-300/30 bg-amber-300/10";

  return (
    <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <p className="text-[10px] font-bold tracking-[0.25em] text-white/35 uppercase">
        Emotional fingerprint
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-gradient-to-r from-neon-violet/25 to-neon-pink/25 px-3 py-1 text-xs font-semibold text-neon-violet ring-1 ring-neon-violet/40">
          {emotion["Primary Emotion"] ?? "—"}
        </span>
        {(emotion["Secondary Emotions"] ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/60"
            >
              {s}
            </span>
          ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/45">
        <span className="flex items-center gap-1.5">
          Intensity
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 w-4 rounded-full ${
                ["low", "medium", "high"].indexOf(intensity) >= i
                  ? "bg-gradient-to-r from-neon-violet to-neon-pink"
                  : "bg-white/12"
              }`}
            />
          ))}
        </span>
        {valence && (
          <span className={`rounded-full border px-2.5 py-0.5 ${valenceColor}`}>{valence}</span>
        )}
      </div>
      {emotion["Summary"] && (
        <p className="mt-3 text-xs leading-relaxed text-white/45">{emotion["Summary"]}</p>
      )}
    </div>
  );
}

export default function ChatPanel({
  messages,
  busy,
  mode,
  onModeChange,
  onSend,
  onPlayTrack,
}: {
  messages: ChatMessage[];
  busy: boolean;
  mode: "clip" | "pro";
  onModeChange: (mode: "clip" | "pro") => void;
  onSend: (text: string) => void;
  onPlayTrack: (url: string) => void;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const submit = () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    onSend(text);
  };

  const empty = messages.length === 0 && !busy;

  return (
    <section className="flex min-h-0 flex-col">
      <div ref={scrollRef} className="scroll-slim min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-8">
        {empty && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <EqualizerBars bars={16} className="h-14 w-44 opacity-90" />
            <h2 className="font-display mt-8 text-2xl font-bold md:text-3xl">
              Describe a <span className="text-gradient">feeling.</span>
            </h2>
            <p className="mt-3 max-w-sm text-sm text-white/45">
              A scene, a memory, a mood. The agents will read its emotion and compose the music.
            </p>
            <div className="mt-8 flex max-w-lg flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => onSend(s)}
                  className="glass rounded-full px-4 py-2 text-xs text-white/65 transition hover:border-neon-violet/50 hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto flex max-w-2xl flex-col gap-5">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-3xl rounded-br-md bg-gradient-to-br from-neon-violet to-neon-pink px-5 py-3.5 text-sm font-medium text-ink shadow-[0_4px_24px_rgba(244,114,182,0.25)]">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-start">
                <div
                  className={`max-w-[92%] rounded-3xl rounded-bl-md px-5 py-4 text-sm leading-relaxed ${
                    m.error
                      ? "border border-rose-400/30 bg-rose-500/10 text-rose-200"
                      : "glass text-white/85"
                  }`}
                >
                  {m.emotion && Object.keys(m.emotion).length > 0 && (
                    <EmotionCard emotion={m.emotion} />
                  )}
                  {m.prompt && (
                    <p className="mt-3 border-l-2 border-neon-cyan/50 pl-3 text-xs text-white/50 italic">
                      {m.prompt}
                    </p>
                  )}
                  {m.lyrics && (
                    <details className="mt-3 rounded-xl border border-neon-pink/25 bg-neon-pink/5 px-3 py-2">
                      <summary className="cursor-pointer text-[10px] font-bold tracking-[0.22em] text-neon-pink uppercase">
                        Lyrics &amp; structure
                      </summary>
                      <pre className="mt-2 max-h-48 overflow-y-auto whitespace-pre-wrap font-body text-xs leading-relaxed text-white/60">
                        {m.lyrics}
                      </pre>
                    </details>
                  )}
                  <p className="mt-3">{m.text}</p>
                  {m.trackUrl && (
                    <button
                      onClick={() => onPlayTrack(m.trackUrl!)}
                      className="mt-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                    >
                      ▶ Play generated track
                    </button>
                  )}
                  {m.coverUrl && (
                    <a
                      href={m.coverUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/cover mt-4 block w-fit"
                      title="Open album cover"
                    >
                      <span className="relative block overflow-hidden rounded-2xl border border-white/12 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.coverUrl}
                          alt="Generated album cover"
                          className="block h-56 w-56 object-cover transition duration-300 group-hover/cover:scale-[1.03]"
                        />
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-6 pb-2 text-[10px] font-bold tracking-[0.22em] text-white/80 uppercase opacity-0 transition group-hover/cover:opacity-100">
                          Album cover · open
                        </span>
                      </span>
                    </a>
                  )}
                </div>
              </div>
            )
          )}

          {busy && (
            <div className="flex justify-start">
              <div className="glass flex items-center gap-4 rounded-3xl rounded-bl-md px-5 py-4">
                <EqualizerBars bars={5} className="h-6 w-10" />
                <div className="text-xs text-white/55">
                  <p className="font-semibold text-white/80">Composing…</p>
                  <p className="mt-0.5">Reading emotions → crafting prompt → generating audio</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/8 bg-panel/60 p-4 backdrop-blur-xl md:p-5">
        <div className="mx-auto mb-3 flex max-w-2xl items-center gap-2">
          <span className="text-[10px] font-bold tracking-[0.22em] text-white/35 uppercase">Length</span>
          {(
            [
              { key: "clip", label: "30s Clip" },
              { key: "pro", label: "Full Song" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              onClick={() => onModeChange(opt.key)}
              disabled={busy}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                mode === opt.key
                  ? "bg-gradient-to-r from-neon-violet to-neon-pink text-ink shadow-[0_0_18px_rgba(167,139,250,0.4)]"
                  : "glass text-white/55 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="glass mx-auto flex max-w-2xl items-center gap-3 rounded-full py-2 pr-2 pl-5 transition focus-within:border-neon-violet/60 focus-within:shadow-[0_0_32px_rgba(167,139,250,0.25)]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Type a feeling…"
            disabled={busy}
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-white/30"
          />
          <button
            onClick={submit}
            disabled={busy || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-neon-violet via-neon-pink to-neon-cyan text-ink transition hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
            aria-label="Generate"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export function messageFromResult(
  text: string,
  result: { emotion_analysis: string; enhanced_prompt: string; track_url: string | null; track_name: string | null; lyrics?: string | null; cover_url?: string | null }
): ChatMessage {
  return {
    role: "assistant",
    text,
    emotion: parseEmotion(result.emotion_analysis),
    prompt: result.enhanced_prompt,
    lyrics: result.lyrics ?? undefined,
    trackUrl: result.track_url ? audioUrl(result.track_url) : undefined,
    trackName: result.track_name ?? undefined,
    coverUrl: result.cover_url ?? undefined,
  };
}

export { audioUrl };
