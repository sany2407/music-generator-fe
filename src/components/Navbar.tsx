"use client";

import Link from "next/link";

import EqualizerBars from "./EqualizerBars";

export default function Navbar({
  variant = "landing",
  onLibraryClick,
}: {
  variant?: "landing" | "app";
  onLibraryClick?: () => void;
}) {
  const isLanding = variant === "landing";
  return (
    <header
      className={`z-40 flex items-center justify-between px-6 py-5 md:px-10 ${
        isLanding ? "absolute inset-x-0 top-0" : "border-b border-white/8 bg-ink/70 backdrop-blur-xl"
      }`}
    >
      <Link href="/" className="group flex items-center gap-3">
        <span className="glass flex h-10 w-10 items-center justify-center rounded-xl">
          <EqualizerBars bars={4} className="h-4" />
        </span>
        <span className="font-display text-lg font-bold tracking-[0.22em] uppercase">
          Reso<span className="text-gradient">nance</span>
        </span>
      </Link>

      <nav className="flex items-center gap-2 md:gap-4">
        {isLanding && (
          <>
            <a
              href="#how"
              className="hidden rounded-full px-4 py-2 text-sm text-white/60 transition hover:text-white md:block"
            >
              How it works
            </a>
            <Link
              href="/library"
              className="hidden rounded-full px-4 py-2 text-sm text-white/60 transition hover:text-white md:block"
            >
              Library
            </Link>
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:text-white"
            >
              Log in
            </Link>
          </>
        )}
        {variant === "app" && (
          <>
            <button
              onClick={onLibraryClick}
              className="glass rounded-full px-4 py-2 text-sm text-white/70 transition hover:text-white lg:hidden"
            >
              Library
            </button>
            <Link
              href="/library"
              className="hidden rounded-full px-4 py-2 text-sm text-white/60 transition hover:text-white lg:block"
            >
              Full library
            </Link>
          </>
        )}
        <Link
          href="/studio"
          className="rounded-full bg-gradient-to-r from-neon-violet via-neon-pink to-neon-cyan px-5 py-2 text-sm font-semibold text-ink shadow-[0_0_28px_rgba(167,139,250,0.45)] transition hover:shadow-[0_0_44px_rgba(244,114,182,0.6)]"
        >
          Open Studio
        </Link>
      </nav>
    </header>
  );
}
