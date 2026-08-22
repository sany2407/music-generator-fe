"use client";

import EqualizerBars from "@/components/EqualizerBars";
import { audioUrl, type Track } from "@/lib/api";

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function TracksPanel({
  tracks,
  currentUrl,
  loading,
  onSelect,
  className = "",
}: {
  tracks: Track[];
  currentUrl: string | null;
  loading: boolean;
  onSelect: (track: Track) => void;
  className?: string;
}) {
  return (
    <aside
      className={`flex min-h-0 flex-col border-l border-white/8 bg-panel/50 backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="font-display text-xs font-bold tracking-[0.28em] text-white/50 uppercase">
          Library
        </h3>
        <span className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] font-semibold text-white/50">
          {tracks.length} tracks
        </span>
      </div>

      <div className="scroll-slim min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-4">
        {loading && (
          <div className="space-y-2 pt-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[72px] animate-pulse rounded-2xl bg-white/[0.05]" />
            ))}
          </div>
        )}

        {!loading && tracks.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <EqualizerBars bars={7} className="h-8 w-16 opacity-40" />
            <p className="max-w-[200px] text-xs leading-relaxed text-white/35">
              Nothing here yet. Compose your first track in the chat.
            </p>
          </div>
        )}

        {tracks.map((t) => {
          const active = currentUrl === audioUrl(t.url);
          return (
            <button
              key={t.file}
              onClick={() => onSelect(t)}
              className={`group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                active
                  ? "border-neon-violet/60 bg-gradient-to-r from-neon-violet/15 to-neon-pink/10 shadow-[0_0_24px_rgba(167,139,250,0.18)]"
                  : "border-white/6 bg-white/[0.03] hover:border-white/18 hover:bg-white/[0.06]"
              }`}
            >
              <span
                className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl ${
                  active
                    ? "bg-gradient-to-br from-neon-violet via-neon-pink to-neon-cyan"
                    : "bg-white/8 group-hover:bg-white/12"
                }`}
              >
                {active ? (
                  <EqualizerBars bars={3} className="h-4" barClassName="bg-ink" />
                ) : (
                  <span className="text-sm text-white/70">♪</span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium capitalize">{t.name}</span>
                <span className="mt-0.5 block text-[11px] text-white/35">
                  {formatDate(t.created)} · {t.size_mb} MB
                </span>
              </span>
              <a
                href={audioUrl(t.url)}
                download
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 rounded-lg p-1.5 text-white/30 opacity-0 transition group-hover:opacity-100 hover:bg-white/10 hover:text-white"
                aria-label="Download"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </a>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
