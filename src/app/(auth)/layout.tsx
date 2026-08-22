import type { ReactNode } from "react";

import AuroraBackground from "@/components/AuroraBackground";
import EqualizerBars from "@/components/EqualizerBars";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <AuroraBackground />
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-3 text-sm text-white/50 transition hover:text-white"
      >
        <span className="glass flex h-9 w-9 items-center justify-center rounded-xl">
          <EqualizerBars bars={4} className="h-3.5" />
        </span>
        Resonance
      </Link>
      {children}
    </main>
  );
}
