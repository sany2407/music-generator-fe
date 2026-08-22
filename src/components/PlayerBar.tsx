"use client";

import { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "react-use-audio-player";

import EqualizerBars from "@/components/EqualizerBars";
import type { Track } from "@/lib/api";

function formatTime(s: number): string {
  if (!isFinite(s) || s <= 0) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export default function PlayerBar({ track }: { track: Track | null }) {
  const player = useAudioPlayer();
  const playerRef = useRef(player);
  useEffect(() => {
    playerRef.current = player;
  });
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const loadedUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!track?.url || loadedUrl.current === track.url) return;
    loadedUrl.current = track.url;
    setTime(0);
    playerRef.current.load(track.url, {
      format: track.file.endsWith(".mp3") ? "mp3" : "wav",
      autoplay: true,
      initialVolume: volume,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  useEffect(() => {
    const id = setInterval(() => setTime(playerRef.current.getPosition()), 300);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    playerRef.current.setVolume(Math.max(volume, 0.1));
  }, [volume]);

  const playing = player.isPlaying;

  const toggle = () => {
    if (!track) return;
    playerRef.current.togglePlayPause();
  };

  return (
    <footer className="z-30 border-t border-white/8 bg-ink/85 backdrop-blur-xl">
      <div className="flex items-center gap-4 px-4 py-3 md:px-6">
        <div className="relative hidden h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-neon-violet via-neon-pink to-neon-cyan sm:block">
          {track?.cover_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={track.cover_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
          {playing ? (
            <EqualizerBars bars={4} className="h-5" barClassName={track?.cover_url ? "bg-white" : "bg-ink"} />
          ) : (
            !track?.cover_url && (
              <span className="flex h-full items-center justify-center text-lg text-ink">♪</span>
            )
          )}
        </div>

        <div className="w-40 min-w-0 shrink-0 md:w-56">
          <p className="truncate text-sm font-semibold capitalize">
            {track ? track.name : "Nothing playing"}
          </p>
          <p className="text-[11px] text-white/35">
            {player.error
              ? "Playback error — try again"
              : player.isLoading
                ? "Loading…"
                : track
                  ? track.file.endsWith(".mp3")
                    ? "Lyria 3 · MP3"
                    : "Lyria 002 · WAV"
                  : "—"}
          </p>
        </div>

        <div className="flex flex-1 items-center gap-3">
          <button
            onClick={toggle}
            disabled={!track || player.isLoading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition hover:scale-105 hover:bg-neon-violet disabled:opacity-25 disabled:hover:scale-100"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1.2" />
                <rect x="14" y="4" width="4" height="16" rx="1.2" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
              </svg>
            )}
          </button>

          <span className="w-10 shrink-0 text-right text-[11px] tabular-nums text-white/40">
            {formatTime(time)}
          </span>
          <input
            type="range"
            min={0}
            max={player.duration || 0}
            step={0.1}
            value={Math.min(time, player.duration || 0)}
            onChange={(e) => {
              const v = Number(e.target.value);
              playerRef.current.seek(v);
              setTime(v);
            }}
            disabled={!track}
            className="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-white/12 disabled:opacity-30"
          />
          <span className="w-10 shrink-0 text-[11px] tabular-nums text-white/40">
            {formatTime(player.duration)}
          </span>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H2v6h4l5 4V5ZM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
          </svg>
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/12"
            aria-label="Volume"
          />
        </div>
      </div>
    </footer>
  );
}
