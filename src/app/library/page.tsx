"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import AuroraBackground from "@/components/AuroraBackground";
import EqualizerBars from "@/components/EqualizerBars";
import Navbar from "@/components/Navbar";
import PlayerBar from "@/components/PlayerBar";
import { fetchTracks, type Track } from "@/lib/api";

function formatDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LibraryPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState<Track | null>(null);

  useEffect(() => {
    fetchTracks()
      .then(setTracks)
      .catch(() => setError("Could not reach the backend on port 8001. Start it with: python D:\\music generator\\api.py"))
      .finally(() => setLoading(false));
  }, []);

  const play = useCallback((track: Track) => {
    setCurrent(track);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AuroraBackground />
      <Navbar variant="app" />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pt-28 pb-16 md:px-10">
        <p className="font-display text-xs font-bold tracking-[0.35em] text-neon-cyan uppercase">
          Your collection
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold md:text-5xl">
          The <span className="text-gradient">Library</span>
        </h1>
        <p className="mt-3 text-sm text-white/45">
          Every track composed by your agents, ready to replay.
        </p>

        {loading && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass aspect-square animate-pulse rounded-3xl" />
            ))}
          </div>
        )}

        {error && (
          <div className="glass mt-12 rounded-3xl border-rose-400/25 bg-rose-500/5 p-8 text-sm leading-relaxed text-rose-200">
            {error}
          </div>
        )}

        {!loading && !error && tracks.length === 0 && (
          <div className="glass mt-12 flex flex-col items-center gap-5 rounded-3xl p-14 text-center">
            <EqualizerBars bars={10} className="h-10 w-24 opacity-50" />
            <p className="text-sm text-white/45">No tracks yet — the library is waiting for its first song.</p>
            <Link
              href="/studio"
              className="rounded-full bg-gradient-to-r from-neon-violet via-neon-pink to-neon-cyan px-7 py-3 font-display text-xs font-bold tracking-widest text-ink uppercase"
            >
              Compose one now
            </Link>
          </div>
        )}

        {!loading && tracks.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {tracks.map((t) => {
              const active = current?.url === t.url;
              return (
                <article
                  key={t.file}
                  className={`group glass relative overflow-hidden rounded-3xl p-4 transition duration-300 hover:-translate-y-1 ${
                    active ? "border-neon-violet/60 shadow-[0_0_36px_rgba(167,139,250,0.25)]" : ""
                  }`}
                >
                  <button
                    onClick={() => play(t)}
                    className="relative block aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-neon-violet/30 via-panel to-neon-cyan/20"
                    aria-label={`Play ${t.name}`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      {active ? (
                        <EqualizerBars bars={9} className="h-12 w-24" />
                      ) : (
                        <span className="text-4xl text-white/25 transition group-hover:text-white/60">♪</span>
                      )}
                    </span>
                    <span
                      className={`absolute right-3 bottom-3 flex h-11 w-11 items-center justify-center rounded-full text-ink shadow-lg transition duration-300 ${
                        active
                          ? "bg-white"
                          : "translate-y-2 bg-white/90 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                      }`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
                      </svg>
                    </span>
                  </button>

                  <div className="mt-4 flex items-start justify-between gap-3 px-1 pb-1">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold capitalize">{t.name}</h3>
                      <p className="mt-1 text-[11px] text-white/35">
                        {formatDate(t.created)} · {t.size_mb} MB · Lyria 002
                      </p>
                    </div>
                    <a
                      href={t.url}
                      download
                      className="shrink-0 rounded-lg p-2 text-white/30 transition hover:bg-white/10 hover:text-white"
                      aria-label="Download"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <PlayerBar track={current} />
    </div>
  );
}
